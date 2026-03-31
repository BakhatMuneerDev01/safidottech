import Icon from './components/ui/Icon.jsx'

const ICONS = [
  { name: 'whatsapp',     group: 'Brand/UI' },
  { name: 'hamburger',    group: 'Brand/UI' },
  { name: 'close',        group: 'Brand/UI' },
  { name: 'x-close',      group: 'Brand/UI' },
  { name: 'menu-dot',     group: 'Brand/UI' },
  { name: 'arrow-right',  group: 'Navigation' },
  { name: 'chevron-down', group: 'Navigation' },
  { name: 'check',        group: 'Navigation' },
  { name: 'star',         group: 'Navigation' },
  { name: 'copy',         group: 'Navigation' },
  { name: 'linkedin',     group: 'Social' },
  { name: 'instagram',    group: 'Social' },
  { name: 'twitter',      group: 'Social' },
  { name: 'facebook',     group: 'Social' },
  { name: 'youtube',      group: 'Social' },
  { name: 'mail',         group: 'Contact' },
  { name: 'phone',        group: 'Contact' },
  { name: 'calendar',     group: 'Contact' },
  { name: 'shield',       group: 'Contact' },
  { name: 'speed',        group: 'Services' },
  { name: 'search',       group: 'Services' },
  { name: 'code',         group: 'Services' },
  { name: 'shop',         group: 'Services' },
  { name: 'wordpress',    group: 'Services' },
]

const GROUPS = [...new Set(ICONS.map(i => i.group))]
const COLORS = ['currentColor', 'var(--color-lime)', 'var(--color-teal)', 'var(--color-muted)']

function App() {
  return (
    <div
      className="min-h-screen p-10"
      style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}
    >
      <h1
        className="text-4xl font-bold mb-2"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-lime)' }}
      >
        P1-04 — SVG Icon System
      </h1>
      <p className="mb-10" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
        24 icons · import.meta.glob · React.lazy · Suspense · currentColor
      </p>

      {/* Color demo row */}
      <div className="flex items-center gap-6 mb-12 flex-wrap">
        <span style={{ color: 'var(--color-muted)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>Color inheritance:</span>
        {COLORS.map((color) => (
          <div key={color} className="flex items-center gap-2">
            <Icon name="star" size={20} color={color} />
            <code style={{ color: 'var(--color-muted)', fontSize: '0.7rem', fontFamily: 'var(--font-mono)' }}>{color}</code>
          </div>
        ))}
        {/* Size demo */}
        {[16, 20, 24, 32].map(size => (
          <div key={size} className="flex items-center gap-1">
            <Icon name="search" size={size} color="var(--color-teal)" />
            <code style={{ color: 'var(--color-muted)', fontSize: '0.7rem', fontFamily: 'var(--font-mono)' }}>{size}px</code>
          </div>
        ))}
      </div>

      {/* Icon grid by group */}
      {GROUPS.map(group => (
        <div key={group} className="mb-10">
          <h2
            className="text-sm font-semibold mb-4 uppercase tracking-widest"
            style={{ color: 'var(--color-lime)', fontFamily: 'var(--font-mono)' }}
          >
            {group}
          </h2>
          <div className="flex flex-wrap gap-4">
            {ICONS.filter(i => i.group === group).map(({ name }) => (
              <div
                key={name}
                className="flex flex-col items-center gap-2 p-4 rounded-xl"
                style={{ backgroundColor: 'var(--color-surface)', border: '1px solid rgba(255,255,255,0.06)', minWidth: '80px' }}
              >
                <Icon name={name} size={24} color="var(--color-text)" />
                <span style={{ color: 'var(--color-muted)', fontSize: '0.65rem', fontFamily: 'var(--font-mono)' }}>
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Missing icon fallback demo */}
      <div className="mt-4">
        <h2 className="text-sm font-semibold mb-4 uppercase tracking-widest" style={{ color: 'var(--color-error)', fontFamily: 'var(--font-mono)' }}>
          Fallback (missing icon graceful handling)
        </h2>
        <div className="flex items-center gap-3">
          <Icon name="does-not-exist" size={24} color="var(--color-error)" />
          <code style={{ color: 'var(--color-muted)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
            {'<Icon name="does-not-exist" />'}  — renders broken-icon placeholder, no crash
          </code>
        </div>
      </div>

      <p className="mt-12 text-xs" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}>
        P1-04 Icon System Active ✓ — No lucide-react · No react-icons · Zero external deps
      </p>
    </div>
  )
}

export default App
