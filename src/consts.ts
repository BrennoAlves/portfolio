export const TITULO_SITE = "Brenno Alves - Portfólio";
export const DESCRICAO_SITE = "Portfólio de Brenno Alves, CEO da Dataclix";

export const projetos = {
  "Analisador Fiscal OCR": {
    url: "https://github.com/BrennoAlves/reembolsinho-amazon-q",
    descricao: "Aplicação que automatiza análise de canhotos de maquininha usando AWS Textract, extraindo dados fiscais e categorizando despesas automaticamente.",
    tags: ["Python", "AWS Textract", "OCR", "BrasilAPI"]
  },
  "Corretor de Localidades": {
    url: "https://github.com/BrennoAlves/corretor-localidade", 
    descricao: "Script que usa modelo all-MiniLM-L6-v2 para corrigir automaticamente erros semânticos em nomes de bairros e cidades usando similaridade de cosseno.",
    tags: ["Python", "Machine Learning", "NLP", "SentenceTransformer"]
  },
  "Análise ENEM MG 2019": {
    url: "https://github.com/BrennoAlves/ENEM-MG-2019",
    descricao: "Análise estatística completa dos dados do ENEM 2019 de Minas Gerais, desenvolvida para artigo acadêmico em Técnicas de Pesquisa em Economia.",
    tags: ["Jupyter Notebook", "Python", "Pandas", "Data Science"]
  },
  "WebScraping Rua CEP": {
    url: "https://github.com/BrennoAlves/webscraping-Rua-cep",
    descricao: "Ferramenta de webscraping para extrair dados de nomes de bairros do site ruacep.com.br, útil para normalização de dados geográficos.",
    tags: ["Python", "Web Scraping", "BeautifulSoup", "Requests"]
  },
  "Preenchedor Forms": {
    url: "https://github.com/BrennoAlves/preenchedor",
    descricao: "Script Python para automatizar preenchimento de Google Forms de forma aleatória ou com dados específicos, útil para testes e automação.",
    tags: ["Python", "Selenium", "Automação", "Google Forms"]
  },
  "CLI Tools": {
    url: "https://github.com/BrennoAlves/cli-tools",
    descricao: "Coleção de ferramentas de linha de comando desenvolvidas em Python para automatizar tarefas do dia a dia e aumentar produtividade.",
    tags: ["Python", "CLI", "Automação", "Ferramentas"]
  }
};

export const projetosDestaque = Object.entries(projetos).filter(([nome]) => 
  nome === "Corretor de Localidades" || nome === "CLI Tools"
);
