---
titulo: "bolão, meu Apostador Automático de Copa que só Chegou em Terceiro Lugar"
subtitulo: "Botei Poisson, Dixon-Coles, Elo e simulação de Monte Carlo para apostar contra amigos numa Copa do Mundo. Ciência de ponta, resultado modesto, mas revivi um monte de estatística que eu não tocava desde a faculdade de Economia."
data: "2026"
tags: ["Estatística", "Microeconomia", "Modelagem Preditiva", "Automação"]
descricao: "Apostador automatizado que usa Poisson, Dixon-Coles e simulação de Monte Carlo para prever placares de Copa do Mundo e apostar num bolão entre amigos. Terminou em terceiro lugar."
repo: "https://github.com/BrennoAlves/bolao-copa-2026"
---

## Uma desculpa para voltar para a estatística

Fui para Economia por causa da estatística, não o contrário. E como o dia a dia de sócio de empresa é bem mais gestão de projeto do que regressão, faz um tempo que eu não abria um livro de modelagem de verdade. Aí chegou mais uma Copa do Mundo e, com ela, o bolão de sempre entre amigos. Em vez de chutar placar no grupo do WhatsApp que nem todo mundo, decidi que aquele era o pretexto perfeito para desenferrujar.

O objetivo nunca foi ganhar. Bom, era, mas o objetivo real era ter uma desculpa socialmente aceitável para passar um mês mexendo com Poisson, Elo e simulação estocástica de novo. Fiz um programinha que lê as odds do mercado, estima o placar mais provável de cada jogo e registra o palpite sozinho, refinando conforme novas odds chegam perto do apito inicial.

Spoiler do final para quem não gosta de suspense, terminei em terceiro lugar. Não ganhei nada. Mas o caminho até lá teve mais estatística interessante do que qualquer coisa que eu fiz no trabalho naquele mês, então valeu o artigo mesmo sem o troféu.

## De onde vêm os números

A parte que eu mais gosto desse projeto nem é o modelo de placar, é de onde ele tira a informação. Em vez de eu tentar adivinhar a força de cada seleção, uso as odds de casas de apostas como fonte de probabilidade. A lógica por trás disso é bem microeconomia, uma casa de apostas é essencialmente um mercado, e o preço que ela oferece reflete o consenso agregado de milhares de apostadores, ajustado a cada nova informação sobre lesão, escalação, clima. É a mesma ideia por trás da hipótese de mercados eficientes, só que aplicada a quem vai ganhar de quem em vez de qual ação vai subir.

Só que a odd bruta não é a probabilidade real. Toda casa embute uma margem, se você somar as probabilidades implícitas dos três resultados possíveis de um jogo, o total passa de 100%. Essa sobra é o lucro garantido da casa, e precisa ser removida antes de usar o número para qualquer coisa séria.

O jeito ingênuo de remover a margem é dividir cada probabilidade implícita pela soma total, proporcionalmente. O problema é que o mercado de apostas tem um viés bem documentado, o favorito costuma estar levemente subprecificado e o azarão levemente sobreprecificado, um fenômeno chamado de favorite longshot bias na literatura de finanças comportamentais. A remoção proporcional ignora esse viés e distorce mais o favorito do que o azarão. Uso um método diferente, o power method, que acha um único expoente que, aplicado às probabilidades implícitas de todas as casas, faz a soma bater exatamente em um. Ele corrige o viés de forma mais uniforme entre favorito e azarão do que a divisão proporcional.

