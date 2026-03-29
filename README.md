# PodoSys

Agenda inteligente para clínicas de podologia — SaaS de gestão de agendamentos com interface premium e tempo real.

## Stack

- **Frontend:** Vanilla JS (ES2024) + Vite 8 + Tailwind CSS 4
- **Backend:** Supabase (Auth, PostgreSQL, RealTime)
- **Ícones:** Lucide
- **Testes:** Vitest

## Começando

```bash
cd podosys
npm install
npm run dev      # inicia em http://localhost:3000
```

## Scripts

| Comando          | Descrição                    |
|------------------|------------------------------|
| `npm run dev`    | Server de desenvolvimento    |
| `npm run build`  | Build de produção            |
| `npm run preview`| Preview do build             |
| `npm test`       | Roda testes unitários        |

## Estrutura

```
podosys/
├── src/
│   ├── api/            # Cliente Supabase
│   ├── features/       # Features organizadas por domínio
│   │   ├── auth/       # Autenticação (login, cadastro, recuperação)
│   │   └── landing/    # Landing page
│   ├── state/          # Estado global reativo (Proxy)
│   ├── styles/         # Design system e CSS global
│   └── utils/          # Utilitários compartilhados
│       ├── __tests__/  # Testes unitários
│       ├── eventBus.js
│       ├── escapeStack.js
│       ├── phoneMask.js
│       ├── errorTranslation.js
│       ├── formValidation.js
│       ├── scrollLock.js
│       └── theme.js
├── index.html
├── vite.config.js
└── package.json
```

## Funcionalidades

- Login e cadastro com validação frontend
- Recuperação e redefinição de senha
- Máscara de telefone brasileiro
- Tema claro/escuro com persistência
- Interface glassmorphism responsiva (mobile drawer + desktop modal)
- Tradução de erros do Supabase para PT-BR

## Licença

MIT
