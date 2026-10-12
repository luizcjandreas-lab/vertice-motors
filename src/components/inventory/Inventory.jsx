import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { RotateCcw, SlidersHorizontal } from 'lucide-react'
import { siteData } from '../../data/siteData.js'
import { useMediaQuery } from '../../hooks/useDevice.js'
import { cx, fillTemplate } from '../../lib/format.js'
import { external, whatsappFor } from '../../lib/links.js'
import { WhatsAppIcon } from '../icons/BrandIcons.jsx'
import { Button } from '../ui/Button.jsx'
import { EASE, Reveal, SectionHeading } from '../ui/Reveal.jsx'
import { FilterSelect, Segmented } from './Filters.jsx'
import { VehicleCard } from './VehicleCard.jsx'

const { inventory, vehicles } = siteData
const F = inventory.filters
const EMPTY = { brand: '', model: '', price: '', year: '', transmission: '' }

const unique = (list) => Array.from(new Set(list))

export function Inventory({ onOpen }) {
  const [filters, setFilters] = useState(EMPTY)
  const [panelOpen, setPanelOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const showPanel = isDesktop || panelOpen

  const brands = useMemo(() => unique(vehicles.map((v) => v.brand)).sort((a, b) => a.localeCompare(b, 'pt-BR')), [])
  const models = useMemo(
    () =>
      unique(vehicles.filter((v) => !filters.brand || v.brand === filters.brand).map((v) => v.model)).sort((a, b) =>
        a.localeCompare(b, 'pt-BR'),
      ),
    [filters.brand],
  )
  const years = useMemo(() => unique(vehicles.map((v) => v.year)).sort((a, b) => b - a), [])
  const transmissions = useMemo(() => unique(vehicles.map((v) => v.transmission)), [])

  const filtered = useMemo(() => {
    const range = inventory.priceRanges.find((r) => r.id === filters.price)
    return vehicles.filter((v) => {
      if (filters.brand && v.brand !== filters.brand) return false
      if (filters.model && v.model !== filters.model) return false
      if (filters.year && v.year < Number(filters.year)) return false
      if (filters.transmission && v.transmission !== filters.transmission) return false
      if (range && (v.price < range.min || v.price >= range.max)) return false
      return true
    })
  }, [filters])

  const activeCount = Object.values(filters).filter(Boolean).length

  const update = (key) => (value) =>
    setFilters((current) => {
      const next = { ...current, [key]: value }
      if (key === 'brand' && next.model) {
        const stillValid = vehicles.some((v) => v.model === next.model && (!value || v.brand === value))
        if (!stillValid) next.model = ''
      }
      return next
    })

  const resultsLabel =
    filtered.length === 1 ? inventory.resultsOne : fillTemplate(inventory.resultsMany, { n: filtered.length })

  return (
    <section id="estoque" className="section-y relative bg-black">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading title={inventory.title} text={inventory.text} />
          <Reveal delay={0.1} className="t-small max-w-xs text-steel lg:text-right">
            {inventory.notice}
          </Reveal>
        </div>

        {/* Filtros */}
        <Reveal delay={0.1} className="mt-12 md:mt-16">
          <div className="flex items-center justify-between gap-4 lg:hidden">
            <button
              type="button"
              onClick={() => setPanelOpen((value) => !value)}
              aria-expanded={panelOpen}
              aria-controls="painel-filtros"
              className="inline-flex min-h-[3rem] items-center gap-3 rounded-[3px] border border-white/15 px-4 text-[0.9375rem] font-medium text-ice transition-colors hover:border-white/35"
            >
              <SlidersHorizontal aria-hidden="true" className="h-4 w-4" />
              {inventory.filtersButton}
              <AnimatePresence mode="popLayout" initial={false}>
                {activeCount > 0 && (
                  <motion.span
                    key={activeCount}
                    className="t-num grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1.5 text-[0.75rem] font-semibold text-white"
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.4, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 26 }}
                  >
                    {activeCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <ResultsCount label={resultsLabel} count={filtered.length} />
          </div>

          <AnimatePresence initial={false}>
            {showPanel && (
              <motion.div
                id="painel-filtros"
                key="painel"
                initial={isDesktop ? false : { height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 gap-4 pt-6 sm:grid-cols-2 lg:grid-cols-4 lg:items-end lg:pt-0 xl:grid-cols-[repeat(4,minmax(0,1fr))_auto]">
                  <FilterSelect
                    id="filtro-marca"
                    label={F.brand}
                    value={filters.brand}
                    onChange={update('brand')}
                    placeholder={F.any}
                    options={brands.map((b) => ({ value: b, label: b }))}
                  />
                  <FilterSelect
                    id="filtro-modelo"
                    label={F.model}
                    value={filters.model}
                    onChange={update('model')}
                    placeholder={F.anyModel}
                    options={models.map((m) => ({ value: m, label: m }))}
                  />
                  <FilterSelect
                    id="filtro-preco"
                    label={F.price}
                    value={filters.price}
                    onChange={update('price')}
                    placeholder={F.any}
                    options={inventory.priceRanges.map((r) => ({ value: r.id, label: r.label }))}
                  />
                  <FilterSelect
                    id="filtro-ano"
                    label={F.year}
                    value={filters.year}
                    onChange={update('year')}
                    placeholder={F.anyModel}
                    options={years.map((y) => ({ value: String(y), label: fillTemplate(F.yearFrom, { ano: y }) }))}
                  />
                  <div className="sm:col-span-2 lg:col-span-4 xl:col-span-1">
                    <Segmented
                      name="cambio"
                      label={F.transmission}
                      value={filters.transmission}
                      onChange={update('transmission')}
                      options={[
                        { value: '', label: F.allTransmissions },
                        ...transmissions.map((t) => ({ value: t, label: t })),
                      ]}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-6 flex min-h-[2.75rem] items-center justify-between gap-4 border-t border-white/[0.07] pt-5">
            <div className="hidden lg:block">
              <ResultsCount label={resultsLabel} count={filtered.length} />
            </div>
            <AnimatePresence>
              {activeCount > 0 && (
                <motion.button
                  type="button"
                  onClick={() => setFilters(EMPTY)}
                  className="inline-flex items-center gap-2 rounded-sm py-2 text-[0.875rem] text-mist transition-colors hover:text-ice"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                >
                  <RotateCcw aria-hidden="true" className="h-4 w-4" />
                  {F.clear}
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </Reveal>

        {/* Grade de veículos */}
        <motion.div layout className="mt-8 grid grid-cols-1 items-start gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          <AnimatePresence>
            {filtered.map((vehicle, index) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} onOpen={onOpen} />
            ))}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {filtered.length === 0 && (
            <motion.div
              key="vazio"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="flex flex-col items-start gap-5 rounded-md border border-dashed border-white/15 px-6 py-12 sm:px-10"
            >
              <p className="t-h3">{inventory.emptyTitle}</p>
              <p className="max-w-[52ch] text-mist">{inventory.emptyText}</p>
              <div className="flex flex-wrap gap-3">
                <Button as="button" variant="ghost" onClick={() => setFilters(EMPTY)}>
                  {F.clear}
                </Button>
                <Button href={whatsappFor('notFound')} {...external} iconLeft={WhatsAppIcon}>
                  {inventory.emptyCta}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="t-small mt-8 text-steel">{inventory.installmentNote}</p>
      </div>
    </section>
  )
}

function ResultsCount({ label, count }) {
  return (
    <p aria-live="polite" className={cx('t-small t-num text-mist')}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={count}
          className="inline-block"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.span>
      </AnimatePresence>
    </p>
  )
}
