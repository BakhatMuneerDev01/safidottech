import { Routes, Route } from 'react-router-dom'
import GrainOverlay from './components/global/GrainOverlay.jsx'
import WhatsAppButton from './components/global/WhatsAppButton.jsx'
import CursorParticles from './components/global/CursorParticles.jsx'
import ReadingProgressBar from './components/ui/ReadingProgressBar.jsx'
import Home from './pages/Home.jsx'

/**
 * Main Application Shell
 * ─────────────────────────────────────────────────────────────
 * Housing for global functional overlays and core routing.
 * Navbar and Footer moved to Home.jsx for definitive assembly sequence.
 */
function App() {
  return (
    <>
      <ReadingProgressBar />
      <CursorParticles />
      <WhatsAppButton />

      {/* Global Grain Overlay */}
      <GrainOverlay />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Future Routes Will Slot Here */}
        </Routes>
      </main>
    </>
  )
}

export default App
