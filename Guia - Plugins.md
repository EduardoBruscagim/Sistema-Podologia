# 📘 Guia Definitivo: Criando Plugins com Múltiplas Sub-Skills no Antigravity 2.0

Use este guia sempre que encontrar um repositório ou conjunto de skills que você queira agrupar em um único pacote organizado como **Plugin**, mantendo todas as sub-skills acessíveis pelo menu `/` sem bagunçar sua pasta raiz de skills.

---

## 🗺️ 1. Onde Salvar o Plugin?

Você pode instalar o plugin de forma **Global**, funcionando em todos os seus projetos, ou **Local**, apenas no projeto atual.

### 🌎 Global

Funciona em todos os seus projetos:

```text
~/.gemini/config/plugins/<nome-do-plugin>/
```

No Windows:

```text
C:\Users\<SeuUsuario>\.gemini\config\plugins\<nome-do-plugin>\
```

### 📁 Local

Funciona apenas no projeto atual:

```text
.agents/plugins/<nome-do-plugin>/
```

Essa pasta fica na raiz do seu repositório Git.

---

## 🏗️ 2. Estrutura de Pastas Obrigatória

A estrutura deve seguir este padrão:

```text
plugins/
└── <nome-do-plugin>/
    ├── plugin.json               ← Manifesto do Plugin
    └── skills/                   ← Pasta intermediária obrigatória
        ├── <subskill-1>/
        │   └── SKILL.md          ← Instruções da subskill 1
        ├── <subskill-2>/
        │   └── SKILL.md          ← Instruções da subskill 2
        └── <subskill-3>/
            └── SKILL.md          ← Instruções da subskill 3
```

A pasta intermediária `skills/` é importante. As sub-skills devem ficar dentro dela.

---

# 📝 3. Passo a Passo de Implementação

## Passo 1: Criar as pastas base

Crie a pasta principal do plugin e, dentro dela, a pasta intermediária `skills`:

```powershell
mkdir ~/.gemini/config/plugins/meu-plugin/skills
```

No Windows, considerando o caminho completo:

```powershell
mkdir "$HOME\.gemini\config\plugins\meu-plugin\skills"
```

---

## Passo 2: Criar o manifesto `plugin.json`

Crie o arquivo:

```text
plugins/meu-plugin/plugin.json
```

O arquivo deve ficar na **raiz do plugin**.

Exemplo:

```json
{
  "name": "meu-plugin",
  "version": "1.0.0",
  "description": "Breve descrição do que este conjunto de skills faz."
}
```

O `plugin.json` funciona como o manifesto que identifica e descreve o plugin.

---

## Passo 3: Criar as pastas de cada Sub-Skill

Dentro da pasta `skills/`, crie uma subpasta para cada subskill:

```powershell
mkdir ~/.gemini/config/plugins/meu-plugin/skills/minha-subskill-1
mkdir ~/.gemini/config/plugins/meu-plugin/skills/minha-subskill-2
```

A estrutura ficará assim:

```text
meu-plugin/
├── plugin.json
└── skills/
    ├── minha-subskill-1/
    └── minha-subskill-2/
```

---

## Passo 4: Criar o `SKILL.md` de cada Sub-Skill

Dentro de cada subpasta, crie um arquivo chamado exatamente:

```text
SKILL.md
```

### Modelo padrão

```markdown
---
name: minha-subskill-1
description: Descrição clara de quando o agente deve usar esta skill. Inclua palavras-chave e contexto de uso.
license: MIT
---

# Título da Subskill

## Quando Usar

Explique para a IA em quais cenários ela deve seguir este guia.

## Instruções e Exemplos de Código

Coloque aqui seus padrões, comandos, melhores práticas e o que NÃO fazer.
```

Cada subskill terá seu próprio `SKILL.md`.

---

# ⚠️ 4. Os 4 Mandamentos para a Skill Aparecer no `/`

Quando uma skill não aparece ao digitar `/` no chat do Antigravity, confira estes quatro pontos.

## 1. A pasta `skills/` não pode ser ignorada

### ❌ Incorreto

```text
plugins/meu-plugin/subskill/SKILL.md
```

### ✅ Correto

```text
plugins/meu-plugin/skills/subskill/SKILL.md
```

A subskill deve estar dentro da pasta intermediária `skills/`.

---

## 2. O nome da pasta deve bater com o `name` do YAML

Exemplo:

```text
skills/react-hooks/
└── SKILL.md
```

O arquivo deve conter:

```yaml
name: react-hooks
```

Use nomes em **kebab-case**, preferencialmente com letras minúsculas e hífens.

### ✅ Exemplo

```yaml
name: react-hooks
```

### ❌ Evite

```yaml
name: ReactHooks
```

ou:

```yaml
name: react_hooks
```

---

## 3. O `---` deve ser a primeira coisa do arquivo

O frontmatter deve começar na **linha 1, caractere 1**.

