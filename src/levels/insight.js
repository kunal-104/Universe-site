import * as THREE from 'three';
import { Level, makeLabel, makeHitSphere, escapeHtml } from './common.js';
import { createOrb } from '../gfx/planet.js';
import { rng } from '../gfx/textures.js';
import { galaxies } from '../data/index.js';

export function hostOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

// Deepest level: the insight itself, ringed by "portal" satellites that open
// real sources and courses for in-depth study.
export class InsightLevel extends Level {
  constructor(app, gi, pi, ii) {
    super(app);
    const g = galaxies[gi];
    const p = g.planets[pi];
    const ins = p.insights[ii];
    this.data = ins;
    this.view = { distance: 34, min: 11, max: 80, start: 120, dir: new THREE.Vector3(-0.25, 0.18, 1).normalize() };
    const rand = rng('insight:' + p.id + ii);

    this.core = createOrb({ color: g.colors[ii % 2], color2: g.colors[(ii + 1) % 2], radius: 5 });
    this.group.add(this.core.group);

    const links = [...p.links];
    if (ins.source && !links.some((l) => l.url === ins.source.url)) {
      links.unshift({ title: 'Source: ' + ins.source.name, url: ins.source.url, desc: 'Where this number comes from' });
    }

    this.sats = [];
    links.forEach((link, i) => {
      const plane = new THREE.Group();
      plane.rotation.set((rand() - 0.5) * 1.2, (i / links.length) * Math.PI * 2, (rand() - 0.5) * 0.8);
      const anchor = new THREE.Group();
      plane.add(anchor);
      const orb = createOrb({ color: i === 0 ? '#ffffff' : g.colors[(i + 1) % 2], color2: g.colors[i % 2], radius: 0.75 });
      anchor.add(orb.group);
      const hit = makeHitSphere(1.8);
      anchor.add(hit);
      const pick = {
        id: 'link' + i,
        object: anchor,
        hit,
        enterRadius: 0,
        url: link.url,
        title: link.title,
        hoverHtml: `<div class="tt-kicker" style="color:${g.colors[1]}">Go deeper ↗ ${escapeHtml(hostOf(link.url))}</div><div class="tt-title">${escapeHtml(link.title)}</div><div class="tt-body">${escapeHtml(link.desc || '')}</div><div class="tt-hint">Click to open in a new tab</div>`,
      };
      const label = makeLabel(
        `<span class="name">${escapeHtml(link.title)} <em>↗</em></span><span class="tag">${escapeHtml(hostOf(link.url))}</span>`,
        'link-label',
        () => app.openLink(link.url)
      );
      label.position.set(0, -1.6, 0);
      anchor.add(label);
      hit.userData.pick = pick;
      this.picks.push(pick);
      this.group.add(plane);
      this.sats.push({ orb, anchor, pick, r: 10 + (i % 3) * 2.4, angle: rand() * Math.PI * 2, speed: 0.1 + rand() * 0.05, slow: 1 });
    });

    // Sparks of "knowledge" swirling around the core
    const count = 1800;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const u = rand() * 2 - 1;
      const th = rand() * Math.PI * 2;
      const r = 6 + Math.pow(rand(), 2) * 22;
      const s = Math.sqrt(1 - u * u);
      pos.set([r * s * Math.cos(th), r * u * 0.5, r * s * Math.sin(th)], i * 3);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    this.sparks = new THREE.Points(
      geo,
      new THREE.PointsMaterial({ color: g.colors[1], size: 0.09, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    this.group.add(this.sparks);
  }

  update(t, dt) {
    this.core.update(t, 0);
    this.sparks.rotation.y = t * 0.03;
    this.sparks.rotation.x = Math.sin(t * 0.1) * 0.1;
    for (const s of this.sats) {
      const hovered = this.hovered === s.pick;
      s.slow += ((hovered ? 0.03 : 1) - s.slow) * 0.08;
      s.angle += dt * s.speed * s.slow;
      s.anchor.position.set(Math.cos(s.angle) * s.r, 0, Math.sin(s.angle) * s.r);
      s.orb.update(t, hovered ? 1 : 0);
    }
  }
}
