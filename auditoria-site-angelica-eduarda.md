# Auditoria completa — Angélica Eduarda (Podologia em Domicílio, Mococa/SP)

**Site:** https://agendamento-angelica.vercel.app/
**Repositório:** https://github.com/Eduuhbruscagim/Sistema-Podologia

## Nota metodológica

Inspecionei o HTML renderizado do site publicado (via fetch da página, incluindo metadados, JSON-LD e todo o conteúdo textual visível) e clonei o repositório completo, lendo o código-fonte de todos os componentes principais (`Hero`, `Navbar`, `Footer`, `AboutSection`, `TrustStats`, `ServicesPricing`, `TechnologySection`, `FaqSection`, `WhatsAppButton`), os utilitários (`whatsapp.ts`), os dados de serviços (`services.ts`), o `index.html`, `package.json`, `style.css` (tokens de cor), `robots.txt`, `sitemap.xml` e as imagens reais em `/public` (dimensões e peso).

**Não foi possível verificar diretamente:** Lighthouse/PageSpeed real, Core Web Vitals em campo (CrUX), comportamento em dispositivos físicos, taxa de conversão real, existência de Google Business Profile, volume real de buscas locais, e se as imagens de `og-image`/hero são fotos reais da Angélica ou de terceiros/banco de imagens (visualmente parecem fotos reais de still-life de instrumentos, mas não há uma foto do rosto da profissional em lugar nenhum do código).

Uso as tags pedidas: [OBSERVADO] [CÓDIGO] [INFERÊNCIA] [RECOMENDAÇÃO] [PRECISA TESTAR].

---

## 1. Resumo executivo (leia isso primeiro)

**O que está bom:** base técnica muito acima da média de projetos pessoais/freelas nesse nicho. Acessibilidade real (não decorativa), SEO técnico correto, prerender/SSG, performance pensada com intenção (LCP, code splitting, fontes self-hosted), copy direto e sem "clichê de clínica genérica", e um funil de agendamento via WhatsApp que já é sofisticado (mensagens pré-preenchidas por serviço, contexto correto em cada CTA).

**O que está ruim:** zero prova social externa (nenhum depoimento, nenhuma nota do Google, nenhuma foto real da Angélica), e a página inteira depende de uma única "porta de entrada" (WhatsApp) sem nenhum reforço de credibilidade de terceiros. (A estatística "+25.000 atendimentos" foi checada e é plausível dado o ritmo real de trabalho dela, ver seção 7 — mas fica sem contexto no site, o que pode gerar dúvida à toa em quem tentar validar o número mentalmente.)

**O que está faltando:** nome completo profissional + qualquer credencial verificável (curso, registro, tempo de formação), foto real da profissional, depoimentos/avaliações, um link para Google Maps/Google Business Profile, FAQ com schema.org (`FAQPage`), e conteúdo indexável além da home (o site é uma página única — ok para o estágio atual, mas limita SEO local de cauda longa).

**O que está desnecessário:** nada tecnicamente supérfluo a ponto de prejudicar — é um site enxuto. O único ponto questionável é o peso de animação (GSAP completo) para uma landing de conversão simples, mas está bem implementado e com fallback de `prefers-reduced-motion`, então é polimento, não erro.

**Maiores oportunidades:** (1) prova social real, (2) uma foto de verdade da Angélica, (3) schema `FAQPage` (ganho de SEO praticamente gratuito, o conteúdo já existe), (4) Google Business Profile linkado.

**Top 10 ações:** ver seção 9.

**O que não deveria mexer:** a arquitetura de acessibilidade (focus trap, `inert`, skip link, `aria-live`), o SSG/prerender, a estrutura de preços transparente, o padrão de CTA que direciona para a seção de procedimentos antes do WhatsApp (é proposital e correto), e a paleta de cores (contraste adequado, ver seção 8).

**Maior retorno com menor esforço:** adicionar `FAQPage` JSON-LD (são 20 minutos de trabalho, zero risco, ganho real de SEO) e reescrever a estatística de atendimentos para algo defensável.

**Maior risco:** a ausência total de qualquer verificação de identidade/credencial da profissional e de prova social de terceiros — em um serviço que entra na casa do paciente, isso pesa mais do que em qualquer outro nicho.

---

## 2. Teste dos 5 segundos [INFERÊNCIA]

Simulando a chegada de alguém que nunca ouviu falar da Angélica:

