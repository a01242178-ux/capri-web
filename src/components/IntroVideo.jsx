import { useEffect, useRef } from 'react'
import './IntroVideo.css'

export default function IntroVideo() {
  const wrapperRef  = useRef(null)
  const stickyRef   = useRef(null)
  const logoStageRef = useRef(null)
  const bottomRef   = useRef(null)

  useEffect(() => {
    const wrapper    = wrapperRef.current
    const sticky     = stickyRef.current
    const logoStage  = logoStageRef.current
    const bottom     = bottomRef.current
    if (!wrapper || !sticky) return

    const onScroll = () => {
      const rect       = wrapper.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      const p          = Math.min(1, Math.max(0, -rect.top / Math.max(1, scrollable)))

      // Video section: iris close + zoom + fade
      sticky.style.setProperty('--p', p)

      // Logo stage: appears p 0.35→0.62, then collapses p 0.82→1.0
      // Lives OUTSIDE the fading video container — opacity is fully independent
      if (logoStage) {
        const showP  = Math.min(1, Math.max(0, (p - 0.35) / 0.27))
        const colP   = Math.min(1, Math.max(0, (p - 0.82) / 0.18))
        const logoOp = showP * (1 - colP)
        const logoSc = 0.2 + showP * 0.8 - colP * 0.9

        logoStage.style.opacity   = logoOp.toFixed(3)
        logoStage.style.transform = `scale(${Math.max(0.05, logoSc).toFixed(3)})`
      }

      // Scroll cue hides once user starts scrolling
      if (bottom) bottom.classList.toggle('is-hidden', p > 0.04)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section ref={wrapperRef} className="intro-video" aria-label="Capri Carnes">

      {/* Video layer — fades and iris-closes with scroll */}
      <div ref={stickyRef} className="intro-video__sticky" style={{ '--p': 0 }}>
        <video
          className="intro-video__media"
          src="/videos/capri.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disableRemotePlayback
          controls={false}
          aria-hidden="true"
        />
        <div className="intro-video__grain"   aria-hidden="true" />
        <div className="intro-video__vignette" aria-hidden="true" />

        <div ref={bottomRef} className="intro-video__bottom">
          <div className="intro-video__tagline">Desde 1960 · La carne que Juárez conoce</div>
          <div className="intro-video__cue" aria-hidden="true">
            <span>Scroll</span>
            <span className="intro-video__cue-line" />
          </div>
        </div>
      </div>

      {/* Logo stage — separate sticky sibling, opacity NOT inherited from video fade */}
      <div ref={logoStageRef} className="intro-video__logo-stage">
        <img
          src="/images/capri-logo.svg"
          alt="Capri Carnes"
          className="intro-video__logo"
          loading="eager"
        />
      </div>

    </section>
  )
}
