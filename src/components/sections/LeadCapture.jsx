import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TopographicLines from './TopographicLines.jsx'
import ConstellationField from './ConstellationField.jsx'
import SectionLabel from '../ui/SectionLabel.jsx'
import Button from '../ui/Button.jsx'

/**
 * LeadCapture Section (ATMOSPHERE Mood) P3-03
 * ─────────────────────────────────────────────────────────────
 * Features "Form Focus Atmosphere" where the entire section
 * reacts to user engagement with a color shift.
 */
export function LeadCapture() {
  const [isFocused, setIsFocused] = useState(false)
  const [focusPosition, setFocusPosition] = useState({ x: 0, y: 0 })

  const handleFocus = (e) => {
    const rect = e.target.getBoundingClientRect()
    const parentRect = e.currentTarget.getBoundingClientRect()
    // Local coordinates relative to section
    setFocusPosition({
      x: rect.left - parentRect.left + rect.width / 2,
      y: rect.top - parentRect.top + rect.height / 2
    })
    setIsFocused(true)
  }

  const handleBlur = () => setIsFocused(false)

  return (
    <motion.section 
      className="relative w-full py-32 overflow-hidden px-[var(--section-pad-x)]"
      initial={{ backgroundColor: '#060A06' }}
      animate={{ backgroundColor: isFocused ? '#1E2A1E' : '#060A06' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      onFocusCapture={handleFocus}
      onBlurCapture={handleBlur}
    >
      {/* 1. Layers Atmosphere */}
      <TopographicLines className="z-0 opacity-20" />
      <ConstellationField className="z-0 opacity-10 pointer-events-none" />
      
      {/* 2. Static Mood Glow (rgba(170,255,0,0.08)) */}
      <div 
        className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-[rgba(170,255,0,0.08)] blur-[120px] pointer-events-none z-0" 
      />

      {/* 3. Interactive Focus Glow (Opacity: 0.4 behind input) */}
      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.4, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute w-[300px] h-[300px] rounded-full bg-[rgba(170,255,0,0.15)] blur-[80px] pointer-events-none z-0"
            style={{ left: focusPosition.x - 150, top: focusPosition.y - 150 }}
            transition={{ type: 'spring', damping: 25, stiffness: 150 }}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
        <SectionLabel text="◉ FINAL ASSEMBLY" className="mb-8" />
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#F0FFF0] mb-8" style={{ fontFamily: 'var(--font-display)' }}>
          Get our free Website <br /> <span className="text-[#00FFB2]">Launch Checklist</span>
        </h2>
        
        <p className="text-lg text-[var(--color-muted)] max-w-xl mb-12">
          Everything we check before pushing the button. From Lighthouse scores to DNS verification.
        </p>

        {/* Lead Capture Form */}
        <form className="w-full max-w-md flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Your Name" 
              className="w-full h-14 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-lg px-6 text-[#F0FFF0] focus:border-[#AAFF00] focus:bg-[rgba(170,255,0,0.02)] transition-all outline-none"
            />
          </div>
          <div className="relative">
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full h-14 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-lg px-6 text-[#F0FFF0] focus:border-[#AAFF00] focus:bg-[rgba(170,255,0,0.02)] transition-all outline-none"
            />
          </div>
          <Button variant="primary" className="h-14 mt-4">
            Send the Checklist
          </Button>
          
          <p className="text-[10px] uppercase font-mono tracking-widest text-[var(--color-muted)] opacity-40 mt-4">
            Zero spam. High-output content only.
          </p>
        </form>
      </div>
    </motion.section>
  )
}

export default LeadCapture
