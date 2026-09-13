# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Pacientes:** buscam podologia especializada no conforto de casa; realizam autoagendamento direto pelo site com confirmação imediata e acompanham consultas e histórico no painel pessoal.
- **Podóloga Especialista (Angélica Eduarda):** gestão de horários da agenda em tempo real, acompanhamento dos agendamentos domiciliares e registro do prontuário podológico e evolução clínica dos pacientes.
- **Administrador:** controle dos atendimentos realizados, confirmação de recebimentos (PIX, cartão, dinheiro) e visão consolidada dos atendimentos.

## Product Purpose

Plataforma digital especializada de autoagendamento e gestão para o atendimento podológico domiciliar de Angélica Eduarda. Elimina o atrito e o tempo de espera de troca de mensagens manuais ao permitir que o paciente escolha seu horário diretamente na agenda em tempo real, integrando a experiência do paciente ao acompanhamento clínico profissional e contínuo.

## Positioning

Podologia especializada de padrão hospitalar no conforto da sua residência. Combina a sofisticação e conveniência do autoagendamento online à máxima segurança clínica (100% de esterilização em autoclave e materiais individuais descartáveis).

## Operating Context

- **Paciente (Mobile / Desktop):** agendamento descomplicado em menos de 2 minutos, consulta de dúvidas clínicas frequentes, autenticação acessível e visualização de seus horários agendados.
- **Atendimento Domiciliar / Consultório Móvel (Tablet / Mobile):** conferência rápida de dados do paciente, histórico de queixas e registro de procedimentos clínicos durante a visita domiciliar.
- **Gestão da Agenda (Desktop):** administração de grade de horários, bloqueio de datas e controle de faturamento dos atendimentos.

## Capabilities and Constraints

- **Capacidades confirmadas:**
  - Landing page institucional de alta autoridade com Bento Grid de diferenciais, estatísticas de confiança e FAQ detalhado.
  - Sistema de autoagendamento de horários em tempo real com confirmação imediata.
  - Autenticação e cadastro seguro de pacientes com modal acessível (WCAG AA).
  - Painel do Paciente (Dashboard) com visualização da próxima consulta, histórico de atendimentos e status do prontuário.
  - Prontuário podológico especializado com histórico de queixas e evolução clínica.
- **Restrições técnicas:**
  - Frontend SPA desenvolvido em React 19 com TypeScript.
  - Estilização com Tailwind CSS v4 e componentes daisyUI v5.
  - Animações fluidas orquestradas com GSAP, respeitando preferências de acessibilidade (`prefers-reduced-motion`).
  - Tema duplo (claro/escuro) com script síncrono anti-FOUC no `<head>` e sincronização de `theme-color`.
  - Build ultra-rápido com Vite e empacotamento modular.
  - Arquitetura preparada para integração com backend Supabase (Auth, Postgres, Storage).

## Evidence on Hand

- Código-fonte funcional em React 19 + Vite com rotas `/` (Home) e `/dashboard` (Painel).
- Sistema de design documentado em `DESIGN.md` com tokens nominais e escala de tipografia geométrica humanista (Outfit).
- Animações GSAP modulares em `src/animations/` integradas ao ciclo de vida de componentes via `@gsap/react`.

## Product Principles

1. **Agendamento direto e sem espera:** eliminação da fricção de troca de mensagens manuais no WhatsApp através de agenda transparente com confirmação na hora.
2. **Autoridade e biossegurança inegociável:** transmissão clara dos rigorosos protocolos de esterilização em autoclave e materiais 100% descartáveis.
3. **Conforto e acolhimento domiciliar:** estrutura clínica completa levada até a residência, sem necessidade de deslocamento ou salas de espera.
4. **Integridade do cuidado contínuo:** prontuário digital confiável para acompanhamento cronológico da saúde dos pés e mãos.
