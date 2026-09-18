---
name: Editorial Clinique & Quiet Luxury
description: Sistema de Podologia e Cuidado Clínico em Domicílio (Angélica Eduarda) em Mococa - SP
colors:
  primary: '#181615'
  primary-hover: '#2d2927'
  primary-dark: '#faf8f5'
  surface: '#faf8f5'
  surface-variant: '#f2eee8'
  surface-dark: '#11100f'
  surface-variant-dark: '#1a1816'
  pure-white: '#ffffff'
  on-surface: '#181615'
  on-surface-dark: '#faf8f5'
  on-surface-variant: '#595550'
  on-surface-variant-dark: '#b5afa6'
  text-secondary: '#635e59'
  text-secondary-dark: '#8c857b'
  sage: '#3b5346'
  sage-hover: '#2c4035'
  sage-dark: '#7ea08e'
  sage-subtle: '#eaf0ec'
  sage-subtle-dark: '#19261f'
  surface-border: 'rgba(24, 22, 21, 0.08)'
  surface-border-dark: 'rgba(250, 248, 245, 0.08)'
  surface-border-subtle: 'rgba(24, 22, 21, 0.04)'
  whatsapp: '#25d366'
  whatsapp-hover: '#1eb857'
typography:
  display:
    fontFamily: Newsreader
    fontSize: 4rem
    fontWeight: '400'
    lineHeight: '1.08'
    letterSpacing: -0.025em
  display-mobile:
    fontFamily: Newsreader
    fontSize: 2.75rem
    fontWeight: '400'
    lineHeight: '1.12'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Newsreader
    fontSize: 2.75rem
    fontWeight: '400'
    lineHeight: '1.15'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Newsreader
    fontSize: 2rem
    fontWeight: '400'
    lineHeight: '1.2'
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Newsreader
    fontSize: 1.75rem
    fontWeight: '500'
    lineHeight: '1.25'
    letterSpacing: -0.01em
  title-md:
    fontFamily: Outfit Variable
    fontSize: 1.125rem
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: 0.04em
    textTransform: uppercase
  body-lg:
    fontFamily: Outfit Variable
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: '1.65'
    letterSpacing: '0'
  body-md:
    fontFamily: Outfit Variable
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-sm:
    fontFamily: Outfit Variable
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  label-md:
    fontFamily: Outfit Variable
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.14em
    textTransform: uppercase
  label-sm:
    fontFamily: Outfit Variable
    fontSize: 0.6875rem
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.16em
    textTransform: uppercase
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2.5rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
components:
  button-primary:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.surface}'
    rounded: '{rounded.full}'
    padding: '12px 28px'
  button-secondary:
    backgroundColor: 'transparent'
    textColor: '{colors.primary}'
    rounded: '{rounded.full}'
    border: '1px solid {colors.surface-border}'
    padding: '12px 28px'
  card-editorial:
    backgroundColor: '{colors.pure-white}'
    textColor: '{colors.on-surface}'
    border: '1px solid {colors.surface-border}'
    padding: '24px'
---

# Design System: Angélica Eduarda | Podologia & Cuidado Clínico em Domicílio

## Overview

**Creative North Star: "Quiet Luxury through Restraint & Authentic Personal Brand"**

Este sistema de design estabelece a identidade visual e a linguagem de produto de **Angélica Eduarda**, especialista em podologia clínica e cuidado integral dos pés e mãos em domicílio em **Mococa - SP**.

Ele expressa a excelência médica através de uma direção de arte editorial e sóbria: rejeita intencionalmente clichês de "luxo ostentatório" ou "luxo artificial" (selos de cera, plintos de pedra fictícios, dourados saturados e metáforas rebuscadas) em favor de sofisticação autêntica ancorada em rigor clínico, composições assimétricas e tipografia editorial impecável.

A experiência digital reflete a proposta de valor essencial:

- Atendimento no conforto do lar do paciente em Mococa, SP.
- Rigor hospitalar absoluto: autoclave a 134°C com laudo biológico, instrumentos lacrados em envelopes cirúrgicos e 100% descartáveis de uso único.
- Transparência total: taxa de deslocamento R$ 0 em qualquer bairro de Mococa e valores pré-definidos sem custos ocultos.

**Key Characteristics:**

