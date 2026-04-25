import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/Productos.css'

gsap.registerPlugin(ScrollTrigger)

const driveImg = (id) => `https://drive.google.com/thumbnail?id=${id}&sz=w800`

const catalog = [
  {
    id: 'res',
    label: 'Res',
    image: driveImg('1jeFxxD6wr2y2lmvRzdRQYy7oSqGuyP1v'),
    items: [
      'Pulpa Rebanada', 'Pulpa Molida', 'Para Deshebrar', 'Molida Especial',
      'Cocido de Carrizo', 'Cocido de Costilla', 'Cola de Res', 'Suadero',
      'Chuleta del 7 y 0', 'Chuleta de Lomo', 'Chuleta de Costilla',
      'Carrillera', 'Brisket', 'Back Rib', 'Cabeza de Res sin Lengua',
    ],
  },
  {
    id: 'puerco',
    label: 'Puerco',
    image: null,
    items: [
      'Pierna de Puerco sin Hueso', 'Pierna de Puerco con Hueso', 'Mano de Puerco',
      'Lomo de Puerco', 'Lomo Ahumado', 'Espinazo', 'Costilla San Louis',
      'Costilla de Puerco', 'Chuleta de Puerco c/Hueso Procesada', 'Chamorro',
      'Boston', 'Adobada de Puerco', 'Cabeza de Puerco',
    ],
  },
  {
    id: 'pollo',
    label: 'Pollo',
    image: null,
    items: ['Pierna y Muslo', 'Pechuga de Pollo'],
  },
  {
    id: 'cortes',
    label: 'Cortes',
    image: driveImg('17Y6B634z41HkNPID9ldSI1jdlFKzNYvW'),
    items: [
      'Arrachera', 'Filete', 'New York', 'Picaña', 'Porter House',
      'Prime Rib', 'Rib Eye', 'Sirloin', 'Tomahawk',
    ],
  },
  {
    id: 'embutidos',
    label: 'Embutidos',
    image: null,
    items: ['Chorizo', 'Jamón', 'Manteca de Puerco', 'Queso Menonita', 'Salchicha', 'Tocino'],
  },
  {
    id: 'cocidos',
    label: 'Cocidos',
    image: null,
    items: ['Barbacoa', 'Buche Cocido', 'Ch. Prensado', 'Deshebrada Cocida', 'Tripa Cocida'],
  },
  {
    id: 'visceras',
    label: 'Vísceras',
    image: null,
    items: ['Buche', 'Cachete', 'Hígado', 'Labio', 'Lengua', 'Menudo', 'Pata de Res', 'Tripa Cruda'],
  },
  {
    id: 'paquetes',
    label: 'Paquetes',
    image: null,
    items: [
      'Paquete Carrillera', 'Paquete Ch. Costilla', 'Paquete Chuck para Asar',
      'Paquete Discada', 'Paquete Hamburguesa', 'Paquete Pastor',
      'Paquete Rib Eye', 'Paquete Sirloin',
    ],
  },
]

export default function Productos() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from(section.querySelector('.productos__hero-text'), {
        opacity: 0, y: 40, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' }
      })
      section.querySelectorAll('.productos__cat-block').forEach(block => {
        gsap.from(block.querySelector('.productos__cat-header'), {
          opacity: 0, x: -30, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: block, start: 'top 85%', toggleActions: 'play none none none' }
        })
        gsap.from(block.querySelectorAll('.productos__item'), {
          opacity: 0, y: 20, stagger: 0.04, duration: 0.45, ease: 'power2.out',
          scrollTrigger: { trigger: block, start: 'top 80%', toggleActions: 'play none none none' }
        })
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <section ref={sectionRef} className="productos" id="productos">

      <div className="productos__hero-text">
        <p className="productos__eyebrow">Catálogo Completo</p>
        <h2 className="productos__headline">
          Buscamos lo mejor<br />
          <span className="productos__accent">de la región.</span>
        </h2>
      </div>

      <div className="productos__region">
        <div className="productos__region-inner">
          <div className="productos__region-photo">
            <img
              src={driveImg('1jeFxxD6wr2y2lmvRzdRQYy7oSqGuyP1v')}
              alt="Canales Capri — Selección de ganadería"
              loading="lazy"
            />
          </div>
          <div className="productos__region-text">
            <p>
              En Capri Carnes sabemos que la calidad empieza mucho antes de la vitrina.
              Por eso trabajamos de la mano con ganaderos del norte de Chihuahua y la zona fronteriza,
              gente que conoce el oficio de generación en generación.
            </p>
            <p>
              Aquí no improvisamos: seleccionamos cada animal con cuidado, respaldando la tradición ganadera
              de una región donde hacer las cosas bien es la norma.
              Cuando compras con nosotros, llevas a tu mesa el resultado de esa disciplina y respeto por la tierra.
            </p>
          </div>
        </div>
      </div>

      <div className="productos__variedad">
        <p className="productos__variedad-title">Descubre lo que tenemos para ti.</p>
        <p className="productos__variedad-sub">
          Todo lo bueno, en un solo lugar. En Capri Carnes preparamos cada sucursal
          pensando en lo que se te antoja, para que llegues y te lleves algo delicioso, listo para disfrutar.
        </p>
      </div>

      <div className="productos__catalog">
        {catalog.map((cat) => (
          <div key={cat.id} className="productos__cat-block" id={`cat-${cat.id}`}>
            <div className="productos__cat-header">
              {cat.image && (
                <div className="productos__cat-img-wrap">
                  <img src={cat.image} alt={`${cat.label} — Capri Carnes`} loading="lazy" />
                </div>
              )}
              <h3 className="productos__cat-title">{cat.label}</h3>
              <span className="productos__cat-count">{cat.items.length} productos</span>
            </div>
            <div className="productos__grid">
              {cat.items.map((item, i) => (
                <div className="productos__item" key={i}>
                  <span className="productos__item-name">{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="productos__cta">
        <a
          href="https://wa.me/526562191234?text=Hola%20Capri%20Carnes%2C%20quiero%20ordenar"
          className="productos__btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ordena por WhatsApp
        </a>
      </div>
    </section>
  )
}
