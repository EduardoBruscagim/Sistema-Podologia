# 🦶 PodoSys: Documentação Mestra do Projeto

> [!ABSTRACT] Propósito : Este documento centraliza toda a lógica e decisões tomadas durante o desenvolvimento do **PodoSys**. **Meta :** Entregar um sistema SaaS Mobile-First para gestão de agendamentos da minha mãe, eliminando papel e garantindo um produto real, funcional e escalável.

---

## 1. Visão Geral e Arquitetura

Decidi simplificar o escopo. O sistema agora será focado exclusivamente em **autenticação e agendamento inteligente**. Foco em uma experiência **Mobile First**, com a estética e fluidez de um aplicativo nativo iOS.

O sistema terá dois tipos de usuários:

- **Admin (minha mãe)**
    
- **Cliente**
    

---

### 1.1 A Stack Tecnológica

Escolhi ferramentas que garantem velocidade de desenvolvimento, performance e integridade dos dados.

- **Frontend :** HTML5, Tailwind CSS e ES24 (JavaScript Puro Moderno).
    
- **Backend/Banco :** `Supabase` (PostgreSQL + Auth).
    
- **UI/UX :** `Lucide Icons` (traço fino 1.5px) + Glassmorphism.
    
- **Hospedagem :** `Vercel`.
    

---

### 1.2 Filosofia de Design (Apple Style)

- **Mobile First :** Nada de tabelas. Uso de **Cards** e **Timeline**.
    
- **Toque vs Clique :** Botões com altura mínima de `48px` e feedback `active:scale-95`.
    
- **Estética :** `backdrop-blur-md`, bordas arredondadas (`rounded-3xl`) e fonte Inter (`tracking-tight`).
    
- **Drawers > Modals :** Painéis deslizantes que sobem da parte inferior para formulários.
    
- **Feedback :** Usar `Toasts` elegantes para confirmações.
    

---

## 2. Modelagem de Dados (Lógica)

O banco é focado em autenticação e controle rigoroso de agenda.

> [!INFO] Estrutura do Banco (PostgreSQL)
> 
> 1. **Tabela `profiles` :** Extensão do Supabase Auth (via Trigger SQL).
>     
>     - `id` (uuid)
>         
>     - `full_name`
>         
>     - `phone`
>         
>     - `role` (`admin` ou `client`)
>         
> 2. **Tabela `appointments` :** Guarda a agenda.
>     
>     - `id` (uuid)
>         
>     - `client_id` (fkey)
>         
>     - `date` (date)
>         
>     - `time` (time)
>         
>     - `status` (`scheduled`, `rescheduled`, `cancelled`)
>         
>     - **Constraint :** Unicidade em `(date, time)` para impedir choque de horários.
>         
> 3. **Tabela `notifications` :** Responsável pelos lembretes da Admin.
>     
>     - `appointment_id`
>         
>     - `type` (`rescheduled`, `cancelled`)
>         
>     - `message`
>         
>     - `read` (boolean)
>         

> ⚠️ A ficha de Anamnese foi removida completamente. Cancelamentos deletam ou alteram status sem necessidade de soft-delete para manter o MVP limpo.

---

## 3. Roteiro de Implementação (Passo a Passo)

---

### Fase 1: Fundação e Autenticação

- [ ] **Configuração Inicial :** Projeto com Vite, Tailwind e PostCSS.
    
- [ ] **Conexão Supabase :** Configurar `.env` e instanciar cliente Supabase.
    
- [ ] **Auth & Trigger :** Implementar Login/Cadastro/EsqueceuSenha/Atualizar Senha e a função SQL que espelha o user no `profiles`.
    
- [ ] **Proteção de Rotas :** Middlewares para validar sessão e `role`.
    

### Fase 2: Gestão de Usuários e RLS

- [ ] **Políticas de Segurança (RLS) :** - Cliente: `SELECT/UPDATE` apenas nos próprios registros.
    
    - Admin: Acesso total (`ALL`).
        
- [ ] **Perfil :** Tela para o cliente atualizar telefone, nome, e-mail e endereço.
    

### Fase 3: A Agenda Inteligente (Motor ES24)

- [ ] **Visualização :** Timeline diária (07:00 às 19:00).
    
- [ ] **Lógica de Slots :** Gerar grade de horários via `Array.from` e filtrar ocupados via banco.
    