- **Rigor Mineral & Serenidade:** Fundo Warm Alabaster (`#FAF8F5`) contrastado com grafite Obsidian Espresso (`#181615`), toques botânicos discretos em Botanical Sage (`#3B5346`), e linhas divisórias capilares com espessura de 1px.
- **Tipografia Editorial e Funcional:** Dupla tipográfica harmônica — a elegância atemporal da serifa **Newsreader** para títulos monumentais e a precisão contemporânea da sem-serifa **Outfit Variable** para corpo de texto, rótulos e micro-dados tabulares.
- **Hierarquia sem Caixas Excessivas:** Substituição de cards dentro de cards por blocos editoriais contínuos com numeração cronológica (`01 /`, `02 /`), filetes horizontais delicados e diagramação arejada.
- **Motion Cinematográfico & Respeitoso:** Transições GSAP físicas e calmas com curvas `power3.out`, sem oscilações perpétuas ou efeitos invasivos, garantindo 100% de respeito a `prefers-reduced-motion: reduce`.
- **Acessibilidade Universal:** Contraste estrito WCAG AAA nos textos de suporte (mínimo 7:1) e conformidade integral com alvos de toque mínimos de 44x44px (WCAG 2.5.5 / 2.5.8).

## Colors

A paleta mineral é inspirada em matérias-primas nobres, assepsia cirúrgica e botânica sutil:

### Obsidian Espresso & Warm Alabaster

- **Obsidian Espresso** (`#181615`): Tom neutro escuro primário. Usado para títulos de alto impacto, botões de conversão e elementos âncora. No modo escuro, inverte suavemente para `#FAF8F5`.
- **Warm Alabaster** (`#FAF8F5`): Canvas base quente e acolhedor, eliminando o reflexo agressivo do branco puro esterilizado sem perder a sensação de assepsia. No modo escuro, utiliza Ardósia Profunda (`#11100F`).

### Botanical Sage

- **Botanical Sage** (`#3B5346` / Dark `#7EA08E`): Acento sutil e natural que conecta os cuidados corporais e a podologia à saúde preventiva, transmitindo acolhimento e bem-estar.
- **Sage Subtle** (`#EAF0EC` / Dark `#19261F`): Fundo suave para detalhes de biossegurança e chips informativos.

### Neutrals & Borders

- **Text Primary** (`#181615` / Dark `#FAF8F5`): Legibilidade máxima para leitura editorial.
- **Text Secondary / Muted Slate** (`#635E59` / Dark `#8C857B`): Contraste mínimo de 7:1 em relação ao fundo, atendendo ao nível AAA da WCAG.
- **Hairline Border** (`rgba(24, 22, 21, 0.08)` / Dark `rgba(250, 248, 245, 0.08)`): Delimitação sutil e refinada inspirada em papelaria editorial de luxo.

## Typography

### Newsreader (Serif)

Utilizada para títulos editoriais, expressões de marca e números monumentais. Confere autoridade médica refinada e calor humano:

- **Display Hero:** 4rem (desktop) / 2.75rem (mobile), peso 400 (Regular/Light), leading 1.08, tracking -0.025em.
- **Headline Large:** 2.75rem (desktop) / 2rem (mobile), peso 400, leading 1.15.
- **Headline Medium:** 1.75rem, peso 500, leading 1.25.

### Outfit Variable (Sans-serif)

Utilizada para interface funcional, menus, tabelas de serviços e leitura confortável:

- **Body Large:** 1.125rem, regular (400), leading 1.65, largura contida em ~48ch para conforto de leitura.
- **Body Regular:** 1rem, regular (400), leading 1.6.
- **Body Small:** 0.875rem, regular (400), leading 1.5.
- **Editorial Labels / Overlines:** 0.6875rem a 0.75rem, semibold (600), caixa alta, tracking expandido (0.12em a 0.16em) para rotulagem técnica imediata.

## Accessibility & Target Sizes

- **Touch Targets (WCAG 2.5.5 / 2.5.8):** Todos os botões interativos (Navbar, temas, agendamento, acordeões do FAQ e links de navegação) possuem área de clique/toque de no mínimo 44x44px.
- **Contrast Ratios (WCAG AA / AAA):** Todos os pares de texto e fundo excedem 4.5:1 para texto padrão e 7:1 para legendas secundárias.
- **Keyboard Navigation:** Todos os componentes interativos contêm anéis de foco visíveis (`focus-visible:ring-2 focus-visible:ring-primary`) e suporte a navegação por teclado (Enter / Espaço / Esc).
- **Reduced Motion:** Adere fielmente à preferência do sistema operacional, neutralizando durações de animação GSAP caso `prefers-reduced-motion: reduce` esteja ativo.
