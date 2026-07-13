---
titulo: "cc, um Daemon em Go para Vigiar os Meus Próprios Projetos"
subtitulo: "Toda vez que um serviço meu caía eu descobria pelo usuário, não pelo servidor. Construí um daemon único que monitora tudo e me avisa no Telegram, e aproveitei para aprender Go do zero."
data: "2026"
tags: ["Go", "Backend", "DevOps", "Telegram"]
descricao: "Daemon em Go que monitora serviços, disco, memória e CPU de um servidor Linux e centraliza notificações no Telegram. Também serviu de primeiro contato com a linguagem."
repo: "https://github.com/BrennoAlves/cc"
---

## O problema que eu já tinha visto de tantos jeitos

Eu tenho vários projetos pequenos rodando em VMs. Scraper, API interna, script agendado, esse tipo de coisa. E toda vez que um desses caía, o padrão de descoberta era sempre o mesmo, vergonhoso. Alguém reclamava, ou eu mesmo esbarrava no erro tentando usar a coisa, e só aí ia olhar o log.

A solução óbvia seria colocar um healthcheck em cada projeto. Só que cada projeto é uma linguagem diferente, um jeito diferente de rodar, às vezes nem daemon é, é só um script de cron. Reimplementar "me avisa se algo der errado" dentro de cada um significava copiar a mesma lógica de threshold, retry e envio de mensagem várias vezes, em várias linguagens. Isso é o tipo de duplicação que eu evito por reflexo.

Então decidi inverter. Em vez de cada projeto saber se avisar, construí uma peça central que sabe monitorar e notificar, e os projetos só precisam saber que ela existe. Nasceu o cc, um daemon que roda uma vez por servidor e vira o único caminho para qualquer coisa virar mensagem no meu Telegram.

Fun fact sobre o nome, já que ninguém pergunta mas eu conto assim mesmo. C.C. é a parceira do protagonista em Code Geass, meu anime favorito, e ela passa a série inteira observando tudo calada nos bastidores enquanto o Lelouch surta. Achei apropriado para uma coisa que fica seis meses sem falar nada e só aparece para dizer que o disco encheu.

Escolhi Go para escrever ele. Eu nunca tinha tocado na linguagem antes disso, e um daemon de infraestrutura pareceu boa desculpa para experimentar. Binário estático, sem runtime para instalar no servidor, concorrência que é parte da linguagem e não uma biblioteca por cima. Também ajudou o fato de eu já não aguentar mais ver "ModuleNotFoundError" às oito da manhã.

## Como ele se encaixa no que já existe

A ideia central é simples. O cc fica no meio do caminho entre "algo aconteceu" e "eu fiquei sabendo". De um lado, os próprios serviços do servidor batem numa API HTTP local pedindo para avisar alguma coisa. Do outro, o próprio cc fica de olho no disco, na memória, na CPU e nos healthchecks HTTP dos serviços monitorados, sem precisar que ninguém peça. Tudo isso converge para o mesmo lugar, que decide para qual canal do Telegram a mensagem vai.

