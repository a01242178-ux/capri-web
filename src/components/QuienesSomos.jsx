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
      'Todo empezó con Don Antonio García Villanueva en el Mercado Juárez de Ciudad Juárez, Chihuahua. En una época donde la carne era sinónimo de celebración y de mesa bien puesta, Don Antonio entendió que su oficio iba más allá de vender: era alimentar a una comunidad.',
      'Con apenas 21 años tomó las riendas del negocio familiar. Sin tecnología, sin cadenas de frío modernas — solo con el conocimiento artesanal heredado y la determinación de quien sabe lo que vale. Esa primera carnicería de barrio fue la semilla de todo lo que vendría.',
      'El trato personal con cada cliente, el cuidado al elegir cada pieza, la honestidad en el peso y en el precio. Esos fueron los pilares que Don Antonio plantó, y que hoy, más de 60 años después, siguen siendo el ADN de Capri Carnes.',
    ],
    image: driveImg('1yGTEFtEwAjpBQEZMPAdxy31noc_Q6XZR'),
    imageAlt: 'Don Antonio García Villanueva — Fundador de Capri Carnes',
  },
  {
    id: 'terraza',
    label: 'El Nombre que Nos Define',
    title: 'La Terraza Social Capri',
    body: [
      'En los años 60, Ciudad Juárez vivía su edad dorada. La ciudad era bulliciosa, fronteriza, llena de vida nocturna y orgullo regional. En ese contexto nació nuestra sucursal más emblemática: un local de dos pisos donde el primero era carnicería y el segundo era un salón de baile.',
      'Al segundo piso le llamaban "La Terraza Social Capri". Ahí tocaban algunas de las mejores orquestas de México — música en vivo, baile, y abajo, la mejor carne de la ciudad. Era el lugar donde la gente se reunía, y ese espíritu de encuentro quedó grabado en nuestro nombre para siempre.',
      'Con el tiempo, los juarenses empezaron a llamar a nuestra carnicería simplemente "la Capri". El nombre pegó, se transmitió de generación en generación, hasta que en 1998 lo oficializamos para todas nuestras sucursales. Un legado nacido de la música, la carne y el orgullo juarense.',
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
      'Crecer en Ciudad Juárez no es tarea fácil. La ciudad tiene carácter propio — es exigente, directa, y su gente sabe distinguir lo auténtico de lo que no lo es. Capri Carnes creció exactamente así: sin atajos, sucursal a sucursal, zona a zona.',
      'Fuimos llegando a cada colonia con el mismo producto y el mismo trato. No crecimos porque sí — crecimos porque la gente nos buscaba. Cuando abríamos una nueva sucursal, ya había familias esperándonos.',
      'Hoy contamos con más de 16 puntos en toda la ciudad. Desde el centro histórico hasta los fraccionamientos más nuevos. Cada ubicación, elegida pensando en estar cerca de quien nos necesita.',
    ],
    image: driveImg('1k57CejUWkZa1JYZclFuyT_RUD3YMoW-Q'),
    imageAlt: 'Sucursal Ejército Nacional — Capri Carnes',
  },
  {
    id: 'modernizacion',
    label: 'Renovación 2022',
    title: 'Modernización de Sucursales',
    body: [
      'En 2022 iniciamos la transformación más profunda de nuestra historia reciente. No fue solo renovar instalaciones — fue reimaginar lo que debe ser una carnicería del siglo XXI sin perder lo que nos hace únicos.',
      'Nuevos equipos de refrigeración, procesos más eficientes, espacios más cómodos para el cliente y mejores condiciones para nuestro equipo de trabajo. La primera sucursal renovada fue Santiago Blancas: amplia, limpia, con la mejor selección de cortes que hemos tenido.',
      'La modernización continúa. Cada nueva apertura trae los mismos estándares — calidad visible desde que entras, atención que se nota, y el mismo respeto por el producto que aprendimos desde la primera generación.',
    ],
    image: driveImg('1F4hvNOkVz4ZvW6oOw3BtiYTtmwzK0Z1S'),
    imageAlt: 'Sucursal Santiago Blancas — Capri Carnes renovada',
  },
  {
    id: 'app',
    label: '2025',
    title: 'La Cuarta Generación Digital',
    body: [
      'La cuarta generación entiende que el mundo cambió. Los clientes de hoy no siempre tienen tiempo de ir a la sucursal — quieren ordenar desde su teléfono, con la certeza de que van a recibir la misma calidad de siempre.',
      'En 2025 lanzamos la App Oficial de Capri Carnes: el catálogo completo en tu pantalla, con opción de recoger en la sucursal más cercana o recibirlo a domicilio. Más de 60 años de tradición, ahora en la palma de tu mano.',
      'Disponible en App Store para iPhone y en Google Play para Android.',
    ],
    image: '/images/capri-logo.jpg',
    imageAlt: 'App Capri Carnes',
    isApp: true,
  },
  {
    id: 'rancho',
    label: 'Del Rancho a tu Mesa',
    title: 'Ganadería Chihuahuense',
    body: [
      'En 1985 adquirimos nuestro primer rancho en el estado de Chihuahua, y con eso nació algo que va más allá del negocio: una pasión genuina por la ganadería. Chihuahua tiene una de las tradiciones ganaderas más fuertes del país, y nosotros somos parte de esa historia.',
      'Hoy trabajamos de la mano con ganaderos del norte de Chihuahua y la zona fronteriza — gente que conoce el oficio de generación en generación, igual que nosotros. Seleccionamos cada animal con cuidado, conociendo su origen, su crianza, su proceso.',
      'Cuando compras en Capri Carnes, no compras carne anónima. Compras el resultado de una cadena de cuidado que empieza en el campo y termina en tu mesa. Eso es lo que nos hace distintos, y lo que seguiremos defendiendo.',
    ],
    image: driveImg('1rEquuUN8FzcDsqiFdQf3Jyv5ZCgvtiGh'),
    imageAlt: 'Rancho Capri Carnes — Vacas en pasto, Chihuahua',
    extraImages: [
      {
        src: driveImg('1uIodc9cZtpttp-Wo4AgzaCALk1XcA-gO'),
        alt: 'Arreando a caballo — Capri Carnes',
        label: 'Ganadería',
        caption: 'Del rancho a tu mesa',
      },
      {
        src: driveImg('14SQcoVf631y2iW06wKZ8cYWZo_I4LuC2'),
        alt: 'Canales Capri — Proceso de beneficio',
        isCanales: true,
        label: 'Proceso',
        caption: 'Selección artesanal',
      },
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
                  <div key={j} className="qs__extra-img-wrap">
                    <img
                      src={ei.src}
                      alt={ei.alt}
                      loading="lazy"
                      className={ei.isCanales ? 'qs__canales-img' : undefined}
                    />
                    {(ei.label || ei.caption) && (
                      <div className="qs__extra-img-overlay">
                        {ei.label && <span className="qs__extra-img-label">{ei.label}</span>}
                        {ei.caption && <p className="qs__extra-img-caption">{ei.caption}</p>}
                      </div>
                    )}
                  </div>
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
