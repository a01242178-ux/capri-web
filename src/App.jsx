import { useState, useEffect, lazy, Suspense } from 'react'
import LoadingScreen from './components/LoadingScreen'
import IntroVideo from './components/IntroVideo'
import Header from './components/Header'
import Hero from './components/Hero'
import Timeline from './components/Timeline'
import ProductGrid from './components/ProductGrid'
import BranchMap from './components/BranchMap'
import Historia from './components/Historia'
import Footer from './components/Footer'
import PreFooterCTA from './components/PreFooterCTA'
import WhatsAppButton from './components/WhatsAppButton'

const QuienesSomos = lazy(() => import('./components/QuienesSomos'))
const Productos    = lazy(() => import('./components/Productos'))
const Sucursales   = lazy(() => import('./components/Sucursales'))
const Blog         = lazy(() => import('./components/Blog'))

export default function App() {
  const [currentPage, setCurrentPage] = useState('inicio')
  const [videoReady, setVideoReady]   = useState(false)  // video puede montar y arrancar
  const [loadingGone, setLoadingGone] = useState(false)  // overlay puede desmontarse
  const [introDone, setIntroDone]     = useState(false)

  const handleIntroDone = () => {
    setIntroDone(true)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

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
      {currentPage === 'inicio' && !loadingGone && (
        <LoadingScreen
          onReady={() => setVideoReady(true)}
          onComplete={() => setLoadingGone(true)}
        />
      )}

      {currentPage === 'inicio' && !introDone && videoReady && (
        <IntroVideo onComplete={handleIntroDone} />
      )}

      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {currentPage === 'inicio' && (
        <>
          <Hero />
          <Timeline />
          <ProductGrid />
          <BranchMap />
          <Historia />
          <PreFooterCTA />
          <Footer />
        </>
      )}

      {currentPage === 'quienes-somos' && (
        <Suspense fallback={null}>
          <QuienesSomos />
          <PreFooterCTA />
          <Footer />
        </Suspense>
      )}

      {currentPage === 'productos' && (
        <Suspense fallback={null}>
          <Productos />
          <PreFooterCTA />
          <Footer />
        </Suspense>
      )}

      {currentPage === 'sucursales' && (
        <Suspense fallback={null}>
          <Sucursales />
          <PreFooterCTA />
          <Footer />
        </Suspense>
      )}

      {currentPage === 'blog' && (
        <Suspense fallback={null}>
          <Blog />
          <PreFooterCTA />
          <Footer />
        </Suspense>
      )}

      <WhatsAppButton />
    </div>
  )
}
