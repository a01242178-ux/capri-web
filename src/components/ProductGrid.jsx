import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/ProductGrid.css'

gsap.registerPlugin(ScrollTrigger)

const products = [
  { id: 1, name: 'Ribeye', tagline: 'Premium · Marmoleado', image: '/images/fotos/dsc0017-web.jpg' },
  { id: 2, name: 'Tiras de Asado', tagline: 'Parrilla · Intenso', image: '/images/fotos/dsc0014-web.jpg' },
  { id: 3, name: 'Carne para Taco', tagline: 'Fresca · Lista', image: '/images/fotos/dsc0025-web.jpg' },
  { id: 4, name: 'Chamorro', tagline: 'Tradicional · Con hueso', image: '/images/fotos/dsc0019-web.jpg' },
  { id: 5, name: 'Cortes Selectos', tagline: 'Variedad · Calidad', image: '/images/fotos/dsc0001-web.jpg' },
  { id: 6, name: 'Brisket', tagline: 'Slow-cook · Suave', image: '/images/fotos/brisket.png' },
]

export default function ProductGrid() {
  const sectionRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const grid = gridRef.current
    if (!section || !grid) return

    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Intro text fade up
      gsap.from(section.querySelector('.product-grid__intro'), {
        opacity: 0,
        y: 40,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      })

      // Cards: clip-path wipe reveal + opacity, stagger per card
      const cards = grid.querySelectorAll('.product-card')
      gsap.from(cards, {
        clipPath: 'inset(0 100% 0 0)',
        opacity: 0,
        stagger: {
          each: 0.08,
          grid: 'auto',
          from: 'start',
        },
        duration: 0.65,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: grid,
          start: 'top 82%',
          toggleActions: 'play none none none',
        }
      })

      // CTA fade up
      gsap.from(section.querySelector('.product-grid__cta'), {
        opacity: 0,
        y: 24,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section.querySelector('.product-grid__cta'),
          start: 'top 90%',
          toggleActions: 'play none none none',
        }
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <section ref={sectionRef} className="product-grid" id="products">
      <div className="product-grid__intro">
        <div className="product-grid__eyebrow">Nuestros productos</div>
        <h2 className="product-grid__title">
          Todos los cortes.<br />
          <span className="product-grid__accent">Siempre frescos.</span>
        </h2>
        <p className="product-grid__lead">
          Res, cerdo, pollo y vísceras. Cortes seleccionados diariamente por nuestros carniceros.
        </p>
      </div>

      <div ref={gridRef} className="product-grid__grid">
        {products.map((p) => (
          <article className="product-card" key={p.id}>
            <div className="product-card__media">
              <img src={p.image} alt={p.name} loading="lazy" />
              <div className="product-card__grad" />
            </div>
            <div className="product-card__meta">
              <div className="product-card__tagline">{p.tagline}</div>
              <h3 className="product-card__name">{p.name}</h3>
            </div>
          </article>
        ))}
      </div>

      <div className="product-grid__cta">
        <a
          href="https://wa.me/526562191234?text=Hola%20Capri%20Carnes%2C%20quiero%20ordenar"
          className="product-grid__btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ordena por WhatsApp
        </a>
      </div>
    </section>
  )
}
