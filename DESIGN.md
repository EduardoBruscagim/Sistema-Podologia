---
name: Clinical Precision & Apple Minimalism
description: Sistema de Podologia e Cuidado Clínico em Domicílio (Angélica Eduarda) em Mococa - SP
colors:
  primary: '#0071e3'
  primary-hover: '#005bb5'
  clinical-blue: '#0059b5'
  apple-blue: '#0071e3'
  apple-gray: '#f5f5f7'
  pure-white: '#ffffff'
  surface-border: '#e5e5ea'
  surface-border-subtle: '#d2e4f0'
  clinical-teal-subtle: '#ebf4f9'
  text-secondary: '#59595e'
  surface: '#fcf8fb'
  surface-dim: '#dcd9dc'
  surface-bright: '#fcf8fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f5'
  surface-container: '#f0edef'
  surface-container-high: '#eae7ea'
  surface-container-highest: '#e4e2e4'
  surface-variant: '#e4e2e4'
  on-surface: '#1b1b1d'
  on-surface-variant: '#414753'
  inverse-surface: '#303032'
  inverse-on-surface: '#f3f0f2'
  outline: '#717785'
  outline-variant: '#c1c6d6'
  surface-tint: '#005cbb'
  on-primary: '#ffffff'
  primary-container: '#0071e3'
  on-primary-container: '#fcfbff'
  inverse-primary: '#abc7ff'
  secondary: '#3a5f94'
  on-secondary: '#ffffff'
  secondary-container: '#9fc2fe'
  on-secondary-container: '#294f83'
  tertiary: '#3b5e7c'
  on-tertiary: '#ffffff'
  tertiary-container: '#547796'
  on-tertiary-container: '#fafbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  background: '#fcf8fb'
  on-background: '#1b1b1d'
typography:
  display:
    fontFamily: Outfit
    fontSize: 3.5rem
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.035em
  display-mobile:
    fontFamily: Outfit
    fontSize: 2.25rem
    fontWeight: '700'
    lineHeight: '1.15'
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Outfit
    fontSize: 2.25rem
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.03em
  headline-lg-mobile:
    fontFamily: Outfit
    fontSize: 1.75rem
    fontWeight: '600'
    lineHeight: '1.25'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Outfit
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.02em
  title-md:
    fontFamily: Outfit
    fontSize: 1.125rem
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Outfit
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: -0.01em
  body-md:
    fontFamily: Outfit
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: '1.55'
    letterSpacing: '0'
  body-sm:
    fontFamily: Outfit
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  label-md:
    fontFamily: Outfit
    fontSize: 0.875rem
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Outfit
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
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
    textColor: '{colors.pure-white}'
    rounded: '{rounded.full}'
    padding: '12px 28px'
  button-primary-hover:
    backgroundColor: '{colors.primary-hover}'
  button-secondary:
    backgroundColor: '{colors.pure-white}'
    textColor: '{colors.primary}'
    rounded: '{rounded.full}'
    padding: '12px 28px'
  badge-clinical:
    backgroundColor: '{colors.clinical-teal-subtle}'
    textColor: '{colors.clinical-blue}'
    rounded: '{rounded.full}'
    padding: '6px 14px'
  card-surface:
    backgroundColor: '{colors.pure-white}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.lg}'
    padding: '24px'
---

# Design System: Angélica Eduarda | Podologia & Cuidado Domiciliar

## Overview

**Creative North Star: "O Santuário Clínico Minimalista"**

Este sistema de design reimagina os cuidados especializados em podologia e estética clínica sob a ótica do minimalismo industrial da Apple: prístino, calmo, altamente estruturado e descompromissado com o óbvio. Ele rejeita os padrões visuais antiquados da área médica (verdes hospitalares saturados, elementos pesados e interfaces claustrofóbicas) em favor de uma atmosfera que transmite esterilização rigorosa, tecnologia de ponta e acolhimento humano sereno.

A experiência digital reflete a proposta de valor essencial do atendimento em **Mococa - SP**: o alívio do cuidado profissional no conforto do lar da cliente, com instrumentos 100% esterilizados em autoclave, descartáveis individuais e total ausência de custos ocultos (taxa de deslocamento R$ 0).

