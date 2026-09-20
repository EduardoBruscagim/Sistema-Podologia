---
target: src/pages/HomePage.tsx
total_score: 34
max_score: 40
na_heuristics:
p0_count: 0
p1_count: 2
target_identity: "file:C:\\Users\\edugu\\Documents\\GitHub\\Sistema-Podologia\\src\\pages\\HomePage.tsx"
target_fingerprint: 'sha256:49ad2f983b21b1b0ff4e16b173ed1ad9c37ccd1cc7fac851202b610b56df1d14'
target_path: "C:\\Users\\edugu\\Documents\\GitHub\\Sistema-Podologia\\src\\pages\\HomePage.tsx"
timestamp: 2026-09-20T03-34-36Z
slug: src-pages-homepage-tsx
---

Method: dual-agent (A: fb076501-350b-456d-b68c-1527facb1a05 · B: 7fcb02ba-c1d4-41c3-be53-d036b284a161)

#### Design Health Score

| #         | Heuristic                       | Score     | Key Issue                                                                                          |
| --------- | ------------------------------- | --------- | -------------------------------------------------------------------------------------------------- |
| 1         | Visibility of System Status     | 3         | Estado de scroll, tema e navegação claros; falta feedback visual durante transições de âncoras     |
| 2         | Match System / Real World       | 4         | Excelente: vocabulário prático e acolhedor de Mococa (unha encravada, cutilagem, PIX, autoclave)   |
| 3         | User Control and Freedom        | 3         | CTA final em `CtaSection` rola para trás em vez de acionar a ação prometida                        |
| 4         | Consistency and Standards       | 4         | Tokens semânticos, tipografia Newsreader/Outfit e bordas capilares perfeitamente padronizadas      |
| 5         | Error Prevention                | 3         | Risco de confusão com o loop de clique no botão principal do rodapé                                |
| 6         | Recognition Rather Than Recall  | 4         | Tabela de serviços com preços e tempos médios explícitos sem necessidade de memorização            |
| 7         | Flexibility and Efficiency      | 3         | Falta atalho para atendimento de dor/urgência (função existente no código, mas oculta na UI)       |
| 8         | Aesthetic and Minimalist Design | 4         | Estética editorial impecável (_Warm Alabaster_ + _Obsidian_ + _Sage_ + _Terracotta_), sem poluição |
| 9         | Error Recovery                  | 3         | FAQ rico e canal direto de dúvidas no WhatsApp previnem atritos e dúvidas frequentes               |
| 10        | Help and Documentation          | 3         | FAQ contextualizado de 5 itens cobre deslocamento, materiais e agendamento                         |
| **Total** |                                 | **34/40** | **Good (85%)**                                                                                     |

#### Design Specificity Verdict

**LLM assessment**: A interface possui uma atmosfera editorial e de assepsia exemplar ("Editorial Clinique"), afastando o visual genérico de salões de beleza tradicionais. Contudo, para um serviço de saúde e cuidado no lar da cliente em uma cidade do interior (Mococa - SP), a ausência do rosto e da história pessoal de Angélica cria uma barreira de impessoalidade. A identidade precisa equilibrar o rigor clínico com o calor humano do atendimento domiciliar.

**Deterministic scan**: A varredura determinística CLI executou com código de saída 0 e 0 erros automáticos. A auditoria técnica confirmou 100% de conformidade com WCAG AA/AAA (contrastes entre 6:1 e 17.7:1), touch targets mínimos de 44×44px em todos os botões e links móveis, e gerenciamento completo de acessibilidade motora (`prefers-reduced-motion`). Foram observados dois desvios cosméticos do Craft Floor: uso de kickers/eyebrows desnecessários sobre títulos H1/H2 e monotonia rítmica de 3 colunas em blocos sequenciais.

**Visual overlays**: A visualização no navegador validou alinhamento responsivo desde 360px até desktops ultrawide, sem quebras de layout.

#### Overall Impression

Uma das interfaces mais bem estruturadas tecnicamente e tipograficamente no segmento de saúde e estética domiciliar, mas que peca pelo excesso de impessoalidade (falta a profissional Angélica em cena) e por um erro crítico de fluxo de conversão no CTA de fechamento da página.

#### What's Working

1. **Transparência Radical de Custos e Atendimento**: Destaque cristalino para a Taxa R$ 0 em todos os bairros de Mococa, preços nominais (R$ 75, R$ 45, R$ 35) e forma de pagamento descomplicada (PIX ou dinheiro vivo).
2. **Autoridade e Biossegurança Tangível**: Comunicação cirúrgica sobre instrumentos autoclavados em envelopes lacrados abertos na frente da cliente, eliminando o principal receio sanitário do atendimento em domicílio.
3. **Engenharia de Acessibilidade e Tipografia**: Pareamento impecável de Newsreader e Outfit, tema escuro sem FOUC e conformidade estrita com anéis de foco e leitores de tela.

