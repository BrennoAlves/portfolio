# 003 — Animar a entrada do modal da galeria e limpar transition:all

- **Status**: DONE
- **Commit**: a4d5af3
- **Severity**: MEDIUM
- **Category**: Missed opportunities + Performance
- **Estimated scope**: 1 arquivo (ImageGallery.astro), ~25 linhas

> Depende do plano 001 (tokens) apenas se preferir usar `var()`; os valores estão inline abaixo.

## Problem

O modal da galeria **teleporta**: `display: none` → `display: flex` sem nenhuma transição — a tela inteira vira preto 97% num frame. É exatamente o tipo de mudança brusca que animação existe para prevenir:

```css
/* src/components/ImageGallery.astro:22-50 — atual (resumido) */
.image-modal { display: none; …; background-color: rgba(0, 0, 0, 0.97); }
.image-modal.active { display: flex; }
```

E os controles usam `transition: all`, que anima propriedades não intencionais fora da GPU (sempre um finding):

```css
/* src/components/ImageGallery.astro:89 — atual */
.modal-close { …; transition: all 0.2s; }
/* src/components/ImageGallery.astro:143 — atual */
.modal-controls button { …; transition: all 0.2s; }
```

## Target

Entrada com fade do backdrop + leve scale da imagem (nada aparece do nada — nunca `scale(0)`, alvo `0.97`). Saída instantânea é aceitável e até correta (fechar deve ser resposta imediata — timing assimétrico):

```css
/* substituir os blocos citados */
.image-modal {
  display: none;
  opacity: 0;
  /* …demais propriedades atuais inalteradas… */
}

.image-modal.active {
  display: flex;
  opacity: 1;
  transition: opacity 200ms cubic-bezier(0.23, 1, 0.32, 1);
  @starting-style {
    opacity: 0;
  }
}

.image-modal.active .modal-image {
  animation: modalImgIn 250ms cubic-bezier(0.23, 1, 0.32, 1);
}
@keyframes modalImgIn {
  from { transform: scale(0.97); opacity: 0; }
}

.modal-close {
  transition: background-color 200ms ease, transform 160ms cubic-bezier(0.23, 1, 0.32, 1);
}
.modal-controls button {
  transition: background-color 200ms ease, transform 160ms cubic-bezier(0.23, 1, 0.32, 1);
}
```

Atenção: `.modal-image` já tem `transition: transform 0.1s ease-out` (linha 57) para zoom/pan — por isso a entrada usa `animation` (keyframe roda uma vez e libera o `transform` para o zoom), não outra transition. `transform-origin` central é correto aqui (modal, não popover) — não mexer.

```css
/* reduced motion, no mesmo <style is:global> do componente */
@media (prefers-reduced-motion: reduce) {
  .image-modal.active .modal-image { animation: none; }
}
```

(O fade de opacity do backdrop pode ficar — reduced motion mantém opacidade, corta deslocamento/escala.)

## Repo conventions to follow

- O componente usa `<style is:global>` próprio (`src/components/ImageGallery.astro:20`) — as mudanças ficam todas nele.
- Classe `.active` é togglada por JS já existente no componente — não alterar o script.

## Steps

1. Adicionar `opacity: 0;` ao bloco `.image-modal` (linha ~22).
2. Substituir o bloco `.image-modal.active` (linha ~48) pelo Target (opacity + transition + `@starting-style`).
3. Adicionar `.image-modal.active .modal-image` + `@keyframes modalImgIn`.
4. Trocar `transition: all 0.2s;` de `.modal-close` (linha 89) e `.modal-controls button` (linha 143) pelas transitions explícitas do Target.
5. Adicionar o bloco `prefers-reduced-motion`.

## Boundaries

- NÃO tocar no JS de zoom/pan/swipe do componente.
- NÃO alterar a `transition: transform 0.1s ease-out` da `.modal-image` (linha 57) — é o pan/zoom.
- NÃO tocar em outros componentes.
- Se as linhas não baterem, PARE e reporte.

## Verification

- **Mechanical**: `npm run build` passa.
- **Feel check**: `npm run dev`, abrir uma pesquisa com imagens, clicar numa imagem:
  - Backdrop escurece em ~200ms; imagem assenta de 0.97→1. Nada "pisca" pronto na tela.
  - Fechar (X ou clique fora) é instantâneo.
  - Zoom (+/−) e pan continuam idênticos — o keyframe de entrada não trava o transform.
  - Spam de abrir/fechar rápido não deixa o modal em estado quebrado.
  - Reduced-motion emulado: backdrop faz fade, imagem entra sem scale.
- **Done when**: `grep -n 'transition: all' src/components/ImageGallery.astro` retorna vazio e a abertura do modal é visivelmente gradual em playback 10%.
