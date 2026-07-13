import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const pesquisasCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pesquisas' }),
  schema: ({ image }) => z.object({
    titulo: z.string(),
    subtitulo: z.string(),
    data: z.string(),
    tags: z.array(z.string()),
    imagemCapa: image(),
    descricao: z.string(),
  }),
});

export const collections = {
  pesquisas: pesquisasCollection,
};
