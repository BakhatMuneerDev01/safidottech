import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Icon from './Icon.jsx'

/**
 * LitPanel (P3-02 Services Grid)
 * ─────────────────────────────────────────────────────────────
 * Hardware-accelerated 3D tilt and magnetic card component.
 */
export function LitPanel({ title, description, iconName, className = '' }) {
  const ref = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  
  // Motion Values for exact coordinate mapping
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Spring dampening for cinematic momentum
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 })

  // Desktop mappings: ±4deg tilt, ±6px translation constraints
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['4deg', '-4deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-4deg', '4deg'])
  const translateX = useTransform(mouseXSpring, [-0.5, 0.5], ['-6px', '6px'])
  const translateY = useTransform(mouseYSpring, [-0.5, 0.5], ['-6px', '6px'])

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    // Calculate normalized position (-0.5 to 0.5) from card center
    const localX = e.clientX - rect.left
    const localY = e.clientY - rect.top
    const centerX = localX / rect.width - 0.5
    const centerY = localY / rect.height - 0.5
    
    x.set(centerX)
    y.set(centerY)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  // Pre-check reduced motion via CSS logic (Framer Motion handles will-change auto optimizations during animation, 
  // but we enforce it during hover manually via style).
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative group w-full h-[320px] rounded-xl overflow-hidden cursor-crosshair border border-[rgba(170,255,0,0.05)] bg-[#0A0F0A] p-8 flex flex-col justify-between ${className}`}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        x: isHovered ? translateX : 0,
        y: isHovered ? translateY : 0,
        transformStyle: 'preserve-3d',
        willChange: isHovered ? 'transform' : 'auto'
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 30 }}
    >
      {/* 1. Ambient Shimmer Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none animate-card-shimmer mix-blend-screen opacity-10"
        style={{
          background: 'linear-gradient(135deg, transparent 20%, rgba(170,255,0,1) 50%, transparent 80%)',
          backgroundSize: '200% 200%'
        }}
        aria-hidden="true"
      />

      {/* 2. Top-inset Highlight Bar */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(170,255,0,0.4)] to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* 3. Left-accent Gradient Bar */}
      <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-gradient-to-b from-[#AAFF00] to-transparent opacity-30 group-hover:opacity-80 transition-opacity duration-500" />

      {/* 4. Top-Right Corner Bracket */}
      <div className="absolute top-4 right-4 text-[rgba(170,255,0,0.3)] group-hover:text-[rgba(170,255,0,0.8)] transition-colors duration-400">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6V18H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* 5. Content Block */}
      <div className="relative z-10 flex-1 flex flex-col justify-end" style={{ transform: 'translateZ(30px)' }}>
        <div className="w-12 h-12 bg-[rgba(170,255,0,0.05)] rounded-full flex items-center justify-center mb-6 text-[#AAFF00] group-hover:scale-110 transition-transform duration-500">
           <Icon name={iconName} size={24} />
        </div>
        <h3 className="text-2xl font-bold text-[#F0FFF0] mb-3" style={{ fontFamily: 'var(--font-display)' }}>
          {title}
        </h3>
        <p className="text-[var(--color-muted)] text-sm leading-relaxed group-hover:text-[#F0FFF0] transition-colors duration-400">
          {description}
        </p>
      </div>

    </motion.div>
  )
}

export default LitPanel
