import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Link } from 'react-router-dom'
import ConstellationField from '../components/sections/ConstellationField.jsx'
import SectionDivider from '../components/sections/SectionDivider.jsx'
import Icon from '../components/ui/Icon.jsx'
import Button from '../components/ui/Button.jsx'

/**
 * Homepage (P3-01)
 * ─────────────────────────────────────────────────────────────
 * Hero Assembler, Infinite Ticker, and Problem-Solution Grid.
 */
export function Home() {
  const headlineRef = useRef(null)
  const cardsRef = useRef([])

  // GSAP Sequences
  useEffect(() => {
    // 1. Reduced Motion Check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!prefersReducedMotion) {
      // 2. Headline Assembler
      const words = headlineRef.current.querySelectorAll('.word-assemble')
      const targetWord = document.getElementById('target-business')

      const tl = gsap.timeline({ delay: 0.2 })

      tl.fromTo(words, 
        { opacity: 0, y: 20, filter: 'blur(8px)' },
        { 
          opacity: 1, 
          y: 0, 
          filter: 'blur(0px)', 
          duration: 0.6, 
          stagger: 0.08, 
          ease: 'power2.out' 
        }
      )
      
      // Signature Micro-Pulse directly on the target word
      if (targetWord) {
        tl.to(targetWord, {
          textShadow: '0 0 40px rgba(170,255,0,0.8)',
          scale: 1.03,
          duration: 0.05, // Peak flash
          ease: 'power1.inOut'
        })
        .to(targetWord, {
          textShadow: '0 0 10px rgba(170,255,0,0)',
          scale: 1,
          duration: 0.2, // Settlement
          ease: 'power1.out'
        })
      }

      // 3. Problem-Solution Cards Stagger Fade-up
      // Use Intersection Observer natively or GSAP ScrollTrigger if available.
      // Assuming ScrollTrigger isn't explicitly imported yet, falling back to basic IO mapping:
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

      // Stagger logic applied directly if we had a stagger sequence wrapper.
      // For now, trigger individual card reveals.
      cardsRef.current.forEach((card, i) => {
        if(card) {
          gsap.set(card, { opacity: 0, y: 30 }) // Initial state
          // Add artificial delay per card index for stagger effect in view
          setTimeout(() => observer.observe(card), i * 120) 
        }
      })

      return () => observer.disconnect()
    }
  }, [])

  return (
    <div className="w-full relative">
      
      {/* ========================================================= 
          1. HERO SECTION (VOID MOOD)
          ========================================================= */}
      <section className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center pt-[100px] overflow-hidden bg-[#060A06]">
        
        {/* Layer 0: Performance Canvas & Glow Atmospheres */}
        <ConstellationField className="z-0 opacity-40 mix-blend-screen pointer-events-none" />
        
        <div className="absolute top-[80%] left-[30%] w-[500px] height-[500px] rounded-full bg-[rgba(85,102,0,0.14)] blur-[100px] animate-glow-breathe pointer-events-none" />
        <div className="absolute top-[15%] left-[85%] w-[400px] height-[400px] rounded-full bg-[rgba(0,255,178,0.06)] blur-[120px] animate-glow-breathe pointer-events-none" style={{ animationDelay: '2s' }} />

        {/* Layer 1: Core Layout */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-[var(--section-pad-x)] flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left: Assembler Content */}
          <div className="w-full lg:w-[60%] flex flex-col items-start space-y-8 z-20">
            <h1 
              ref={headlineRef} 
              className="text-[48px] md:text-[64px] lg:text-[80px] font-bold leading-[1.05] tracking-tighter uppercase flex flex-wrap gap-x-4 gap-y-2"
              style={{ fontFamily: 'var(--font-display)' }}
            >
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
            {/* Desktop 3D Rotate Orb */}
            <div className="hidden sm:block w-[320px] h-[320px] rounded-full animate-orb mix-blend-screen"
                 style={{
                   background: 'radial-gradient(circle at 30% 30%, rgba(170,255,0,0.2) 0%, rgba(0,255,178,0.1) 40%, transparent 80%)',
                   boxShadow: 'inset -20px -20px 60px rgba(0,0,0,0.8), 0 0 80px rgba(170,255,0,0.15)'
                 }} 
            />
            {/* Mobile Fallback Atmospheric Gradient */}
            <div className="sm:hidden absolute top-0 w-full h-[300px]"
                 style={{
                   background: 'linear-gradient(180deg, rgba(170,255,0,0.05) 0%, transparent 100%)'
                 }}
            />
          </div>

        </div>
      </section>

      {/* ========================================================= 
          2. SERVICE TICKER STRIP (INVERSE MOOD)
          ========================================================= */}
      <section className="relative w-full bg-[#AAFF00] overflow-hidden flex items-center h-[52px]">
        {/* Inner container needing dual text for infinite loop math without jump */}
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

      {/* Transition Wave -> To Surface */}
      <SectionDivider fillColor="#0E130E" />

      {/* ========================================================= 
          3. PROBLEM-SOLUTION GRID (SURFACE MOOD)
          ========================================================= */}
      <section className="relative w-full py-24 bg-[#0E130E]">
        <div className="max-w-7xl mx-auto px-[var(--section-pad-x)] flex flex-col items-center">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-[32px] md:text-[48px] font-bold tracking-tight text-[#F0FFF0]" style={{ fontFamily: 'var(--font-display)' }}>
              Stop losing clients to <span className="text-[#00FFB2]">slow logic</span>.
            </h2>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {[
              { q: 'Invisible Online?', a: 'We build your digital presence from scratch.' },
              { q: 'Slow Website?', a: 'We boost speed scores to 95+ Lighthouse.' },
              { q: 'Lost on Google?', a: 'Our SEO puts you on Page 1.' },
            ].map((card, i) => (
              <div 
                key={i} 
                ref={el => cardsRef.current[i] = el}
                className="group p-8 rounded-lg bg-transparent border-l-[3px] border-[#00FFB2] hover:bg-[#161C16] hover:border-[#AAFF00] transition-colors duration-400 border-t border-r border-b border-[rgba(255,255,255,0.02)] border-t-transparent border-r-transparent border-b-transparent hover:border-r-[rgba(255,255,255,0.05)] hover:border-y-[rgba(255,255,255,0.05)] cursor-default"
              >
                <h3 className="text-2xl font-bold text-[#F0FFF0] mb-4 group-hover:text-white transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
                  {card.q}
                </h3>
                <p className="text-[var(--color-muted)] leading-relaxed group-hover:text-[#F0FFF0] transition-colors font-medium">
                  {card.a}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  )
}

export default Home
