import * as THREE from 'three';
import { noiseGLSL } from './noise.js';
import { makeGlow } from './textures.js';

const TYPES = { terran: 0, ocean: 1, gas: 2, lava: 3, ice: 4, desert: 5, crystal: 6 };

const planetVertex = /* glsl */ `
  varying vec3 vObj;
  varying vec3 vNormalW;
  varying vec3 vPosW;
  void main() {
    vObj = normalize(position);
    vec4 w = modelMatrix * vec4(position, 1.0);
    vPosW = w.xyz;
    vNormalW = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * w;
  }
`;

const planetFragment = /* glsl */ `
  ${noiseGLSL}
  uniform vec3 uColA; uniform vec3 uColB; uniform vec3 uColC;
  uniform int uType; uniform float uTime; uniform float uSeed;
  uniform vec3 uLightPos; uniform float uDetail; uniform float uHover;
  varying vec3 vObj; varying vec3 vNormalW; varying vec3 vPosW;

  void main() {
    vec3 p = vObj * uDetail + uSeed;
    vec3 base; float spec = 0.0; vec3 emissive = vec3(0.0);
    float clouds = 0.0;

    if (uType == 0 || uType == 1) {
      float n = fbm(p * 1.6);
      float sea = uType == 1 ? 0.22 : 0.02;
      float land = smoothstep(sea, sea + 0.04, n);
      vec3 water = mix(uColA * 0.6, uColA, smoothstep(-0.6, sea, n));
      vec3 ground = mix(uColB * 0.8, mix(uColB, uColC, 0.35), smoothstep(sea, 0.5, n));
      ground = mix(ground, uColC, smoothstep(0.45, 0.65, n));
      base = mix(water, ground, land);
      spec = (1.0 - land) * 0.9;
      float cap = smoothstep(0.78, 0.9, abs(vObj.y) + n * 0.1);
      base = mix(base, vec3(0.95), cap);
      clouds = smoothstep(0.1, 0.55, fbm(p * 2.2 + vec3(uTime * 0.02, 0.0, uTime * 0.01)));
    } else if (uType == 2) {
      float turb = fbm(p * vec3(1.2, 4.0, 1.2) + vec3(uTime * 0.015, 0.0, 0.0));
      float bands = sin(vObj.y * 14.0 + turb * 3.5) * 0.5 + 0.5;
      float bands2 = sin(vObj.y * 37.0 + turb * 6.0) * 0.5 + 0.5;
      base = mix(uColA, uColB, bands);
      base = mix(base, uColC, bands2 * 0.35);
      float storm = smoothstep(0.82, 0.95, 1.0 - length((vObj.xy - vec2(0.45, -0.25)) * vec2(1.0, 1.8)));
      base = mix(base, uColC, storm * 0.8);
    } else if (uType == 3) {
      float n = fbm(p * 1.8);
      float cracks = 1.0 - smoothstep(0.0, 0.08, abs(ridged(p * 2.0) - 0.75));
      base = mix(uColA, uColA * 1.8 + 0.03, smoothstep(-0.3, 0.6, n));
      float pulse = 0.75 + 0.25 * sin(uTime * 1.5 + n * 6.0);
      emissive = mix(uColB, uColC, cracks) * cracks * 1.6 * pulse;
      emissive += uColB * smoothstep(0.35, 0.6, n) * 0.35;
    } else if (uType == 4) {
      float n = fbm(p * 2.0);
      float r = ridged(p * 3.0);
      base = mix(uColC, uColB, smoothstep(0.55, 0.9, r));
      base = mix(base, uColA, smoothstep(0.2, 0.6, n) * 0.6);
      spec = 0.6;
    } else if (uType == 5) {
      float n = fbm(p * 1.3);
      float dunes = sin(dot(vObj, vec3(9.0, 3.0, 5.0)) * 4.0 + n * 8.0) * 0.5 + 0.5;
      base = mix(uColA, uColB, smoothstep(-0.4, 0.4, n));
      base = mix(base, uColC, dunes * 0.25 + smoothstep(0.4, 0.7, n) * 0.5);
      float cap = smoothstep(0.86, 0.95, abs(vObj.y));
      base = mix(base, uColC, cap);
    } else {
      float n = fbm(p * 1.4);
      float facet = floor((n + 1.0) * 5.0) / 10.0;
      base = mix(uColA, uColB, facet);
      float glint = pow(max(0.0, snoise(p * 6.0 + uTime * 0.2)), 8.0);
      emissive = uColC * glint * 2.5 + uColB * 0.12;
      spec = 0.8;
    }

    vec3 N = normalize(vNormalW);
    vec3 L = normalize(uLightPos - vPosW);
    vec3 V = normalize(cameraPosition - vPosW);
    float diff = max(dot(N, L), 0.0);
    float wrap = smoothstep(-0.25, 0.6, dot(N, L));
    vec3 H = normalize(L + V);
    float sp = pow(max(dot(N, H), 0.0), 48.0) * spec;

    vec3 col = base * (0.04 + wrap * 0.85) + vec3(sp) * diff * 0.8;
    col = mix(col, vec3(1.0) * (0.08 + wrap), clouds * 0.75);
    float night = 1.0 - wrap;
    col += emissive * (0.35 + night * 0.9);

    float fres = pow(1.0 - max(dot(N, V), 0.0), 3.0);
    col += uColB * fres * (0.2 + wrap * 0.35) + uColB * fres * uHover * 0.8;
    gl_FragColor = vec4(col, 1.0);
  }
`;

