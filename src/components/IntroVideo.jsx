import { useEffect, useRef } from 'react'
import './IntroVideo.css'

export default function IntroVideo({ onComplete }) {
  const wrapperRef   = useRef(null)
  const stickyRef    = useRef(null)
  const logoStageRef = useRef(null)
  const bottomRef    = useRef(null)
  const completedRef = useRef(false)

  useEffect(() => {
    const wrapper    = wrapperRef.current
    const sticky     = stickyRef.current
    const logoStage  = logoStageRef.current
    const bottom     = bottomRef.current
    if (!wrapper || !sticky) return

    let rafId = null

    const update = () => {
      rafId = null
      const rect       = wrapper.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      const p          = Math.min(1, Math.max(0, -rect.top / Math.max(1, scrollable)))

      if (p >= 0.97 && onComplete && !completedRef.current) {
        completedRef.current = true
        onComplete()
      }

      // Logo inner: appears p 0.15→0.35, stays, collapses p 0.82→0.96
      if (logoStage) {
        const showP  = Math.min(1, Math.max(0, (p - 0.15) / 0.20))
        const colP   = Math.min(1, Math.max(0, (p - 0.82) / 0.14))
        const logoOp = showP * (1 - colP)
        const logoSc = 0.2 + showP * 1.1 - colP * 1.15

        logoStage.style.opacity   = logoOp.toFixed(3)
        logoStage.style.transform = `scale(${Math.max(0.05, logoSc).toFixed(3)})`
      }

      // Scroll cue hides once user starts scrolling
      if (bottom) bottom.classList.toggle('is-hidden', p > 0.04)
    }

    const onScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    update()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section ref={wrapperRef} className="intro-video" aria-label="Capri Carnes">

      {/* Video layer */}
      <div ref={stickyRef} className="intro-video__sticky">
        <video
          className="intro-video__media"
          src="/videos/capri-web.mp4"
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

        {/* Corner logo — top right watermark */}
        <div className="intro-video__corner" aria-hidden="true">
          <img src="/images/capri-logo.jpg" alt="" className="intro-video__corner-logo" />
        </div>

        <div ref={bottomRef} className="intro-video__bottom">
          <div className="intro-video__cue" aria-hidden="true">
            <span>Scroll</span>
            <span className="intro-video__cue-line" />
          </div>
        </div>
      </div>

      {/* Logo stage — blend mode here composites against the video correctly */}
      <div className="intro-video__logo-stage">
        {/* inner wrapper is animated by JS — keeps parent blend mode working */}
        <div ref={logoStageRef} className="intro-video__logo-inner">
          <img
            src="/images/capri-logo.svg"
            alt="Capri Carnes"
            className="intro-video__logo"
            loading="eager"
          />
        </div>
      </div>

    </section>
  )
}
