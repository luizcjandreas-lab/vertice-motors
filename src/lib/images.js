/**
 * Gera versões responsivas para imagens do Unsplash (srcset), para que o
 * celular baixe uma foto menor que o computador. Outras URLs (ou arquivos da
 * pasta /public) são usadas exatamente como informadas.
 */
const RESPONSIVE_HOSTS = ['images.unsplash.com']
const DEFAULT_WIDTHS = [480, 768, 1080, 1440, 1920]

/**
 * Arquivos da pasta /public (ex.: '/fotos/carro.jpg') recebem o caminho base
 * do site, para funcionar também quando ele é publicado em uma subpasta
 * (como no GitHub Pages).
 */
export function assetUrl(path) {
  if (!path || !path.startsWith('/') || path.startsWith('//')) return path
  const env = import.meta.env || {}
  const base = env.BASE_URL || '/'
  return base.replace(/\/$/, '') + path
}

export function imageSources(src, { widths = DEFAULT_WIDTHS, quality = 72 } = {}) {
  if (!src) return {}
  let url
  try {
    url = new URL(src)
  } catch {
    return { src: assetUrl(src) }
  }
  if (!RESPONSIVE_HOSTS.includes(url.hostname)) return { src }

  const build = (width) => {
    const u = new URL(src)
    u.searchParams.set('auto', 'format')
    u.searchParams.set('fit', 'crop')
    u.searchParams.set('w', String(width))
    u.searchParams.set('q', String(quality))
    return u.toString()
  }

  return {
    src: build(widths[Math.min(2, widths.length - 1)]),
    srcSet: widths.map((w) => `${build(w)} ${w}w`).join(', '),
  }
}