1. O que ela faz? Sim, imediato — "Podologia e manicure no conforto da sua casa."
2. Quem é ela? Só o primeiro nome aparece no hero; sobrenome só aparece no rodapé, em letra pequena, como parte do copyright.
3. Onde ela atende? Sim — Mococa/SP aparece repetidamente.
4. Que problema ela resolve? Parcialmente — fica implícito (pés/mãos), mas só na seção de procedimentos fica claro que ela trata unha encravada, calosidade etc.
5. Como agendar? Sim, claro — CTA visível e WhatsApp explícito.
6. CTA claro? Sim.
7. Parece profissional? Sim, visualmente — tipografia editorial, paleta sóbria, nada de template genérico.
8. Passa confiança? Parcial. O texto fala de confiança, mas não há **nenhuma prova de terceiro** (review, depoimento, nota) apoiando isso — é a profissional falando sobre si mesma, o que é o tipo de sinal mais fraco de confiança que existe.
9. Parece um profissional de saúde de verdade, não um template? Sim, o nível de detalhe (autoclave, envelopes lacrados, fototerapia) é bem específico e convincente.
10. Algo confuso? Não. A única fricção é sutil: não há foto do rosto da Angélica em lugar nenhum, o que é incomum para um serviço que entra na casa de alguém.

---

## 3. Jornada do paciente — pontos de fricção reais

DESCOBERTA → ENTENDIMENTO → CONFIANÇA → **[fricção aqui]** → IDENTIFICAÇÃO DA NECESSIDADE → INTERESSE → REMOÇÃO DE OBJEÇÕES → AGENDAMENTO

O ponto que quebra é exatamente "CONFIANÇA". Até ali o site descreve muito bem o serviço e a experiência, mas quem decide deixar uma pessoa desconhecida entrar em casa normalmente busca um sinal externo antes de continuar: nota no Google, depoimento de vizinho, foto real. Hoje esse sinal simplesmente não existe no site. [RECOMENDAÇÃO] Isso não significa inventar depoimentos — significa que, se a Angélica tiver clientes recorrentes (o texto sugere que sim, já que atua desde 2016), vale pedir 3 a 5 depoimentos curtos e reais, com nome e bairro (com consentimento), e/ou linkar as avaliações do Google Business Profile, se ela tiver um perfil lá.

Segundo ponto de fricção, menor: o CTA do hero e da navbar leva para `#procedimentos` (a tabela de preços), não direto para o WhatsApp. [OBSERVADO em `Hero.tsx` e `Navbar.tsx`] Isso **não é um bug** — é uma decisão de CRO deliberada e defensável: força o visitante a ver o preço e o serviço específico antes de abrir o WhatsApp, o que gera mensagens de agendamento já contextualizadas (`getWhatsAppUrl` recebe o nome do serviço). O trade-off é que alguém em pressa (ex.: dor aguda) precisa rolar a página até achar o bloco de urgência. Isso é mitigado pelo botão flutuante de WhatsApp sempre visível, então a fricção é pequena.

---

## 4. Auditoria do Hero [CÓDIGO: `Hero.tsx`]

- **O quê:** comunicado no H1 ("Podologia e manicure no conforto da sua casa").
- **Para quem:** não explícito no hero — só fica claro na seção "Sobre" (idosos, pessoas com restrição de mobilidade). [RECOMENDAÇÃO] Isso é uma oportunidade perdida: se o público prioritário real é idosos/mobilidade reduzida, isso deveria estar sinalizado já no hero ou logo abaixo dele, porque é justamente esse público (ou o filho/filha que pesquisa por ele) que mais precisa desse reforço de confiança logo de cara.
- **Benefício:** comodidade + padrão clínico, comunicado bem.
- **Onde:** Mococa, SP — presente.
- **Ação:** "Solicitar Agendamento" — presente, claro.

Tecnicamente o Hero está muito bem construído: imagem com `fetchPriority="high"`, `decoding="sync"` e sem animação de entrada para não prejudicar o LCP [CÓDIGO], texto do H1 com `text-balance` para quebra de linha tipográfica correta, e o card flutuante de higiene tem `alt` descritivo de verdade (não genérico). Isso é acima da média.

**CURRENT (H1):**
"Podologia e manicure no conforto da sua casa."

**PROPOSTA (alternativa, não substituição — o atual já é bom):**
"Podologia e manicure em domicílio, com o cuidado de quem atende idosos e pés sensíveis desde 2016."

