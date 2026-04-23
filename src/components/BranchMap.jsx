import '../styles/BranchMap.css'
import branchData from '../data/branches.json'

export default function BranchMap() {
  return (
    <section className="branches" id="branches">
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

      <div className="branches__grid">
        {branchData.slice(0, 16).map((b, i) => (
          <article className="branch-card" key={b.id} data-reveal data-delay={String((i % 4) + 1)}>
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
