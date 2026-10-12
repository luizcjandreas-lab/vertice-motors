import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Eye, ShieldCheck, SlidersHorizontal } from 'lucide-react'
import { siteData } from '../data/siteData.js'
import { useLowPowerDevice } from '../hooks/useDevice.js'
import { external, whatsappFor } from '../lib/links.js'
import { Button } from './ui/Button.jsx'
import { Reveal, SectionHeading } from './ui/Reveal.jsx'
import { SmartImage } from './ui/SmartImage.jsx'

const { about, images } = siteData
const ICONS = { shield: ShieldCheck, eye: Eye, sliders: SlidersHorizontal }

export function About() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const lowPower = useLowPowerDevice()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const still = reduce || lowPower
  const mainY = useTransform(scrollYProgress, [0, 1], still ? ['0%', '0%'] : ['-6%', '6%'])
  const detailY = useTransform(scrollYProgress, [0, 1], still ? ['0%', '0%'] : ['18%', '-18%'])

  return (
    <section id="sobre" ref={ref} className="section-y relative overflow-hidden bg-black">
      <div className="container-x grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
        {/* Imagens da estrutura */}
        <div className="relative lg:col-span-6">
          <Reveal className="relative overflow-hidden rounded-md">
            <motion.div className="aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5]" style={{ y: mainY, scale: 1.12 }}>
              {/* TROCAR ESTA IMAGEM: siteData.images.structure */}
              <SmartImage image={images.structure} sizes="(min-width: 1024px) 50vw, 100vw" className="h-full w-full" />
            </motion.div>
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
          </Reveal>
          <motion.div
            className="absolute -bottom-10 right-4 w-[46%] overflow-hidden rounded-md border border-white/15 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.9)] sm:-right-6 lg:-right-10"
            style={{ y: detailY }}
          >
            {/* TROCAR ESTA IMAGEM: siteData.images.structureDetail */}
            <SmartImage image={images.structureDetail} sizes="25vw" className="aspect-[4/3] w-full" />
          </motion.div>
        </div>

        {/* Texto institucional */}
        <div className="lg:col-span-5 lg:col-start-8">
          <SectionHeading title={about.title}>
            <Reveal delay={0.05} className="mt-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-[0.75rem] text-steel">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent-bright" />
                {about.notice}
              </span>
            </Reveal>
          </SectionHeading>

          <div className="mt-8 grid gap-4">
            {about.paragraphs.map((paragraph, index) => (
              <Reveal as="p" key={index} delay={0.08 + index * 0.05} className="max-w-[60ch] text-mist">
                {paragraph}
              </Reveal>
            ))}
          </div>

          <ul className="mt-12">
            {about.differentials.map((item, index) => {
              const Icon = ICONS[item.icon] || ShieldCheck
              return (
                <Reveal
                  as="li"
                  key={item.title}
                  delay={0.08 * index}
                  className="grid grid-cols-[2.75rem_1fr] gap-4 border-t border-white/[0.08] py-6"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-ice">
                    <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <span>
                    <span className="block text-[1.0625rem] font-semibold text-ice [font-stretch:108%]">
                      {item.title}
                    </span>
                    <span className="mt-1 block text-[0.9375rem] text-mist">{item.text}</span>
                  </span>
                </Reveal>
              )
            })}
          </ul>

          <Reveal delay={0.1} className="mt-8">
            <Button href={whatsappFor('visit')} {...external} variant="ghost">
              {about.cta}
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
