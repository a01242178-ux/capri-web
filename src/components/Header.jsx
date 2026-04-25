import { useEffect, useState } from 'react'
import '../styles/Header.css'

export default function Header({ currentPage, setCurrentPage }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (window.innerWidth > 768) setMenuOpen(false)
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const navigate = (page) => {
    setCurrentPage(page)
    setMenuOpen(false)
  }

  const navLinks = [
    { label: 'Inicio',           id: 'inicio' },
    { label: '¿Quiénes Somos?',  id: 'quienes-somos' },
    { label: 'Productos',        id: 'productos' },
    { label: 'Sucursales',       id: 'sucursales' },
    { label: 'Blog',             id: 'blog' },
  ]

  return (
    <>
      <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
        <div className="header-container">
          <div className="header-logo" onClick={() => navigate('inicio')} style={{ cursor: 'pointer' }}>
            <img src="/images/capri-logo.jpg" alt="Capri Carnes" className="logo-img" />
          </div>

          <nav className={`header-nav${menuOpen ? ' header-nav--open' : ''}`} aria-label="Navegación principal">
            {navLinks.map(({ label, id }) => (
              <a
                key={id}
                href={`#${id}`}
                className={currentPage === id ? 'is-active' : ''}
                onClick={(e) => { e.preventDefault(); navigate(id) }}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="header-right">
            <button
              className="btn btn-cta"
              onClick={() => window.open('https://wa.me/526562191234?text=Hola%20Capri%20Carnes%2C%20quiero%20ordenar', '_blank', 'noopener,noreferrer')}
            >
              Ordena Aquí
            </button>
            <button
              className={`header-hamburger${menuOpen ? ' is-open' : ''}`}
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(v => !v)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="header-mobile-menu" role="dialog" aria-modal="true">
          {navLinks.map(({ label, id }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`header-mobile-link${currentPage === id ? ' is-active' : ''}`}
              onClick={(e) => { e.preventDefault(); navigate(id) }}
            >
              {label}
            </a>
          ))}
          <button
            className="btn btn-cta header-mobile-cta"
            onClick={() => {
              window.open('https://wa.me/526562191234?text=Hola%20Capri%20Carnes%2C%20quiero%20ordenar', '_blank', 'noopener,noreferrer')
              setMenuOpen(false)
            }}
          >
            Ordena Aquí
          </button>
        </div>
      )}
    </>
  )
}
