# Sistema de Podologia

Sistema de gestão para clínica de podologia.

## Stack

- **Core:** HTML5, TypeScript
- **Build tool:** Vite
- **Estilização:** Tailwind CSS v4, daisyUI v5
- **Backend / Banco / Auth:** Supabase (integração futura)
- **Qualidade de código:** ESLint, Prettier

## Requisitos

- Node.js >= 20.x
- npm >= 10.x

## Instalação

```bash
npm install
```

## Configuração de Ambiente

Copie o arquivo de exemplo e preencha as variáveis locais quando necessário:

```bash
cp .env.example .env
```

## Scripts Disponíveis

- `npm run dev`: Inicia servidor local de desenvolvimento.
- `npm run build`: Valida tipos com TypeScript e gera bundle de produção.
- `npm run typecheck`: Executa checagem de tipos estáticos sem emitir arquivos.
- `npm run lint`: Executa verificação do ESLint.
- `npm run lint:fix`: Corrige problemas automáticos de ESLint.
- `npm run format`: Formata arquivos do projeto com Prettier.
- `npm run format:check`: Verifica conformidade de formatação com Prettier.
- `npm run check`: Executa validação completa do projeto (`lint` + `format:check` + `build`).
- `npm run preview`: Visualiza o build de produção localmente.

## Estrutura do Projeto

```text
src/
├── assets/       # Recursos estáticos (imagens, ícones)
├── components/   # Componentes de interface reutilizáveis
├── features/     # Módulos de domínio e regras de negócio
├── layouts/      # Estruturas de layout da aplicação
├── pages/        # Telas e visualizações
├── services/     # Serviços externos e clientes de API (Supabase)
├── types/        # Interfaces e definições de tipo TypeScript
├── utils/        # Funções utilitárias puras e helpers
├── main.ts       # Ponto de entrada da aplicação
└── style.css     # Estilos globais (Tailwind + daisyUI)
```

## Observações de Desenvolvimento

- Projeto em TypeScript puro (sem React ou outros frameworks UI).
- Utilizar Tailwind CSS v4 nativo e componentes daisyUI v5.
- Não expor `SUPABASE_SERVICE_ROLE_KEY` no frontend; utilizar apenas `VITE_SUPABASE_ANON_KEY`.
