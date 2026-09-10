---
name: Angélica Eduarda Podologia
description: Minimalismo clínico premium e autoagendamento B2C
colors:
  primary: '#0071e3'
  primary-hover: '#0077ed'
  neutral-bg: '#ffffff'
  neutral-surface: '#f8fafc'
  neutral-text: '#0f172a'
  neutral-muted: '#64748b'
  dark-bg: '#020617'
  dark-surface: '#0f172a'
  dark-text: '#f8fafc'
  dark-muted: '#94a3b8'
  border-light: 'rgba(226, 232, 240, 0.6)'
  border-dark: 'rgba(51, 65, 85, 0.6)'
typography:
  display:
    fontFamily: "'Outfit', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: '7.5rem'
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: '-0.05em'
  display-md:
    fontFamily: "'Outfit', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: '6.5rem'
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: '-0.05em'
  headline:
    fontFamily: "'Outfit', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: '5rem'
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: '-0.04em'
  title:
    fontFamily: "'Outfit', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: '1.5rem'
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: '-0.02em'
  body:
    fontFamily: "'Outfit', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: '1rem'
    fontWeight: 500
    lineHeight: 1.6
    letterSpacing: 'normal'
  label:
    fontFamily: "'Outfit', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: '0.875rem'
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: '0.15em'
rounded:
  sm: '8px'
  md: '16px'
  lg: '28px'
  full: '9999px'
spacing:
  xs: '8px'
  sm: '16px'
  md: '24px'
  lg: '32px'
  xl: '48px'
  2xl: '80px'
components:
  button-primary:
    backgroundColor: '{colors.primary}'
    textColor: '#ffffff'
    rounded: '{rounded.full}'
    padding: '16px 32px'
  button-primary-hover:
    backgroundColor: '{colors.primary-hover}'
  button-compact:
    backgroundColor: '{colors.primary}'
    textColor: '#ffffff'
    rounded: '{rounded.full}'
    padding: '10px 20px'
    height: '44px'
---

# Design System: Angélica Eduarda Podologia

## Overview

**Creative North Star: "O Santuário Clínico Minimalista"**

A experiência visual traduz a precisão cirúrgica e o acolhimento do atendimento podológico domiciliar premium. Em vez de recorrer ao repertório saturado de clichês de saúde (tons esverdeados genéricos, ilustrações anatômicas simplistas ou layouts de "clínica de bairro"), o sistema adota a sofisticação da linguagem editorial e tecnológica da Apple.

