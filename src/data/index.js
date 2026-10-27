import ai from './ai.js';
import stocks from './stocks.js';
import tech from './tech.js';
import robotics from './robotics.js';
import spirituality from './spirituality.js';
import politics from './politics.js';
import entertainment from './entertainment.js';
import law from './law.js';
import education from './education.js';
import science from './science.js';

export const galaxies = [ai, stocks, tech, robotics, science, spirituality, politics, entertainment, law, education];

export function findGalaxy(id) {
  return galaxies.find((g) => g.id === id);
}

export function stats() {
  let planets = 0;
  let insights = 0;
  let links = 0;
  for (const g of galaxies) {
    planets += g.planets.length;
    for (const p of g.planets) {
      insights += p.insights.length;
      links += p.links.length;
    }
  }
  return { galaxies: galaxies.length, planets, insights, links };
}
