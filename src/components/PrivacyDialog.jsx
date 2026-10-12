import { useRef } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { siteData } from '../data/siteData.js'
import { useDialog } from '../hooks/useDialog.js'
import { useLockBodyScroll } from '../hooks/useScroll.js'
import { Button } from './ui/Button.jsx'
import { EASE } from './ui/Reveal.jsx'

const { privacy } = siteData

export function PrivacyDialog({ onClose }) {
  const panelRef = useRef(null)
  const closeRef = useRef(null)
  useLockBodyScroll(true)
  useDialog(panelRef, onClose, closeRef)

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6">
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacidade-titulo"
        className="relative max-h-[88svh] w-full max-w-2xl overflow-y-auto rounded-t-xl border border-white/10 bg-graphite p-6 sm:rounded-xl sm:p-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={privacy.close}
          className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full border border-white/15 text-ice transition-colors hover:border-white/40"
        >
          <X aria-hidden="true" className="h-5 w-5" />
        </button>
        <h2 id="privacidade-titulo" className="t-h2 pr-12 text-[1.75rem]">
          {privacy.title}
        </h2>
        <div className="mt-6 grid gap-4 text-mist">
          {privacy.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <Button as="button" variant="ghost" className="mt-8" onClick={onClose}>
          {privacy.close}
        </Button>
      </motion.div>
    </div>
  )
}
