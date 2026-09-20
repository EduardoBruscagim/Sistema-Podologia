# Angélica Eduarda | Cuidado para Pés e Mãos em Domicílio

> **Atendimento domiciliar em Mococa, SP.**  
> Interface moderna, sem taxa de deslocamento, com foco em cuidado com os pés e mãos, instrumentos esterilizados e acessibilidade WCAG.

---

## 🎯 Sobre o Projeto

O **Sistema de Podologia & Cuidados (Angélica Eduarda)** é uma aplicação web voltada ao atendimento domiciliar e com alto padrão de higiene na cidade de **Mococa, SP**. A plataforma apresenta com clareza os serviços prestados (cuidado completo de pés e mãos, corte anatômico, desencravamento preventivo e suave, cutilagem, lixamento e pintura/esmaltação), esclarece os cuidados com instrumentos esterilizados e descartáveis, e facilita o contato direto para agendamento via WhatsApp sem custos de deslocamento.

Para detalhes estratégicos de produto e diretrizes visuais completas, consulte:

- 📄 [PRODUCT.md](PRODUCT.md): Visão de produto, público-alvo e capacidades planejadas.
- 🎨 [DESIGN.md](DESIGN.md): Design System, paleta cromática, tokens e tipografia.

---

## ✨ Funcionalidades e Status do Projeto

### Fase 1 (Entregue):

- **Landing Page B2C de Alta Conversão**: Apresentação editorial elegante do atendimento domiciliar em Mococa, SP, diferenciais em Bento Grid, métricas de credibilidade e FAQ detalhado.
- **Pacote de Animações Premium & Microinterações (60 FPS)**:
  - **Contador Numérico Fluido (`TrustStats`)**: Interpolação suave de `0` até `+25.000` em 2.4s com curva `power2.out`, com odômetro numérico formatado (`pt-BR`) e preservação integral de acessibilidade (`aria-label`).
  - **Profundidade Parallax em 2 Camadas (`Hero`)**: Separação espacial de 65px entre a maleta (+35px) e o selo de higiene suspenso (-30px) no desktop, criando efeito autêntico de estúdio fotográfico.
  - **Desdobramento Tipográfico no FAQ**: Acordeão fluido com 500ms e curva `cubic-bezier(0.16, 1, 0.3, 1)` com descida suave do texto sem caixas internas pesadas, priorizando respiração editorial e leitura limpa.
  - **Microinterações Magnéticas nos Botões de Ação**: Atração suave na direção do cursor com retorno elástico nos 3 CTAs principais no desktop (`useMagneticButton`), com bypass automático em telas touch.
  - **Spotlight & Border Sheen nos Procedimentos**: Feixe luminoso animado percorrendo o topo da borda do procedimento recomendado (_Pé e Mão Completo_) e aura âmbar que segue o cursor nos cards.
- **Arquitetura Anti-FOUC e Estabilidade Visual**: Prevenção rigorosa de saltos visuais ou piscadas através da classe transitória `.js:not(.gsap-loaded)` no CSS, transferindo o controle ao GSAP via `requestAnimationFrame` na montagem.
- **Pré-renderização Estática (SSG) & CSS Inlined**: Compilação de HTML estático com inlining do CSS crítico em `<style>` no `<head>` via `scripts/prerender.mjs`, eliminando requisições bloqueadoras de 150ms no mobile.
- **Navegação Inteligente & Mobile UX (`Navbar`)**: Barra de navegação com listener passivo de scroll `{ passive: true }` coordenado por `requestAnimationFrame` a 60/120fps e sincronizado com trava de rolagem no `body` ao abrir o menu mobile.
- **Equipamentos e Higiene (`TechnologySection`)**: Apresentação dos aparelhos portáteis levados no atendimento (LED vermelho de fototerapia, cabine UV portátil) e esterilização hospitalar em autoclave a 134°C com laudo biológico e 100% descartáveis.
- **Tabela Transparente de Serviços (`ServicesPricing`)**: Detalhamento dos 3 principais procedimentos (_Pé e Mão Completo_, _Cuidado dos Pés_ e _Cuidado das Mãos_), tempo estimado, diferenciais e valores pré-definidos.
- **Canal Direto de Contato (WhatsApp)**: Botão flutuante acessível e atalhos contextualizados para agendamento sem intermediários.
- **Transparência Geográfica e Comercial**: Cobertura em toda a cidade de Mococa, SP com taxa de deslocamento zero (R$ 0) e pagamentos via PIX ou dinheiro.
- **Modo Claro / Escuro com Anti-FOUC**: Alternador de tema acessível com persistência em `localStorage` e script síncrono no `<head>` com sincronização de `theme-color` móvel.
- **Acessibilidade Universal (WCAG AA/AAA)**: _Skip link_ funcional (`#main-content`), contrastes calibrados (`text-on-accent` e `dark:text-surface`), anéis de foco visíveis e alvos de toque de no mínimo 44x44px.
- **Fontes 100% Auto-hospedadas**: Fontes variáveis `Newsreader` e `Outfit` servidas localmente em formato WOFF2, eliminando dependências de rede e atrasos de renderização de fontes externas.

