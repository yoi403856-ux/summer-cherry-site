'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, X, Expand } from 'lucide-react'

export default function KittenGallery({ images = [], name = '' }) {
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(false)
  const touchX = useRef(null)

  const multi = images.length > 1
  const prev = useCallback(() => setActive((a) => (a - 1 + images.length) % images.length), [images.length])
  const next = useCallback(() => setActive((a) => (a + 1) % images.length), [images.length])

  // keyboard + scroll lock while the fullscreen viewer is open
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, prev, next])

  if (!images.length) return null

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    if (touchX.current == null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    if (dx > 50) prev()
    else if (dx < -50) next()
    touchX.current = null
  }

  const arrowBtn = 'absolute top-1/2 z-10 -translate-y-1/2 hidden h-10 w-10 items-center justify-center bg-ink/45 text-parchment transition-colors hover:bg-ink/75 md:flex'

  return (
    <div>
      {/* main image — height fits the viewport; click to open fullscreen */}
      <div
        className="group relative h-[44vh] w-full cursor-zoom-in overflow-hidden bg-coal shadow-card sm:h-[52vh] lg:h-[62vh]"
        onClick={() => setOpen(true)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* blurred fill so the un-cropped portrait photo has no empty side bars */}
        <div
          className="absolute inset-0 scale-110 bg-cover bg-center opacity-50 blur-2xl"
          style={{ backgroundImage: `url(${images[active]})` }}
        />
        <img src={images[active]} alt={name} className="relative h-full w-full object-contain" />
        <span className="pointer-events-none absolute right-3 top-3 flex h-9 w-9 items-center justify-center bg-ink/50 text-parchment opacity-0 transition-opacity group-hover:opacity-100">
          <Expand size={16} />
        </span>
        {multi && (
          <>
            <button className={`${arrowBtn} left-3`} aria-label="Предыдущее" onClick={(e) => { e.stopPropagation(); prev() }}>
              <ChevronLeft size={22} />
            </button>
            <button className={`${arrowBtn} right-3`} aria-label="Следующее" onClick={(e) => { e.stopPropagation(); next() }}>
              <ChevronRight size={22} />
            </button>
            <span className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-ink/50 px-3 py-1 font-sans text-[11px] tracking-[0.2em] text-parchment">
              {active + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {/* thumbnails */}
      {multi && (
        <div className="mt-4 grid grid-cols-5 gap-2 sm:gap-3">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Фото ${i + 1}`}
              className={`relative aspect-square overflow-hidden bg-coal transition-all duration-300 ${
                i === active ? 'ring-2 ring-pine ring-offset-2 ring-offset-parchment' : 'opacity-60 hover:opacity-100'
              }`}
            >
              <img src={src} alt={`${name} ${i + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* fullscreen viewer — portaled to <body> so no frosted ancestor traps it */}
      {open && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 backdrop-blur-lg"
          onClick={() => setOpen(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <button className="absolute right-5 top-5 z-10 text-birch/80 transition-colors hover:text-birch" aria-label="Закрыть" onClick={() => setOpen(false)}>
            <X size={30} />
          </button>
          <img
            src={images[active]}
            alt={name}
            className="max-h-[88vh] max-w-[92vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          {multi && (
            <>
              <button className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-birch/75 transition-colors hover:text-birch" aria-label="Предыдущее" onClick={(e) => { e.stopPropagation(); prev() }}>
                <ChevronLeft size={44} />
              </button>
              <button className="absolute right-4 top-1/2 z-10 -translate-y-1/2 text-birch/75 transition-colors hover:text-birch" aria-label="Следующее" onClick={(e) => { e.stopPropagation(); next() }}>
                <ChevronRight size={44} />
              </button>
              <span className="absolute bottom-6 left-1/2 -translate-x-1/2 font-sans text-[12px] tracking-[0.2em] text-birch/70">
                {active + 1} / {images.length}
              </span>
            </>
          )}
        </div>,
        document.body
      )}
    </div>
  )
}
