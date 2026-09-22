# Product

<!-- impeccable:product-schema 1 -->

## Platform

web (mobile-first responsivo com SSG e alta performance)

## Users

- **Clientes:** Moradores de qualquer bairro de Mococa - SP que buscam cuidado podológico clínico e estética de unhas no aconchego de sua residência; consultam procedimentos, esclarecem dúvidas sobre biossegurança e solicitam horários diretamente via WhatsApp.
- **Público Prioritário / Especial:** Idosos, acamados e pessoas com mobilidade reduzida ou sensibilidade nos pés que necessitam de atendimento paciente, cuidadoso e sem deslocamento.
- **Profissional (Angélica Eduarda):** Especialista atuante em Mococa desde 2016; realiza podologia preventiva e corretiva (corte correto, desbaste de calosidades, desencravamento preventivo cuidadoso), manicure e cutilagem com autoclave hospitalar a 134°C, materiais 100% descartáveis e aparelhos portáteis (fototerapia LED e cabine UV).
- **Gestão do Atendimento:** Comunicação direta sem intermediários pelo WhatsApp, rota otimizada nos bairros de Mococa e recebimento direto ao término do procedimento via PIX ou dinheiro vivo.

## Product Purpose

Plataforma digital de alta performance, estética editorial (_Quiet Luxury_) e conformidade estrita de acessibilidade para o atendimento domiciliar de podologia clínica e cuidado com pés e mãos prestado por Angélica Eduarda na cidade de Mococa - SP.

A solução estabelece autoridade clínica e confiança imediata ao esclarecer os padrões hospitalares de esterilização (autoclave a 134°C, envelopes cirúrgicos lacrados abertos na presença da cliente e descartáveis de uso único), apresentar os equipamentos portáteis modernos (fototerapia LED de luz vermelha e cabine LED UV para secagem rápida), listar o catálogo transparente dos 3 procedimentos essenciais sem custos ocultos, e disponibilizar canais diretos e ágeis de agendamento, dúvidas e urgência podológica via WhatsApp com deslocamento gratuito (Taxa R$ 0).

## Positioning

Cuidado clínico especializado e acolhedor para pés e mãos no conforto do lar em toda a cidade de Mococa - SP.

Combina a comodidade do atendimento residencial com o rigor sanitário de nível hospitalar, suporte a tecnologias clínicas portáteis modernas, garantia de pontualidade em horário exclusivo, taxa zero de visita e formas de pagamento simplificadas e transparentes (PIX ou dinheiro vivo ao término do serviço).

## Operating Context

- **Cliente (Smartphones e Tablets):** Visualização imediata dos serviços, durações e valores; verificação dos critérios de higiene e esterilização; acesso com um toque aos canais contextuais de WhatsApp (agendamento de procedimento específico, esclarecimento de dúvidas ou atendimento de urgência para dores de unha encravada).
- **Cliente (Desktop / Laptops):** Leitura editorial aprofundada, exploração das credenciais da profissional e navegação acessível por teclado com alto contraste e modo escuro.
- **Atendimento Domiciliar em Mococa:** Atendimento residencial prático em que a cliente fornece apenas uma cadeira/poltrona e uma tomada comum, sem cobrança de taxa de deslocamento em nenhum bairro do município.

## Capabilities and Roadmap

