'use client'

// Smooth-scrolls to #contact on click, via a manual rAF animation rather
// than the native scrollIntoView({behavior:'smooth'}) — the latter can get
// cut short by backdrop-filter/transform containing blocks in the way,
// silently turning into an instant jump in some browsers.
function smoothScrollTo(targetY, duration = 700) {
  const startY = window.scrollY
  const diff = targetY - startY
  const start = performance.now()
  const ease = (t) => 1 - Math.pow(1 - t, 3) // easeOutCubic

  function step(now) {
    const elapsed = now - start
    const t = Math.min(elapsed / duration, 1)
    window.scrollTo(0, startY + diff * ease(t))
    if (t < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

export default function ContactLink({ className, children, onClick }) {
  const handleClick = (e) => {
    e.preventDefault()
    const el = document.getElementById('contact')
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY
      smoothScrollTo(y)
    }
    onClick?.()
  }
  return (
    <a href="#contact" onClick={handleClick} className={className}>
      {children}
    </a>
  )
}
