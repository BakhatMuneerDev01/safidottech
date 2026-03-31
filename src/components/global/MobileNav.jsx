import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import Icon from '../ui/Icon.jsx'
import ConstellationField from '../sections/ConstellationField.jsx'
import { useLenis } from '../../hooks/useLenis.js'

/**
 * MobileNav Overlay — Cinema Reveal (P2-03)
 * ─────────────────────────────────────────────────────────────
 * Dimensional clip-path overlay for tablet and mobile devices.
 */
export function MobileNav({ isOpen, onClose }) {
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const lenis = useLenis()
  const location = useLocation()

  // Scroll Lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      if (lenis) lenis.stop()
    } else {
      document.body.style.overflow = ''
      if (lenis) lenis.start()
      // Reset inline menus when closed
      setTimeout(() => setIsServicesOpen(false), 500)
    }
    return () => {
      document.body.style.overflow = ''
      if (lenis) lenis.start()
    }
  }, [isOpen, lenis])

  // Framer Motion Variants
  const overlayVariants = {
    hidden: {
      clipPath: 'circle(0% at calc(100% - 40px) 32px)',
      transition: { duration: 0.4, ease: [0.11, 0, 0.5, 0] } // expo.in
    },
    visible: {
      clipPath: 'circle(150% at calc(100% - 40px) 32px)',
      transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] } // expo.out
    }
  }

  const listContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,   // Wait for clip-path to finish opening
        staggerChildren: 0.06 // 60ms stagger per item
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } }
  }

  // Links data
  const navLinks = [
    { name: 'Pricing', path: '/pricing' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
  ]

  const servicesLinks = [
    'Web Development', 'Mobile Apps', 'AI Integrations', 
    'Branding', 'SEO & Performance', 'UX/UI Design', 'Copywriting'
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed top-0 left-0 w-full h-[100dvh] z-[500] text-[#F0FFF0] flex flex-col"
          style={{ backgroundColor: '#060A06' }} // hardcoded to bypass Tailwind v4 custom var compilation issue
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Layer 0: Background Dimensionality */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <ConstellationField className="opacity-25" />
          </div>

          {/* Layer 1: Header / Controls */}
          <div className="relative z-10 flex items-center justify-between p-[28px]">
            <Link to="/" onClick={onClose} className="text-2xl font-bold tracking-tighter" style={{ fontFamily: 'var(--font-display)' }}>
              SAFI<span style={{ color: 'var(--color-lime)' }}>.</span>
            </Link>
            
            <button 
              onClick={onClose}
              className="flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] transition-colors"
              aria-label="Close Navigation"
            >
              <Icon name="x-close" size={24} />
            </button>
          </div>

          {/* Layer 2: Scrollable Navigation List */}
          <div className="relative z-10 flex-1 overflow-y-auto px-[28px] mt-[40px] pb-[140px]">
            <motion.ul 
              className="flex flex-col space-y-6"
              variants={listContainerVariants}
              initial="hidden"
              animate="visible"
            >
              
              {/* Special Inline Expandable: Services */}
              <motion.li variants={itemVariants} className="flex flex-col">
                <button 
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="flex items-center justify-between w-full text-left font-bold text-[32px] sm:text-[36px] tracking-tight group"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  <span className={`transition-colors ${location.pathname.includes('/services') ? 'text-[var(--color-lime)]' : 'group-hover:text-[var(--color-lime)]'}`}>Services</span>
                  <motion.div
                    animate={{ rotate: isServicesOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <Icon name="chevron-down" size={24} className="group-hover:text-[var(--color-lime)] transition-colors" />
                  </motion.div>
                </button>
                
                {/* Services Sub-Menu Inline Expansion */}
                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: '16px' }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      className="flex flex-col space-y-4 pl-4 border-l-2 border-[rgba(170,255,0,0.1)] overflow-hidden"
                    >
                      {servicesLinks.map((sub, i) => {
                        const subPath = `/services/${sub.toLowerCase().replace(/\s+/g, '-')}`
                        return (
                          <li key={i}>
                            <Link 
                              to={subPath} 
                              onClick={onClose}
                              className={`text-lg transition-colors mobile-nav-link ${location.pathname === subPath ? 'active text-white' : 'text-[var(--color-muted)] hover:text-white'}`}
                            >
                              {sub}
                            </Link>
                          </li>
                        )
                      })}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </motion.li>

              {/* Standard Links */}
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path
                return (
                  <motion.li key={link.name} variants={itemVariants} className="flex">
                    <Link 
                      to={link.path}
                      onClick={onClose}
                      className={`mobile-nav-link relative font-bold text-[32px] sm:text-[36px] tracking-tight transition-colors ${isActive ? 'active text-[var(--color-lime)]' : 'hover:text-[var(--color-lime)]'}`}
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                )
              })}

              <motion.li variants={itemVariants} className="pt-8">
                <Link 
                  to="/contact" 
                  onClick={onClose}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-lime)] text-black rounded font-mono tracking-widest uppercase text-sm font-semibold hover:bg-[var(--color-lime-dim)] transition-colors"
                >
                  Book a Call <Icon name="arrow-right" size={16} />
                </Link>
              </motion.li>

            </motion.ul>
          </div>

          {/* Layer 3: Sticky Footer Contacts */}
          <motion.div 
            className="absolute bottom-0 left-0 w-full p-[28px] border-t border-[rgba(255,255,255,0.05)] flex justify-between items-center z-20"
            style={{ backgroundColor: '#060A06' }}
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.6, duration: 0.4, ease: 'easeOut' }}
          >
            <a href="tel:+1234567890" className="text-sm font-mono tracking-widest hover:text-[var(--color-lime)] transition-colors">
              INQ: +1 234 567 890
            </a>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-[var(--color-lime)] transition-colors"><Icon name="linkedin" size={20} /></a>
              <a href="#" className="hover:text-[var(--color-lime)] transition-colors"><Icon name="instagram" size={20} /></a>
            </div>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MobileNav
