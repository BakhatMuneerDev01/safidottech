import { useState, useEffect, useRef } from 'react'

/**
 * useNumberScramble (P3-02)
 * ─────────────────────────────────────────────────────────────
 * Creates a cinematic decoding effect. Scrambles random digits for
 * a defined duration before interpolating to the final target number.
 */
export function useNumberScramble(targetValue, duration = 1000, triggerRef) {
  const [displayValue, setDisplayValue] = useState('0')
  const hasAnimated = useRef(false)

  useEffect(() => {
    // Reduced motion fallback
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setDisplayValue(targetValue.toString())
      return
    }

    if (!triggerRef || !triggerRef.current) return

    const el = triggerRef.current
    let scrambleInterval
    let countAnimation

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          
          const scrambleDuration = 200
          const countDuration = duration - scrambleDuration
          const startTime = performance.now()
          const startValue = 0

          // Phase 1: Scramble Phase (First 200ms)
          scrambleInterval = setInterval(() => {
            const randomNum = Math.floor(Math.random() * targetValue * 2)
            setDisplayValue(randomNum.toString())
          }, 30) // Update every 30ms

          // Phase 2: Count-up lock-in Phase
          setTimeout(() => {
            clearInterval(scrambleInterval)
            const countStart = performance.now()

            const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4)

            const updateCount = (currentTime) => {
              const elapsed = currentTime - countStart
              if (elapsed < countDuration) {
                const progress = easeOutQuart(elapsed / countDuration)
                const currentVal = Math.floor(progress * targetValue)
                setDisplayValue(currentVal.toString())
                countAnimation = requestAnimationFrame(updateCount)
              } else {
                setDisplayValue(targetValue.toString())
              }
            }
            countAnimation = requestAnimationFrame(updateCount)
          }, scrambleDuration)

          observer.unobserve(el)
        }
      })
    }, { threshold: 0.5 })

    observer.observe(el)

    return () => {
      observer.disconnect()
      clearInterval(scrambleInterval)
      if (countAnimation) cancelAnimationFrame(countAnimation)
    }
  }, [targetValue, duration, triggerRef])

  return displayValue
}
