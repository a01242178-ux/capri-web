import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/Timeline.css'

gsap.registerPlugin(ScrollTrigger)

const milestones = [
  { year: '1960', title: 'Fundación', text: 'Nace una carnicería de mercado en el Mercado Juárez, Ciudad Juárez, Chihuahua. Una carnicería familiar con compromiso por el servicio y la calidad.' },
  { year: '1970', title: 'Más de 3 Sucursales', text: 'Todas de diferentes nombres. La más conocida: "La Terraza Social Capri" en una pequeña esquina.' },
  { year: '1985', title: 'Rancho', text: 'Se adquiere un rancho en Chihuahua, iniciando la pasión por la ganadería.' },
  { year: '1998', title: 'El Nombre Capri', text: 'Fusión a una marca única. Homologación oficial de "Capri Carnes" con 7 sucursales.' },
  { year: '2006', title: 'Expansión', text: 'La ciudad crece. Capri se expande a cada rincón.' },
  { year: '2018', title: '+12 Sucursales', text: 'Llegamos a toda la ciudad. Calidad y servicio al alcance de cada familia juarense.' },
  { year: '2022', title: 'Renovación', text: 'Modernizamos procesos y estándares sin perder la esencia artesanal.' },
  { year: '2025', title: 'Nuevas Tecnologías', text: 'Lanzamiento de App Oficial para compra online: ordena y recoge, o a domicilio.' },
  { year: 'Hoy', title: 'Legado', text: 'Trabajando como nunca antes. +60 años, cuarta generación. Orgullosamente juarenses.' },
]

export default function Timeline() {
  const sectionRef = useRef(null)
  const trackRef   = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const track   = trackRef.current
    if (!section || !track) return

    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const nodes = track.querySelectorAll('.timeline__node')

      gsap.set(nodes, { opacity: 0, y: 40 })

      gsap.to(nodes, {
        opacity: 1,
        y: 0,
        stagger: 0.07,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <section ref={sectionRef} className="timeline" id="timeline">

      {/* Video background */}
      <div className="timeline__video-bg">
        <video
          src="/videos/rancho.mp4"
          autoPlay
          muted
          loop
          playsInline
          disableRemotePlayback
          aria-hidden="true"
        />
      </div>

      {/* Header */}
      <div className="timeline__intro">
        <div className="timeline__eyebrow">Desde 1960</div>
        <h2 className="timeline__title">
          Más de <span className="timeline__accent">60 años</span><br />de tradición
        </h2>
        <p className="timeline__lead">
          Cuatro generaciones dedicadas a llevar la mejor carne a las familias juarenses.
        </p>
      </div>

      {/* Horizontal track */}
      <div ref={trackRef} className="timeline__track">
        {milestones.map((m, i) => {
          const isLast = i === milestones.length - 1
          return (
            <article
              key={i}
              className={`timeline__node${isLast ? ' timeline__node--hoy' : ''}`}
            >
              <div className="timeline__year">{m.year}</div>
              <div className="timeline__content">
                <h3 className="timeline__node-title">{m.title}</h3>
                <p className="timeline__node-text">{m.text}</p>
              </div>
            </article>
          )
        })}
      </div>

      <div className="timeline__scroll-hint">
        <span>Desliza</span>
        <span>→</span>
      </div>

      <div className="timeline__cta">
        <a
          href="#quienes-somos"
          className="timeline__cta-btn"
          onClick={(e) => { e.preventDefault(); document.getElementById('quienes-somos')?.scrollIntoView({ behavior: 'smooth' }) }}
        >
          Ver más sobre quiénes somos →
        </a>
      </div>

    </section>
  )
}
