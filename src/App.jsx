import GrainOverlay from './components/global/GrainOverlay.jsx'
import ConstellationField from './components/sections/ConstellationField.jsx'
import TopographicLines from './components/sections/TopographicLines.jsx'
import SectionDivider from './components/sections/SectionDivider.jsx'
import Navbar from './components/global/Navbar.jsx'

function App() {
  return (
    <>
      <Navbar />
      
      {/* 1. Global Grain Overlay (fixed over everything, pointer-events: none, z: 99) */}
      <GrainOverlay />

      {/* Hero Section: Dark minimal w/ Topographic lines */}
      <section className="relative w-full min-h-[60vh] flex flex-col items-center justify-center p-8 overflow-hidden">
        {/* Layer 0: Topo map */}
        <TopographicLines className="z-0" />
        
        {/* Layer 1: Content */}
        <div className="z-10 text-center space-y-4">
          <p className="font-mono text-lime-400 text-sm tracking-widest uppercase">Mood: Foundation</p>
          <h1 className="text-5xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>
            Ambient Architecture
          </h1>
          <p className="max-w-md mx-auto" style={{ color: 'var(--color-muted)' }}>
            Topographic svg mapping provides subliminal depth to standard sections.
          </p>
        </div>
      </section>

      {/* Wave Transition OUT of Foundation, INTO Elevated */}
      <SectionDivider fillColor="var(--color-surface)" />

      {/* Elevated Section: Lighter surface w/ Constellation Canvas + Grid */}
      <section className="section-elevated relative w-full min-h-[60vh] flex flex-col items-center justify-center p-8" style={{ backgroundColor: 'var(--color-surface)' }}>
        {/* Layer 0: Node-Pooling Canvas */}
        <ConstellationField className="z-0 opacity-70" />
        
        {/* Layer 1: Content */}
        <div className="z-10 text-center space-y-4">
          <p className="font-mono text-lime-400 text-sm tracking-widest uppercase">Mood: Elevated</p>
          <h2 className="text-4xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>
            Neural Connectivity
          </h2>
          <p className="max-w-md mx-auto" style={{ color: 'var(--color-muted)' }}>
            Procedural HTML5 Canvas rendering 35 static nodes to protect the 16ms animation budget. Subliminal CSS grid overlay via pseudo-elements.
          </p>
        </div>
      </section>

      {/* Wave Transition BACK to Foundation */}
      <SectionDivider fillColor="var(--color-surface)" flip={true} />

      <section className="relative w-full h-[30vh] flex flex-col items-center justify-center p-8" style={{ backgroundColor: 'var(--color-bg)' }}>
        <p className="font-mono text-xs" style={{ color: 'var(--color-muted)' }}>P2-01 Verification Passed ✓</p>
      </section>
    </>
  )
}

export default App
