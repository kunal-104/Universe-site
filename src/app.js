import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

import { createBackground } from './gfx/background.js';
import { createWarp } from './gfx/warp.js';
import { UniverseLevel } from './levels/universe.js';
import { GalaxyLevel } from './levels/galaxy.js';
import { PlanetLevel } from './levels/planet.js';
import { InsightLevel } from './levels/insight.js';
import { HUD } from './ui/hud.js';
import { galaxies } from './data/index.js';

const ease = {
  inCubic: (t) => t * t * t,
  outCubic: (t) => 1 - Math.pow(1 - t, 3),
  outQuint: (t) => 1 - Math.pow(1 - t, 5),
  inOut: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
};

const BLOOM = { universe: 1.0, galaxy: 0.8, planet: 0.45, insight: 0.5 };
const BLOOM_THRESHOLD = { universe: 0.1, galaxy: 0.2, planet: 0.55, insight: 0.3 };
const BASE_FOV = 50;

export function pathFor(node) {
  const path = [{ kind: 'universe' }];
  if (node.kind === 'universe') return path;
  path.push({ kind: 'galaxy', g: node.g });
  if (node.kind === 'galaxy') return path;
  path.push({ kind: 'planet', g: node.g, p: node.p });
  if (node.kind === 'planet') return path;
  path.push({ kind: 'insight', g: node.g, p: node.p, i: node.i });
  return path;
}

function childId(node) {
  if (node.kind === 'galaxy') return galaxies[node.g].id;
  if (node.kind === 'planet') return galaxies[node.g].planets[node.p].id;
  if (node.kind === 'insight') return 'i' + node.i;
  return null;
}

function sameNode(a, b) {
  return a.kind === b.kind && a.g === b.g && a.p === b.p && a.i === b.i;
}

export function nodeToHash(n) {
  if (n.kind === 'universe') return '#/';
  const g = galaxies[n.g];
  if (n.kind === 'galaxy') return `#/${g.id}`;
  const p = g.planets[n.p];
  if (n.kind === 'planet') return `#/${g.id}/${p.id}`;
  return `#/${g.id}/${p.id}/${n.i + 1}`;
}

export function hashToNode(hash) {
  const parts = hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  const gi = galaxies.findIndex((g) => g.id === parts[0]);
  if (gi < 0) return { kind: 'universe' };
  const pi = galaxies[gi].planets.findIndex((p) => p.id === parts[1]);
  if (pi < 0) return { kind: 'galaxy', g: gi };
  const ii = parseInt(parts[2], 10) - 1;
  if (!(ii >= 0 && ii < galaxies[gi].planets[pi].insights.length)) return { kind: 'planet', g: gi, p: pi };
  return { kind: 'insight', g: gi, p: pi, i: ii };
}

export class App {
  constructor() {
    this.stage = document.getElementById('stage');
    const w = innerWidth;
    const h = innerHeight;

    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    this.renderer.setSize(w, h);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.stage.appendChild(this.renderer.domElement);

    this.labels = new CSS2DRenderer({ element: document.getElementById('labels') });
    this.labels.setSize(w, h);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(BASE_FOV, w / h, 0.1, 20000);
    this.scene.add(this.camera);

    this.background = createBackground();
    this.scene.add(this.background.group);
    this.warp = createWarp();
    this.camera.add(this.warp.object);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.06;
    this.controls.zoomToCursor = true;
    this.controls.enablePan = false;
    this.controls.rotateSpeed = 0.55;
    this.controls.zoomSpeed = 1.1;
    this.controls.autoRotateSpeed = 0.25;

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.bloom = new UnrealBloomPass(new THREE.Vector2(w, h), 1.0, 0.55, 0.1);
    this.composer.addPass(this.bloom);
    this.composer.addPass(new OutputPass());
    this.bloomBase = 1.0;

    this.clock = new THREE.Timer();
    this.clock.connect(document);
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2(-10, -10);
    this.pointerPx = { x: -100, y: -100 };
    this.pointerInside = false;
    this.tweens = [];
    this.busy = false;
    this.path = [];
    this.level = null;
    this.hovered = null;
    this.pressureIn = 0;
    this.pressureOut = 0;
    this.lastZoomIn = -10;
    this.lastInteract = -10;
    this.activePointers = new Set();
    this.prevDist = 0;

    this.hud = new HUD(this);
    this.bindEvents();
    this.updateViewOffset();
    this.camera.updateProjectionMatrix();
    new MutationObserver(() => this.updateViewOffset()).observe(document.getElementById('panel'), { attributes: true, attributeFilter: ['class'] });
  }

