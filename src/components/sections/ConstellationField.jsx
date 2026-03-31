/**
 * ConstellationField
 * ─────────────────────────────────────────────────────────────
 * Procedural neural-topology background using the HTML5 Canvas API.
 * 
 * PERFORMANCE STRATEGY (Phase 0 Resolution):
 * To protect the 16ms animation budget, this component uses node-pooling.
 * It renders ~35 nodes and connections exactly ONCE into the canvas context 
 * and then halts the `requestAnimationFrame` loop. No persistent CPU usage.
 */
import { useEffect, useRef, memo } from 'react'

export const ConstellationField = memo(function ConstellationField({ 
  className = '' 
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true })
    if (!ctx) return

    let animationFrameId
    const NODE_COUNT = 35
    const MAX_DISTANCE = 150
    // Electric Forest Pro: lime
    const NODE_COLOR = 'rgba(170, 255, 0, 0.15)'
    const LINE_COLOR = 'rgba(170, 255, 0, 0.04)'

    // Node Pool allocation
    let nodes = []

    const init = () => {
      // Scale canvas safely
      const { width, height } = canvas.parentElement.getBoundingClientRect()
      // Use devicePixelRatio for crisp rendering on retina
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
      
      // Populate pool once
      nodes = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height
      }))

      // Respect prefers-reduced-motion: if true, immediately draw and finish.
      // Even if false, we draw statically to save CPU, but keeping architecture 
      // ready for floating animations later if budget allows.
      draw(width, height)
    }

    const draw = (w, h) => {
      ctx.clearRect(0, 0, w, h)
      
      // Draw nodes
      ctx.fillStyle = NODE_COLOR
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        ctx.beginPath()
        ctx.arc(node.x, node.y, 1, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw neuronal connections
      ctx.lineWidth = 0.5
      ctx.strokeStyle = LINE_COLOR
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const distSq = dx * dx + dy * dy

          if (distSq < MAX_DISTANCE * MAX_DISTANCE) {
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }
    }

    init()

    // Handle Resize (debounce heavily)
    let resizeTimer
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        init()
      }, 200)
    }
    
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  )
})

export default ConstellationField
