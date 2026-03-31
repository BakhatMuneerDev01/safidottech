import Icon from '../ui/Icon.jsx'

/**
 * WhatsAppButton (P2-05)
 * ─────────────────────────────────────────────────────────────
 * Fixed pulsing floating action button for instant chat conversion.
 */
export function WhatsAppButton() {
  const WHATSAPP_NUMBER = '1234567890' // Real number mapped via env eventually
  const MESSAGE = encodeURIComponent('Hi SAFI DOT TECH, I would like to discuss a project.')
  const WP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${MESSAGE}`

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[9999]">
      <div className="relative group flex items-center justify-center">
        {/* The Pulsing Pseudo-Ring */}
        <div className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-pulse-ring pointer-events-none"></div>
        
        {/* The Core Button */}
        <a 
          href={WP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center justify-center w-[56px] h-[56px] md:w-[52px] md:h-[52px] rounded-full bg-[#25D366] hover:bg-[#1EBE5D] transition-colors shadow-[0_0_20px_rgba(170,255,0,0.3)] hover:scale-105 active:scale-95 duration-200"
          aria-label="Start WhatsApp Chat"
        >
          <Icon name="whatsapp" size={24} color="#ffffff" className="md:w-6 md:h-6 w-7 h-7" />
        </a>
      </div>
    </div>
  )
}

export default WhatsAppButton
