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
- **Métricas e Credenciais de Confiança (`TrustStats`)**: Experiência comprovada desde 2016 e mais de 25.000 atendimentos realizados por especialista dedicada.
- **Equipamentos e Higiene (`TechnologySection`)**: Apresentação dos aparelhos portáteis levados no atendimento (LED vermelho de fototerapia, cabine UV portátil) e esterilização hospitalar em autoclave a 134°C com laudo biológico e 100% descartáveis.
- **Tabela Transparente de Serviços (`ServicesPricing`)**: Detalhamento dos 3 principais procedimentos (_Pé e Mão Completo_, _Cuidado dos Pés_ e _Cuidado das Mãos_), tempo estimado, diferenciais e valores pré-definidos.
- **Canal Direto de Contato (WhatsApp)**: Botão flutuante acessível e atalhos contextualizados para tirar dúvidas ou agendar sem intermediários.
- **Transparência Geográfica e Comercial**: Cobertura em toda a cidade de Mococa, SP com taxa de deslocamento zero (R$ 0) e pagamentos via PIX ou dinheiro.
- **Acordeão Interativo de FAQ com CSS Grid + GSAP**: Expansão fluida sem layout thrashing (`grid-rows-[0fr]` -> `grid-rows-[1fr]`), navegável por teclado e total acessibilidade WAI-ARIA APG.
- **Introdução Editorial de Marca (`BrandIntro`)**: Monograma de abertura com saída suave, suporte a `sessionStorage`, cancelamento por tecla `Escape` e dispensa imediata por toque/clique no mobile.
- **Navegação Inteligente & Mobile UX (`Navbar`)**: Cabeçalho retrátil reativo à rolagem com `ScrollTrigger`, sincronizado com trava de rolagem (`overflow: hidden`) no `body` ao abrir o menu mobile.
- **Micro-interações e Animações GSAP**: Módulos dedicados com suporte estrito a `prefers-reduced-motion: reduce`, efeito magnético `cardHover.ts` e orquestração de ScrollTrigger em todas as seções.
- **Modo Claro / Escuro com Anti-FOUC**: Alternador de tema acessível com persistência em `localStorage` e script síncrono no `<head>` com sincronização de `theme-color` móvel.
- **Acessibilidade Universal (WCAG AA/AAA)**: _Skip link_ funcional (`#main-content`), contrastes calibrados (`text-on-accent` e `dark:text-surface`), gerenciamento de foco (focus trap e restauração de foco no menu mobile) e alvos de toque de no mínimo 44x44px.
- **Otimização de Core Web Vitals**: Preload de imagem LCP de alta prioridade em formato WebP, carregamento não-bloqueante de fontes do Google Fonts e supressão de ruído procedural em telas de toque.

### Fase 2 (Em Desenvolvimento / Roadmap):

- **Motor de Agendamento Interativo**: Calendário visual para escolha de data, horários disponíveis e endereço residencial em Mococa.
- **Painel Administrativo da Profissional**: Gestão de rotas do dia, histórico de clientes e atendimentos realizados.

---

## 🛠️ Stack Tecnológica

| Camada                                 | Tecnologias                                                                                                                                                            |
| :------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Core**                               | [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/) (ES2022+)                                                                                |
| **Build & Dev Tool**                   | [Vite](https://vite.dev/) 8.3+ com `@tailwindcss/vite` e `@vitejs/plugin-react`                                                                                        |
| **Estilização**                        | [Tailwind CSS v4](https://tailwindcss.com/) com tokens semânticos e paleta mineral                                                                                     |
| **Tipografia**                         | [Newsreader](https://fonts.google.com/specimen/Newsreader) (Serifa Editorial) e [Outfit Variable](https://fontsource.org/fonts/outfit) (`@fontsource-variable/outfit`) |
| **Animações**                          | [GSAP 3](https://greensock.com/gsap/) + ScrollTrigger + `@gsap/react`                                                                                                  |
| **Ícones & Acessibilidade**            | [Lucide React](https://lucide.dev/) (SVGs acessíveis com `aria-hidden`)                                                                                                |
| **Qualidade & Padronização**           | ESLint 10 (`typescript-eslint`), Prettier 3, Impeccable AST Detector                                                                                                   |
| **Backend / Persistência (Planejado)** | Supabase (PostgreSQL, Auth, Storage)                                                                                                                                   |

---

## 📁 Estrutura do Projeto

A organização de diretórios reflete a separação modular de componentes, animações e hooks em React 19:

```text
├── src/
│   ├── animations/         # Módulos de animações orquestradas via GSAP
│   │   ├── bento.ts        # Revelação e efeitos da seção Bento Grid
│   │   ├── cardHover.ts    # Elevação e inclinação magnética em cards
│   │   ├── cta.ts          # Animação do CTA final
│   │   ├── faq.ts          # Altura dinâmica e rotação do acordeão de FAQ
│   │   ├── hero.ts         # Revelação tipográfica e levitação do Hero
│   │   ├── navbar.ts       # Ilha retrátil, reativa ao foco e sincronizada com menu mobile
│   │   ├── reducedMotion.ts# Tratamento para preferência de movimento reduzido
│   │   ├── services.ts     # Entrada escalonada dos cartões de serviços
│   │   ├── stats.ts        # Contadores numéricos e métricas de confiança
│   │   └── technology.ts   # Revelação dos diferenciais tecnológicos e autoclave
│   ├── components/         # Componentes modulares React
│   │   ├── common/         # Componentes compartilhados (BrandIntro, WhatsAppButton)
│   │   ├── home/           # Seções da Home (Hero, TrustStats, BentoGrid, ServicesPricing, TechnologySection, FaqSection, CtaSection)
│   │   └── layout/         # Componentes estruturais (Navbar, Footer)
│   ├── context/            # Provedores de contexto React (ThemeContext)
│   ├── data/               # Modelos e dados estáticos (services.ts)
│   ├── hooks/              # Hooks customizados isolados (useTheme)
│   ├── pages/              # Páginas da aplicação (HomePage)
│   ├── types/              # Definições de interfaces e tipos TypeScript (theme.ts)
│   ├── utils/              # Helpers e utilitários puros (theme.ts, whatsapp.ts)
│   ├── App.tsx             # Ponto de entrada da aplicação e provedor de tema
│   ├── main.tsx            # Ponto de entrada React e registro de plugins GSAP
│   └── style.css           # Tokens de tema semânticos, fontes e Tailwind v4
├── public/                 # Assets otimizados (WebP/AVIF), robots.txt, sitemap.xml, og-image.jpg
├── index.html              # Shell HTML semântico com JSON-LD Schema.org, anti-FOUC e LCP preloads
├── DESIGN.md               # Especificação detalhada do Design System
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
