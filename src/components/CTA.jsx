import React from 'react'

export default function CTA() {
  return (
    <section className="bg-thandi-cream text-slate-900 py-16 sm:py-24" id="get-started">
      <div className="container mx-auto px-6 sm:px-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-poppins text-2xl sm:text-4xl font-semibold">Start your journey with Thandi.ai</h2>
            <p className="mt-3 text-slate-700">Join thousands of students shaping their future with personalized guidance and real opportunities.</p>

            <div className="mt-6 flex gap-2">
              <input type="email" placeholder="Enter your email" className="flex-1 rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-thandi-ochre/60" />
              <button className="rounded-xl px-6 py-3 bg-thandi-teal text-white font-semibold">Sign up</button>
            </div>

            <div className="mt-4 text-sm text-slate-600">By signing up you agree to our terms and privacy policy.</div>
          </div>
          <div className="rounded-3xl p-8 bg-gradient-to-br from-thandi-teal-900 to-thandi-forest-900 text-thandi-cream border border-white/10">
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold">95%</div>
                <div className="text-xs text-thandi-cream/80">Feel more confident</div>
              </div>
              <div>
                <div className="text-3xl font-bold">2x</div>
                <div className="text-xs text-thandi-cream/80">Faster to opportunities</div>
              </div>
              <div>
                <div className="text-3xl font-bold">4.8/5</div>
                <div className="text-xs text-thandi-cream/80">User satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