**Key Characteristics:**

- **Rigor e Serenidade:** Planos brancos elevados sobre fundo cinza-suave (`#F5F5F7`), inspirando assepsia cirúrgica sem frieza institucional.
- **Tipografia Esculpida:** Família geométrica humanista (Outfit) com kerning deliberadamente fechado nos títulos monumentais e entrelinhamento generoso no corpo de texto.
- **Micro-interações Previsíveis:** Animações GSAP suaves com respeito absoluto à preferência de movimento reduzido (`prefers-reduced-motion`).
- **Acessibilidade Universal:** Contraste estrito WCAG AA em todos os estados, alvos de toque generosos (≥44x44px) e navegação integral por teclado.

## Colors

A paleta cromática combina o ecossistema neutro de alta fidelidade inspirado na Apple com azuis clínicos calibrados, projetados para evocar precisão médica, assepsia de sala limpa e fluidez interativa digital.

### Primary

- **Apple Blue / Azul Safira** (`#0071E3`): Principal vetor de ação, botões de conversão (agendamento no WhatsApp), datas ativas e estados de foco interativo.
- **Azul Safira Escuro (Hover)** (`#005BB5`): Estado ativo e de sobreposição dos botões primários.

### Secondary

- **Deep Clinical Navy** (`#3A5F94` / `#003366`): Confere gravidade estrutural aos títulos heroicos, ícones de confiança e bordas selecionadas.

### Tertiary

- **Deep Slate Blue** (`#3B5E7C`): Elementos de apoio, metadados secundários e acentos de tecnologia clínica.

### Neutral

