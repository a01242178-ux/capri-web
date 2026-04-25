import IntroVideo from './components/IntroVideo'
import Header from './components/Header'
import Hero from './components/Hero'
import Timeline from './components/Timeline'
import ProductGrid from './components/ProductGrid'
import BranchMap from './components/BranchMap'
import Historia from './components/Historia'
import QuienesSomos from './components/QuienesSomos'
import Productos from './components/Productos'
import Sucursales from './components/Sucursales'
import Blog from './components/Blog'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import IntroOpcion1 from './components/IntroOpcion1'
import IntroOpcion2 from './components/IntroOpcion2'
import { useState, useEffect } from 'react'

function getOverrideVariant() {
  if (typeof window === 'undefined') return null
  const p = new URLSearchParams(window.location.search).get('intro')
  return p === '1' || p === '2' ? p : null
}

export default function App() {
  const variant = getOverrideVariant()
  const [legacyIntroDone, setLegacyIntroDone] = useState(false)

  // Legacy variants remain at /?intro=1 and /?intro=2
  if (variant === '1' || variant === '2') {
    const Intro = variant === '1' ? IntroOpcion1 : IntroOpcion2
    return (
      <div className="app">
        {!legacyIntroDone && <Intro onComplete={() => setLegacyIntroDone(true)} />}
        <Header />
        <section id="inicio"><Hero /></section>
        <Timeline />
        <ProductGrid />
        <Historia />
        <Sucursales />
        <Footer />
        <WhatsAppButton />
      </div>
    )
  }

  // Default experience
  return (
    <div className="app">
      <IntroVideo />
      <Header />

      {/* INICIO — resumen del sitio */}
      <section id="inicio">
        <Hero />
        <Timeline />
        <ProductGrid />
        <BranchMap />
        <Historia />
      </section>

      {/* QUIÉNES SOMOS */}
      <QuienesSomos />

      {/* PRODUCTOS */}
      <Productos />

      {/* SUCURSALES */}
      <Sucursales />

      {/* BLOG */}
      <Blog />

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
