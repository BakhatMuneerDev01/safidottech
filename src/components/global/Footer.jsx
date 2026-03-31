import { Link } from 'react-router-dom'
import Icon from '../ui/Icon.jsx'

export function Footer() {
  return (
    <footer className="w-full bg-[#0E130E] text-[var(--color-text)] relative z-10 pt-16">
      <div className="max-w-7xl mx-auto px-[var(--section-pad-x)]">
        
        {/* Top: 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Services */}
          <div className="flex flex-col space-y-4 border-l border-[rgba(170,255,0,0.1)] pl-4">
            <h4 className="font-mono text-[var(--color-lime)] text-xs tracking-widest uppercase mb-2">Services</h4>
            {[
              'WordPress Development',
              'Shopify Development',
              'WooCommerce Development',
              'Custom Web Development',
              'SEO Services',
              'Social Media Advertising',
              'Speed Optimization'
            ].map(item => (
              <Link key={item} to={`/services/${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm hover:text-[var(--color-lime)] transition-colors text-[var(--color-muted)]">
                {item}
              </Link>
            ))}
          </div>

          {/* Column 2: Company */}
          <div className="flex flex-col space-y-4 border-l border-[rgba(170,255,0,0.1)] pl-4">
            <h4 className="font-mono text-[var(--color-lime)] text-xs tracking-widest uppercase mb-2">Company</h4>
            {['About', 'Portfolio', 'Blog', 'Contact', 'Careers'].map(item => (
              <Link key={item} to={`/${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm hover:text-[var(--color-lime)] transition-colors text-[var(--color-muted)]">
                {item}
              </Link>
            ))}
          </div>

          {/* Column 3: Support */}
          <div className="flex flex-col space-y-4 border-l border-[rgba(170,255,0,0.1)] pl-4">
            <h4 className="font-mono text-[var(--color-lime)] text-xs tracking-widest uppercase mb-2">Support</h4>
            <Link to="/contact" className="text-sm hover:text-[var(--color-lime)] transition-colors text-[var(--color-muted)]">Book a Call</Link>
            <Link to="/free-seo-audit" className="text-sm hover:text-[var(--color-lime)] transition-colors text-[var(--color-muted)]">Free SEO Audit</Link>
            <Link to="/free-speed-audit" className="text-sm hover:text-[var(--color-lime)] transition-colors text-[var(--color-muted)]">Free Speed Audit</Link>
            <Link to="/pricing" className="text-sm hover:text-[var(--color-lime)] transition-colors text-[var(--color-muted)]">Pricing</Link>
          </div>

          {/* Column 4: Legal */}
          <div className="flex flex-col space-y-4 border-l border-[rgba(170,255,0,0.1)] pl-4">
            <h4 className="font-mono text-[var(--color-lime)] text-xs tracking-widest uppercase mb-2">Legal</h4>
            <Link to="/privacy-policy" className="text-sm hover:text-[var(--color-lime)] transition-colors text-[var(--color-muted)]">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-sm hover:text-[var(--color-lime)] transition-colors text-[var(--color-muted)]">Terms of Service</Link>
            <Link to="/refund-policy" className="text-sm hover:text-[var(--color-lime)] transition-colors text-[var(--color-muted)]">Refund Policy</Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full bg-[#060A06] py-6 border-t border-[rgba(170,255,0,0.1)] px-[var(--section-pad-x)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[var(--color-muted)]">
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <span>© 2026 Safi Dot Tech</span>
            <span className="hidden md:inline">|</span>
            <span>Registered Business [Number]</span>
            <span className="hidden md:inline">|</span>
            <span className="flex items-center gap-1.5"><Icon name="check" size={14} className="text-green-500" /> SSL Secure</span>
          </div>
          
          <div className="text-center font-mono tracking-widest uppercase text-[10px]">
            Built with <span className="text-red-500">❤</span> in Pakistan
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
