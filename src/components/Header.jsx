import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { siteData } from '../data/siteData.js'
import { useActiveSection, useLockBodyScroll, useScrolled } from '../hooks/useScroll.js'
import { cx } from '../lib/format.js'
import { external, whatsappFor } from '../lib/links.js'
import { Logo } from './Logo.jsx'
import { Button } from './ui/Button.jsx'
import { EASE } from './ui/Reveal.jsx'
import { WhatsAppIcon } from './icons/BrandIcons.jsx'

const { nav, header, contact } = siteData
const sectionIds = nav.map((item) => item.href.replace('#', ''))

export function Header() {
  const scrolled = useScrolled(24)
  const active = useActiveSection(sectionIds)
  const [open, setOpen] = useState(false)
  useLockBodyScroll(open)

  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => event.key === 'Escape' && setOpen(false)
    const onResize = () => window.innerWidth >= 1024 && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  const solid = scrolled || open

  return (
    <>
      <header
        className={cx(
          'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500',
          solid
            ? 'border-white/[0.07] bg-black/75 backdrop-blur-xl'
            : 'border-transparent bg-gradient-to-b from-black/60 to-transparent',
        )}
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      >
        <div
          className={cx(
            'container-x flex items-center justify-between gap-6 transition-[height] duration-500 ease-premium',
            scrolled ? 'h-16' : 'h-20 lg:h-24',
          )}
        >
          <a href="#inicio" className="shrink-0 rounded-sm" onClick={() => setOpen(false)}>
            <Logo />
          </a>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {nav.map((item) => {
                const isActive = active === item.href.slice(1)
                return (
                  <li key={item.href}>
                    <a href={item.href} className="nav-link" aria-current={isActive ? 'true' : undefined}>
                      {item.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-indicator"
                          className="absolute inset-x-0 -bottom-px h-px bg-accent-bright"
                          transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                        />
                      )}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              href={whatsappFor('general')}
              {...external}
              size="sm"
              iconLeft={WhatsAppIcon}
              className="hidden sm:inline-flex"
            >
              {header.cta}
            </Button>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="menu-celular"
              aria-label={open ? header.menuClose : header.menuOpen}
              className="relative grid h-11 w-11 place-items-center rounded-sm border border-white/15 text-ice transition-colors hover:border-white/35 lg:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? 'x' : 'menu'}
                  initial={{ opacity: 0, rotate: -45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 45 }}
                  transition={{ duration: 0.2 }}
                  className="grid place-items-center"
                >
                  {open ? (
                    <X className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Menu className="h-5 w-5" aria-hidden="true" />
                  )}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-celular"
            className="fixed inset-0 z-[45] flex flex-col bg-black/95 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
          >
            <nav
              aria-label="Menu"
              className="container-x flex flex-1 flex-col justify-center pb-10"
              style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 6rem)' }}
            >
              <ul className="flex flex-col">
                {nav.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + index * 0.05, duration: 0.5, ease: EASE }}
                    className="border-b border-white/[0.08]"
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between py-4 text-[1.65rem] font-[680] leading-tight text-ice [font-stretch:115%]"
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                className="mt-10 flex flex-col gap-3"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5, ease: EASE }}
              >
                <Button href={whatsappFor('general')} {...external} size="lg" block iconLeft={WhatsAppIcon}>
                  {header.cta}
                </Button>
                <p className="t-small text-steel">
                  {contact.whatsapp.display} · {contact.instagram.handle}
                </p>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
