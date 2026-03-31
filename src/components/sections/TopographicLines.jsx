/**
 * TopographicLines
 * ─────────────────────────────────────────────────────────────
 * Renders irregular concentric SVG curves mimicking terrain topology.
 * Provides subliminal depth at --color-lime 3% opacity.
 */
import { memo } from 'react'

export const TopographicLines = memo(function TopographicLines({ 
  className = '' 
}) {
  return (
    <div 
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <svg 
        viewBox="0 0 1000 1000" 
        preserveAspectRatio="xMidYMid slice" 
        className="w-full h-full opacity-60"
        style={{ stroke: 'rgba(170, 255, 0, 0.03)', strokeWidth: '1.5', fill: 'none' }}
      >
        <path d="M -100,500 Q 200,200 500,400 T 1100,600" />
        <path d="M -100,600 Q 250,300 550,500 T 1100,700" />
        <path d="M -100,700 Q 300,400 600,600 T 1100,800" />
        <path d="M -100,800 Q 350,500 650,700 T 1100,900" />
        <path d="M -100,900 Q 400,600 700,800 T 1100,1000" />
        <path d="M -100,1000 Q 450,700 750,900 T 1100,1100" />
      </svg>
    </div>
  )
})

export default TopographicLines
