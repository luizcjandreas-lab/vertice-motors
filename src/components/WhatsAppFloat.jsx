import { motion } from 'framer-motion'
import { siteData } from '../data/siteData.js'
import { external, whatsappFor } from '../lib/links.js'
import { WhatsAppIcon } from './icons/BrandIcons.jsx'

/** Botão flutuante do WhatsApp (sem pop-ups, apenas um atalho discreto). */
export function WhatsAppFloat({ visible }) {
  return (
    <motion.a
      href={whatsappFor('general')}
      {...external}
      aria-label={siteData.ui.whatsappFloat}
      className="group fixed right-4 z-40 flex items-center gap-3 sm:right-6"
      style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 1rem)' }}
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={visible ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.6, y: 20 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22, delay: visible ? 1.2 : 0 }}
      whileTap={{ scale: 0.92 }}
      tabIndex={visible ? 0 : -1}
    >
      <span className="pointer-events-none hidden translate-x-2 rounded-full border border-white/10 bg-black/85 px-4 py-2 text-[0.875rem] text-ice opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:block">
        {siteData.ui.whatsappFloat}
      </span>
      <span className="relative grid h-14 w-14 place-items-center rounded-full border border-white/15 bg-graphite shadow-[0_18px_40px_-12px_rgb(0_0_0/0.9)] transition-colors duration-300 group-hover:border-whatsapp/60">
        <span aria-hidden="true" className="wa-ring" />
        <WhatsAppIcon className="h-6 w-6 text-whatsapp" />
      </span>
    </motion.a>
  )
}