const atmoVertex = /* glsl */ `
  varying vec3 vNormalW; varying vec3 vPosW;
  void main() {
    vec4 w = modelMatrix * vec4(position, 1.0);
    vPosW = w.xyz;
    vNormalW = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * w;
  }
`;
const atmoFragment = /* glsl */ `
  uniform vec3 uColor; uniform vec3 uLightPos; uniform float uStrength;
  varying vec3 vNormalW; varying vec3 vPosW;
  void main() {
    vec3 N = normalize(vNormalW);
    vec3 V = normalize(cameraPosition - vPosW);
    // Back faces: -dot(N,V) is 0 at the shell's silhouette and grows toward the
    // planet's limb, so the glow fades out softly instead of ending in a hard edge.
    float g = pow(clamp(-dot(N, V), 0.0, 1.0), 1.6) * 2.4;
    float lit = smoothstep(-0.5, 0.6, dot(-N, normalize(uLightPos - vPosW)));
    gl_FragColor = vec4(uColor * g * (0.2 + lit) * uStrength, g);
  }
`;

const ringFragment = /* glsl */ `
  ${noiseGLSL}
  uniform vec3 uColA; uniform vec3 uColB; uniform float uSeed;
  varying vec2 vUv; varying float vR;
  void main() {
    float r = vR;
    float bands = snoise(vec3(r * 40.0, uSeed, 0.0)) * 0.5 + 0.5;
    float gaps = smoothstep(0.15, 0.3, snoise(vec3(r * 9.0, uSeed * 2.0, 1.0)) * 0.5 + 0.5);
    float edge = smoothstep(0.0, 0.08, r) * smoothstep(1.0, 0.85, r);
    vec3 col = mix(uColA, uColB, bands);
    float a = edge * gaps * (0.25 + bands * 0.55);
    gl_FragColor = vec4(col * 0.75, a * 0.55);
  }
`;
const ringVertex = /* glsl */ `
  uniform float uInner; uniform float uOuter;
  varying vec2 vUv; varying float vR;
  void main() {
    vUv = uv;
    vR = (length(position.xy) - uInner) / (uOuter - uInner);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

let seedCounter = 1;

// A planet = surface shader + atmosphere shell + optional ring system.
export function createPlanet({ look, radius = 1, detail = 1.0, lightPos = new THREE.Vector3(), segments = 96 }) {
  const [a, b, c] = look.colors;
  const group = new THREE.Group();
  const seed = (seedCounter++ * 7.31) % 50;
  const surfaceMat = new THREE.ShaderMaterial({
    uniforms: {
      uColA: { value: new THREE.Color(a) },
      uColB: { value: new THREE.Color(b) },
      uColC: { value: new THREE.Color(c) },
      uType: { value: TYPES[look.type] ?? 0 },
      uTime: { value: 0 },
      uSeed: { value: seed },
      uLightPos: { value: lightPos },
      uDetail: { value: detail },
      uHover: { value: 0 },
    },
    vertexShader: planetVertex,
    fragmentShader: planetFragment,
  });
  const surface = new THREE.Mesh(new THREE.SphereGeometry(radius, segments, Math.round(segments * 0.66)), surfaceMat);
  group.add(surface);

  const atmoMat = new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color(b).lerp(new THREE.Color('#ffffff'), 0.25) },
      uLightPos: { value: lightPos },
      uStrength: { value: 0.9 },
    },
    vertexShader: atmoVertex,
    fragmentShader: atmoFragment,
    transparent: true,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    depthWrite: false,
  });
  const atmo = new THREE.Mesh(new THREE.SphereGeometry(radius * 1.18, 64, 40), atmoMat);
  group.add(atmo);

  let ring = null;
  if (look.rings) {
    const inner = radius * 1.45;
    const outer = radius * 2.4;
    const ringMat = new THREE.ShaderMaterial({
      uniforms: {
        uColA: { value: new THREE.Color(b) },
        uColB: { value: new THREE.Color(c) },
        uSeed: { value: seed },
        uInner: { value: inner },
        uOuter: { value: outer },
      },
      vertexShader: ringVertex,
      fragmentShader: ringFragment,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    ring = new THREE.Mesh(new THREE.RingGeometry(inner, outer, 128, 1), ringMat);
    ring.rotation.x = -Math.PI / 2 + 0.35;
    ring.rotation.y = 0.2;
    group.add(ring);
  }

  return {
    group,
    surface,
    update(t, hover = 0) {
      surfaceMat.uniforms.uTime.value = t;
      surfaceMat.uniforms.uHover.value += (hover - surfaceMat.uniforms.uHover.value) * 0.12;
      surface.rotation.y = t * 0.05;
    },
  };
}

const starFragment = /* glsl */ `
  ${noiseGLSL}
  uniform vec3 uColA; uniform vec3 uColB; uniform float uTime;
  varying vec3 vObj; varying vec3 vNormalW; varying vec3 vPosW;
  void main() {
    vec3 p = vObj * 2.5;
    float n = fbm(p + vec3(0.0, uTime * 0.05, uTime * 0.03));
    float n2 = fbm(p * 3.0 - n + uTime * 0.08);
    vec3 col = mix(uColA, uColB, smoothstep(-0.5, 0.6, n + n2 * 0.5));
    col += vec3(1.0) * pow(smoothstep(0.1, 0.8, n2), 2.0) * 0.6;
    vec3 V = normalize(cameraPosition - vPosW);
    float limb = pow(max(dot(normalize(vNormalW), V), 0.0), 0.5);
    gl_FragColor = vec4(col * (0.6 + limb * 0.9) * 1.6, 1.0);
  }
