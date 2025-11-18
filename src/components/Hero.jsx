import React from 'react'

const Mandala = () => (
  <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 1200 800" aria-hidden>
    <defs>
      <radialGradient id="rg" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(223,163,58,0.35)" />
        <stop offset="100%" stopColor="rgba(17,78,78,0)" />
      </radialGradient>
    </defs>
    <g fill="none" stroke="rgba(243,230,201,0.25)" strokeWidth="0.8">
      {Array.from({ length: 10 }).map((_, i) => (
        <circle key={i} cx="600" cy="400" r={(i + 1) * 48} />
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <g key={i} transform={`rotate(${(360 / 8) * i} 600 400)`}>
          <path d="M600 120 L610 160 L590 160 Z" fill="rgba(223,163,58,0.3)" />
          <circle cx="600" cy="180" r="6" fill="rgba(243,230,201,0.6)" />
        </g>
      ))}
    </g>
    <rect x="0" y="0" width="1200" height="800" fill="url(#rg)" />
  </svg>
)

const MountainSVG = () => (
  <svg className="absolute bottom-0 left-0 right-0 w-full h-[50%]" viewBox="0 0 1440 600" preserveAspectRatio="none" aria-hidden>
    <defs>
      <linearGradient id="mountainGradient" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="rgba(7,56,56,0.8)" />
        <stop offset="100%" stopColor="rgba(7,56,56,0)" />
      </linearGradient>
    </defs>
    <path d="M0 480 L160 420 L300 460 L420 360 L560 420 L720 300 L860 360 L980 320 L1120 380 L1260 340 L1440 420 L1440 600 L0 600 Z" fill="rgba(9,68,68,0.55)" />
    <path d="M0 520 L140 460 L280 500 L420 420 L560 480 L700 380 L860 420 L1000 400 L1160 450 L1300 420 L1440 480 L1440 600 L0 600 Z" fill="rgba(13,90,90,0.5)" />
    <path d="M0 560 L120 520 L260 540 L380 500 L520 540 L660 500 L820 520 L980 510 L1140 530 L1300 520 L1440 560 L1440 600 L0 600 Z" fill="url(#mountainGradient)" />
  </svg>
)

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-thandi-teal-900 via-thandi-teal-800 to-thandi-forest-900">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(223,163,58,0.25),transparent_50%)]" />
      <Mandala />

      <div className="relative container mx-auto px-6 sm:px-10 pt-28 pb-24 sm:pt-36 sm:pb-40">
        <div className="max-w-3xl">
          <p className="inline-flex items-center text-thandi-cream/80 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1 text-xs sm:text-sm mb-5">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-thandi-ochre animate-pulse" />
            AI mentorship for Africa’s next generation
          </p>
          <h1 className="font-dmsans text-4xl sm:text-6xl leading-tight sm:leading-tight tracking-tight text-thandi-cream drop-shadow-xl">
            Chart your journey with data‑driven confidence
          </h1>
          <p className="mt-5 sm:mt-6 text-base sm:text-lg text-thandi-cream/85 max-w-2xl">
            Thandi.ai matches you with mentors, bursaries, and career pathways tailored to your goals — powered by African data and grounded in culture.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a href="#get-started" className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-slate-900 font-semibold bg-gradient-to-r from-thandi-ochre to-thandi-sunshine shadow-[0_10px_30px_-10px_rgba(223,163,58,0.7)] hover:shadow-[0_20px_40px_-12px_rgba(223,163,58,0.75)] transition-shadow">
              Get started
            </a>
            <a href="#how" className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-thandi-cream/20 text-thandi-cream hover:bg-white/5 transition-colors">
              How it works
            </a>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-6 max-w-md text-thandi-cream/80">
            <div>
              <div className="text-2xl font-bold text-thandi-cream">50k+</div>
              <div className="text-xs">Students guided</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-thandi-cream">1,200+</div>
              <div className="text-xs">Bursaries indexed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-thandi-cream">10k+</div>
              <div className="text-xs">Mentor sessions</div>
            </div>
          </div>
        </div>
      </div>

      <MountainSVG />
    </section>
  )
}
