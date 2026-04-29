import '../styles/Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__brand">
          <img src="/images/capri-logo.jpg" alt="Capri Carnes" className="footer__logo" />
          <p className="footer__tagline">
            Desde 1960. Cuatro generaciones ofreciendo la mejor carne a las familias de Ciudad Juárez.
          </p>
        </div>

        <div className="footer__cols">
          <div className="footer__col">
            <h4>Navegar</h4>
            <a href="#" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('capri:navigate', { detail: 'quienes-somos' })) }}>Nosotros</a>
            <a href="#" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('capri:navigate', { detail: 'productos' })) }}>Productos</a>
            <a href="#" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('capri:navigate', { detail: 'sucursales' })) }}>Sucursales</a>
          </div>

          <div className="footer__col">
            <h4>Contacto</h4>
            <a href="tel:6562191234">(656) 219-1234</a>
            <a href="mailto:contacto@capricarnes.mx">contacto@capricarnes.mx</a>
            <a
              href="https://wa.me/526562191234"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </div>

          <div className="footer__col">
            <h4>Redes</h4>
            <a href="https://facebook.com/capri_carnes" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://instagram.com/capri_carnes" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <span>© {new Date().getFullYear()} Capri Carnes · 100% Mexicano</span>
        <span>Juárez, Chihuahua · Hecho con orgullo</span>
      </div>
    </footer>
  )
}
