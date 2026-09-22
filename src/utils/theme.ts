/**
 * Atualiza dinamicamente as meta tags `theme-color` no `<head>` do documento.
 *
 * ### Contexto e Rationale:
 * Navegadores móveis (Safari no iOS e Chrome no Android) colorem a barra de status do sistema
 * e a barra de endereços com base na tag `<meta name="theme-color">`.
 * Quando o HTML inicial possui meta tags com atributo `media="(prefers-color-scheme: ...)"`,
 * a seleção manual do usuário (via toggle) pode ser ignorada pelo browser caso essas restrições
 * de media query persistam.
 *
 * Para contornar isso, esta função:
 * 1. Remove qualquer atributo `media` da primeira meta tag existente e define seu `content` diretamente.
 * 2. Remove meta tags `theme-color` excedentes para evitar ambiguidades no navegador.
 * 3. Caso nenhuma meta tag exista, cria e anexa uma nova no `<head>`.
 *
 * @param isDark - Indica se o tema ativo é o modo escuro (`true` para '#11100f', `false` para '#faf8f5').
 */
export const updateThemeColorMeta = (isDark: boolean): void => {
  const color = isDark ? '#11100f' : '#faf8f5'
  const metaTags = document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')

  if (metaTags.length > 0) {
    metaTags.forEach((tag, index) => {
      if (index === 0) {
        tag.removeAttribute('media')
        tag.setAttribute('content', color)
      } else {
        tag.remove()
      }
    })
  } else {
    const metaThemeColor = document.createElement('meta')
    metaThemeColor.setAttribute('name', 'theme-color')
    metaThemeColor.setAttribute('content', color)
    document.head.appendChild(metaThemeColor)
  }
}
