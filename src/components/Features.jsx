import React from 'react'

const features = [
  {
    title: 'Education Guidance',
    desc: 'Personalized subject choices and study paths aligned to your strengths.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-thandi-ochre" fill="currentColor" aria-hidden>
        <path d="M12 3l9 5-9 5-9-5 9-5zm0 7.2l6.6-3.66-6.6-3.66-6.6 3.66L12 10.2z" />
        <path d="M21 10.5v6.75a.75.75 0 01-1.17.63L12 13.5l-7.83 4.38A.75.75 0 013 17.25V10.5l9 5 9-5z" />
      </svg>
    )
  },
  {
    title: 'Bursary Discovery',
    desc: 'Find funding opportunities that match your profile and ambitions.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-thandi-ochre" fill="currentColor" aria-hidden>
        <path d="M12 1a4 4 0 014 4v2h-2V5a2 2 0 10-4 0v2H8V5a4 4 0 014-4z" />
        <path d="M4 9h16v12a2 2 0 01-2 2H6a2 2 0 01-2-2V9zm4 4h8v2H8v-2z" />
      </svg>
    )
  },
  {
    title: 'Career Pathways',
    desc: 'Roadmaps into in-demand roles with skills and milestones.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-thandi-ochre" fill="currentColor" aria-hidden>
        <path d="M3 12h6l2-3 2 6 2-3h6" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="5" cy="12" r="2" />
        <circle cx="19" cy="12" r="2" />
      </svg>
    )
  },
  {
    title: 'AI Mentorship',
    desc: '1:1 guidance with mentors and an AI coach that knows your context.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-thandi-ochre" fill="currentColor" aria-hidden>
        <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm-7 9a7 7 0 0114 0H5z" />
      </svg>
    )
  },
]

export default function Features() {
  return (
    <section className="bg-thandi-teal-950 text-thandi-cream py-16 sm:py-24" id="features">
      <div className="container mx-auto px-6 sm:px-10">
        <div className="max-w-2xl mb-10 sm:mb-14">
          <h2 className="font-poppins text-2xl sm:text-4xl font-semibold">What you get</h2>
          <p className="mt-3 text-thandi-cream/80">Tools and guidance designed for Africa’s realities and your ambitions.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((f, idx) => (
            <div key={idx} className="group rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-all">
              <div className="h-10 w-10 rounded-xl bg-thandi-ochre/10 grid place-items-center mb-4">
                {f.icon}
              </div>
              <h3 className="font-poppins font-semibold text-lg mb-1">{f.title}</h3>
              <p className="text-sm text-thandi-cream/85">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