- **Apple Off-Black** (`#1B1B1D` / `#1D1D1F`): Contraste ideal para leitura do corpo e títulos sem a dureza do preto puro (#000000).
- **Text Secondary** (`#59595E`): Descrições de suporte, especificações de tempo e legendas técnicas (7.08:1 de contraste em branco puro, em conformidade com WCAG AAA).
- **Apple Gray** (`#F5F5F7`): Tela base para páginas e contraste tonal de fundo suave.
- **Pure White** (`#FFFFFF`): Cartões elevados, contêineres Bento e botões secundários.
- **Surface Border** (`#E5E5EA`): Delimitação sutil e refinada de componentes e inputs.
- **Surface Border Subtle** (`#D2E4F0`): Borda delicada azulada para tags clínicas e badges.
- **Clinical Teal Subtle** (`#EBF4F9`): Fundo de destaque para badges de esterilização e tecnologia.
- **Clinical Blue** (`#0059B5`): Tom azul de alto contraste utilizado exclusivamente sobre o fundo `#EBF4F9` para garantir acessibilidade superior a 4.7:1 (WCAG AA).

### Named Rules

**A Regra da Pureza Cirúrgica.** As superfícies são predominantemente neutras e alvas; o azul de conversão (`#0071E3`) é reservado para ações primárias e focos de decisão, nunca excedendo 10% da mancha gráfica de qualquer visualização.
**A Regra do Azul Clínico.** Qualquer badge informativo sobre fundo pastel (`#EBF4F9`) deve obrigatoriamente renderizar tipografia em `#0059B5` para nunca violar a taxa de contraste mínimo exigida pela WCAG AA.

## Typography

O sistema tipográfico utiliza a família **Outfit** (`@fontsource-variable/outfit`), equilibrando precisão geométrica com calor humanista em todas as escalas.

### Typographic Principles

- **Controlled Optical Tracking:** Títulos Display e Headline possuem letter-spacing negativo intencional (`-0.02em` a `-0.035em`), criando autoridade editorial moderna.
- **Clinical Labels & Overlines:** Badges de tecnologia, categorias e marcadores empregam caixa alta e tracking ligeiramente expandido (`0.02em` a `0.05em`) para legibilidade imediata em corpos reduzidos.
- **Conforto de Leitura:** Textos descritivos e respostas do FAQ utilizam entrelinhamento relaxado (`1.55` a `1.6`) para prevenir fadiga ocular.

### Hierarchy

- **Display** (700, 3.5rem / mobile 2.25rem, line-height 1.1): Título monumental do Hero.
- **Headline Large** (600, 2.25rem / mobile 1.75rem, line-height 1.2): Títulos de seções principais (Bento Grid, Tecnologia, Preços, FAQ).
- **Headline Medium** (600, 1.5rem, line-height 1.3): Títulos de cartões de destaque e bento modules.
- **Title Medium** (600, 1.125rem, line-height 1.4): Nomes de procedimentos, títulos de perguntas do FAQ e diferenciais.
- **Body Large** (400, 1.125rem, line-height 1.6): Parágrafo de abertura do Hero.
- **Body Medium** (400, 1rem, line-height 1.55): Textos explicativos dos serviços e respostas do FAQ.
- **Body Small** (400, 0.875rem, line-height 1.5): Detalhes complementares, notas de rodapé e orientações de biossegurança.
- **Label Medium/Small** (600, 0.75rem – 0.875rem, letter-spacing 0.02em - 0.05em): Badges de esterilização, chips de tempo e tags clínicas.

### Iconography

- **Biblioteca:** Lucide Icons (`lucide-react`) como componentes SVG embutidos de alta definição geométrica com traço padrão de 2px.
- **Escala de Uso:**
  - `16px` (`w-4 h-4`): Marcadores de lista, ícones de botão e setas indicativas.
  - `20px` (`w-5 h-5`): Triggers do accordion de FAQ (`ChevronDown`) e alternador de tema (`Sun`, `Moon`).
  - `24px` (`w-6 h-6`): Ícones do Bento Grid, cartões de tecnologia (`Sparkles`, `Zap`, `ShieldCheck`).
  - `32px` (`w-8 h-8`): Selo principal de autoclave e biossegurança.
- **Acessibilidade:** Ícones decorativos recebem `aria-hidden="true"`; botões de ícone interativos contêm atributo `aria-label` explícito.

## Layout

O modelo espacial organiza o conteúdo em blocos modulares concêntricos com proporção áurea, respiração generosa e foco visual direcionado.

### Grid Architecture

- **Desktop (≥1024px):** Grid de 12 colunas circunscrito a `max-w-6xl` (1152px), com espaçamento entre colunas de 1.5rem e preenchimento de segurança externo de no mínimo 2.5rem.
- **Tablet (640px – 1023px):** Estrutura fluida de 6 colunas com calhas de 1.5rem e margens laterais de 2rem.
- **Mobile (<640px):** Fluxo vertical empilhado de coluna única com calhas de 1rem e margens laterais de 1.25rem.

### Rhythm & Structure

- Preenchimento interno dos cartões: `space-lg` (1.5rem / 24px) no desktop e `space-md` (1rem / 16px) em dispositivos móveis.
- Distanciamento vertical entre seções: escala fluida de `2.5rem` (40px) no mobile até `5rem` (80px) no desktop.

## Elevation & Depth

A profundidade é expressa por camadas físicas sutis e difusão fosca (frosted glass), sem o peso de sombras artificiais escuras.

- **Level 0 (Canvas Base):** Fundo plano em Apple Gray (`#F5F5F7`) no tema claro e `#0B0F17` no tema escuro.
- **Level 1 (Card & Módulo em Repouso):** Superfície em Branco Puro (`#FFFFFF`) com borda fina de 1px (`#E5E5EA`) e dispersão sutil de contato: `0 1px 3px 0 rgba(0, 51, 102, 0.05)`.
- **Level 2 (Hover & Cards Elevados):** Elevação magnética sutil com transição via GSAP `quickTo` (`cardHover.ts`) e dispersão multidirecional suave.
- **Level 3 (Ilha Flutuante & Modais):** Navbar fixa e modal de autenticação com desfoque de fundo (`backdrop-blur-xl`, `rgba(255, 255, 255, 0.85)` no claro / `rgba(15, 23, 42, 0.85)` no escuro), sombra de flutuação e borda semitransparente.

## Shapes

O sistema segue a curvatura contínua das quinas arredondadas modernas (estética squircle):

- **Controles e Pequenos Elementos:** `0.25rem` a `0.5rem` (4px - 8px) para pequenas abas e botões compactos.
- **Cartões e Módulos Bento:** `1rem` a `1.5rem` (16px - 24px) para cartões de serviços, tecnologia e modal principal.
- **Contêineres de Métricas:** `1.5rem` (24px) para o bloco de estatísticas de confiança (`TrustStats`).
- **Pills e Cápsulas Totais (`9999px`):** Botões de CTA, botão flutuante de WhatsApp, badges clínicos, chips de filtro e a ilha de navegação (Navbar).

## Components

### Buttons

- **Primary CTA:** Formato cápsula (`rounded-full`), fundo `#0071E3`, texto em branco com peso semibold. Hover com transição para `#005BB5` e feedback tátil em clique (`active:scale-[0.98]`).
- **Secondary Action:** Cápsula em fundo branco puro com borda de 1px em `#E5E5EA` e texto em `#0071E3`.
- **Floating WhatsApp Button:** Botão circular/pílula flutuante no canto inferior direito com verde autêntico WhatsApp (`#25D366`), ícone nítido, sombra de elevação e `aria-label` descritivo.

### Chips & Badges

- **Status de Esterilização & Tecnologia:** Cápsula suave com fundo `#EBF4F9`, borda `#D2E4F0` e tipografia em `#0059B5` (WCAG AA compliant).
- **Tags de Categoria:** Fundo `#F5F5F7` com texto neutro em `#1B1B1D`.

### Cards & Bento Modules

- **Service Cards:** Superfície branca com hierarquia clara: nome do atendimento, valor em destaque transparente, tempo estimado e lista com ícones de verificação.
- **Technology Cards:** Módulos com ícone em destaque colorido, selo de categoria e texto esclarecedor sobre os equipamentos hospitalares portáteis.
- **Trust Stats Blocks:** Grid 4-colunas de métricas clínicas com tipografia monumental e contadores numéricos animados.

### Interactive FAQ Accordion

- **Estrutura:** Lista acessível de perguntas e respostas (`<div role="region">` e `<button aria-expanded="...">`).
- **Animação GSAP:** Interpolação suave de altura de zero para automática (`height: 'auto'`), rotação sutil de 180° no ícone `ChevronDown` e tratamento de cancelamento em cliques rápidos.

### Floating Navigation

- **Navbar:** Ilha flutuante centralizada com efeito de vidro fosco (`backdrop-blur-xl`), logotipo tipográfico, links de seção e alternador acessível de modo claro/escuro.

## Do's and Don'ts

Diretrizes concretas de design e experiência para assegurar consistência visual e integridade da marca.

### Do:

- **Do** manter a paleta dominada por superfícies alvas (`#FFFFFF`) e cinza Apple (`#F5F5F7`), empregando `#0071E3` com parcimônia para guiar a conversão.
- **Do** garantir alvos de toque mínimos de 44x44px em botões, links de navegação e triggers do acordeão.
- **Do** incluir suporte obrigatório a `prefers-reduced-motion: reduce` em todas as animações GSAP e transições CSS, preservando a utilidade funcional instantânea.
- **Do** reforçar a transparência comercial em Mococa - SP (taxa de deslocamento zero R$ 0 e pagamentos em PIX/dinheiro) e os protocolos de esterilização 100% em autoclave.
- **Do** usar ícones da biblioteca Lucide com traço consistente de 2px e declaração de `aria-hidden="true"` quando puramente decorativos.

### Don't:

- **Don't** utilizar clichês gráficos médicos antiquados, como cruzes vermelhas agressivas ou verdes hospitalares pesados.
- **Don't** aplicar sombras escuras ou pesadas com opacidade superior a 15%; a profundidade deve ser comunicada por iluminação suave e bordas refinadas (`#E5E5EA`).
- **Don't** omitir rótulos acessíveis (`aria-label` ou texto visível) em botões de ação ou links de contato externo.
- **Don't** introduzir animações contínuas, oscilações perpétuas ou efeitos parallax invasivos que concorram com a legibilidade das informações de atendimento.
- **Don't** quebrar a semântica hierárquica tipográfica do Outfit (Display no Hero, Headline em seções, Title em cards, Body para leitura).
