# Auditoria Premium: Sistema de Podologia

> Auditoria técnica e visual do repositório e do site, com foco em percepção premium, UX, acessibilidade, performance, SEO, arquitetura e direção artística.

## Legenda

- **[V]** Verificado por código, build, imagem ou cálculo.
- **[I]** Inferência.
- **[R]** Recomendação.

---

## 1. Resumo executivo

**Veredito.** O sistema visual está mais maduro do que o produto por trás dele. A direção (alabastro quente, grafite, sálvia, terracota, Newsreader, bordas de 1px, movimento contido) é coerente e está genuinamente mais perto de "sofisticação silenciosa" do que um template. O que impede a percepção premium não é o CSS. São quatro coisas:

1. **O caminho de agendamento por enquanto é falso, pois no momento o foco é a Landing [V].** Todo CTA "Agendar" abre um login simulado (qualquer e-mail com "@" e senha de 6+ caracteres entra). Isso leva a um painel de demonstração que diz "Em breve". Enquanto isso, o FAQ, o CTA final e o rodapé afirmam que "todos os agendamentos são realizados pelo painel". O painel exibe "Cadastro validado com sucesso" sem validar nada.
2. **Os ativos de confiança são fracos ou contraditórios.**
   - A imagem de compartilhamento (`og-image.jpg`) é de outra marca (azul), com telefone, @ e site fictícios.
   - As fotos parecem geradas por IA, não tenho nenhuma foto real [I].
   - Não há rosto, nome nem depoimento.
   - Há alegações que ninguém consegue conferir no site.
3. **Há resíduo de duas direções visuais anteriores.** Aparecem no favicon padrão do Vite, no Dashboard, no `theme-color`, nas 110 classes `dark:*-slate-*` e na OG image.
4. **O texto promete mais do que o design.** "Cirúrgico", "hospitalar" e "clínico" aparecem cerca de 30 vezes, enquanto o design tenta ser discreto.

Há também um bug de acessibilidade barato de corrigir: 16 elementos com `shadow-*` podem ter o anel de foco cancelado (seção 16).

---

## 2. Stack encontrada

| Tecnologia                                                     | Por quê                           | Uso adequado?                                                                                                | Veredito                       |
| :------------------------------------------------------------- | :-------------------------------- | :----------------------------------------------------------------------------------------------------------- | :----------------------------- |
| React 19, TS 6 (strict), Vite 8                                | SPA                               | Sim. `strict`, `noUnusedLocals`, build limpo                                                                 | Adequado                       |
| Tailwind 4                                                     | Estilos                           | Bom, mas com disciplina de tokens fraca (seção 22)                                                           | Adequado                       |
| **daisyUI 5**                                                  | Modal                             | **Não.** Nunca é importado no CSS e gera 0 regra (`modal-box`, `modal-bottom` ausentes no CSS compilado) [V] | Dependência morta              |
| GSAP + ScrollTrigger + @gsap/react                             | Reveals, accordion, navbar        | Funciona. São 47 KB gz para fades e translações                                                              | Exagero moderado               |
| react-router-dom 7                                             | 2 rotas (`/` e `/dashboard` mock) | Se o dashboard sair, o router perde a razão de existir                                                       | Candidato a remoção            |
| lucide-react                                                   | Ícones                            | Import nomeado, ok                                                                                           | Adequado                       |
| Outfit (fontsource) + Newsreader e Plus Jakarta (Google Fonts) | Tipografia                        | Duas estratégias de carga. Plus Jakarta só aparece como 3º fallback                                          | Inconsistente                  |
| ESLint 10, Prettier, GitHub Actions                            | Qualidade                         | Lint e Prettier limpos. O CI roda lint + format + build, sem testes                                          | Bom                            |
| Backend, banco, auth                                           | Nenhum. Supabase é "planejado"    | Auth é simulada em `localStorage`                                                                            | Ver seção 15                   |
| Deploy                                                         | Vercel (pela URL)                 | Não há `vercel.json` no repo [V]                                                                             | Não verifiquei fallback de SPA |

---

## 3. Arquitetura do projeto

Estrutura por camada: `components/{home,layout,common,auth}`, `animations/`, `context/`, `hooks/`, `pages/`, `utils/`. É legível. O CI e o TypeScript estrito são acima do padrão de projetos pessoais.

Problemas concretos:

