// brilho radial que segue o cursor nos cards (variáveis CSS, sem tocar layout)
let bound = false;

export function initSpotlight() {
  if (bound) return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  bound = true;
  document.addEventListener('pointermove', (e) => {
    const card = e.target instanceof Element ? e.target.closest('.card') : null;
    if (!(card instanceof HTMLElement)) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
    card.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
  }, { passive: true });
}