**POR QUÊ:** o atual é elegante mas genérico (qualquer prestador domiciliar poderia usar essa frase). A alternativa injeta o diferencial real que hoje só aparece depois, na seção "Sobre", e que é provavelmente o maior ativo de confiança que a Angélica tem: tempo de atuação + especialização em público mais vulnerável. [RECOMENDAÇÃO — só adotar se a Angélica confirmar que esse é de fato o público predominante; não presumir.]

---

## 5. Confiança específica de podologia

O que existe: tempo de atuação (desde 2016), método de esterilização detalhado (autoclave, envelopes lacrados, descarte de material de uso único), e foco declarado em idosos/mobilidade reduzida. Isso é **bom e específico** — evita o erro comum de clínicas que só dizem "somos profissionais e cuidadosos" sem detalhar o quê.

O que falta, e que só deve ser adicionado **se for verdade e verificável pela Angélica**:

- Nome do curso/instituição de formação em podologia.
- Qualquer certificado de biossegurança, se ela tiver.
- Número de WhatsApp Business verificado (selo verde), que é um sinal de confiança que o Meta já dá de graça.
- Foto real dela (rosto), não só um monograma ilustrado. [OBSERVADO em `AboutSection.tsx`: o card de credenciais usa um SVG de monograma tipográfico, não uma foto.] Isso é a lacuna de confiança mais visível do site — em qualquer negócio local de serviço domiciliar, colocar rosto é dos maiores gatilhos de confiança que existem, e aqui ele foi substituído por uma ilustração abstrata.

**Não recomendo:** inventar registro profissional (podólogo não tem conselho regulador federal único no Brasil como um COREN; não presuma que existe um número de registro a ser exibido — confirme com a Angélica se ela tem algum certificado formal antes de adicionar qualquer selo).

---

## 6. Comunicação de saúde responsável [CÓDIGO + OBSERVADO]

Revisei os textos de todos os procedimentos e do FAQ procurando promessas exageradas. **Achado positivo:** o texto é comedido — fala em "corte correto para evitar unhas encravadas" e "desencravamento preventivo", não em "cura" ou "elimina 100%". A fototerapia LED é descrita como "auxilia na cicatrização e no alívio de desconfortos", linguagem apropriadamente hedged, não uma promessa de resultado. Isso é exatamente o padrão correto para comunicação de saúde.

**Único ponto de atenção:** nada no site menciona cuidados especiais com pé diabético, apesar de ser uma das buscas mais comuns no nicho de podologia ("podologia pé diabético"). [RECOMENDAÇÃO] Só adicionar esse termo/serviço se a Angélica de fato atende esse caso com o cuidado técnico apropriado — não adicionar como palavra-chave vazia, porque cuidado com pé diabético malfeito é um risco real de saúde.

---

## 7. A estatística "+25.000 atendimentos"

[OBSERVADO em `TrustStats.tsx`] O número é apresentado com destaque grande, animado (contador de 0 a 25.000), com `aria-label`/texto para leitor de tela também dizendo "Mais de 25.000 atendimentos".

**Correção em relação à primeira versão deste relatório:** eu havia estimado a média necessária presumindo atendimento 7 dias por semana sem folga, e concluído que o número soava implausível. Edu confirmou a rotina real: ~10 atendimentos/dia, 6 dias por semana (segunda a sábado), das 7h às 19h, desde 2016. Nesse ritmo, a conta é 10 × 6 × 52 × 10 anos ≈ 31.200 atendimentos, ou seja, **25.000 é plausível e até conservador** dentro desse volume de trabalho. [CÓDIGO/INFERÊNCIA revisada]

O ponto que permanece é só de comunicação, não de veracidade: o site exibe o número "+25.000" sozinho, sem nenhum contexto sobre o ritmo de trabalho que o sustenta. Um visitante que tentar validar mentalmente esse número (como eu fiz) pode chegar à mesma dúvida inicial que eu tive, por falta de contexto, não por o número ser falso. **[RECOMENDAÇÃO]** considerar acrescentar, em algum ponto próximo à estatística ou na seção "Sobre", uma frase curta que ancore o número (ex.: "atendimento de segunda a sábado, em toda Mococa, desde 2016"), o que já está parcialmente presente no site, mas não conectado explicitamente ao "+25.000". Isso não é urgente, é um ajuste de polimento (P3), não mais P0 como constava na versão anterior desta seção.