- **`ServicesPricing.tsx`** (298 linhas) repete o mesmo card 3 vezes, com umas 85 linhas cada.
- **O bloco `useGSAP` + `gsap.matchMedia` + `applyReducedMotion`** é copiado em 8 componentes.
- **`Navbar.tsx`** (344 linhas) mistura focus trap, clique-fora, tema, auth e scroll. Os 3 links âncora estão duplicados (desktop e mobile), com strings de classe de mais de 300 caracteres.
- **`handleEntrarClick` e `handleAgendarClick`** são idênticas (`Navbar.tsx`).
- **Fonte de verdade duplicada:** serviços e telefone existem no JSON-LD do `index.html` e nos componentes. Preços não estão no JSON-LD.
- **`.impeccable/` e `.stitch/`** estão versionados. O `.stitch/metadata.json` lista os sistemas anteriores ("Apple Clinical" azul #0071e3, "Obsidian"). O `.impeccable/questions/*.state.json` guarda pid e porta de máquina local. Vale pôr no `.gitignore`.
- **Segredos:** não há `.env` versionado nem chave em lugar nenhum [V].

---

## 4. Diagnóstico geral do design

**Direção atual [V]:** editorial clínica. Alabastro `#FAF8F5`, grafite `#181615`, sálvia `#3B5346`, terracota `#9B4124` só para ação, sombras zeradas em favor de bordas de 1px, e legendas em caixa alta numeradas ("01 /").

**Teste do logo:** removendo logo e nome, a landing ainda tem estilo reconhecível (serifa + neutros quentes + bordas finas). Mas é um estilo, não uma marca. O nome é só texto em caixa alta, não há marca gráfica, e Dashboard, modal e OG image pertencem a outros sistemas visuais.

---

## 5. Percepção de marca

- **Preço x linguagem.** Os preços (R$ 35, 45 e 75) são de serviço de bairro, e isso é positivo pela transparência. A linguagem ("cirúrgica", "hospitalar", "regeneração celular") tenta posicionar acima disso. Premium de verdade tem contenção. O exagero de vocabulário técnico tende a soar defensivo, não sofisticado [I].
- **Vazamento de briefing.** "Conforto silencioso" (Hero) e "conforto e silêncio da sua casa" (Footer) vêm do brief "Quiet Luxury" do `DESIGN.md`. É linguagem de designer, não de cliente [V].
- **Marca conflitante [V].** A OG image mostra um logo azul (pé com folha), uma modelo de jaleco e o slogan "Excelência Clínica", nada disso presente no site.

---

## 6. UI detalhada

| Bloco                | Estado                                                                                | Evidência                                                                                                                                                                 |
| :------------------- | :------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Header               | Bom estruturalmente, com dois problemas                                               | Wordmark serifado sem marca. "Entrar" e "Agendar Horário" fazem a mesma coisa. Esconde ao rolar para baixo (`navbar.ts`), então o CTA some enquanto a pessoa lê os preços |
| Hero                 | Tipografia forte, conteúdo genérico                                                   | H1 com 16 palavras, sem "podologia" nem "Mococa". Foto de bolsa sobre mesa, sem pessoa. CTA "Solicitar Agendamento" (o header diz "Agendar")                              |
| Serviços             | Preço bem tratado (serifa 4xl/5xl, `tabular-nums`), card sobrecarregado               | Cada card tem chip + ícone em círculo + duração + preço + descrição + 4 bullets + rodapé "Taxa R$ 0"                                                                      |
| Sobre a profissional | **Não existe**                                                                        | Nenhuma foto de pessoa. Só 3 `<img>` no site inteiro                                                                                                                      |
| Diferenciais         | `TrustStats` é a melhor composição da página. `BentoGrid` é o card genérico de sempre | Grid 6/3/3 com `gap-px` sobre fundo tingido. Bento: 3 cards brancos                                                                                                       |
| Depoimentos          | **Não existe**                                                                        | Nenhum texto de depoimento ou avaliação no código                                                                                                                         |
| Galeria              | Não existe                                                                            | 2 fotos reutilizadas                                                                                                                                                      |
| CTA final            | Título bom, botão principal leva ao login                                             | "O cuidado com a sua saúde começa com um horário reservado."                                                                                                              |
| Footer               | Completo mas repetitivo                                                               | Link `#inicio` sem destino (0 elementos com esse id) [V]. Biossegurança listada uma 3ª vez. Sem Instagram, horários ou privacidade                                        |

### Problemas visuais críticos

| Problema                | Por que importa                                                                                                                                       | Causa provável                                                       | Correção                                                                                 | Resultado                                                 |
| :---------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------- | :--------------------------------------------------------------------------------------- | :-------------------------------------------------------- |
| Sem humano na página    | Serviço de contato físico vende confiança pessoal. Sem rosto, é uma marca anônima                                                                     | Fotos foram feitas para "provar higiene", não para apresentar alguém | Foto real dela (retrato + mãos trabalhando) no Hero ou em bloco "Sobre"                  | A dobra passa a responder "quem vai entrar na minha casa" |
| Monocultura de cards    | 14 cards brancos com borda, chip, ícone em círculo e checklist. É o padrão SaaS mais reconhecível e contradiz o `DESIGN.md` ("sem caixas excessivas") | Reuso do mesmo esqueleto                                             | No máximo um grid de cards (preços). O resto vira blocos editoriais separados por filete | Ritmo variado                                             |
| OG image de outra marca | O link é compartilhado no WhatsApp, o canal principal. O preview mostra telefone, @ e site que não existem                                            | Sobra do sistema "Apple Clinical" azul                               | Refazer 1200×630 na paleta atual, abaixo de 300 KB                                       | Preview coerente                                          |
| Texto leve e pequeno    | Outfit 300 a 12px em cinza médio cansa. 18 usos de 10 a 11px, 58 de `font-light`                                                                      | O `DESIGN.md` manda corpo em 400. O código usa 300                   | Corpo 400, mínimo 14px (12px só para legendas em caixa alta)                             | Mais nítido, sem perder leveza                            |

---

## 7. UX detalhada

| Usuário             | Vê                    | Dúvida               | Confiança                                     | Abandono                           | Esforço até agendar                                                           |
| :------------------ | :-------------------- | :------------------- | :-------------------------------------------- | :--------------------------------- | :---------------------------------------------------------------------------- |
| **A** (não conhece) | H1 e foto da bolsa    | Quem é ela? É real?  | Alegações sem prova (25.000, autoclave 134°C) | Sem rosto nem avaliações           | CTA → modal → cadastro de 4 campos → painel que não agenda → achar o WhatsApp |
| **B** (indicação)   | Confere preços e nome | "Isso é ela mesma?"  | Preços transparentes ajudam                   | O FAB diz "Dúvidas", não "Agendar" | Mesmo caminho                                                                 |
| **C** (decidido)    | Toca "Agendar"        | Por que criar conta? | Quebra a confiança                            | Alto                               | 5+ passos para chegar ao chat que estava a 1 toque                            |

**Funil:** entrada (ok) → confiança (fraca) → interesse (bom, preço e área de atendimento claros) → prova (ausente) → desejo (médio) → **agendamento (quebrado)**.

---

## 8. Primeira dobra

- **Em 3 segundos:** serifa grande, foto acolhedora, botão terracota. A estética comunica cuidado. A profissão só aparece no sub-rótulo do header ("Podologia em Domicílio · Mococa").
- **Pergunta do prompt:** o usuário entende quem é, o que oferece e como agendar? Entende o que é oferecido. **Não** entende quem é (nome só no header, sem rosto). E entende errado como agendar, porque o CTA leva ao login.
- **Mobile 375×667 [I, por cálculo]:** `main` tem `pt-28` e o Hero `pt-8`, então o H1 começa a \~144px, com o header ocupando 72px. O CTA cai perto da borda inferior, e a foto fica abaixo da dobra.

**Hierarquia:** 1º o H1, 2º a foto (a maior área), 3º o CTA. Para uma podóloga, deveria ser: quem ela é, o que faz e onde, como agendar.

---

## 9. Mobile

- **Header a 320px [I]:** hambúrguer 44px + wordmark `whitespace-nowrap` + tema 44px + "Agendar" somam mais que 320px. Provável estouro horizontal. Testar.
- **H1 a 320px [I]:** "conforto silencioso" é `whitespace-nowrap` a 36px. Provavelmente \~300px em uma coluna útil de 272px.
- **FAB do WhatsApp:** só ícone no mobile, com contraste de 1,98:1 (seção 16). Respeita `safe-area-inset`, o que é bom.
- **Sem CTA fixo:** o header some ao rolar. Um CTA fixo no rodapé ajudaria.
- **`preload` da imagem do Hero com `fetchpriority=high`** vale em todos os viewports, mas no mobile a imagem fica abaixo da dobra [I].
- **Toques:** os alvos têm 44px, exceto os links do rodapé (`min-h-[40px]`, contra o "todos ≥44px" do `DESIGN.md`).
- **Premium no celular?** A tipografia sim. O conjunto ainda não, pelas fotos e pelo fluxo.

---

## 10. Tipografia

| Item                                               | Estado                                               | Ação                                                                                                                             |
| :------------------------------------------------- | :--------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| Newsreader 400 (títulos), itálico 300 em uma frase | Ótimo. Serifa com eixo óptico, `text-balance`        | **Manter**                                                                                                                       |
| Outfit 300 no corpo                                | Traço fino em 12 a 14px. Contradiz o `DESIGN.md`     | **Alterar:** 400 e mínimo de 14px                                                                                                |
| Caixa alta tracejada em 10 a 12px                  | Marca do sistema, mas exagerada (33 usos)            | **Reduzir:** só em legendas, nunca em botões e menus ao mesmo tempo                                                              |
| Carga de fontes                                    | Google Fonts (bloqueante, 2 origens) + fontsource    | **Unificar** com `@fontsource-variable/newsreader` e remover Plus Jakarta                                                        |
| Fonte do corpo                                     | Outfit é geométrica, comum em landings de tecnologia | **P3:** só depois de corrigir peso e tamanho, testar uma humanista neutra (ex.: Hanken Grotesk). Isto é preferência, não defeito |

---

## 11. Cores

| Par                                             | Contraste  | Nota                                                      |
| :---------------------------------------------- | :--------: | :-------------------------------------------------------- |
| `#635E59` sobre `#FAF8F5`                       | **6,05:1** | Passa AA. O `DESIGN.md` promete ≥7:1 (AAA), o que é falso |
| Branco sobre terracota `#9B4124`                |   6,61:1   | Ok                                                        |
| Sálvia `#3B5346` sobre `#FAF8F5`                |   7,89:1   | Ok                                                        |
| **Branco sobre `#25D366` (FAB)**                | **1,98:1** | **Reprova AA** (texto e ícone)                            |
| Dark: `#8C857B` sobre `#11100F`                 |   5,21:1   | Ok                                                        |
| Dark: `slate-500` sobre `#11100F` (© do rodapé) | **3,99:1** | Reprova AA                                                |

**Avaliação.** A paleta transmite acolhimento e boutique (sálvia = natureza e saúde, terracota = calor humano). O "clínico frio" fica por conta do texto. Duas correções:

- **Terracota só para ação.** Hoje ela também aparece em chips, ícones e checks (contradiz a regra do próprio `DESIGN.md`). Os checks são sálvia em Serviços e terracota em Tecnologia.
- **Cinza-azulado no escuro.** Há 110 classes `dark:*-slate-*` sobre uma base quente.

**Ajustes de HEX [R]:**

- texto secundário `#57524D` (7,28:1)
- FAB do WhatsApp em sálvia `#3B5346` (8,36:1) ou `#075E54` (7,67:1) com glifo branco
- cartão elevado `#FFFEFB` no lugar de branco puro sobre o alabastro
- rodapé escuro `#8C857B`

---

## 12. Espaçamento e grid

**Consistente [V]:** container `max-w-6xl` e seções com `py-16 lg:py-24`.

**Inconsistente:**

- **Sete raios diferentes:** `full` 44x, `2xl` 17x, `md` 13x, `xl` 11x, `lg` 8x, `xs` 5x, `3xl` 5x.
- **Seções vizinhas com raios diferentes:** `TrustStats` e `BentoGrid` usam `rounded-2xl`, enquanto `ServicesPricing` e `TechnologySection` usam `rounded-xl`.
- **Tokens sem uso:** `--radius-card/pill/badge` estão definidos e nunca usados.
- **Larguras de coluna variam:** FAQ em `max-w-4xl`, CTA em `4xl` e o resto em `6xl`, sem regra clara.

Ganho de baixo esforço: um único raio de card e uma única cor de check.

---

## 13. Imagens e direção visual

| Arquivo                   | Resolução                          |            Peso             | Observação                                                                                              |
| :------------------------ | :--------------------------------- | :-------------------------: | :------------------------------------------------------------------------------------------------------ |
| `hero-clinical-bag`       | 1200×896                           | 79 KB (webp) / 143 KB (jpg) | Bom formato. Cena bonita e homogênea                                                                    |
| `clinical-care-setup.jpg` | 1200×896                           |         **699 KB**          | Sem WebP. É baixada como thumbnail de 72px no Hero (`loading=lazy`, mas em desktop já está na viewport) |
| `og-image.jpg`            | 1376×768 (o meta declara 1200×630) |           538 KB            | Outra marca. Acima do limite de \~300 KB que costuma quebrar preview no WhatsApp [I]                    |
| `favicon.svg`             | —                                  |              —              | **É o logo padrão do Vite** (raio roxo `#863bff`) [V]                                                   |

**Foto gerada por IA [I].** As duas fotos do site parecem geradas por IA. Na bolsa, o patch diz "THE MOOVE FOOT CO.". Na segunda, os rótulos ("FOOT CARE", "UREA CREAM") estão em inglês, com microtexto ilegível. O comentário no código chama a foto de "Prova Visual Autêntica: Setup Real". Se forem geradas, isso é problema de honestidade justamente na seção de biossegurança. Se forem reais, os rótulos inventados denunciam outra coisa.

Economia estimada: `clinical-care-setup` vira **\~52 a 62 KB** em WebP (−91%), e a miniatura de 144px, \~3 KB. A imagem pode ficar em uma só, sem duplicar o download.

**Direção fotográfica [R]:** luz natural, linho neutro, mãos e pés reais, ela em trabalho (rosto opcional, com autorização), sem logos e com o mesmo tratamento de cor. Uma dúzia de fotos reais, em vez de cenas encenadas.

---

## 14. Microinterações

- **O que existe [V]:** reveals de 12 a 30px, 0,6 a 0,85s, sem loops. Hover só em ponteiro fino, com `prefers-reduced-motion` respeitado. É contido, o que é bom.
- **Bug de curva:** `cubic-bezier(0.16, 1, 0.3, 1)` (hero e stats) **não é reconhecida pelo GSAP**. Testei: `gsap.parseEase(...)` retorna `undefined` e o tween cai em `power1.out` (43,8 aos 25%, idêntico). Use `expo.out`.
- **Hover-lift em blocos não clicáveis** (stats, imagem do Hero, bento): sugere clique que não existe. Reserve o hover para o que é clicável.
- **H1 começa invisível** (`autoAlpha: 0` no `hero.ts`). Como o LCP ignora `opacity: 0`, isso empurra o LCP para depois do JS + 0,75s [I].

**Microinterações premium com propósito [R]:**

1. Barra fixa no rodapé mobile "Agendar pelo WhatsApp", que aparece depois do Hero, porque o header some.
2. Ao escolher o serviço, o botão vira "Agendar Pé e Mão Completo", para reduzir passos.
3. Feedback de confirmação ao copiar ou abrir a mensagem.

---

## 15. Agendamento

**O que existe [V]:** um modal `<dialog>` nativo, com abas acessíveis, rótulos, `autoComplete` e `role="alert"`. Tecnicamente bem construído. O problema é o propósito:

- `AuthContext.login` aceita qualquer e-mail com "@" e senha de 6+ caracteres, sem backend. Guarda nome, e-mail e telefone em `localStorage`. Nada chega à Angélica.
- O painel mostra "Próxima Visita: Nenhuma", "Atendimentos Realizados: 0" e **"Status do Cadastro: Ativo / Cadastro validado com sucesso"**, tudo estático, com banner âmbar "Ambiente de demonstração".
- O README admite que é mock ("Frontend Mock"). O texto para o cliente não admite.
- Detalhes: `aria-invalid` marca todos os campos quando há qualquer erro. O telefone, único dado útil para ela, é opcional e sem máscara.

**Antes de executar o plano de backend (Fase 2 do README).** Uma agenda real com Supabase implica gerir disponibilidade, cancelamentos, notificações e LGPD (dados de saúde). Para uma profissional autônoma que hoje fecha por WhatsApp e recebe em PIX ou dinheiro, isso é muita máquina para o ganho. A alternativa mais barata é um **pedido de horário sem conta**: serviço, dia, período, bairro e nome viram uma mensagem pré-preenchida no WhatsApp. A confirmação continua humana. Quando o volume justificar, automatize.

```ts
// utils/whatsapp.ts
export const bookingMessage = (b: {
  name: string
  service: string
  day: string
  period: string
  neighborhood: string
}) =>
  `Olá, Angélica! Sou ${b.name}. Gostaria de agendar ${b.service}, ${b.day} de ${b.period}, no bairro ${b.neighborhood}.`
```

---

## 16. Acessibilidade

**Crítico**

- **Anel de foco cancelado.** `style.css` define `--shadow-*: none`. O CSS compilado gera `.shadow-xs{--tw-shadow:none; box-shadow: …, var(--tw-ring-shadow), var(--tw-shadow)}`. Com `none` dentro da lista, o `box-shadow` inteiro fica inválido em tempo de computação, e o `focus-visible:ring-2` deixa de aparecer nos elementos que também têm `shadow-*` **[V no CSS, I no efeito visual]**. Um script listou 16 casos, incluindo o CTA do Hero, os dois botões do `CtaSection`, "Agendar Horário", o FAB e os botões do modal. Como usam `focus:outline-hidden`, ficam **sem indicador de foco** (WCAG 2.4.7).
- **FAB do WhatsApp a 1,98:1** (1.4.3 e 1.4.11).
- **Correção do foco, 1 linha por token:**

```css
/* src/style.css, @theme */
--shadow-2xs: 0 0 #0000; /* em vez de none; idem xs, sm, md, lg, xl, 2xl */
```

Testei: compila para `--tw-shadow: 0 0 var(--tw-shadow-color,#0000)`, que é válido. Revertido no clone.

**Importante**

- `© dark:text-slate-500` a 3,99:1.
- Texto de 10 a 11px em 18 lugares.
- `<span aria-label>` sem role em `TrustStats` (ignorado por leitores de tela).
- Estrutura `dl > div > div > dt/dd` inválida.
- `aria-invalid` em todos os campos do modal.

**Melhoria**

- Seis `role="region"` no FAQ.
- Rodapé sem `h2` antes dos `h3`.
- Alvos de 40px no rodapé.

**Já correto [V]:** skip link, `main tabIndex={-1}`, focus trap e Esc no menu mobile, roving tabindex nas abas, `<dialog>` nativo, `prefers-reduced-motion`, `lang="pt-BR"`, `rel="noopener noreferrer"`.

---

## 17. Performance

**Medido no build [V]:**

| Recurso                                               |  Bruto  |   Gzip   |
| :---------------------------------------------------- | :-----: | :------: |
| JS crítico (`index` + `vendor-gsap` + `vendor-react`) | 464 KB  | \~146 KB |
| CSS                                                   |  66 KB  | 11,9 KB  |
| Outfit latin                                          |  32 KB  |    —     |
| Dashboard (lazy)                                      | 11,6 KB |  2,8 KB  |

**Não medido:** LCP, INP e CLS. Rode o PageSpeed Insights com a URL publicada.

**Achados**

- **CSR puro:** o HTML entrega `<div id="root">`. Primeira pintura só depois de \~146 KB gz de JS. O H1 ainda começa invisível.
- **Imagem de 699 KB** baixada por causa de uma miniatura de 72px.
- **Google Fonts** entra como CSS bloqueante de outra origem, e a Plus Jakarta Sans não é usada como fonte principal [V], mas provavelmente é baixada durante o `swap` [I].
- **`preload` da imagem do Hero** vale para mobile, onde ela fica abaixo da dobra.
- **Camada `position: fixed` com ruído SVG** cobrindo a tela: quase invisível (opacidade 0,035) e sem ganho claro [I].

**Como melhorar sem perder o visual [R]:**

- WebP e miniatura leve.
- Fontes locais via fontsource.
- Deixar o H1 visível desde o início e animar só o entorno.
- `preload` com `media` para desktop.
- Pré-renderizar `/` (ex.: `vite-react-ssg`) **só se** o PageSpeed acusar problema.
- Trocar GSAP por CSS só se o peso incomodar. É uma troca de tecnologia por medição, não por preferência.

---

## 18. SEO

**Bom [V]:** `lang`, canonical, description (171 caracteres), Open Graph e Twitter completos, JSON-LD `HealthAndBeautyBusiness`, `robots.txt` e `sitemap.xml`.

**Problemas**

- **Title com 82 caracteres**, provavelmente truncado no Google [I].
- **H1 sem cidade nem serviço.** O termo que as pessoas buscam ("podóloga em Mococa", "podologia a domicílio") só está no header e no parágrafo. Sugestão: rótulo acima do H1 ("Podóloga · Atendimento em domicílio · Mococa, SP") e H1 tipo "Cuidado especializado para seus pés e mãos, na sua casa em Mococa."
- **JSON-LD:** `availableService` com `@type: Service` provavelmente não é propriedade válida de `HealthAndBeautyBusiness` (é de `MedicalOrganization`) [I]. Valide no Rich Results Test. Não tem `address`, `geo`, `sameAs` nem preços (`hasOfferCatalog`). O horário 08h a 19h existe só no JSON-LD e não aparece na página, o que diverge do conteúdo visível.
- **`image` do JSON-LD e `og:image`** apontam para a imagem com telefone falso. Dimensões declaradas (1200×630) diferem do arquivo real (1376×768).
- **`/dashboard`** sem `noindex`, fora do `robots.txt`, com `lastmod` do sitemap fixo.
- **Ação de maior alavanca (não é código):** criar o **Perfil da Empresa no Google** como negócio com área de atendimento em Mococa. Para busca local, pesa mais que qualquer meta tag.

---

## 19. Segurança

- **Sem segredos** no repositório e `.env*` ignorado [V]. `npm audit`: 0 vulnerabilidades [V].
- **Auth simulada:** o papel `admin` do `localStorage` é só cosmético hoje, mas vem de `JSON.parse` sem validação. Quando existir um painel real, o papel tem de vir do servidor (a nota sobre RLS no código está correta).
- **Sem cabeçalhos de segurança** (CSP, `X-Content-Type-Options`, `Referrer-Policy`) via `vercel.json`. Hospedar as fontes localmente simplifica a CSP.
- **LGPD:** o formulário coleta nome, e-mail e telefone sem aviso de privacidade. Hoje nada sai do navegador, mas o usuário acredita que sim.

---

## 20. Arquitetura de código

- **Virar componente + dados:** `ServicesPricing`, `BentoGrid` e as células de `TechnologySection` e `TrustStats`. Um `services.ts` (nome, preço, duração, bullets) que alimenta UI **e** JSON-LD.
- **Virar hook:** `useSectionMotion(ref, init, reducedTargets)` (elimina 8 cópias do boilerplate) e `useMobileMenu` (focus trap, Esc, clique-fora, hoje em `Navbar.tsx`).
- **`FaqAccordionItem`** faz `setIsHidden` durante o render e lê `matchMedia` fora de efeito (não reage a mudanças). Funciona, mas é frágil. Uma transição CSS de `grid-template-rows: 0fr → 1fr` faz o mesmo sem máquina de estados.
- **Classes repetidas:** uma string de 300+ caracteres (`bg-white dark:bg-[#161413] border …`) aparece 14 vezes. Vira `@utility card` ou um componente `Card`.
- **Acoplamento:** `AuthModal`, `AuthContext`, `useAuth` e `DashboardPage` só existem para o mock. Removê-los tira \~5 arquivos.

---

## 21. Dependências

| Dependência                       | Impacto real                                                                 | Recomendação                                                 |
| :-------------------------------- | :--------------------------------------------------------------------------- | :----------------------------------------------------------- |
| `daisyui`                         | 0 no bundle, ruído no repo (e comentário "DaisyUI loading" no código)        | Remover                                                      |
| `react-router-dom`                | Parte do chunk `vendor-react` (78 KB gz). O peso do router isolado, não medi | Remover se o dashboard sair (âncoras não precisam de router) |
| `gsap` + ScrollTrigger            | 47 KB gz                                                                     | Manter por ora. Avaliar CSS puro após medir                  |
| `@types/node` 22 vs Node 26 no CI | Nenhum                                                                       | Alinhar quando conveniente                                   |

---

## 22. Design System

Existe um DS **implícito** razoável: tokens semânticos em `@theme`, dark mode por variáveis e o `DESIGN.md`. Lacunas:

- Tokens duplicados em 3 lugares (`@theme`, `:root`, `DESIGN.md`).
- Componentes (card, chip, botão) não têm token, só strings copiadas.
- `dark:text-white` (47x), `dark:*-slate-*` (110x) e \~40 hex fixos anulam os tokens que já trocam sozinhos no escuro.
- O `DESIGN.md` diverge do código em pelo menos quatro pontos: peso 400 no corpo, "sem caixas", AAA no texto secundário e alvos de 44px.

**Mínimo necessário [R]:** `--color-surface-raised`, um único `--radius-card`, um `@utility card`, um `@utility chip` e um botão primário. Nada além disso.

---

## 23. O que faz parecer barato (verificado)

1. Favicon padrão do Vite.
2. OG image de outra marca, com contato fictício.
3. Fotos com cara de IA e rótulos em inglês (I).
4. Monocultura de cards (14) com chip, ícone em círculo e checklist.
5. "Taxa R$ 0 / deslocamento" repetido 20 vezes, "esteriliz\*" 15 e "autoclave" 11.
6. Vocabulário clínico \~30 vezes.
7. Sete raios de canto e checks em duas cores.
8. Cinza-azulado (slate) sobre paleta quente no escuro.
9. Dashboard com classes inexistentes (`bg-apple-gray`, `bg-clinical-teal-subtle`, `text-clinical-blue` geram 0 CSS [V]), `rounded-3xl` e títulos em sans bold.
10. Texto de 10 a 12px em peso 300.
11. Hover-lift em elementos não clicáveis.
12. `theme-color` branco e `#020617`. O `ThemeProvider` chama `updateThemeColorMeta` sempre, então a barra do navegador no celular fica branca sobre a página alabastro [V no código, I no efeito].
13. Login para um serviço que se fecha por WhatsApp.

**Comparação com padrões premium** (conceitual, sem copiar ninguém):

- Sites premium de clínica e bem-estar mostram a profissional e credenciais logo no início, enquanto aqui só aparece o nome no header.
- Costumam provar com fatos (certificados, fotos reais, avaliações) e não com adjetivos, enquanto aqui há 30 adjetivos clínicos e nenhuma prova.
- Preferem composição editorial com assimetria e um só grid de cards, enquanto aqui o esqueleto de cards se repete em todas as seções.
- Têm um único caminho de ação, enquanto aqui há três verbos ("Solicitar", "Agendar", "Entrar") para a mesma coisa.

---

## 24. O que já parece premium

- Palette quente com um só acento e sem gradientes na UI [V].
- Newsreader 400 com tracking apertado e frase em itálico leve.
- `TrustStats` (grid hairline 6/3/3) [V].
- Preços em serifa com `tabular-nums` [V].
- Movimento discreto, sem loops, com reduced-motion [V].
- Dark mode com base quente `#11100F` e anti-FOUC [V].
- FAQ com objeções reais (pagamento, preparo, bairros).
- Higiene de engenharia: build, lint, Prettier e audit limpos, CI ativo.

---

## 25. O que NÃO deve ser alterado (e erros que eu cometeria)

**Preservar:** paleta base, Newsreader, hairlines no lugar de sombras, `TrustStats`, preços transparentes, modal nativo (se voltar), skip link, focus trap, reduced-motion, CI.

**Erros prováveis no caminho para o "premium":**

- Adicionar mais seções de cards (por exemplo, depoimentos em 3 cards).
- Empilhar mais selos e adjetivos para "provar" higiene.
- Colocar dourado, glassmorphism ou serifa em tudo.
- Construir o backend de agenda antes de consertar a porta de entrada.
- Trocar React ou GSAP inteiros (ROI ruim).
- Usar foto de banco ou de IA como se fosse ela (a OG image atual já faz isso).
- Reescrever o design system em vez de fazer os tokens existentes valerem.

---

## 26. O que deve ser alterado

Veja a tabela da seção 28. Em resumo:

- Destino de todos os CTAs.
- Anel de foco.
- OG image, favicon e `theme-color`.
- Fotos e prova humana.
- Copy que afirma o que o site não faz ou não pode provar.
- Contraste do FAB.
- Peso e tamanho de texto.
- Disciplina de tokens.
- Remoção do mock.

**Segunda passada (o que quase escapou):**

- `handleEntrarClick` e `handleAgendarClick` são idênticas.
- O fallback do `Suspense` usa `bg-white dark:bg-slate-950` (flash branco no dashboard).
- Scrollbar em slate.
- Sitemap com data fixa.
- `/dashboard` pode dar 404 no refresh se a Vercel não tiver rewrite de SPA (não verifiquei).
- O comentário de código da foto fala em "Setup Real".
- **Maior ganho com menor esforço:** trocar o destino dos CTAs (1 arquivo por botão) e a linha do `box-shadow`.

---

## 27. Roadmap de redesign

- **Fase 1, correções críticas:** foco (`--shadow-*`), CTAs para WhatsApp com mensagem, remover login e dashboard, textos falsos do FAQ, CTA e rodapé, OG image, contraste do FAB.
- **Fase 2, refinamento visual:** favicon, `theme-color`, raio único, checks numa cor só, corpo em 400, tokens no lugar de `dark:slate`.
- **Fase 3, experiência premium:** foto real dela, bloco "Sobre", uma seção editorial no lugar de um grid de cards, prova (certificados, avaliações do Google).
- **Fase 4, conversão:** pedido de horário sem conta, barra fixa no mobile, um verbo só para o CTA.
- **Fase 5, performance e SEO:** WebP, fontes locais, H1 com cidade, title curto, JSON-LD corrigido, `noindex` no que sobrar, Perfil da Empresa no Google, medir no PageSpeed.
- **Fase 6, polish:** `expo.out`, hover só onde há clique, componentes `Card` e `ServiceCard`, hook `useSectionMotion`.

---

## 28. Tabela de prioridades

**Regra (sem nota subjetiva):**

- **P0:** o site engana ou bloqueia o caminho principal, ou falha WCAG A/AA num fluxo central.
- **P1:** degrada confiança ou performance de forma mensurável, ou contradiz a marca em todo carregamento.
- **P2:** consistência e manutenção.
- **P3:** acabamento.

| Problema                                                                 | Categoria      | Impacto | Esforço | Prio   | Solução                                       |
| :----------------------------------------------------------------------- | :------------- | :------ | :------ | :----- | :-------------------------------------------- |
| CTAs levam a login simulado e painel "em breve"                          | Conversão      | Alto    | Baixo   | **P0** | CTA abre WhatsApp com mensagem pré-preenchida |
| Texto diz que "todos os agendamentos são pelo painel" (FAQ, CTA, rodapé) | UX             | Alto    | Baixo   | **P0** | Reescrever os 3 textos                        |
| Anel de foco cancelado (16 elementos)                                    | Acessibilidade | Alto    | Baixo   | **P0** | `--shadow-*: 0 0 #0000`                       |
| OG image de outra marca, com contato fictício                            | Design         | Alto    | Médio   | **P0** | Refazer 1200×630 abaixo de 300 KB             |
| Alegações sem prova (25.000, 134°C, fototerapia, UV "antifúngico")       | Conversão      | Alto    | Baixo   | P1     | Confirmar com ela, documentar ou suavizar     |
| Fotos com cara de IA, legendadas como "reais"                            | Design         | Alto    | Médio   | P1     | Fotos reais e legenda honesta                 |
| Sem rosto, nome completo, credenciais ou depoimentos                     | Conversão      | Alto    | Médio   | P1     | Bloco "Sobre" + avaliações                    |
| FAB do WhatsApp a 1,98:1                                                 | Acessibilidade | Médio   | Baixo   | P1     | Sálvia `#3B5346`                              |
| Favicon padrão do Vite                                                   | Design         | Médio   | Baixo   | P1     | Marca simples em SVG                          |
| Imagem de 699 KB para miniatura                                          | Performance    | Médio   | Baixo   | P1     | WebP e miniatura de 144px                     |
| H1 sem cidade, title de 82 caracteres                                    | SEO            | Médio   | Baixo   | P1     | Ajustar H1 e title                            |
| Perfil da Empresa no Google                                              | SEO            | Alto    | Baixo   | P1     | Criar (fora do código)                        |
| Fontes Google bloqueantes e Plus Jakarta morta                           | Performance    | Médio   | Baixo   | P2     | fontsource local                              |
| `theme-color` sobrescrito por JS                                         | Design         | Baixo   | Baixo   | P2     | `#FAF8F5` e `#11100F` em `utils/theme.ts`     |
| Resíduos do sistema antigo (Dashboard, Suspense, slate)                  | Código         | Médio   | Médio   | P2     | Remover Dashboard, trocar por tokens          |
| Corpo em 300 e texto de 10 a 12px                                        | Acessibilidade | Médio   | Baixo   | P2     | 400 e mínimo 14px                             |
| Header e H1 a 320px (`nowrap`)                                           | UX             | Médio   | Baixo   | P2     | Testar e liberar quebra                       |
| Link `#inicio` quebrado                                                  | UX             | Baixo   | Baixo   | P2     | Criar o id ou remover o link                  |
| Duplicação (3 cards×3, matchMedia×8, JSON-LD)                            | Arquitetura    | Médio   | Médio   | P2     | `services.ts` + `useSectionMotion`            |
| CSR sem pré-render                                                       | Performance    | Médio   | Médio   | P2     | Medir antes                                   |
| `DESIGN.md` promete AAA e diverge do código                              | Design System  | Médio   | Baixo   | P2     | Alinhar doc e código                          |
| `daisyui` morta                                                          | Código         | Baixo   | Baixo   | P3     | Remover                                       |
| Curva `cubic-bezier` inválida no GSAP                                    | Design         | Baixo   | Baixo   | P3     | `expo.out`                                    |
| Hover-lift em blocos não clicáveis                                       | UX             | Baixo   | Baixo   | P3     | Remover                                       |
| Sem cabeçalhos de segurança                                              | Segurança      | Baixo   | Baixo   | P3     | `vercel.json`                                 |

---

## 29. Plano técnico arquivo por arquivo

**Etapa 1.** `src/style.css`

- Alteração: trocar `--shadow-*: none` por `0 0 #0000`.
- Motivo: anel de foco funcionando.
- Impacto: WCAG 2.4.7 restaurado em 16 elementos.

**Etapa 2.** `utils/whatsapp.ts`, `Hero.tsx`, `CtaSection.tsx`, `Navbar.tsx`

- Alteração: substituir `handleAgendar` por link `getWhatsAppUrl(...)`. Unificar o verbo do CTA em "Agendar pelo WhatsApp". Remover "Entrar" do header.
- Impacto: caminho de 1 toque.

**Etapa 3.** `App.tsx` (+ apagar `AuthModal`, `AuthContext`, `auth-context`, `useAuth`, `types/auth`, `DashboardPage`)

- Alteração: remover a rota, o provedor e o modal (manter em branch para a Fase 2). Tirar `daisyui` e, se possível, `react-router-dom`.
- Impacto: menos código, nenhuma promessa falsa.

**Etapa 4.** `FaqSection.tsx`, `CtaSection.tsx`, `Footer.tsx`

- Alteração: reescrever "agendamentos pelo painel".
- Impacto: copy verdadeira.

**Etapa 5.** `public/og-image.jpg`, `favicon.svg`, `index.html`, `utils/theme.ts`

- Alteração: nova OG (1200×630, <300 KB), favicon próprio, `og:image:width/height` reais, `theme-color` `#FAF8F5`/`#11100F`.
- Impacto: identidade consistente em todo compartilhamento e aba.

**Etapa 6.** `public/clinical-care-setup.*`, `Hero.tsx`, `TechnologySection.tsx`

- Alteração: WebP (\~60 KB) e miniatura de 144px.
- Impacto: −640 KB no carregamento.

**Etapa 7.** `index.html`, `main.tsx`

- Alteração: `@fontsource-variable/newsreader`, remover Google Fonts e Plus Jakarta, title curto, H1 com cidade, JSON-LD alinhado ao `services.ts`.
- Impacto: menos requisições bloqueantes e SEO local mais claro.

**Etapa 8.** `WhatsAppButton.tsx`, `Footer.tsx`

- Alteração: FAB em `bg-sage`, rodapé escuro em `text-secondary`.
- Impacto: contraste AA.

**Etapa 9.** `services.ts` (novo), `ServicesPricing.tsx`, `hooks/useSectionMotion.ts`

- Alteração: dados + `ServiceCard`, hook único de animação.
- Impacto: \~190 linhas a menos e uma fonte de verdade.

**Etapa 10.** `style.css` e componentes

- Alteração: `--color-surface-raised`, `@utility card`, tokens no lugar de `dark:text-white` e `dark:slate`.
- Impacto: dark mode coeso e alterações de tema em um lugar só.

---

## 30. Checklist final de lançamento

- [ ] Nenhum CTA leva a login ou painel.
- [ ] Foco visível em todos os botões (testar com Tab).
- [ ] Preview do link no WhatsApp com imagem correta.
- [ ] Favicon próprio e barra do navegador com a cor da página.
- [ ] Fotos reais ou legendas honestas.
- [ ] Cada número e alegação técnica confirmado por ela.
- [ ] Contraste do FAB ≥ 4,5:1 (ou 3:1 no ícone).
- [ ] Testes em 320, 375 e 414px.
- [ ] PageSpeed Insights medido (LCP, INP, CLS).
- [ ] JSON-LD validado e Perfil da Empresa no Google criado.
- [ ] `/dashboard` removido ou com `noindex`.

---

## 31. Diagnóstico de direção artística

- **Mood:** calma, precisão e conforto de quem foi cuidado sem alarde.
- **Personalidade:** precisa, serena, acolhedora, transparente, discreta.
- **Paleta:**
  - fundo `#FAF8F5`
  - cartão elevado `#FFFEFB`
  - tinta `#181615`
  - texto secundário `#57524D`
  - sálvia `#3B5346` (apoio e FAB)
  - terracota `#9B4124` (somente ação)
  - sálvia suave `#EAF0EC`
  - escuro `#11100F`
- **Tipografia:** Newsreader 400 para títulos, com itálico 300 em uma frase por página. Sans em 400 no corpo (≥14px). Caixa alta só em legendas.
- **Fotografia:** luz natural, linho, mãos e pés reais, ela trabalhando. Sem logos e com tratamento de cor único.
- **Layout:** assimetria 7/5, muito respiro, um único grid de cards (preços). O resto em blocos editoriais separados por filete.
- **Componentes:** botão pílula só para o CTA principal, chips só para legendas e cartões só para preços.
- **Motion:** um reveal suave, 200 a 350ms, `expo.out`, hover só onde há clique.
- **Espaçamento:** escala de 8px, seções de 96 a 128px, container de 1152px.

---

## 32. North Star

> Uma experiência digital que combina o rigor de um consultório com o calor de uma visita em casa para transmitir cuidado sem alarde.

---

## 33. Bonito x Premium

**Apenas bonito:** textura de ruído, reveals de fade, itálico "conforto silencioso", ícones em círculo, hover-lift, alternador de tema.

**Realmente aumenta valor percebido:**

- Rosto e nome dela.
- Fotografia real e coerente.
- Copy curta e verificável.
- Prova (certificados, avaliações).
- Agendamento sem atrito, no canal dela.
- Detalhes consistentes: favicon, preview do link, cor da barra do navegador.
- Preços transparentes.

---

## 34. Notas (diagnóstico descritivo, sem ranking)

| Critério                  |    Nota    | Evidência                                                                   |
| :------------------------ | :--------: | :-------------------------------------------------------------------------- |
| UI                        |    6,5     | Landing coesa. Dashboard, modal e OG de outro sistema                       |
| UX                        |    4,0     | Conteúdo claro, mas o agendamento leva a um mock                            |
| Consistência visual       |    5,0     | 7 raios, checks em 2 cores, slate sobre base quente                         |
| Acessibilidade (estática) |    6,0     | Estrutura e teclado bons. Foco cancelado, FAB a 1,98:1, textos de 10 a 12px |
| Performance               | Não medido | Código enxuto (\~146 KB gz JS), imagens (699 KB) e CSR são os riscos        |
| SEO                       |    6,0     | Metas e JSON-LD presentes. H1 sem cidade, OG errada, sem Perfil no Google   |
| Arquitetura               |    7,0     | `strict`, CI, pastas claras. Duplicação e mock no caminho                   |
| Manutenibilidade          |    6,0     | Classes repetidas e docs divergentes do código                              |

---

## 35. TOP 10 mudanças com maior impacto

|  #  | Problema → Mudança (motivo)                             | Impacto esperado                  | Dificuldade | Arquivos                             |
| :-: | :------------------------------------------------------ | :-------------------------------- | :---------: | :----------------------------------- |
|  1  | CTAs levam a login falso → WhatsApp com mensagem pronta | Reserva possível em 1 toque       |    Baixa    | `Hero`, `CtaSection`, `Navbar`       |
|  2  | Promessa falsa de "painel" → reescrever textos          | Fim da quebra de confiança        |    Baixa    | `FaqSection`, `CtaSection`, `Footer` |
|  3  | Foco invisível → tokens de sombra válidos               | Teclado utilizável                |    Baixa    | `style.css`                          |
|  4  | OG de outra marca → nova imagem na paleta               | Preview confiável no WhatsApp     |    Média    | `og-image.jpg`, `index.html`         |
|  5  | Sem humano → foto real dela + bloco "Sobre"             | Confiança imediata                |    Média    | novo bloco, `Hero`                   |
|  6  | Fotos com cara de IA → fotos reais                      | Autenticidade da seção de higiene |    Média    | `public/`, `TechnologySection`       |
|  7  | Alegações sem prova → validar e documentar              | Menos risco e mais credibilidade  |    Baixa    | vários textos                        |
|  8  | Contraste do FAB → sálvia                               | AA cumprido                       |    Baixa    | `WhatsAppButton`                     |
|  9  | 699 KB de miniatura → WebP + thumb                      | −640 KB                           |    Baixa    | `public/`, `Hero`                    |
| 10  | Perfil da Empresa no Google + H1 com cidade             | Descoberta local                  |    Baixa    | Google, `Hero`, `index.html`         |

---

## 36. Primeiras 5 alterações que eu faria

1. **Corrigir os tokens de sombra** (`style.css`). Sem dependências e cinco minutos, e destrava os testes de teclado.
2. **Apontar todos os CTAs para o WhatsApp com mensagem pré-preenchida.** É pré-requisito para remover o login.
3. **Remover a rota `/dashboard`, o modal de auth e os textos que prometem o painel** (depende do passo 2).
4. **Trocar OG image, favicon e `theme-color`.** Independente, mas exige a decisão de marca e uma imagem final.
5. **Pedir fotos reais e dados verificáveis a ela.** É o passo com maior prazo de espera. Comece no dia 1, em paralelo aos outros.

---

## 37. Visão do resultado

A pessoa chega, vê o nome e o rosto dela, lê uma frase curta com "podóloga" e "Mococa" e toca em "Agendar pelo WhatsApp". O celular abre a conversa com o serviço já escolhido. Os preços aparecem em serifa, sem cartões repetidos. Uma foto real mostra as mãos dela em trabalho. O foco de teclado é visível, o link compartilhado mostra a marca certa, e a barra do navegador combina com a página. O site fala menos, prova mais e leva ao único canal que ela realmente usa.

---

## 38. Avaliação do prompt

| Critério                         | Nota | Por quê                                                                                                                                     |
| :------------------------------- | :--: | :------------------------------------------------------------------------------------------------------------------------------------------ |
| Clareza                          |  8   | Estrutura e regras de evidência muito claras, com exigências que às vezes se contradizem ("seja detalhado" e "não encha de texto")          |
| Especificidade                   |  9   | Pede arquivo, componente, HEX e três personas                                                                                               |
| Cobertura                        |  10  | Cobre quase tudo, talvez demais (50 seções)                                                                                                 |
| Capacidade de gerar análise útil |  8   | Forçou a verificação real, que revelou o problema central. Falta pedir explicitamente checagem de autenticidade das imagens e das alegações |
| Orientar melhorias práticas      |  8   | O plano arquivo por arquivo funciona bem                                                                                                    |

**O que faltou:** contexto de negócio (público, faixa de preço, canal principal, meta de reservas) e a pergunta "o que o site promete que o produto não entrega". O prompt priorizou design, mas o maior problema era funcional.

As duas fotos e a imagem de compartilhamento são fotos reais dela ou do material dela, ou foram geradas por IA? A resposta define o que refazer primeiro.
