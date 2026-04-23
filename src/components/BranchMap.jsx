import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/BranchMap.css'
import branchData from '../data/branches.json'

gsap.registerPlugin(ScrollTrigger)

export default function BranchMap() {
  const sectionRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const grid = gridRef.current
    if (!section || !grid) return

    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Section intro
      gsap.from(section.querySelector('.branches__intro'), {
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

      // Cards cascade: each slides up with 45ms stagger
      const cards = grid.querySelectorAll('.branch-card')
      gsap.from(cards, {
        opacity: 0,
        y: 48,
        stagger: 0.045,
        duration: 0.55,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: grid,
          start: 'top 82%',
          toggleActions: 'play none none none',
        }
      })

      // CTA
      gsap.from(section.querySelector('.branches__cta'), {
        opacity: 0,
        y: 24,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section.querySelector('.branches__cta'),
          start: 'top 92%',
          toggleActions: 'play none none none',
        }
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <section ref={sectionRef} className="branches" id="branches">
      <div className="branches__intro">
        <div className="branches__eyebrow">Sucursales</div>
        <h2 className="branches__title">
          Estamos <span className="branches__accent">cerca</span><br />
          de ti
        </h2>
        <p className="branches__lead">
          {branchData.length} sucursales en Ciudad Juárez. Encuentra la más cercana y pasa por tu corte favorito.
        </p>
      </div>

      <div ref={gridRef} className="branches__grid">
        {branchData.slice(0, 16).map((b) => (
          <article className="branch-card" key={b.id}>
            <div className="branch-card__title-row">
              <h3 className="branch-card__name">{b.name.replace('Sucursal ', '')}</h3>
              {b.hours && <span className="branch-card__hours">{b.hours}</span>}
            </div>
            {b.address && <p className="branch-card__address">{b.address}</p>}
            {b.phone && (
              <a href={`tel:${b.phone.replace(/\D/g, '')}`} className="branch-card__phone">
                {b.phone}
              </a>
            )}
          </article>
        ))}
      </div>

      <div className="branches__cta">
        <a
          href="https://maps.google.com/?q=Capri+Carnes+Juarez"
          className="branches__btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver todas en el mapa
        </a>
      </div>
    </section>
  )
}
