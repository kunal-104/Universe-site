import * as THREE from 'three';
import { rng } from './textures.js';

// Hyperspace streaks parented to the camera. `amount` (0..1) controls both
// visibility and streak length; direction flips when zooming out.
export function createWarp() {
  const rand = rng('warp');
  const count = 900;
  const pos = new Float32Array(count * 6);
  const seeds = [];
  for (let i = 0; i < count; i++) {
    const ang = rand() * Math.PI * 2;
    const r = 2 + Math.pow(rand(), 0.6) * 30;
    seeds.push({ x: Math.cos(ang) * r, y: Math.sin(ang) * r, z: -rand() * 200, speed: 0.6 + rand() * 0.8 });
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const col = new Float32Array(count * 6);
  for (let i = 0; i < count; i++) {
    const c = new THREE.Color().setHSL(0.55 + rand() * 0.25, 0.8, 0.75);
    col.set([c.r, c.g, c.b, c.r * 0.05, c.g * 0.05, c.b * 0.05], i * 6);
  }
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  const mat = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    depthTest: false,
  });
  const lines = new THREE.LineSegments(geo, mat);
  lines.frustumCulled = false;
  lines.renderOrder = 999;

  const state = { amount: 0, dir: 1 };
  return {
    object: lines,
    state,
    update(dt) {
      const a = state.amount;
      mat.opacity = Math.min(1, a * 1.3);
      lines.visible = a > 0.01;
      if (!lines.visible) return;
      const len = 4 + a * 60;
      const p = geo.attributes.position.array;
      for (let i = 0; i < count; i++) {
        const s = seeds[i];
        s.z += dt * s.speed * (80 + a * 420) * state.dir;
        if (state.dir > 0 && s.z > 0) s.z -= 200;
        if (state.dir < 0 && s.z < -200) s.z += 200;
        const tail = s.z - len * s.speed * state.dir;
        p[i * 6] = s.x;
        p[i * 6 + 1] = s.y;
        p[i * 6 + 2] = s.z;
        p[i * 6 + 3] = s.x;
        p[i * 6 + 4] = s.y;
        p[i * 6 + 5] = tail;
      }
      geo.attributes.position.needsUpdate = true;
    },
  };
}
