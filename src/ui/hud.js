import { galaxies, stats } from '../data/index.js';
import { escapeHtml } from '../levels/common.js';
import { hostOf } from '../levels/insight.js';

const $ = (s) => document.querySelector(s);

const DEPTHS = [
  { kind: 'universe', label: 'Universe', scale: '10²⁶ m', note: 'All of human knowledge' },
  { kind: 'galaxy', label: 'Galaxy', scale: '10²¹ m', note: 'A whole field' },
  { kind: 'planet', label: 'Planet', scale: '10⁷ m', note: 'One subject' },
  { kind: 'insight', label: 'Insight', scale: '10⁰ m', note: 'One fact, up close' },
];

const HINTS = {
  universe: 'Drag to orbit · Scroll toward a galaxy to fly into it · Press / to search',
  galaxy: 'Scroll into a planet to land · Keep scrolling out to leave the galaxy',
  planet: 'Every moon is an insight — dive into one · Scroll out to return to orbit',
  insight: 'Satellites are portals to deeper study · Click one to open · Scroll out to go back',
};

function flatIndex() {
  const out = [];
  galaxies.forEach((g, gi) => {
    out.push({ node: { kind: 'galaxy', g: gi }, title: g.name, sub: 'Galaxy · ' + g.tagline, color: g.colors[0], text: (g.name + ' ' + g.tagline + ' ' + g.intro).toLowerCase() });
    g.planets.forEach((p, pi) => {
      out.push({ node: { kind: 'planet', g: gi, p: pi }, title: p.name, sub: `Planet in ${g.name} · ${p.subtitle}`, color: g.colors[1], text: (p.name + ' ' + p.subtitle + ' ' + p.summary + ' ' + g.name).toLowerCase() });
      p.insights.forEach((ins, ii) => {
        out.push({ node: { kind: 'insight', g: gi, p: pi, i: ii }, title: `${ins.stat} — ${ins.headline}`, sub: `Insight · ${g.name} › ${p.name}`, color: '#fff', text: (ins.stat + ' ' + ins.headline + ' ' + ins.detail + ' ' + p.name).toLowerCase() });
      });
    });
  });
  return out;
}

// Animate the numeric part of a stat ("$5.6M", "~90%", "1,012") from 0 up.
function countUp(el, stat) {
  const m = /^([^\d]*)([\d][\d,]*\.?\d*)(.*)$/.exec(stat);
  if (!m) {
    el.textContent = stat;
    return;
  }
  const [, pre, num, post] = m;
  const target = parseFloat(num.replace(/,/g, ''));
  const decimals = (num.split('.')[1] || '').length;
  const commas = num.includes(',');
  const start = performance.now();
  const dur = 1400;
  const fmt = (v) => {
    let s = v.toFixed(decimals);
    if (commas) s = Number(s).toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    return pre + s + post;
  };
  const step = (now) => {
    const k = Math.min(1, (now - start) / dur);
    const e = 1 - Math.pow(1 - k, 4);
    el.textContent = fmt(target * e);
    if (k < 1 && el.isConnected) requestAnimationFrame(step);
    else el.textContent = stat;
  };
  requestAnimationFrame(step);
}

export class HUD {
  constructor(app) {
    this.app = app;
    this.index = flatIndex();
    this.tooltipEl = $('#tooltip');
    this.pressureEl = $('#pressure');
    this.flashEl = $('#flash');
    this.panel = $('#panel');
    this.panelBody = $('#panel-body');
    this.tickerEl = $('#ticker');
    this.buildDepth();
    this.bindPanel();
    this.bindSearch();
    this.bindButtons();
    this.startTicker();
  }

  buildDepth() {
    $('#depth').innerHTML =
      DEPTHS.map((d, i) => `<button class="rung" data-depth="${i}" title="${d.note}"><span class="pip"></span><span class="rl">${d.label}</span><span class="rs">${d.scale}</span></button>`).join('') +
      '<div class="depth-line"><div class="depth-fill"></div></div>';
    $('#depth').addEventListener('click', (e) => {
      const b = e.target.closest('.rung');
      if (!b) return;
      const d = +b.dataset.depth;
      const path = this.app.path;
      if (d < path.length - 1) this.app.goTo(path[d]);
    });
  }