#### Priority Issues

- **[P1] Loop de Navegação no CTA de Rodapé (`CtaSection.tsx`)**:
  - **What**: O botão principal "Solicitar Agendamento" possui link âncora `href="#procedimentos"`.
  - **Why it matters**: Quem leu a página inteira e clica no botão final para agendar é jogado abruptamente de volta para o meio da tela, gerando frustração e quebrando a regra Peak-End.
  - **Fix**: Fazer o botão abrir diretamente o WhatsApp com mensagem contextualizada de agendamento ou abrir modal rápido.
  - **Suggested command**: `/impeccable clarify`

- **[P1] Ausência de Presença Humana de Angélica (Déficit de Confiança em Domicílio)**:
  - **What**: Não há nenhuma foto ou mini-biografia de Angélica Eduarda na página principal.
  - **Why it matters**: Atendimento em domicílio exige que a cliente confie em quem colocará dentro da sua residência. A ausência da profissional transmite a sensação de um aplicativo corporativo impessoal.
  - **Fix**: Adicionar uma seção humanizada ("Conheça a Angélica") com foto acolhedora, formação e histórico de atuação desde 2016 em Mococa.
  - **Suggested command**: `/impeccable shape`

- **[P2] Canal de Urgência/Dor Oculto na UI (`utils/whatsapp.ts`)**:
  - **What**: O utilitário `getWhatsAppUrgencyUrl` ("unha doendo") existe no código, mas nunca é exposto aos clientes.
  - **Why it matters**: Clientes que procuram podologia frequentemente estão em crise aguda de dor de unha encravada e buscam alívio imediato.
  - **Fix**: Inserir um card ou badge de "Atendimento para unhas doloridas ou encravadas" com link direto de emergência.
  - **Suggested command**: `/impeccable clarify`

- **[P3] Monotonia Rítmica de Grids em 3 Colunas (`TrustStats`, `BentoGrid`, `ServicesPricing`)**:
  - **What**: Três seções contíguas usam blocos idênticos de 3 colunas.
  - **Why it matters**: Cria fadiga visual e reduz o impacto diferenciado de cada bloco durante a rolagem.
  - **Fix**: Quebrar o padrão transformando o Bento Grid em uma composição assimétrica com maior variação de peso visual.
  - **Suggested command**: `/impeccable layout`

- **[P3] Eliminação de Eyebrow Badges Desnecessários (Craft Floor)**:
  - **What**: Rótulos acima de H1 e H2 em `Hero.tsx` e `ServicesPricing.tsx`.
  - **Why it matters**: O Craft Floor condena rótulos de categoria redundantes que enfraquecem a força dos títulos editoriais.
  - **Fix**: Remover os badges e integrar a localização de forma fluida no corpo de texto.
  - **Suggested command**: `/impeccable typeset`

#### Persona Red Flags

**Dona Luiza (Familiar/Idosa agendando atendimento em domicílio)**: Procura cuidado de pés para si ou para a mãe idosa. _Red flag:_ Procura o rosto da profissional para saber quem irá à sua casa e não encontra; sente desconfiança por não ver a foto de Angélica e hesita em chamar no WhatsApp.

**Jordan (Primeiro Atendimento com Dor Aguda)**: Está com a unha do dedão inflamada e com dor ao calçar sapatos. _Red flag:_ Não encontra menção imediata a "urgência" ou "dor" no Hero; tem que rolar até o FAQ ou serviços gerais para deduzir se Angélica atende casos doloridos imediatos.

**Casey (Usuária Mobile no Trabalho/Trânsito)**: Acessa pelo smartphone com pouco tempo. _Red flag:_ Ao chegar ao final da página e clicar no CTA "Solicitar Agendamento", a tela dá um pulo de rolagem para cima em `#procedimentos` em vez de abrir o WhatsApp diretamente.

#### Minor Observations

- O botão flutuante de WhatsApp oculta o texto "Dúvidas no WhatsApp" em telas móveis (`hidden sm:inline-block`), exibindo apenas o ícone. Um mini-tooltip ou badge sutil pode aumentar o CTR.
- Em `TechnologySection.tsx#L144`, é utilizado `from-white via-white/80` em vez da variável de token `from-pure-white`.
- A animação `BrandIntro.tsx` já possui excelente tratamento de acessibilidade (ignora com `prefers-reduced-motion` e fecha com `Escape` ou clique).

#### Questions to Consider

- _E se a página abrisse com uma saudação e foto acolhedora de Angélica, transformando o serviço em uma experiência pessoal de confiança e tranquilidade?_
- _E se o cliente com dor pudesse acionar um botão imediato de "Socorro para Unha Encravada" em 1 clique no WhatsApp?_
- _E se o CTA do rodapé já levasse a cliente direto com o serviço previamente selecionado na mensagem?_
