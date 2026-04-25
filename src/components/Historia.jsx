import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Grainient from './Grainient'
import '../styles/Historia.css'

const driveImg = (id) => `https://drive.google.com/thumbnail?id=${id}&sz=w1200`

gsap.registerPlugin(ScrollTrigger)

export default function Historia() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Opening
      gsap.from(section.querySelector('.historia__opening'), {
        opacity: 0,
        y: 48,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section.querySelector('.historia__opening'),
          start: 'top 82%',
          toggleActions: 'play none none none',
        }
      })

      // Chapter titles — slide up simple (sin neon, eso va en el logo)
      section.querySelectorAll('.historia__chapter-title').forEach(title => {
        gsap.from(title, {
          opacity: 0,
          y: 36,
          duration: 0.65,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 86%',
            toggleActions: 'play none none none',
          }
        })
      })

      // Chapter text — label + body stagger
      section.querySelectorAll('.historia__chapter-text').forEach(block => {
        gsap.from(
          block.querySelectorAll('.historia__chapter-label, .historia__chapter-body'),
          {
            opacity: 0,
            y: 22,
            stagger: 0.09,
            duration: 0.65,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 82%',
              toggleActions: 'play none none none',
            }
          }
        )
      })

      // Fotos — wipe de izquierda a derecha
      section.querySelectorAll('.historia__chapter-visual').forEach(visual => {
        gsap.from(visual, {
          clipPath: 'inset(0 100% 0 0)',
          duration: 0.9,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: visual,
            start: 'top 88%',
            toggleActions: 'play none none none',
          }
        })
      })

      // Neon photo — scrub: oscura/desaturada → full color brillante al hacer scroll
      const neonImg = section.querySelector('.historia__neon-img')
      if (neonImg) {
        gsap.fromTo(neonImg,
          { filter: 'brightness(0.25) saturate(0) contrast(1.1)' },
          {
            filter: 'brightness(1.08) saturate(1.3) contrast(1.05)',
            ease: 'power1.inOut',
            scrollTrigger: {
              trigger: section.querySelector('.historia__chapter--founder'),
              start: 'top 75%',
              end: 'center 40%',
              scrub: 1.2,
            }
          }
        )
      }

      // Spotlight — quote neon intenso sobre fondo oscuro
      const quote = section.querySelector('.historia__quote')
      if (quote) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: quote,
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        })
        tl.from(quote, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power2.out',
        })
        .to(quote, {
          textShadow: [
            '0 0 10px rgba(176,0,11,0.85)',
            '0 0 28px rgba(176,0,11,0.55)',
            '0 0 60px rgba(176,0,11,0.28)',
          ].join(', '),
          duration: 1.3,
          ease: 'power1.out',
        }, '-=0.2')
      }

      // Spotlight body
      const spotBody = section.querySelector('.historia__spotlight-body')
      if (spotBody) {
        gsap.from(spotBody, {
          opacity: 0,
          y: 20,
          duration: 0.7,
          ease: 'power2.out',
          delay: 0.3,
          scrollTrigger: {
            trigger: spotBody,
            start: 'top 84%',
            toggleActions: 'play none none none',
          }
        })
      }

      // Stats — números caen en cascada
      gsap.from(section.querySelectorAll('.historia__stat'), {
        opacity: 0,
        y: 28,
        stagger: 0.1,
        duration: 0.65,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section.querySelector('.historia__stats'),
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      })

      // Stats count-up
      section.querySelectorAll('.historia__stat-num[data-count]').forEach(el => {
        const end    = parseInt(el.dataset.count)
        const prefix = el.dataset.prefix || ''
        const suffix = el.dataset.suffix || ''
        const obj    = { val: 0 }
        gsap.to(obj, {
          val: end,
          duration: 1.5,
          ease: 'power2.out',
          snap: { val: 1 },
          onUpdate() {
            el.textContent = prefix + Math.round(obj.val) + suffix
          },
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        })
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <section ref={sectionRef} className="historia historia--grainient" id="historia">
      <div className="historia__grainient-bg" aria-hidden="true">
        <Grainient
          color1="#B0000B"
          color2="#FFFFFF"
          color3="#000000"
          timeSpeed={0.18}
          colorBalance={0.53}
          warpStrength={1.0}
          warpFrequency={0.5}
          warpSpeed={1.5}
          warpAmplitude={5}
          blendAngle={-24}
          blendSoftness={0.05}
          rotationAmount={500.0}
          noiseScale={1.6}
          grainAmount={0.1}
          grainScale={2.0}
          contrast={1.4}
          gamma={1.0}
          saturation={0.9}
          zoom={0.95}
        />
      </div>

      {/* Opening */}
      <div className="historia__opening">
        <p className="historia__eyebrow">Nuestra historia</p>
        <h2 className="historia__headline">
          Cuatro generaciones.<br />
          <span className="historia__accent">Una pasión.</span>
        </h2>
        <p className="historia__sub">
          Lo que comenzó como una carnicería familiar en el centro de Juárez
          se convirtió en la marca que hoy conocen miles de familias chihuahuenses.
        </p>
      </div>

      {/* Stats */}
      <div className="historia__stats">
        <div className="historia__stat">
          <span className="historia__stat-num" data-count="60" data-prefix="+">+60</span>
          <span className="historia__stat-label">Años en la industria</span>
        </div>
        <div className="historia__stat-divider" />
        <div className="historia__stat">
          <span className="historia__stat-num" data-count="4">4</span>
          <span className="historia__stat-label">Generaciones</span>
        </div>
        <div className="historia__stat-divider" />
        <div className="historia__stat">
          <span className="historia__stat-num" data-count="16">16</span>
          <span className="historia__stat-label">Sucursales en Juárez</span>
        </div>
        <div className="historia__stat-divider" />
        <div className="historia__stat">
          <span className="historia__stat-num" data-count="100" data-suffix="%">100%</span>
          <span className="historia__stat-label">Mexicano</span>
        </div>
      </div>

    </section>
  )
}
