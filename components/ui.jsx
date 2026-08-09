'use client'

import { motion } from 'framer-motion'

const easeOut = [0.22, 1, 0.36, 1]

/*
  Fades content in on mount rather than on scroll-into-view: this used to
  rely on whileInView (IntersectionObserver-driven), which left content
  permanently stuck at opacity 0 on some iOS Safari versions — the observer
  never fired, so sections past the very first screen never revealed.
  `animate` only depends on the component mounting, which is far more
  reliable, at the small cost of no longer staggering the reveal by scroll
  position.

  Opacity-only, no translateY: with dozens of these staggered across a
  page (product grids, stats, etc.), the transform used to visibly step
  rather than glide — animating transform on text re-triggers the
  browser's glyph rasterization each frame (a real cost, unlike moving a
  plain box), and that added up with many instances animating close
  together. A pure opacity fade never moves anything, so there's nothing
  to re-rasterize — it's the cheapest animation there is and still reads
  as a reveal.
*/
export function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, ease: easeOut, delay }}
    >
      {children}
    </motion.div>
  )
}

export function Eyebrow({ children, light = false }) {
  return (
    <span className="inline-flex items-center gap-3">
      <span className={`h-px w-8 ${light ? 'bg-gold/70' : 'bg-golddim/60'}`} />
      <span className={`eyebrow ${light ? 'text-gold' : ''}`}>{children}</span>
    </span>
  )
}

export function PineMark({ className = 'w-5 h-5 text-golddim' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M12 2 L16 9 L13.5 9 L17 15 L14 15 L18 21 L6 21 L10 15 L7 15 L10.5 9 L8 9 Z" fill="currentColor" opacity="0.9" />
      <rect x="11.2" y="21" width="1.6" height="2" fill="currentColor" />
    </svg>
  )
}

export function Divider({ className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <span className="h-px w-16 sm:w-28 bg-ink/15" />
      <PineMark className="w-4 h-4 text-golddim shrink-0" />
      <span className="h-px w-16 sm:w-28 bg-ink/15" />
    </div>
  )
}
