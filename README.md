# 🌌 Universe of Knowledge

A zoomable 3D universe of human knowledge, built with **Three.js** and custom GLSL shaders.

- **Universe**: 10 galaxies, one per field: AI, Stock Market, Technology, Robotics, Science, Spirituality, Politics, Entertainment, Law & Justice and Education.
- **Galaxy**: fly inside one and its subjects orbit a burning core as procedurally shaded planets.
- **Planet**: land on one and its moons are *insights*: short, sourced facts written for non-experts.
- **Insight**: the deepest level. A large animated number, the explanation, the source, and orbiting "portal" satellites that open real sites for further study.

## How to explore

| Action | What it does |
| --- | --- |
| Drag | Orbit |
| Scroll / pinch | Fly toward the cursor. Getting close to a galaxy, planet or moon carries you inside it |
| Keep scrolling at the zoom limit | Push through to the next level in or out (a ring fills up to show progress) |
| Click | Dive into what's under the cursor |
| `Esc` / `Backspace` | Go up one level |
| `/` or `Ctrl+K` | Search every galaxy, planet and fact |
| "Shock me" | Jump to a random insight |

Each location has its own URL hash (for example `#/ai/claude/2`), so you can share a deep link.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static site in dist/
```

## Add content

Everything lives in `src/data/*.js`, with one file per galaxy. To add a galaxy, create a file with the same shape and register it in `src/data/index.js`. Each planet has:

```js
{
  id, name, subtitle, summary,
  look: { type: 'terran' | 'ocean' | 'gas' | 'lava' | 'ice' | 'desert' | 'crystal', colors: [a, b, c], rings },
  size,
  insights: [{ stat, headline, detail, source: { name, url } }],
  links: [{ title, url, desc }],
}
```

Visuals are generated procedurally from the data, so a new planet or galaxy needs no new art.

## Structure

```
src/
  app.js           engine: renderer, bloom, camera, zoom thresholds, transitions
  levels/          one scene builder per zoom depth (universe, galaxy, planet, insight)
  gfx/             shaders: galaxies, planets, stars, orbs, nebula sky, warp streaks
  ui/hud.js        panel, breadcrumb, depth gauge, search, tooltips, fact ticker
  data/            the content
```
