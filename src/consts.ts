// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const TITULO_SITE = "Brenno Alves";
export const DESCRICAO_SITE = "Um portfolio minimalista";
export const OG_TITULO = TITULO_SITE;
export const OG_DESCRICAO = DESCRICAO_SITE;
export const OG_TIPO = "Site pessoal";
export const OG_IMAGE = "/perfil.png";

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
    "E-commerce Platform": {
      url: "https://github.com/dataclix/ecommerce",
      tags: ["react", "typescript", "tailwind", "stripe"],
    },
    "AI Chat Assistant": {
      url: "https://github.com/dataclix/ai-chat",
      tags: ["python", "openai", "fastapi", "websockets"],
    },
    "Mobile Banking App": {
      url: "https://github.com/dataclix/mobile-bank",
      tags: ["react-native", "typescript", "firebase"],
    },
    "Data Analytics Dashboard": {
      url: "https://github.com/dataclix/analytics",
      tags: ["vue", "d3js", "python", "postgresql"],
    },
  },
};
