import * as THREE from 'three';
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { disposeTree } from '../gfx/textures.js';

export function makeLabel(html, className, onClick) {
  const el = document.createElement('div');
  el.className = 'label ' + (className || '');
  el.innerHTML = html;
  if (onClick) {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      onClick();
    });
  }
  const obj = new CSS2DObject(el);
  obj.center.set(0.5, 0);
  return obj;
}

// Invisible but raycastable sphere — makes small or sparse things easy to hover.
export function makeHitSphere(radius) {
  const mat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false, colorWrite: false });
  return new THREE.Mesh(new THREE.SphereGeometry(radius, 16, 12), mat);
}

export function orbitLine(radius, color, opacity = 0.18) {
  const pts = [];
  for (let i = 0; i <= 256; i++) {
    const a = (i / 256) * Math.PI * 2;
    pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
  }
  const geo = new THREE.BufferGeometry().setFromPoints(pts);
  const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity, blending: THREE.AdditiveBlending, depthWrite: false });
  return new THREE.Line(geo, mat);
}

export function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

/**
 * Base for every zoom level. Subclasses fill `group`, `picks` and the camera config.
 * A pick is { id, object (anchor Object3D), hit (raycast mesh), enterRadius, hoverHtml, node }.
 */
export class Level {
  constructor(app) {
    this.app = app;
    this.group = new THREE.Group();
    this.picks = [];
    this.view = { distance: 100, min: 10, max: 300, start: 400, dir: new THREE.Vector3(0, 0.5, 1).normalize() };
    this.hovered = null;
  }

  pickById(id) {
    return this.picks.find((p) => p.id === id);
  }

  childPosition(id) {
    const p = this.pickById(id);
    if (!p) return new THREE.Vector3();
    return p.object.getWorldPosition(new THREE.Vector3());
  }

  update() {}

  dispose() {
    this.group.traverse((o) => {
      if (o.isCSS2DObject) o.element.remove();
    });
    disposeTree(this.group);
  }
}
