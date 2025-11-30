---
titulo: "Distribuição Espacial do Programa Minha Casa, Minha Vida no Sudeste"
subtitulo: "Análise geoespacial e econométrica da alocação de 3,5 milhões de unidades habitacionais na região mais populosa do Brasil."
data: "2024"
tags: ["Política Pública", "Data Science", "Python"]
imagemCapa: "/pesquisas/mcmv-assets/image3.png"
descricao: "Análise da distribuição de 3,5 milhões de unidades do programa Minha Casa, Minha Vida, revelando como o mercado imobiliário influenciou a alocação de recursos públicos."
---

## Contexto e Motivação

O Minha Casa, Minha Vida foi lançado em 2009 como resposta ao déficit habitacional brasileiro. Entre 2009 e 2020, o programa contratou mais de 6 milhões de unidades em todo o país, sendo a região Sudeste responsável por cerca de 3,5 milhões dessas contratações.

Esta pesquisa surgiu de uma curiosidade: será que a distribuição das unidades seguiu o tamanho populacional dos municípios, ou outros fatores entraram na equação? Decidi cruzar os dados do Ministério do Desenvolvimento Regional com informações do IBGE para visualizar e quantificar essa distribuição.

O interessante foi descobrir que a geografia das contratações conta uma história sobre como políticas públicas e dinâmica de mercado se encontram na prática.

## O Que os Dados Mostram

### Concentração no Eixo Econômico

A primeira coisa que chama atenção no mapa é como as unidades se concentram no corredor São Paulo-Minas Gerais. Municípios com economia mais forte e mercado imobiliário consolidado acabaram recebendo mais unidades, mesmo quando ajustamos pela população.

Isso faz sentido do ponto de vista operacional: construtoras precisam de infraestrutura, fornecedores, mão de obra qualificada. Tudo isso já existe nesses lugares.

### São Paulo e a Capilaridade do Mercado

São Paulo mostrou uma distribuição mais proporcional ao tamanho dos municípios. Cidades médias do interior paulista, como Campinas e Ribeirão Preto, receberam volumes significativos de unidades.

A explicação está na maturidade do setor imobiliário paulista, que consegue operar em escala tanto na capital quanto no interior. Isso facilitou a implementação do programa em diferentes regiões do estado.

### Rio de Janeiro e os Desafios Urbanos

O Rio apresentou um padrão diferente. Vários municípios ficaram abaixo da linha de tendência quando comparamos população e unidades contratadas.

Os motivos são conhecidos: custo elevado da terra, questões fundiárias complexas, limitações geográficas. São desafios reais que afetam qualquer programa habitacional de larga escala na região metropolitana.

## Visualizando a Distribuição

O mapa abaixo mostra onde as unidades foram contratadas. Quanto mais escura a região, maior a concentração. Dá pra ver claramente o eixo São Paulo-Minas se destacando.

![Distribuição espacial das unidades habitacionais do MCMV no Sudeste (2009-2020). Quanto mais escuro, maior a concentração.](/pesquisas/mcmv-assets/image3.png)

Essa distribuição reflete fatores práticos: onde tem infraestrutura consolidada, fornecedores, mão de obra e demanda qualificada, fica mais viável implementar projetos de grande porte. É natural que municípios com mercado imobiliário ativo tenham atraído mais empreendimentos.

## Análise Comparativa por Estado

Usei regressão linear para comparar municípios de tamanhos diferentes de forma justa. A ideia é simples: municípios maiores deveriam ter mais unidades. A linha mostra essa "expectativa", e os pontos mostram a realidade.

### São Paulo

![Distribuição em São Paulo](/pesquisas/mcmv-assets/image5.png)

São Paulo mostrou uma distribuição bem distribuída. Cidades médias do interior conseguiram atrair volumes significativos, não só a capital. O mercado imobiliário do estado tem estrutura para operar em diferentes escalas e regiões.

### Rio de Janeiro

![Distribuição no Rio de Janeiro](/pesquisas/mcmv-assets/image7.png)

No Rio, muitos municípios ficaram abaixo do esperado. As particularidades da região metropolitana fluminense (custo de terra, questões fundiárias, geografia acidentada) representam desafios significativos para programas habitacionais de larga escala.

## O Que Isso Significa

A análise mostra que programas habitacionais em larga escala funcionam melhor onde o mercado já tem estrutura consolidada. Isso cria um problema: justamente os lugares com mercado mais fraco tendem a ser os que mais precisam de habitação social.

Municípios com restrições urbanísticas fortes ou mercado incipiente acabam ficando para trás. Os dados do Rio de Janeiro ilustram bem isso. A solução passa por desenhos de política que reconheçam essas diferenças regionais.

Talvez incentivos adicionais para regiões de difícil operação, ou modelos alternativos de produção habitacional. O desafio é equalizar sem inviabilizar economicamente os empreendimentos. Ninguém ganha se os projetos não saem do papel.