<div class="diagrama">
<svg viewBox="0 0 760 460" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagrama mostrando aplicações e checagens internas enviando notificações para o daemon cc, que roteia tudo para canais do Telegram">
  <defs>
    <marker id="arrow-cc-1" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill="var(--color-base-content)" opacity="0.5" />
    </marker>
  </defs>
  <!-- fontes de notificação -->
  <g font-family="inherit">
    <rect x="20" y="20" width="170" height="70" rx="10" fill="var(--color-base-100)" stroke="var(--color-base-300)" />
    <text x="105" y="50" text-anchor="middle" font-size="15" font-weight="600" fill="var(--color-base-content)">App A</text>
    <text x="105" y="70" text-anchor="middle" font-size="11" fill="var(--color-base-content)" opacity="0.6">POST /notify</text>
    <rect x="210" y="20" width="170" height="70" rx="10" fill="var(--color-base-100)" stroke="var(--color-base-300)" />
    <text x="295" y="50" text-anchor="middle" font-size="15" font-weight="600" fill="var(--color-base-content)">App B</text>
    <text x="295" y="70" text-anchor="middle" font-size="11" fill="var(--color-base-content)" opacity="0.6">POST /notify</text>
    <rect x="400" y="20" width="170" height="70" rx="10" fill="var(--color-base-100)" stroke="var(--color-base-300)" />
    <text x="485" y="50" text-anchor="middle" font-size="15" font-weight="600" fill="var(--color-base-content)">cron / script</text>
    <text x="485" y="70" text-anchor="middle" font-size="11" fill="var(--color-base-content)" opacity="0.6">cc notify</text>
    <rect x="590" y="20" width="170" height="70" rx="10" fill="var(--color-base-100)" stroke="var(--color-base-300)" />
    <text x="675" y="45" text-anchor="middle" font-size="15" font-weight="600" fill="var(--color-base-content)">checks internos</text>
    <text x="675" y="63" text-anchor="middle" font-size="11" fill="var(--color-base-content)" opacity="0.6">disco · cpu · gcp</text>
    <text x="675" y="78" text-anchor="middle" font-size="11" fill="var(--color-base-content)" opacity="0.6">backup</text>
  </g>
  <!-- setas convergindo para o hub -->
  <path d="M105,90 L300,160" stroke="var(--color-base-content)" stroke-opacity="0.35" stroke-width="2" fill="none" marker-end="url(#arrow-cc-1)" />
  <path d="M295,90 L350,160" stroke="var(--color-base-content)" stroke-opacity="0.35" stroke-width="2" fill="none" marker-end="url(#arrow-cc-1)" />
  <path d="M485,90 L410,160" stroke="var(--color-base-content)" stroke-opacity="0.35" stroke-width="2" fill="none" marker-end="url(#arrow-cc-1)" />
  <path d="M675,90 L460,160" stroke="var(--color-base-content)" stroke-opacity="0.35" stroke-width="2" fill="none" marker-end="url(#arrow-cc-1)" />
  <!-- hub cc -->
  <rect x="280" y="160" width="200" height="80" rx="12" fill="var(--color-primary)" stroke="var(--color-primary)" />
  <text x="380" y="196" text-anchor="middle" font-size="20" font-weight="700" fill="var(--color-primary-content)">cc</text>
  <text x="380" y="216" text-anchor="middle" font-size="11" fill="var(--color-primary-content)" opacity="0.85">roteia por canal</text>
  <!-- seta para telegram -->
  <path d="M380,240 L380,310" stroke="var(--color-base-content)" stroke-opacity="0.35" stroke-width="2" fill="none" marker-end="url(#arrow-cc-1)" />
  <rect x="280" y="310" width="200" height="60" rx="10" fill="var(--color-base-100)" stroke="var(--color-base-300)" />
  <text x="380" y="346" text-anchor="middle" font-size="15" font-weight="600" fill="var(--color-base-content)">Telegram</text>
  <!-- setas para canais -->
  <path d="M340,370 L305,400" stroke="var(--color-base-content)" stroke-opacity="0.35" stroke-width="2" fill="none" marker-end="url(#arrow-cc-1)" />
  <path d="M420,370 L465,400" stroke="var(--color-base-content)" stroke-opacity="0.35" stroke-width="2" fill="none" marker-end="url(#arrow-cc-1)" />
  <rect x="230" y="400" width="150" height="50" rx="10" fill="var(--color-base-100)" stroke="var(--color-base-300)" />
  <text x="305" y="430" text-anchor="middle" font-size="13" fill="var(--color-base-content)">canal: pessoal</text>
  <rect x="390" y="400" width="150" height="50" rx="10" fill="var(--color-base-100)" stroke="var(--color-base-300)" />
  <text x="465" y="430" text-anchor="middle" font-size="13" fill="var(--color-base-content)">canal: produção</text>
</svg>
</div>

*Qualquer aplicação no servidor pode falar com o cc via HTTP, sem precisar saber Go nem entender o config dele. Os checks internos usam o mesmo caminho de saída, então o roteamento por canal vale igual para os dois lados.*

## O que ele monitora sozinho

Boa parte do valor do cc está no que ele faz sem ninguém pedir. Ele lê disco, memória e CPU do servidor em intervalo configurável, e avisa em dois estágios. Um aviso mais cedo, para dar tempo de agir, e um crítico, para quando já é tarde.

| Recurso | Aviso | Crítico |
|---|---|---|
| Disco | 70% | 90% |
| Memória | 70% | 90% |
| CPU | 85% (configurável) | 90% |

Ele também faz healthcheck HTTP dos serviços que eu cadastro no config, com um número mínimo de falhas seguidas antes de alertar, para não me acordar por causa de um blip de rede de dois segundos. E como boa parte do que eu rodo mora no GCP free tier, ele também acompanha o egress de rede da VM e avisa antes de eu estourar o limite gratuito sem querer.

Por fim, tem os backups. Meus bancos são SQLite, e o cc sobe uma cópia para o Cloud Storage no horário configurado, com retenção por dias. Nada sofisticado, mas é exatamente o tipo de tarefa chata que eu queria parar de lembrar manualmente.

## Silêncio programado

Um problema que apareceu rápido foi o de madrugada. Alerta de rotina às três da manhã não ajuda ninguém, só me acorda para uma informação que podia perfeitamente esperar até eu abrir o olho. Mas eu não queria simplesmente desligar notificações à noite, porque aí um serviço realmente fora do ar também ficaria em silêncio.

A solução foi separar rotina de crítico. Notificação de rotina, tipo "backup concluído" ou "disco em 70%", entra numa janela de silêncio configurável e fica represada em disco. Quando a janela termina, tudo que se acumulou vira um único digest. Alerta crítico, tipo "recurso em 90%" ou "serviço fora do ar", ignora a janela e chega na hora, sempre.