A atmosfera combina superfícies puras em branco e ardósia profunda com o **Azul Safira (#0071e3)** atuando como assinatura visual única. A navegação acontece através de uma ilha flutuante translúcida, enquanto o conteúdo organiza-se em Bento Grids assimétricos de alta legibilidade, com tipografia monumental orientada à esquerda e transições micro-orquestradas na rolagem.

**Key Characteristics:**

- **Rigor Tipográfico**: Display massivo com kerning ultra-fechado (-0.05em) e alinhamento editorial à esquerda.
- **Transparência e Camadas**: Vidro fosco (glassmorphism 24px) com desfoque de fundo e bordas translúcidas de 1px.
- **Aceleração Sensorial**: Interações ágeis (active:scale-95) e foco absoluto na eliminação do atrito do agendamento.
- **Bipolaridade de Tema Intencional**: Modos claro e escuro desenhados individualmente com contrastes rigorosos acima de 4.5:1.

## Colors

Paleta concisa ancorada no contraste entre neutros cirúrgicos e o impacto confiante do Azul Safira.

### Primary

- **Azul Safira** (`#0071e3`): Cor primária de ação e autoridade médica. Utilizada em botões de conversão principais, ícones de destaque e estados de foco.
- **Azul Safira Hover** (`#0077ed`): Estado ativado por passagem de ponteiro ou interação tátil.

### Neutral

- **Branco Puro** (`#ffffff`): Fundo principal do modo claro e cor de contraste para botões e cards de destaque.
- **Ardósia Hospitalar** (`#0f172a`): Cor de leitura de títulos e textos de alto impacto no modo claro; superfície de cards no modo escuro.
- **Ardósia Noturna Profunda** (`#020617`): Fundo dominante do modo escuro.
- **Cinza Clínico Suave** (`#f8fafc`): Fundo de seções secundárias e Bento Grid no modo claro.
- **Ardósia Média / Neutro Secundário** (`#64748b` no claro, `#94a3b8` no escuro): Textos secundários, legendas e descrições.
- **Bordas Translúcidas** (`rgba(226, 232, 240, 0.6)` claro / `rgba(51, 65, 85, 0.6)` escuro): Delimitação sutil de ilhas flutuantes e cards sem criar ruído visual.

### Named Rules

**The Sapphire Accent Rule.** O Azul Safira é reservado para intenção direta de conversão ou elementos de confiança clínica. Sua força estética reside na sobriedade com que é aplicado no restante da tela.
**The No-Raw-Gray Rule.** Em superfícies escuras ou coloridas, o texto secundário nunca é cinza neutro desbotado; é sempre tonalizado com a matiz do fundo para preservar harmonia cromática.

## Typography

**Display Font:** `'Outfit', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
**Body Font:** `'Outfit', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
**Label / Mono Font:** `'Outfit', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`

**Character:** Tipografia geométrica humanista (Outfit) carregada via Google Fonts com conexões `preconnect` otimizadas. Combina clareza digital contemporânea com formas curvas acolhedoras e suaves, traduzindo bem-estar, biossegurança e cuidado clínico de alta precisão.

### Hierarchy

- **Display** (Bold 700, `clamp(2.5rem, 8vw, 7.5rem)`, line-height: 0.95, tracking: -0.05em): Título principal do Hero ("Cuidado absoluto").
- **Headline** (Bold 700, `clamp(2rem, 5vw, 3.75rem)`, line-height: 1.05, tracking: -0.04em): Títulos de seções como Bento Grid e CTA final.
- **Title** (Bold 700, `1.5rem` / 24px, line-height: 1.2, tracking: -0.02em): Títulos de cards de diferencial e subseções.
- **Body** (Medium 500, `1rem` a `1.5rem` / 16px-24px, line-height: 1.6): Descrições clínicas e parágrafos explicativos com `text-balance`.
- **Label** (SemiBold 600, `0.875rem` / 14px, tracking: 0.15em a 0.2em, uppercase): Selos de confirmação imediata e pré-cabeçalhos de seção.

### Named Rules

**The Tight Headline Rule.** Quanto maior a escala do título, mais fechado o tracking e menor a entrelinha. Headings de exibição não toleram entrelinha padrão de leitura.

## Layout

O spatial model baseia-se em um contêiner central fluido (`max-w-6xl` e `max-w-4xl`) com grids modulares de 12 colunas e Bento Grids assimétricos de 3 colunas.

- **Navbar**: Ilha flutuante desacoplada do topo (`top-[max(1.5rem,env(safe-area-inset-top))]`), centralizada com bordas arredondadas totais (`rounded-full`).
- **Ritmo Vertical**: Separações generosas entre blocos (`py-16 sm:py-24 md:py-32`), permitindo que cada mensagem respire.
- **Safe-Area Inset**: Todas as margens extremas respeitam os limites de hardware de dispositivos móveis.

## Elevation & Depth

O sistema rejeita sombras projetadas pesadas ou blocos neobrutalistas rígidos. A profundidade é obtida pela sobreposição de materiais translúcidos (vidro fosco) e halos de dispersão suave.

### Shadow Vocabulary

- **Island Ambient** (`box-shadow: 0 20px 25px -5px rgba(15, 23, 42, 0.05)`): Ilha de navegação flutuante no modo claro.
- **Night Glow** (`box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2)`): Ilha flutuante no modo escuro.
- **Accent Elevation** (`box-shadow: 0 10px 15px -3px rgba(0, 113, 227, 0.3)`): Botão primário de agendamento no CTA.

### Named Rules

**The Material-Over-Shadow Rule.** A profundidade deve ser transmitida primariamente por desfoque de fundo (`backdrop-blur-2xl`) e bordas translúcidas de 1px; sombras atuam apenas como dispersão ambiental secundária.

## Shapes

- **Bordas Pílula (`rounded-full` / 9999px)**: Utilizadas em todos os botões interativos, badges e no contêiner da barra de navegação.
- **Bento Containers (`rounded-[1.75rem] sm:rounded-[2rem]` / 28px-32px)**: Cards de serviços com cantos acentuadamente orgânicos e generosos.
- **Ícones e Chips (`rounded-2xl` / 16px)**: Envoltórios de ícones funcionais.

## Components

### Buttons

- **Shape:** Pílula completa (`rounded-full`).
- **Primary:** Fundo `#0071e3`, texto `#ffffff`, padding `16px 32px` (Hero) ou `10px 20px` (Navbar), altura mínima de 44px para toque.
- **Hover / Active:** Transição suave com escala tátil (`active:scale-95`) e hover `#0077ed`.
- **Focus:** Anel acessível `focus-visible:ring-2 focus-visible:ring-apple-blue` com deslocamento de fundo.

### Navigation Island

- **Shape:** Pílula flutuante (`rounded-full`).
- **Material:** Vidro fosco translúcido (`backdrop-blur-2xl bg-white/80 dark:bg-slate-900/80`).
- **Interação:** Alternador de tema embutido (44x44px) e botão de ação direta.

### Cards / Bento Containers

- **Corner Style:** Curvatura generosa de 28px a 32px.
- **Background:** Branco sólido ou ardósia 900 com borda translúcida sutil de 1px.
- **Card Destaque:** Versão invertida em `#0071e3` com texto branco sólido para quebra de ritmo e ênfase visual.

## Do's and Don'ts

### Do:

- **Do** manter todos os botões de ação em formato pílula (`rounded-full`) com altura de toque de no mínimo 44px.
- **Do** utilizar contraste mínimo de 4.5:1 para textos em qualquer estado de cor ou tema.
- **Do** utilizar alinhamento à esquerda e tipografia em escala clamp para manter a autoridade editorial.
- **Do** preservar o script síncrono no `<head>` para evitar FOUC no modo escuro.

### Don't:

- **Don't** introduzir cantos retos (sharp) ou bordas espessas (> 1px) em cards e contêineres.
- **Don't** aplicar gradientes multicoloridos ou efeitos de neon; a saturação é exclusiva do Azul Safira.
- **Don't** usar sombras duras sem difusão (`box-shadow: 4px 4px 0`).
- **Don't** quebrar a navegação por teclado ou ocultar o link de salto (`skip link`).
