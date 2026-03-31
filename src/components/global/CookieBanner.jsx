import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('safi_cookie_consent')
    if (!consent) {
      // Small delay so it feels like an entrance rather than an immediate block
      const timer = setTimeout(() => setIsVisible(true), 1000)
      return () => clearTimeout(timer)
    }
    setHasMounted(true)
  }, [])

  const handleAccept = () => {
    localStorage.setItem('safi_cookie_consent', 'accepted')
    setIsVisible(false)
  }

  const handlePreferences = () => {
    localStorage.setItem('safi_cookie_consent', 'managed')
    setIsVisible(false)
  }

  if (!hasMounted && !isVisible) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 w-full z-[400] p-4 sm:p-6 pointer-events-none"
        >
          <div className="max-w-7xl mx-auto flex justify-center w-full">
            {/* GLASS Mood Box */}
            <div 
              className="bg-[rgba(14,19,14,0.65)] backdrop-blur-[16px] border border-[rgba(170,255,0,0.1)] border-t-[rgba(170,255,0,0.1)] rounded-lg p-5 sm:p-8 w-full shadow-2xl pointer-events-auto flex flex-col md:flex-row items-center gap-6"
            >
              <div className="flex-1 text-center md:text-left">
                <p className="text-sm sm:text-base text-[#F0FFF0] leading-relaxed">
                  We use cookies to deliver a premium experience, analyze site traffic, and optimize our services. 
                  By accepting, you agree to our privacy framework.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full md:w-auto">
                <button 
                  onClick={handlePreferences}
                  className="w-full sm:w-auto px-6 py-2.5 rounded border border-[rgba(240,255,240,0.2)] text-[#F0FFF0] hover:bg-[rgba(255,255,255,0.05)] transition-colors text-sm font-semibold whitespace-nowrap"
                >
                  Manage Preferences
                </button>
                <button 
                  onClick={handleAccept}
                  className="w-full sm:w-auto px-6 py-2.5 rounded bg-[#AAFF00] hover:bg-[#88CC00] transition-colors text-black text-sm font-bold whitespace-nowrap"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CookieBanner
