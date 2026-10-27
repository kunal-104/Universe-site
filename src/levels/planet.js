import * as THREE from 'three';
import { Level, makeLabel, makeHitSphere, orbitLine, escapeHtml } from './common.js';
import { createPlanet, createOrb } from '../gfx/planet.js';
import { makeGlow, rng } from '../gfx/textures.js';
import { galaxies } from '../data/index.js';

export class PlanetLevel extends Level {
  constructor(app, gi, pi) {
    super(app);
    const g = galaxies[gi];
    const p = g.planets[pi];
    this.data = p;
    this.view = { distance: 46, min: 15, max: 120, start: 170, dir: new THREE.Vector3(0.35, 0.22, 1).normalize() };
    const rand = rng('planet:' + p.id);
    this._v = new THREE.Vector3();

    this.lightPos = new THREE.Vector3(260, 90, 160);
    const sun = makeGlow(new THREE.Color(g.colors[1]).lerp(new THREE.Color('#fff'), 0.6), 140, 0.9);
    sun.position.copy(this.lightPos);
    this.group.add(sun);

    this.planet = createPlanet({ look: p.look, radius: 10, detail: 1.2, lightPos: this.lightPos, segments: 160 });
    this.planet.group.rotation.z = 0.2;
    this.group.add(this.planet.group);

    // Moons are insight bubbles: each one is a "shock fact" you can fly into.
    this.moons = [];
    p.insights.forEach((ins, i) => {
      const orbitR = 18 + i * 3.6;
      const plane = new THREE.Group();
      plane.rotation.set((rand() - 0.5) * 0.9, rand() * Math.PI, (rand() - 0.5) * 0.6);
      plane.add(orbitLine(orbitR, g.colors[i % 2], 0.16));
      const anchor = new THREE.Group();
      plane.add(anchor);
      const orb = createOrb({ color: g.colors[i % 2], color2: g.colors[(i + 1) % 2], radius: 1.5 });
      anchor.add(orb.group);
      const hit = makeHitSphere(3.2);
      anchor.add(hit);
      const pick = {
        id: 'i' + i,
        object: anchor,
        hit,
        enterRadius: 6,
        node: { kind: 'insight', g: gi, p: pi, i },
        title: ins.headline,
        hoverHtml: `<div class="tt-kicker" style="color:${g.colors[1]}">Insight ${i + 1} of ${p.insights.length}</div><div class="tt-stat">${escapeHtml(ins.stat)}</div><div class="tt-title">${escapeHtml(ins.headline)}</div><div class="tt-hint">Click to dive into the evidence</div>`,
      };
      const label = makeLabel(
        `<span class="stat">${escapeHtml(ins.stat)}</span><span class="tag">${escapeHtml(ins.headline)}</span>`,
        'moon-label',
        () => app.diveInto(pick)
      );
      label.position.set(0, -2.6, 0);
      anchor.add(label);
      hit.userData.pick = pick;
      this.picks.push(pick);
      this.group.add(plane);
      this.moons.push({ orb, anchor, pick, label, orbitR, angle: (i / p.insights.length) * Math.PI * 2 + rand(), speed: 0.12 / Math.sqrt(orbitR / 18), slow: 1 });
    });

    // Orbital debris
    const count = 2500;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const a = rand() * Math.PI * 2;
      const r = 13 + rand() * 22;
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = (rand() - 0.5) * 2.5 * (r / 20);
      pos[i * 3 + 2] = Math.sin(a) * r;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    this.debris = new THREE.Points(
      geo,
      new THREE.PointsMaterial({ color: g.colors[1], size: 0.12, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    this.debris.rotation.x = 0.25;
    this.group.add(this.debris);
  }

  update(t, dt) {
    this.planet.update(t, 0);
    this.debris.rotation.y = t * 0.01;
    for (const m of this.moons) {
      const hovered = this.hovered === m.pick;
      m.slow += ((hovered ? 0.04 : 1) - m.slow) * 0.08;
      m.angle += dt * m.speed * m.slow;
      m.anchor.position.set(Math.cos(m.angle) * m.orbitR, 0, Math.sin(m.angle) * m.orbitR);
      m.orb.update(t, hovered ? 1 : 0);
      // Dim labels of moons hidden behind the planet.
      const cam = this.app.camera.position;
      m.anchor.getWorldPosition(this._v);
      const toMoon = this._v.sub(cam);
      const along = -cam.dot(toMoon.clone().normalize());
      const behind = toMoon.length() > cam.length() && cam.lengthSq() - along * along < 100;
      m.label.element.style.opacity = behind ? '0.12' : '';
    }
  }
}
