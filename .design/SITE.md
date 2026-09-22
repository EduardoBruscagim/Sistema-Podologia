# Project Vision: Angélica Eduarda | Podologia & Cuidado Clínico em Domicílio

> **AGENT INSTRUCTION:** Read this file before every iteration. It is the project's long-term memory.

## 1. Core Identity

| Field               | Value                                                                                                                                                                                  |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Project Name**    | Sistema de Podologia e Cuidado Clínico em Domicílio (Angélica Eduarda)                                                                                                                 |
| **Mission**         | Atendimento clínico especializado e acolhedor de podologia e manicure no conforto do lar em toda Mococa - SP com rigor hospitalar, taxa zero de deslocamento e transparência absoluta. |
| **Target Audience** | Moradores de qualquer bairro de Mococa - SP, idosos, acamados e pessoas com sensibilidade ou restrições de mobilidade que necessitam de cuidado paciente e especializado em casa.      |
| **Voice & Tone**    | Clínico rigoroso, acolhedor, transparente, calmo e discreto (Quiet Luxury).                                                                                                            |
| **Region**          | Mococa, São Paulo, Brasil                                                                                                                                                              |

## 2. Visual Language

Reference these when writing baton prompts.

- **Primary Vibe**: Quiet Luxury, Editorial Clínico de Prestígio, Paleta Mineral Quente (Obsidian Espresso, Warm Alabaster, Botanical Sage, Rich Warm Terracotta).
- **Secondary Vibe**: Biossegurança hospitalar (autoclave a 134°C, instrumentos cirúrgicos selados em envelopes com indicador de esterilização, insumos 100% descartáveis) combinada com conforto do lar.
- **Anti-Vibes**: Não estética hospitalar fria/estéril, não clichês de luxo ostentatório/dourados barrocos, não poluição visual de salão convencional.

## 3. Technical Setup

- **Source Code**: `src/` (React 19, TypeScript, Tailwind CSS v4, GSAP 3)
- **Output Directory**: `dist/` (SSG prerender via `scripts/prerender.mjs`)
- **Dark Mode**: Sim, suporte completo claro/escuro via `theme-context` com persistência em `localStorage` e preferência de sistema
- **Fonts**: Newsreader Variable (serifa editorial) e Outfit Variable (sem-serifa funcional) via Fontsource WOFF2 auto-hospedadas
- **Acessibilidade**: 100/100 Axe-Core, WCAG 2.1 & 2.2 AA/AAA, WAI-ARIA Accordion, focus traps e landmarks semânticos

## 4. Live Sitemap

Update this when a page is successfully generated.

- [x] `index.html` (HomePage) — Landing page completa: Hero com LCP eagerly loaded, TrustStats com odômetro tabular, BentoGrid de funcionamento, AboutSection com credenciais e monograma, ServicesPricing com spotlight radial e catálogo de 3 procedimentos, TechnologySection de higiene hospitalar e aparelhos portáteis (Fototerapia LED e Cabine UV), FaqSection com acordeão WAI-ARIA, CtaSection e Footer editorial. **Auditada e 100% alinhada ao design system em DESIGN.md**.
- [ ] `agendamento.html` — Formulário de agendamento estruturado com escolha de procedimento, seleção de data, período do dia (manhã/tarde) e confirmação de bairro em Mococa com Taxa R$ 0 antes do envio ao WhatsApp.
- [ ] `cuidados-preventivos.html` — Guia de orientação clínica e cuidados preventivos domiciliares para a saúde dos pés e unhas (especial para idosos e diabéticos).

## 5. Roadmap (Backlog)

Pick the next task from here. Remove items as they're completed.

### High Priority

- [ ] Construir a página de agendamento estruturado (`agendamento.html`) permitindo selecionar procedimento, data preferencial, período do atendimento e endereço/bairro em Mococa com Taxa R$ 0, integrando com mensagem estruturada no WhatsApp.

### Medium Priority

- [ ] Construir a página de orientações clínicas e cuidados preventivos (`cuidados-preventivos.html`) com conteúdo educativo sobre corte correto de unhas, prevenção de calosidades e cuidados especiais com pés de pessoas idosas ou com sensibilidade.

### Low Priority

- [ ] Painel interno da profissional para gestão diária de rotas e confirmação de agendamentos.

## 6. Creative Freedom

When the roadmap is empty, follow these guidelines to add pages:

1. **Stay on-brand** — new pages must strictly adhere to the Quiet Luxury aesthetic and mineral palette defined in `DESIGN.md`.
2. **Enhance the core** — support the mission of clinic-grade home podiatry care in Mococa.
3. **Naming convention** — lowercase, descriptive filenames (e.g. `agendamento.html`).

### Ideas to Explore

- [ ] `duvidas-frequentes.html` — Central expandida de dúvidas detalhadas sobre biossegurança, unhas encravadas e procedimentos.
- [ ] `depoimentos.html` — Relatos e histórias de clientes e familiares de idosos atendidos em domicílio em Mococa.

## 7. Rules of Engagement

1. Do NOT recreate pages already marked `[x]` in Section 4
2. ALWAYS update `.design/next-prompt.md` before completing an iteration
3. Remove consumed ideas from Section 6
4. Copy header/nav/footer from existing pages — never regenerate
5. All internal links must point to real pages or active section anchors
