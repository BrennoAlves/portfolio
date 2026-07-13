# 001 — Criar tokens de motion e suporte a prefers-reduced-motion

- **Status**: DONE
- **Commit**: a4d5af3
- **Severity**: HIGH
- **Category**: Accessibility + Cohesion & tokens
- **Estimated scope**: 2 arquivos (BaseLayout.astro, 404.astro), ~40 linhas

## Problem

O repositório não tem **nenhuma** ocorrência de `prefers-reduced-motion` (`grep -r prefers-reduced-motion src/` retorna vazio), mas tem movimento real: `translateY(20-30px)` em entradas de página, slide horizontal em view transitions e um glitch **infinito** no 404 (`src/pages/404.astro:57` — `animation: glitch 1.5s infinite;`). Isso é um risco vestibular real para quem ativa "reduzir movimento" no SO.

Além disso, durações e easings estão espalhados sem tokens: `0.1s`, `0.2s`, `0.3s`, `0.6s`, `0.8s`, `2s` com `ease-out`, `ease-in-out`, `ease` misturados — sete valores hand-typed em seis arquivos. Cohesão zero.

```css
/* src/layouts/BaseLayout.astro:62 — atual (exemplo do padrão espalhado) */
animation: fadeIn 0.6s ease-out;
/* src/pages/pesquisas/enem-renda-mg.astro:80 — atual */
animation: fadeIn 0.8s ease-out;
```

## Target

Tokens globais + bloco global de reduced-motion. Os built-ins do CSS são fracos demais; usar curvas fortes:

```css
/* adicionar no TOPO do <style is:global> de src/layouts/BaseLayout.astro */
:root {
  --ease-out-strong: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-in-out-strong: cubic-bezier(0.77, 0, 0.175, 1);
  --dur-fast: 150ms;
  --dur-base: 250ms;
  --dur-slow: 450ms;
}

/* adicionar no FIM do mesmo <style is:global> */
@media (prefers-reduced-motion: reduce) {
  /* manter opacidade (comunicação), remover deslocamento */
  .container,
  .card-animate {
    animation-name: fadeOnly;
  }
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation: none;
  }
}
@keyframes fadeOnly {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

```css
/* src/pages/404.astro — dentro do <style> existente da página */
@media (prefers-reduced-motion: reduce) {
  .glitch,
  .glitch::before,
  .glitch::after {
    animation: none;
  }
}
```

Reduced motion = menos e mais suave, **não zero**: fades de opacidade permanecem, deslocamentos somem.

## Repo conventions to follow

- CSS global vive em `<style is:global>` no `src/layouts/BaseLayout.astro:23` — os tokens entram lá, não em arquivo novo.
- Não existe `tokens.css`; **não criar** — o projeto é pequeno e centraliza estilos globais no layout.

## Steps

1. `src/layouts/BaseLayout.astro`: adicionar o bloco `:root { … }` com os 5 tokens logo após a abertura do `<style is:global>` (linha 23).
2. `src/layouts/BaseLayout.astro`: adicionar o bloco `@media (prefers-reduced-motion: reduce)` + `@keyframes fadeOnly` no fim do mesmo `<style>`.
3. `src/pages/404.astro`: adicionar o bloco reduced-motion do glitch dentro do `<style>` da página.

## Boundaries

- NÃO alterar nenhuma animação existente neste plano (isso é dos planos 002–004) — só adicionar tokens e gates.
- NÃO adicionar dependências, nem arquivos novos.
- Se as linhas citadas não baterem com o código (drift pós-a4d5af3), PARE e reporte.

## Verification

- **Mechanical**: `npm run build` passa (roda `astro check`).
- **Feel check**: DevTools → Rendering → "Emulate CSS prefers-reduced-motion":
  - Home recarregada: conteúdo aparece com fade puro, sem subir 20-30px.
  - `/404`: número estático, sem glitch.
  - Navegar entre páginas: troca instantânea/fade, sem slide.
- **Done when**: `grep -r prefers-reduced-motion src/ | wc -l` ≥ 2 e os tokens `--ease-out-strong` etc. existem em BaseLayout.
