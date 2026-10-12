import { Clock, MapPin, Navigation, Phone } from 'lucide-react'
import { siteData } from '../data/siteData.js'
import { external, fullAddress, routeUrl, whatsappFor } from '../lib/links.js'
import { BrandIcon, WhatsAppIcon } from './icons/BrandIcons.jsx'
import { Button } from './ui/Button.jsx'
import { Reveal, SectionHeading } from './ui/Reveal.jsx'

const { contact, contactSection: C, brand } = siteData

export function Contact() {
  const a = contact.address

  return (
    <section id="contato" className="section-y relative bg-black">
      <div className="container-x">
        <SectionHeading title={C.title} text={C.text} />

        <div className="mt-14 grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Mapa (reservado) */}
          <Reveal className="lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-white/10 bg-graphite sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[480px]">
              {contact.mapEmbedUrl ? (
                <iframe
                  title={`Mapa: ${brand.name}`}
                  src={contact.mapEmbedUrl}
                  className="absolute inset-0 h-full w-full border-0 grayscale-[0.6] invert-[0.92] hue-rotate-180"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              ) : (
                <MapPlaceholder />
              )}
            </div>
          </Reveal>

          {/* Informações */}
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="flex h-full flex-col rounded-md border border-white/10 bg-graphite p-6 sm:p-8">
              <InfoBlock icon={MapPin} title={C.addressLabel}>
                <address className="not-italic text-ice">
                  {a.street}
                  <br />
                  {a.district}, {a.city} - {a.state}
                  <br />
                  <span className="text-mist">CEP {a.zip}</span>
                </address>
              </InfoBlock>

              <InfoBlock icon={Clock} title={C.hoursLabel}>
                <dl className="grid gap-1.5">
                  {contact.hours.map((h) => (
                    <div key={h.days} className="flex justify-between gap-4 text-[0.9375rem]">
                      <dt className="text-mist">{h.days}</dt>
                      <dd className="t-num text-right text-ice">{h.time}</dd>
                    </div>
                  ))}
                </dl>
              </InfoBlock>

              <InfoBlock icon={Phone} title={C.channelsLabel} last>
                <ul className="grid gap-2.5 text-[0.9375rem]">
                  <li>
                    <a href={`tel:${contact.phone.number}`} className="group inline-flex items-center gap-3 text-ice">
                      <Phone aria-hidden="true" className="h-4 w-4 text-steel" />
                      <span className="t-num underline-offset-4 group-hover:underline">{contact.phone.display}</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={whatsappFor('general')}
                      {...external}
                      className="group inline-flex items-center gap-3 text-ice"
                    >
                      <WhatsAppIcon className="h-4 w-4 text-steel" />
                      <span className="t-num underline-offset-4 group-hover:underline">{contact.whatsapp.display}</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={contact.instagram.url}
                      {...external}
                      className="group inline-flex items-center gap-3 text-ice"
                    >
                      <BrandIcon name="instagram" className="h-4 w-4 text-steel" />
                      <span className="underline-offset-4 group-hover:underline">{contact.instagram.handle}</span>
                    </a>
                  </li>
                </ul>
              </InfoBlock>

              <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row lg:flex-col xl:flex-row">
                <Button href={routeUrl()} {...external} iconLeft={Navigation} className="sm:flex-1">
                  {C.routeCta}
                </Button>
                <Button
                  href={whatsappFor('visit')}
                  {...external}
                  variant="ghost"
                  iconLeft={WhatsAppIcon}
                  className="sm:flex-1"
                >
                  {C.whatsappCta}
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function InfoBlock({ icon: Icon, title, children, last = false }) {
  return (
    <div className={last ? 'pt-6' : 'border-b border-white/[0.08] py-6 first:pt-0'}>
      <p className="mb-3 flex items-center gap-2 text-[0.8125rem] font-medium text-steel">
        <Icon aria-hidden="true" className="h-4 w-4" />
        {title}
      </p>
      {children}
    </div>
  )
}

/** Espaço reservado para o Google Maps: mapa estilizado, sem dados reais. */
function MapPlaceholder() {
  return (
    <div className="absolute inset-0">
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full text-white"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 800 600"
      >
        <defs>
          <pattern id="mapa-grade" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke="currentColor" strokeOpacity="0.05" />
          </pattern>
        </defs>
        <rect width="800" height="600" fill="url(#mapa-grade)" />
        <g fill="none" stroke="currentColor" strokeLinecap="round">
          <path d="M-20 380 C 160 340 260 420 420 360 S 700 250 820 280" strokeOpacity="0.16" strokeWidth="14" />
          <path d="M120 -20 C 160 160 220 300 260 620" strokeOpacity="0.1" strokeWidth="9" />
          <path d="M560 -20 C 520 180 600 360 540 620" strokeOpacity="0.1" strokeWidth="9" />
          <path d="M-20 140 L 820 200" strokeOpacity="0.07" strokeWidth="6" />
          <path d="M-20 520 L 820 470" strokeOpacity="0.07" strokeWidth="6" />
          <path d="M330 -20 L 380 620" strokeOpacity="0.06" strokeWidth="5" />
        </g>
      </svg>
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_45%,transparent_0%,rgb(21_23_26/0.85)_100%)]" />

      <div className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-full">
        <span className="relative grid h-12 w-12 place-items-center">
          <span aria-hidden="true" className="wa-ring border-accent-bright/70" />
          <span className="grid h-12 w-12 place-items-center rounded-full bg-accent text-white shadow-[0_10px_30px_-8px_var(--color-accent)]">
            <MapPin aria-hidden="true" className="h-5 w-5" />
          </span>
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
        <p className="font-semibold text-ice [font-stretch:108%]">{C.mapPlaceholderTitle}</p>
        <p className="t-small mt-1 max-w-[46ch] text-mist">{C.mapPlaceholderText}</p>
        <p className="t-small mt-3 text-steel">{fullAddress()}</p>
      </div>
    </div>
  )
}
