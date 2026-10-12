import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Calendar, Cog, Fuel, Gauge } from 'lucide-react'
import { siteData } from '../../data/siteData.js'
import { useIsTouch } from '../../hooks/useDevice.js'
import { fillTemplate, formatKm, formatPrice, vehicleName } from '../../lib/format.js'
import { defaultInstallment, external, vehicleWhatsapp } from '../../lib/links.js'
import { WhatsAppIcon } from '../icons/BrandIcons.jsx'
import { Button } from '../ui/Button.jsx'
import { EASE } from '../ui/Reveal.jsx'
import { SmartImage } from '../ui/SmartImage.jsx'

const { inventory, financing } = siteData

/**
 * Card de veículo.
 * - Computador: efeitos ao passar o mouse ou focar com o teclado.
 * - Celular/tablet: efeitos ao tocar e quando o card passa pelo centro da tela.
 */
export function VehicleCard({ vehicle, index = 0, onOpen }) {
  const ref = useRef(null)
  const isTouch = useIsTouch()
  const inCenter = useInView(ref, { margin: '-38% 0px -38% 0px' })
  const [hovered, setHovered] = useState(false)
  const [pressed, setPressed] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const pressTimer = useRef(0)

  const active = isTouch ? inCenter || pressed : hovered

  useEffect(() => {
    if (active && isTouch) setRevealed(true)
  }, [active, isTouch])

  useEffect(() => () => window.clearTimeout(pressTimer.current), [])

  const handlePointerDown = (event) => {
    if (event.pointerType === 'mouse') return
    window.clearTimeout(pressTimer.current)
    setPressed(true)
    pressTimer.current = window.setTimeout(() => setPressed(false), 1400)
  }

  const name = vehicleName(vehicle)
  const parcel = defaultInstallment(vehicle.price)
  const cover = vehicle.images?.[0]
  const L = inventory.labels

  const specs = [
    { icon: Calendar, label: L.year, value: vehicle.yearLabel },
    { icon: Gauge, label: L.km, value: formatKm(vehicle.km) },
    { icon: Cog, label: L.transmission, value: vehicle.transmission },
    { icon: Fuel, label: L.fuel, value: vehicle.fuel },
  ]

  return (
    <motion.article
      ref={ref}
      layout="position"
      className="vcard"
      data-active={active ? 'true' : 'false'}
      data-revealed={revealed ? 'true' : 'false'}
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.25 } }}
      transition={{ duration: 0.7, ease: EASE, delay: Math.min(index, 5) * 0.06 }}
      onPointerEnter={(event) => event.pointerType === 'mouse' && setHovered(true)}
      onPointerLeave={(event) => event.pointerType === 'mouse' && setHovered(false)}
      onPointerDown={handlePointerDown}
    >
      <div className="vcard-inner">
        <span className="vcard-sheen" aria-hidden="true" />

        <button
          type="button"
          className="vcard-media"
          onClick={() => onOpen(vehicle)}
          aria-label={`${inventory.details}: ${name}`}
        >
          <motion.div layoutId={`vehicle-media-${vehicle.id}`} className="absolute inset-0">
            {/* TROCAR ESTA IMAGEM: siteData.vehicles[].images */}
            <SmartImage
              image={cover}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="h-full w-full"
            />
          </motion.div>
          {vehicle.tag && <span className="vcard-tag">{vehicle.tag}</span>}
        </button>

        <div className="vcard-body">
          <div className="vcard-info">
            <p className="t-small text-steel">{vehicle.brand}</p>
            <h3 className="t-h3 mt-1 text-ice sm:min-h-[2.4em]">
              {vehicle.model} <span className="font-normal text-mist [font-stretch:100%]">{vehicle.version}</span>
            </h3>

            <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-white/[0.07] pt-5">
              {specs.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex min-w-0 items-center gap-2.5">
                  <Icon aria-hidden="true" className="h-4 w-4 shrink-0 text-steel" />
                  <dt className="sr-only">{label}</dt>
                  <dd className="t-num truncate text-[0.875rem] text-mist">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 flex items-end justify-between gap-3">
              <p className="t-num text-[1.5rem] font-[680] leading-none text-ice">{formatPrice(vehicle.price)}</p>
              <p className="t-small t-num text-right text-steel">
                {fillTemplate(inventory.installmentLabel, {
                  prazo: financing.defaultTerm,
                  parcela: formatPrice(parcel),
                })}
              </p>
            </div>
          </div>

          <div className="vcard-actions grid grid-cols-2 gap-2">
            <Button as="button" variant="ghost" size="sm" onClick={() => onOpen(vehicle)}>
              {inventory.details}
            </Button>
            <Button href={vehicleWhatsapp(vehicle)} {...external} size="sm" iconLeft={WhatsAppIcon}>
              {inventory.interest}
            </Button>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
