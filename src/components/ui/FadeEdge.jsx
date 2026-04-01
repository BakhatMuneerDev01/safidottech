import { memo } from 'react'

/**
 * FadeEdge (P3-03 Transition Technique)
 * ─────────────────────────────────────────────────────────────
 * Smooths the junction between two contrasting sections using
 * a linear gradient overlay.
 */
export const FadeEdge = memo(function FadeEdge({ 
  fromColor, 
  toColor, 
  height = 80, 
  direction = 'down',
  className = '' 
}) {
  return (
    <div 
      className={`w-full relative z-10 pointer-events-none ${className}`}
      style={{ 
        height, 
        background: `linear-gradient(${direction === 'down' ? 'to bottom' : 'to top'}, ${fromColor}, ${toColor})`,
        marginTop: direction === 'down' ? `-${height}px` : 0,
        marginBottom: direction === 'up' ? `-${height}px` : 0
      }} 
      aria-hidden="true"
    />
  )
})

export default FadeEdge
