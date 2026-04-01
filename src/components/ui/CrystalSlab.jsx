import { motion } from 'framer-motion'
import Icon from './Icon.jsx'
import Button from './Button.jsx'

/**
 * CrystalSlab Pricing Card (P3-03)
 * ─────────────────────────────────────────────────────────────
 * Directional glass gradient featuring lime-to-teal borders.
 * Includes "Form Focus Atmosphere" compatible design tokens.
 */
export function CrystalSlab({ 
  title, 
  price, 
  features = [], 
  isFeatured = false, 
  ctaText = "Start Project",
  className = '' 
}) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Featured styles: Scale 1.02 and Spotlight
  const cardScale = isFeatured ? 1.02 : 1.0
  const spotlightAlpha = isFeatured ? '0.1' : '0'

  return (
    <motion.div
      initial={{ scale: cardScale, y: 0 }}
      whileHover={!isFeatured && !prefersReducedMotion ? { y: -8 } : {}}
      transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
      className={`relative p-[1px] rounded-2xl overflow-hidden glass-card-border ${className}`}
      style={{
        background: `linear-gradient(135deg, #AAFF00, #00FFB2)`,
        transform: `scale(${cardScale})`
      }}
    >
      {/* 1. The Slab Body */}
      <div 
        className="relative h-full w-full bg-[#161C16] rounded-[15px] p-8 flex flex-col items-center text-center overflow-hidden"
        style={{
          background: `linear-gradient(135deg, rgba(255,255,255,0.05), transparent), #161C16`,
        }}
      >
        {/* 2. Radial Spotlight (Featured Only) */}
        {isFeatured && (
          <div 
            className="absolute top-0 left-0 w-full h-[150%] pointer-events-none z-0"
            style={{
              background: `radial-gradient(circle at 50% 0%, rgba(255,255,255,${spotlightAlpha}), transparent 70%)`
            }}
          />
        )}

        <div className="relative z-10 w-full flex flex-col items-center">
          <h4 className="text-xs font-mono tracking-[0.2em] uppercase text-[#F0FFF0] opacity-60 mb-6">{title}</h4>
          
          <div className="flex flex-col items-center mb-8">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#AAFF00] opacity-40 mb-1">From</span>
            <div 
              className="text-4xl md:text-5xl font-bold tracking-tighter"
              style={{ 
                fontFamily: 'var(--font-display)',
                background: `linear-gradient(to bottom, #AAFF00, #88CC00)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              {price}
            </div>
          </div>

          <ul className="w-full space-y-4 mb-10 border-t border-[rgba(255,255,255,0.05)] pt-8">
            {features.map((f, i) => (
              <li key={i} className="flex items-center justify-center gap-2 text-sm text-[var(--color-muted)]">
                <Icon name="check" size={14} className="text-[#00FFB2]" />
                {f}
              </li>
            ))}
          </ul>

          <Button 
            variant={isFeatured ? 'primary' : 'secondary'} 
            className="w-full"
          >
            {ctaText}
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default CrystalSlab
