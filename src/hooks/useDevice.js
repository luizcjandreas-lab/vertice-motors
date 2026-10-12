import { useEffect, useState } from 'react'

/**
 * Detecta aparelhos com pouca capacidade (poucos núcleos, pouca memória ou
 * modo de economia de dados). Nesses casos o site usa animações mais leves.
 */
export function detectLowPower() {
  if (typeof navigator === 'undefined' || typeof window === 'undefined') return false
  const connection = navigator.connection || {}
  if (connection.saveData) return true
  if (/(^|-)2g$/.test(connection.effectiveType || '')) return true

  const cores = navigator.hardwareConcurrency || 8
  const memory = navigator.deviceMemory || 8
  const coarse = window.matchMedia?.('(pointer: coarse)').matches
  return memory <= 2 || (coarse && (cores <= 4 || memory <= 3))
}

let cachedLowPower
export function useLowPowerDevice() {
  const [lowPower] = useState(() => {
    if (cachedLowPower === undefined) cachedLowPower = detectLowPower()
    return cachedLowPower
  })
  return lowPower
}

export function useMediaQuery(query) {
  const get = () => (typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(query).matches : false)
  const [matches, setMatches] = useState(get)
  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])
  return matches
}

/** true em telas sem mouse (celulares e tablets). */
export const useIsTouch = () => useMediaQuery('(hover: none)')
