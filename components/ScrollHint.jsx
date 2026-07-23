'use client'

import { ChevronDown } from 'lucide-react'

// Smooth-scrolls to #targetId on click — same manual rAF approach as
// ContactLink (native scrollIntoView can get cut short by the frosted
// backdrop-filter sections in the way).
function smoothScrollTo(targetY, duration = 700) {
  const startY = window.scrollY
  const diff = targetY - startY
  const start = performance.now()
  const ease = (t) => 1 - Math.pow(1 - t, 3)

  function step(now) {
    const elapsed = now - start
    const t = Math.min(elapsed / duration, 1)
    window.scrollTo(0, startY + diff * ease(t))
    if (t < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

export default function ScrollHint({ targetId, label }) {
  const handleClick = (e) => {
    e.preventDefault()
    const el = document.getElementById(targetId)
    if (el) smoothScrollTo(el.getBoundingClientRect().top + window.scrollY - 24)
  }
  return (
    <a
      href={`#${targetId}`}
      onClick={handleClick}
      className="mt-8 flex items-center gap-2 font-sans text-[12px] uppercase tracking-[0.2em] text-ink/50 transition-colors hover:text-ink"
    >
      {label}
      <ChevronDown size={14} className="animate-bounce" />
    </a>
  )
}
