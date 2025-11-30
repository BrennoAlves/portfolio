# Como Adicionar Novas Pesquisas

Este guia explica como adicionar novas pesquisas ao seu portfólio usando Markdown.

## Passo 1: Criar o arquivo Markdown

Crie um novo arquivo em `src/content/pesquisas/` com o nome da sua pesquisa (ex: `minha-nova-pesquisa.md`).

## Passo 2: Adicionar o frontmatter

No topo do arquivo, adicione as informações da pesquisa entre `---`:

```markdown
---
titulo: "Título da Sua Pesquisa"
subtitulo: "Uma breve descrição que aparecerá abaixo do título"
data: "2024"
tags: ["Tag 1", "Tag 2", "Tag 3"]
imagemCapa: "/caminho/para/imagem.png"
descricao: "Descrição curta que aparece no card da listagem"
---
```

## Passo 3: Escrever o conteúdo em Markdown

Abaixo do frontmatter, escreva o conteúdo da pesquisa usando Markdown:

```markdown
## Seção Principal

Seu texto aqui com **negrito** e *itálico*.

### Subseção

Mais texto...

![Descrição da imagem](/caminho/para/imagem.png)

- Lista de itens
- Outro item

**Texto em negrito** para destacar pontos importantes.

---

### Metodologia

Detalhes técnicos...
```

## Passo 4: Criar a página da pesquisa

Crie um arquivo em `src/pages/pesquisas/` com o mesmo nome (ex: `minha-nova-pesquisa.astro`):

```astro
---
import Layout from "../../layouts/Layout.astro";
import { TITULO_SITE } from "../../consts";
import { getEntry } from 'astro:content';

const entry = await getEntry('pesquisas', 'minha-nova-pesquisa');
if (!entry) {
  throw new Error('Pesquisa não encontrada');
}
const { Content } = await entry.render();
const { titulo, subtitulo, tags, data } = entry.data;
---

<Layout title={`${titulo} | ${TITULO_SITE}`}>
  <article class="max-w-4xl mx-auto px-4 py-12 animate-fade-in">
    <header class="mb-16 border-b border-base-300 pb-10">
      <div class="flex gap-3 text-xs font-medium opacity-60 mb-6 uppercase tracking-wider">
        {tags.map((tag, i) => (
          <>
            <span>{tag}</span>
            {i < tags.length - 1 && <span>•</span>}
          </>
        ))}
        <span>•</span>
        <span>{data}</span>
      </div>
      <h1 class="text-4xl md:text-5xl font-bold text-base-content leading-tight mb-6">
        {titulo}
      </h1>
      <p class="text-xl opacity-80 leading-relaxed">
        {subtitulo}
      </p>
    </header>

    <div class="prose-custom max-w-none">
      <Content />
    </div>
  </article>
</Layout>

<style is:global>
  /* Cole os mesmos estilos de distribuicao-mcmv.astro */
</style>
```

## Passo 5: Adicionar imagens

Coloque suas imagens em `public/pesquisas/sua-pesquisa-assets/` e referencie no markdown como:

```markdown
![Descrição](/pesquisas/sua-pesquisa-assets/imagem.png)
```

## Pronto!

A pesquisa aparecerá automaticamente na listagem de pesquisas em `/pesquisas`.
