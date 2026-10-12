/**
 * Aplica as cores definidas em siteData.theme como variáveis CSS.
 * O Tailwind usa essas variáveis (bg-accent, text-ice, bg-graphite…).
 */
const THEME_VARS = {
  primary: '--color-accent',
  primaryBright: '--color-accent-bright',
  background: '--color-ink',
  surface: '--color-graphite',
  text: '--color-ice',
}

export function applyTheme(theme = {}) {
  const root = document.documentElement
  Object.entries(THEME_VARS).forEach(([key, cssVar]) => {
    if (theme[key]) root.style.setProperty(cssVar, theme[key])
  })
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta && theme.background) meta.setAttribute('content', theme.background)
}

export function applySeo(seo = {}) {
  if (seo.title) document.title = seo.title
  if (seo.description) {
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', seo.description)
  }
}
