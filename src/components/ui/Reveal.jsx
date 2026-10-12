import { motion } from 'framer-motion'

export const EASE = [0.22, 1, 0.36, 1]

/** Revela o conteúdo suavemente quando ele entra na tela (uma única vez). */
export function Reveal({ as = 'div', delay = 0, y = 24, duration = 0.8, className, children, ...props }) {
  const Component = motion[as] || motion.div
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration, ease: EASE, delay }}
      {...props}
    >
      {children}
    </Component>
  )
}

/** Linha de cota técnica que se desenha da esquerda para a direita. */
export function DimensionRule({ className = '', delay = 0 }) {
  return (
    <motion.span
      aria-hidden="true"
      className={`dim-rule ${className}`}
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    />
  )
}

/** Título padrão das seções. */
export function SectionHeading({ title, text, id, children, className = '' }) {
  return (
    <div className={`max-w-3xl ${className}`}>
      <DimensionRule className="mb-8" />
      <Reveal as="h2" id={id} className="t-h2">
        {title}
      </Reveal>
      {text && (
        <Reveal as="p" delay={0.08} className="t-lead mt-5">
          {text}
        </Reveal>
      )}
      {children}
    </div>
  )
}
