function App() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-10 px-6"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      {/* Clash Display — display font */}
      <div className="text-center space-y-2">
        <p style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
          var(--font-display) — Clash Display
        </p>
        <h1 style={{ color: 'var(--color-lime)', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '3rem', lineHeight: 1.1 }}>
          Electric Forest Pro
        </h1>
        <h2 style={{ color: 'var(--color-text)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '2rem', lineHeight: 1.1 }}>
          Premium Digital Solutions
        </h2>
        <h3 style={{ color: 'var(--color-teal)', fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '1.5rem', lineHeight: 1.1 }}>
          Section Heading Medium
        </h3>
      </div>

      {/* Satoshi — body font */}
      <div className="max-w-xl text-center space-y-2">
        <p style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
          var(--font-body) — Satoshi
        </p>
        <p style={{ color: 'var(--color-text)', fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: '1rem', lineHeight: 1.6 }}>
          Regular 400 — The quick brown fox jumps over the lazy dog. Smooth rendering with antialiasing active.
        </p>
        <p style={{ color: 'var(--color-text)', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '1rem', lineHeight: 1.6 }}>
          Medium 500 — Every @font-face declaration uses font-display: swap for zero FOIT.
        </p>
        <p style={{ color: 'var(--color-text)', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1rem', lineHeight: 1.6 }}>
          Bold 700 — Self-hosted WOFF2 from public/fonts/ — no CDN calls.
        </p>
      </div>

      {/* JetBrains Mono */}
      <div className="text-center space-y-2">
        <p style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
          var(--font-mono) — JetBrains Mono
        </p>
        <code style={{
          color: 'var(--color-lime)',
          fontFamily: 'var(--font-mono)',
          fontWeight: 400,
          fontSize: '0.9rem',
          backgroundColor: 'var(--color-surface)',
          padding: '8px 16px',
          borderRadius: '6px',
          display: 'block'
        }}>
          @font-face &#123; font-display: swap; &#125;
        </code>
      </div>

      <p style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>
        P1-03 Font System Active ✓ — Place WOFF2 files in /public/fonts/ to activate
      </p>
    </div>
  )
}

export default App
