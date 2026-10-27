import * as THREE from 'three';
import { Level, makeLabel, makeHitSphere, escapeHtml } from './common.js';
import { createGalaxyPoints } from '../gfx/galaxy.js';
import { makeGlow, rng } from '../gfx/textures.js';
import { galaxies } from '../data/index.js';

const GALAXY_RADIUS = 40;

export function galaxyLayout(i) {
  const ang = i * 2.39996 + 0.6;
  const r = 150 + Math.sqrt(i) * 120;
  return new THREE.Vector3(Math.cos(ang) * r, Math.sin(i * 1.7) * 70, Math.sin(ang) * r);
}

export class UniverseLevel extends Level {
  constructor(app) {
    super(app);
    this.view = { distance: 760, min: 30, max: 1500, start: 2600, dir: new THREE.Vector3(0.15, 0.62, 1).normalize() };
    this.galaxies = [];
    const rand = rng('universe');

    galaxies.forEach((g, i) => {
      const anchor = new THREE.Group();
      anchor.position.copy(galaxyLayout(i));
      const tilt = new THREE.Group();
      tilt.rotation.set((rand() - 0.5) * 1.6, rand() * Math.PI, (rand() - 0.5) * 1.0);
      const gp = createGalaxyPoints({ id: g.id, colors: g.colors, shape: g.shape, radius: GALAXY_RADIUS, count: 11000, spin: 0.12 });
      tilt.add(gp.group);
      anchor.add(tilt);

      const hit = makeHitSphere(GALAXY_RADIUS * 0.8);
      anchor.add(hit);

      const node = { kind: 'galaxy', g: i };
      const label = makeLabel(
        `<span class="dot" style="--c:${g.colors[0]};--c2:${g.colors[1]}"></span><span class="name">${escapeHtml(g.name)}</span><span class="tag">${escapeHtml(g.tagline)}</span>`,
        'galaxy-label',
        () => app.diveInto(pick)
      );
      label.position.set(0, -GALAXY_RADIUS * 0.45, 0);
      anchor.add(label);

      this.group.add(anchor);
      const pick = {
        id: g.id,
        object: anchor,
        hit,
        enterRadius: GALAXY_RADIUS * 1.25,
        node,
        title: g.name,
        hoverHtml: `<div class="tt-kicker" style="color:${g.colors[1]}">Galaxy · ${g.planets.length} worlds</div><div class="tt-title">${escapeHtml(g.name)}</div><div class="tt-body">⚡ ${escapeHtml(g.teaser)}</div><div class="tt-hint">Scroll toward it or click to enter</div>`,
      };
      hit.userData.pick = pick;
      this.picks.push(pick);
      this.galaxies.push({ gp, pick, label });
    });

    // Distant, unreachable galaxies for depth — the universe is bigger than what we've mapped.
    for (let i = 0; i < 70; i++) {
      const dir = new THREE.Vector3(rand() - 0.5, (rand() - 0.5) * 0.6, rand() - 0.5).normalize();
      const glow = makeGlow(new THREE.Color().setHSL(0.55 + rand() * 0.4, 0.6, 0.65), 20 + rand() * 50, 0.25 + rand() * 0.3);
      glow.position.copy(dir.multiplyScalar(1400 + rand() * 900));
      this.group.add(glow);
    }

    // Faint cosmic web of dust between the worlds.
    const count = 4000;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const a = galaxyLayout(Math.floor(rand() * galaxies.length));
      const b = galaxyLayout(Math.floor(rand() * galaxies.length));
      const t = rand();
      pos[i * 3] = a.x + (b.x - a.x) * t + (rand() - 0.5) * 50;
      pos[i * 3 + 1] = a.y + (b.y - a.y) * t + (rand() - 0.5) * 50;
      pos[i * 3 + 2] = a.z + (b.z - a.z) * t + (rand() - 0.5) * 50;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const dust = new THREE.Points(
      geo,
      new THREE.PointsMaterial({ color: '#7d8bff', size: 1.4, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    this.group.add(dust);
  }

  update(t) {
    for (const { gp, pick } of this.galaxies) gp.update(t, this.hovered === pick ? 1 : 0);
  }
}
