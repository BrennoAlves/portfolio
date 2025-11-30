---
titulo: "Renda e Desempenho no ENEM: O Que os Dados de Minas Gerais Revelam"
subtitulo: "Análise de 116 mil inscrições no ENEM 2019 mostra como a diferença de renda entre alunos de escolas públicas e privadas se reflete nas notas."
data: "2020"
tags: ["Educação", "Data Science", "Python"]
imagemCapa: "/pesquisas/enem-assets/boxplot.png"
descricao: "Mineração de dados do ENEM 2019 em MG revela que alunos de renda mais alta têm desempenho até 25% superior. Análise com 116 mil participantes."
---

## O Contexto

O ENEM se tornou muito mais que uma prova. Desde 2009, quando virou a porta de entrada para universidades federais via SiSU, ele passou a influenciar como professores ensinam e como alunos estudam. Com mais de 5 milhões de inscrições por ano, os dados do exame viraram uma fonte rica para entender educação no Brasil.

Esta análise pegou todos os dados de Minas Gerais em 2019: 116 mil alunos que completaram a prova, espalhados pelas 853 cidades do estado. A pergunta era simples: renda familiar faz diferença no desempenho?

## Perfil dos Participantes

Antes de olhar as notas, vale entender quem fez a prova. A diferença entre rede pública e privada já começa no perfil socioeconômico.

| Característica | Rede Pública (86%) | Rede Privada (14%) |
|----------------|-------------------|-------------------|
| **Gênero predominante** | Mulheres (60,7%) | Mulheres (53,9%) |
| **Idade média** | 18 anos | 17 anos |
| **Raça/cor mais comum** | Pardos (45,5%) | Brancos (68%) |
| **Classe social predominante** | E - até 2 mil (63%) | C - 4 a 10 mil (37%) |

A diferença de renda é marcante. Enquanto a classe mais comum na rede pública é E (até 2 mil reais), na privada é C (4-10 mil reais).

## Desempenho por Rede de Ensino

Os números são diretos: alunos de escolas privadas tiveram notas maiores em todas as disciplinas.

| Disciplina | Rede Pública | Rede Privada | Diferença |
|-----------|--------------|--------------|-----------|
| **Redação** | 582 | 793 | -36% |
| **Matemática** | 526 | 667 | -27% |
| **Ciências da Natureza** | 475 | 566 | -19% |
| **Ciências Humanas** | 505 | 594 | -18% |
| **Linguagens** | 520 | 581 | -12% |
| **Média Total** | 522 | 640 | -22,7% |

Redação e matemática são justamente as áreas onde cursinhos e escolas particulares mais investem em técnicas e treino específico para o ENEM.

## A Escada da Renda

Quando você separa os alunos por classe social, independente da rede de ensino, a progressão é clara:

| Classe Social | Renda Familiar | Desempenho em relação à Classe E |
|---------------|----------------|----------------------------------|
| **E** | Até 2 mil | Base (100%) |
| **D** | 2 a 4 mil | +8% |
| **C** | 4 a 10 mil | +16% |
| **B** | 10 a 20 mil | +22% |
| **A** | Mais de 20 mil | +25% |

Não é uma linha reta perfeita, mas a tendência é evidente. Quanto maior a renda familiar, melhor o desempenho médio.

### Como Ler o Boxplot

O gráfico abaixo mostra a distribuição de notas por classe social. Cada "caixa" representa uma faixa de renda:

- **Caixa (retângulo colorido):** Onde está 50% dos alunos (o "miolo" da turma)
- **Linha no meio da caixa:** Mediana (metade tirou mais, metade tirou menos)
- **Linhas finas (bigodes):** Onde está quase todo mundo (95%)
- **Pontinhos isolados:** Valores extremos (muito alto ou muito baixo)

**Quanto mais alto o boxplot, melhores as notas daquela classe.**

![Distribuição de notas por classe social](/pesquisas/enem-assets/boxplot.png)

## O Que Está Por Trás dos Números

A diferença não vem só da qualidade da escola. Vem do pacote completo: acesso a material didático, internet boa, espaço para estudar em casa, não precisar trabalhar durante o ensino médio, cursinho preparatório, aulas particulares.

Alunos de renda alta têm mais recursos para investir em preparação específica para o ENEM. E como o exame virou tão importante, esse investimento faz diferença direta no acesso ao ensino superior público.

## O Paradoxo do Mérito

O ENEM nasceu como forma de democratizar o acesso às universidades federais. A ideia era boa: uma prova única, igual para todos, onde só o conhecimento importa.

O problema é que "igual para todos" só funciona se todos largam do mesmo lugar. Quando a renda familiar determina quanto você consegue se preparar, o resultado "meritocrático" acaba reproduzindo desigualdade.

Iniciativas como cotas e cursinhos populares tentam compensar essa diferença. Mas os dados mostram que ainda há um longo caminho. A vantagem de quem tem mais recursos permanece significativa em todas as disciplinas.
