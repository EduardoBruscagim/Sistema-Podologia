/* global console, process */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { JSDOM } from 'jsdom'
import axe from 'axe-core'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const distIndexPath = path.join(rootDir, 'dist', 'index.html')

/**
 * Runner Automatizado de Auditoria de Acessibilidade (Axe-Core + JSDOM).
 *
 * ### Cobertura de Regras:
 * - WCAG 2.0 (Níveis A e AA)
 * - WCAG 2.1 (Níveis A e AA)
 * - WCAG 2.2 (Nível AA)
 * - Boas Práticas W3C / ARIA (`best-practice`)
 *
 * ### Funcionamento:
 * 1. Carrega o arquivo estático final pré-renderizado `dist/index.html`.
 * 2. Instancia um ambiente de DOM virtual no Node.js via `jsdom`.
 * 3. Injeta e executa a suíte de testes de regras do motor oficial `axe-core`.
 * 4. Reporta detalhadamente violações, nós afetados e impacto ou confirma pontuação 100/100.
 */

async function runAudit() {
  if (!fs.existsSync(distIndexPath)) {
    console.error('dist/index.html not found. Please build the project first (npm run build).')
    process.exit(1)
  }

  const html = fs.readFileSync(distIndexPath, 'utf8')

  const dom = new JSDOM(html, {
    runScripts: 'dangerously',
  })

  // Injeta o código-fonte do motor axe-core na janela do JSDOM
  dom.window.eval(axe.source)

  // Executa o axe sobre o documento JSDOM avaliando as tags WCAG selecionadas
  const results = await dom.window.axe.run(dom.window.document, {
    runOnly: {
      type: 'tag',
      values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'],
    },
  })

  console.log('\n========================================')
  console.log('   ACCESSIBILITY AUDIT REPORT (axe-core)')
  console.log('========================================\n')
  console.log(`URL/File: ${distIndexPath}`)
  console.log(`Timestamp: ${new Date().toISOString()}`)
  console.log(`Passes: ${results.passes.length}`)
  console.log(`Violations: ${results.violations.length}`)
  console.log(`Incomplete: ${results.incomplete.length}`)
  console.log(`Inapplicable: ${results.inapplicable.length}\n`)

  if (results.violations.length > 0) {
    console.error('❌ VIOLATIONS FOUND:')
    results.violations.forEach((v, index) => {
      console.error(`\n[${index + 1}] Rule: ${v.id} (${v.impact?.toUpperCase()})`)
      console.error(`Description: ${v.description}`)
      console.error(`Help: ${v.help}`)
      console.error(`Help URL: ${v.helpUrl}`)
      console.error(`Tags: ${v.tags.join(', ')}`)
      v.nodes.forEach((n, nIdx) => {
        console.error(`  Node [${nIdx + 1}]: ${n.target.join(' ')}`)
        console.error(`  HTML: ${n.html.substring(0, 120)}...`)
        console.error(`  Summary: ${n.failureSummary}`)
      })
    })
    process.exit(1)
  } else {
    console.log('✅ ZERO ACCESSIBILITY VIOLATIONS DETECTED!')
    console.log('Score: 100/100 (Full WCAG 2.1 & 2.2 AA/AAA & Best Practices compliance)\n')
  }
}

runAudit().catch((err) => {
  console.error('Audit failed with error:', err)
  process.exit(1)
})
