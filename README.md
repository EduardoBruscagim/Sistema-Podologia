# Angélica Eduarda | Cuidado para Pés e Mãos em Domicílio

> **Atendimento domiciliar especializado em Mococa - SP.**  
> Interface moderna com design elegante, sem taxa de deslocamento e com foco em cuidado humanizado, esterilização em autoclave e acessibilidade WCAG.

---

## 🎯 Sobre o Projeto

O **Sistema de Podologia & Cuidados (Angélica Eduarda)** é uma aplicação web voltada ao atendimento domiciliar humanizado e com alto padrão de higiene na cidade de **Mococa - SP**. A plataforma apresenta com clareza os serviços prestados (cuidado completo de pés e mãos, corte anatômico, desencravamento preventivo e suave, cutilagem, lixamento e pintura/esmaltação), esclarece os protocolos de biossegurança (esterilização em autoclave e descartáveis) e facilita o contato direto para agendamento via WhatsApp sem custos de deslocamento.

Para detalhes estratégicos de produto e diretrizes visuais completas, consulte:

- 📄 [PRODUCT.md](PRODUCT.md) — Visão de produto, público-alvo e capacidades planejadas.
- 🎨 [DESIGN.md](DESIGN.md) — Design System "O Santuário Clínico Minimalista", paleta cromática, tokens e tipografia.

---

## ✨ Funcionalidades e Status do Projeto

### Fase 1 (Entregue):

- **Landing Page B2C de Alta Conversão**: Apresentação clara do serviço em domicílio em Mococa - SP, diferenciais em Bento Grid e FAQ detalhado.
- **Tabela Transparente de Serviços**: Detalhamento dos 3 principais atendimentos (_Pé e Mão Completo_, _Cuidado dos Pés_ e _Cuidado das Mãos_), tempo estimado e diferenciais inclusos.
- **Canal Direto de Contato (WhatsApp)**: Botão flutuante acessível e links inteligentes com mensagens pré-formatadas para agendamento rápido.
- **Transparência Geográfica e Comercial**: Cobertura em toda a cidade de Mococa - SP com taxa de deslocamento zero (R$ 0) e pagamentos exclusivos via PIX ou dinheiro vivo.
- **Modo Claro / Escuro com Anti-FOUC**: Alternador de tema acessível com persistência em `localStorage` e script síncrono no `<head>`.
- **Acessibilidade Rigorosa (WCAG AA)**: _Skip link_ funcional (`#main-content`), suporte estrito a `prefers-reduced-motion`, navegação por setas nas abas do modal e alvos de toque de no mínimo 44x44px.
- **Simulação de Perfil de Cliente (Frontend Mock)**: Modal de login/cadastro local com persistência em `localStorage` para experimentação de interface.

### Fase 2 (Em Desenvolvimento / Roadmap):

- **Motor de Agendamento Interativo**: Calendário visual para escolha de data, horários disponíveis e endereço em Mococa.
- **Painel Administrativo da Profissional**: Gestão de rotas do dia, histórico de clientes e atendimentos realizados.

---

## 🛠️ Stack Tecnológica

| Camada                                 | Tecnologias                                                                            |
| :------------------------------------- | :------------------------------------------------------------------------------------- |
| **Core**                               | React 19, React Router 7, TypeScript (ES2022+)                                         |
| **Build & Dev Tool**                   | [Vite](https://vite.dev/) 8.3+ com `@tailwindcss/vite` e `@vitejs/plugin-react`        |
| **Estilização**                        | [Tailwind CSS v4](https://tailwindcss.com/), [daisyUI v5](https://daisyui.com/)        |
| **Tipografia**                         | [Outfit Variable](https://fontsource.org/fonts/outfit) (`@fontsource-variable/outfit`) |
| **Animações**                          | [GSAP 3](https://greensock.com/gsap/) + ScrollTrigger + `@gsap/react`                  |
| **Qualidade & Padronização**           | ESLint 10 (`typescript-eslint`), Prettier 3                                            |
| **Backend / Persistência (Planejado)** | Supabase (PostgreSQL, Auth, Storage)                                                   |

---

## 📁 Estrutura do Projeto

A organização de diretórios reflete a separação modular de componentes, animações e hooks em React 19:

```text
├── src/
│   ├── animations/         # Módulos de animações orquestradas via GSAP
│   │   ├── bento.ts        # Revelação e efeitos da seção Bento Grid
│   │   ├── cta.ts          # Animação e descarte do CTA final
│   │   ├── hero.ts         # Revelação tipográfica e levitação do Hero
│   │   ├── navbar.ts       # Ilha de navegação retrátil e reativa ao foco
│   │   └── reducedMotion.ts# Tratamento para preferência de movimento reduzido
│   ├── components/         # Componentes modulares React
│   │   ├── auth/           # Modal de autenticação acessível com tabs
│   │   ├── common/         # Componentes compartilhados (botão WhatsApp)
│   │   ├── home/           # Seções da Home (Hero, BentoGrid, Preços, FAQ, CTA)
│   │   └── layout/         # Componentes estruturais (Navbar, Footer)
│   ├── context/            # Provedores de contexto React (AuthContext, ThemeContext)
│   ├── hooks/              # Hooks customizados isolados (useAuth, useTheme)
│   ├── pages/              # Páginas da aplicação (HomePage, DashboardPage)
│   ├── types/              # Definições de interfaces e tipos TypeScript
│   ├── utils/              # Helpers e utilitários puros (theme.ts)
│   ├── App.tsx             # Roteador React Router 7 e provedores globais
│   ├── main.tsx            # Ponto de entrada React e registro de plugins GSAP
│   └── style.css           # Tokens de tema semânticos, fontes e Tailwind v4
├── public/                 # Assets estáticos, robots.txt, sitemap.xml, og-image.jpg
├── index.html              # Shell HTML semântico com JSON-LD Schema.org e anti-FOUC
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

## ⚡ Otimizações de Produção

O build do projeto está configurado no `vite.config.ts` com:

- **Separação de Chunks (Code Splitting)**: GSAP isolado em `vendor-gsap` para carregamento eficiente e cache otimizado.
- **CSS Code Splitting e Minificação**: Redução do payload inicial de estilos.
- **Assets Hashing Estruturado**: Saída organizada em subpastas (`assets/js/`, `assets/css/`, `assets/woff2/`, etc.) com hashes consistentes.

---

## 📄 Licença

Este projeto é de uso exclusivo e proprietário de **Eduardo Bruscagim** e **Angélica Eduarda Amaro Bruscagim**. Todos os direitos reservados.

O código-fonte é disponibilizado publicamente exclusivamente para fins de visualização técnica e portfólio. Para mais detalhes, consulte o arquivo [LICENSE](LICENSE).
