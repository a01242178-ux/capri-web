import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/Sucursales.css'

gsap.registerPlugin(ScrollTrigger)

const branches = [
  { id: 1, name: 'Guadalupe Victoria',  address: 'Av. Guadalupe Victoria, Ciudad Juárez, Chih.', hours: '8:00 - 18:00', phone: '(656) 219-1234' },
  { id: 2, name: 'Ejército Nacional',   address: 'Blvd. Ejército Nacional, Ciudad Juárez, Chih.', hours: '8:00 - 19:00', phone: '(656) 219-5678' },
  { id: 3, name: 'Santiago Blancas',    address: 'Av. Santiago Blancas, Ciudad Juárez, Chih.',   hours: '8:00 - 18:00', phone: '(656) 219-9012' },
  { id: 4, name: 'Arizona',             address: 'Av. Arizona, Ciudad Juárez, Chih.',             hours: '8:00 - 18:00', phone: '(656) 219-3456' },
  { id: 5, name: 'Jilotepec',           address: 'Calle Jilotepec, Ciudad Juárez, Chih.',         hours: '8:00 - 18:00', phone: '(656) 219-7890' },
  { id: 6, name: 'Valle del Sol',       address: 'Col. Valle del Sol, Ciudad Juárez, Chih.',      hours: '8:00 - 18:00', phone: '(656) 219-2345' },
  { id: 7, name: 'Talamas',             address: 'Av. Talamas, Ciudad Juárez, Chih.',             hours: '8:00 - 17:00', phone: '(656) 219-6789' },
]

export default function Sucursales() {
  const sectionRef = useRef(null)
  const [photoIdx, setPhotoIdx] = useState(0)

  const driveImg = (id) => `https://drive.google.com/thumbnail?id=${id}&sz=w1200`

  const heroPhotos = [
    { src: driveImg('1k57CejUWkZa1JYZclFuyT_RUD3YMoW-Q'), alt: 'Sucursal Ejército Nacional — Capri Carnes' },
    { src: driveImg('1F4hvNOkVz4ZvW6oOw3BtiYTtmwzK0Z1S'), alt: 'Sucursal Santiago Blancas — Capri Carnes' },
  ]

  // Auto-rotate hero photo every 5s
  useEffect(() => {
    const id = setInterval(() => setPhotoIdx(i => (i + 1) % heroPhotos.length), 5000)
    return () => clearInterval(id)
  }, [heroPhotos.length])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from(section.querySelectorAll('.sucursales__branch-card'), {
        opacity: 0,
        y: 36,
        stagger: 0.06,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section.querySelector('.sucursales__grid'),
          start: 'top 82%',
          toggleActions: 'play none none none',
        }
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <section ref={sectionRef} className="sucursales" id="sucursales">

      <div className="sucursales__hero">
        {heroPhotos.map((photo, i) => (
          <img
            key={i}
            src={photo.src}
            alt={photo.alt}
            className={`sucursales__hero-img${photoIdx === i ? ' is-active' : ''}`}
            loading="lazy"
          />
        ))}
        <div className="sucursales__hero-overlay">
          <p className="sucursales__eyebrow">Sucursales</p>
          <h2 className="sucursales__headline">Estamos cerca de ti</h2>
          <p className="sucursales__sub">16+ sucursales en Ciudad Juárez. Encuentra la más cercana.</p>
        </div>
      </div>

      <div className="sucursales__map">
        <iframe
          src="https://maps.google.com/maps?q=Capri+Carnes+Ciudad+Juarez+Chihuahua+Mexico&output=embed&hl=es"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Sucursales Capri Carnes en Ciudad Juárez"
        />
      </div>

      <div className="sucursales__content">
        <div className="sucursales__grid">
          {branches.map(b => (
            <article className="sucursales__branch-card" key={b.id}>
              <div className="sucursales__branch-num">{String(b.id).padStart(2, '0')}</div>
              <h3 className="sucursales__branch-name">{b.name}</h3>
              {b.address && <p className="sucursales__branch-address">{b.address}</p>}
              <div className="sucursales__branch-meta">
                {b.hours && <span className="sucursales__branch-hours">{b.hours}</span>}
                {b.phone && (
                  <a href={`tel:${b.phone.replace(/\D/g,'')}`} className="sucursales__branch-phone">
                    {b.phone}
                  </a>
                )}
              </div>
              <a
                href={`https://maps.google.com/?q=Capri+Carnes+${encodeURIComponent(b.name)}+Juarez`}
                className="sucursales__branch-maps"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver en Maps →
              </a>
            </article>
          ))}
        </div>

        <div className="sucursales__cta">
          <a
            href="https://maps.google.com/?q=Capri+Carnes+Juarez"
            className="sucursales__btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver todas en Google Maps
          </a>
        </div>
      </div>
    </section>
  )
}
