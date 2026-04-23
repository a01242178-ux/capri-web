import { useEffect, useRef, useState } from 'react'
import './IntroVideo.css'

/**
 * Scroll-driven video intro with smooth interpolation.
 *
 * Architecture:
 * - Wrapper 250vh (200vh mobile) creates scroll distance
 * - Sticky child fills 100vh while parent scrolls
 * - scroll → targetProgress (0..1)
 * - continuous rAF lerps currentProgress toward targetProgress
 * - video.currentTime only seeks when the delta > epsilon
 * - uses fastSeek() when available (Safari) for fluid keyframe seeks
 */
export default function IntroVideo() {
  const wrapperRef = useRef(null)
  const videoRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const [primed, setPrimed] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    const wrapper = wrapperRef.current
    if (!video || !wrapper) return

    let rafId = null
    let targetProgress = 0
    let currentProgress = 0
    let lastSeekTime = -1

    const computeTarget = () => {
      const rect = wrapper.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      targetProgress = Math.min(1, Math.max(0, -rect.top / Math.max(1, total)))
    }

    const tick = () => {
      // Lerp toward target. 0.12 gives a responsive-but-smooth trail.
      currentProgress += (targetProgress - currentProgress) * 0.12

      if (video.duration && !Number.isNaN(video.duration)) {
        const desired = currentProgress * video.duration
        // Only seek when meaningful delta — avoids decoder thrash
        if (Math.abs(desired - lastSeekTime) > 0.03) {
          if (typeof video.fastSeek === 'function') {
            video.fastSeek(desired)
          } else {
            video.currentTime = desired
          }
          lastSeekTime = desired
        }
      }

      setProgress(currentProgress)
      rafId = requestAnimationFrame(tick)
    }

    const onScroll = () => { computeTarget() }
    const onLoadedMeta = () => {
      setPrimed(true)
      // Prime the decoder: play a tiny moment then pause so the first seek isn't cold
      video.play().then(() => video.pause()).catch(() => {})
      computeTarget()
      currentProgress = targetProgress
      if (!rafId) rafId = requestAnimationFrame(tick)
    }

    // Handle case where metadata is already loaded by the time we attach
    if (video.readyState >= 1 /* HAVE_METADATA */) {
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
    <section
      ref={wrapperRef}
      className="intro-video"
      aria-label="Carnicero Capri Carnes"
    >
      <div className="intro-video__sticky">
        {/* Top band — real Capri logo */}
        <div className="intro-video__lockup">
          <img
            src="/images/capri-logo.jpg"
            alt="Capri Carnes"
            className="intro-video__logo"
            loading="eager"
          />
        </div>

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

        {/* Bottom band — tagline + scroll cue */}
        <div className={`intro-video__bottom ${progress > 0.04 ? 'is-hidden' : ''}`}>
          <div className="intro-video__tagline">
            Desde 1960 · La carne que Juárez conoce
          </div>
          <div className="intro-video__cue" aria-hidden="true">
            <span>Scroll</span>
            <span className="intro-video__cue-line" />
          </div>
        </div>

        {/* Fade-to-white veil at end for smooth handoff */}
        <div
          className="intro-video__veil"
          style={{ opacity: Math.max(0, (progress - 0.7) / 0.3) * 0.95 }}
        />

        {!primed && <div className="intro-video__loading">Cargando…</div>}
      </div>
    </section>
  )
}
