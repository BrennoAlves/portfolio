# 002 — Consolidar a entrada de página em uma única animação

- **Status**: DONE
- **Commit**: a4d5af3
- **Severity**: HIGH
- **Category**: Purpose & frequency + Easing & duration
- **Estimated scope**: 5 arquivos, ~60 linhas removidas / ~20 alteradas

> Depende do plano 001 (tokens).

## Problem

Cada navegação dispara **três camadas simultâneas** de animação — a ação mais frequente do site é a mais barulhenta:

1. View transition com slide horizontal (`src/layouts/Layout.astro:42-64`): `slideOut`/`slideIn` de ±20px, `0.3s ease-in-out`. Slide lateral implica hierarquia espacial (voltar/avançar) que a nav não tem.
2. Fade do container inteiro (`src/layouts/BaseLayout.astro:62`): `animation: fadeIn 0.6s ease-out` com `translateY(20px)` — roda em CIMA da view transition, dobrando o movimento. 600ms estoura o budget de 300ms para UI.
3. Barra de "loading" falsa (`src/layouts/BaseLayout.astro:8,36-52`): `animation: loading 2s ease-in-out` — 2 segundos de gradiente animado no topo a cada navegação, sem representar carregamento real. Decoração em elemento de altíssima frequência.

E as páginas de pesquisa redefinem seu próprio fadeIn, uma **quarta** camada duplicada:

```css
/* src/pages/pesquisas/enem-renda-mg.astro:80 e distribuicao-mcmv.astro:72 — atual */
animation: fadeIn 0.8s ease-out;  /* + @keyframes fadeIn duplicado em cada arquivo */
```

O stagger dos cards também está pesado: `src/layouts/BaseLayout.astro:139-157` usa 600ms de duração + delays de 100ms (o 4º card só assenta em 1s), e o `nth-child` cobre só 4 filhos — o 5º card em diante entra sem delay, quebrando a onda.

## Target

**Uma** entrada: a view transition, como fade + subida sutil. Todo o resto morre.

```css
/* src/layouts/Layout.astro — substituir o <style> das linhas 41-65 inteiro por: */
<style is:global>
  ::view-transition-old(root) {
    animation: vtOut 150ms cubic-bezier(0.23, 1, 0.32, 1) both;
  }
  ::view-transition-new(root) {
    animation: vtIn 250ms cubic-bezier(0.23, 1, 0.32, 1) both;
  }
  @keyframes vtOut {
    to { opacity: 0; }
  }
  @keyframes vtIn {
    from { opacity: 0; transform: translateY(8px); }
  }
</style>
```

(Valores inline aqui de propósito: esse `<style>` fica no `<head>`, fora do escopo onde os tokens são consumidos com segurança pelos pseudo-elementos de view transition. Saída mais rápida que entrada = timing assimétrico correto.)

```css
/* src/layouts/BaseLayout.astro — cards, substituir linhas 139-157 por: */
.card-animate {
  animation: cardIn var(--dur-slow) var(--ease-out-strong) both;
}
.card-animate:nth-child(1) { animation-delay: 40ms; }
.card-animate:nth-child(2) { animation-delay: 80ms; }
.card-animate:nth-child(3) { animation-delay: 120ms; }
.card-animate:nth-child(4) { animation-delay: 160ms; }
.card-animate:nth-child(n+5) { animation-delay: 200ms; }

@keyframes cardIn {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

## Repo conventions to follow

- Tokens `--dur-slow` / `--ease-out-strong` vêm do plano 001, em `src/layouts/BaseLayout.astro`.
- View transitions já usam `ClientRouter` de `astro:transitions` (`src/layouts/Layout.astro:2`) — manter, só trocar o CSS.

## Steps

1. `src/layouts/BaseLayout.astro`: deletar `<div class="loading-bar"></div>` (linha 8) e os blocos `.loading-bar` + `@keyframes loading` (linhas 36-52).
2. `src/layouts/BaseLayout.astro`: remover a linha `animation: fadeIn 0.6s ease-out;` do `.container` (linha 62). Manter `@keyframes fadeIn` (o 001 usa `fadeOnly`; se nada mais referenciar `fadeIn` após este passo, deletar o keyframe também).
3. `src/layouts/Layout.astro`: substituir o `<style>` (linhas 41-65) pelo bloco Target acima, com `is:global`.
4. `src/layouts/BaseLayout.astro`: substituir o bloco `.card-animate`/`cardIn` (linhas 139-157) pelo Target acima.
5. `src/pages/pesquisas/enem-renda-mg.astro` (linha ~80) e `src/pages/pesquisas/distribuicao-mcmv.astro` (linha ~72): remover a `animation: fadeIn 0.8s ease-out;` e o `@keyframes fadeIn` local de cada uma — a entrada agora é a view transition.

## Boundaries

- NÃO tocar no glitch do 404 nem no ImageGallery (planos 001/003).
- NÃO mudar markup além da remoção da `.loading-bar`.
- NÃO adicionar dependências.
- Se as linhas não baterem, PARE e reporte.

## Verification

- **Mechanical**: `npm run build` passa.
- **Feel check**: `npm run dev`, navegar Home → Projetos → Pesquisas → detalhe:
  - Uma única transição por navegação: página antiga some rápido (150ms), nova entra com fade+8px (250ms). Nada desliza lateralmente, nenhuma barra no topo.
  - Cards entram em onda curta (grid inteiro assentado em <700ms); com 5+ cards, nenhum "pula" fora de ordem.
  - DevTools → Animations panel a 10%: o card sobe só 12px, curva desacelerando forte no fim.
  - Com reduced-motion emulado: só fades (via 001).
- **Done when**: `grep -rn 'loading-bar\|slideOut\|slideIn' src/` retorna vazio e cada navegação dispara exatamente 1 animação de página.
