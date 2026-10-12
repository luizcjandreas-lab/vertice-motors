import { siteData } from '../data/siteData.js'
import { cx } from '../lib/format.js'
import { assetUrl } from '../lib/images.js'

const { brand } = siteData

/** Símbolo provisório: duas linhas que se encontram em um vértice. */
export function LogoMark({ className = '' }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <path d="M5 7 L16 26" stroke="var(--color-ice)" strokeWidth="2.6" fill="none" strokeLinecap="square" />
      <path d="M27 7 L16 26" stroke="var(--color-accent-bright)" strokeWidth="2.6" fill="none" strokeLinecap="square" />
      <path d="M11 7 L21 7" stroke="var(--color-ice)" strokeOpacity="0.35" strokeWidth="1" />
    </svg>
  )
}

/**
 * Logo do site. Para usar um arquivo próprio, preencha brand.logo.src no
 * siteData.js; caso contrário é exibida a logo em texto.
 */
export function Logo({ className = '', size = 'md' }) {
  if (brand.logo?.src) {
    return (
      <img
        src={assetUrl(brand.logo.src)}
        alt={brand.logo.alt || brand.name}
        style={{ height: size === 'lg' ? brand.logo.height * 1.3 : brand.logo.height }}
        className={cx('w-auto', className)}
      />
    )
  }

  return (
    <span className={cx('inline-flex items-center gap-2.5', className)}>
      <LogoMark className={size === 'lg' ? 'h-9 w-9' : 'h-7 w-7'} />
      <span className="flex flex-col leading-none" aria-hidden="true">
        <span
          className={cx(
            'font-[820] tracking-[0.06em] [font-stretch:125%]',
            size === 'lg' ? 'text-[1.45rem]' : 'text-[1.08rem]',
          )}
        >
          {brand.wordmark.main}
        </span>
        <span
          className={cx(
            'mt-1 font-medium tracking-[0.48em] text-steel [font-stretch:110%]',
            size === 'lg' ? 'text-[0.68rem]' : 'text-[0.56rem]',
          )}
        >
          {brand.wordmark.sub}
        </span>
      </span>
      <span className="sr-only">{brand.name}</span>
    </span>
  )
}
