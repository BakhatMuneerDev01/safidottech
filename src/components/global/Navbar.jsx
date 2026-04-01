import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../ui/Icon.jsx'
import MobileNav from './MobileNav.jsx'

/**
 * ChatPill Sub-component
 * ─────────────────────────────────────────────────────────────
 * Pre-filled WhatsApp entry point.
 * Minimum 44px tap target constraint enforced for accessibility.
 */
function ChatPill() {
  const WHATSAPP_NUMBER = '1234567890' // Replace with actual number
  const WHATSAPP_MESSAGE = encodeURIComponent('Hi SAFI DOT TECH, I would like to discuss a project.')
  const WP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`

  return (
    <a
      href={WP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 bg-[var(--color-lime)] hover:bg-[var(--color-lime-dim)] transition-colors min-h-[44px] px-4 rounded-full text-black font-semibold"
      aria-label="Start WhatsApp Chat"
    >
      <Icon name="whatsapp" size={20} color="black" />
      <span className="text-sm font-mono tracking-widest leading-none">CHAT</span>
    </a>
  )
}

/**
 * Glassmorphism Navbar (P2-02)
 * ─────────────────────────────────────────────────────────────
 * Dual-track responsive navigation.
 * Desktop: >= 1025px
 * Tablet/Mobile: <= 1024px 
 */
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  // Dynamic Scroll: increase border opacity past 50px
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    // Add passive listener for extreme scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 left-0 w-full z-[100] glass-nav ${isScrolled ? 'is-scrolled' : ''}`}
    >
      <div
        className="w-full flex items-center justify-between px-[var(--section-pad-x)] transition-all duration-300
                   h-[60px] sm:h-[64px] min-[1025px]:h-[72px]"
      >

        {/* ==================== LEFT: LOGO ==================== */}
        <div className="flex-shrink-0 flex items-center h-full">
          <Link to="/" className="text-2xl font-bold tracking-tighter" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>
            SAFI<span style={{ color: 'var(--color-lime)' }}>.</span>
          </Link>
        </div>

        {/* ==================== DESKTOP LAYOUT (>= 1025px) ==================== */}
        <div className="hidden min-[1025px]:flex items-center justify-center flex-1 mx-8 gap-8">
          <Link to="/services" className="nav-link font-medium text-sm">Services <Icon name="chevron-down" size={14} className="inline ml-1" /></Link>
          <Link to="/pricing" className="nav-link font-medium text-sm">Pricing</Link>
          <Link to="/portfolio" className="nav-link font-medium text-sm">Portfolio</Link>
          <Link to="/blog" className="nav-link font-medium text-sm">Blog</Link>
          <Link to="/about" className="nav-link font-medium text-sm">About</Link>
        </div>

        <div className="hidden min-[1025px]:flex items-center justify-end flex-shrink-0">
          <Link
            to="/contact"
            className="group relative px-6 py-2.5 bg-transparent border border-[var(--color-lime)] text-[var(--color-lime)] rounded overflow-hidden font-medium text-sm transition-colors hover:text-black"
          >
            <span className="relative z-10 font-mono tracking-widest uppercase text-xs">Book a Call</span>
            {/* Hover fill wipe */}
            <div className="absolute inset-0 bg-[var(--color-lime)] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 z-0"></div>
          </Link>
        </div>

        {/* ==================== TABLET/MOBILE LAYOUT (<= 1024px) ==================== */}
        <div className="flex min-[1025px]:hidden items-center justify-end gap-3 md:gap-4 flex-shrink-0">
          <ChatPill />

          <button
            type="button"
            className="flex items-center justify-center min-w-[44px] min-h-[44px] rounded hover:bg-[rgba(255,255,255,0.05)] transition-colors text-[var(--color-text)]"
            aria-label="Open Navigation Menu"
            onClick={() => setIsMobileNavOpen(true)}
          >
            <Icon name="hamburger" size={28} />
          </button>
        </div>

      </div>

      <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
    </header>
  )
}

export default Navbar