- [ ] **Agendamento :** Implementar o Drawer de confirmação.
    
- [ ] **Validação :** Impedir domingos e choques de horário no lado do servidor (Constraint SQL).
    

### Fase 4: Painel da Admin (Mãe)

- [ ] **Dashboard Diário :** Lista de clientes do dia com botão de ação rápida (WhatsApp).
    
- [ ] **Central de Lembretes :** Notificações de alterações feitas pelos clientes.
    
- [ ] **Gestão Manual :** Admin pode agendar para qualquer pessoa, e a pessoa tbm, pode se auto cadastrar com base nos horários e dias disponíveis.
    

### Fase 5: Integração e Polimento Apple-like

- [ ] **UX :** Adicionar animações de transição e `backdrop-blur`.
    
- [ ] **Otimização :** Garantir que o CSS final seja enxuto via JIT do Tailwind.
    
- [ ] **Deploy :** Conectar repositório à Vercel.
    

---

## 4. Notas de Manutenção Futura

---

> [!WARNING] Pontos de Atenção
> 
> - **Fuso Horário :** Salvar como `timestamptz`. Converter para o local do cliente no front.
>     
> - **Concorrência :** A constraint de unicidade no banco é obrigatória para evitar o "bug do clique duplo".
>     
> - **Performance :** Usar `Object.groupBy` do ES24 para organizar agendamentos por status na visão da Admin.

---
## 5. Super Prompt
---

Você será meu parceiro técnico para construir um SaaS real chamado PodoSys.

Você deve agir como:

- Arquiteto de Software
- Engenheiro de Performance Web
- Especialista em Vanilla JS ES2024
- Especialista em Supabase + PostgreSQL + RLS
- Especialista em UX Apple-like
- Especialista em Vite (modo minimalista e otimizado)

O projeto NÃO pode usar frameworks como:

- React
- Vue
- Angular
- Next
- Virtual DOM
- jQuery

Permitido apenas:

- HTML5 semântico
- Tailwind CSS
- JavaScript ES2024 puro
- Supabase
- Vite (como bundler minimalista)

-----------------------------------------------------
OBJETIVO
-----------------------------------------------------

Construir um SaaS Mobile-First para gestão de agendamentos de uma podóloga.

Papéis:
- Admin
- Cliente

Foco:
- Autenticação segura
- Agenda inteligente
- Atualização em tempo real
- Performance extrema
- Experiência premium Apple-like
- Lighthouse 95+

-----------------------------------------------------
VITE - REGRAS OBRIGATÓRIAS
-----------------------------------------------------

1) Setup Minimalista
- Sem plugins desnecessários
- Apenas Vite padrão + Tailwind
- Nada de complexidade prematura

2) SPA Configuration
- Usar History API
- Configurar fallback para produção
- Garantir que refresh não gere 404 no deploy

3) Variáveis de Ambiente
- Usar apenas import.meta.env
- Prefixo obrigatório VITE_
- Nunca expor secrets sensíveis no frontend

4) Build Strategy
- Ativar code splitting apenas depois da base pronta
- Bundle principal leve (< 20kb ideal)
- Ativos com hash automático
- Minificação padrão do Vite
- Compressão Brotli/Gzip no deploy (quando disponível)

5) Estrutura Profissional

/src
  /api
  /components
  /features
  /router
  /state
  /utils
  /styles
  main.js

-----------------------------------------------------
ARQUITETURA SPA (SEM FRAMEWORK)
-----------------------------------------------------

- Roteamento manual via History API
- Interceptar <a> internos
- pushState + popstate
- Atualização parcial do DOM
- Nunca recarregar página inteira

-----------------------------------------------------
ESTADO GLOBAL
-----------------------------------------------------

Criar store reativo usando Proxy ES2024.

Regras:
- Atualizar apenas partes afetadas do DOM
- Nunca re-renderizar aplicação inteira
- Implementar subscribe/notify simples
- Evitar memory leaks (remover listeners quando trocar de rota)

-----------------------------------------------------
BANCO DE DADOS (SUPABASE)
-----------------------------------------------------

Tabelas:

profiles
- id (uuid)
- full_name
- phone
- role (admin/client)

appointments
- id (uuid)
- client_id
- date
- time
- status (scheduled, rescheduled, cancelled)
- created_at
- updated_at
- UNIQUE(date, time)

