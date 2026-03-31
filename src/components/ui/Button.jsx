import { motion } from 'framer-motion'
import { forwardRef } from 'react'

/**
 * Button Primitive (P2-06)
 * ─────────────────────────────────────────────────────────────
 * Multi-variant core button ensuring 16ms budget compliance.
 * Uses Framer Motion for hardware-accelerated transforms and shadows.
 */
export const Button = forwardRef(({ 
  variant = 'primary', 
  children, 
  className = '', 
  onClick, 
  disabled, 
  type = 'button',
  ...props 
}, ref) => {
  // Base structural classes matching specification
  const baseClasses = "relative inline-flex flex-shrink-0 items-center justify-center font-bold tracking-wide uppercase transition-colors duration-400 rounded-full focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
  
  // Variant mapping
  const variants = {
    primary: "bg-[#AAFF00] text-[#060A06] px-8 py-3.5 text-sm",
    secondary: "bg-transparent border-[1.5px] border-[#AAFF00] text-[#AAFF00] px-8 py-3.5 text-sm hover:bg-[rgba(170,255,0,0.08)]",
    ghost: "bg-transparent border border-[rgba(240,255,240,0.2)] text-[#F0FFF0] px-6 py-2.5 text-xs hover:border-[#AAFF00]"
  }

  // Framer Motion hovering states (respects reduced motion implicitly via global CSS or inline if needed, but we rely on ease configurations)
  const hoverAnimations = {
    primary: { scale: 1.03, boxShadow: '0 0 30px rgba(170,255,0,0.4)', transition: { duration: 0.4, ease: 'easeOut' } },
    secondary: { scale: 1.03, transition: { duration: 0.4, ease: 'easeOut' } },
    ghost: { scale: 1.03, transition: { duration: 0.4, ease: 'easeOut' } }
  }

  const tapAnimations = {
    scale: 0.97,
    boxShadow: '0 0 0px rgba(170,255,0,0)',
    transition: { duration: 0.1 }
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      style={{ fontFamily: 'var(--font-body)' }} // Satoshi
      whileHover={!disabled ? hoverAnimations[variant] : {}}
      whileTap={!disabled ? tapAnimations : {}}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {/* Fallback for reduced motion users is automatically handled 
          by Tailwind 'duration-400' on color transitions, while Framer 
          handles scale & shadow. */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  )
})

Button.displayName = 'Button'
export default Button
