import '../styles/Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-image">
        <img
          src="/images/fotos/dsc0017-web.jpg"
          alt="Premium beef cuts from Capri Carnes"
          loading="lazy"
        />
      </div>
      <div className="hero-text">
        <h1 className="hero-title">Del Rancho<br />A Tu Mesa</h1>
        <p className="hero-subtitle">
          Desde 1960, ofrecemos los mejores cortes de carne, seleccionados con cuidado y calidad garantizada.
          Más de 60 años en la industria cárnica con tradición y excelencia.
        </p>
        <button className="btn btn-cta">Conoce nuestros productos</button>
      </div>
    </section>
  )
}
