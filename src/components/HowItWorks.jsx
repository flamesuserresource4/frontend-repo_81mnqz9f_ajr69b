import React from 'react'

const steps = [
  { id: 1, title: 'Tell us about you', desc: 'Your interests, subjects, and dreams.' },
  { id: 2, title: 'Get your roadmap', desc: 'Personalized paths, skills, and milestones.' },
  { id: 3, title: 'Meet your mentors', desc: 'Book sessions with experts and alumni.' },
  { id: 4, title: 'Unlock opportunities', desc: 'Bursaries, internships, and scholarships.' },
]

export default function HowItWorks() {
  return (
    <section className="bg-gradient-to-b from-thandi-teal-950 to-thandi-forest-950 text-thandi-cream py-16 sm:py-24" id="how">
      <div className="container mx-auto px-6 sm:px-10">
        <div className="max-w-2xl mb-12">
          <h2 className="font-poppins text-2xl sm:text-4xl font-semibold">How it works</h2>
          <p className="mt-3 text-thandi-cream/80">A clear journey from curiosity to career confidence.</p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute left-10 right-10 top-8 h-1 bg-gradient-to-r from-thandi-ochre/30 via-thandi-ochre/60 to-thandi-ochre/30 rounded-full" />
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((s) => (
              <div key={s.id} className="relative rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="h-10 w-10 rounded-full bg-thandi-ochre text-slate-900 grid place-items-center font-bold mb-4">{s.id}</div>
                <h3 className="font-poppins font-semibold">{s.title}</h3>
                <p className="text-sm text-thandi-cream/85 mt-1">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
