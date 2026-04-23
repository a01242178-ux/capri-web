import { useEffect, useRef, useState } from 'react'
import './IntroVideo.css'

/**
 * Scroll-driven video intro.
 * A tall wrapper creates scroll distance; inside, a sticky video fills the viewport.
 * As the user scrolls through the wrapper, video.currentTime is mapped to scroll progress.
 * When the wrapper is fully scrolled past, the next section (Hero with ribeyes) appears.
 */
export default function IntroVideo() {
  const wrapperRef = useRef(null)
  const videoRef = useRef(null)
  const [ready, setReady] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const video = videoRef.current
    const wrapper = wrapperRef.current
    if (!video || !wrapper) return

    let rafId = null

    const update = () => {
      const rect = wrapper.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      // How far we've scrolled into the wrapper, normalized 0..1
      const pct = Math.min(1, Math.max(0, -rect.top / Math.max(1, total)))
      if (video.duration && !Number.isNaN(video.duration)) {
        video.currentTime = pct * video.duration
      }
      setProgress(pct)
    }

    const onScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        update()
      })
    }

    const onLoaded = () => setReady(true)
    video.addEventListener('loadedmetadata', onLoaded)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    // Initial sync in case page loads mid-scroll
    onScroll()

    return () => {
      video.removeEventListener('loadedmetadata', onLoaded)
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
        {/* Dark overlay that deepens near the end for smooth handoff to next section */}
        <div
          className="intro-video__veil"
          style={{ opacity: Math.max(0, (progress - 0.72) / 0.28) * 0.85 }}
        />

        {/* Brand lockup — styled wordmark over the video (logo JPG has white bg, so we use text here) */}
        <div className="intro-video__lockup">
          <span className="intro-video__wordmark">
            capri<span className="intro-video__wordmark-dot">.</span>
          </span>
        </div>

        <div className={`intro-video__cue ${progress > 0.05 ? 'is-hidden' : ''}`} aria-hidden="true">
          <span>Scroll</span>
          <span className="intro-video__cue-line" />
        </div>
      </div>
    </section>
  )
}
