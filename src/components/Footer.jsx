import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-thandi-teal-980 text-thandi-cream/80 py-10">
      <div className="container mx-auto px-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="font-poppins font-semibold text-thandi-cream">Thandi.ai</div>
        <nav className="flex gap-6 text-sm">
          <a href="#features" className="hover:text-thandi-cream">Features</a>
          <a href="#how" className="hover:text-thandi-cream">How it works</a>
          <a href="#get-started" className="hover:text-thandi-cream">Get started</a>
        </nav>
        <div className="text-xs">© {new Date().getFullYear()} Thandi. All rights reserved.</div>
      </div>
    </footer>
  )
}
