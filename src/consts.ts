// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const TITULO_SITE = "Brenno Alves";
export const DESCRICAO_SITE = "Um portfolio minimalista";
export const OG_TITULO = TITULO_SITE;
export const OG_DESCRICAO = DESCRICAO_SITE;
export const OG_TIPO = "Site pessoal";
export const OG_IMAGE = "";

interface projetos {
  projetos: {
    [name: string]: {
      url: string;
      tags: string[];
    };
  };
}

export const projetosPreenchido: projetos = {
  projetos: {
    "996.ICU": {
      url: "https://github.com/996icu/996.ICU",
      tags: ["ccp", "chinese", "overwork", "labor", "996"],
    },
    Linux: {
      url: "https://github.com/torvalds/linux",
      tags: ["c", "kernel", "unix", "os"],
    },
  },
};
