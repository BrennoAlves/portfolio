import { defineCollection, z } from 'astro:content';

const pesquisasCollection = defineCollection({
  type: 'content',
  schema: z.object({
    titulo: z.string(),
    subtitulo: z.string(),
    data: z.string(),
    tags: z.array(z.string()),
    imagemCapa: z.string(),
    descricao: z.string(),
  }),
});

export const collections = {
  pesquisas: pesquisasCollection,
};
