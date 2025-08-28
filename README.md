# Portfolio

Um portfólio moderno e responsivo construído com Astro, TailwindCSS e DaisyUI.

## 🚀 Tecnologias

- **[Astro](https://astro.build/)** - Framework web moderno para sites rápidos
- **[TailwindCSS](https://tailwindcss.com/)** - Framework CSS utilitário
- **[DaisyUI](https://daisyui.com/)** - Biblioteca de componentes para TailwindCSS
- **[TypeScript](https://www.typescriptlang.org/)** - Superset tipado do JavaScript
- **[Vercel](https://vercel.com/)** - Plataforma de deploy

## 📁 Estrutura do Projeto

```
/
├── public/
│   ├── icon.png
│   ├── perfil.png
│   └── robots.txt
├── src/
│   ├── layouts/
│   │   ├── Layout.astro
│   │   └── Projetos.astro
│   ├── pages/
│   │   └── index.astro
│   ├── consts.ts
│   └── env.d.ts
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

## 🧞 Comandos

Todos os comandos são executados a partir da raiz do projeto, em um terminal:

| Comando                   | Ação                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Instala as dependências                            |
| `npm run dev`             | Inicia o servidor de desenvolvimento em `localhost:4321`      |
| `npm run build`           | Constrói o site de produção para `./dist/`          |
| `npm run preview`         | Visualiza o build localmente, antes do deploy     |
| `npm run astro ...`       | Executa comandos CLI como `astro add`, `astro check` |
| `npm run astro -- --help` | Obtém ajuda usando a CLI do Astro                     |

## 🛠️ Desenvolvimento

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd portfolio
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

4. **Abra o navegador**
   Acesse `http://localhost:4321` para ver o projeto

## 📦 Build e Deploy

### Build Local
```bash
npm run build
```

### Deploy na Vercel
O projeto está configurado para deploy automático na Vercel. A pasta `.vercel` contém as configurações de deploy e deve ser ignorada no controle de versão.

## 🎨 Personalização

- **Cores e Tema**: Edite `tailwind.config.mjs` para personalizar o tema
- **Componentes**: Use DaisyUI para componentes pré-estilizados
- **Layout**: Modifique os arquivos em `src/layouts/`
- **Páginas**: Adicione novas páginas em `src/pages/`

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

---

Feito com ❤️ usando [Astro](https://astro.build/)