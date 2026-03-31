/**
 * GrainOverlay
 * ─────────────────────────────────────────────────────────────
 * Provides the subliminal atmospheric noise that creates the 
 * "tactile" or cinematic feel characteristic of premium sites.
 * Hardware-accelerated SVG filter, strictly inert to inputs.
 */
import { memo } from 'react'

export const GrainOverlay = memo(function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 99,
        opacity: 0.05,
      }}
    >
      <svg
        style={{ width: '100%', height: '100%', opacity: 1 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  )
})

export default GrainOverlay
