function App() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-8"
      style={{ backgroundColor: 'var(--color-bg)', fontFamily: 'var(--font-body)' }}
    >
      {/* Token verification panel */}
      <h1
        className="text-4xl font-bold tracking-tight animate-glow-breathe"
        style={{ color: 'var(--color-lime)', fontFamily: 'var(--font-display)' }}
      >
        SAFI DOT TECH
      </h1>

      {/* Colour swatches */}
      <div className="flex gap-3 flex-wrap justify-center">
        {[
          ['bg', '#060A06'],
          ['surface', '#0E130E'],
          ['surface-2', '#161C16'],
          ['lime', '#AAFF00'],
          ['teal', '#00FFB2'],
          ['whatsapp', '#25D366'],
          ['muted', '#6B7F6B'],
        ].map(([label, hex]) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <div
              className="w-12 h-12 rounded-lg border border-white/10"
              style={{ backgroundColor: hex }}
            />
            <span
              className="text-xs"
              style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Shimmer card */}
      <div
        className="relative w-72 h-24 rounded-xl overflow-hidden"
        style={{ backgroundColor: 'var(--color-surface)', padding: 'var(--card-pad)' }}
      >
        <div className="animate-card-shimmer absolute inset-0" />
        <p className="relative z-10 text-sm" style={{ color: 'var(--color-text)' }}>
          Card Shimmer Active ✓
        </p>
      </div>

      {/* Skeleton */}
      <div className="animate-skeleton w-72 h-6 rounded-md" />

      {/* Pulse ring demo */}
      <div className="relative w-12 h-12 flex items-center justify-center">
        <div
          className="animate-pulse-ring absolute inset-0 rounded-full"
          style={{ backgroundColor: 'var(--color-whatsapp)' }}
        />
        <div
          className="relative z-10 w-full h-full rounded-full flex items-center justify-center text-white font-bold text-xs"
          style={{ backgroundColor: 'var(--color-whatsapp)' }}
        >
          WA
        </div>
      </div>

      <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
        P1-02 Design Tokens Active ✓
      </p>
    </div>
  )
}

export default App
