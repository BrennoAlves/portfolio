// sons sutis de interação: nav (tick), botões (press/release), galeria (bloom)
import { bind } from 'cuelume';

export function bindSounds() {
  bind();
}

export function decorateSounds() {
  document.querySelectorAll('.nav a, .qf-links a').forEach((el) => {
    el.setAttribute('data-cuelume-hover', 'tick');
  });
  document.querySelectorAll('.btn').forEach((el) => {
    el.setAttribute('data-cuelume-press', 'press');
    el.setAttribute('data-cuelume-release', 'release');
  });
  document.querySelectorAll('.image-gallery-wrapper img').forEach((el) => {
    el.setAttribute('data-cuelume-press', 'bloom');
  });
}
