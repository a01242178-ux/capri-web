import '../styles/Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__content">
        <p className="hero__eyebrow">Desde 1960 · Ciudad Juárez</p>
        <h1 className="hero__title">Del Rancho<br />A Tu Mesa</h1>
        <p className="hero__sub">
          Tres generaciones seleccionando los mejores cortes. Calidad premium al alcance de cada familia juarense.
        </p>
        <a href="#products" className="hero__cta">Conoce nuestros productos</a>
      </div>
    </section>
  )
}
