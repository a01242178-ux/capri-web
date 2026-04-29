import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Grainient from './Grainient'
import '../styles/Productos.css'

gsap.registerPlugin(ScrollTrigger)

const driveImg = (id) => `https://drive.google.com/thumbnail?id=${id}&sz=w800`

const productImages = {
  // RES
  'Para Deshebrar':                       driveImg('1EKGC31RiAlJ0Mn95pgJpfBrHh6o_voHC'),
  'Cola de Res':                          driveImg('1fVv6nGf6V8Vl9mmQH0kTQJWlT2HMWW2k'),
  'Chuleta del 7 y 0':                    driveImg('11eambV-TEF1SWsi9HvwKOoNQCyys-ukb'),
  'Chuleta de Lomo':                      driveImg('1loi3EbKBDW0BD_3x5nkVcdV0_FX6efda'),
  'Chuleta de Costilla':                  driveImg('1ssZ4imNOjI4o5dNhsCSmEeGsVuFP-qXD'),
  'Carrillera':                           driveImg('1VnDUe4fBPqwaKaUnnna-Cug4Ecs7Kur_'),
  'Brisket':                              driveImg('1ZHJ0UzYIesjql-4tfMuTH8u4IInMDO8Y'),
  'Back Rib':                             driveImg('12hcmsAnCaMZnnXa3r-RJauafWeW9ipVz'),
  'Cabeza de Res sin Lengua':             driveImg('1UrUpE558a9l_t7oIYgL7NZP5ZlYgRa25'),
  // PUERCO
  'Pierna de Puerco sin Hueso':           driveImg('1gvXgn0hZm87CjIzjMwxmfbpYg6cHjpe1'),
  'Mano de Puerco':                       driveImg('14brj4Hs5DiNA4y-3pVTBH3zra36KFc0h'),
  'Lomo de Puerco':                       driveImg('1FINPf_9oPcp4EJr441BpHJlyjbwLmye5'),
  'Espinazo':                             driveImg('1xyrtbFDsdTi6poPwR2uEm5ezxj5xqUFb'),
  'Chuleta de Puerco c/Hueso Procesada':  driveImg('1uKrqm9gwzUcx2YCFvHMgIgmFfXGvI_1I'),
  'Chamorro':                             driveImg('1ZWQ7Shf4oL3qZJhOGO4nBHa3eLZvb29-'),
  'Boston':                               driveImg('1LsWapZUgolsdgQBMivMdoBfTfucx2QzP'),
  'Cabeza de Puerco':                     driveImg('1AVg-QzjIte4Xu6AfH4BbisG9VFNyzPoy'),
  // POLLO
  'Pierna y Muslo':                       driveImg('1GpPjf-EL_BxOZa1HspVd3QudQwosx55E'),
  'Pechuga de Pollo':                     driveImg('1xTqkKuTHxumz0lxSoxT4Srh47fOSpGJK'),
  // CORTES
  'Arrachera':                            driveImg('1qgXiEaIyZ2z_mxrUUXANGrcdd2R98vj8'),
  'Filete':                               driveImg('1vMARHFP-I38dp9qgjfSSy_RY7JagW-Hz'),
  'Picaña':                               driveImg('1DZLRxDFVvfz5fQbLeFSfAIBZt2J-A7A9'),
  'Porter House':                         driveImg('1Ur8Znu3X0ujBk0sKH7S3npcc4EkpX798'),
  'Prime Rib':                            driveImg('1COQCmOE_6m_VEPF8v4fHPm_mrj8k80Wr'),
  'Rib Eye':                              driveImg('1GIMW9gPebOtpJSAclb-VxNJ9X1ULVc6x'),
  'Sirloin':                              driveImg('1wjvBzh2P3uMsU2yRNOgfItQBb0p_X4pc'),
  'Tomahawk':                             driveImg('1GjSZJH8uAi3sj5nawnrSM-E7hNdt13H3'),
  // EMBUTIDOS
  'Jamón':                                driveImg('1qhUdklKeLZWCJVaPyGXX7BH9-Hf25Id4'),
  'Manteca de Puerco':                    driveImg('1tPr2syihGAq0eJvSxDIn6osRfafsDyd-'),
  'Queso Menonita':                       driveImg('1MkbSEnXZNKxPHUD1lgFn9fXQK6giTrYi'),
  'Salchicha':                            driveImg('1H0To62szb87hw8LyYoynHZg82u99n8ry'),
  'Tocino':                               driveImg('1mZyfbcoct0x2pzdaJidFEz9b1Ya883pz'),
  // COCIDOS
  'Barbacoa':                             driveImg('1BoAlqmdHAiIFAiW7s4HSnV07XiLtO9Nq'),
  'Buche Cocido':                         driveImg('1WYxAqKYOvucnZ7SE--zIEy8T_6oph9ps'),
  'Deshebrada Cocida':                    driveImg('1-1FmqiMGXJPJfWII4vnRzBJEmVKL-haw'),
  // VÍSCERAS
  'Buche':                                driveImg('1Gv0ZhipVeZU3P7BBeDwV4KpnrFnXy1VZ'),
  'Cachete':                              driveImg('1Lli6t2PQxDENOnH1a3ICzorkOB7700UB'),
  'Hígado':                               driveImg('1wB6km5UVgjLKNlag9KO606y0XnlEqZWA'),
  'Labio':                                driveImg('1bn95yLfo5Bb-uh_j7a0z_XvtqI1t3AXO'),
  'Menudo':                               driveImg('15AEbKdkMWLG8X1jHmAt4XZhNp42WyJTy'),
  'Tripa Cruda':                          driveImg('1QLPZqK_I-iheyMaRnXspXe0Kut1I4EiD'),
  // PAQUETES
  'Paquete Carrillera':                   driveImg('1d5wSIuou0Ly2vDJc-4ekxcfSmmxwYKxk'),
  'Paquete Ch. Costilla':                 driveImg('1AvXSmkvqR-AIS445T9reQe8HUUz3W7NX'),
  'Paquete Chuck para Asar':              driveImg('1hXFcQqFw_rDZJH4W8H6kXnenEuD8cSpi'),
  'Paquete Discada':                      driveImg('1pbfetA7Qx0BYjZPA6xCBc68ppKYRSzoq'),
  'Paquete Hamburguesa':                  driveImg('11g5-Hl4b3hSRH7Pzu6ymv5yU4mulQjFu'),
  'Paquete Pastor':                       driveImg('1saBSjEJZlMCVb_tnpBdh9CNAaYlvq6Lo'),
  'Paquete Rib Eye':                      driveImg('10Pi3BKq1Yo7t1552Eisdq2K_EoK7uZxZ'),
  'Paquete Sirloin':                      driveImg('1D-KidzCmeEwvqR-X0Sv9Md0PF31MBRGQ'),
}

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
    image: driveImg('1AVg-QzjIte4Xu6AfH4BbisG9VFNyzPoy'),
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
    image: driveImg('1xTqkKuTHxumz0lxSoxT4Srh47fOSpGJK'),
    items: ['Pierna y Muslo', 'Pechuga de Pollo'],
  },
  {
    id: 'cortes',
    label: 'Cortes',
    image: driveImg('1qgXiEaIyZ2z_mxrUUXANGrcdd2R98vj8'),
    items: [
      'Arrachera', 'Filete', 'New York', 'Picaña', 'Porter House',
      'Prime Rib', 'Rib Eye', 'Sirloin', 'Tomahawk',
    ],
  },
  {
    id: 'embutidos',
    label: 'Embutidos',
    image: driveImg('1qhUdklKeLZWCJVaPyGXX7BH9-Hf25Id4'),
    items: ['Chorizo', 'Jamón', 'Manteca de Puerco', 'Queso Menonita', 'Salchicha', 'Tocino'],
  },
  {
    id: 'cocidos',
    label: 'Cocidos',
    image: driveImg('1BoAlqmdHAiIFAiW7s4HSnV07XiLtO9Nq'),
    items: ['Barbacoa', 'Buche Cocido', 'Ch. Prensado', 'Deshebrada Cocida', 'Tripa Cocida'],
  },
  {
    id: 'visceras',
    label: 'Vísceras',
    image: driveImg('1wB6km5UVgjLKNlag9KO606y0XnlEqZWA'),
    items: ['Buche', 'Cachete', 'Hígado', 'Labio', 'Lengua', 'Menudo', 'Pata de Res', 'Tripa Cruda'],
  },
  {
    id: 'paquetes',
    label: 'Paquetes',
    image: driveImg('1WL1iJeV3nf9Ik-wGy2a3vnY9wGja1iqO'),
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
    <section ref={sectionRef} className="productos productos--grainient" id="productos">
      <div className="productos__grainient-bg" aria-hidden="true">
        <Grainient
          color1="#B0000B"
          color2="#FFFFFF"
          color3="#000000"
          timeSpeed={0.18}
          colorBalance={0.53}
          warpStrength={1.0}
          warpFrequency={0.5}
          warpSpeed={1.5}
          warpAmplitude={5}
          blendAngle={-24}
          blendSoftness={0.05}
          rotationAmount={500.0}
          noiseScale={1.6}
          grainAmount={0.09}
          grainScale={2.0}
          contrast={1.35}
          gamma={1.0}
          saturation={0.85}
          zoom={0.95}
        />
      </div>

      <div className="productos__hero-wrap">
        <video
          className="productos__hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          disableRemotePlayback
          aria-hidden="true"
        >
          <source src="/videos/vitrina-productos-web.mp4" type="video/mp4" />
        </video>
        <div className="productos__hero-overlay" aria-hidden="true" />
        <div className="productos__hero-text">
          <p className="productos__eyebrow">Catálogo Completo</p>
          <h2 className="productos__headline">
            Buscamos lo mejor<br />
            <span className="productos__accent">de la región.</span>
          </h2>
        </div>
      </div>

      <div className="productos__canales">
        <img
          src={driveImg('1jeFxxD6wr2y2lmvRzdRQYy7oSqGuyP1v')}
          alt="Canales Capri — Selección de ganadería"
          className="productos__canales-img"
          loading="lazy"
        />
        <div className="productos__canales-overlay" aria-hidden="true" />
        <div className="productos__canales-text">
          <p>
            En Capri Carnes sabemos que la calidad empieza mucho antes de la vitrina.
            Trabajamos de la mano con ganaderos del norte de Chihuahua y la zona fronteriza —
            gente que conoce el oficio de generación en generación.
          </p>
          <p>
            Seleccionamos cada animal con cuidado, respaldando la tradición ganadera
            de una región donde hacer las cosas bien es la norma.
            Cuando compras con nosotros, llevas a tu mesa el resultado de esa disciplina
            y respeto por la tierra.
          </p>
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
              {cat.items.map((item, i) => {
                const img = productImages[item]
                return (
                  <div className={`productos__item${img ? ' productos__item--has-img' : ''}`} key={i}>
                    {img && (
                      <div className="productos__item-img">
                        <img src={img} alt={item} loading="lazy" />
                      </div>
                    )}
                    <span className="productos__item-name">{item}</span>
                  </div>
                )
              })}
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
