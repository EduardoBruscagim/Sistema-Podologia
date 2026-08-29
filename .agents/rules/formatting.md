---
trigger: always_on
---

# Formatting Standard

## Core Rule
Code must be clean, deliberate, and easy to scan. Formatting is part of clarity, maintenance, and trust.

## Expectations
- Consistent indentation, spacing, and intentional grouping everywhere.
- Separate unrelated concerns; avoid giant dense code walls or excessive 2-line fragmentation.
- Prefer readable multiline formatting over compressed one-line cleverness.
- Keep code visually calm with structure obvious at first glance.
- Rule: If file looks chaotic, code is not ready.

---

# File Organization

## General Structure
Organize files in logical sequential order when relevant:
1. `imports`
2. `constants`
3. `types / interfaces`
4. `helpers`
5. `main logic`
6. `exports`

Never mix unrelated concerns or jump between responsibilities without separation.

## Whitespace
Use whitespace to reveal structure: group related lines, isolate distinct responsibilities, and avoid arbitrary visual noise.

---

# Section Separation

Use standard section dividers for major subject changes (e.g., Security, Compatibility, Input Validation, Cache, UI State):

```ts
// -----------------------------------------------------------------------------
// Section Name
// -----------------------------------------------------------------------------
```

## Rules for Section Comments
- Use only when improving file navigation across distinct logical blocks; never overuse for trivial snippets.
- Titles must be short, precise, descriptive, and visually uniform across the entire codebase.

---

# Indentation and Layout

- **Indentation:** Perfectly consistent; nesting levels must be unambiguous.
- **Line Breaks:** Break long expressions, objects, arrays, conditions, and arguments multiline before reading becomes fatiguing.
- **Blocks:** Keep shallow nesting and prefer early returns to make main execution path obvious.
- **Objects & Lists:** Vertically readable with intentional field grouping and property order.

---

# Comment Style & Voice

## Standards
- Professional maintainer voice: clear, concise, intentional, and useful for future engineers.
- Never write robotic, vague, conversational, or AI/chat-like comments. Never address users or individuals by name.
- **Explain:** Intent, constraints, non-obvious trade-offs, invariants, workarounds, and compatibility reasons.
- **Do NOT explain:** Obvious syntax, trivial lines, or behavior already clear from code.
- **Reminders:** Format as impersonal professional notes (e.g., `// Remove this fallback if legacy support is no longer required`).

---

# Readability & Semantics

- Organize by domain meaning (group validation near validation, compatibility near compatibility, transformations near transformations).
- Keep happy path immediately visible; isolate edge cases, setup, and side effects from core flow.
- Code must read like a deliberate, cohesive system rather than accumulated improvisation.

---

# Frontend Presentation

- **UI Structure:** Separate data preparation, layout structure, conditional rendering, and event handlers. Avoid unreadable monolithic render trees.
- **Styling:** Keep style definitions logically grouped; avoid inline class clutter; isolate variant logic and extract repeated patterns.

---

# Example Layout

```ts
import { normalizeUser } from './normalize-user'
import { validateUserInput } from './validate-user-input'

const LEGACY_VERSION = 1

// -----------------------------------------------------------------------------
// Input Validation
// -----------------------------------------------------------------------------

function parseUserInput(input: unknown) {
  return validateUserInput(input)
}

// -----------------------------------------------------------------------------
// Compatibility
// -----------------------------------------------------------------------------

function applyLegacyFallback(version: number, payload: UserPayload) {
  if (version > LEGACY_VERSION) {
    return payload
  }

  // Keep fallback while older payload versions are accepted.
  return {
    ...payload,
    displayName: payload.displayName ?? payload.name,
  }
}

// -----------------------------------------------------------------------------
// Main Flow
// -----------------------------------------------------------------------------

export function buildUserProfile(input: unknown, version: number) {
  const parsedInput = parseUserInput(input)
  const compatiblePayload = applyLegacyFallback(version, parsedInput)

  return normalizeUser(compatiblePayload)
}
```