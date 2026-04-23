import '../styles/Header.css'

export default function Header() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <img src="/images/capri-logo.jpg" alt="Capri Carnes" className="logo-img" />
        </div>

        <nav className="header-nav">
          <a href="#timeline" onClick={() => scrollToSection('timeline')}>
            ¿Quiénes somos?
          </a>
          <a href="#products" onClick={() => scrollToSection('products')}>
            Productos
          </a>
          <a href="#branches" onClick={() => scrollToSection('branches')}>
            Sucursales
          </a>
        </nav>

        <button className="btn btn-cta">Ordena aquí</button>
      </div>
    </header>
  )
}
