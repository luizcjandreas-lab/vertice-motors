import { useMemo, useState } from 'react'
import { siteData } from '../../data/siteData.js'
import { imageSources } from '../../lib/images.js'
import { cx } from '../../lib/format.js'
import { CarOutline } from '../CarOutline.jsx'

/**
 * Imagem com carregamento preguiçoso (lazy loading), versões responsivas,
 * efeito de carregamento e fallback elegante caso a foto não carregue.
 *
 * Recebe `image` no formato do siteData: { src, alt, position }.
 */
export function SmartImage({
  image,
  sizes = '100vw',
  priority = false,
  className = '',
  imgClassName = '',
  fallbackClassName = '',
  quietFallback = false,
}) {
  const src = image?.src || ''
  const alt = image?.alt || ''
  const [loaded, setLoaded] = useState(null)
  const [failed, setFailed] = useState(null)
  const sources = useMemo(() => imageSources(src), [src])

  const status = !src || failed === src ? 'error' : loaded === src ? 'loaded' : 'loading'

  return (
    <div className={cx('relative overflow-hidden bg-graphite', className)} data-status={status}>
      {status !== 'error' && (
        <img
          // A URL vem do siteData.js (procure por "TROCAR ESTA IMAGEM")
          src={sources.src}
          srcSet={sources.srcSet}
          sizes={sources.srcSet ? sizes : undefined}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          ref={(el) => {
            // Imagens que já estavam em cache não disparam onLoad em alguns navegadores
            if (el && el.complete && el.naturalWidth > 0 && loaded !== src) setLoaded(src)
          }}
          onLoad={() => setLoaded(src)}
          onError={() => setFailed(src)}
          className={cx(
            'smart-img h-full w-full object-cover',
            status === 'loaded' ? 'opacity-100' : 'opacity-0',
            imgClassName,
          )}
          style={image?.position ? { objectPosition: image.position } : undefined}
        />
      )}
      {status === 'loading' && <span aria-hidden="true" className="img-shimmer absolute inset-0" />}
      {status === 'error' && <ImageFallback alt={alt} quiet={quietFallback} className={fallbackClassName} />}
    </div>
  )
}

export function ImageFallback({ alt, quiet = false, className = '' }) {
  return (
    <div
      role={alt ? 'img' : undefined}
      aria-label={alt || undefined}
      className={cx(
        'absolute inset-0 flex flex-col items-center justify-center gap-4 overflow-hidden',
        'bg-[radial-gradient(120%_80%_at_50%_0%,#24272c_0%,#15171a_55%,#0c0d0f_100%)]',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />
      <CarOutline
        className={cx(
          'text-white/22',
          quiet ? 'w-[70%] max-w-[760px] opacity-60 md:ml-[30%]' : 'w-[62%] max-w-[420px]',
        )}
      />
      {!quiet && <span className="t-small text-steel">{siteData.ui.imageUnavailable}</span>}
    </div>
  )
}
