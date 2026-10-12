import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cx } from '../../lib/format.js'

const SPRING = { type: 'spring', stiffness: 420, damping: 34 }

/** Campo de seleção com indicador animado quando há um filtro ativo. */
export function FilterSelect({ id, label, value, onChange, options, placeholder, disabled = false }) {
  const active = Boolean(value)
  return (
    <div className="relative min-w-0">
      <label htmlFor={id} className="mb-2 flex items-center gap-2 text-[0.8125rem] font-medium text-mist">
        {label}
        <AnimatePresence>
          {active && (
            <motion.span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-accent-bright"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={SPRING}
            />
          )}
        </AnimatePresence>
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
          className={cx('filter-select', active && 'border-white/25', disabled && 'cursor-not-allowed opacity-50')}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-steel"
        />
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left bg-accent-bright"
          initial={false}
          animate={{ scaleX: active ? 1 : 0, opacity: active ? 1 : 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  )
}

/** Botões segmentados (câmbio) com pílula deslizante. */
export function Segmented({ label, value, onChange, options, name }) {
  return (
    <div className="min-w-0">
      <p id={`${name}-label`} className="mb-2 text-[0.8125rem] font-medium text-mist">
        {label}
      </p>
      <div
        role="radiogroup"
        aria-labelledby={`${name}-label`}
        className="snap-row flex min-h-[3rem] gap-1 overflow-x-auto rounded-[3px] border border-line bg-graphite p-1"
      >
        {options.map((option) => {
          const selected = option.value === value
          return (
            <button
              key={option.value || 'todos'}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(option.value)}
              className={cx(
                'relative flex-1 shrink-0 whitespace-nowrap rounded-[2px] px-3.5 py-2 text-[0.875rem] transition-colors duration-300',
                selected ? 'text-white' : 'text-steel hover:text-ice',
              )}
            >
              {selected && (
                <motion.span
                  layoutId={`${name}-pill`}
                  className="absolute inset-0 rounded-[2px] bg-accent"
                  transition={SPRING}
                />
              )}
              <span className="relative">{option.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
