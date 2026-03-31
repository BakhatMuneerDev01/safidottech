import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import Icon from '../ui/Icon.jsx'
import { useLenis } from '../../hooks/useLenis.js'

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)
  const lenis = useLenis()

  useEffect(() => {
    const isDismissed = localStorage.getItem('safi_announcement_dismissed')
    if (!isDismissed) {
      setIsVisible(true)
    }
    setHasMounted(true)
  }, [])

  const handleDismiss = () => {
    localStorage.setItem('safi_announcement_dismissed', 'true')
    setIsVisible(false)
    
    // Notify Lenis that the DOM layout has changed so it doesn't cause a scroll jump
    setTimeout(() => {
      if (lenis) lenis.resize()
    }, 250) // Wait for the 200ms animation to finish
  }

  if (!hasMounted) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 44, opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeIn' }}
          className="w-full bg-[#AAFF00] text-[#060A06] overflow-hidden flex items-center justify-center px-4 z-[101] relative"
        >
          <div className="flex items-center justify-between w-full max-w-7xl">
            <Link 
              to="/founding-client" 
              className="flex-1 flex justify-center items-center hover:opacity-80 transition-opacity"
            >
              <span className="text-sm font-bold tracking-wide" style={{ fontFamily: 'var(--font-body)' }}>
                🚀 Founding Client Offer — 20% Off First 5 Projects <span className="underline ml-1">Learn More</span>
              </span>
            </Link>
            <button 
              onClick={handleDismiss} 
              className="flex-shrink-0 ml-4 hover:bg-[rgba(0,0,0,0.1)] rounded p-1 transition-colors"
              aria-label="Dismiss Announcement"
            >
              <Icon name="x-close" size={16} color="#060A06" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AnnouncementBar
