import { useEffect, useState } from 'react'
import './IntroOpcion2.css'

const DURATION = 7400

export default function IntroOpcion2({ onComplete }) {
  const [phase, setPhase] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete?.()
      return
    }

    const timers = [
      setTimeout(() => setPhase(1), 200),   // mark big center on black
      setTimeout(() => setPhase(2), 2000),  // rancho fullscreen
      setTimeout(() => setPhase(3), 4400),  // carne fullscreen
      setTimeout(() => setPhase(4), 6200),  // mark shrinks to header
      setTimeout(() => setLeaving(true), DURATION - 450),
      setTimeout(() => onComplete?.(), DURATION)
    ]

    const skip = () => onComplete?.()
    const onKey = (e) => { if (e.key === 'Escape' || e.key === 'Enter') skip() }
    window.addEventListener('keydown', onKey)

    return () => {
      timers.forEach(clearTimeout)
      window.removeEventListener('keydown', onKey)
    }
  }, [onComplete])

  return (
    <div className={`intro-op2 ${leaving ? 'is-leaving' : ''} phase-${phase}`}>
      {/* Scene frames */}
      <div className="intro-op2__frame intro-op2__frame--rancho" />
      <div className="intro-op2__frame intro-op2__frame--carne" />

      {/* Vignette for readability of overlay text */}
      <div className="intro-op2__vignette" />

      {/* Signature wordmark — lives in center during phase 1, shrinks to header-top-left in phase 4 */}
      <div className="intro-op2__mark" aria-hidden="true">
        <span className="intro-op2__mark-text">capri</span><span className="intro-op2__mark-dot">.</span>
      </div>

      {/* Tiny corner label "capri." during image phases (brand.io signature) */}
      <div className="intro-op2__corner">
        <span>capri</span><span className="intro-op2__corner-dot">.</span>
      </div>

      {/* Phase 2 tagline */}
      <div className="intro-op2__tagline intro-op2__tagline--rancho">
        Desde 1960 · 100% Mexicano
      </div>
      {/* Phase 3 tagline */}
      <div className="intro-op2__tagline intro-op2__tagline--carne">
        Del rancho a tu mesa
      </div>

      <button className="intro-op2__skip" onClick={onComplete} aria-label="Saltar intro">
        Entrar
      </button>
    </div>
  )
}