---

## 8. Acessibilidade [CÓDIGO]

Este é o ponto mais forte tecnicamente do projeto. Evidências concretas, não apenas comentários no código:

- Skip link funcional para `#main-content`, com `tabIndex={-1}` no `<main>` [CÓDIGO: `HomePage.tsx`].
- Menu mobile com focus trap real (captura de `Tab`/`Shift+Tab`, `Escape` fecha, clique fora fecha, foco retorna ao botão que abriu) e atributo `inert` aplicado a `main`/`footer`/`aside` quando o menu está aberto — isso é implementação correta do padrão WAI-ARIA de dialog, não só decoração visual [CÓDIGO: `Navbar.tsx`].
- FAQ com padrão de acordeão ARIA completo: `aria-expanded`, `aria-controls`, navegação por seta para cima/baixo, `Home`/`End` [CÓDIGO: `FaqSection.tsx`].
- Toggle de tema com `aria-pressed` e região `aria-live="polite"` anunciando a mudança para leitor de tela [CÓDIGO: `Navbar.tsx`].
- Todos os alvos de toque com `min-h-[44px]`/`min-w-[44px]` (WCAG 2.2 AA) e o botão flutuante do WhatsApp com 48px (nível AAA) [CÓDIGO].
- Contraste de cor: calculei manualmente o par mais crítico (texto/link `accent` #9b4124 sobre fundo `surface` #faf8f5) e o contraste é ≈ 6,2:1, acima do mínimo AA de 4,5:1 para texto normal [CÓDIGO: `style.css`, cálculo próprio — **[PRECISA TESTAR]** com uma ferramenta real (axe, Lighthouse) para confirmar todos os pares, inclusive no modo escuro].
- O `package.json` inclui `axe-core` como dependência e um script `test:a11y` que roda em `scripts/audit-a11y.mjs`, ou seja, há checagem automatizada de acessibilidade no próprio pipeline [CÓDIGO].

Isso é um nível de acessibilidade real que a maioria dos sites profissionais no Brasil, incluindo de clínicas grandes, não tem. Não mexer aqui sem necessidade.

**O que não pude verificar:** leitura real com leitor de tela (NVDA/VoiceOver), navegação 100% por teclado testada ao vivo, e o resultado real do `audit-a11y.mjs` no build atual. [PRECISA TESTAR]

---

## 9. Top 10 ações concretas (em ordem de prioridade)

1. **[P0]** Adicionar pelo menos 3 a 5 depoimentos reais (com consentimento) ou linkar as avaliações do Google, se existirem — é a lacuna de confiança mais séria, porque hoje 100% da prova de qualidade vem da própria Angélica falando sobre si mesma.
2. **[P1]** Adicionar uma foto real do rosto da Angélica na seção "Sobre", substituindo (ou complementando) o monograma SVG — em serviço domiciliar, rosto reconhecível reduz ansiedade de deixar um desconhecido entrar em casa.
3. **[P1]** Adicionar JSON-LD do tipo `FAQPage` cobrindo as 6 perguntas já escritas no `FaqSection.tsx` — o conteúdo já existe, é só estruturá-lo; ganho de SEO (rich snippet no Google) praticamente sem custo.
4. **[P1]** Se a Angélica tiver Google Business Profile, linkar diretamente no rodapé/CTA final ("Ver avaliações no Google") — reforça prova social e SEO local ao mesmo tempo.
5. **[P2]** Explicitar no hero ou logo abaixo dele o público prioritário (idosos, mobilidade reduzida), hoje só mencionado na seção "Sobre" — é provavelmente o diferencial mais forte do negócio e está enterrado no meio da página.
6. **[P2]** Avaliar incluir "cuidado com pé diabético" como termo/serviço, apenas se for uma competência real da Angélica — é um dos termos de busca mais comuns no nicho e hoje não aparece em nenhum lugar do site.
7. **[P2]** Considerar transformar o site de página única (SPA) em ao menos 2-3 páginas indexáveis por serviço (ex.: `/unha-encravada-mococa`) no médio prazo, para capturar buscas de cauda longa — hoje o `sitemap.xml` tem uma única URL [CÓDIGO], o que é correto para o estágio atual, mas limita crescimento orgânico.
8. **[P3]** Ancorar a estatística "+25.000 atendimentos" a uma frase de contexto (ritmo/dias de atendimento), para que ela não dependa do visitante confiar de olhos fechados — o número é plausível, só falta o lastro visível.
9. **[P3]** Rodar `npm run test:a11y` e Lighthouse/PageSpeed reais antes de cada deploy relevante e guardar o histórico — o projeto já tem a ferramenta (`axe-core`), só falta o hábito de checar.
10. **[P3]** Confirmar manualmente com leitor de tela (VoiceOver no iPhone, já que é o público mais provável) o fluxo completo de agendamento, já que a base de código sugere excelente acessibilidade, mas isso nunca substitui o teste real.

---

## 10. Matriz de prioridade resumida

| Problema                                                                    | Impacto                 | Dificuldade                                     | Prioridade |
| --------------------------------------------------------------------------- | ----------------------- | ----------------------------------------------- | ---------- |
| Zero prova social de terceiros                                              | Confiança/conversão     | Média (depende da Angélica coletar depoimentos) | P0         |
| Estatística "+25.000" sem contexto visível (número é real, mas desancorado) | Confiança/credibilidade | Baixa (é decisão de copy)                       | P3         |
| Sem foto real do rosto                                                      | Confiança               | Baixa (uma sessão de fotos)                     | P1         |
| Falta `FAQPage` schema                                                      | SEO                     | Baixa (código)                                  | P1         |
| Sem link para Google Business Profile                                       | SEO local/confiança     | Baixa, se o perfil existir                      | P1         |
| Público-alvo (idosos/mobilidade) só aparece tarde                           | Conversão               | Baixa (copy)                                    | P2         |
| Sem menção a pé diabético                                                   | SEO/alcance             | Baixa, se aplicável                             | P2         |
| Site é página única (limita cauda longa)                                    | SEO de crescimento      | Alta (arquitetura)                              | P2         |
| Sem checagem real de Lighthouse/a11y no fluxo de deploy                     | Qualidade técnica       | Baixa (já existe a ferramenta)                  | P3         |

---

## 11. Scorecard (0–10, com base no que foi observado)

- Clareza da proposta: 8
- Primeira impressão: 8
- UX: 8
- UI/design visual: 8
- Copywriting: 7 (bom e comedido, mas a estatística pesa contra)
- Confiança/credibilidade: 5 (maior fraqueza do site — zero prova social externa)
- Apresentação dos serviços: 8
- Agendamento (fluxo via WhatsApp): 8
- Acessibilidade: 9 (o ponto mais forte, verificado no código)
- SEO técnico: 7 (bom JSON-LD, meta tags, sitemap; falta `FAQPage` e mais páginas indexáveis)
- SEO local: 6 (falta GBP linkado, falta cauda longa)
- Performance (só o que dá para inferir do código, não medido ao vivo): 7 — **[PRECISA TESTAR]** para número real
- Privacidade/segurança: 8 (nenhum segredo exposto, nenhum dado sensível de paciente no client-side, número de WhatsApp via env var opcional)
- Qualidade técnica do código: 9 (organização exemplar, TypeScript, lint/format/a11y no pipeline)
- Experiência mobile: 8 (touch targets corretos, menu acessível, safe-area tratada)
- Diferenciação de marca: 7 (foge do clichê de clínica genérica, mas ainda falta um rosto humano)

---

## 12. Roadmap prático

**Fase 1 — Agora (baixo esforço, alto impacto):**
Ajustar a claim de "+25.000 atendimentos", adicionar `FAQPage` JSON-LD, linkar Google Business Profile (se existir).

**Fase 2 — Melhorar (depende da Angélica):**
Coletar depoimentos reais, sessão de fotos com o rosto dela, revisar o hero/about para destacar o público prioritário mais cedo.

**Fase 3 — Polimento:**
Rodar Lighthouse/axe reais e documentar o resultado, revisar contraste no modo escuro com ferramenta automatizada.

**Fase 4 — Testar:**
A/B do CTA do hero (ir direto para procedimentos vs. abrir WhatsApp direto), teste real com leitor de tela, teste de carga da imagem hero em 3G simulado.

---

_Relatório gerado com base em inspeção direta do site publicado e do código-fonte do repositório em 22/09/2026. Nenhum dado de analytics, Lighthouse real ou pesquisa com usuários foi inventado — onde eu não pude verificar algo, isso foi marcado explicitamente._
