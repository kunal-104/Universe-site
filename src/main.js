import { App, hashToNode } from './app.js';

function webglAvailable() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGL2RenderingContext && c.getContext('webgl2'));
  } catch {
    return false;
  }
}

const intro = document.getElementById('intro');

if (!webglAvailable()) {
  intro.querySelector('.intro-sub').textContent = 'Your browser does not support WebGL 2, which this universe needs. Try a recent Chrome, Edge, Firefox or Safari.';
  document.getElementById('enter-btn').remove();
} else {
  const app = new App();
  const startNode = hashToNode(location.hash);
  const deepLink = startNode.kind !== 'universe';
  app.start(startNode, { intro: true });
  window.__universe = app;
  intro.classList.add('ready');

  const enter = () => {
    intro.classList.add('leaving');
    setTimeout(() => intro.remove(), 1200);
    app.enter();
  };
  document.getElementById('enter-btn').addEventListener('click', enter);
  if (deepLink) {
    document.getElementById('enter-btn').textContent = 'Continue your journey';
  }
  addEventListener(
    'keydown',
    (e) => {
      if (document.body.contains(intro) && !intro.classList.contains('leaving') && e.key === 'Enter') {
        e.stopImmediatePropagation();
        enter();
      }
    },
    { capture: true }
  );
}
