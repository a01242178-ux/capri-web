import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Grainient from './Grainient'
import '../styles/QuienesSomos.css'

gsap.registerPlugin(ScrollTrigger)

const driveImg = (id) => `https://drive.google.com/thumbnail?id=${id}&sz=w1200`

const chapters = [
  {
    id: 'fundacion',
    label: 'Primera Generación',
    title: 'Don Antonio García Villanueva',
    body: [
      'Todo empezó con Don Antonio García Villanueva en el Mercado Juárez, Ciudad Juárez, Chihuahua. Una carnicería pequeña, de barrio, con el compromiso de ofrecer siempre lo mejor.',
      'A los 21 años, Don Antonio tomó las riendas del negocio familiar y comenzó la expansión que definiría el futuro de Capri Carnes. Su visión: llevar calidad a cada rincón de la ciudad.',
    ],
    image: driveImg('1yGTEFtEwAjpBQEZMPAdxy31noc_Q6XZR'),
    imageAlt: 'Don Antonio García Villanueva — Fundador de Capri Carnes',
  },
  {
    id: 'terraza',
    label: 'El Nombre que Nos Define',
    title: 'La Terraza Social Capri',
    body: [
      'En los años 60, nuestra sucursal más emblemática tenía dos pisos. El segundo se llamaba "La Terraza Social Capri" — donde tocaban las mejores orquestas de México.',
      'La gente empezó a llamarla "la carnicería Capri". Ese nombre se quedó grabado en la memoria colectiva de Juárez. En 1998 se volvió oficial para todas las sucursales: un legado nacido de la música, la carne y el orgullo juarense.',
    ],
    image: '/images/historia/capri-neon.jpeg',
    imageAlt: 'Letrero neón Capri — La Terraza Social, Ciudad Juárez años 60',
    isNeon: true,
  },
  {
    id: 'juarez',
    label: 'Crecimiento',
    title: 'Juárez Entera Nos Conoce',
    body: [
      'Durante décadas, Capri Carnes fue creciendo sucursal a sucursal, zona a zona. Desde el centro histórico hasta las colonias más alejadas — siempre con la misma calidad.',
      'Hoy contamos con más de 16 sucursales en toda la ciudad. Cada punto lleva el mismo compromiso que caracterizó a la primera carnicería.',
    ],
    image: driveImg('1k57CejUWkZa1JYZclFuyT_RUD3YMoW-Q'),
    imageAlt: 'Sucursal Ejército Nacional — Capri Carnes',
  },
  {
    id: 'modernizacion',
    label: 'Renovación 2022',
    title: 'Modernización de Sucursales',
    body: [
      'En 2022 comenzamos una transformación profunda de nuestra infraestructura. Nuevas instalaciones, procesos más eficientes, estándares más altos — sin perder la esencia artesanal que nos define.',
      'La sucursal Santiago Blancas fue la primera en estrenar el nuevo concepto: espaciosa, moderna, con la mejor selección de cortes de la ciudad.',
    ],
    image: driveImg('1F4hvNOkVz4ZvW6oOw3BtiYTtmwzK0Z1S'),
    imageAlt: 'Sucursal Santiago Blancas — Capri Carnes renovada',
  },
  {
    id: 'app',
    label: '2025',
    title: 'Nueva App de Compras',
    body: [
      'Lanzamos la App Oficial de Capri Carnes — la forma más fácil de ordenar tus cortes favoritos. Ordena, recoge en sucursal o recíbelo a domicilio.',
      'Disponible en App Store y Google Play.',
    ],
    image: '/images/capri-logo.jpg',
    imageAlt: 'App Capri Carnes',
    isApp: true,
  },
  {
    id: 'rancho',
    label: 'Del Rancho al Mercado',
    title: 'Ganadería y Rancho',
    body: [
      'En 1985 adquirimos nuestro rancho en Chihuahua, marcando el inicio de nuestra pasión por la ganadería. Hoy trabajamos de la mano con ganaderos del norte de Chihuahua y la zona fronteriza.',
      'Seleccionamos cada animal con cuidado, respaldando la tradición ganadera de una región donde hacer las cosas bien es la norma.',
    ],
    image: driveImg('1rEquuUN8FzcDsqiFdQf3Jyv5ZCgvtiGh'),
    imageAlt: 'Rancho Capri Carnes — Vacas en pasto, Chihuahua',
    extraImages: [
      { src: driveImg('1uIodc9cZtpttp-Wo4AgzaCALk1XcA-gO'), alt: 'Arreando a caballo — Capri Carnes' },
      { src: driveImg('14SQcoVf631y2iW06wKZ8cYWZo_I4LuC2'), alt: 'Rastro — Proceso de beneficio Capri Carnes' },
    ],
  },
]

