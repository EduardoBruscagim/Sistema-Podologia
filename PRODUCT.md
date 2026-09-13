# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Clientes:** buscam cuidado profissional e higiênico para pés e mãos no conforto do seu lar em Mococa - SP; consultam serviços, tiram dúvidas e solicitam agendamento diretamente com a profissional.
- **Profissional (Angélica Eduarda):** gestão de horários e rotas de atendimento domiciliar em Mococa, realização dos cuidados (corte, desencravar, cutilagem, esmaltação) com esterilização em autoclave e acompanhamento das clientes.
- **Gestão:** controle dos atendimentos realizados e recebimentos exclusivos via PIX ou dinheiro vivo.

## Product Purpose

Plataforma digital moderna e acolhedora para o atendimento domiciliar de cuidado com pés e mãos prestado por Angélica Eduarda na cidade de Mococa - SP. Facilita o acesso a informações transparentes sobre os serviços (pé e mão completo, pedicure, manicure, desencravamento preventivo e esmaltação), esclarece dúvidas sobre biossegurança e esterilização, e agiliza o contato e agendamento via WhatsApp sem intermediários ou custos extras.

## Positioning

Cuidado especializado e higiênico para pés e mãos no conforto da sua residência em toda a cidade de Mococa - SP. Combina o conforto do atendimento em domicílio com padrão rigoroso de higiene (instrumentos esterilizados em autoclave e itens descartáveis), sem cobrança de taxa de deslocamento e com pagamento facilitado em PIX ou dinheiro vivo.

## Operating Context

- **Cliente (Mobile / Desktop):** visualização rápida dos serviços oferecidos, tempo médio de atendimento, esclarecimento sobre esterilização/higiene e contato direto no WhatsApp para combinar horário.
- **Atendimento Domiciliar em Mococa (Mobile):** deslocamento ágil entre bairros de Mococa, conferência de horários e comunicação direta com as clientes.

## Capabilities and Roadmap

- **Fase 1 (Entregue — Landing de Alta Conversão, CRO & Acessibilidade):**
  - Landing page institucional moderna e elegante com Bento Grid de diferenciais, apresentação de serviços e FAQ.
  - Tabela transparente com os 3 principais serviços prestados: _Pé e Mão Completo_, _Cuidado dos Pés_ e _Cuidado das Mãos_.
  - Informação clara sobre a cobertura em toda a cidade de Mococa - SP e confirmação de taxa de deslocamento zero (R$ 0).
  - Canal direto via botão flutuante e atalhos customizados de WhatsApp para combinação de datas e horários.
  - SEO local focado em Mococa - SP com Open Graph em alta resolução, robots.txt, sitemap.xml e Schema.org (`HealthAndBeautyBusiness`) via JSON-LD.
  - Simulação de perfil do cliente em frontend (mock com `localStorage`), com navegação acessível e tema claro/escuro anti-FOUC.
  - Conformidade estrita de acessibilidade WCAG AA (skip-link, contraste, roving tabIndex e prefers-reduced-motion).

- **Fase 2 (Em Desenvolvimento — Motor de Agendamento & Integração):**
  - Fluxo de solicitação de horário com seleção de serviço, preferências de data e endereço residencial em Mococa.
  - Painel administrativo da profissional com visão de clientes, rotas do dia e histórico de atendimentos.

## Evidence on Hand

- Código-fonte funcional em React 19 + Vite com rotas `/` (Home) e `/dashboard` (Painel do Cliente).
- Sistema de design documentado em `DESIGN.md` com tokens semânticos e escala de tipografia geométrica humanista (Outfit).
- Animações GSAP modulares em `src/animations/` integradas ao ciclo de vida de componentes via `@gsap/react`.

## Product Principles

1. **Transparência e clareza total:** serviços explicados com simplicidade (corte, desencravar suave, lixar, cutilar e pintar), com destaque para atendimento em toda Mococa sem taxa de transporte.
2. **Higiene e biossegurança rigorosa:** instrumentos 100% esterilizados em autoclave e descartáveis individuais abertos na presença da cliente.
3. **Conforto domiciliar genuíno:** atendimento acolhedor no lar da cliente, sem filas de espera de salão e no horário combinado.
4. **Agilidade de contato:** comunicação direta e transparente via WhatsApp, com opções de pagamento claras (PIX ou dinheiro vivo).