### ✅ Correto

```markdown
---
name: minha-subskill
description: Minha descrição
---
```

### ❌ Incorreto

```markdown
---
name: minha-subskill
description: Minha descrição
---
```

Também não deve existir nenhum título, comentário ou outro conteúdo antes do `---`.

---

## 4. O nome do arquivo deve ser `SKILL.md`

Use exatamente:

```text
SKILL.md
```

### ✅ Correto

```text
SKILL.md
```

### ❌ Incorreto

```text
skill.md
```

```text
Skill.md
```

```text
README.md
```

---

# 💡 5. Dica Extra: Skill Mestre / Índice

Quando o plugin possui muitas subskills, pode ser útil criar uma **Skill Mestre**, funcionando como um índice do pacote.

Por exemplo:

```text
skills/
├── meu-plugin/
│   └── SKILL.md
├── subskill-1/
│   └── SKILL.md
├── subskill-2/
│   └── SKILL.md
└── subskill-3/
    └── SKILL.md
```

A Skill Mestre pode explicar o propósito do pacote e indicar qual subskill deve ser utilizada em cada situação.

### Exemplo

```markdown
---
name: meu-plugin
description: Índice principal das subskills disponíveis no plugin.
license: MIT
---

# Meu Plugin

Este plugin reúne várias subskills especializadas.

## Subskills disponíveis

| Subskill     | Finalidade                     |
| ------------ | ------------------------------ |
| `subskill-1` | Descrição da primeira subskill |
| `subskill-2` | Descrição da segunda subskill  |
| `subskill-3` | Descrição da terceira subskill |

## Como escolher

- Use `subskill-1` quando...
- Use `subskill-2` quando...
- Use `subskill-3` quando...
```

Isso funciona como um ponto de entrada para entender rapidamente o conjunto de skills.

---

# 📦 6. Exemplo Completo

Suponha que você queira transformar um conjunto de 3 skills em um plugin chamado `meu-plugin`.

A estrutura final seria:

```text
~/.gemini/config/plugins/meu-plugin/
├── plugin.json
└── skills/
    ├── meu-plugin/
    │   └── SKILL.md
    ├── react-hooks/
    │   └── SKILL.md
    ├── typescript/
    │   └── SKILL.md
    └── testing/
        └── SKILL.md
```

## `plugin.json`

```json
{
  "name": "meu-plugin",
  "version": "1.0.0",
  "description": "Conjunto de skills para desenvolvimento com React, TypeScript e testes."
}
```

## `skills/react-hooks/SKILL.md`

```markdown
---
name: react-hooks
description: Boas práticas para utilização de React Hooks.
license: MIT
---

# React Hooks

## Quando Usar

Use esta skill ao trabalhar com `useState`, `useEffect`, `useMemo`, `useCallback` e hooks customizados.

## Regras

- Evite efeitos desnecessários.
- Prefira hooks customizados quando houver lógica reutilizável.
- Mantenha as dependências dos efeitos corretas.
```

## `skills/typescript/SKILL.md`

```markdown
---
name: typescript
description: Padrões e boas práticas para TypeScript.
license: MIT
---

# TypeScript

## Quando Usar

Use esta skill ao escrever ou revisar código TypeScript.

## Regras

- Prefira tipos explícitos em APIs públicas.
- Evite `any` quando houver uma alternativa segura.
- Use union types quando representarem melhor o domínio.
```

## `skills/testing/SKILL.md`

```markdown
---
name: testing
description: Boas práticas para testes automatizados.
license: MIT
---

# Testing

## Quando Usar

Use esta skill ao criar, revisar ou refatorar testes automatizados.

## Regras

- Teste comportamento, não implementação.
- Mantenha os testes independentes.
- Use nomes descritivos para os casos de teste.
```

---

# ✅ Checklist Final

Antes de considerar o plugin pronto, confira:

```text
[ ] O plugin está dentro do diretório correto
[ ] Existe um plugin.json na raiz
[ ] Existe uma pasta skills/
[ ] Cada subskill possui sua própria pasta
[ ] Cada subskill possui um SKILL.md
[ ] O SKILL.md começa imediatamente com ---
[ ] O campo name está correto
[ ] O nome da pasta corresponde ao name
[ ] Os nomes das skills usam kebab-case
[ ] A estrutura não possui níveis desnecessários
```

---

# 🔎 Resumo Visual

A estrutura mínima esperada é:

```text
<plugin>/
├── plugin.json
└── skills/
    ├── <skill-1>/
    │   └── SKILL.md
    ├── <skill-2>/
    │   └── SKILL.md
    └── <skill-3>/
        └── SKILL.md
```

A ideia central é simples:

> **Um Plugin → várias Sub-Skills → cada Sub-Skill possui seu próprio `SKILL.md`.**

Com essa organização, você mantém o pacote agrupado sem precisar espalhar todas as skills diretamente pela raiz global de skills.
