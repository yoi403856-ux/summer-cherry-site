'use client'

// Smooth-scrolls to #contact on click. Scoped here instead of a global
// `scroll-behavior: smooth`, which would make ordinary mouse-wheel
// scrolling feel choppy across the whole site.
export default function ContactLink({ className, children, onClick }) {
  const handleClick = (e) => {
    e.preventDefault()
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    onClick?.()
  }
  return (
    <a href="#contact" onClick={handleClick} className={className}>
      {children}
    </a>
  )
}
