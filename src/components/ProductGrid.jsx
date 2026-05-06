import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/ProductGrid.css'

gsap.registerPlugin(ScrollTrigger)

const products = [
  { id: 1, name: 'Rib Eye',           tagline: 'Corte Premium · Marmoleado',    image: '/images/products/ribeye.jpg' },
  { id: 2, name: 'Tripa Cocida',      tagline: 'Cocidos · Juarense',            image: '/images/products/tripa-cocida.jpg' },
  { id: 3, name: 'Carrizo',           tagline: 'Res · Tradicional',             image: '/images/products/carrizo.jpg' },
  { id: 4, name: 'Puerco sin Hueso',  tagline: 'Puerco · Versátil',             image: '/images/products/puerco-sin-hueso.jpg' },
  { id: 5, name: 'Pulpa Molida',      tagline: 'Res · Fresca',                  image: '/images/products/pulpa-molida.jpg' },
  { id: 6, name: 'Pechuga de Pollo',  tagline: 'Pollo · Ligero',                image: '/images/products/pechuga-pollo.jpg' },
  { id: 7, name: 'Paquete T-Bone',    tagline: 'Paquete · Para asar',           image: '/images/products/paquete-tbone.jpg' },
  { id: 8, name: 'Deshebrada Cocida', tagline: 'Cocidos · Lista para tacos',    image: '/images/products/deshebrada-cocida.jpg' },
  { id: 9, name: 'Hígado',            tagline: 'Vísceras · Nutritivo',          image: '/images/products/higado.jpg' },
]

export default function ProductGrid() {
  const sectionRef  = useRef(null)
  const gridRef     = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const grid    = gridRef.current
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

    // Hover tilt — desktop with pointer only
    mm.add('(hover: hover) and (prefers-reduced-motion: no-preference)', () => {
      const cards = grid.querySelectorAll('.product-card')
      const cleanups = []

      cards.forEach(card => {
        const onMove = (e) => {
          const rect = card.getBoundingClientRect()
          const x = (e.clientX - rect.left) / rect.width - 0.5
          const y = (e.clientY - rect.top) / rect.height - 0.5
          gsap.to(card, {
            rotateY: x * 12,
            rotateX: -y * 10,
            scale: 1.02,
            duration: 0.35,
            ease: 'power2.out',
            overwrite: true,
          })
        }
        const onLeave = () => {
          gsap.to(card, {
            rotateY: 0,
            rotateX: 0,
            scale: 1,
            duration: 0.55,
            ease: 'power3.out',
            overwrite: true,
          })
        }
        card.addEventListener('mousemove', onMove)
        card.addEventListener('mouseleave', onLeave)
        cleanups.push(() => {
          card.removeEventListener('mousemove', onMove)
          card.removeEventListener('mouseleave', onLeave)
        })
      })

      return () => cleanups.forEach(fn => fn())
    })

    return () => mm.revert()
  }, [])

  return (
    <section ref={sectionRef} className="product-grid" id="products">
      <div className="product-grid__grainient-bg" aria-hidden="true" />

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
          href="#productos"
          className="product-grid__btn"
          onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('capri:navigate', { detail: 'productos' })) }}
        >
          Conoce nuestros productos →
        </a>
      </div>
    </section>
  )
}
