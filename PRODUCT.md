# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Recepcionistas:** agendamento de consultas, confirmações, recepção de pacientes e operação de caixa/recebimentos.
- **Podólogos(as):** realização de consultas, preenchimento de anamnese podológica, registro de queixas, procedimentos executados e evolução clínica do paciente.
- **Gestores / Administradores:** visão operacional da clínica, relatórios de atendimentos e controle financeiro básico.

## Product Purpose

Sistema de gestão completo para clínicas de podologia multi-profissionais. Centraliza a jornada do paciente desde o agendamento até a alta do tratamento, unindo eficiência na recepção, profundidade técnica no prontuário especializado de podologia e controle da gestão da clínica.

## Positioning

Software clínico especializado em podologia com fluxo integrado de ponta a ponta (recepção, consultório e gestão), eliminando controles em papel e planilhas avulsas com interface limpa, rápida e adaptada à rotina clínica.

## Operating Context

- **Recepção (Desktop):** atendimento ágil, busca rápida de pacientes, marcação e remarcação de horários, cobrança.
- **Consultório (Desktop / Tablet):** preenchimento do prontuário durante o atendimento clínico com navegação rápida entre histórico, anamnese e procedimentos.
- **Administração:** acompanhamento diário/mensal de faturamento, fluxo de caixa e volume de consultas.

## Capabilities and Constraints

- **Capacidades confirmadas:**
  - Cadastro e busca completa de pacientes com histórico clínico.
  - Agenda integrada multi-profissional com status de consulta (agendado, confirmado, em atendimento, finalizado, cancelado).
  - Prontuário podológico especializado com anamnese, histórico de queixas, evolução e registro de procedimentos.
  - Controle financeiro básico (recebimentos, formas de pagamento, fluxo de caixa diário).
- **Restrições técnicas:**
  - Frontend SPA construído em TypeScript puro (sem React/Vue/Svelte).
  - Estilização com Tailwind CSS v4 e componentes daisyUI v5.
  - Build com Vite.
  - Arquitetura preparada para backend Supabase (Auth, Banco Postgres, Storage).
  - Segurança: uso exclusivo de `VITE_SUPABASE_ANON_KEY` no client; sem vazamento de chaves privilegiadas.

## Evidence on Hand

- Repositório inicial configurado com TypeScript, Vite, Tailwind CSS v4 e daisyUI v5 (`package.json`, `README.md`).
- Arquitetura de diretórios planejada (`src/components`, `src/features`, `src/layouts`, `src/pages`, `src/services`, `src/types`, `src/utils`).

## Product Principles

1. **Eficiência no consultório:** preenchimento rápido e intuitivo para não atrapalhar o tempo de atendimento com o paciente.
2. **Clareza de papéis:** jornadas especializadas e sem atrito para recepção, podólogo e administrador.
3. **Integridade do prontuário:** histórico clínico confiável, cronológico e detalhado para acompanhamento contínuo dos tratamentos.
4. **Arquitetura modular:** código limpo em TypeScript puro com separação clara entre regras de domínio, componentes de UI e serviços.
