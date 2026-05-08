import { useEffect, useRef, useState } from 'react'
import './LoadingScreen.css'

export default function LoadingScreen({ onReady, onComplete }) {
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting]   = useState(false)
  const progressRef             = useRef(0)
  const doneRef                 = useRef(false)

  const advance = (target) => {
    if (doneRef.current) return
    if (target > progressRef.current) {
      progressRef.current = target
      setProgress(target)
    }
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    advance(12)
    const t1 = setTimeout(() => advance(30), 350)

    const vid = document.createElement('video')
    vid.src = '/videos/capri-web.mp4'
    vid.preload = 'metadata'
    vid.addEventListener('canplaythrough', () => advance(65), { once: true })
    vid.load()

    const img = new Image()
    img.onload = () => advance(80)
    img.src = '/images/hero-ribeye.jpg'

    const t2 = setTimeout(() => advance(92), 2500)
    const t3 = setTimeout(() => advance(100), 4000)

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3)
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    if (progress < 100 || doneRef.current) return
    doneRef.current = true
    const t = setTimeout(() => {
      document.body.style.overflow = ''
      onReady?.()                            // monta IntroVideo, video arranca detrás
      setExiting(true)                       // empieza el wipe (700ms)
      setTimeout(() => onComplete?.(), 700)  // desmonta el overlay al terminar
    }, 280)
    return () => clearTimeout(t)
  }, [progress])

  const clipRight = Math.max(0, 100 - progress)

  return (
    <div className={`ls${exiting ? ' ls--exit' : ''}`} aria-hidden="true">

      <div className="ls__panel">
        {/* Ghost — logo tenue siempre visible */}
        <img src="/images/capri-logo-cropped.jpg" alt="" className="ls__logo-ghost" draggable={false} />
        {/* Active — se revela de izquierda a derecha con la barra */}
        <img
          src="/images/capri-logo-cropped.jpg"
          alt=""
          className="ls__logo-active"
          style={{ clipPath: `inset(0 ${clipRight}% 0 0)` }}
          draggable={false}
        />
      </div>

      <p className="ls__tagline">Desde 1960 · Ciudad Juárez</p>

      <div className="ls__bar-wrap">
        <div className="ls__bar" style={{ width: `${progress}%` }} />
        <span className="ls__pct">{progress}<span className="ls__pct-sym">%</span></span>
      </div>

    </div>
  )
}
