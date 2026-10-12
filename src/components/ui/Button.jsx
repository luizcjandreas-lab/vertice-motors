import { motion } from 'framer-motion'
import { cx } from '../../lib/format.js'

/**
 * Botão/link padrão do site, com microinteração ao tocar e reflexo ao passar
 * o mouse (definido em index.css, classe .btn).
 */
export function Button({
  as = 'a',
  variant = 'primary',
  size = 'md',
  block = false,
  icon: Icon,
  iconLeft: IconLeft,
  className = '',
  children,
  ...props
}) {
  const Component = as === 'button' ? motion.button : motion.a
  return (
    <Component
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      className={cx(
        'btn',
        `btn-${variant}`,
        size === 'sm' && 'btn-sm',
        size === 'lg' && 'btn-lg',
        block && 'btn-block',
        className,
      )}
      {...(as === 'button' && !props.type ? { type: 'button' } : {})}
      {...props}
    >
      {IconLeft && <IconLeft aria-hidden="true" />}
      <span>{children}</span>
      {Icon && <Icon aria-hidden="true" />}
    </Component>
  )
}
