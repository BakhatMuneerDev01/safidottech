import Icon from './Icon.jsx'

/**
 * SectionLabel Primitive (P2-06)
 * ─────────────────────────────────────────────────────────────
 * Micro-typography component used to introduce semantic sections.
 * Features 0.15em tracking and the menu-dot prefix.
 */
export function SectionLabel({ text, className = '' }) {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <Icon name="menu-dot" size={12} color="#AAFF00" />
      <span
        className="text-xs font-bold uppercase text-[#AAFF00] tracking-[0.15em]"
        style={{ fontFamily: 'var(--font-body)' }} // Satoshi
      >
        {text}
      </span>
    </div>
  )
}

export default SectionLabel
