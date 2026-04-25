import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/BranchMap.css'

gsap.registerPlugin(ScrollTrigger)

const driveImg = (id) => `https://drive.google.com/thumbnail?id=${id}&sz=w1200`

const mainBranches = [
  { id: 1, name: 'Guadalupe Victoria' },
  { id: 2, name: 'Ejército Nacional' },
  { id: 3, name: 'Santiago Blancas' },
  { id: 4, name: 'Arizona' },
  { id: 5, name: 'Jilotepec' },
  { id: 6, name: 'Valle del Sol' },
]

const heroPhotos = [
  { src: driveImg('1k57CejUWkZa1JYZclFuyT_RUD3YMoW-Q'), alt: 'Sucursal Ejército Nacional — Capri Carnes' },
  { src: driveImg('1F4hvNOkVz4ZvW6oOw3BtiYTtmwzK0Z1S'), alt: 'Sucursal Santiago Blancas — Capri Carnes' },
]

export default function BranchMap() {
  const sectionRef = useRef(null)
  const gridRef = useRef(null)
  const [photoIdx, setPhotoIdx] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setPhotoIdx(i => (i + 1) % heroPhotos.length), 5000)
    return () => clearInterval(id)
  }, [])

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
        opacity: 0, y: 48, stagger: 0.045, duration: 0.55, ease: 'power3.out',
        scrollTrigger: { trigger: grid, start: 'top 82%', toggleActions: 'play none none none' }
      })
      gsap.from(section.querySelector('.branches__cta'), {
        opacity: 0, y: 24, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: section.querySelector('.branches__cta'), start: 'top 92%', toggleActions: 'play none none none' }
      })
    })
    return () => mm.revert()
  }, [])

  const scrollToSucursales = (e) => {
    e.preventDefault()
    document.getElementById('sucursales')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={sectionRef} className="branches" id="branches">

      <div className="branches__hero">
        {heroPhotos.map((p, i) => (
          <img
            key={i}
            src={p.src}
            alt={p.alt}
            className={`branches__hero-img${photoIdx === i ? ' is-active' : ''}`}
            loading="lazy"
          />
        ))}
        <div className="branches__hero-overlay">
          <div className="branches__intro">
            <div className="branches__eyebrow">Sucursales</div>
            <h2 className="branches__title">
              Estamos <span className="branches__accent">cerca</span><br />de ti
            </h2>
            <p className="branches__lead">
              16+ sucursales en Ciudad Juárez. Calidad y servicio al alcance de cada familia.
            </p>
          </div>
        </div>
      </div>

      <div ref={gridRef} className="branches__grid">
        {mainBranches.map((b) => (
          <article className="branch-card" key={b.id}>
            <h3 className="branch-card__name">{b.name}</h3>
          </article>
        ))}
      </div>

      <div className="branches__cta">
        <a
          href="#sucursales"
          className="branches__btn"
          onClick={scrollToSucursales}
        >
          Ver más sucursales →
        </a>
      </div>
    </section>
  )
}
