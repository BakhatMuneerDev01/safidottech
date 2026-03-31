import { StrictMode, useEffect } from 'react'
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

function Root() {
  useEffect(() => {
    // Only initialize smooth scroll if NOT on a touch device
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches
    
    if (!isTouchDevice) {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })

      // Sync Lenis scroll with GSAP Ticker
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000)
      })

      // Manage RAF manually to avoid double-rafing
      gsap.ticker.lagSmoothing(0)

      return () => {
        gsap.ticker.remove((time) => lenis.raf(time * 1000))
        lenis.destroy()
      }
    }
  }, [])

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
