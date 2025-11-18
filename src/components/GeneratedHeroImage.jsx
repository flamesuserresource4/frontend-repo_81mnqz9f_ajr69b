import React, { useMemo } from 'react'

// Procedural SVG-based hero illustration inspired by African landscapes and mandala motifs
export default function GeneratedHeroImage({ className = '' }) {
  const circles = useMemo(() => Array.from({ length: 40 }, (_, i) => i), [])
  const peaks = useMemo(() => [
    'M0 420 L120 380 L260 410 L380 330 L520 380 L660 300 L820 340 L1000 320 L1160 360 L1320 330 L1440 400 L1440 600 L0 600 Z',
    'M0 460 L140 420 L280 450 L420 380 L560 440 L700 360 L860 400 L1000 380 L1160 430 L1300 400 L1440 460 L1440 600 L0 600 Z',
    'M0 500 L120 460 L260 480 L380 440 L520 480 L660 440 L820 460 L980 450 L1140 470 L1300 460 L1440 500 L1440 600 L0 600 Z'
  ], [])

  return (
    <svg className={className} viewBox="0 0 1440 600" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(173 65% 16%)" />
          <stop offset="100%" stopColor="hsl(164 74% 10%)" />
        </linearGradient>
        <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(38 70% 54% / 0.2)" />
          <stop offset="100%" stopColor="hsl(38 70% 54% / 0)" />
        </linearGradient>
      </defs>

      <rect width="100%" height="100%" fill="url(#g1)" />

      {/* Mandala circles */}
      {circles.map((i) => (
        <circle key={i} cx={200} cy={150} r={i * 8} fill="none" stroke="hsl(40 57% 86% / 0.12)" strokeWidth="1" />
      ))}

      {/* Mountains */}
      <g>
        <path d={peaks[0]} fill="hsl(173 55% 20% / 0.6)" />
        <path d={peaks[1]} fill="hsl(173 45% 18% / 0.6)" />
        <path d={peaks[2]} fill="url(#g2)" />
      </g>

      {/* Sun */}
      <g>
        <circle cx="1160" cy="120" r="70" fill="hsl(43 95% 62% / 0.9)" />
        <circle cx="1160" cy="120" r="100" fill="hsl(43 95% 62% / 0.2)" />
      </g>
    </svg>
  )
}
