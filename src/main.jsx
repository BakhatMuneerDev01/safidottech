import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Lenis from 'lenis'
import gsap from 'gsap'

import './index.css'
import './styles/theme.css'
import './styles/keyframes.css'
import './styles/cursor-particle.css'

import App from './App.jsx'

/* ============================================================
   GLOBAL SCROLL INITIALIZATION
   Executes before the React render cycle begins.
============================================================ */
export let globalLenis = null

// Explicit check for touch capabilities per architectural constraints
const isTouchDevice = typeof window !== 'undefined' && 
  ('ontouchstart' in window || navigator.maxTouchPoints > 0)

if (!isTouchDevice) {
  // Initialize Lenis for desktop
  globalLenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  })

  // Synchronize Lenis with the GSAP ticker
  // Why GSAP Ticker instead of standard RAF loop?
  // 1. Unifies all animations under one master clock protecting the 16ms budget.
  // 2. Ensures ScrollTrigger and Lenis share the identical update cycle, avoiding jitter.
  gsap.ticker.add((time) => {
    globalLenis.raf(time * 1000)
  })

  // Disable GSAP lag smoothing.
  // When tabs are switched, standard RAF pauses. Lag smoothing would warp
  // the time delta calculations upon return, causing massive scroll jumps.
  gsap.ticker.lagSmoothing(0)
} else {
  // On touch devices, native momentum scrolling is preferred for 
  // maximal responsiveness and browser-optimized battery life.
  if (globalLenis) {
    globalLenis.destroy()
    globalLenis = null
  }
}

/* ============================================================
   REACT APPLICATION MOUNT
============================================================ */
function Root() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>
)
