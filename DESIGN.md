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
  on-surface-variant: '#514d48'
  on-surface-variant-dark: '#b5afa6'
  text-secondary: '#514d48'
  text-secondary-dark: '#a39c92'
  sage: '#3b5346'
  sage-hover: '#2c4035'
  sage-dark: '#7ea08e'
  sage-subtle: '#eaf0ec'
  sage-subtle-dark: '#19261f'
  on-sage: '#ffffff'
  on-sage-dark: '#11100f'
  accent: '#9b4124'
  accent-hover: '#82351c'
  accent-dark: '#e08264'
  accent-dark-hover: '#e8957c'
  on-accent: '#ffffff'
  on-accent-dark: '#11100f'
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
- **Regra de Pareamento Botânico (`text-on-sage`)**: Qualquer elemento sobre `bg-sage` deve utilizar obrigatoriamente `text-on-sage` (`#FFFFFF` no modo claro, `#11100F` no modo escuro).

### Functional Accent: Rich Warm Terracotta

- **Rich Warm Terracotta** (`#9B4124` / Dark `#E08264`): Cor de ação estritamente funcional reservada com exclusividade para gatilhos interativos primários (CTAs de agendamento, anéis de foco, itens ativos de acordeão e estados hover de procedimento). Possui taxa de contraste de 6.25:1 contra o fundo Warm Alabaster e 6.6:1 com texto branco no modo claro, e 6.47:1 contra `#11100F` com texto escuro no modo escuro.
- **Regra Sistêmica de Pareamento (`text-on-accent`)**: Qualquer elemento sobre superfície `bg-accent` DEVE utilizar obrigatoriamente `text-on-accent` (`#FFFFFF` no modo claro, `#11100F` no modo escuro). É terminantemente proibido o uso de `text-white` fixo sobre `accent`, prevenindo quebras de contraste em temas escuros.
- **Radius Pill (`rounded-full`) vs Card Radius (`rounded-xl`)**: O formato pílula (`rounded-full`) é restrito exclusivamente aos botões de conversão principais. Cartões utilizam curvatura discreta (`rounded-xl` / 12px) e badges informativos adotam curvatura mínima (`rounded-md` / 4px a 6px).

### Neutrals & Borders

- **Text Primary** (`#181615` / Dark `#FAF8F5`): Legibilidade máxima para leitura editorial.
- **Text Secondary / Muted Slate** (`#514d48` / Dark `#A39C92`): Contraste mínimo de 7.5:1 em relação ao fundo, atendendo com folga ao nível AAA da WCAG.
- **Hairline Border** (`rgba(24, 22, 21, 0.08)` / Dark `rgba(250, 248, 245, 0.08)`): Delimitação sutil e refinada inspirada em papelaria editorial de luxo.
- **Superfície Editorial (`bg-pure-white`)**: Cartões destacados e blocos de conteúdo utilizam `--color-pure-white: #ffffff` em modo claro e `--color-surface-variant: #1a1816` em modo escuro, mantendo integridade e desacoplamento do Tailwind base.

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

## Motion & Micro-interactions (60 FPS Editorial Experience)

O sistema de movimento rejeita animações decorativas desprovidas de função ou transições artificiais aceleradas. Todo o movimento tem propósito narrativo de clareza, autoridade médica e resposta tátil:

### 1. Odômetro Numérico Rítmico (`TrustStats`)

- **Duração e Easing:** 2.4 segundos com curva `power2.out`.
- **Propósito:** Interpolação numérica progressiva e cadenciada de `0` até `+25.000`, permitindo ao visitante absorver o volume e a credibilidade dos atendimentos em tempo real.
- **Acessibilidade:** Elemento com `aria-label="Mais de 25.000 atendimentos"`. Sob `prefers-reduced-motion: reduce`, o valor final é renderizado imediatamente sem contagem.

### 2. Profundidade Parallax em 2 Camadas (`Hero`)

- **Deslocamento:** Maleta com `y: 35px` (descida lenta) e badge flutuante de higiene com `y: -30px` (elevação lenta), ativados a partir de `start: 'top 120px'`.
- **Efeito:** Separação óptica de 65px que emula a profundidade de campo de uma sessão fotográfica de estúdio.
- **Responsividade:** Aplicado exclusivamente em telas `>= 640px` (quando o badge atua como elemento suspenso `absolute`). Em telas menores, o badge permanece em fluxo estático seguro.

### 3. Desdobramento Tipográfico no FAQ

- **Duração e Easing:** 500ms com curva de desaceleração natural `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Estética:** O texto da resposta desliza de `-12px` para `0px` com ganho contínuo de opacidade, sem caixas internas ou molduras pesadas, priorizando a leitura arejada de editorial de revista.
- **Indicadores:** O chevron gira 180° com amortecimento e a barra vertical de terracota na lateral esquerda se desenha de cima para baixo (`origin-top scale-y-100`).

### 4. Resposta Tátil Uniforme nos Botões de Ação

- **Padrão de Interação:** Efeito de transição de cor refinada (`hover:bg-accent-hover`) e microcompressão tátil ao clique (`active:scale-[0.98]`), padronizado em todos os botões de conversão (Hero, Navbar, Procedimentos, CTA final e WhatsApp).
- **Previsibilidade e Foco:** Deslocamentos laterais ou efeitos magnéticos artificiais foram eliminados após testes com usuários, garantindo estabilidade espacial, clareza funcional e ausência de ruído perceptual.

### 5. Spotlight Dinâmico & Border Sheen (`ServicesPricing`)

- **Border Sheen:** Feixe de luz sutil (`2px` de altura) percorrendo ciclicamente o topo da borda de terracota do procedimento carro-chefe (_Pé e Mão Completo_).
- **Spotlight Radial de Superfície:** Aura de iluminação âmbar/terracota (`rgba(155, 65, 36, 0.14)` claro / `rgba(224, 130, 100, 0.22)` escuro) com raio de 280px que segue as coordenadas do cursor sobre a superfície dos cards de procedimentos.

### 6. Arquitetura Anti-FOUC

- O `<head>` marca o documento imediatamente com `<html class="js">`.
- A regra CSS `.js:not(.gsap-loaded)` oculta previamente apenas os alvos de revelação GSAP, mantendo o Hero e o Navbar 100% visíveis para o Largest Contentful Paint (LCP) imediato.
- Após a montagem dos componentes React e registro dos tweens GSAP, a classe `gsap-loaded` é injetada via `requestAnimationFrame`, transferindo o controle ao motor de animação sem saltos de layout ou piscadas.
