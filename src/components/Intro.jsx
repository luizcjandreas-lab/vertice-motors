import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { siteData } from '../data/siteData.js'
import { useLowPowerDevice } from '../hooks/useDevice.js'
import { CAR, CAR_VIEWBOX, LAMPS } from './CarOutline.jsx'

const STORAGE_KEY = 'vertice-motors:intro-vista'
const DRAW = [0.65, 0, 0.35, 1]
const SOFT = [0.22, 1, 0.36, 1]

/**
 * Linha do tempo da introdução (em segundos).
 * Versão completa ≈ 2,5 s. Versão leve (aparelhos mais fracos) ≈ 1,6 s.
 */
const TIMELINE = {
  full: {
    beam: { at: 0.1, d: 0.8 },
    ground: { at: 0.25, d: 0.75 },
    body: { at: 0.4, d: 1.0 },
    details: { at: 0.8, d: 0.7 },
    wheels: { at: 0.6, d: 0.85 },
    lamps: { at: 1.32, d: 0.45 },
    title: { at: 1.5, d: 0.6 },
    phrase: { at: 1.78, d: 0.5 },
    end: 2.3,
  },
  lite: {
    beam: null,
    ground: { at: 0.05, d: 0.4 },
    body: { at: 0.1, d: 0.75 },
    details: null,
    wheels: { at: 0.25, d: 0.6 },
    lamps: { at: 0.8, d: 0.3 },
    title: { at: 0.8, d: 0.45 },
    phrase: { at: 1.0, d: 0.4 },
    end: 1.6,
  },
}

/** A introdução aparece só uma vez por sessão e nunca com "reduzir movimento". */
export function shouldShowIntro() {
  if (typeof window === 'undefined') return false
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return false
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) !== '1'
  } catch {
    return true
  }
}

export function markIntroSeen() {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, '1')
  } catch {
    /* navegação privada: apenas segue sem salvar */
  }
}

function Draw({ d, at, dur, width = 1.4, opacity = 1, stroke = 'var(--color-ice)' }) {
  return (
    <motion.path
      d={d}
      stroke={stroke}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity }}
      transition={{
        pathLength: { duration: dur, delay: at, ease: DRAW },
        opacity: { duration: 0.2, delay: at },
      }}
    />
  )
}

