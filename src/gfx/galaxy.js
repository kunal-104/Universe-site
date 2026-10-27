import * as THREE from 'three';
import { rng, gauss, makeGlow } from './textures.js';

const vertexShader = /* glsl */ `
  attribute float aSize;
  attribute float aRadius;
  uniform float uTime;
  uniform float uSize;
  uniform float uSpin;
  uniform float uPixel;
  uniform float uHover;
  uniform float uNearFade;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    // Differential rotation: inner stars orbit faster than outer ones.
    float ang = uTime * uSpin / (0.35 + aRadius);
    float c = cos(ang), s = sin(ang);
    vec3 p = vec3(position.x * c - position.z * s, position.y, position.x * s + position.z * c);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * uSize * uPixel * (300.0 / -mv.z) * (1.0 + uHover * 0.35);
    gl_PointSize = clamp(gl_PointSize, 0.0, 64.0);
    vColor = color * (1.0 + uHover * 0.6);
    // When the camera is inside the cloud, fade stars that would fill the screen.
    vAlpha = mix(1.0, smoothstep(4.0, 70.0, -mv.z), uNearFade);
    gl_PointSize = min(gl_PointSize, mix(64.0, 18.0, uNearFade));
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uOpacity;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = pow(smoothstep(0.5, 0.0, d), 1.6);
    gl_FragColor = vec4(vColor, a * uOpacity * vAlpha);
  }
`;

// Builds a procedural galaxy as a single Points cloud. Shapes: spiral, barred,
// ring, elliptical. Everything is seeded by the galaxy id so it's stable.
export function createGalaxyPoints({ id, colors, shape, radius = 40, count = 12000, size = 1, spin = 0.08 }) {
  const rand = rng(id + ':' + count);
  const pos = new Float32Array(count * 3);
  const col = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const radii = new Float32Array(count);
  const inner = new THREE.Color(colors[1]).lerp(new THREE.Color('#ffffff'), 0.55);
  const outer = new THREE.Color(colors[0]);
  const accent = new THREE.Color(colors[1]);
  const tmp = new THREE.Color();
  const arms = Math.max(1, shape.arms || 2);
  const twist = shape.twist || 3;

  for (let i = 0; i < count; i++) {
    let x, y, z, rn;
    const roll = rand();
    if (shape.type === 'elliptical') {
      rn = Math.pow(rand(), 1.8);
      const u = rand() * 2 - 1;
      const th = rand() * Math.PI * 2;
      const s = Math.sqrt(1 - u * u);
      x = rn * radius * s * Math.cos(th);
      y = rn * radius * u * 0.55;
      z = rn * radius * s * Math.sin(th) * 0.8;
    } else if (shape.type === 'ring' && roll < 0.55) {
      rn = 0.72 + gauss(rand) * 0.06;
      const th = rand() * Math.PI * 2;
      x = Math.cos(th) * rn * radius;
      z = Math.sin(th) * rn * radius;
      y = gauss(rand) * radius * 0.02;
    } else if (shape.type === 'barred' && roll < 0.22) {
      rn = rand() * 0.38;
      x = (rand() * 2 - 1) * radius * 0.38;
      z = gauss(rand) * radius * 0.05;
      y = gauss(rand) * radius * 0.03;
      rn = Math.abs(x) / radius;
    } else if (roll < 0.14) {
      // dense bulge
      rn = Math.abs(gauss(rand)) * 0.12;
      const u = rand() * 2 - 1;
      const th = rand() * Math.PI * 2;
      const s = Math.sqrt(1 - u * u);
      x = rn * radius * s * Math.cos(th);
      y = rn * radius * u * 0.7;
      z = rn * radius * s * Math.sin(th);
    } else {
      const start = shape.type === 'barred' ? 0.3 : 0.05;
      rn = start + Math.pow(rand(), 1.35) * (1 - start);
      const arm = Math.floor(rand() * arms);
      const baseAng = (arm / arms) * Math.PI * 2;
      const spread = 0.18 + 0.4 * (1 - rn);
      const ang = baseAng + rn * twist + gauss(rand) * spread * 0.35;
      const scatter = gauss(rand) * radius * 0.05 * (0.4 + rn);
      x = Math.cos(ang) * rn * radius + scatter;
      z = Math.sin(ang) * rn * radius + gauss(rand) * radius * 0.05 * (0.4 + rn);
      y = gauss(rand) * radius * 0.025 * (1.2 - rn);
    }
    pos[i * 3] = x;
    pos[i * 3 + 1] = y;
    pos[i * 3 + 2] = z;
    const r = Math.min(1, Math.sqrt(x * x + z * z) / radius);
    radii[i] = r;
    tmp.copy(inner).lerp(outer, Math.min(1, r * 1.25));
    if (rand() < 0.06) tmp.copy(accent).lerp(new THREE.Color('#ffffff'), 0.2);
    if (rand() < 0.02) tmp.set('#ff9ad5');
    const dim = 0.55 + rand() * 0.45;
    col[i * 3] = tmp.r * dim;
    col[i * 3 + 1] = tmp.g * dim;
    col[i * 3 + 2] = tmp.b * dim;
    sizes[i] = (rand() < 0.015 ? 3.2 : 0.6 + Math.pow(rand(), 3) * 1.6) * (1.25 - r * 0.5);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
  geo.setAttribute('aRadius', new THREE.BufferAttribute(radii, 1));

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uSize: { value: size * (radius / 40) },
      uSpin: { value: spin },
      uPixel: { value: Math.min(window.devicePixelRatio, 2) },
      uOpacity: { value: 1 },
      uHover: { value: 0 },
      uNearFade: { value: 0 },
    },
    vertexShader,
    fragmentShader,
    vertexColors: true,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const points = new THREE.Points(geo, material);
  const group = new THREE.Group();
  group.add(points);

  const core = makeGlow(inner, radius * 0.75, 0.9);
  const halo = makeGlow(outer, radius * 2.4, 0.35);
  group.add(halo, core);

  return {
    group,
    material,
    core,
    halo,
    update(t, hover = 0) {
      material.uniforms.uTime.value = t;
      material.uniforms.uHover.value += (hover - material.uniforms.uHover.value) * 0.1;
      const h = material.uniforms.uHover.value;
      core.material.opacity = 0.85 + h * 0.4;
      halo.material.opacity = 0.3 + h * 0.3;
    },
    setOpacity(o) {
      material.uniforms.uOpacity.value = o;
    },
  };
}