  // ---------- lifecycle ----------
  start(node, { intro = false } = {}) {
    this.setNode(node);
    const v = this.level.view;
    this.controls.target.set(0, 0, 0);
    this.camera.position.copy(v.dir).multiplyScalar(intro ? v.start * 2.5 : v.distance);
    this.camera.lookAt(0, 0, 0);
    this.busy = intro;
    this.renderer.setAnimationLoop(() => this.tick());
  }

  async enter() {
    this.busy = true;
    await this.arrive(2.8);
    this.busy = false;
  }

  setNode(node) {
    if (this.level) {
      this.scene.remove(this.level.group);
      this.level.dispose();
    }
    this.hovered = null;
    this.hud.tooltip(null);
    switch (node.kind) {
      case 'galaxy':
        this.level = new GalaxyLevel(this, node.g);
        break;
      case 'planet':
        this.level = new PlanetLevel(this, node.g, node.p);
        break;
      case 'insight':
        this.level = new InsightLevel(this, node.g, node.p, node.i);
        break;
      default:
        this.level = new UniverseLevel(this);
    }
    this.scene.add(this.level.group);
    this.path = pathFor(node);
    this.node = node;
    const v = this.level.view;
    this.controls.minDistance = v.min;
    this.controls.maxDistance = v.max;
    this.controls.autoRotate = node.kind === 'universe' || node.kind === 'galaxy';
    this.bloomBase = BLOOM[node.kind];
    this.bloom.threshold = BLOOM_THRESHOLD[node.kind];
    if (node.kind === 'universe') this.background.setTint('#3b1d8f', '#0b5d7a');
    else this.background.setTint(galaxies[node.g].colors[0], galaxies[node.g].colors[1]);
    this.hud.setPath(this.path);
    this.hud.showNode(node);
    const hash = nodeToHash(node);
    if (location.hash !== hash) history.replaceState(null, '', hash);
  }

  // ---------- tweens ----------
  tween(duration, easing, fn) {
    return new Promise((resolve) => {
      this.tweens.push({ t: 0, duration, easing, fn, resolve });
    });
  }

  runTweens(dt) {
    for (let i = this.tweens.length - 1; i >= 0; i--) {
      const tw = this.tweens[i];
      tw.t = Math.min(1, tw.t + dt / tw.duration);
      tw.fn(tw.easing(tw.t), tw.t);
      if (tw.t >= 1) {
        this.tweens.splice(i, 1);
        tw.resolve();
      }
    }
  }

  setFov(f) {
    this.camera.fov = f;
    this.camera.updateProjectionMatrix();
  }

  // ---------- navigation ----------
  goTo(node) {
    if (this.busy) {
      this.pending = node;
      return;
    }
    if (sameNode(node, this.node)) return;
    const parent = this.path[this.path.length - 2];
    if (parent && sameNode(parent, node)) return this.ascend();
    const childPath = pathFor(node);
    if (childPath.length === this.path.length + 1 && sameNode(childPath[childPath.length - 2], this.node)) {
      const pick = this.level.pickById(childId(node));
      if (pick) return this.diveInto(pick);
    }
    return this.jumpTo(node, childPath.length >= this.path.length ? 1 : -1);
  }

  async diveInto(pick) {
    if (this.busy || !pick || !pick.node) return;
    this.busy = true;
    this.pressureIn = this.pressureOut = 0;
    this.hud.tooltip(null);
    this.hud.pressure(0);
    const startPos = this.camera.position.clone();
    const startTarget = this.controls.target.clone();
    const tp = new THREE.Vector3();
    const fov0 = this.camera.fov;
    this.warp.state.dir = 1;
    await this.tween(1.15, ease.inCubic, (e) => {
      pick.object.getWorldPosition(tp);
      const dir = startPos.clone().sub(tp).normalize();
      const end = tp.clone().addScaledVector(dir, Math.max(pick.enterRadius * 0.12, 0.4));
      this.camera.position.lerpVectors(startPos, end, e);
      this.controls.target.lerpVectors(startTarget, tp, Math.min(1, e * 1.8));
      this.camera.lookAt(this.controls.target);
      this.setFov(fov0 + 32 * e);
      this.warp.state.amount = e;
      this.bloom.strength = this.bloomBase + e * 1.4;
      this.hud.flash(Math.max(0, (e - 0.6) / 0.4));
    });
    this.setNode(pick.node);
    await this.arrive();
    this.busy = false;
  }

