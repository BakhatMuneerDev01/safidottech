import { Routes, Route } from 'react-router-dom'
import GrainOverlay from './components/global/GrainOverlay.jsx'
import Navbar from './components/global/Navbar.jsx'
import WhatsAppButton from './components/global/WhatsAppButton.jsx'
import CursorParticles from './components/global/CursorParticles.jsx'
import ReadingProgressBar from './components/ui/ReadingProgressBar.jsx'
import Home from './pages/Home.jsx'
import Footer from './components/global/Footer.jsx'

function App() {
  return (
    <>
      <ReadingProgressBar />
      <CursorParticles />
      <WhatsAppButton />
      <Navbar />

      {/* Global Grain Overlay */}
      <GrainOverlay />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Future Routes Will Slot Here */}
        </Routes>
      </main>

      <Footer />
    </>
  )
}

export default App