export function Intro({ onDone }) {
  const lowPower = useLowPowerDevice()
  const t = lowPower ? TIMELINE.lite : TIMELINE.full
  const { intro } = siteData

  useEffect(() => {
    const root = document.documentElement
    const previous = root.style.overflow
    root.style.overflow = 'hidden'
    const timer = window.setTimeout(onDone, t.end * 1000)
    const onKey = (event) => {
      if (event.key === 'Escape') onDone()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('keydown', onKey)
      root.style.overflow = previous
    }
  }, [onDone, t.end])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.55, ease: SOFT } }}
    >
      {/* Brilho ambiente muito sutil */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_55%,rgb(255_255_255/0.05),transparent_70%)]"
      />

      <motion.div
        aria-hidden="true"
        className="relative w-[min(88vw,820px)]"
        exit={{ scale: 1.04, transition: { duration: 0.6, ease: SOFT } }}
      >
        <div className="relative aspect-[800/260]">
          {/* 2. Feixe de luz atravessando a tela */}
          {t.beam && (
            <div className="pointer-events-none absolute left-1/2 top-[88.8%] h-0 w-screen -translate-x-1/2 overflow-visible">
              <motion.div
                className="intro-beam"
                initial={{ x: '-45vw', opacity: 0 }}
                animate={{ x: '105vw', opacity: [0, 1, 1, 0] }}
                transition={{
                  x: { duration: t.beam.d, delay: t.beam.at, ease: [0.55, 0, 0.25, 1] },
                  opacity: { duration: t.beam.d, delay: t.beam.at, times: [0, 0.15, 0.8, 1] },
                }}
              />
            </div>
          )}

          {/* 3. Contorno lateral do automóvel */}
          <svg viewBox={CAR_VIEWBOX} className="absolute inset-0 h-full w-full overflow-visible" fill="none">
            <defs>
              <linearGradient id="intro-ground" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" stopColor="#edf0f3" stopOpacity="0" />
                <stop offset="0.5" stopColor="#edf0f3" stopOpacity="0.55" />
                <stop offset="1" stopColor="#edf0f3" stopOpacity="0" />
              </linearGradient>
            </defs>
            <Draw d={CAR.ground} at={t.ground.at} dur={t.ground.d} width={1} stroke="url(#intro-ground)" />
            <Draw d={CAR.body} at={t.body.at} dur={t.body.d} width={1.6} />
            {t.details && (
              <>
                <Draw d={CAR.window} at={t.details.at} dur={t.details.d} width={1.1} opacity={0.75} />
                <Draw d={CAR.pillar} at={t.details.at + 0.3} dur={0.3} width={1.1} opacity={0.75} />
                <Draw d={CAR.shoulder} at={t.details.at + 0.1} dur={t.details.d} width={1} opacity={0.45} />
                <Draw d={CAR.sill} at={t.details.at + 0.2} dur={t.details.d * 0.8} width={1} opacity={0.45} />
                <Draw d={CAR.mirror} at={t.details.at + 0.35} dur={0.35} width={1.1} opacity={0.75} />
              </>
            )}
            {CAR.wheels.map((w, i) => (
              <g key={w.cx}>
                <motion.circle
                  cx={w.cx}
                  cy={w.cy}
                  r="34"
                  stroke="var(--color-ice)"
                  strokeWidth="1.4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    pathLength: { duration: t.wheels.d, delay: t.wheels.at + i * 0.12, ease: DRAW },
                    opacity: { duration: 0.2, delay: t.wheels.at },
                  }}
                />
                <motion.circle
                  cx={w.cx}
                  cy={w.cy}
                  r="22"
                  stroke="var(--color-ice)"
                  strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.55 }}
                  transition={{
                    pathLength: { duration: t.wheels.d, delay: t.wheels.at + 0.15 + i * 0.12, ease: DRAW },
                    opacity: { duration: 0.2, delay: t.wheels.at + 0.15 },
                  }}
                />
              </g>
            ))}

            {/* 4. Faróis e lanterna acendendo */}
            <motion.path
              d={CAR.headlight}
              fill="#fff7ea"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.9, 0.5, 1] }}
              transition={{ duration: t.lamps.d, delay: t.lamps.at, times: [0, 0.35, 0.55, 1] }}
            />
            <motion.path
              d={CAR.taillight}
              fill="var(--color-accent-bright)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: t.lamps.d, delay: t.lamps.at + 0.1 }}
            />
          </svg>

          {!lowPower && (
            <>
              <motion.span
                className="lamp-glow w-[16%] bg-[radial-gradient(circle,rgb(255_250_240/0.95)_0%,rgb(255_242_224/0.45)_16%,rgb(255_236_210/0.1)_42%,transparent_68%)]"
                style={{ left: `${LAMPS.front.x}%`, top: `${LAMPS.front.y}%`, x: '-50%', y: '-50%' }}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: [0, 0.9, 0.55, 1], scale: 1 }}
                transition={{
                  opacity: { duration: t.lamps.d, delay: t.lamps.at, times: [0, 0.35, 0.55, 1] },
                  scale: { duration: t.lamps.d, delay: t.lamps.at, ease: SOFT },
                }}
              />
              <motion.span
                className="lamp-glow w-[10%] bg-[radial-gradient(circle,rgb(255_250_240/0.8)_0%,rgb(255_242_224/0.3)_20%,transparent_65%)]"
                style={{ left: `${LAMPS.frontFar.x}%`, top: `${LAMPS.frontFar.y}%`, x: '-50%', y: '-50%' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.8, 0.45, 0.85] }}
                transition={{ duration: t.lamps.d, delay: t.lamps.at + 0.09, times: [0, 0.35, 0.55, 1] }}
              />
              {/* Facho de luz projetado à frente */}
              <motion.span
                className="pointer-events-none absolute h-[34%] w-[34%] origin-left bg-[linear-gradient(90deg,rgb(255_244_228/0.28),transparent_85%)] [clip-path:polygon(0_44%,100%_0,100%_100%,0_56%)]"
                style={{ left: `${LAMPS.front.x}%`, top: `${LAMPS.front.y - 17}%` }}
                initial={{ opacity: 0, scaleX: 0.3 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.6, delay: t.lamps.at + 0.12, ease: SOFT }}
              />
              <motion.span
                className="lamp-glow w-[9%] bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-accent-bright)_80%,transparent)_0%,transparent_65%)]"
                style={{ left: `${LAMPS.rear.x}%`, top: `${LAMPS.rear.y}%`, x: '-50%', y: '-50%' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ duration: t.lamps.d, delay: t.lamps.at + 0.12 }}
              />
            </>
          )}
        </div>

        {/* 5 e 6. Nome e frase */}
        <div className="mt-8 text-center sm:mt-12">
          <motion.p
            className="font-[780] text-[clamp(1.35rem,1rem+2.2vw,2.4rem)] leading-none text-ice [font-stretch:125%]"
            initial={{ opacity: 0, letterSpacing: '0.55em', textIndent: '0.55em' }}
            animate={{ opacity: 1, letterSpacing: '0.24em', textIndent: '0.24em' }}
            transition={{ duration: t.title.d, delay: t.title.at, ease: SOFT }}
          >
            {intro.title}
          </motion.p>
          <motion.p
            className="mt-4 text-[clamp(0.9rem,0.85rem+0.3vw,1.05rem)] text-mist"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: t.phrase.d, delay: t.phrase.at, ease: SOFT }}
          >
            {intro.phrase}
          </motion.p>
        </div>
      </motion.div>

      <motion.button
        type="button"
        onClick={onDone}
        className="absolute right-4 rounded-sm px-3 py-2 text-[0.8125rem] text-steel transition-colors hover:text-ice sm:right-8"
        style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 1.25rem)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        {intro.skip}
      </motion.button>
    </motion.div>
  )
}