  // Fly into the freshly built level from far away.
  async arrive(farMul = 1) {
    const v = this.level.view;
    const from = v.dir.clone().multiplyScalar(v.start * farMul);
    const to = v.dir.clone().multiplyScalar(v.distance);
    this.controls.target.set(0, 0, 0);
    this.warp.state.dir = 1;
    await this.tween(farMul > 1 ? 3.2 : 1.7, ease.outQuint, (e, raw) => {
      this.camera.position.lerpVectors(from, to, e);
      this.camera.lookAt(0, 0, 0);
      this.setFov(BASE_FOV + 32 * (1 - e));
      this.warp.state.amount = Math.max(0, 1 - raw * 1.6);
      this.bloom.strength = this.bloomBase + (1 - e) * 1.4;
      this.hud.flash(Math.max(0, 1 - raw * 3));
    });
    this.controls.update();
  }

  async ascend() {
    if (this.busy || this.path.length <= 1) return;
    this.busy = true;
    this.pressureIn = this.pressureOut = 0;
    this.hud.tooltip(null);
    this.hud.pressure(0);
    const child = this.node;
    const parent = this.path[this.path.length - 2];
    const startPos = this.camera.position.clone();
    const target = this.controls.target.clone();
    const fov0 = this.camera.fov;
    this.warp.state.dir = -1;
    await this.tween(0.9, ease.inCubic, (e) => {
      this.camera.position.copy(target).addScaledVector(startPos.clone().sub(target), 1 + e * 5);
      this.camera.lookAt(target);
      this.setFov(fov0 + 30 * e);
      this.warp.state.amount = e;
      this.bloom.strength = this.bloomBase + e * 1.2;
      this.hud.flash(Math.max(0, (e - 0.65) / 0.35) * 0.8);
    });
    this.setNode(parent);
    const pick = this.level.pickById(childId(child));
    const cp = pick ? pick.object.getWorldPosition(new THREE.Vector3()) : new THREE.Vector3();
    const v = this.level.view;
    const startCam = cp.clone().addScaledVector(v.dir, pick ? Math.max(pick.enterRadius * 0.5, 1) : 5);
    const endCam = v.dir.clone().multiplyScalar(v.distance);
    await this.tween(1.8, ease.inOut, (e, raw) => {
      this.controls.target.lerpVectors(cp, new THREE.Vector3(), e);
      this.camera.position.lerpVectors(startCam, endCam, e);
      this.camera.lookAt(this.controls.target);
      this.setFov(BASE_FOV + 30 * (1 - Math.min(1, raw * 1.5)));
      this.warp.state.amount = Math.max(0, 1 - raw * 1.8);
      this.bloom.strength = this.bloomBase + Math.max(0, 1 - raw * 2) * 1.2;
      this.hud.flash(Math.max(0, 0.8 - raw * 3));
    });
    this.warp.state.dir = 1;
    this.controls.update();
    this.busy = false;
  }

  // Hyperspace jump to any node in the universe (search, breadcrumbs, surprise).
  async jumpTo(node, dir = 1) {
    if (this.busy) return;
    this.busy = true;
    this.hud.tooltip(null);
    const startPos = this.camera.position.clone();
    const target = this.controls.target.clone();
    const fov0 = this.camera.fov;
    this.warp.state.dir = dir;
    await this.tween(0.85, ease.inCubic, (e) => {
      const k = dir > 0 ? 1 - e * 0.85 : 1 + e * 4;
      this.camera.position.copy(target).addScaledVector(startPos.clone().sub(target), k);
      this.camera.lookAt(target);
      this.setFov(fov0 + 32 * e);
      this.warp.state.amount = e;
      this.bloom.strength = this.bloomBase + e * 1.4;
      this.hud.flash(Math.max(0, (e - 0.55) / 0.45));
    });
    this.setNode(node);
    await this.arrive();
    this.busy = false;
  }