  bindButtons() {
    $('#zoom-in').addEventListener('click', () => this.app.zoomStep(1));
    $('#zoom-out').addEventListener('click', () => this.app.zoomStep(-1));
    $('#panel-toggle').addEventListener('click', () => this.panel.classList.toggle('collapsed'));
    this.tickerEl.addEventListener('click', () => {
      if (this.tickerNode) this.app.goTo(this.tickerNode);
    });
  }

  bindPanel() {
    this.panelBody.addEventListener('click', (e) => {
      const el = e.target.closest('[data-node]');
      if (el) {
        e.preventDefault();
        this.app.goTo(JSON.parse(el.dataset.node));
        return;
      }
      if (e.target.closest('[data-surprise]')) this.surprise();
      const copy = e.target.closest('[data-copy]');
      if (copy) {
        navigator.clipboard?.writeText(copy.dataset.copy).then(() => {
          copy.textContent = 'Copied ✓';
          setTimeout(() => (copy.textContent = 'Copy this fact'), 1600);
        });
      }
    });
  }

  surprise() {
    const all = this.index.filter((x) => x.node.kind === 'insight');
    const pick = all[Math.floor(Math.random() * all.length)];
    this.app.goTo(pick.node);
  }

  // ---------- breadcrumb + depth ----------
  setPath(path) {
    const crumbs = path.map((n, i) => {
      const label = this.nodeLabel(n);
      const last = i === path.length - 1;
      return last ? `<span class="crumb current">${escapeHtml(label)}</span>` : `<button class="crumb" data-i="${i}">${escapeHtml(label)}</button>`;
    });
    const bc = $('#breadcrumb');
    bc.innerHTML = crumbs.join('<span class="sep">›</span>');
    bc.onclick = (e) => {
      const b = e.target.closest('.crumb[data-i]');
      if (b) this.app.goTo(path[+b.dataset.i]);
    };
    const depth = path.length - 1;
    document.querySelectorAll('.rung').forEach((r, i) => {
      r.classList.toggle('active', i === depth);
      r.classList.toggle('passed', i < depth);
    });
    document.querySelector('.depth-fill').style.height = (depth / 3) * 100 + '%';
    $('#hint').textContent = HINTS[path[depth].kind];
    this.tickerEl.classList.toggle('hidden', depth !== 0);
    document.body.dataset.depth = path[depth].kind;
  }

  nodeLabel(n) {
    if (n.kind === 'universe') return 'Universe';
    const g = galaxies[n.g];
    if (n.kind === 'galaxy') return g.name;
    const p = g.planets[n.p];
    if (n.kind === 'planet') return p.name;
    return p.insights[n.i].stat;
  }

  // ---------- side panel ----------
  showNode(n) {
    let html = '';
    if (n.kind === 'universe') html = this.universePanel();
    else if (n.kind === 'galaxy') html = this.galaxyPanel(n);
    else if (n.kind === 'planet') html = this.planetPanel(n);
    else html = this.insightPanel(n);
    this.panelBody.classList.remove('in');
    this.panelBody.innerHTML = html;
    void this.panelBody.offsetWidth;
    this.panelBody.classList.add('in');
    this.panelBody.scrollTop = 0;
    const big = this.panelBody.querySelector('[data-countup]');
    if (big) countUp(big, big.dataset.countup);
    if (n.kind !== 'universe') {
      const g = galaxies[n.g];
      document.documentElement.style.setProperty('--accent', g.colors[0]);
      document.documentElement.style.setProperty('--accent2', g.colors[1]);
    } else {
      document.documentElement.style.setProperty('--accent', '#8b7bff');
      document.documentElement.style.setProperty('--accent2', '#4fd1ff');
    }
  }

  universePanel() {
    const s = stats();
    return `
      <div class="kicker">Map of human knowledge</div>
      <h1>The Universe of Knowledge</h1>
      <p class="lead">Every galaxy is a field of human knowledge. Fly into one to find its planets, land on a planet to meet its moons — each one a fact that will change how you see the world. At the deepest level, portals lead to real sources.</p>
      <div class="stat-row">
        <div><b>${s.galaxies}</b><span>galaxies</span></div>
        <div><b>${s.planets}</b><span>planets</span></div>
        <div><b>${s.insights}</b><span>insights</span></div>
        <div><b>${s.links}</b><span>portals</span></div>
      </div>
      <button class="cta" data-surprise>⚡ Shock me — random insight</button>
      <h3>Galaxies</h3>
      <ul class="list">
        ${galaxies
          .map(
            (g, gi) => `<li><a href="#" data-node='${JSON.stringify({ kind: 'galaxy', g: gi })}'>
              <span class="dot" style="--c:${g.colors[0]};--c2:${g.colors[1]}"></span>
              <span class="li-main"><b>${escapeHtml(g.name)}</b><small>${escapeHtml(g.tagline)}</small></span>
              <span class="li-meta">${g.planets.length}</span></a></li>`
          )
          .join('')}
      </ul>`;
  }

