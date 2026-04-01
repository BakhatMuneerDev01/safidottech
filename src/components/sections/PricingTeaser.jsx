import SectionLabel from '../ui/SectionLabel.jsx'
import CrystalSlab from '../ui/CrystalSlab.jsx'

/**
 * PricingTeaser Section (ELEVATED Mood) P3-03
 * ─────────────────────────────────────────────────────────────
 * Transparent pricing module with Crystal Slab cards.
 */
export function PricingTeaser() {
  const tiers = [
    { 
      title: 'WordPress', 
      price: '$800', 
      features: ['Elementor Pro', 'Yoast SEO Premium', 'Speed Hardening'],
      isFeatured: false 
    },
    { 
      title: 'Shopify', 
      price: '$1,200', 
      features: ['Headless Ready', 'Theme Customization', 'App Integration'],
      isFeatured: true 
    },
    { 
      title: 'Speed Audit', 
      price: '$300', 
      features: ['Lighthouse 95+ Audit', 'Fix Plan', 'CDN Strategy'],
      isFeatured: false 
    },
    { 
      title: 'Custom MERN', 
      price: '$3,000', 
      features: ['React Dashboard', 'Node API', 'Postgres/Mongo'],
      isFeatured: false 
    }
  ]

  return (
    <section className="section-elevated relative w-full py-32 bg-[#161C16] px-[var(--section-pad-x)]">
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        <SectionLabel text="◉ TRANSPARENT PRICING" className="mb-12" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {tiers.map((t, i) => (
            <CrystalSlab 
              key={i}
              title={t.title}
              price={t.price}
              features={t.features}
              isFeatured={t.isFeatured}
            />
          ))}
        </div>

        <p className="mt-16 text-center text-xs font-mono tracking-widest text-[var(--color-muted)] uppercase">
          All tiers include 3 months of priority support & maintenance.
        </p>
      </div>
    </section>
  )
}

export default PricingTeaser