  zoomStep(sign) {
    if (this.busy) return;
    const d = this.camera.position.distanceTo(this.controls.target);
    if (sign > 0) {
      if (d <= this.controls.minDistance * 1.25) {
        const pick = this.focusPick();
        if (pick && pick.node) this.diveInto(pick);
        return;
      }
    } else if (d >= this.controls.maxDistance * 0.8) {
      this.ascend();
      return;
    }
    const target = this.controls.target.clone();
    const from = this.camera.position.clone();
    const newD = THREE.MathUtils.clamp(d * (sign > 0 ? 0.6 : 1.6), this.controls.minDistance, this.controls.maxDistance);
    const to = target.clone().addScaledVector(from.clone().sub(target).normalize(), newD);
    this.lastZoomIn = sign > 0 ? this.clock.getElapsed() + 0.6 : -10;
    this.tween(0.6, ease.outCubic, (e) => this.camera.position.lerpVectors(from, to, e));
  }

  openLink(url) {
    window.open(url, '_blank', 'noopener');
  }

  // Hovered pick, otherwise the enterable object nearest the screen centre.
  focusPick() {
    if (this.hovered && this.hovered.node) return this.hovered;
    let best = null;
    let bestScore = Infinity;
    const v = new THREE.Vector3();
    for (const p of this.level.picks) {
      if (!p.node) continue;
      p.object.getWorldPosition(v);
      const dist = v.distanceTo(this.camera.position);
      v.project(this.camera);
      if (v.z > 1) continue;
      const score = Math.hypot(v.x, v.y) * 3 + dist / this.level.view.distance;
      if (score < bestScore) {
        bestScore = score;
        best = p;
      }
    }
    return best;
  }

  // ---------- input ----------
  bindEvents() {
    const canvas = this.renderer.domElement;
    addEventListener('resize', () => this.onResize());
    addEventListener('pointermove', (e) => {
      this.pointerPx = { x: e.clientX, y: e.clientY };
      this.pointer.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
      this.pointerInside = e.target === canvas;
    });
    canvas.addEventListener('pointerdown', (e) => {
      this.activePointers.add(e.pointerId);
      this.down = { x: e.clientX, y: e.clientY, t: performance.now() };
      this.lastInteract = this.clock.getElapsed();
      this.controls.autoRotate = false;
    });
    const up = (e) => {
      this.activePointers.delete(e.pointerId);
      if (!this.down) return;
      const moved = Math.hypot(e.clientX - this.down.x, e.clientY - this.down.y);
      const quick = performance.now() - this.down.t < 450;
      this.down = null;
      if (moved < 6 && quick && e.target === canvas) {
        this.pointer.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
        this.updateHover();
        const pick = this.hovered;
        if (!pick) return;
        if (pick.url) this.openLink(pick.url);
        else this.diveInto(pick);
      }
    };
    addEventListener('pointerup', up);
    addEventListener('pointercancel', (e) => this.activePointers.delete(e.pointerId));

    canvas.addEventListener(
      'wheel',
      (e) => {
        if (this.busy) return;
        this.lastInteract = this.clock.getElapsed();
        this.controls.autoRotate = false;
        const d = this.camera.position.distanceTo(this.controls.target);
        const push = Math.min(Math.abs(e.deltaY), 150) / 420;
        if (e.deltaY < 0) {
          this.lastZoomIn = this.clock.getElapsed();
          this.pressureOut = 0;
          if (d <= this.controls.minDistance * 1.04) this.pressureIn += push;
        } else if (e.deltaY > 0) {
          this.lastZoomIn = -10;
          this.pressureIn = 0;
          if (d >= this.controls.maxDistance * 0.96) this.pressureOut += push;
        }
      },
      { passive: true }
    );

    // Labels sit above the canvas; forward their wheel events so zoom never "sticks".
    document.getElementById('labels').addEventListener(
      'wheel',
      (e) => {
        e.preventDefault();
        canvas.dispatchEvent(new WheelEvent('wheel', e));
      },
      { passive: false }
    );

    addEventListener('keydown', (e) => {
      if (this.hud.searchOpen) return;
      if (e.key === '/' || (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey))) {
        e.preventDefault();
        this.hud.openSearch();
      } else if (e.key === 'Escape' || e.key === 'Backspace') {
        this.ascend();
      } else if (e.key === 'Enter' || e.key === '+' || e.key === '=') {
        this.zoomStep(1);
      } else if (e.key === '-' || e.key === '_') {
        this.zoomStep(-1);
      }
    });

