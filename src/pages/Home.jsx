import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'

import ConstellationField from '../components/sections/ConstellationField.jsx'
import TopographicLines from '../components/sections/TopographicLines.jsx'
import SectionDivider from '../components/sections/SectionDivider.jsx'
import Icon from '../components/ui/Icon.jsx'
import Button from '../components/ui/Button.jsx'
import LitPanel from '../components/ui/LitPanel.jsx'
import GalleryFrame from '../components/ui/GalleryFrame.jsx'
import SectionLabel from '../components/ui/SectionLabel.jsx'
import { useNumberScramble } from '../hooks/useNumberScramble.js'

gsap.registerPlugin(ScrollTrigger)

/**
 * Homepage (P3-01 & P3-02)
 * ─────────────────────────────────────────────────────────────
 * Complete assembly of the homepage modules.
 */
export function Home() {
  const headlineRef = useRef(null)
  const cardsRef = useRef([])
  
  // P3-02 Refs
  const processLineRef = useRef(null)
  const processDotRef = useRef(null)
  const processTrackRef = useRef(null)
  
  // Stats Trigger
  const statsRef = useRef(null)
  const stat1 = useNumberScramble(3, 1000, statsRef)
  const stat2 = useNumberScramble(50, 1000, statsRef)
  const stat3 = useNumberScramble(3, 1000, statsRef)
  const stat4 = useNumberScramble(6, 1000, statsRef)
  const stat5 = useNumberScramble(7, 1000, statsRef)

  // GSAP Sequences
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // === P3-01 ====================================================
    // Headline Assembler
    const words = headlineRef.current?.querySelectorAll('.word-assemble')
    const targetWord = document.getElementById('target-business')

    if (words?.length) {
      const tl = gsap.timeline({ delay: 0.2 })
      tl.fromTo(words, 
        { opacity: 0, y: 20, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6, stagger: 0.08, ease: 'power2.out' }
      )
      if (targetWord) {
        tl.to(targetWord, { textShadow: '0 0 40px rgba(170,255,0,0.8)', scale: 1.03, duration: 0.05, ease: 'power1.inOut' })
          .to(targetWord, { textShadow: '0 0 10px rgba(170,255,0,0)', scale: 1, duration: 0.2, ease: 'power1.out' })
      }
    }

    // Problem-Solution Stagger
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          gsap.fromTo(entry.target, 
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
          )
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.2 })

    cardsRef.current.forEach((card, i) => {
      if(card) {
        gsap.set(card, { opacity: 0, y: 30 })
        setTimeout(() => observer.observe(card), i * 120) 
      }
    })

    // === P3-02 ====================================================
    // Process Line Trigger (Desktop Only)
    const isDesktop = window.matchMedia('(min-width: 1025px)').matches
    let scrollTriggerInst = null

    if (isDesktop && processTrackRef.current && processLineRef.current && processDotRef.current) {
      // Find exact SVG height dynamically
      const trackHeight = processTrackRef.current.offsetHeight
      
      // Calculate drawing math
      const drawTl = gsap.timeline({
        scrollTrigger: {
          trigger: processTrackRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1.5 // Smooth dampening
        }
      })

      // We animate the SVG line's strokeDashoffset 
      // and translate the dot down the Y axis
      drawTl.fromTo(processLineRef.current, 
        { strokeDashoffset: trackHeight }, 
        { strokeDashoffset: 0, ease: 'none' },
        0
      )
      .fromTo(processDotRef.current,
        { y: 0 },
        { y: trackHeight, ease: 'none' },
        0
      )

      scrollTriggerInst = drawTl.scrollTrigger
    }

    return () => {
      observer.disconnect()
      if (scrollTriggerInst) scrollTriggerInst.kill()
    }
  }, [])

  return (
    <div className="w-full relative">
      
      {/* ========================================================= 
          1. HERO SECTION (VOID MOOD)
          ========================================================= */}
      <section className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center pt-[100px] overflow-hidden bg-[#060A06]">
        <ConstellationField className="z-0 opacity-40 mix-blend-screen pointer-events-none" />
        <div className="absolute top-[80%] left-[30%] w-[500px] h-[500px] rounded-full bg-[rgba(85,102,0,0.14)] blur-[100px] animate-glow-breathe pointer-events-none" />
        <div className="absolute top-[15%] left-[85%] w-[400px] h-[400px] rounded-full bg-[rgba(0,255,178,0.06)] blur-[120px] animate-glow-breathe pointer-events-none" style={{ animationDelay: '2s' }} />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-[var(--section-pad-x)] flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left: Assembler Content */}
          <div className="w-full lg:w-[60%] flex flex-col items-start space-y-8 z-20">
            <h1 ref={headlineRef} className="text-[48px] md:text-[64px] lg:text-[80px] font-bold leading-[1.05] tracking-tighter uppercase flex flex-wrap gap-x-4 gap-y-2" style={{ fontFamily: 'var(--font-display)' }}>
              <span className="word-assemble text-[#F0FFF0]">WE</span>
              <span className="word-assemble text-[#F0FFF0]">BUILD</span>
              <span className="word-assemble text-[#F0FFF0]">WEBSITES</span>
              <span className="word-assemble text-[var(--color-muted)]">THAT</span>
              <span className="word-assemble text-[var(--color-muted)]">GROW</span>
              <span className="word-assemble text-[var(--color-muted)]">YOUR</span>
              <span id="target-business" className="word-assemble text-[#AAFF00] inline-block">BUSINESS</span>
            </h1>
            <div className="gap-4 flex flex-col sm:flex-row word-assemble">
              <Button variant="primary">Start Your Project</Button>
              <Button variant="ghost">View Portfolio</Button>
            </div>
          </div>

          {/* Right: 3D Orb / Mobile Gradient */}
          <div className="absolute z-0 lg:relative lg:w-[40%] h-[300px] lg:h-[500px] flex justify-center items-center w-full top-0 left-0 lg:top-auto lg:left-auto opacity-30 lg:opacity-100 pointer-events-none lg:pointer-events-auto">
            <div className="hidden sm:block w-[320px] h-[320px] rounded-full animate-orb mix-blend-screen"
                 style={{
                   background: 'radial-gradient(circle at 30% 30%, rgba(170,255,0,0.2) 0%, rgba(0,255,178,0.1) 40%, transparent 80%)',
                   boxShadow: 'inset -20px -20px 60px rgba(0,0,0,0.8), 0 0 80px rgba(170,255,0,0.15)'
                 }} />
            <div className="sm:hidden absolute top-0 w-full h-[300px]" style={{ background: 'linear-gradient(180deg, rgba(170,255,0,0.05) 0%, transparent 100%)' }} />
          </div>
        </div>
      </section>

      {/* ========================================================= 
          2. SERVICE TICKER STRIP (INVERSE MOOD)
          ========================================================= */}
      <section className="relative w-full bg-[#AAFF00] overflow-hidden flex items-center h-[52px]">
        <div className="flex w-[200%] animate-ticker select-none">
          <div className="w-1/2 flex items-center justify-around whitespace-nowrap px-4 font-mono font-bold tracking-widest text-xs uppercase text-[#060A06]">
            <span>WEB DEVELOPMENT</span> <Icon name="star" size={12} color="#060A06" />
            <span>SEO MARKETING</span> <Icon name="star" size={12} color="#060A06" />
            <span>SPEED OPTIMIZATION</span> <Icon name="star" size={12} color="#060A06" />
            <span>SHOPIFY STORES</span> <Icon name="star" size={12} color="#060A06" />
            <span>MERN APPS</span> <Icon name="star" size={12} color="#060A06" />
          </div>
          <div className="w-1/2 flex items-center justify-around whitespace-nowrap px-4 font-mono font-bold tracking-widest text-xs uppercase text-[#060A06]">
            <span>WEB DEVELOPMENT</span> <Icon name="star" size={12} color="#060A06" />
            <span>SEO MARKETING</span> <Icon name="star" size={12} color="#060A06" />
            <span>SPEED OPTIMIZATION</span> <Icon name="star" size={12} color="#060A06" />
            <span>SHOPIFY STORES</span> <Icon name="star" size={12} color="#060A06" />
            <span>MERN APPS</span> <Icon name="star" size={12} color="#060A06" />
          </div>
        </div>
      </section>

      <SectionDivider fillColor="#0E130E" />

      {/* ========================================================= 
          3. PROBLEM-SOLUTION GRID (SURFACE MOOD)
          ========================================================= */}
      <section className="relative w-full py-24 bg-[#0E130E]">
        <div className="max-w-7xl mx-auto px-[var(--section-pad-x)] flex flex-col items-center">
          <div className="text-center mb-16">
            <h2 className="text-[32px] md:text-[48px] font-bold tracking-tight text-[#F0FFF0]" style={{ fontFamily: 'var(--font-display)' }}>
              Stop losing clients to <span className="text-[#00FFB2]">slow logic</span>.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {[
              { q: 'Invisible Online?', a: 'We build your digital presence from scratch.' },
              { q: 'Slow Website?', a: 'We boost speed scores to 95+ Lighthouse.' },
              { q: 'Lost on Google?', a: 'Our SEO puts you on Page 1.' },
            ].map((card, i) => (
              <div 
                key={i} ref={el => cardsRef.current[i] = el}
                className="group p-8 rounded-lg bg-transparent border-l-[3px] border-[#00FFB2] hover:bg-[#161C16] hover:border-[#AAFF00] transition-colors duration-400 border-t border-r border-b border-[rgba(255,255,255,0.02)] border-t-transparent border-r-transparent border-b-transparent hover:border-r-[rgba(255,255,255,0.05)] hover:border-y-[rgba(255,255,255,0.05)] cursor-default"
              >
                <h3 className="text-2xl font-bold text-[#F0FFF0] mb-4 group-hover:text-white transition-colors" style={{ fontFamily: 'var(--font-display)' }}>{card.q}</h3>
                <p className="text-[var(--color-muted)] leading-relaxed group-hover:text-[#F0FFF0] transition-colors font-medium">{card.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transition Wave -> To Elevated */}
      <SectionDivider fillColor="#161C16" />

      {/* ========================================================= 
          4. SERVICES GRID (ELEVATED MOOD) P3-02
          ========================================================= */}
      <section className="relative w-full py-24 bg-[#161C16]">
        {/* CSS Grid Overlay (60px, low opacity) */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(170,255,0,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(170,255,0,0.015) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-[var(--section-pad-x)] flex flex-col items-center">
          <SectionLabel text="Core Capabilities" className="mb-12" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            <LitPanel iconName="globe" title="Web Development" description="Custom CMS, React, and Vue stacks engineered for absolute performance." />
            <LitPanel iconName="shopping-cart" title="Shopify Commerce" description="High-converting headless setups tailored for D2C scaling." />
            <LitPanel iconName="search" title="SEO Marketing" description="Data-driven organic strategies designed to capture Page 1 real estate." />
            <LitPanel iconName="lightning" title="Speed Optimization" description="Lighthouse 95+ guarantees. We rewrite bottlenecks directly." />
            <LitPanel iconName="server" title="MERN Applications" description="Robust backend systems and custom dashboards built to spec." />
            <LitPanel iconName="smartphone" title="PWA Architecture" description="App-like mobile experiences served natively via the browser." />
          </div>
        </div>
      </section>

      <SectionDivider fillColor="#060A06" flip={true} />

      {/* ========================================================= 
          5. HOW WE WORK (ATMOSPHERE MOOD) P3-02
          ========================================================= */}
      <section className="relative w-full py-32 bg-[#060A06] overflow-hidden">
        <TopographicLines className="z-0 opacity-30" />
        <ConstellationField className="z-0 opacity-20 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[rgba(85,102,0,0.12)] blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-[var(--section-pad-x)] flex flex-col items-start lg:items-center">
          <SectionLabel text="The Process" className="mb-20 self-center" />

          {/* Process Container */}
          <div className="relative w-full flex flex-col gap-24 lg:gap-32 pl-8 lg:pl-0" ref={processTrackRef}>
            
            {/* Desktop Dynamic SVG Tracking Line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[2px]">
               <svg className="w-full h-full" preserveAspectRatio="none">
                  {/* Base Faint Line */}
                  <line x1="1" y1="0" x2="1" y2="100%" stroke="rgba(170,255,0,0.1)" strokeWidth="2" strokeDasharray="6 6" />
                  {/* Drawing Active Line */}
                  <line 
                    ref={processLineRef}
                    x1="1" y1="0" x2="1" y2="100%" 
                    stroke="#AAFF00" 
                    strokeWidth="2" 
                    strokeDasharray="6 6"
                    style={{ strokeDasharray: '3000', strokeDashoffset: '3000' }} // Arbitrary high number, overwritten by GSAP natively based on real DOM height
                  />
               </svg>
               {/* Traveling Dot */}
               <div ref={processDotRef} className="absolute -left-[3px] -top-2 w-[8px] h-[8px] rounded-full bg-[#AAFF00] shadow-[0_0_15px_rgba(170,255,0,0.6)]" />
            </div>

            {/* Steps array mapping */}
            {[
              { num: '01', title: 'Tell Us Your Vision', desc: 'We start with a deep dive into your goals, technical requirements, and target metrics.' },
              { num: '02', title: 'We Design & Build', desc: 'Our engineers construct your platform mapping exact specifications to Electric Forest architecture.' },
              { num: '03', title: 'SEO-Optimized Launch', desc: 'Zero deployment drop. We migrate and launch strictly protecting search console indexes.' },
              { num: '04', title: 'Ongoing Growth Support', desc: 'Retainer-backed assurance. We scale the infrastructure precisely as your volume demands.' }
            ].map((step, i) => (
              <div key={i} className={`relative flex flex-col lg:w-1/2 ${i % 2 === 0 ? 'lg:pr-16 lg:-translate-x-full lg:text-right lg:self-start' : 'lg:pl-16 lg:self-end'}`}>
                 <div className="absolute -top-10 -left-6 lg:left-auto lg:-top-16 text-[100px] lg:text-[140px] font-bold text-[#AAFF00] opacity-5 pointer-events-none select-none z-0" style={{ fontFamily: 'var(--font-display)' }}>
                    {step.num}
                 </div>
                 <div className="relative z-10">
                   <h3 className="text-2xl font-bold text-[#F0FFF0] mb-3" style={{ fontFamily: 'var(--font-display)' }}>{step.title}</h3>
                   <p className="text-[var(--color-muted)] leading-relaxed">{step.desc}</p>
                 </div>
                 {/* Mobile Static Connecting Line */}
                 {i !== 3 && (
                   <div className="lg:hidden absolute left-0 top-16 bottom-[-6rem] w-[2px] border-l-2 border-dashed border-[rgba(170,255,0,0.2)] -translate-x-[26px]" />
                 )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider fillColor="#0E130E" />

      {/* ========================================================= 
          6. PORTFOLIO PREVIEW (SURFACE MOOD) P3-02
          ========================================================= */}
      <section className="relative w-full py-24 bg-[#0E130E]">
        <div className="max-w-7xl mx-auto px-[var(--section-pad-x)] flex flex-col items-center">
          <SectionLabel text="Recent Work" className="mb-12" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            <GalleryFrame 
              imageSrc="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200" 
              title="Aura E-Commerce" 
              subtitle="Headless Shopify Scaling" 
              stack={['shopping-cart', 'smartphone']} 
            />
            <GalleryFrame 
              imageSrc="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200" 
              title="Vanguard Logistics" 
              subtitle="Custom React Dashboard" 
              stack={['server', 'globe']} 
            />
          </div>

          <div className="mt-16 w-full flex flex-col items-center">
            <h5 className="text-[10px] uppercase font-mono tracking-widest text-[#F0FFF0] opacity-40 mb-6">Certified Architecture Partners</h5>
            <div className="flex items-center justify-center gap-12 opacity-30 grayscale saturate-0 flex-wrap">
              <span className="font-bold tracking-widest text-lg">Google Analytics</span>
              <span className="font-bold tracking-widest text-lg">HubSpot</span>
              <span className="font-bold tracking-widest text-lg">Shopify Partner</span>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider fillColor="#060A06" flip={true} />

      {/* ========================================================= 
          7. STATS / TRUST BAR (VOID MOOD) P3-02
          ========================================================= */}
      <section className="relative w-full py-32 bg-[#060A06] overflow-hidden" ref={statsRef}>
        <ConstellationField className="absolute inset-0 z-0 opacity-20 pointer-events-none" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-[var(--section-pad-x)]">
           <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-[rgba(170,255,0,0.1)]">
              {[
                { n: stat1, suffix: '+', label: 'Years Experience' },
                { n: stat2, suffix: '+', label: 'Projects' },
                { n: stat3, suffix: 's', label: 'Sub-Load Times' },
                { n: stat4, suffix: '+', label: 'Countries Served' },
                { n: stat5, suffix: '', label: 'Digital Services' }
              ].map((s, i) => (
                <div key={i} className="flex flex-col items-center justify-center pt-8 md:pt-0 pb-8 md:pb-0 px-4 text-center">
                   <div className="flex items-baseline text-[#AAFF00] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                     <span className="text-[48px] md:text-[64px] font-bold leading-none">{s.n}</span>
                     <span className="text-2xl font-bold ml-1">{s.suffix}</span>
                   </div>
                   <span className="font-mono text-xs tracking-widest uppercase text-[#F0FFF0] opacity-60">{s.label}</span>
                </div>
              ))}
           </div>
        </div>
      </section>

    </div>
  )
}

export default Home