- **Fase 1 (Entregue — Landing Page de Alta Conversão, CRO, Performance Extrema & Acessibilidade Universal):**
  - **Identidade Editorial & Quiet Luxury:** Design sóbrio com paleta mineral (Obsidian Espresso, Warm Alabaster, Botanical Sage e Rich Warm Terracotta), dupla tipográfica de prestígio (Newsreader Variable e Outfit Variable) e textura tátil microgranulada adaptativa.
  - **Modo Escuro / Claro Completo:** Alternância fluida via `ThemeContext`, sincronização com `localStorage` e preferência do sistema operacional (`prefers-color-scheme`), ajuste dinâmico de `meta[name="theme-color"]` e anúncio de status para leitores de tela em região `aria-live="polite"`.
  - **Hero de Altíssimo Desempenho (LCP Otimizado):** Imagem principal pré-carregada (`loading="eager"`, `fetchPriority="high"`, `decoding="sync"`), ausência de bloqueios visuais e parallax óptico sutil em 2 planos no desktop.
  - **Odômetro Numérico Rítmico (TrustStats):** Contador progressivo via GSAP de `0` até `+25.000` atendimentos em `<dl>` semântico com tipografia tabular (`tabular-nums`) e fallback acessível imediato (`sr-only` e `prefers-reduced-motion`).
  - **Bento Grid Operacional:** 3 células assimétricas ("Espaço simples, conforto absoluto", "Sem taxa de visita" e "Horário exclusivo") detalhando a praticidade da visita domiciliar.
  - **Apresentação Humana & Credenciais (AboutSection):** Histórico de atuação desde 2016 em Mococa, monograma gráfico vetorial, compromissos práticos e botão de contato pessoal com a profissional.
  - **Catálogo Transparente com Efeito Spotlight (ServicesPricing):** Apresentação dos 3 procedimentos canônicos (_Pé e Mão Completo_ a R$ 75, *Cuidado dos Pés* a R$ 45 e _Cuidado das Mãos_ a R$ 35), iluminação radial seguidora de cursor via `requestAnimationFrame`, feixe luminoso _border-sheen_ no serviço recomendado, e banner prioritário de urgência para unhas encravadas.
  - **Seção de Higiene e Equipamentos (TechnologySection):** Destaque em sangria total da autoclave cirúrgica a 134°C e materiais descartáveis, complementado por cards da Fototerapia LED de luz vermelha e da Cabine UV portátil de secagem rápida.
  - **Acordeão de FAQ Acessível (WAI-ARIA Accordion):** Animação fluida de altura via CSS Grid sem layout thrashing, indicador vertical hairline e suporte integral a navegação por teclado (`ArrowDown`, `ArrowUp`, `Home`, `End`).
  - **Call-to-Action Duplo & Footer Completo:** Botão primário para agendamento, botão secundário para dúvidas, rodapé informativo em 4 colunas com touch targets mínimos de 44x44px e copyright dinâmico.
  - **Botão Flutuante de WhatsApp:** Acesso rápido permanente em `<aside>` com compensação para áreas seguras de notch/gestos (`env(safe-area-inset-*)`) e alvo de toque generoso de 48x48px (WCAG AAA).
  - **Engenharia SSG & Anti-FOUC:** Pré-renderização estática de HTML no build (`scripts/prerender.mjs`) com inlining automático de CSS crítico no `<head>`, preloading automático de fontes WOFF2 (`vite.config.ts`), script anti-FOUC síncrono e segurança `:focus-within` para usuários de teclado.
  - **SEO Local e Dados Estruturados:** Schema.org (`HealthAndBeautyBusiness`), Open Graph de alta definição, Twitter Cards, meta tags canônicas, sitemap.xml e robots.txt otimizados para Mococa - SP.
  - **Auditoria Automatizada de Acessibilidade:** Pipeline com Axe-Core + JSDOM (`scripts/audit-a11y.mjs`) atestando pontuação 100/100 sem nenhuma violação WCAG 2.1 / 2.2 AA e AAA.

- **Fase 2 (Em Planejamento — Automação de Agendamento & Gestão):**
  - Seletor inteligente de data, período e bairro em Mococa para pré-agendamento estruturado antes do encaminhamento ao WhatsApp.
  - Painel administrativo privativo para a profissional gerenciar a agenda diária, visualização de rotas e histórico de atendimentos por cliente.

## Evidence on Hand

- Código-fonte limpo e modular em React 19, TypeScript, Vite 8, Tailwind CSS v4 e GSAP 3.
- Design System consolidado e documentado em `DESIGN.md` com tokens semânticos, paleta mineral, especificações de componentes e diretrizes de acessibilidade.
- Animações refinadas orquestradas com `@gsap/react` em `src/animations/` e gancho reutilizável `useSectionAnimation`.
- Testes e validações passando com sucesso em `npm run check` (TypeScript, ESLint, Prettier, build SSG e auditoria Axe-Core com 100% de conformidade).

## Product Principles

1. **Transparência e clareza total:** Procedimentos descritos com exatidão de tempo e escopo, preços fixos pré-definidos e confirmação inequívoca de taxa zero de deslocamento em toda a cidade de Mococa.
2. **Biossegurança e assepsia cirúrgica rigorosa:** Instrumentos esterilizados em autoclave hospitalar a 134°C, embalados em envelopes lacrados abertos na presença da cliente e insumos 100% descartáveis de uso único.
3. **Cuidado humanizado e acolhedor:** Tratamento afetuoso, dedicado e sem pressa, com atenção e paciência especiais voltadas para idosos, pessoas acamadas e com sensibilidade física.
4. **Tecnologia prática a favor do conforto:** Equipamentos portáteis clínicos que agregam valor perceptível imediato (fototerapia LED para alívio/cicatrização e cabine UV para secagem rápida de esmalte).
5. **Acessibilidade universal e performance extrema:** Navegação inclusiva para todas as pessoas (teclado, leitores de tela, alto contraste e movimento reduzido), com carregamento instantâneo e ausência total de oscilações visuais.
