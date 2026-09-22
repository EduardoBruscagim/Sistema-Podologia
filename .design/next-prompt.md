---
page: agendamento
layout: standard
---

Construir a página completa de agendamento clínico em domicílio (`agendamento.html`) para a podóloga Angélica Eduarda em Mococa - SP. A página deve oferecer uma experiência guiada, serena, transparente e acessível (Quiet Luxury), permitindo ao cliente ou seu familiar selecionar o procedimento desejado, a data e o período preferencial (manhã ou tarde), preencher o endereço em Mococa (reafirmando Taxa de Deslocamento R$ 0 em qualquer bairro) e gerar uma mensagem estruturada com validação completa para envio direto ao WhatsApp da profissional.

**DESIGN SYSTEM (REQUIRED):**
- **Plataforma:** Web, Desktop-first, totalmente responsivo (mobile, tablet, desktop).
- **Atmosfera & Estilo:** Quiet Luxury através de contenção, estética mineral quente e rigor clínico hospitalar acolhedor.
- **Paleta Mineral de Cores:**
  - `Obsidian Espresso`: `#181615` (Dark: `#FAF8F5`) — Títulos e textos de máxima autoridade.
  - `Warm Alabaster`: `#FAF8F5` (Dark: `#11100F`) — Fundo base mineral acolhedor.
  - `Surface Variant`: `#F2EEE8` (Dark: `#1A1816`) — Painéis de suporte e chips de etapa.
  - `Pure White`: `#FFFFFF` (Dark: `#1A1816`) — Superfície dos cards e caixas do formulário.
  - `Rich Warm Terracotta`: `#9B4124` (Dark: `#E08264`) — Acento funcional para botões de ação e estados ativos.
  - `Botanical Sage`: `#3B5346` (Dark: `#7EA08E`) — Biossegurança, badges de Taxa R$ 0 e WhatsApp.
  - `Sage Subtle`: `#EAF0EC` (Dark: `#19261F`) — Fundo suave de chips e garantias de assepsia.
  - `Hairline Border`: `rgba(24, 22, 21, 0.08)` (Dark: `rgba(250, 248, 245, 0.08)`).
- **Tipografia:**
  - Títulos e Destaques: `Newsreader Variable` (Serifada editorial elegante, tamanhos `2rem` a `3rem` para H1/H2, `1.5rem` para H3, tracking sutil negativo `-0.02em` a `-0.025em`, pesos 400 a 500).
  - Textos, Formulários, Botões e Preços: `Outfit Variable` (Sem-serifa funcional, números tabulares para valores e horários, pesos 300, 400 e 600).
  - Overlines e Badges: Caixa alta, peso 600, tracking expandido (`0.14em` a `0.18em`).
- **Geometria & Elevação:**
  - Botões Primários e Chips de Seleção: `rounded-full` (área mínima de toque 44x44px).
  - Cards e Painéis do Formulário: `rounded-xl` a `rounded-2xl` (12px a 16px) com borda capilar e sombras minerais suaves (`shadow-sm` / `shadow-md`).
- **Acessibilidade & Ergonomia (WCAG AAA):**
  - Rótulos `<label>` explícitos associados via `for`/`id` a todos os campos.
  - Mensagens de erro com `aria-live="polite"` e estados `:focus-visible` com anel contrastante (`ring-2 ring-accent`).
  - Navegação por teclado total e indicação de etapa acessível via `aria-current="step"`.

**Page Structure:**
1. **Header & Navegação Global:**
   - Idêntico ao da página inicial (`Navbar`), com logotipo editorial, link ativo de navegação, alternador de tema e botão de retorno à Home.
2. **Hero da Página de Agendamento:**
   - Overline editorial: `AGENDAMENTO EM DOMICÍLIO · MOCOCA - SP`.
   - H1 editorial em Newsreader: `Escolha o cuidado ideal no conforto do seu lar`.
   - Parágrafo de apoio destacando atendimento em qualquer bairro de Mococa, taxa de deslocamento R$ 0 e pagamento apenas ao término por PIX ou dinheiro.
3. **Fluxo Interativo de Agendamento:**
   - **Passo 1 / Procedimento Clínico:**
     - Cards de seleção em radio buttons acessíveis para os 3 serviços tabelados:
       - *Pé e Mão Completo* — R$ 75 (1h30) — Badge "Mais Procurado"
       - *Cuidado dos Pés* — R$ 45 (1h00) — Podologia clínica e unhas encravadas
       - *Cuidado das Mãos* — R$ 35 (40min) — Manicure com cabine LED UV
     - Opção adicional: Alerta de Urgência Podológica (para dor aguda ou unha inflamada).
   - **Passo 2 / Data & Período Preferencial:**
     - Seletor de data (bloqueando datas passadas) e botões de período:
       - *Manhã:* 08:30 às 12:00
       - *Tarde:* 13:30 às 18:00
     - Nota explicativa: confirmação do horário exato será ajustada com a Angélica para otimização do trajeto.
   - **Passo 3 / Endereço & Necessidades:**
     - Nome completo do cliente ou familiar responsável.
     - Telefone / WhatsApp com máscara.
     - Bairro em Mococa com selo visual verde "Taxa R$ 0".
     - Endereço completo (Rua, Número, Complemento).
     - Campo de necessidades especiais ou mobilidade reduzida (ex: idoso acamado, diabético, dor intensa).
   - **Passo 4 / Resumo Clínico & Envio ao WhatsApp:**
     - Card de revisão com cálculo automático do valor final (sem taxas extras).
     - Botão primário terracota: "Confirmar e Enviar para o WhatsApp da Angélica" que constrói a mensagem pré-formatada e abre a conversa oficial.
4. **Bloco de Confiança & Biossegurança:**
   - Reafirmação da esterilização em autoclave a 134°C, instrumentos cirúrgicos selados abertos na hora, descarte de lixas e lâminas, e ambiente sem pressa.
5. **Dúvidas Rápidas sobre o Agendamento (Micro FAQ):**
   - Como funciona o cancelamento (sem custo com aviso prévio).
   - O que é necessário ter em casa (apenas uma cadeira confortável e tomada comum).
   - Formas de pagamento (PIX e dinheiro ao final da sessão).
6. **Footer Global:**
   - Idêntico ao da página inicial, com sitemap, informações de biossegurança e copyright com localização em Mococa/SP.
7. **WhatsAppButton Flutuante:**
   - Botão flutuante para suporte direto e dúvidas rápidas antes de agendar.