  galaxyPanel(n) {
    const g = galaxies[n.g];
    const count = g.planets.reduce((a, p) => a + p.insights.length, 0);
    return `
      <div class="kicker">Galaxy · ${g.planets.length} planets · ${count} insights</div>
      <h1>${escapeHtml(g.name)}</h1>
      <p class="tagline">${escapeHtml(g.tagline)}</p>
      <p class="lead">${escapeHtml(g.intro)}</p>
      <div class="shock"><div class="shock-k">⚡ Did you know?</div><div>${escapeHtml(g.teaser)}</div></div>
      <h3>Planets in this galaxy</h3>
      <ul class="list">
        ${g.planets
          .map(
            (p, pi) => `<li><a href="#" data-node='${JSON.stringify({ kind: 'planet', g: n.g, p: pi })}'>
              <span class="planet-dot" style="--a:${p.look.colors[0]};--b:${p.look.colors[1]};--c:${p.look.colors[2]}"></span>
              <span class="li-main"><b>${escapeHtml(p.name)}</b><small>${escapeHtml(p.subtitle)}</small></span>
              <span class="li-meta">${p.insights.length}</span></a></li>`
          )
          .join('')}
      </ul>`;
  }

  planetPanel(n) {
    const g = galaxies[n.g];
    const p = g.planets[n.p];
    return `
      <div class="kicker">${escapeHtml(g.name)} › Planet</div>
      <h1>${escapeHtml(p.name)}</h1>
      <p class="tagline">${escapeHtml(p.subtitle)}</p>
      <div class="plain"><div class="plain-k">In plain words</div>${escapeHtml(p.summary)}</div>
      <h3>Insights orbiting this world</h3>
      <ul class="insights">
        ${p.insights
          .map(
            (ins, ii) => `<li><a href="#" data-node='${JSON.stringify({ kind: 'insight', g: n.g, p: n.p, i: ii })}'>
              <span class="ins-stat">${escapeHtml(ins.stat)}</span>
              <span class="ins-head">${escapeHtml(ins.headline)}</span></a></li>`
          )
          .join('')}
      </ul>
      <p class="muted">${p.links.length} portals to deeper study wait at the insight level.</p>`;
  }

  insightPanel(n) {
    const g = galaxies[n.g];
    const p = g.planets[n.p];
    const ins = p.insights[n.i];
    const prev = n.i > 0 ? { ...n, i: n.i - 1 } : null;
    const next = n.i < p.insights.length - 1 ? { ...n, i: n.i + 1 } : null;
    const copyText = `${ins.stat} — ${ins.headline}. ${ins.detail} (Source: ${ins.source.name})`;
    return `
      <div class="kicker">${escapeHtml(g.name)} › ${escapeHtml(p.name)} › Insight ${n.i + 1}/${p.insights.length}</div>
      <div class="big-stat" data-countup="${escapeHtml(ins.stat)}">${escapeHtml(ins.stat)}</div>
      <h2>${escapeHtml(ins.headline)}</h2>
      <p class="detail">${escapeHtml(ins.detail)}</p>
      <a class="source" href="${escapeHtml(ins.source.url)}" target="_blank" rel="noopener">Source · ${escapeHtml(ins.source.name)} ↗</a>
      <div class="ins-nav">
        ${prev ? `<a href="#" class="nav-btn" data-node='${JSON.stringify(prev)}'>← Previous</a>` : '<span></span>'}
        <button class="nav-btn ghost" data-copy="${escapeHtml(copyText)}">Copy this fact</button>
        ${next ? `<a href="#" class="nav-btn" data-node='${JSON.stringify(next)}'>Next →</a>` : '<span></span>'}
      </div>
      <h3>Go deeper — portals</h3>
      <ul class="links">
        ${p.links
          .map(
            (l) => `<li><a href="${escapeHtml(l.url)}" target="_blank" rel="noopener">
              <b>${escapeHtml(l.title)} <em>↗</em></b><small>${escapeHtml(l.desc || '')}</small><i>${escapeHtml(hostOf(l.url))}</i></a></li>`
          )
          .join('')}
      </ul>`;
  }

