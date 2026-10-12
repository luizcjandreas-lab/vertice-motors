import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { siteData } from '../../data/siteData.js'
import { useDialog } from '../../hooks/useDialog.js'
import { useLockBodyScroll } from '../../hooks/useScroll.js'
import { cx, fillTemplate, formatKm, formatPrice, vehicleName } from '../../lib/format.js'
import { defaultInstallment, external, vehicleWhatsapp, whatsappFor } from '../../lib/links.js'
import { WhatsAppIcon } from '../icons/BrandIcons.jsx'
import { Button } from '../ui/Button.jsx'
import { EASE } from '../ui/Reveal.jsx'
import { SmartImage } from '../ui/SmartImage.jsx'

const { inventory, financing, ui, hero } = siteData

/**
 * Detalhes do veículo. A foto "voa" do card para a janela (layoutId), e as
 * informações aparecem em sequência.
 */
export function VehicleModal({ vehicle, onClose }) {
  const panelRef = useRef(null)
  const closeRef = useRef(null)
  const [photo, setPhoto] = useState(0)
  useLockBodyScroll(true)
  useDialog(panelRef, onClose, closeRef)

  const L = inventory.labels
  const images = vehicle.images?.length ? vehicle.images : [{ src: '', alt: vehicle.model }]
  const total = images.length
  const go = (step) => setPhoto((current) => (current + step + total) % total)

  const specs = [
    [L.year, vehicle.yearLabel],
    [L.km, formatKm(vehicle.km)],
    [L.transmission, vehicle.transmission],
    [L.fuel, vehicle.fuel],
    [L.color, vehicle.color],
    [L.engine, vehicle.engine],
    [L.power, vehicle.power],
    [L.doors, vehicle.doors],
  ].filter(([, value]) => value)

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: 0.18 } },
  }
  const item = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
  }

  return (
    <div className="fixed inset-0 z-[70]">
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
        onClick={onClose}
      />

      <div className="pointer-events-none absolute inset-0 overflow-y-auto overscroll-contain">
        <div className="flex min-h-full items-end justify-center sm:items-center sm:p-6 lg:p-10">
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="veiculo-titulo"
            tabIndex={-1}
            className="pointer-events-auto relative w-full max-w-6xl outline-none"
          >
            {/* Fundo do painel (aparece por trás da foto que se expande) */}
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 rounded-t-xl border border-white/10 bg-graphite sm:rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.25 } }}
              transition={{ duration: 0.35 }}
            />

            <div className="relative grid overflow-hidden rounded-t-xl sm:rounded-xl lg:grid-cols-[1.2fr_1fr]">
              {/* Galeria */}
              <div className="relative bg-black">
                <motion.div
                  layoutId={`vehicle-media-${vehicle.id}`}
                  className="relative aspect-[4/3] w-full lg:aspect-auto lg:h-full lg:min-h-[560px]"
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <AnimatePresence initial={false} mode="popLayout">
                    <motion.div
                      key={photo}
                      className="absolute inset-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <SmartImage
                        image={images[photo]}
                        priority
                        sizes="(min-width: 1024px) 60vw, 100vw"
                        className="h-full w-full"
                      />
                    </motion.div>
                  </AnimatePresence>
                </motion.div>

                {total > 1 && (
                  <motion.div
                    className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-black/80 to-transparent p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <span className="t-small t-num text-mist">{fillTemplate(ui.photoOf, { n: photo + 1, total })}</span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => go(-1)}
                        aria-label={ui.previousImage}
                        className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-black/50 text-ice backdrop-blur transition-colors hover:border-white/50"
                      >
                        <ChevronLeft aria-hidden="true" className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => go(1)}
                        aria-label={ui.nextImage}
                        className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-black/50 text-ice backdrop-blur transition-colors hover:border-white/50"
                      >
                        <ChevronRight aria-hidden="true" className="h-5 w-5" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Informações */}
              <motion.div
                className="relative px-5 pb-8 pt-7 sm:px-8 sm:pb-10 lg:px-10 lg:pt-10"
                variants={stagger}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
              >
                <motion.p variants={item} className="t-small text-steel">
                  {vehicle.brand} · {vehicle.yearLabel}
                </motion.p>
                <motion.h2
                  variants={item}
                  id="veiculo-titulo"
                  className="mt-2 text-[clamp(1.8rem,1.4rem+1.6vw,2.6rem)] font-[720] leading-[1.05] tracking-[-0.02em] [font-stretch:112%]"
                >
                  {vehicle.model}
                  <span className="mt-1 block text-[0.55em] font-normal leading-snug text-mist [font-stretch:100%]">
                    {vehicle.version}
                  </span>
                </motion.h2>

                <motion.div variants={item} className="mt-6 border-y border-white/[0.08] py-5">
                  <p className="t-num text-[2rem] font-[700] leading-none text-ice">{formatPrice(vehicle.price)}</p>
                  <p className="t-small t-num mt-2 text-mist">
                    {fillTemplate(inventory.installmentLabel, {
                      prazo: financing.defaultTerm,
                      parcela: formatPrice(defaultInstallment(vehicle.price)),
                    })}
                  </p>
                </motion.div>

                <motion.dl variants={item} className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4">
                  {specs.map(([label, value]) => (
                    <div key={label} className="min-w-0">
                      <dt className="t-small text-steel">{label}</dt>
                      <dd className="t-num mt-0.5 text-[0.9375rem] text-ice">{value}</dd>
                    </div>
                  ))}
                </motion.dl>

                {vehicle.description && (
                  <motion.p variants={item} className="mt-6 text-[0.9375rem] leading-relaxed text-mist">
                    {vehicle.description}
                  </motion.p>
                )}

                {vehicle.features?.length > 0 && (
                  <motion.ul variants={item} className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {vehicle.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-[0.9rem] text-mist">
                        <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent-bright" />
                        {feature}
                      </li>
                    ))}
                  </motion.ul>
                )}

                <motion.div variants={item} className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button
                    href={vehicleWhatsapp(vehicle)}
                    {...external}
                    size="lg"
                    iconLeft={WhatsAppIcon}
                    className="sm:flex-1"
                  >
                    {inventory.interest}
                  </Button>
                  <Button
                    href={whatsappFor('consultant')}
                    {...external}
                    variant="ghost"
                    size="lg"
                    className="sm:flex-1"
                  >
                    {hero.secondaryCta}
                  </Button>
                </motion.div>

                <motion.p variants={item} className="t-small mt-5 text-steel">
                  {ui.demoInfo} {financing.disclaimer}
                </motion.p>
              </motion.div>
            </div>

            <motion.button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label={`${ui.close}: ${vehicleName(vehicle)}`}
              className={cx(
                'absolute right-3 top-3 z-10 grid h-11 w-11 place-items-center rounded-full',
                'border border-white/20 bg-black/60 text-ice backdrop-blur transition-colors hover:border-white/50',
              )}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.2 }}
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}
