import { useEffect, useRef } from 'react'
import './IntroVideo.css'

/**
 * Scroll-driven video intro.
 *
 * Architecture:
 * - Wrapper 250vh creates scroll distance; sticky child fills 100vh
 * - scroll → targetProgress (0..1)
 * - rAF lerps currentProgress toward targetProgress, stops when settled
 * - All DOM mutations (veil opacity, bottom visibility) via refs — no setState
 */
export default function IntroVideo() {
  const wrapperRef = useRef(null)
  const videoRef = useRef(null)
  const veilRef = useRef(null)
  const bottomRef = useRef(null)
  const loadingRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    const wrapper = wrapperRef.current
    const veil = veilRef.current
    const bottom = bottomRef.current
    const loading = loadingRef.current
    if (!video || !wrapper) return

    let rafId = null
    let targetProgress = 0
    let currentProgress = 0
    let lastSeekTime = -1
    let running = false

    const computeTarget = () => {
      const rect = wrapper.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      targetProgress = Math.min(1, Math.max(0, -rect.top / Math.max(1, total)))
    }

    const tick = () => {
      currentProgress += (targetProgress - currentProgress) * 0.12

      if (video.duration && !Number.isNaN(video.duration)) {
        const desired = currentProgress * video.duration
        if (Math.abs(desired - lastSeekTime) > 0.03) {
          if (typeof video.fastSeek === 'function') {
            video.fastSeek(desired)
          } else {
            video.currentTime = desired
          }
          lastSeekTime = desired
        }
      }

      // Veil fade-to-white at end
      if (veil) {
        veil.style.opacity = String(Math.max(0, (currentProgress - 0.7) / 0.3) * 0.95)
      }
      // Hide scroll cue once user starts scrolling
      if (bottom) {
        bottom.classList.toggle('is-hidden', currentProgress > 0.04)
      }

      // Stop loop when settled — avoids burning CPU while idle
      if (Math.abs(targetProgress - currentProgress) < 0.0005) {
        running = false
        rafId = null
        return
      }

      rafId = requestAnimationFrame(tick)
    }

    const startLoop = () => {
      if (!running) {
        running = true
        rafId = requestAnimationFrame(tick)
      }
    }

    const onScroll = () => { computeTarget(); startLoop() }

    const onLoadedMeta = () => {
      if (loading) loading.style.display = 'none'
      video.play().then(() => video.pause()).catch(() => {})
      computeTarget()
      currentProgress = targetProgress
      startLoop()
    }

    if (video.readyState >= 1) {
      onLoadedMeta()
    } else {
      video.addEventListener('loadedmetadata', onLoadedMeta)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    computeTarget()

    return () => {
      video.removeEventListener('loadedmetadata', onLoadedMeta)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section ref={wrapperRef} className="intro-video" aria-label="Carnicero Capri Carnes">
      <div className="intro-video__sticky">

        <video
          ref={videoRef}
          className="intro-video__media"
          src="/videos/capri.mp4"
          muted
          playsInline
          preload="auto"
          disableRemotePlayback
          controls={false}
          aria-hidden="true"
        />

        {/* Logo — overlaid on top of video */}
        <div className="intro-video__lockup">
          <img
            src="/images/capri-logo.jpg"
            alt="Capri Carnes"
            className="intro-video__logo"
            loading="eager"
          />
        </div>

        {/* Scroll cue — overlaid at bottom */}
        <div ref={bottomRef} className="intro-video__bottom">
          <div className="intro-video__tagline">Desde 1960 · La carne que Juárez conoce</div>
          <div className="intro-video__cue" aria-hidden="true">
            <span>Scroll</span>
            <span className="intro-video__cue-line" />
          </div>
        </div>

        <div ref={veilRef} className="intro-video__veil" style={{ opacity: 0 }} />
        <div ref={loadingRef} className="intro-video__loading">Cargando…</div>

      </div>
    </section>
  )
}
