import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from './Icon.jsx'

/**
 * Accordion Primitive (P2-06)
 * ─────────────────────────────────────────────────────────────
 * Expandable panel with chevron rotation and active background shift.
 */
export function Accordion({ title, children, className = '', defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className={`border-b border-[rgba(170,255,0,0.15)] overflow-hidden transition-colors duration-400 ${isOpen ? 'bg-[#161C16]' : 'bg-transparent'} ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 px-4 outline-none group"
        aria-expanded={isOpen}
      >
        <span 
          className="font-bold text-[#F0FFF0] text-lg text-left tracking-tight group-hover:text-[#AAFF00] transition-colors"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {title}
        </span>
        
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="flex-shrink-0 ml-4 group-hover:text-[#AAFF00] transition-colors text-[#F0FFF0]"
        >
          <Icon name="chevron-down" size={24} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }} 
          >
            <div className="pb-5 px-4 text-[#F0FFF0] opacity-80 leading-relaxed text-sm md:text-base">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Accordion
