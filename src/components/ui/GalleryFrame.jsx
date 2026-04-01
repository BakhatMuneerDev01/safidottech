import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from './Icon.jsx'

/**
 * GalleryFrame (P3-02 Portfolio Preview)
 * ─────────────────────────────────────────────────────────────
 * Display card for case studies. Uses cinematic image zoom
 * and staggered icon reveals.
 */
export function GalleryFrame({ imageSrc, title, subtitle, stack = [], linkText = "View Protocol", className = '' }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className={`relative w-full h-[450px] rounded-xl overflow-hidden bg-[#060A06] border border-[rgba(255,255,255,0.05)] group cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. Cinematic Zoom Background */}
      <motion.div
         className="absolute inset-0 w-full h-full bg-cover bg-center origin-center"
         style={{ backgroundImage: `url(${imageSrc})`, willChange: 'transform' }}
         initial={{ scale: 1.0 }}
         animate={{ scale: isHovered ? 1.08 : 1.0 }}
         transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
      />

      {/* 2. Optical Gradient Overlay: Rises on hover */}
      <motion.div 
        className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#060A06] to-transparent pointer-events-none" 
        initial={{ height: '40%', opacity: 0.8 }}
        animate={{ height: isHovered ? '70%' : '40%', opacity: isHovered ? 1 : 0.8 }}
        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
      />

      {/* 3. Tech Stack Stagger (Top Right) */}
      <div className="absolute top-4 right-4 flex gap-2">
        <AnimatePresence>
          {isHovered && stack.map((iconStr, i) => (
             <motion.div
               key={iconStr}
               initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
               animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
               exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
               transition={{ duration: 0.3, delay: i * 0.06 }}
               className="w-8 h-8 rounded-full bg-[rgba(14,19,14,0.8)] backdrop-blur border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[#F0FFF0]"
             >
               <Icon name={iconStr} size={14} />
             </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 4. Meta Information (Bottom Left) */}
      <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
        <div className="flex flex-col">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#AAFF00] mb-2">{subtitle}</span>
          <h4 className="text-2xl font-bold text-[#F0FFF0]" style={{ fontFamily: 'var(--font-display)' }}>{title}</h4>
        </div>

        {/* Action Link Slide */}
        <div className="overflow-hidden flex items-center gap-2">
           <span className="font-mono text-xs tracking-widest uppercase text-[#F0FFF0] opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
             {linkText}
           </span>
           <div className="w-10 h-10 rounded-full border border-[rgba(170,255,0,0.3)] flex items-center justify-center text-[#AAFF00] group-hover:bg-[#AAFF00] group-hover:text-black transition-colors duration-400">
              <Icon name="arrow-up-right" size={20} />
           </div>
        </div>
      </div>
    </div>
  )
}

export default GalleryFrame