export default function QuienesSomos() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      section.querySelectorAll('.qs__chapter').forEach(chapter => {
        const elements = chapter.querySelectorAll('.qs__chapter-label, .qs__chapter-title, .qs__chapter-body')
        gsap.from(elements, {
          opacity: 0,
          y: 36,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: chapter,
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        })
        const visual = chapter.querySelector('.qs__chapter-visual')
        if (visual) {
          gsap.from(visual, {
            opacity: 0,
            x: chapter.classList.contains('qs__chapter--reverse') ? 40 : -40,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: chapter,
              start: 'top 82%',
              toggleActions: 'play none none none',
            }
          })
        }
      })

      // Neon photo — flicker ON → hold → OFF sobre la foto real (letras neón vs silueta oscura)
      const neonImg     = section.querySelector('.qs__neon-img')
      const neonTrigger = section.querySelector('.qs__chapter--terraza')
      if (neonImg && neonTrigger) {
        const off = 'brightness(0.20) saturate(0.05) contrast(1.05)'
        const on  = 'brightness(1.1) saturate(1.9) contrast(1.08)'
        const f   = (b, s) => `brightness(${b}) saturate(${s}) contrast(1.07)`

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: neonTrigger,
            start: 'top 70%',
            end: 'bottom 15%',
            scrub: 1,
          }
        })

        // Flicker ON — ~25% del scroll
        tl.set(neonImg, { filter: off })
          .to(neonImg, { filter: f(0.55, 0.6),  duration: 0.30, ease: 'none' })
          .to(neonImg, { filter: off,            duration: 0.20, ease: 'none' })
          .to(neonImg, { filter: f(0.90, 1.3),   duration: 0.25, ease: 'none' })
          .to(neonImg, { filter: f(0.25, 0.08),  duration: 0.15, ease: 'none' })
          .to(neonImg, { filter: f(1.05, 1.75),  duration: 0.20, ease: 'none' })
          .to(neonImg, { filter: f(0.35, 0.12),  duration: 0.12, ease: 'none' })
          .to(neonImg, { filter: on,             duration: 0.28, ease: 'power1.out' })
          // Hold encendido — ~50% del scroll
          .to(neonImg, { filter: on, duration: 3 })
          // Flicker OFF — ~25% del scroll
          .to(neonImg, { filter: f(0.80, 1.4),   duration: 0.20, ease: 'none' })
          .to(neonImg, { filter: on,             duration: 0.15, ease: 'none' })
          .to(neonImg, { filter: f(0.20, 0.06),  duration: 0.25, ease: 'none' })
          .to(neonImg, { filter: f(0.60, 0.8),   duration: 0.20, ease: 'none' })
          .to(neonImg, { filter: off,            duration: 0.30, ease: 'power1.in' })
      }


      // Spotlight quote — neon rojo pulsante
      const quote = section.querySelector('.qs__spotlight-quote')
      if (quote) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: quote,
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        })
        tl.from(quote, { opacity: 0, y: 30, duration: 0.8, ease: 'power2.out' })
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

      const spotBody = section.querySelector('.qs__spotlight-body')
      if (spotBody) {
        gsap.from(spotBody, {
          opacity: 0, y: 20, duration: 0.7, ease: 'power2.out', delay: 0.3,
          scrollTrigger: { trigger: spotBody, start: 'top 84%', toggleActions: 'play none none none' }
        })
      }
    })
    return () => mm.revert()
  }, [])

  return (
    <section ref={sectionRef} className="qs" id="quienes-somos">
      <div className="qs__grainient-bg" aria-hidden="true">
        <Grainient
          color1="#B0000B"
          color2="#FFFFFF"
          color3="#000000"
          timeSpeed={0.15}
          colorBalance={0.6}
          warpStrength={0.8}
          warpFrequency={0.4}
          warpSpeed={1.2}
          warpAmplitude={4}
          blendAngle={-20}
          blendSoftness={0.06}
          rotationAmount={400}
          noiseScale={1.4}
          grainAmount={0.07}
          grainScale={2.0}
          contrast={1.2}
          gamma={1.0}
          saturation={0.8}
          zoom={0.95}
        />
      </div>

      <div className="qs__intro">
        <p className="qs__eyebrow">Quiénes Somos</p>
        <h2 className="qs__headline">
          Más de 60 años.<br />
          <span className="qs__accent">Cuatro generaciones.</span>
        </h2>
        <p className="qs__sub">
          La historia de Capri Carnes es la historia de una familia juarense
          con pasión por la calidad y el servicio.
        </p>
      </div>

      {chapters.map((ch, i) => (
        <div key={ch.id}>
        <div className={`qs__chapter${i % 2 === 1 ? ' qs__chapter--reverse' : ''}${ch.isNeon ? ' qs__chapter--terraza' : ''}`}>
          <div className="qs__chapter-text">
            <span className="qs__chapter-label">{ch.label}</span>
            <h3 className="qs__chapter-title">{ch.title}</h3>
            {ch.body.map((p, j) => (
              <p key={j} className="qs__chapter-body">{p}</p>
            ))}
            {ch.isApp && (
              <div className="qs__app-badges">
                <a
                  href="#"
                  className="qs__app-badge"
                  aria-label="Descargar en App Store"
                  onClick={e => e.preventDefault()}
                >
                  App Store
                </a>
                <a
                  href="#"
                  className="qs__app-badge"
                  aria-label="Descargar en Google Play"
                  onClick={e => e.preventDefault()}
                >
                  Google Play
                </a>
              </div>
            )}
          </div>
          <div className={`qs__chapter-visual${ch.extraImages ? ' qs__chapter-visual--multi' : ''}${ch.isNeon ? ' qs__chapter-visual--neon' : ''}`}>
            {ch.isNeon ? (
              <div className="qs__photo-wrap">
                <img
                  src={ch.image}
                  alt={ch.imageAlt}
                  loading="lazy"
                  className="qs__neon-img"
                />
              </div>
            ) : (
              <>
                <img src={ch.image} alt={ch.imageAlt} loading="lazy" />
                {ch.extraImages && ch.extraImages.map((ei, j) => (
                  <img key={j} src={ei.src} alt={ei.alt} loading="lazy" />
                ))}
              </>
            )}
          </div>
        </div>

        {/* Spotlight neon — solo después de La Terraza Social */}
        {ch.isNeon && (
          <div className="qs__spotlight">
            <div className="qs__spotlight-inner">
              <span className="qs__spotlight-tag">¿Por qué "Capri"?</span>
              <blockquote className="qs__spotlight-quote">
                "En los años 60, nuestra sucursal tenía dos pisos.
                El segundo se llamaba <em>La Terraza Social Capri</em> —
                donde tocaban las mejores orquestas de México."
              </blockquote>
              <p className="qs__spotlight-body">
                La gente empezó a llamarla <strong>"la carnicería Capri"</strong>.
                Ese nombre se quedó grabado. En 1998 se volvió oficial para todas
                las sucursales — un legado nacido de la música, la carne y el
                orgullo juarense.
              </p>
            </div>
          </div>
        )}
        </div>
      ))}
    </section>
  )
}
