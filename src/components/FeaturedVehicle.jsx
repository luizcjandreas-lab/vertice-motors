import { useEffect, useMemo, useRef, useState } from 'react'
import { easeOut, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Check } from 'lucide-react'
import { siteData } from '../data/siteData.js'
import { useLowPowerDevice } from '../hooks/useDevice.js'
import { fillTemplate, formatPercent, formatPrice, installment, vehicleName } from '../lib/format.js'
import { external, whatsappUrl } from '../lib/links.js'
import { WhatsAppIcon } from './icons/BrandIcons.jsx'
import { Segmented } from './inventory/Filters.jsx'
import { Button } from './ui/Button.jsx'
import { DimensionRule, EASE } from './ui/Reveal.jsx'
import { SmartImage } from './ui/SmartImage.jsx'

const { featured, vehicles, financing, whatsappMessages, brand } = siteData

const sequence = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
}
const rise = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
}
const inView = { initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '0px 0px -12% 0px' } }

export function FeaturedVehicle({ onOpen }) {
  const vehicle = vehicles.find((v) => v.id === featured.vehicleId) || vehicles[0]
  const sectionRef = useRef(null)
  const frameRef = useRef(null)
  const reduce = useReducedMotion()
  const lowPower = useLowPowerDevice()
  const animated = !reduce && !lowPower

  // Mudança de tonalidade do fundo durante a rolagem
  const { scrollYProgress: sectionProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const tint = useTransform(sectionProgress, [0.05, 0.35, 0.7, 1], animated ? [0, 1, 1, 0.2] : [0.7, 0.7, 0.7, 0.7])

  // Entrada lateral da imagem
  const { scrollYProgress: frameProgress } = useScroll({ target: frameRef, offset: ['start end', 'center center'] })
  const imageX = useTransform(frameProgress, [0, 1], animated ? ['32%', '0%'] : ['0%', '0%'], { ease: easeOut })
  const imageOpacity = useTransform(frameProgress, [0, 0.55], animated ? [0, 1] : [1, 1])

  const image = featured.image?.src ? featured.image : vehicle.images?.[0]

  return (
    <section id="destaque" ref={sectionRef} className="section-y relative isolate overflow-hidden bg-black">
      {/* Camadas de cor que mudam com a rolagem */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(70%_55%_at_70%_45%,color-mix(in_oklab,var(--color-accent)_32%,transparent),transparent_72%)]"
        style={{ opacity: tint }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-carbon via-transparent to-carbon"
        style={{ opacity: tint }}
      />

      <div className="container-x">
        <motion.div variants={sequence} {...inView}>
          <DimensionRule className="mb-8" />
          <motion.p variants={rise} className="text-[0.9375rem] text-mist">
            {featured.label}
          </motion.p>
          <motion.h2 variants={rise} className="t-display mt-3">
            {featured.title || `${vehicle.brand} ${vehicle.model}`}
          </motion.h2>
          <motion.p variants={rise} className="mt-4 text-[1.05rem] text-mist">
            {vehicle.version}, {vehicle.yearLabel}
          </motion.p>
        </motion.div>

        {/* Foto grande com linhas técnicas */}
        <div ref={frameRef} className="relative -mx-5 mt-16 sm:-mx-8 md:mt-20 lg:ml-0 lg:mr-[calc(50%-50vw)]">
          <motion.div className="relative" style={{ x: imageX, opacity: imageOpacity }}>
            <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/9] lg:aspect-[2.2/1] lg:rounded-l-md">
              {/* TROCAR ESTA IMAGEM: siteData.featured.image */}
              <SmartImage image={image} sizes="(min-width: 1024px) 85vw, 100vw" className="h-full w-full" />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20"
              />
              {animated && (
                <motion.div
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-[45%] bg-gradient-to-r from-transparent via-white/[0.14] to-transparent mix-blend-overlay"
                  initial={{ x: '-110%' }}
                  whileInView={{ x: '260%' }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 1.6, delay: 0.5, ease: [0.45, 0, 0.2, 1] }}
                />
              )}
            </div>
            <TechLines />
          </motion.div>
        </div>

        {/* Informações em sequência */}
        <motion.div className="mt-16 grid gap-12 md:mt-20 lg:grid-cols-12 lg:gap-10" variants={sequence} {...inView}>
          <motion.div variants={rise} className="lg:col-span-4">
            <p className="t-lead">{featured.text}</p>
            <ul className="mt-8 grid gap-3">
              {featured.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3 text-mist">
                  <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-accent-bright" />
                  {highlight}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.dl variants={rise} className="grid grid-cols-2 gap-x-6 gap-y-8 self-start lg:col-span-4">
            {featured.specs.map((spec) => (
              <div key={spec.label} className="border-t border-white/15 pt-4">
                <dt className="t-small text-steel">{spec.label}</dt>
                <dd className="mt-2 flex items-baseline gap-1.5">
                  <span className="t-num text-[clamp(2rem,1.6rem+1.4vw,2.75rem)] font-[720] leading-none text-ice">
                    {spec.value}
                  </span>
                  <span className="text-[0.9375rem] text-mist">{spec.unit}</span>
                </dd>
              </div>
            ))}
          </motion.dl>

          <motion.div variants={rise} className="lg:col-span-4">
            <Simulator vehicle={vehicle} onOpen={onOpen} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/** Linhas técnicas (cotas e marcas de enquadramento) ao redor da foto. */
function TechLines() {
  const line = (delay) => ({
    initial: { scaleX: 0, opacity: 0 },
    whileInView: { scaleX: 1, opacity: 1 },
    viewport: { once: true, amount: 0.5 },
    transition: { duration: 1.1, ease: EASE, delay },
  })
  const vline = (delay) => ({
    initial: { scaleY: 0, opacity: 0 },
    whileInView: { scaleY: 1, opacity: 1 },
    viewport: { once: true, amount: 0.5 },
    transition: { duration: 1.1, ease: EASE, delay },
  })
  const fade = (delay) => ({
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, amount: 0.5 },
    transition: { duration: 0.6, delay },
  })
  const corner = 'absolute h-5 w-5 border-white/60'

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10">
      {/* Cota horizontal (comprimento) */}
      <div className="absolute -top-9 left-5 right-5 sm:left-8 sm:right-8 lg:left-0 lg:right-[18%]">
        <motion.div className="relative h-px origin-left bg-white/30" {...line(0.55)}>
          <span className="absolute -top-[5px] left-0 h-[11px] w-px bg-white/60" />
          <span className="absolute -top-[5px] right-0 h-[11px] w-px bg-white/60" />
        </motion.div>
        <motion.span
          className="t-small t-num absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-steel"
          {...fade(1.1)}
        >
          {featured.dimensions.length}
        </motion.span>
      </div>

      {/* Cota vertical (altura) — apenas em telas grandes */}
      <div className="absolute -left-10 bottom-0 top-0 hidden lg:block">
        <motion.div className="relative h-full w-px origin-top bg-white/30" {...vline(0.75)}>
          <span className="absolute -left-[5px] top-0 h-px w-[11px] bg-white/60" />
          <span className="absolute -left-[5px] bottom-0 h-px w-[11px] bg-white/60" />
        </motion.div>
        <motion.span
          className="t-small t-num absolute left-3 top-1/2 -translate-y-1/2 rotate-180 whitespace-nowrap text-steel [writing-mode:vertical-rl]"
          {...fade(1.3)}
        >
          {featured.dimensions.height}
        </motion.span>
      </div>

      {/* Marcas de enquadramento */}
      <motion.span className={`${corner} left-3 top-3 border-l border-t sm:left-4 sm:top-4`} {...fade(1.0)} />
      <motion.span className={`${corner} right-3 top-3 border-r border-t sm:right-4 sm:top-4`} {...fade(1.05)} />
      <motion.span className={`${corner} bottom-3 left-3 border-b border-l sm:bottom-4 sm:left-4`} {...fade(1.1)} />
      <motion.span className={`${corner} bottom-3 right-3 border-b border-r sm:bottom-4 sm:right-4`} {...fade(1.15)} />

      {/* Linha de base com marcação central */}
      <div className="absolute bottom-[14%] left-5 right-5 sm:left-10 sm:right-10 lg:left-6 lg:right-[20%]">
        <motion.div
          className="h-px origin-left bg-gradient-to-r from-white/0 via-white/35 to-white/0"
          {...line(0.95)}
        />
      </div>
    </div>
  )
}

/** Simulação de parcela com entrada e prazo ajustáveis. */
function Simulator({ vehicle, onOpen }) {
  const [down, setDown] = useState(financing.defaultDownPayment)
  const [term, setTerm] = useState(financing.defaultTerm)

  const downValue = Math.round(vehicle.price * down)
  const monthly = installment(vehicle.price - downValue, financing.monthlyRate, term)
  const fill = ((down - financing.minDownPayment) / (financing.maxDownPayment - financing.minDownPayment)) * 100

  const message = useMemo(
    () =>
      fillTemplate(vehicle.whatsappFeatured || whatsappMessages.featured, {
        loja: brand.name,
        veiculo: vehicleName(vehicle),
        preco: formatPrice(vehicle.price),
        entrada: formatPrice(downValue),
        prazo: term,
        parcela: formatPrice(monthly),
      }),
    [vehicle, downValue, term, monthly],
  )

  return (
    <div className="relative overflow-hidden rounded-md border border-white/10 bg-graphite/80 p-6 backdrop-blur-md sm:p-7">
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
      />
      <p className="t-small text-steel">{featured.priceLabel}</p>
      <p className="t-num mt-1 text-[2.1rem] font-[720] leading-none text-ice">{formatPrice(vehicle.price)}</p>

      <div className="mt-7 border-t border-white/[0.08] pt-6">
        <p className="text-[0.9375rem] font-semibold [font-stretch:108%]">{featured.simulationTitle}</p>

        <div className="mt-5">
          <div className="flex items-baseline justify-between gap-3">
            <label htmlFor="simulacao-entrada" className="text-[0.8125rem] font-medium text-mist">
              {featured.downPaymentLabel}
            </label>
            <span className="t-small t-num text-ice">
              {formatPercent(down)} · {formatPrice(downValue)}
            </span>
          </div>
          <input
            id="simulacao-entrada"
            type="range"
            className="range mt-2"
            min={financing.minDownPayment}
            max={financing.maxDownPayment}
            step={0.05}
            value={down}
            onChange={(event) => setDown(Number(event.target.value))}
            style={{ '--fill': `${fill}%` }}
            aria-valuetext={`${formatPercent(down)}, ${formatPrice(downValue)}`}
          />
        </div>

        <div className="mt-5">
          <Segmented
            name="prazo"
            label={featured.termLabel}
            value={term}
            onChange={setTerm}
            options={financing.terms.map((months) => ({ value: months, label: `${months}x` }))}
          />
        </div>

        <div className="mt-6 rounded-[3px] bg-black/40 px-4 py-4" aria-live="polite">
          <span className="t-small block text-steel">{featured.installmentLabel}</span>
          <span className="t-num mt-1.5 block text-[1.6rem] font-[700] leading-none text-ice">
            {term}x <span className="text-[0.8em] font-medium text-mist">de</span> <AnimatedPrice value={monthly} />
          </span>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <Button href={whatsappUrl(message)} {...external} size="lg" block iconLeft={WhatsAppIcon}>
          {featured.cta}
        </Button>
        <Button as="button" variant="ghost" block onClick={() => onOpen(vehicle)}>
          {featured.details}
        </Button>
      </div>

      <p className="t-small mt-5 text-steel">{financing.disclaimer}</p>
    </div>
  )
}

function AnimatedPrice({ value }) {
  const reduce = useReducedMotion()
  const target = useMotionValue(value)
  const spring = useSpring(target, { stiffness: 160, damping: 24, mass: 0.5 })
  const text = useTransform(spring, (latest) => formatPrice(latest))

  useEffect(() => {
    target.set(value)
  }, [target, value])

  if (reduce) return <span>{formatPrice(value)}</span>
  return <motion.span>{text}</motion.span>
}
