import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/Historia.css'

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

      // Chapter titles — slide up + neon rojo al entrar
      section.querySelectorAll('.historia__chapter-title').forEach(title => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: title,
            start: 'top 86%',
            toggleActions: 'play none none none',
          }
        })
        tl.from(title, {
          opacity: 0,
          y: 36,
          duration: 0.65,
          ease: 'power2.out',
        })
        .to(title, {
          textShadow: [
            '0 0 6px rgba(176,0,11,0.55)',
            '0 0 20px rgba(176,0,11,0.35)',
            '0 0 48px rgba(176,0,11,0.18)',
          ].join(', '),
          duration: 1.0,
          ease: 'power1.out',
        }, '-=0.15')
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
    })

    return () => mm.revert()
  }, [])

  return (
    <section ref={sectionRef} className="historia" id="historia">

      {/* Opening */}
      <div className="historia__opening">
        <p className="historia__eyebrow">Nuestra historia</p>
        <h2 className="historia__headline">
          Tres generaciones.<br />
          <span className="historia__accent">Una pasión.</span>
        </h2>
        <p className="historia__sub">
          Lo que comenzó como una carnicería familiar en el centro de Juárez
          se convirtió en la marca que hoy conocen miles de familias chihuahuenses.
        </p>
      </div>

      {/* El fundador */}
      <div className="historia__chapter historia__chapter--founder">
        <div className="historia__chapter-text">
          <span className="historia__chapter-label">Primera generación</span>
          <h3 className="historia__chapter-title">
            Antonio García Villanueva
          </h3>
          <p className="historia__chapter-body">
            Los inicios de Capri Carnes se remontan a tres pequeñas sucursales
            en el centro de Ciudad Juárez. A los <strong>21 años</strong>,
            Antonio García Villanueva tomó las riendas del negocio familiar,
            marcando la primera gran sucesión de la familia García en la
            industria cárnica.
          </p>
          <p className="historia__chapter-body">
            Con visión de crecimiento, adquirió dos sucursales más y comenzó
            la expansión que definiría el futuro de la marca. En 1998, todas
            las sucursales homologaron su nombre: <strong>Capri Carnes</strong>.
          </p>
        </div>
        <div className="historia__chapter-visual">
          <div className="historia__photo-wrap">
            <img
              src="/images/historia/primera-sucursal.jpg"
              alt="Primera sucursal Capri Carnes — Ciudad Juárez"
              loading="lazy"
            />
            <div className="historia__photo-caption">
              La primera sucursal — Ciudad Juárez, años 60
            </div>
          </div>
        </div>
      </div>

      {/* ¿Por qué Capri? */}
      <div className="historia__spotlight">
        <div className="historia__spotlight-inner">
          <span className="historia__spotlight-tag">¿Por qué "Capri"?</span>
          <blockquote className="historia__quote">
            "En los años 60, nuestra sucursal Capri tenía dos pisos.
            El segundo se llamaba <em>La Terraza Social Capri</em> —
            donde tocaban las mejores orquestas de México."
          </blockquote>
          <p className="historia__spotlight-body">
            La gente empezó a llamarla <strong>"la carnicería Capri"</strong>.
            Ese nombre se quedó grabado. En 1998 se volvió oficial para todas
            las sucursales de la familia — un legado nacido de la música,
            la carne y el orgullo juarense.
          </p>
        </div>
      </div>

      {/* Expansión */}
      <div className="historia__chapter historia__chapter--second">
        <div className="historia__chapter-visual">
          <div className="historia__photo-wrap">
            <img
              src="/images/historia/rancho-2.jpg"
              alt="Calidad artesanal en cada corte Capri"
              loading="lazy"
            />
            <div className="historia__photo-caption">
              Calidad artesanal en cada corte
            </div>
          </div>
        </div>
        <div className="historia__chapter-text">
          <span className="historia__chapter-label">Crecimiento</span>
          <h3 className="historia__chapter-title">
            Juárez entera<br />nos conoce
          </h3>
          <p className="historia__chapter-body">
            Durante décadas, Capri Carnes fue creciendo sucursal a sucursal,
            zona a zona, hasta estar presente en cada rincón de Ciudad Juárez.
            Cada punto de venta lleva el mismo compromiso de calidad que
            caracterizó a la primera carnicería.
          </p>
          <p className="historia__chapter-body">
            Hoy, la tercera generación de la familia García continúa ese
            legado — sumando tecnología, e-commerce y nuevos formatos sin
            perder la esencia artesanal que nos define.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="historia__stats">
        <div className="historia__stat">
          <span className="historia__stat-num">+60</span>
          <span className="historia__stat-label">Años en la industria</span>
        </div>
        <div className="historia__stat-divider" />
        <div className="historia__stat">
          <span className="historia__stat-num">3</span>
          <span className="historia__stat-label">Generaciones</span>
        </div>
        <div className="historia__stat-divider" />
        <div className="historia__stat">
          <span className="historia__stat-num">16</span>
          <span className="historia__stat-label">Sucursales en Juárez</span>
        </div>
        <div className="historia__stat-divider" />
        <div className="historia__stat">
          <span className="historia__stat-num">100%</span>
          <span className="historia__stat-label">Mexicano</span>
        </div>
      </div>

    </section>
  )
}
