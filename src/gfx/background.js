import * as THREE from 'three';
import { noiseGLSL } from './noise.js';
import { rng } from './textures.js';

// Persistent backdrop: twinkling starfield + procedural nebula sky. It follows the
// camera so it always reads as "infinitely far", and its tint drifts toward the
// colours of whichever world you are inside.
export function createBackground() {
  const group = new THREE.Group();
  group.renderOrder = -10;

  const rand = rng('stars');
  const count = 9000;
  const pos = new Float32Array(count * 3);
  const col = new Float32Array(count * 3);
  const size = new Float32Array(count);
  const phase = new Float32Array(count);
  const tints = [new THREE.Color('#ffffff'), new THREE.Color('#9ec5ff'), new THREE.Color('#ffd6a0'), new THREE.Color('#c8b6ff')];
  for (let i = 0; i < count; i++) {
    const u = rand() * 2 - 1;
    const th = rand() * Math.PI * 2;
    const r = 3000 + rand() * 1500;
    const s = Math.sqrt(1 - u * u);
    pos[i * 3] = r * s * Math.cos(th);
    pos[i * 3 + 1] = r * u;
    pos[i * 3 + 2] = r * s * Math.sin(th);
    const c = tints[Math.floor(rand() * tints.length)];
    col.set([c.r, c.g, c.b], i * 3);
    size[i] = Math.pow(rand(), 6) * 7 + 0.9;
    phase[i] = rand() * 100;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  geo.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
  geo.setAttribute('aPhase', new THREE.BufferAttribute(phase, 1));
  const starMat = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uPixel: { value: Math.min(window.devicePixelRatio, 2) } },
    vertexShader: /* glsl */ `
      attribute float aSize; attribute float aPhase;
      uniform float uTime; uniform float uPixel;
      varying vec3 vColor; varying float vTw;
      void main() {
        vColor = color;
        vTw = 0.65 + 0.35 * sin(uTime * (0.6 + fract(aPhase) * 2.0) + aPhase);
        gl_PointSize = aSize * uPixel;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: /* glsl */ `
      varying vec3 vColor; varying float vTw;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        float a = smoothstep(0.5, 0.0, d);
        gl_FragColor = vec4(vColor * vTw, a * vTw);
      }`,
    vertexColors: true,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const stars = new THREE.Points(geo, starMat);
  stars.frustumCulled = false;
  group.add(stars);

  const nebulaMat = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColA: { value: new THREE.Color('#3b1d8f') },
      uColB: { value: new THREE.Color('#0b5d7a') },
      uIntensity: { value: 0.55 },
    },
    vertexShader: /* glsl */ `
      varying vec3 vDir;
      void main() {
        vDir = normalize(position);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: /* glsl */ `
      ${noiseGLSL}
      uniform float uTime; uniform vec3 uColA; uniform vec3 uColB; uniform float uIntensity;
      varying vec3 vDir;
      void main() {
        vec3 d = normalize(vDir);
        float t = uTime * 0.004;
        float n1 = fbm(d * 2.2 + vec3(t, 0.0, -t));
        float n2 = fbm(d * 4.5 - vec3(0.0, t * 1.5, 0.0) + n1);
        float band = exp(-pow(d.y * 2.4 + n1 * 0.8, 2.0));
        float cloud = smoothstep(-0.15, 0.7, n2) * (0.35 + band);
        vec3 col = mix(uColA, uColB, smoothstep(-0.4, 0.5, n1));
        col *= cloud * uIntensity;
        float dust = smoothstep(0.2, 0.6, fbm(d * 9.0 + 3.0));
        col *= 1.0 - dust * 0.6;
        gl_FragColor = vec4(col * 0.55, 1.0);
      }`,
    side: THREE.BackSide,
    depthWrite: false,
  });
  const nebula = new THREE.Mesh(new THREE.SphereGeometry(5000, 48, 32), nebulaMat);
  nebula.frustumCulled = false;
  group.add(nebula);
  nebula.renderOrder = -11;

  const targetA = nebulaMat.uniforms.uColA.value.clone();
  const targetB = nebulaMat.uniforms.uColB.value.clone();

  return {
    group,
    setTint(a, b) {
      targetA.set(a).multiplyScalar(0.55);
      targetB.set(b).multiplyScalar(0.45);
    },
    update(t, dt, camera) {
      group.position.copy(camera.position);
      starMat.uniforms.uTime.value = t;
      nebulaMat.uniforms.uTime.value = t;
      const k = 1 - Math.exp(-dt * 1.2);
      nebulaMat.uniforms.uColA.value.lerp(targetA, k);
      nebulaMat.uniforms.uColB.value.lerp(targetB, k);
    },
  };
}
