# 004 — Micro-interações: press feedback, hover contido e nav underline

- **Status**: DONE
- **Commit**: a4d5af3
- **Severity**: LOW
- **Category**: Physicality & origin + Cohesion
- **Estimated scope**: 4 arquivos, ~40 linhas

> Depende do plano 001 (tokens).

## Problem

1. **Nenhum elemento pressionável tem press feedback.** Botões (`Ver Projeto`, botões do 404, controles da galeria) não respondem ao `:active` — falta fisicalidade.
2. **Hover com movimento sem gate de ponteiro** — em touch, o tap dispara o hover e o elemento fica "preso" escalado:
```html
<!-- src/pages/pesquisas.astro:25 — atual -->
class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
```
3. **`transition: all` no 404:**
```css
/* src/pages/404.astro:171 — atual */
.btn-game { …; transition: all 0.3s ease; }
```
4. **Nav sem transição de estado** — `src/layouts/BaseLayout.astro:118-120` liga `text-decoration: underline` no hover instantaneamente; num site tão minimalista, esse é O momento de um detalhe discreto.

## Target

```css
/* src/layouts/BaseLayout.astro — adicionar ao <style is:global> */

/* press feedback global dos botões daisyUI (sutil: 0.97, nunca menos que 0.95) */
.btn {
  transition: transform 160ms var(--ease-out-strong);
}
.btn:active {
  transform: scale(0.97);
}

/* nav underline animado (substitui o .nav a:hover { text-decoration: underline; }) */
.nav a {
  position: relative;
}
.nav a::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -2px;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 200ms var(--ease-out-strong);
}
@media (hover: hover) and (pointer: fine) {
  .nav a:hover::after {
    transform: scaleX(1);
  }
}
@media (prefers-reduced-motion: reduce) {
  .nav a::after { transition: none; }
}
```

```html
<!-- src/pages/pesquisas.astro:25 — trocar hover:scale-105 por md:hover:scale-105 -->
class="w-full h-full object-cover transition-transform duration-300 md:hover:scale-105"
```

```css
/* src/pages/404.astro:171 — substituir transition: all */
.btn-game {
  transition: transform 200ms cubic-bezier(0.23, 1, 0.32, 1),
              box-shadow 200ms ease,
              background-color 200ms ease;
}
.btn-game:active {
  transform: translateY(0) scale(0.97);
}
```

## Repo conventions to follow

- Overrides globais de daisyUI já vivem no `<style is:global>` de `src/layouts/BaseLayout.astro:24-34` (`.btn`, `.btn-outline`, `.badge`) — o press feedback entra ali junto.
- Tailwind é v3 (sem gate automático de hover) — por isso o `md:` na classe e o `@media (hover: hover)` no CSS.
- Tokens do plano 001.

## Steps

1. `src/layouts/BaseLayout.astro`: adicionar `.btn { transition }` + `.btn:active` junto aos overrides existentes (linha ~24).
2. `src/layouts/BaseLayout.astro`: remover `.nav a:hover { text-decoration: underline; }` (linhas 118-120) e adicionar o bloco `::after` do Target.
3. `src/pages/pesquisas.astro:25`: `hover:scale-105` → `md:hover:scale-105`.
4. `src/pages/404.astro:171`: substituir a `transition: all 0.3s ease` e adicionar `:active` conforme Target.

## Boundaries

- NÃO mexer nos cards (`transition-shadow` deles fica como está — shadow em hover ocasional é aceitável; consolidar isso só se virar incômodo medido).
- NÃO tocar no ImageGallery (plano 003).
- NÃO adicionar dependências.
- Se as linhas não baterem, PARE e reporte.

## Verification

- **Mechanical**: `npm run build` passa.
- **Feel check**: `npm run dev`:
  - Segurar o clique em "Ver Projeto": encolhe a 0.97 suave; soltar volta. Nada "pula".
  - Hover na nav (desktop): linha cresce da esquerda em 200ms; em touch (emulação mobile), tap não deixa underline preso.
  - Imagem de pesquisa em mobile emulado: tap não trava scale-105.
  - 404: botão do jogo responde a hover/press sem animar cor de borda ou propriedades aleatórias.
- **Done when**: `grep -rn 'transition: all' src/` retorna vazio e todo `.btn` tem feedback tátil de press.
