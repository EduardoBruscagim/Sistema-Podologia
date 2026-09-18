export const updateThemeColorMeta = (isDark: boolean): void => {
  const color = isDark ? '#11100f' : '#faf8f5'
  const metaTags = document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')

  if (metaTags.length > 0) {
    // Unifica as tags existentes removendo restrições de media query para que navegadores móveis
    // (iOS Safari e Chrome Android) respeitem a seleção manual do usuário
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