<div class="diagrama">
<svg viewBox="0 0 760 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Linha do tempo de 18h a 12h mostrando a janela de silêncio entre 22h e 8h, com uma notificação de rotina represada, um digest entregue ao amanhecer e um alerta crítico que atravessa a janela sem esperar">
  <defs>
    <marker id="arrow-cc-2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill="var(--color-base-content)" opacity="0.5" />
    </marker>
  </defs>
  <!-- faixa de silencio: 22h (x=191) a 8h (x=568.9) -->
  <rect x="191" y="110" width="378" height="60" fill="var(--color-base-300)" opacity="0.6" rx="6" />
  <text x="380" y="100" text-anchor="middle" font-size="13" font-weight="600" fill="var(--color-base-content)">quiet hours (22h – 8h)</text>
  <!-- eixo -->
  <line x1="40" y1="140" x2="720" y2="140" stroke="var(--color-base-content)" stroke-opacity="0.4" stroke-width="2" />
  <!-- ticks -->
  <g font-size="11" fill="var(--color-base-content)" opacity="0.6" text-anchor="middle">
    <text x="40" y="160">18h</text>
    <text x="191" y="160">22h</text>
    <text x="380" y="160">3h</text>
    <text x="568.9" y="160">8h</text>
    <text x="720" y="160">12h</text>
  </g>
  <!-- rotina represada -->
  <circle cx="228.9" cy="140" r="5" fill="var(--color-base-content)" />
  <text x="228.9" y="200" text-anchor="middle" font-size="11" fill="var(--color-base-content)">
    <tspan x="228.9" dy="0">disco em 70%</tspan>
    <tspan x="228.9" dy="14">fica represado</tspan>
  </text>
  <!-- digest -->
  <circle cx="568.9" cy="140" r="6" fill="var(--color-primary)" />
  <text x="568.9" y="200" text-anchor="middle" font-size="11" fill="var(--color-base-content)">
    <tspan x="568.9" dy="0">digest do que</tspan>
    <tspan x="568.9" dy="14">se acumulou</tspan>
  </text>
  <!-- alerta critico atravessando -->
  <line x1="342" y1="60" x2="342" y2="140" stroke="var(--color-error)" stroke-width="2" stroke-dasharray="4,3" />
  <circle cx="342" cy="140" r="6" fill="var(--color-error)" />
  <text x="342" y="45" text-anchor="middle" font-size="11" font-weight="600" fill="var(--color-error)">
    <tspan x="342" dy="0">serviço caiu</tspan>
    <tspan x="342" dy="14">entrega imediata</tspan>
  </text>
</svg>
</div>

*A janela represa o que pode esperar, mas o crítico corta caminho por cima dela e chega direto, a qualquer hora.*

## O que aprendi tentando Go pela primeira vez

Passei a maior parte da minha vida de código em Python, então a mudança de chave mental foi grande. Coisas que eu resolvia com um dicionário solto ou um dataclass agora precisavam de struct e de tipo explícito em todo canto, o que no começo pareceu burocracia e depois de duas semanas virou rede de segurança. Boa parte dos meus bugs iniciais foram pegos pelo compilador antes de eu nem rodar o programa.

O que mais me marcou foi goroutine e channel. Rodar o healthcheck de vários serviços em paralelo, sem travar o resto do daemon enquanto isso, é algo que em Python eu resolveria com asyncio e uma certa dose de fé. Em Go é praticamente parte da sintaxe, o que é ótimo até você esquecer de proteger o arquivo de estado com um mutex e passar uma tarde inteira decifrando por que duas goroutines estavam brigando pelo mesmo `state.json` como duas pessoas tentando passar por uma porta ao mesmo tempo.

E teve o deploy, que foi a parte que mais me converteu. `GOOS=linux GOARCH=amd64 go build` no meu Mac, `scp` o binário para o servidor, e pronto, sem interpretador para instalar, sem ambiente virtual, sem versão de linguagem para bater com a do servidor. Depois de anos resolvendo "funciona na minha máquina" em Python, ver um binário só rodar no Linux sem drama quase me deu vontade de reescrever tudo que eu já fiz em Go. Quase.

## O que ficou de fora, por enquanto

O cc só sabe entregar por Telegram. Dá para adicionar outros tipos de canal, o código já separa "canal" de "forma de entrega" para isso, mas até agora um canal só resolveu meu problema real, então não fui construir opção de Discord ou email que eu nunca ia configurar. Também não tem nada de alta disponibilidade. É um daemon por servidor, e se o servidor inteiro cair, o vigia cai junto e ninguém avisa ninguém, o que é uma piada de segurança que eu escolho não pensar demais.

Hoje o cc está aí, ligado, quieto, mandando mensagem só quando precisa, exatamente como a C.C. faria. Só que sem pizza e sem poder de Geass, só um binário de Go e um token de Telegram.
