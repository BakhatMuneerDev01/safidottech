import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { useLocation } from 'react-router-dom'

/**
 * ReadingProgressBar (P2-05)
 * ─────────────────────────────────────────────────────────────
 * Indicates article progress. Framer Motion tracks scroll depth natively
 * syncing beautifully with Lenis momentum. Fixed Z: 102 (Above Glass Nav).
 */
export function ReadingProgressBar() {
  const location = useLocation()
  const { scrollYProgress } = useScroll()
  
  // Spring config to match Lenis smooth easing
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Constraint: Only run on /blog routes
  if (!location.pathname.includes('/blog')) return null

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-[#AAFF00] origin-left z-[102] pointer-events-none shadow-[0_0_10px_rgba(170,255,0,0.5)]"
      style={{ scaleX }}
    />
  )
}

export default ReadingProgressBar