<div class="diagrama">
<svg viewBox="0 0 640 640" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagrama do pipeline de predição, das odds do mercado até a aposta escolhida">
  <defs>
    <marker id="arrow-bolao-1" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill="var(--color-base-content)" opacity="0.5" />
    </marker>
  </defs>
  <rect x="80" y="20" width="480" height="70" rx="10" fill="var(--color-base-100)" stroke="var(--color-base-300)" />
  <text x="320" y="50" text-anchor="middle" font-size="15" font-weight="600" fill="var(--color-base-content)">Odds do mercado</text>
  <text x="320" y="70" text-anchor="middle" font-size="11" fill="var(--color-base-content)" opacity="0.6">1X2 e over/under, mediana entre várias casas</text>
  <path d="M320,90 L320,130" stroke="var(--color-base-content)" stroke-opacity="0.35" stroke-width="2" fill="none" marker-end="url(#arrow-bolao-1)" />
  <rect x="80" y="130" width="480" height="70" rx="10" fill="var(--color-base-100)" stroke="var(--color-base-300)" />
  <text x="320" y="160" text-anchor="middle" font-size="15" font-weight="600" fill="var(--color-base-content)">Remove a margem</text>
  <text x="320" y="180" text-anchor="middle" font-size="11" fill="var(--color-base-content)" opacity="0.6">método power, não proporcional</text>
  <path d="M320,200 L320,240" stroke="var(--color-base-content)" stroke-opacity="0.35" stroke-width="2" fill="none" marker-end="url(#arrow-bolao-1)" />
  <rect x="80" y="240" width="480" height="70" rx="10" fill="var(--color-base-100)" stroke="var(--color-base-300)" />
  <text x="320" y="270" text-anchor="middle" font-size="15" font-weight="600" fill="var(--color-base-content)">Probabilidade e gols esperados</text>
  <text x="320" y="290" text-anchor="middle" font-size="11" fill="var(--color-base-content)" opacity="0.6">λ casa e λ fora, resolvidos a partir do 1X2 e da linha de gols</text>
  <path d="M320,310 L320,350" stroke="var(--color-base-content)" stroke-opacity="0.35" stroke-width="2" fill="none" marker-end="url(#arrow-bolao-1)" />
  <rect x="80" y="350" width="480" height="70" rx="10" fill="var(--color-base-100)" stroke="var(--color-base-300)" />
  <text x="320" y="380" text-anchor="middle" font-size="15" font-weight="600" fill="var(--color-base-content)">Poisson + Dixon-Coles</text>
  <text x="320" y="400" text-anchor="middle" font-size="11" fill="var(--color-base-content)" opacity="0.6">corrige o excesso de 0x0 e 1x1 do modelo puro</text>
  <path d="M320,420 L320,460" stroke="var(--color-base-content)" stroke-opacity="0.35" stroke-width="2" fill="none" marker-end="url(#arrow-bolao-1)" />
  <rect x="80" y="460" width="480" height="70" rx="10" fill="var(--color-base-100)" stroke="var(--color-base-300)" />
  <text x="320" y="490" text-anchor="middle" font-size="15" font-weight="600" fill="var(--color-base-content)">Matriz de placares</text>
  <text x="320" y="510" text-anchor="middle" font-size="11" fill="var(--color-base-content)" opacity="0.6">probabilidade de cada placar possível, de 0x0 a 5x5</text>
  <path d="M320,530 L320,570" stroke="var(--color-base-content)" stroke-opacity="0.35" stroke-width="2" fill="none" marker-end="url(#arrow-bolao-1)" />
  <rect x="80" y="570" width="480" height="70" rx="12" fill="var(--color-primary)" stroke="var(--color-primary)" />
  <text x="320" y="600" text-anchor="middle" font-size="15" font-weight="700" fill="var(--color-primary-content)">Aposta escolhida</text>
  <text x="320" y="620" text-anchor="middle" font-size="11" fill="var(--color-primary-content)" opacity="0.85">o placar de maior valor esperado, não o mais provável</text>
</svg>
</div>

*O mercado dá a probabilidade de quem ganha e o volume esperado de gols. O modelo de Poisson transforma isso numa matriz de placares, e a aposta escolhida nem sempre é o placar mais provável, é o que rende mais pontos esperados dado o critério de pontuação do bolão.*

## Um Poisson que precisa de ajuda

O modelo de placar em si é simples de explicar e é ali que a estatística de graduação volta com tudo. Gols de cada time seguem uma distribuição de Poisson, com uma média esperada (λ) que vem justamente da probabilidade de vitória e do volume de gols que o mercado precificou. Assumindo que o número de gols de cada time é independente do outro, dá para montar uma matriz inteira de placares possíveis e suas probabilidades.

O problema é que futebol de verdade não é totalmente independente assim. Times que sabem que vão empatar tendem a jogar mais defensivamente, o que infla artificialmente a chance de 0x0 e 1x1 em relação ao que o Poisson puro preveria. Essa é uma correção conhecida na literatura de modelagem esportiva, a correção de Dixon-Coles, que ajusta essas quatro células de placar baixo com um único parâmetro extra, já estudada e testada desde os anos 90.

## Um parênteses sobre quem escreveu o código

