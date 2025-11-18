import React from 'react'
import Hero from './components/Hero'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import CTA from './components/CTA'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-thandi-teal-950 text-thandi-cream">
      <header className="fixed top-0 inset-x-0 z-40 backdrop-blur bg-thandi-teal-950/60 border-b border-white/10">
        <div className="container mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-thandi-ochre to-thandi-sunshine" />
            <span className="font-poppins font-semibold tracking-wide">Thandi.ai</span>
          </div>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-thandi-cream/85">
            <a href="#features" className="hover:text-thandi-cream">Features</a>
            <a href="#how" className="hover:text-thandi-cream">How it works</a>
            <a href="#get-started" className="hover:text-thandi-cream">Get started</a>
          </nav>
          <a href="#get-started" className="rounded-lg px-4 py-2 bg-thandi-ochre text-slate-900 font-semibold text-sm">Join waitlist</a>
        </div>
      </header>

      <main className="pt-16">
        <Hero />
        <Features />
        <HowItWorks />
        <CTA />
      </main>

      <Footer />
    </div>
  )
}

export default App
