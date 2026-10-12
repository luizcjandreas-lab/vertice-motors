import { siteData } from '../data/siteData.js'
import { external, whatsappFor } from '../lib/links.js'
import { WhatsAppIcon } from './icons/BrandIcons.jsx'
import { Button } from './ui/Button.jsx'
import { Reveal } from './ui/Reveal.jsx'

const { ctaBand } = siteData

/** Chamada para ação entre os depoimentos e o contato. */
export function CtaBand() {
  return (
    <section aria-label={ctaBand.title} className="relative overflow-hidden bg-accent">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(115deg,rgb(0_0_0/0.35)_0%,transparent_45%,rgb(255_255_255/0.08)_70%,transparent_100%)]"
      />
      <div className="container-x relative flex flex-col gap-8 py-14 md:flex-row md:items-center md:justify-between md:py-16">
        <Reveal className="max-w-2xl">
          <h2 className="text-[clamp(1.6rem,1.2rem+1.6vw,2.4rem)] font-[720] leading-[1.08] tracking-[-0.02em] text-white [font-stretch:112%] [text-wrap:balance]">
            {ctaBand.title}
          </h2>
          <p className="mt-3 text-white/80">{ctaBand.text}</p>
        </Reveal>
        <Reveal delay={0.1} className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <Button href={whatsappFor('consultant')} {...external} variant="light" size="lg" iconLeft={WhatsAppIcon}>
            {ctaBand.primary}
          </Button>
          <Button href="#estoque" variant="ghost" size="lg" className="border-white/40">
            {ctaBand.secondary}
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
