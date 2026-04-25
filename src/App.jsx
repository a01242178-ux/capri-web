import { useState, useEffect } from 'react'
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

export default function App() {
  const [currentPage, setCurrentPage] = useState('inicio')
  const [introDone, setIntroDone] = useState(false)

  // Scroll to top on every page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [currentPage])

  // Listen for navigate events from child components
  useEffect(() => {
    const handler = (e) => setCurrentPage(e.detail)
    window.addEventListener('capri:navigate', handler)
    return () => window.removeEventListener('capri:navigate', handler)
  }, [])

  return (
    <div className="app">
      {!introDone && (
        <IntroVideo onComplete={() => setIntroDone(true)} />
      )}

      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {currentPage === 'inicio' && (
        <>
          <Hero />
          <Timeline />
          <ProductGrid />
          <BranchMap />
          <Historia />
          <Footer />
        </>
      )}

      {currentPage === 'quienes-somos' && (
        <>
          <QuienesSomos />
          <Footer />
        </>
      )}

      {currentPage === 'productos' && (
        <>
          <Productos />
          <Footer />
        </>
      )}

      {currentPage === 'sucursales' && (
        <>
          <Sucursales />
          <Footer />
        </>
      )}

      {currentPage === 'blog' && (
        <>
          <Blog />
          <Footer />
        </>
      )}

      <WhatsAppButton />
    </div>
  )
}
