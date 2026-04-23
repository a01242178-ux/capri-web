import '../styles/Historia.css'

export default function Historia() {
  return (
    <section className="historia" id="historia">

      {/* ── Opening ─────────────────────────────────── */}
      <div className="historia__opening" data-reveal>
        <p className="historia__eyebrow">Nuestra historia</p>
        <h2 className="historia__headline">
          Tres generaciones.<br />
          <span className="historia__accent">Una pasión.</span>
        </h2>
        <p className="historia__sub">
          Lo que comenzó como una carnicería familiar en el centro de Juárez
          se convirtió en la marca que hoy conocen miles de familias chihuahuenses.
        </p>
      </div>

      {/* ── El fundador ─────────────────────────────── */}
      <div className="historia__chapter historia__chapter--founder">
        <div className="historia__chapter-text" data-reveal>
          <span className="historia__chapter-label">Primera generación</span>
          <h3 className="historia__chapter-title">
            Antonio García Villanueva
          </h3>
          <p className="historia__chapter-body">
            Los inicios de Capri Carnes se remontan a tres pequeñas sucursales
            en el centro de Ciudad Juárez. A los <strong>21 años</strong>,
            Antonio García Villanueva tomó las riendas del negocio familiar,
            marcando la primera gran sucesión de la familia García en la
            industria cárnica.
          </p>
          <p className="historia__chapter-body">
            Con visión de crecimiento, adquirió dos sucursales más y comenzó
            la expansión que definiría el futuro de la marca. En 1998, todas
            las sucursales homologaron su nombre: <strong>Capri Carnes</strong>.
          </p>
        </div>
        <div className="historia__chapter-visual" data-reveal data-delay="2">
          <div className="historia__photo-wrap">
            <img
              src="/images/historia/rancho-1.jpg"
              alt="El rancho — origen de la carne Capri"
              loading="lazy"
            />
            <div className="historia__photo-caption">
              Del rancho a tu mesa — desde 1960
            </div>
          </div>
        </div>
      </div>

      {/* ── Por qué Capri ───────────────────────────── */}
      <div className="historia__spotlight" data-reveal>
        <div className="historia__spotlight-inner">
          <span className="historia__spotlight-tag">¿Por qué "Capri"?</span>
          <blockquote className="historia__quote">
            "En los años 60, nuestra sucursal Capri tenía dos pisos.
            El segundo se llamaba <em>La Terraza Social Capri</em> —
            donde tocaban las mejores orquestas de México."
          </blockquote>
          <p className="historia__spotlight-body">
            La gente empezó a llamarla <strong>"la carnicería Capri"</strong>.
            Ese nombre se quedó grabado. En 1998 se volvió oficial para todas
            las sucursales de la familia — un legado nacido de la música,
            la carne y el orgullo juarense.
          </p>
        </div>
      </div>

      {/* ── Expansión ───────────────────────────────── */}
      <div className="historia__chapter historia__chapter--second">
        <div className="historia__chapter-visual" data-reveal>
          <div className="historia__photo-wrap">
            <img
              src="/images/historia/rancho-2.jpg"
              alt="Calidad artesanal en cada corte Capri"
              loading="lazy"
            />
            <div className="historia__photo-caption">
              Calidad artesanal en cada corte
            </div>
          </div>
        </div>
        <div className="historia__chapter-text" data-reveal data-delay="2">
          <span className="historia__chapter-label">Crecimiento</span>
          <h3 className="historia__chapter-title">
            Juárez entera<br />nos conoce
          </h3>
          <p className="historia__chapter-body">
            Durante décadas, Capri Carnes fue creciendo sucursal a sucursal,
            zona a zona, hasta estar presente en cada rincón de Ciudad Juárez.
            Cada punto de venta lleva el mismo compromiso de calidad que
            caracterizó a la primera carnicería.
          </p>
          <p className="historia__chapter-body">
            Hoy, la tercera generación de la familia García continúa ese
            legado — sumando tecnología, e-commerce y nuevos formatos sin
            perder la esencia artesanal que nos define.
          </p>
        </div>
      </div>

      {/* ── Stats ───────────────────────────────────── */}
      <div className="historia__stats" data-reveal>
        <div className="historia__stat">
          <span className="historia__stat-num">+60</span>
          <span className="historia__stat-label">Años en la industria</span>
        </div>
        <div className="historia__stat-divider" />
        <div className="historia__stat">
          <span className="historia__stat-num">3</span>
          <span className="historia__stat-label">Generaciones</span>
        </div>
        <div className="historia__stat-divider" />
        <div className="historia__stat">
          <span className="historia__stat-num">16</span>
          <span className="historia__stat-label">Sucursales en Juárez</span>
        </div>
        <div className="historia__stat-divider" />
        <div className="historia__stat">
          <span className="historia__stat-num">100%</span>
          <span className="historia__stat-label">Mexicano</span>
        </div>
      </div>

    </section>
  )
}
