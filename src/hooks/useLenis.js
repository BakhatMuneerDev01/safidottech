import { globalLenis } from '../main.jsx'

/**
 * useLenis
 * ─────────────────────────────────────────────────────────────
 * Reusable hook to access the global Lenis scroll instance.
 * Allows components to manually trigger scrolling, lock the body
 * for "cinema reveal" transitions, or pause/resume scroll natively.
 * 
 * Returns `null` on mobile touch devices where Lenis is intentionally
 * destroyed in main.jsx to allow native momentum scrolling.
 * 
 * Usage:
 *   const lenis = useLenis()
 *   if (lenis) lenis.stop()
 */
export function useLenis() {
  return globalLenis
}
