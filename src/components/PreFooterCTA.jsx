import '../styles/PreFooterCTA.css'

export default function PreFooterCTA() {
  const openApp = () => {
    const ua = navigator.userAgent || ''
    if (/iPhone|iPad|iPod/i.test(ua)) {
      window.open('https://apps.apple.com/mx/app/capri-carnes/id6748863568', '_blank', 'noopener,noreferrer')
    } else {
      window.open('https://wa.me/526562191234?text=Hola%20Capri%20Carnes%2C%20quiero%20ordenar', '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <section className="prefooter-cta">
      <div className="prefooter-cta__inner">
        <p className="prefooter-cta__eyebrow">Desde 1960 · Ciudad Juárez</p>
        <h2 className="prefooter-cta__headline">
          65 años de calidad.
        </h2>
        <p className="prefooter-cta__sub">
          Ordena hoy — recoge en tu sucursal más cercana o pide a domicilio.
        </p>
        <div className="prefooter-cta__actions">
          <button className="prefooter-cta__btn prefooter-cta__btn--primary" onClick={openApp}>
            Ordena en la App
          </button>
          <a
            className="prefooter-cta__btn prefooter-cta__btn--secondary"
            href="https://wa.me/526562191234?text=Hola%20Capri%20Carnes%2C%20quiero%20ordenar"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp →
          </a>
        </div>
      </div>
    </section>
  )
}
