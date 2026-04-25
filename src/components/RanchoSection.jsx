import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/RanchoSection.css'

gsap.registerPlugin(ScrollTrigger)

const driveImg = (id) => `https://drive.google.com/thumbnail?id=${id}&sz=w1400`

export default function RanchoSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from(section.querySelector('.rancho__text'), {
        opacity: 0,
        x: 40,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      })
      gsap.from(section.querySelector('.rancho__photo'), {
        opacity: 0,
        scale: 1.04,
        duration: 1.0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 82%',
          toggleActions: 'play none none none',
        }
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <section ref={sectionRef} className="rancho" id="rancho">
      <div className="rancho__photo">
        <img
          src={driveImg('1rEquuUN8FzcDsqiFdQf3Jyv5ZCgvtiGh')}
          alt="Rancho Capri Carnes — Vacas en pasto, Chihuahua"
          loading="lazy"
        />
      </div>

      <div className="rancho__text">
        <span className="rancho__eyebrow">Del Rancho a la Vitrina</span>
        <h2 className="rancho__headline">
          Nuestro rancho.<br />
          <span className="rancho__accent">Nuestra raíz.</span>
        </h2>
        <p className="rancho__body">
          En 1985 adquirimos nuestro rancho en Chihuahua — el inicio de una pasión
          por la ganadería que marcó para siempre la identidad de Capri Carnes.
        </p>
        <p className="rancho__body">
          Hoy trabajamos de la mano con ganaderos del norte de Chihuahua y la zona
          fronteriza, gente que conoce el oficio de generación en generación.
          Seleccionamos cada animal con cuidado, respaldando una tradición donde
          hacer las cosas bien es la norma.
        </p>
        <p className="rancho__body">
          Cuando compras en Capri, llevas a tu mesa el resultado de ese trabajo
          y ese respeto por la tierra.
        </p>
      </div>
    </section>
  )
}
