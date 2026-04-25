import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/Hero.css'

gsap.registerPlugin(ScrollTrigger)

function SplitChars({ text }) {
  return text.split('').map((char, i) => (
    <span key={i} className="hero__char" aria-hidden="true">
      {char === ' ' ? ' ' : char}
    </span>
  ))
}

export default function Hero() {
  const sectionRef = useRef(null)
  const imgRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const img = imgRef.current
    if (!section) return

    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Parallax: image drifts slower than scroll (fromTo centers the movement)
      gsap.fromTo(img,
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      )

      // Title characters — stagger from below
      const chars = section.querySelectorAll('.hero__char')
      gsap.from(chars, {
        opacity: 0,
        y: 70,
        stagger: 0.028,
        duration: 0.55,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 82%',
          toggleActions: 'play none none none',
        }
      })

      // Eyebrow → sub → CTA sequence
      gsap.from(
        [
          section.querySelector('.hero__eyebrow'),
          section.querySelector('.hero__sub'),
          section.querySelector('.hero__cta'),
        ],
        {
          opacity: 0,
          y: 30,
          stagger: 0.14,
          duration: 0.65,
          ease: 'power2.out',
          delay: 0.18,
          scrollTrigger: {
            trigger: section,
            start: 'top 82%',
            toggleActions: 'play none none none',
          }
        }
      )
    })

    return () => mm.revert()
  }, [])

  return (
    <section ref={sectionRef} className="hero">
      {/* Parallax background — <img> allows GSAP transform (CSS bg-image cannot) */}
      <div className="hero__bg">
        <img
          ref={imgRef}
          src="https://drive.google.com/thumbnail?id=1SeIwD3fttPDcodYRgYPJaBxxDwLPC17h&sz=w1600"
          alt=""
          aria-hidden="true"
          loading="eager"
          className="hero__bg-img hero__bg-img--ribeye"
        />
      </div>
      <div className="hero__overlay" />

      <div className="hero__content">
        <p className="hero__eyebrow">Desde 1960 · Ciudad Juárez</p>
        <h1 className="hero__title" aria-label="Del Rancho A Tu Mesa">
          <span className="hero__line"><SplitChars text="Del Rancho" /></span>
          <span className="hero__line"><SplitChars text="A Tu Mesa" /></span>
        </h1>
        <p className="hero__sub">
          Cuatro generaciones seleccionando los mejores cortes. Calidad premium al alcance de cada familia juarense.
        </p>
        <a
          href="#productos"
          className="hero__cta"
          onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('capri:navigate', { detail: 'productos' })) }}
        >
          Conoce nuestros productos
        </a>
      </div>
    </section>
  )
}
