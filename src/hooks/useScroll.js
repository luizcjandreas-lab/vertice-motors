import { useEffect, useState } from 'react'

/** true depois que a página rola além de `threshold` pixels. */
export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      setScrolled(window.scrollY > threshold)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [threshold])
  return scrolled
}

/** Retorna o id da seção visível no meio da tela (para o menu). */
export function useActiveSection(ids) {
  const [active, setActive] = useState('')
  const key = ids.join('|')
  useEffect(() => {
    const elements = key
      .split('|')
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!elements.length || !('IntersectionObserver' in window)) return undefined
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [key])
  return active
}

/** Trava a rolagem da página enquanto um menu ou janela está aberto. */
let lockCount = 0
let previous = { overflow: '', paddingRight: '' }

export function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return undefined
    const root = document.documentElement
    if (lockCount === 0) {
      previous = { overflow: root.style.overflow, paddingRight: root.style.paddingRight }
      const scrollbar = window.innerWidth - root.clientWidth
      root.style.overflow = 'hidden'
      if (scrollbar > 0) root.style.paddingRight = `${scrollbar}px`
    }
    lockCount += 1
    return () => {
      lockCount -= 1
      if (lockCount === 0) {
        root.style.overflow = previous.overflow
        root.style.paddingRight = previous.paddingRight
      }
    }
  }, [locked])
}
