import { useState, forwardRef } from 'react'
import { motion } from 'framer-motion'

/**
 * Input Field Primitive (P2-06)
 * ─────────────────────────────────────────────────────────────
 * Base input field with Form Focus Atmosphere glow effects.
 */
export const Input = forwardRef(({ 
  className = '', 
  type = 'text', 
  error,
  label,
  id,
  ...props 
}, ref) => {
  const [isFocused, setIsFocused] = useState(false)

  // Using raw hex codes to fulfill the CLI prompt exact match
  return (
    <div className={`flex flex-col w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="text-xs font-mono tracking-widest uppercase text-[#F0FFF0] mb-2 pl-1 opacity-80">
          {label}
        </label>
      )}
      
      <div className="relative w-full">
        {/* Glow Element positioned behind the input */}
        <motion.div
           initial={{ opacity: 0, scale: 0.98 }}
           animate={{ 
             opacity: isFocused ? 1 : 0,
             scale: isFocused ? 1 : 0.98 
           }}
           transition={{ duration: 0.3 }}
           className="absolute inset-0 rounded-[10px] pointer-events-none"
           style={{ boxShadow: '0 0 20px rgba(170,255,0,0.15)' }}
        />

        <input
          ref={ref}
          id={id}
          type={type}
          onFocus={(e) => {
            setIsFocused(true)
            if (props.onFocus) props.onFocus(e)
          }}
          onBlur={(e) => {
            setIsFocused(false)
            if (props.onBlur) props.onBlur(e)
          }}
          className={`relative w-full bg-[#0E130E] text-[#F0FFF0] border rounded-[10px] px-4 py-3 placeholder:text-[rgba(240,255,240,0.3)] transition-all duration-300 outline-none
            ${error 
              ? 'border-red-500 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]' 
              : 'border-[rgba(170,255,0,0.2)] focus:border-[#AAFF00] focus:shadow-[0_0_0_3px_rgba(170,255,0,0.1)]'
            }`}
          {...props}
        />
      </div>

      {error && (
        <span className="text-red-500 text-xs mt-1 pl-1 font-medium">{error}</span>
      )}
    </div>
  )
})

Input.displayName = 'Input'
export default Input
