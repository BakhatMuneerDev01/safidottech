import { useCursorParticles } from '../../hooks/useCursorParticles.js'

/**
 * CursorParticles Wrapper (P2-05)
 * ─────────────────────────────────────────────────────────────
 * Top-level fixed container tracking 100vw/100vh. Pointer events none.
 */
export function CursorParticles() {
  const containerRef = useCursorParticles()

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-[8000] overflow-hidden hidden md:block" 
      aria-hidden="true"
    />
  )
}

export default CursorParticles
