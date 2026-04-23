import '../styles/ProductGrid.css'

const products = [
  { id: 1, name: 'Ribeye', tagline: 'Premium · Marmoleado', image: '/images/fotos/dsc0017-web.jpg' },
  { id: 2, name: 'Tiras de Asado', tagline: 'Parrilla · Intenso', image: '/images/fotos/dsc0014-web.jpg' },
  { id: 3, name: 'Carne para Taco', tagline: 'Fresca · Lista', image: '/images/fotos/dsc0025-web.jpg' },
  { id: 4, name: 'Chamorro', tagline: 'Tradicional · Con hueso', image: '/images/fotos/dsc0019-web.jpg' },
  { id: 5, name: 'Cortes Selectos', tagline: 'Variedad · Calidad', image: '/images/fotos/dsc0001-web.jpg' },
  { id: 6, name: 'Brisket', tagline: 'Slow-cook · Suave', image: '/images/fotos/brisket.png' },
]

export default function ProductGrid() {
  return (
    <section className="product-grid" id="products">
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

      <div className="product-grid__grid">
        {products.map((p, i) => (
          <article className="product-card" key={p.id} data-reveal data-delay={String((i % 3) + 1)}>
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
          href="https://wa.me/526562191234?text=Hola%20Capri%20Carnes%2C%20quiero%20ordenar"
          className="product-grid__btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ordena por WhatsApp
        </a>
      </div>
    </section>
  )
}
