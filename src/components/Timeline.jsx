import '../styles/Timeline.css'

const milestones = [
  { year: '1960', title: 'Fundación', text: 'Nace Capri Carnes en Ciudad Juárez, Chihuahua. Una carnicería familiar con compromiso por la calidad.' },
  { year: '1972', title: 'Primera sucursal', text: 'Apertura de la segunda sucursal en el centro de Juárez. Empieza la expansión.' },
  { year: '1985', title: 'Más de 5 sucursales', text: 'Consolidamos presencia en las principales zonas de Ciudad Juárez.' },
  { year: '1998', title: 'Tradición en la familia', text: 'La segunda generación toma el liderazgo manteniendo la calidad que nos distingue.' },
  { year: '2010', title: 'Capri Primavera', text: 'Abrimos la sucursal Primavera, hoy uno de nuestros puntos insignia.' },
  { year: '2018', title: '16 sucursales', text: 'Llegamos a toda la ciudad. Calidad premium al alcance de cada familia juarense.' },
  { year: '2022', title: 'Renovación', text: 'Modernizamos procesos y estándares sin perder la esencia artesanal.' },
  { year: '2024', title: 'Entrega a domicilio', text: 'Lanzamos WhatsApp directo para ordenar. Tu corte llega a tu mesa.' },
  { year: 'Hoy', title: 'Del rancho a tu mesa', text: '+60 años. Tercera generación. Orgullosamente juarenses, 100% mexicanos.' },
]

export default function Timeline() {
  return (
    <section className="timeline" id="timeline">
      <div className="timeline__intro">
        <div className="timeline__eyebrow">Desde 1960</div>
        <h2 className="timeline__title">
          Más de <span className="timeline__accent">60 años</span><br />de tradición
        </h2>
        <p className="timeline__lead">
          Tres generaciones dedicadas a llevar la mejor carne a las familias juarenses.
        </p>
      </div>

      <div className="timeline__track">
        {milestones.map((m, i) => {
          const isLast = i === milestones.length - 1
          return (
            <article
              key={i}
              className={`timeline__node${isLast ? ' timeline__node--hoy' : ''}`}
              data-reveal
              data-delay={String((i % 3) + 1)}
            >
              <div className="timeline__year">{m.year}</div>
              <div className="timeline__content">
                <h3 className="timeline__node-title">{m.title}</h3>
                <p className="timeline__node-text">{m.text}</p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
