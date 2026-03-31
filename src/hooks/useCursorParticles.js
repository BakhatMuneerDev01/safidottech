import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * useCursorParticles (P2-05)
 * ─────────────────────────────────────────────────────────────
 * High-performance DOM pool strategy. Tracks cursor velocity
 * and drops lime particles on mousemove. Disables on touch devices.
 */
export function useCursorParticles() {
  const containerRef = useRef(null)
  
  // 6-node pool
  const poolSize = 6
  const poolIndex = useRef(0)
  const particles = useRef([])
  const isTouchDevice = useRef(false)

  useEffect(() => {
    // 1. Desktop Check
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      isTouchDevice.current = true
      return
    }

    if (!containerRef.current) return

    // 2. Initialize DOM Pool manually to avoid React state reconciliation thrashing
    const fragment = document.createDocumentFragment()
    for (let i = 0; i < poolSize; i++) {
      const p = document.createElement('div')
      // Base styles matching the spec
      p.className = 'absolute top-0 left-0 w-[3px] h-[3px] rounded-full bg-[#AAFF00] pointer-events-none opacity-0'
      // Hardware acceleration enforce
      p.style.willChange = 'transform, opacity'
      fragment.appendChild(p)
      particles.current.push(p)
    }
    containerRef.current.appendChild(fragment)

    // 3. Track cursor and deploy
    let lastTime = 0
    // Throttle emits to avoid GSAP overload on hyper-fast sweeps
    const THROTTLE_MS = 50 

    const handleMouseMove = (e) => {
      const now = performance.now()
      if (now - lastTime < THROTTLE_MS) return
      lastTime = now

      // Reduced motion check
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReducedMotion) return

      // Pull from pool
      const particle = particles.current[poolIndex.current]
      poolIndex.current = (poolIndex.current + 1) % poolSize

      // Reset GSAP tween instantly
      gsap.killTweensOf(particle)
      
      // Position at cursor
      gsap.set(particle, {
        x: e.clientX,
        y: e.clientY,
        opacity: 0.8,
        scale: 1,
      })

      // Animate up and fade out over 600ms
      gsap.to(particle, {
        y: '-=20',
        opacity: 0,
        scale: 0.2,
        duration: 0.6,
        ease: 'power2.out'
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      particles.current.forEach(p => gsap.killTweensOf(p))
    }
  }, [])

  return containerRef
}
