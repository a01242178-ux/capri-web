import IntroVideo from './components/IntroVideo'
import Header from './components/Header'
import Hero from './components/Hero'
import Historia from './components/Historia'
import Timeline from './components/Timeline'
import ProductGrid from './components/ProductGrid'
import BranchMap from './components/BranchMap'
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); observer.unobserve(e.target) } }),
      { threshold: 0.12 }
    )
    document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Legacy variants remain reachable at /?intro=1 and /?intro=2 for comparison
  if (variant === '1' || variant === '2') {
    const Intro = variant === '1' ? IntroOpcion1 : IntroOpcion2
    return (
      <div className="app">
        {!legacyIntroDone && <Intro onComplete={() => setLegacyIntroDone(true)} />}
        <Header />
        <Hero />
        <Timeline />
        <ProductGrid />
        <BranchMap />
        <Footer />
        <WhatsAppButton />
      </div>
    )
  }

  // Default (new) experience: scroll-driven carnicero video → hero → rest of site
  return (
    <div className="app">
      <IntroVideo />
      <Header />
      <Hero />
      <Timeline />
      <ProductGrid />
      <BranchMap />
      <Historia />
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
