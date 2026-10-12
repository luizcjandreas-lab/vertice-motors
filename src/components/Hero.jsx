import { Fragment, useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { siteData } from '../data/siteData.js'
import { useLowPowerDevice } from '../hooks/useDevice.js'
import { external, whatsappFor } from '../lib/links.js'
import { Button } from './ui/Button.jsx'
import { EASE } from './ui/Reveal.jsx'
import { SmartImage } from './ui/SmartImage.jsx'

const { hero, images } = siteData

export function Hero({ ready }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const lowPower = useLowPowerDevice()
  const parallax = !reduce && !lowPower

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', parallax ? '24%' : '0%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', parallax ? '-14%' : '0%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, parallax ? 0 : 1])

  const words = hero.title.split(' ')
  const show = (delay) => ({
    initial: { opacity: 0, y: 18 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    transition: { duration: 0.9, ease: EASE, delay },
  })

  return (
    <section id="inicio" ref={ref} className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-black">
      {/* Fundo com parallax leve */}
      <motion.div aria-hidden="true" className="absolute inset-0 -z-20 will-change-transform" style={{ y: imageY }}>
        <motion.div
          className="h-full w-full"
          initial={{ scale: 1.14 }}
          animate={{ scale: ready ? 1.04 : 1.14 }}
          transition={{ duration: 2.4, ease: EASE }}
        >
          {/* TROCAR ESTA IMAGEM: siteData.images.hero */}
          <SmartImage image={images.hero} priority quietFallback sizes="100vw" className="h-full w-full" />
        </motion.div>
      </motion.div>

      {/* Sobreposições escuras para legibilidade */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/60 to-black/25" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-black/85 via-black/35 to-transparent md:block"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-black to-transparent"
      />

      <motion.div
        className="container-x relative flex flex-1 flex-col justify-end pb-12 pt-32 md:pb-16 lg:pb-20"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="max-w-[58rem]">
          <h1 className="t-display">
            {words.map((word, index) => (
              <Fragment key={`${word}-${index}`}>
                <span className="-mb-[0.1em] inline-block overflow-hidden pb-[0.1em] align-bottom">
                  <motion.span
                    className="inline-block"
                    initial={{ y: '110%' }}
                    animate={{ y: ready ? '0%' : '110%' }}
                    transition={{ duration: 1, ease: EASE, delay: 0.1 + index * 0.045 }}
                  >
                    {word}
                  </motion.span>
                </span>{' '}
              </Fragment>
            ))}
          </h1>

          <motion.p className="t-lead mt-6 md:mt-8" {...show(0.55)}>
            {hero.text}
          </motion.p>

          <motion.div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center" {...show(0.7)}>
            <Button href="#estoque" size="lg">
              {hero.primaryCta}
            </Button>
            <Button href={whatsappFor('consultant')} {...external} variant="ghost" size="lg">
              {hero.secondaryCta}
            </Button>
          </motion.div>
        </div>

        {/* Indicação para continuar rolando */}
        <motion.a
          href="#estoque"
          className="absolute bottom-12 right-5 hidden flex-col items-center gap-3 text-steel transition-colors hover:text-ice sm:right-8 md:flex lg:bottom-20 lg:right-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          <span className="t-small [writing-mode:vertical-rl]">{hero.scrollHint}</span>
          <span aria-hidden="true" className="scroll-track" />
        </motion.a>
      </motion.div>

      {/* Barra de serviços */}
      <motion.div
        className="relative border-t border-white/10 bg-black/55 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        <ul className="container-x flex h-14 items-center gap-2.5 pr-20 text-[0.8125rem] text-mist sm:h-16 sm:gap-6 sm:pr-8 sm:text-[0.9375rem]">
          {hero.services.map((service, index) => (
            <li key={service} className="flex items-center gap-2.5 sm:gap-6">
              {index > 0 && (
                <span aria-hidden="true" className="text-accent-bright">
                  •
                </span>
              )}
              <span className="[font-stretch:110%]">{service}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  )
}
