import { Suspense, lazy, memo } from 'react'

/**
 * Icon — Dynamic SVG Icon System
 * ─────────────────────────────────────────────────────────────
 * Loads SVGs from src/assets/icons/ on demand via import.meta.glob.
 * Each SVG is a separate chunk — zero upfront cost.
 *
 * Usage:
 *   <Icon name="whatsapp" />
 *   <Icon name="arrow-right" size={20} color="var(--color-lime)" />
 *   <Icon name="mail" className="text-lime-400" />     ← inherits currentColor
 *
 * Props:
 *   name      {string}  — filename without .svg (required)
 *   size      {number}  — width & height in px (default: 24)
 *   color     {string}  — CSS color value (default: 'currentColor')
 *   className {string}  — additional CSS classes
 *   title     {string}  — accessible title for screen readers
 */

// Eagerly build the map at module parse time (zero runtime cost per call).
// Keys → '../../assets/icons/whatsapp.svg?react'
// Values → () => Promise<{ default: React.FC<SVGProps> }>
const svgModules = import.meta.glob('../../assets/icons/*.svg', {
  query: '?react',
  import: 'default',
})

// Cache of React.lazy() wrappers — created once per icon name.
const lazyCache = {}

function getLazyIcon(name) {
  if (!lazyCache[name]) {
    const key = `../../assets/icons/${name}.svg`
    const loader = svgModules[key]

    if (!loader) {
      // Return a named-fallback component for missing icons so the app
      // never crashes — renders a subtle warning square instead.
      lazyCache[name] = lazy(() =>
        Promise.resolve({
          default: ({ width, height, color, title }) => (
            <svg
              viewBox="0 0 24 24"
              width={width}
              height={height}
              fill="none"
              stroke={color}
              strokeWidth={1.5}
              aria-label={title || `Missing icon: ${name}`}
            >
              <rect x="3" y="3" width="18" height="18" rx="2" strokeDasharray="4 2" />
              <line x1="9" y1="9" x2="15" y2="15" />
              <line x1="15" y1="9" x2="9" y2="15" />
            </svg>
          )
        })
      )
    } else {
      lazyCache[name] = lazy(() =>
        loader().then((SvgComponent) => ({ default: SvgComponent }))
      )
    }
  }
  return lazyCache[name]
}

// Fallback rendered during the Suspense loading window.
// Matches the icon's exact dimensions to prevent layout shift (CLS = 0).
function IconPlaceholder({ size }) {
  return (
    <span
      style={{ display: 'inline-block', width: size, height: size, flexShrink: 0 }}
      aria-hidden="true"
    />
  )
}

const Icon = memo(function Icon({
  name,
  size = 24,
  color = 'currentColor',
  className = '',
  title,
  ...rest
}) {
  const LazyIcon = getLazyIcon(name)

  return (
    <Suspense fallback={<IconPlaceholder size={size} />}>
      <LazyIcon
        width={size}
        height={size}
        color={color}
        fill={color === 'currentColor' ? 'none' : undefined}
        stroke={color}
        aria-label={title}
        aria-hidden={!title}
        focusable="false"
        className={className}
        style={{ flexShrink: 0, display: 'inline-block' }}
        {...rest}
      />
    </Suspense>
  )
})

export default Icon
