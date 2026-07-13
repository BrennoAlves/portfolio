declare global {
  interface Window {
    __egg?: number;
  }
}

export function showEasterEgg() {
  if (window.__egg) return;
  window.__egg = 1;
  console.log(
    '%cPrazer, Brenno.%c\n\n' +
    '   /\\_/\\     A gata gorda revisou\n' +
    '  ( -.- )    cada linha desse site.\n' +
    '   =( I )=\n\n' +
    'Aquele trem no rodapé é um quincunx. Cada ponto cai\n' +
    'sorteado e mesmo assim eles formam uma curva normal.\n' +
    'Clique na chuva para soltar mais pontos. Mexa o mouse\n' +
    'para entortar a amostra.\n\n' +
    'brenno1231@outlook.com   github.com/BrennoAlves',
    'font-size: 18px; font-weight: 700; color: #5E81AC;',
    'font-size: 12px; color: inherit;'
  );
}
