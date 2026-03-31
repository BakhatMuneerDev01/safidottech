/**
 * SectionDivider
 * ─────────────────────────────────────────────────────────────
 * Irregular full-width SVG wave to mask the junction between 
 * two starkly contrasting section background colors.
 * 
 * Angle: ~3 degrees, mimicking a subtle architectural slope.
 */
import { memo } from 'react'

export const SectionDivider = memo(function SectionDivider({ 
  fillColor = 'var(--color-bg)',
  flip = false,
  className = '' 
}) {
  return (
    <div 
      className={`w-full leading-none z-10 relative ${flip ? 'rotate-180' : ''} ${className}`}
      style={{ marginTop: '-1px', marginBottom: '-1px' }} // Prevent 1px pixel-gaps
      aria-hidden="true"
    >
      <svg 
        viewBox="0 0 1440 60" 
        preserveAspectRatio="none" 
        className="w-full h-[40px] sm:h-[60px]"
        fill={fillColor}
      >
        <path d="M 0,0 L 1440,0 L 1440,60 Q 720,20 0,60 Z" />
      </svg>
    </div>
  )
})

export default SectionDivider