    addEventListener('hashchange', () => {
      const n = hashToNode(location.hash);
      if (!sameNode(n, this.node)) this.goTo(n);
    });
  }

  // Centre the 3D scene in the free space to the right of the side panel.
  updateViewOffset() {
    const w = innerWidth;
    const h = innerHeight;
    const panel = document.getElementById('panel');
    const desktop = w > 720;
    const shift = desktop && !panel.classList.contains('collapsed') ? Math.min(panel.offsetWidth + 20, w * 0.4) / 2 : 0;
    this.viewShift = this.viewShift ?? shift;
    this.viewShiftTarget = shift;
    this.camera.setViewOffset(w, h, -this.viewShift, 0, w, h);
  }

  onResize() {
    const w = innerWidth;
    const h = innerHeight;
    this.camera.aspect = w / h;
    this.updateViewOffset();
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
    this.composer.setSize(w, h);
    this.bloom.setSize(w, h);
    this.labels.setSize(w, h);
  }

  updateHover() {
    if (this.busy || !this.level) {
      this.hovered = null;
      return;
    }
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const hits = this.raycaster.intersectObjects(
      this.level.picks.map((p) => p.hit),
      false
    );
    this.hovered = hits.length ? hits[0].object.userData.pick : null;
  }

  // ---------- frame ----------
  tick() {
    this.clock.update();
    const dt = Math.min(this.clock.getDelta(), 0.05);
    const t = this.clock.getElapsed();
    this.runTweens(dt);
    if (!this.busy && this.pending) {
      const n = this.pending;
      this.pending = null;
      this.goTo(n);
    }

    if (!this.busy) {
      if (!this.controls.autoRotate && t - this.lastInteract > 8 && (this.node.kind === 'universe' || this.node.kind === 'galaxy')) {
        this.controls.autoRotate = true;
      }
      this.controls.update(dt);
      if (this.activePointers.size >= 2) {
        const d = this.camera.position.distanceTo(this.controls.target);
        if (d < this.prevDist - 0.01) this.lastZoomIn = t;
        this.prevDist = d;
      }
      this.updateHover();
      this.checkZoomThresholds(t, dt);
    }

    this.level.hovered = this.hovered;
    this.level.update(t, dt);
    this.background.update(t, dt, this.camera);
    this.warp.update(dt);
    if (!this.busy) this.bloom.strength += (this.bloomBase - this.bloom.strength) * 0.08;
    if (Math.abs(this.viewShift - this.viewShiftTarget) > 0.5) {
      this.viewShift += (this.viewShiftTarget - this.viewShift) * Math.min(1, dt * 5);
      this.camera.setViewOffset(innerWidth, innerHeight, -this.viewShift, 0, innerWidth, innerHeight);
      this.camera.updateProjectionMatrix();
    }

    if (!this.busy && this.hovered && this.pointerInside) {
      this.hud.tooltip(this.hovered.hoverHtml, this.pointerPx.x, this.pointerPx.y);
      this.renderer.domElement.style.cursor = 'pointer';
    } else {
      this.hud.tooltip(null);
      this.renderer.domElement.style.cursor = this.busy ? 'progress' : 'grab';
    }

    this.composer.render();
    this.labels.render(this.scene, this.camera);
  }

  checkZoomThresholds(t, dt) {
    // 1) Flying close enough to something while zooming in carries you inside it.
    if (t - this.lastZoomIn < 0.5) {
      const v = new THREE.Vector3();
      for (const p of this.level.picks) {
        if (!p.node || !p.enterRadius) continue;
        p.object.getWorldPosition(v);
        if (v.distanceTo(this.camera.position) < p.enterRadius) {
          this.diveInto(p);
          return;
        }
      }
    }
    // 2) Pushing past the zoom limits builds "pressure" that breaks through a level.
    this.pressureIn = Math.max(0, this.pressureIn - dt * 0.6);
    this.pressureOut = Math.max(0, this.pressureOut - dt * 0.6);
    const x = this.pointerPx.x;
    const y = this.pointerPx.y;
    if (this.pressureIn > 0) {
      const pick = this.focusPick();
      if (!pick) this.pressureIn = 0;
      else if (this.pressureIn >= 1) return this.diveInto(pick);
      else this.hud.pressure(this.pressureIn, x, y, 'Entering ' + pick.title);
    } else if (this.pressureOut > 0) {
      if (this.path.length <= 1) this.pressureOut = 0;
      else if (this.pressureOut >= 1) return this.ascend();
      else this.hud.pressure(this.pressureOut, x, y, 'Leaving to ' + this.hud.nodeLabel(this.path[this.path.length - 2]));
    }
    if (this.pressureIn <= 0 && this.pressureOut <= 0) this.hud.pressure(0);
  }
}