### Fase 2 (Em Desenvolvimento / Roadmap):

- **Motor de Agendamento Interativo**: Calendário visual para escolha de data, horários disponíveis e endereço residencial em Mococa.
- **Painel Administrativo da Profissional**: Gestão de rotas do dia, histórico de clientes e atendimentos realizados.

---

## 🛠️ Stack Tecnológica

| Camada                                 | Tecnologias                                                                                                                                                        |
| :------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Core**                               | [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/) (ES2022+)                                                                            |
| **Build & Dev Tool**                   | [Vite](https://vite.dev/) 8.3+ com `@tailwindcss/vite` e `@vitejs/plugin-react`                                                                                    |
| **Estilização**                        | [Tailwind CSS v4](https://tailwindcss.com/) com tokens semânticos e paleta mineral                                                                                 |
| **Tipografia**                         | [Newsreader Variable](https://fontsource.org/fonts/newsreader) e [Outfit Variable](https://fontsource.org/fonts/outfit) (`@fontsource-variable/*` auto-hospedadas) |
| **Animações & Motion**                 | [GSAP 3](https://greensock.com/gsap/) + ScrollTrigger + `@gsap/react` com microinterações magnéticas                                                               |
| **Ícones & Acessibilidade**            | [Lucide React](https://lucide.dev/) (SVGs acessíveis com `aria-hidden`)                                                                                            |
| **Qualidade & Padronização**           | ESLint 10 (`typescript-eslint`), Prettier 3                                                                                                                        |
| **Pré-renderização (SSG)**             | Script customizado `scripts/prerender.mjs` com React Server DOM e inlining de CSS crítico                                                                          |
| **Backend / Persistência (Planejado)** | Supabase (PostgreSQL, Auth, Storage)                                                                                                                               |

---

## 📁 Estrutura do Projeto

A organização de diretórios reflete a separação modular de componentes, animações e hooks em React 19:

```text
├── src/
│   ├── animations/         # Módulos de animações orquestradas via GSAP
│   │   ├── about.ts        # Revelação da biografia e credenciais
│   │   ├── bento.ts        # Revelação e efeitos da seção Bento Grid
│   │   ├── cardHover.ts    # Elevação e inclinação suave em cards interativos
│   │   ├── cta.ts          # Animação do CTA final de agendamento
│   │   ├── faq.ts          # Altura dinâmica e transições da seção de perguntas
│   │   ├── hero.ts         # Parallax de 2 camadas na maleta e badge flutuante
│   │   ├── navbar.ts       # Ilha retrátil com listener passivo em requestAnimationFrame
│   │   ├── reducedMotion.ts# Tratamento para preferência de movimento reduzido
│   │   ├── services.ts     # Entrada escalonada dos procedimentos
│   │   ├── stats.ts        # Odômetro numérico (+25.000) e métricas de confiança
│   │   └── technology.ts   # Revelação dos diferenciais tecnológicos e autoclave
│   ├── components/         # Componentes modulares React
│   │   ├── common/         # Componentes compartilhados (WhatsAppButton com física magnética)
│   │   ├── home/           # Seções da Home (Hero, TrustStats, BentoGrid, AboutSection, ServicesPricing, TechnologySection, FaqSection, CtaSection)
│   │   └── layout/         # Componentes estruturais (Navbar, Footer)
│   ├── context/            # Provedores de contexto React (ThemeContext)
│   ├── data/               # Modelos e dados estáticos (services.ts)
│   ├── hooks/              # Hooks customizados isolados (useTheme, useMagneticButton, useSectionAnimation)
│   ├── pages/              # Páginas da aplicação (HomePage)
│   ├── types/              # Definições de interfaces e tipos TypeScript (theme.ts)
│   ├── utils/              # Helpers e utilitários puros (theme.ts, whatsapp.ts)
│   ├── App.tsx             # Ponto de entrada da aplicação e provedor de tema
│   ├── main.tsx            # Ponto de entrada React, registro GSAP e sincronizador anti-FOUC
│   └── style.css           # Tokens de tema semânticos, fontes variáveis e regras de proteção FOUC
├── scripts/
│   └── prerender.mjs       # Pré-renderizador estático (SSG) com inlining de CSS crítico
├── public/                 # Assets otimizados (WebP/AVIF), robots.txt, sitemap.xml, og-image.jpg
├── index.html              # Shell HTML semântico com JSON-LD Schema.org, anti-FOUC e LCP preloads
├── DESIGN.md               # Especificação detalhada do Design System e motion tokens
├── PRODUCT.md              # Documento de produto, proposta de valor e roadmap
├── vite.config.ts          # Configuração do Vite com suporte a React e Tailwind
└── package.json            # Dependências e scripts do projeto
```

---

## 🚀 Começando

### Pré-requisitos

- **Node.js**: `>= 20.x`
- **npm**: `>= 10.x`

### Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/Eduuhbruscagim/Sistema-Podologia.git
cd Sistema-Podologia
npm install
```

### Executando em Desenvolvimento

Inicie o servidor de desenvolvimento do Vite:

```bash
npm run dev
```

Acesse `http://localhost:5173` no seu navegador.

---

## 📜 Scripts Disponíveis

| Comando                | Descrição                                                                                    |
| :--------------------- | :------------------------------------------------------------------------------------------- |
| `npm run dev`          | Inicia o servidor local de desenvolvimento com Hot Module Replacement (HMR).                 |
| `npm run build`        | Valida tipagens estáticas (`tsc -b`) e compila os assets para produção no diretório `dist/`. |
| `npm run preview`      | Executa um servidor local para inspecionar o build de produção gerado em `dist/`.            |
| `npm run typecheck`    | Executa checagem de tipos estáticos sem emitir arquivos.                                     |
| `npm run lint`         | Executa a validação de código estático via ESLint.                                           |
| `npm run lint:fix`     | Corrige problemas automáticos apontados pelo ESLint.                                         |
| `npm run format`       | Aplica a formatação de código com Prettier em todos os arquivos compatíveis.                 |
| `npm run format:check` | Verifica se o código atende às regras de formatação sem alterá-lo.                           |
| `npm run check`        | Pipeline completa de integridade local (`lint` + `format:check` + `build`).                  |

---

## ⚡ Otimizações de Produção & Performance

O build do projeto está configurado no `vite.config.ts` com:

- **Separação de Chunks (Code Splitting)**: GSAP e plugins isolados em `vendor-gsap` (121 kB) e React Core isolado em `vendor-react` (210 kB, enxuto após remoção de bibliotecas redundantes).
- **Alinhamento de Preload LCP**: Formato WebP priorizado tanto na tag `<picture>` quanto no `<link rel="preload">`, eliminando requisições redundantes de rede.
- **CSSOM Não-Bloqueante**: Fonte serifada `Newsreader` carregada assincronamente com suporte a `<noscript>`.
- **Renderização Acelerada sem Microjank**: Desativação de filtros dinâmicos SVG pesados em dispositivos de toque móveis via media query `@media (hover: none) and (pointer: coarse)`.
- **CSS Code Splitting e Minificação**: Redução do payload inicial de estilos para apenas 9.9 kB gzipped.
- **Assets Hashing Estruturado**: Saída organizada em subpastas (`assets/js/`, `assets/css/`, `assets/woff2/`, etc.) com hashes imutáveis para cache de longo prazo.

---

## 📄 Licença

Este projeto é de uso exclusivo e proprietário de **Eduardo Bruscagim** e **Angélica Eduarda Amaro Bruscagim**. Todos os direitos reservados.

O código-fonte é disponibilizado publicamente exclusivamente para fins de visualização técnica e portfólio. Para mais detalhes, consulte o arquivo [LICENSE](LICENSE).
