import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Grainient from './Grainient'
import '../styles/Blog.css'

gsap.registerPlugin(ScrollTrigger)

const posts = [
  {
    id: 1,
    category: 'Ganadería',
    title: 'Del rancho a tu mesa: cómo seleccionamos nuestro ganado',
    excerpt: 'Te contamos el proceso detrás de cada corte — desde la selección del ganado en el norte de Chihuahua hasta la vitrina de tu sucursal.',
    image: '/images/fotos/rancho.jpg',
    date: 'Abril 2025',
  },
  {
    id: 2,
    category: 'Recetas',
    title: 'Cómo preparar el Rib Eye perfecto en casa',
    excerpt: 'Tips de nuestros carniceros para lograr ese sellado y término ideal. Sencillo, sin complicaciones.',
    image: '/images/fotos/dsc0017-web.jpg',
    date: 'Marzo 2025',
  },
  {
    id: 3,
    category: 'Tips',
    title: '¿Qué corte elegir según la ocasión?',
    excerpt: 'Discada familiar, cena romántica o tacos rápidos — hay un corte perfecto para cada momento.',
    image: '/images/fotos/dsc0014-web.jpg',
    date: 'Febrero 2025',
  },
]

export default function Blog() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from(section.querySelectorAll('.blog__card'), {
        opacity: 0,
        y: 40,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section.querySelector('.blog__grid'),
          start: 'top 82%',
          toggleActions: 'play none none none',
        }
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <section ref={sectionRef} className="blog" id="blog">
      <div className="blog__grainient-bg" aria-hidden="true">
        <Grainient
          color1="#B0000B"
          color2="#FFFFFF"
          color3="#000000"
          timeSpeed={0.12}
          colorBalance={0.65}
          warpStrength={0.6}
          warpFrequency={0.3}
          warpSpeed={1.0}
          warpAmplitude={3}
          blendAngle={-15}
          blendSoftness={0.08}
          rotationAmount={300}
          noiseScale={1.2}
          grainAmount={0.06}
          grainScale={2.0}
          contrast={1.2}
          gamma={1.0}
          saturation={0.75}
          zoom={0.95}
        />
      </div>

      <div className="blog__intro">
        <p className="blog__eyebrow">Blog</p>
        <h2 className="blog__headline">
          Ganadería, recetas<br />
          <span className="blog__accent">y cultura cárnica.</span>
        </h2>
        <p className="blog__sub">
          Artículos de nuestros expertos sobre el mundo de la carne.
        </p>
      </div>

      <div className="blog__grid">
        {posts.map(post => (
          <article className="blog__card" key={post.id}>
            <div className="blog__card-media">
              <img src={post.image} alt={post.title} loading="lazy" />
            </div>
            <div className="blog__card-body">
              <span className="blog__card-category">{post.category}</span>
              <h3 className="blog__card-title">{post.title}</h3>
              <p className="blog__card-excerpt">{post.excerpt}</p>
              <div className="blog__card-footer">
                <span className="blog__card-date">{post.date}</span>
                <span className="blog__card-link">Leer más →</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
