# Planos de animação — auditoria improve-animations

Gerados em a4d5af3 (branch `test/skills-experiment`) pela skill `improve-animations`.
Cada plano é autocontido: qualquer agente executa sem contexto desta conversa.

| # | Plano | Severidade | Status |
|---|-------|-----------|--------|
| 001 | [Tokens de motion + prefers-reduced-motion](001-tokens-e-reduced-motion.md) | HIGH | DONE |
| 002 | [Entrada de página única (matar tripla animação)](002-entrada-de-pagina-unica.md) | HIGH | DONE |
| 003 | [Entrada do modal da galeria + limpar transition:all](003-entrada-do-modal-galeria.md) | MEDIUM | DONE |
| 004 | [Micro-interações: press, hover gate, nav underline](004-micro-interacoes.md) | LOW | DONE |

## Ordem de execução

**001 → 002 → 003 → 004**

- 001 é fundação: cria os tokens (`--ease-out-strong`, `--dur-*`) que 002 e 004 consomem, e o gate global de reduced-motion.
- 002 depende de 001 (tokens no cardIn).
- 003 é independente (valores inline), pode rodar em paralelo com 002.
- 004 depende de 001 (tokens) e deve rodar por último — toca nos mesmos blocos de BaseLayout que 001/002 editam.

## Como executar

Um plano por vez, com qualquer agente:

```
improve-animations execute plans/001-tokens-e-reduced-motion.md
```

Ao concluir, trocar o Status do plano para DONE aqui e no arquivo.
