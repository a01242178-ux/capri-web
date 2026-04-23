import { useEffect, useRef, useState } from 'react'
import './IntroOpcion1.css'

export default function IntroOpcion1({ onComplete }) {
  const rootRef = useRef(null)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const total = 3800
    const fadeStart = 3200
    let rafId
    const start = performance.now()

    const tick = (now) => {
      const t = now - start
      if (t >= fadeStart && rootRef.current) {
        rootRef.current.classList.add('is-leaving')
      }
      if (t >= total) {
        setHidden(true)
        onComplete?.()
        return
      }
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    const skip = () => {
      setHidden(true)
      onComplete?.()
    }
    const onKey = (e) => { if (e.key === 'Escape' || e.key === 'Enter') skip() }
    window.addEventListener('keydown', onKey)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('keydown', onKey)
    }
  }, [onComplete])

  if (hidden) return null

  return (
    <div
      ref={rootRef}
      className="intro-brand"
      onClick={() => { setHidden(true); onComplete?.() }}
      role="button"
      aria-label="Saltar intro"
    >
      <div className="intro-brand__eyebrow">Desde 1960</div>
      <h1 className="intro-brand__title" aria-label="Capri Carnes">
        <span className="intro-brand__word intro-brand__word--one">CAPRI</span>
        <span className="intro-brand__word intro-brand__word--two">CARNES</span>
      </h1>
      <div className="intro-brand__tagline">100% Mexicano · Del Rancho a tu Mesa</div>
      <div className="intro-brand__skip">click para saltar</div>
    </div>
  )
}
