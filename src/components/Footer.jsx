import { siteData } from '../data/siteData.js'
import { external, whatsappFor } from '../lib/links.js'
import { BrandIcon } from './icons/BrandIcons.jsx'
import { Logo } from './Logo.jsx'

const { footer, nav, contact, social, brand } = siteData

export function Footer({ onPrivacy }) {
  const year = new Date().getFullYear()
  const a = contact.address

  return (
    <footer className="relative border-t border-white/[0.08] bg-carbon">
      <div className="container-x grid gap-12 pb-16 pt-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10 lg:pt-20">
        <div className="sm:col-span-2 lg:col-span-4">
          <Logo size="lg" />
          <p className="mt-5 max-w-[38ch] text-[0.9375rem] text-mist">{footer.text}</p>
          <ul className="mt-6 flex gap-2" aria-label={footer.socialTitle}>
            {social.map((item) => (
              <li key={item.name}>
                <a
                  href={item.url}
                  {...external}
                  aria-label={item.name}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-mist transition-colors hover:border-white/40 hover:text-ice"
                >
                  <BrandIcon name={item.icon} className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label={footer.quickLinksTitle} className="lg:col-span-2 lg:col-start-6">
          <p className="text-[0.8125rem] font-medium text-steel">{footer.quickLinksTitle}</p>
          <ul className="mt-4 grid gap-2.5">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-[0.9375rem] text-mist transition-colors hover:text-ice">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <p className="text-[0.8125rem] font-medium text-steel">{footer.contactTitle}</p>
          <ul className="mt-4 grid gap-2.5 text-[0.9375rem] text-mist">
            <li>
              <a href={whatsappFor('general')} {...external} className="t-num transition-colors hover:text-ice">
                WhatsApp {contact.whatsapp.display}
              </a>
            </li>
            <li>
              <a href={`tel:${contact.phone.number}`} className="t-num transition-colors hover:text-ice">
                {contact.phone.display}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="break-all transition-colors hover:text-ice">
                {contact.email}
              </a>
            </li>
            <li className="pt-1 text-steel">
              {a.street}, {a.city} - {a.state}
            </li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <p className="text-[0.8125rem] font-medium text-steel">{siteData.contactSection.hoursLabel}</p>
          <ul className="mt-4 grid gap-2.5 text-[0.9375rem] text-mist">
            {contact.hours.map((h) => (
              <li key={h.days}>
                <span className="block text-steel">{h.days}</span>
                <span className="t-num">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/[0.06]">
        <div className="container-x flex flex-col gap-4 py-6 pb-28 text-[0.8125rem] text-steel md:flex-row md:items-center md:justify-between md:pb-6">
          <p>
            © {year} {brand.legalName} CNPJ {brand.cnpj}. {footer.rights}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>{footer.demoNote}</span>
            <button
              type="button"
              onClick={onPrivacy}
              className="rounded-sm text-mist underline underline-offset-4 transition-colors hover:text-ice"
            >
              {footer.privacy}
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
