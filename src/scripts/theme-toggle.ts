// troca de tema com reveal circular via View Transitions, a partir do botão clicado
let bound = false;

export function initThemeToggle() {
  if (bound) return;
  bound = true;
  document.addEventListener('click', (e) => {
    const btn = e.target instanceof Element ? e.target.closest('#theme-toggle') : null;
    if (!btn) return;
    const html = document.documentElement;
    const next = html.getAttribute('data-theme') === 'business' ? 'nord' : 'business';
    try { localStorage.setItem('tema', next); } catch {}
    const aplica = () => html.setAttribute('data-theme', next);
    if (!document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      aplica();
      return;
    }
    const r = btn.getBoundingClientRect();
    html.style.setProperty('--reveal-x', `${r.left + r.width / 2}px`);
    html.style.setProperty('--reveal-y', `${r.top + r.height / 2}px`);
    html.classList.add('theme-switching');
    document.startViewTransition(aplica).finished.finally(() => {
      html.classList.remove('theme-switching');
    });
  });
}