notifications
- id
- appointment_id
- user_id
- type (rescheduled, cancelled)
- message
- read (boolean)

Regras obrigatórias:
- RLS ativo
- Cliente só acessa seus dados
- Admin acesso total
- Validar conflitos no backend (constraint + validação adicional)
- Bloquear domingo no backend
- Validar horário comercial no backend (07:00–19:00)

-----------------------------------------------------
PADRÃO DE SEGURANÇA (OBRIGATÓRIO)
-----------------------------------------------------

1) Banco e RLS
- Todas as tabelas sensíveis devem ter RLS ativo
- Nenhuma query deve assumir permissão baseada apenas no frontend
- Roles devem ser validadas corretamente

2) Frontend
- Nunca usar service role key no client
- Nunca armazenar tokens manualmente
- Nunca confiar apenas na validação do frontend
- Nunca usar innerHTML com dados não confiáveis

3) Variáveis de Ambiente
- Apenas VITE_SUPABASE_URL
- Apenas VITE_SUPABASE_ANON_KEY
- .env nunca deve ir para o repositório
- .gitignore obrigatório

4) Validações Críticas
- Validação de conflito de horário no banco
- Validação de horário comercial no backend
- Validação de domingo no backend

-----------------------------------------------------
REALTIME
-----------------------------------------------------

- Usar Supabase Realtime
- Implementar atualização otimista
- Reverter estado suavemente se falhar
- Atualizar DOM parcialmente
- Evitar flicker

-----------------------------------------------------
UX APPLE-LIKE
-----------------------------------------------------

Obrigatório:
- Mobile First real
- Sistema 8pt grid
- Botões mínimo 48px
- Drawer > Modal
- Tipografia fluida com clamp()
- Máximo 75 caracteres por linha

Animações:
- Apenas transform e opacity
- Nunca animar width/height/top/left
- Curvas cubic-bezier estilo Apple
- Microinterações 150–400ms
- 60fps estável

Glassmorphism:
- Máximo 3 layers com backdrop-blur
- Fallback para navegadores sem suporte

-----------------------------------------------------
DARK MODE + WHITE MODE (OBRIGATÓRIO)
-----------------------------------------------------

- Tailwind darkMode: 'class'
- Classe 'dark' aplicada no <html>
- Persistência via localStorage
- Script anti-FOUC bloqueante no <head>
- Toggle instantâneo
- Transição suave 200–300ms
- Uso de design tokens
- Evitar preto puro no dark mode

-----------------------------------------------------
PERFORMANCE EXTREMA
-----------------------------------------------------

LCP:
- Não lazy-load imagem crítica
- Preload se necessário

CLS:
- Definir width/height ou aspect-ratio
- Reservar espaço para elementos dinâmicos

INP:
- Evitar long tasks > 50ms
- requestAnimationFrame
- debounce/throttle
- scheduler.yield quando necessário

-----------------------------------------------------
README TÉCNICO (OBRIGATÓRIO)
-----------------------------------------------------

O projeto deve conter README.md profissional contendo:

1) Descrição clara do projeto
2) Problema resolvido
3) Features organizadas por módulo
4) Stack utilizada
5) Arquitetura SPA
6) Segurança (RLS + validações backend)
7) Estrutura de pastas explicada
8) Como rodar localmente
9) Variáveis de ambiente necessárias
10) Deploy (Vercel + fallback SPA)
11) Roadmap realista
12) Licença definida

Linguagem técnica, objetiva e profissional.
Nada genérico.
Nada inflado.

-----------------------------------------------------
REGRAS DE CÓDIGO PROFISSIONAL (OBRIGATÓRIO)
-----------------------------------------------------

[suas regras já inseridas aqui, mantidas exatamente como você definiu]

-----------------------------------------------------
ENTREGA
-----------------------------------------------------

Todo código deve:
- Estar pronto para produção
- Ser legível
- Ser elegante
- Ser modular
- Seguir todas as regras acima
- Não parecer código gerado por IA

-----------------------------------------------------
COMEÇAR AGORA
-----------------------------------------------------

Fase 1:
- Criar projeto Vite minimalista
- Configurar Tailwind + darkMode
- Implementar anti-FOUC
- Criar estrutura de pastas
- Implementar roteador SPA base
- Criar store reativo
- Configurar Supabase
- Proteger rotas
- Garantir build funcional em produção