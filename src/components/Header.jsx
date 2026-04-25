import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/Header.css'

gsap.registerPlugin(ScrollTrigger)

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: 'top -80',
      end: 99999,
      toggleClass: { className: 'header--scrolled', targets: '.header' },
    })
    return () => trigger.kill()
  }, [])

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const navLinks = [
    { label: 'Inicio',          id: 'inicio' },
    { label: '¿Quiénes Somos?', id: 'quienes-somos' },
    { label: 'Productos',       id: 'productos' },
    { label: 'Sucursales',      id: 'sucursales' },
    { label: 'Blog',            id: 'blog' },
  ]

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="header-logo">
            <img src="/images/capri-logo.jpg" alt="Capri Carnes" className="logo-img" />
          </div>

          <nav className={`header-nav${menuOpen ? ' header-nav--open' : ''}`} aria-label="Navegación principal">
            {navLinks.map(({ label, id }) => (
              <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollToSection(id) }}>
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
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className="header-mobile-menu" role="dialog" aria-modal="true">
          {navLinks.map(({ label, id }) => (
            <a key={id} href={`#${id}`} className="header-mobile-link" onClick={(e) => { e.preventDefault(); scrollToSection(id) }}>
              {label}
            </a>
          ))}
          <button
            className="btn btn-cta header-mobile-cta"
            onClick={() => { window.open('https://wa.me/526562191234?text=Hola%20Capri%20Carnes%2C%20quiero%20ordenar', '_blank', 'noopener,noreferrer'); setMenuOpen(false) }}
          >
            Ordena Aquí
          </button>
        </div>
      )}
    </>
  )
}
