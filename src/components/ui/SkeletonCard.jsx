import { motion } from 'framer-motion'
import { forwardRef } from 'react'

/**
 * SkeletonCard Primitive (P2-06)
 * ─────────────────────────────────────────────────────────────
 * Premium loading state skeleton matching dimension specs.
 * Uses a hardware-accelerated lime sweep rather than standard grey pulses.
 */
export const SkeletonCard = forwardRef(({ className = '', style = {} }, ref) => {
  return (
    <div 
      ref={ref}
      className={`relative overflow-hidden rounded-xl bg-[#0E130E] border border-[rgba(170,255,0,0.05)] w-full min-h-[300px] ${className}`}
      style={{ ...style }}
      aria-hidden="true"
    >
      {/* 
        The Lime Sweep 
        Animates a 5% opacity lime gradient from -100% to 200% over 1.5s
      */}
      <motion.div
        animate={{ x: ['-100%', '200%'] }}
        transition={{ 
          repeat: Infinity, 
          duration: 1.5, 
          ease: 'linear'
        }}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(170,255,0,0.05) 50%, transparent 100%)'
        }}
      />
    </div>
  )
})

SkeletonCard.displayName = 'SkeletonCard'
export default SkeletonCard