Preciso deixar uma coisa clara antes de continuar. A estatística e a microeconomia deste texto eu entendo de verdade, é bagagem de faculdade que eu só estava com saudade de usar. Mas o código que virou esse projeto eu não sentei e digitei linha por linha. Virei um vibe coder preguiçoso faz tempo, descrevo o que preciso, deixo o Claude escrever, reviso o que sai e só ponho a mão quando alguma coisa não fecha.

Isso vale ainda mais para a parte de simular a estratégia de aposta com Monte Carlo. Eu conhecia a teoria de forma bem solta, simulação estocástica e otimização eu vi de relance na faculdade e nunca tinha aplicado de verdade em nada com peso. Para sair da teoria solta e virar um programa que efetivamente escolhe a melhor estratégia, usei o Claude também como professor particular, fazendo pergunta básica até entender o suficiente para desconfiar de um resultado que não fazia sentido.

Dito isso, o motivo de precisar de simulação em vez de só maximizar valor esperado jogo a jogo é genuinamente interessante do ponto de vista de teoria dos jogos, e essa parte eu realmente entendo sem precisar de ajuda. Bolão é um jogo relativo, o que importa não é quantos pontos você faz, é se você faz mais pontos que os outros. Isso muda completamente a estratégia ótima dependendo da sua posição na tabela, e é o mesmo raciocínio usado para explicar por que gestores de fundo de investimento que estão perdendo para o benchmark tendem a assumir mais risco, enquanto quem está ganhando prefere só acompanhar o mercado de perto.

| Situação na tabela | O que a simulação recomenda | A lógica |
|---|---|---|
| Na liderança | Espelhar o palpite mais provável da galera | Minimiza a variância, ninguém ultrapassa quem já está copiando o consenso |
| No meio do pelotão | Maximizar valor esperado jogo a jogo | Sem vantagem relativa clara, então joga pelo ótimo individual |
| Atrás na tabela | Diferenciar do palpite óbvio | Precisa de um resultado raro para ultrapassar, e copiar todo mundo garante ficar para trás |

A simulação roda milhares de rodadas hipotéticas dos jogos que restam, sorteando tanto os placares reais quanto os palpites prováveis dos meus adversários, e escolhe a estratégia que maximiza a probabilidade de eu terminar em primeiro no fim de tudo, não a que maximiza pontos esperados isoladamente.