`;

// The burning core at the centre of each galaxy.
export function createStar({ colors, radius = 4 }) {
  const group = new THREE.Group();
  const colA = new THREE.Color(colors[0]).lerp(new THREE.Color('#ffffff'), 0.25);
  const colB = new THREE.Color(colors[1]).lerp(new THREE.Color('#fff6e0'), 0.6);
  const mat = new THREE.ShaderMaterial({
    uniforms: { uColA: { value: colA }, uColB: { value: colB }, uTime: { value: 0 } },
    vertexShader: planetVertex,
    fragmentShader: starFragment,
  });
  const sphere = new THREE.Mesh(new THREE.SphereGeometry(radius, 96, 64), mat);
  group.add(sphere);
  const glow1 = makeGlow(colB, radius * 5, 0.9);
  const glow2 = makeGlow(colA, radius * 14, 0.35);
  group.add(glow1, glow2);
  return {
    group,
    update(t) {
      mat.uniforms.uTime.value = t;
      sphere.rotation.y = t * 0.03;
      glow1.material.opacity = 0.8 + Math.sin(t * 1.3) * 0.08;
    },
  };
}

const orbFragment = /* glsl */ `
  ${noiseGLSL}
  uniform vec3 uColor; uniform vec3 uColor2; uniform float uTime; uniform float uHover;
  varying vec3 vObj; varying vec3 vNormalW; varying vec3 vPosW;
  void main() {
    vec3 N = normalize(vNormalW);
    vec3 V = normalize(cameraPosition - vPosW);
    float fres = pow(1.0 - max(dot(N, V), 0.0), 2.2);
    float swirl = fbm(vObj * 2.0 + vec3(uTime * 0.15, -uTime * 0.1, 0.0));
    vec3 irid = 0.5 + 0.5 * cos(6.2831 * (fres * 0.8 + swirl * 0.4 + vec3(0.0, 0.33, 0.67)));
    float veins = pow(1.0 - abs(snoise(vObj * 3.5 + swirl * 1.5 + uTime * 0.05)), 6.0);
    vec3 col = mix(uColor * 0.08, uColor2 * 0.35, smoothstep(-0.3, 0.7, swirl));
    col += uColor2 * veins * 0.45;
    col += irid * fres * 0.7 + uColor * fres * 0.6;
    col *= 1.0 + uHover * 0.8;
    gl_FragColor = vec4(col, 0.6 + fres * 0.4);
  }
`;

// Glassy, iridescent "thought bubble" used for insights and link satellites.
export function createOrb({ color, color2, radius = 1 }) {
  const group = new THREE.Group();
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color(color) },
      uColor2: { value: new THREE.Color(color2 || color) },
      uTime: { value: 0 },
      uHover: { value: 0 },
    },
    vertexShader: planetVertex,
    fragmentShader: orbFragment,
    transparent: true,
    depthWrite: false,
  });
  const sphere = new THREE.Mesh(new THREE.SphereGeometry(radius, 64, 40), mat);
  group.add(sphere);
  const glowBase = radius > 2 ? 0.16 : 0.4;
  const glow = makeGlow(color, radius * (radius > 2 ? 3.2 : 4.5), glowBase);
  group.add(glow);
  return {
    group,
    sphere,
    update(t, hover = 0) {
      mat.uniforms.uTime.value = t;
      mat.uniforms.uHover.value += (hover - mat.uniforms.uHover.value) * 0.12;
      glow.material.opacity = glowBase + mat.uniforms.uHover.value * 0.5;
    },
  };
}