  // ---------- floating bits ----------
  tooltip(html, x, y) {
    const el = this.tooltipEl;
    if (!html) {
      el.classList.remove('show');
      this._tt = null;
      return;
    }
    if (this._tt !== html) {
      el.innerHTML = html;
      this._tt = html;
    }
    el.classList.add('show');
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    let left = x + 18;
    let top = y + 18;
    if (left + w > innerWidth - 12) left = x - w - 18;
    if (top + h > innerHeight - 12) top = y - h - 18;
    el.style.transform = `translate(${Math.max(8, left)}px, ${Math.max(8, top)}px)`;
  }

  pressure(value, x, y, text) {
    const el = this.pressureEl;
    if (value <= 0.01) {
      el.classList.remove('show');
      return;
    }
    el.classList.add('show');
    el.style.transform = `translate(${x - 40}px, ${y - 40}px)`;
    el.querySelector('circle.fg').style.strokeDashoffset = String(226 * (1 - Math.min(1, value)));
    el.querySelector('.pt').textContent = text;
  }

  flash(v) {
    this.flashEl.style.opacity = String(v);
  }

  // ---------- shock ticker ----------
  startTicker() {
    const insights = this.index.filter((x) => x.node.kind === 'insight');
    const show = () => {
      const pick = insights[Math.floor(Math.random() * insights.length)];
      const n = pick.node;
      const g = galaxies[n.g];
      const ins = g.planets[n.p].insights[n.i];
      this.tickerNode = n;
      this.tickerEl.classList.remove('in');
      setTimeout(() => {
        this.tickerEl.innerHTML = `<span class="tk-k" style="color:${g.colors[1]}">⚡ ${escapeHtml(g.name)}</span><span class="tk-stat">${escapeHtml(ins.stat)}</span><span class="tk-t">${escapeHtml(ins.headline)}</span><span class="tk-go">Fly there →</span>`;
        this.tickerEl.classList.add('in');
      }, 400);
    };
    show();
    setInterval(show, 7000);
  }

  // ---------- search palette ----------
  bindSearch() {
    const wrap = $('#search');
    const input = $('#search-input');
    const results = $('#search-results');
    let items = [];
    let sel = 0;
    const render = () => {
      const q = input.value.trim().toLowerCase();
      const words = q.split(/\s+/).filter(Boolean);
      items = (words.length ? this.index.filter((x) => words.every((w) => x.text.includes(w))) : this.index.filter((x) => x.node.kind !== 'insight')).slice(0, 40);
      sel = 0;
      results.innerHTML = items.length
        ? items
            .map(
              (x, i) => `<li class="${i === sel ? 'sel' : ''}" data-i="${i}"><span class="dot" style="--c:${x.color};--c2:${x.color}"></span><span class="li-main"><b>${escapeHtml(x.title)}</b><small>${escapeHtml(x.sub)}</small></span><span class="kind">${x.node.kind}</span></li>`
            )
            .join('')
        : '<li class="empty">Nothing in this universe yet…</li>';
    };
    const highlight = () => {
      results.querySelectorAll('li').forEach((li, i) => li.classList.toggle('sel', i === sel));
      results.querySelector('li.sel')?.scrollIntoView({ block: 'nearest' });
    };
    const choose = (i) => {
      const it = items[i];
      if (!it) return;
      this.closeSearch();
      this.app.goTo(it.node);
    };
    this.openSearch = () => {
      wrap.classList.add('show');
      input.value = '';
      render();
      setTimeout(() => input.focus(), 30);
    };
    this.closeSearch = () => {
      wrap.classList.remove('show');
      input.blur();
    };
    $('#search-btn').addEventListener('click', this.openSearch);
    wrap.addEventListener('click', (e) => {
      if (e.target === wrap) this.closeSearch();
    });
    input.addEventListener('input', render);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        sel = Math.min(items.length - 1, sel + 1);
        highlight();
        e.preventDefault();
      } else if (e.key === 'ArrowUp') {
        sel = Math.max(0, sel - 1);
        highlight();
        e.preventDefault();
      } else if (e.key === 'Enter') choose(sel);
      else if (e.key === 'Escape') this.closeSearch();
      e.stopPropagation();
    });
    results.addEventListener('click', (e) => {
      const li = e.target.closest('li[data-i]');
      if (li) choose(+li.dataset.i);
    });
  }

  get searchOpen() {
    return $('#search').classList.contains('show');
  }
}