<div class="diagrama">
<svg viewBox="0 0 760 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagrama mostrando a simulação de Monte Carlo escolhendo entre três estratégias dependendo da posição na tabela do bolão">
  <defs>
    <marker id="arrow-bolao-2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill="var(--color-base-content)" opacity="0.5" />
    </marker>
  </defs>
  <rect x="280" y="20" width="200" height="90" rx="10" fill="var(--color-base-100)" stroke="var(--color-base-300)" />
  <text x="380" y="50" text-anchor="middle" font-size="15" font-weight="600" fill="var(--color-base-content)">Simulação Monte Carlo</text>
  <text x="380" y="70" text-anchor="middle" font-size="11" fill="var(--color-base-content)" opacity="0.6">
    <tspan x="380" dy="0">milhares de rodadas</tspan>
    <tspan x="380" dy="16">dos jogos que faltam</tspan>
  </text>
  <path d="M380,110 L150,160" stroke="var(--color-base-content)" stroke-opacity="0.35" stroke-width="2" fill="none" marker-end="url(#arrow-bolao-2)" />
  <path d="M380,110 L380,160" stroke="var(--color-base-content)" stroke-opacity="0.35" stroke-width="2" fill="none" marker-end="url(#arrow-bolao-2)" />
  <path d="M380,110 L610,160" stroke="var(--color-base-content)" stroke-opacity="0.35" stroke-width="2" fill="none" marker-end="url(#arrow-bolao-2)" />
  <rect x="40" y="160" width="220" height="90" rx="10" fill="var(--color-base-100)" stroke="var(--color-base-300)" />
  <text x="150" y="190" text-anchor="middle" font-size="14" font-weight="600" fill="var(--color-base-content)">Na liderança</text>
  <text x="150" y="210" text-anchor="middle" font-size="11" fill="var(--color-base-content)" opacity="0.6">espelha o palpite</text>
  <text x="150" y="226" text-anchor="middle" font-size="11" fill="var(--color-base-content)" opacity="0.6">mais provável</text>
  <rect x="270" y="160" width="220" height="90" rx="10" fill="var(--color-base-100)" stroke="var(--color-base-300)" />
  <text x="380" y="190" text-anchor="middle" font-size="14" font-weight="600" fill="var(--color-base-content)">No meio do pelotão</text>
  <text x="380" y="210" text-anchor="middle" font-size="11" fill="var(--color-base-content)" opacity="0.6">maximiza valor</text>
  <text x="380" y="226" text-anchor="middle" font-size="11" fill="var(--color-base-content)" opacity="0.6">esperado (EV puro)</text>
  <rect x="500" y="160" width="220" height="90" rx="10" fill="var(--color-base-100)" stroke="var(--color-base-300)" />
  <text x="610" y="190" text-anchor="middle" font-size="14" font-weight="600" fill="var(--color-base-content)">Atrás na tabela</text>
  <text x="610" y="210" text-anchor="middle" font-size="11" fill="var(--color-base-content)" opacity="0.6">diferencia do</text>
  <text x="610" y="226" text-anchor="middle" font-size="11" fill="var(--color-base-content)" opacity="0.6">palpite óbvio</text>
  <path d="M150,250 L340,310" stroke="var(--color-base-content)" stroke-opacity="0.35" stroke-width="2" fill="none" marker-end="url(#arrow-bolao-2)" />
  <path d="M380,250 L380,310" stroke="var(--color-base-content)" stroke-opacity="0.35" stroke-width="2" fill="none" marker-end="url(#arrow-bolao-2)" />
  <path d="M610,250 L420,310" stroke="var(--color-base-content)" stroke-opacity="0.35" stroke-width="2" fill="none" marker-end="url(#arrow-bolao-2)" />
  <rect x="280" y="310" width="200" height="70" rx="12" fill="var(--color-primary)" stroke="var(--color-primary)" />
  <text x="380" y="342" text-anchor="middle" font-size="15" font-weight="700" fill="var(--color-primary-content)">Palpite do jogo</text>
  <text x="380" y="362" text-anchor="middle" font-size="11" fill="var(--color-primary-content)" opacity="0.85">o que a simulação escolheu</text>
</svg>
</div>

*A mesma lógica de gestor de fundo perdendo para o benchmark, só que aplicada a quem vai acertar o placar de Brasil e Argentina.*

## Testando contra o mercado, sem trapacear com o futuro

A parte da qual eu mais me orgulho não é o daemon que fica apostando sozinho, é o backtest. Eu queria saber se meu palpite estava realmente melhor que simplesmente confiar cegamente na odd de mercado, e para isso não dá para usar qualquer atalho.

O erro clássico de quem faz esse tipo de teste é vazamento de dados. Se eu pegasse o rating de Elo de hoje de cada seleção para prever um jogo de 2022, esse rating já contém a informação do resultado daquele jogo, porque ele foi atualizado depois que o jogo aconteceu. Isso deixa o backtest artificialmente bonito e completamente inútil. A solução foi calcular meu próprio Elo em ordem cronológica, atualizando rating jogo a jogo e fotografando o valor de cada seleção exatamente antes do jogo que eu quero avaliar, nunca depois.

Com isso em mãos, comparei meu Elo caseiro contra as previsões de mercado de uma Copa passada, usando RPS, que é uma métrica pensada para previsões com categorias ordenadas, tipo vitória, empate e derrota, em vez de acurácia simples que trata todo erro como igual. E como uma comparação só não prova nada, usei bootstrap pareado para checar se a diferença entre os dois métodos era estatisticamente real ou só ruído de amostra pequena. Esse tipo de cuidado é chato de fazer e ninguém dá like por isso, mas é a diferença entre um resultado que significa algo e um número bonito que não sobrevive à próxima Copa.

## Terceiro lugar, e olha que já foi bom

Ao fim da Copa, terminei em terceiro lugar no bolão. Não ganhei nada, meus amigos ainda tiram sarro dizendo que perdi para gente que só chuta sem nenhum modelo, e tecnicamente eles têm razão. Mas o objetivo real nunca foi o prêmio, foi passar um mês relembrando Poisson, viés de mercado e simulação estocástica numa desculpa com prazo de validade e apito inicial.

Se um dia rolar outra Copa, o modelo está aí, pronto para tentar de novo. Da próxima vez talvez eu chegue em segundo.
