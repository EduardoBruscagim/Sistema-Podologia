# Angélica Eduarda | Podologia Especializada

> **Minimalismo clínico premium e autoagendamento de podologia domiciliar.**  
> Interface moderna inspirada na linguagem de design da Apple, com foco em eliminação de atrito, alta performance e acessibilidade WCAG.

---

## 🎯 Sobre o Projeto

O **Sistema de Podologia (Angélica Eduarda)** é uma aplicação web focada no atendimento podológico humanizado e especializado. Atualmente, o projeto conta com uma **landing page de autoagendamento B2C de alta conversão**, projetada para permitir que pacientes agendem atendimentos domiciliares com facilidade e clareza, sem a necessidade de trocas demoradas de mensagens, dispondo de uma arquitetura modular preparada para expansão futura para prontuário e gestão clínica.

Para detalhes estratégicos de produto e diretrizes visuais completas, consulte:

- 📄 [PRODUCT.md](PRODUCT.md) — Visão de produto, público-alvo e capacidades planejadas.
- 🎨 [DESIGN.md](DESIGN.md) — Design System "O Santuário Clínico Minimalista", paleta cromática, tokens e tipografia.

---

## ✨ Principais Funcionalidades

- **Autoagendamento B2C Sem Atrito**: Apresentação clara dos serviços com chamada para agendamento direto em tempo real.
- **Design Minimalista Clínico Premium**: Inspirado na elegância editorial da Apple, combinando superfícies translúcidas com Bento Grids e tipografia de alto impacto.
- **Modo Claro / Escuro Inteligente**:
  - Alternador de tema acessível com persistência em `localStorage`.
  - Script síncrono inline no `<head>` para prevenção total de FOUC (_Flash of Unstyled/Incorrect Theme_).
- **Animações Fluidas com GSAP & ScrollTrigger**:
  - Transições e revelação escalonada de elementos na rolagem.
  - Navbar em ilha flutuante com recolhimento e animação responsiva.
  - Suporte nativo a **`prefers-reduced-motion`** para usuários com sensibilidade a movimento.
- **Acessibilidade Rigorosa (WCAG)**:
  - _Skip link_ funcional para navegação por teclado (`#main-content`).
  - Landmarks semânticos completos (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
  - Alvos de toque otimizados (mínimo 44x44px) e contrastes cromáticos superiores a 4.5:1.

---

## 🛠️ Stack Tecnológica

| Camada                                 | Tecnologias                                                                            |
| :------------------------------------- | :------------------------------------------------------------------------------------- |
| **Core**                               | HTML5 Semântico, TypeScript (ES2022+)                                                  |
| **Build & Dev Tool**                   | [Vite](https://vite.dev/) 8.3+ com `@tailwindcss/vite`                                 |
| **Estilização**                        | [Tailwind CSS v4](https://tailwindcss.com/), [daisyUI v5](https://daisyui.com/)        |
| **Tipografia**                         | [Outfit Variable](https://fontsource.org/fonts/outfit) (`@fontsource-variable/outfit`) |
| **Animações**                          | [GSAP 3](https://greensock.com/gsap/) + ScrollTrigger                                  |
| **Qualidade & Padronização**           | ESLint 10 (`typescript-eslint`), Prettier 3                                            |
| **Backend / Persistência (Planejado)** | Supabase (PostgreSQL, Auth, Storage)                                                   |

---

## 📁 Estrutura do Projeto

A organização de diretórios reflete a separação modular de responsabilidades em TypeScript puro:

```text
├── src/
│   ├── animations/         # Módulos de animações orquestradas via GSAP
│   │   ├── bento.ts        # Revelação da seção Bento Grid
│   │   ├── cta.ts          # Animação e glow do CTA final
│   │   ├── hero.ts         # Revelação tipográfica e mockups da seção Hero
│   │   ├── navbar.ts       # Comportamento dinâmico da ilha flutuante de navegação
│   │   └── reducedMotion.ts# Tratamento para preferência de movimento reduzido
│   ├── assets/             # Recursos estáticos locais
│   ├── types/              # Definições de interfaces e tipos TypeScript
│   │   └── theme.ts        # Tipagens do sistema de tema (claro/escuro)
│   ├── utils/              # Helpers e utilitários puros
│   │   └── theme.ts        # Lógica do alternador de tema e persistência
│   ├── main.ts             # Ponto de entrada (registro de plugins GSAP e bootstrap)
│   └── style.css           # Design tokens, fontes e regras globais do Tailwind v4
├── index.html              # Estrutura HTML semântica com metadados e script anti-FOUC
├── DESIGN.md               # Especificação detalhada do Design System
├── PRODUCT.md              # Documento de produto e direcionamento estratégico
├── vite.config.ts          # Configuração do Vite com otimização de bundle e alias @/
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
