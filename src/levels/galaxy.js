import * as THREE from 'three';
import { Level, makeLabel, makeHitSphere, orbitLine, escapeHtml } from './common.js';
import { createGalaxyPoints } from '../gfx/galaxy.js';
import { createPlanet, createStar } from '../gfx/planet.js';
import { rng } from '../gfx/textures.js';
import { galaxies } from '../data/index.js';

export class GalaxyLevel extends Level {
  constructor(app, gi) {
    super(app);
    const g = galaxies[gi];
    this.data = g;
    this.view = { distance: 125, min: 14, max: 300, start: 520, dir: new THREE.Vector3(0.1, 0.55, 1).normalize() };
    const rand = rng('galaxy:' + g.id);

    // We are now inside the galaxy: its spiral becomes the sky around us.
    this.backdrop = createGalaxyPoints({ id: g.id + '-inner', colors: g.colors, shape: g.shape, radius: 320, count: 42000, size: 0.3, spin: 0.03 });
    this.backdrop.group.position.y = -18;
    this.backdrop.group.rotation.x = 0.06;
    this.backdrop.core.visible = false;
    this.backdrop.halo.visible = false;
    this.backdrop.material.uniforms.uNearFade.value = 1;
    this.backdrop.setOpacity(0.32);
    this.group.add(this.backdrop.group);

    this.star = createStar({ colors: g.colors, radius: 5 });
    this.group.add(this.star.group);
    this.lightPos = new THREE.Vector3(0, 0, 0);

    const centerLabel = makeLabel(`<span class="name">${escapeHtml(g.name)}</span>`, 'core-label');
    centerLabel.position.set(0, -9, 0);
    this.group.add(centerLabel);

    this.planets = [];
    g.planets.forEach((p, i) => {
      const orbitR = 22 + i * 12 + rand() * 4;
      const radius = p.size * 1.7;
      const plane = new THREE.Group();
      plane.rotation.set((rand() - 0.5) * 0.35, 0, (rand() - 0.5) * 0.35);
      plane.add(orbitLine(orbitR, g.colors[1], 0.22));
      const anchor = new THREE.Group();
      plane.add(anchor);
      const planet = createPlanet({ look: p.look, radius, lightPos: this.lightPos, segments: 64 });
      anchor.add(planet.group);
      const hit = makeHitSphere(radius * 2.2);
      anchor.add(hit);

      const node = { kind: 'planet', g: gi, p: i };
      const pick = {
        id: p.id,
        object: anchor,
        hit,
        enterRadius: radius * 4,
        node,
        title: p.name,
        hoverHtml: `<div class="tt-kicker" style="color:${g.colors[1]}">Planet · ${p.insights.length} insights</div><div class="tt-title">${escapeHtml(p.name)}</div><div class="tt-sub">${escapeHtml(p.subtitle)}</div><div class="tt-body">${escapeHtml(p.summary)}</div><div class="tt-hint">Scroll toward it or click to land</div>`,
      };
      const label = makeLabel(`<span class="name">${escapeHtml(p.name)}</span><span class="tag">${escapeHtml(p.subtitle)}</span>`, 'planet-label', () => app.diveInto(pick));
      label.position.set(0, -radius * 1.5, 0);
      anchor.add(label);

      hit.userData.pick = pick;
      this.picks.push(pick);
      this.group.add(plane);
      this.planets.push({
        planet,
        anchor,
        pick,
        orbitR,
        angle: rand() * Math.PI * 2,
        speed: 0.09 / Math.sqrt(orbitR / 22),
        slow: 1,
      });
    });
  }

  update(t, dt) {
    this.star.update(t);
    this.backdrop.update(t);
    for (const pl of this.planets) {
      const hovered = this.hovered === pl.pick;
      pl.slow += ((hovered ? 0.05 : 1) - pl.slow) * 0.08;
      pl.angle += dt * pl.speed * pl.slow;
      pl.anchor.position.set(Math.cos(pl.angle) * pl.orbitR, 0, Math.sin(pl.angle) * pl.orbitR);
      pl.planet.update(t, hovered ? 1 : 0);
    }
  }
}
