import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/BranchMap.css'

gsap.registerPlugin(ScrollTrigger)

const driveImg = (id) => `https://drive.google.com/thumbnail?id=${id}&sz=w1400`

const mainBranches = [
  { id: 1, name: 'Guadalupe Victoria' },
  { id: 2, name: 'Ejército Nacional' },
  { id: 3, name: 'Santiago Blancas' },
  { id: 4, name: 'Arizona' },
  { id: 5, name: 'Jilotepec' },
  { id: 6, name: 'Valle del Sol' },
]

export default function BranchMap() {
  const sectionRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const grid = gridRef.current
    if (!section || !grid) return

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from(section.querySelector('.branches__intro'), {
        opacity: 0, y: 40, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' }
      })
      gsap.from(grid.querySelectorAll('.branch-card'), {
        opacity: 0, y: 36, stagger: 0.06, duration: 0.55, ease: 'power3.out',
        scrollTrigger: { trigger: grid, start: 'top 85%', toggleActions: 'play none none none' }
      })
    })
    return () => mm.revert()
  }, [])

  const goToSucursales = (e) => {
    e.preventDefault()
    window.dispatchEvent(new CustomEvent('capri:navigate', { detail: 'sucursales' }))
  }

  return (
    <section ref={sectionRef} className="branches" id="branches">

      <div className="branches__photo-wrap">
        <img
          src={driveImg('1k57CejUWkZa1JYZclFuyT_RUD3YMoW-Q')}
          alt="Sucursal Ejército Nacional — Capri Carnes"
          className="branches__photo"
          loading="lazy"
        />
        <div className="branches__overlay" />

        <div className="branches__content">
          <div className="branches__intro">
            <div className="branches__eyebrow">Sucursales</div>
            <h2 className="branches__title">
              Estamos <span className="branches__accent">cerca</span><br />de ti
            </h2>
            <p className="branches__lead">
              16+ sucursales en Ciudad Juárez. Calidad y servicio al alcance de cada familia.
            </p>
          </div>

          <div ref={gridRef} className="branches__grid">
            {mainBranches.map((b) => (
              <article className="branch-card" key={b.id}>
                <h3 className="branch-card__name">{b.name}</h3>
              </article>
            ))}
          </div>

          <div className="branches__cta">
            <a href="#sucursales" className="branches__btn" onClick={goToSucursales}>
              Ver más sucursales →
            </a>
          </div>
        </div>
      </div>

    </section>
  )
}
