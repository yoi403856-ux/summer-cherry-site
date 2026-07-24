'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Phone, Facebook, X } from 'lucide-react'
import { WhatsApp, Vk } from './icons'
import { useDict } from './LocaleProvider'

/*
  Contact button that fans out into messenger options instead of jumping
  to the footer. Used everywhere EXCEPT the top navbar "Связаться" link,
  which still scrolls to the footer contact block as before.

  The overlay + panel are portaled to document.body (to escape ancestor
  backdrop-blur stacking contexts) and animated with plain CSS transitions
  driven by the `open` class — Framer Motion's AnimatePresence/animate prop
  proved unreliable once recreated inside a portal on every parent re-render.
*/
export default function ContactPopover({ contacts, label, className = '', fullWidth = false }) {
  const t = useDict().contactPopover
  const [open, setOpen] = useState(false)
  const [everOpened, setEverOpened] = useState(false)
  const [pos, setPos] = useState(null)
  const ref = useRef(null)
  const panelRef = useRef(null)
  const btnRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const place = () => {
      const r = btnRef.current?.getBoundingClientRect()
      if (!r) return
      const panelWidth = 256 // w-64
      // real height once rendered, otherwise a safe estimate (heading + 4 rows)
      const panelHeight = panelRef.current?.offsetHeight || 260
      const margin = 16
      const centered = r.left + r.width / 2 - panelWidth / 2
      const left = Math.min(Math.max(centered, margin), window.innerWidth - panelWidth - margin)
      const spaceBelow = window.innerHeight - r.bottom
      const openUpward = spaceBelow < panelHeight + margin && r.top > panelHeight + margin
      const top = openUpward
        ? Math.max(r.top - panelHeight - 12, margin)
        : Math.min(r.bottom + 12, window.innerHeight - panelHeight - margin)
      setPos({ top, left })
    }
    place()
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const onClick = (e) => {
      if (
        ref.current && !ref.current.contains(e.target) &&
        panelRef.current && !panelRef.current.contains(e.target)
      ) {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('mousedown', onClick)
    window.addEventListener('touchstart', onClick)
    window.addEventListener('resize', place)
    window.addEventListener('scroll', place, true)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('mousedown', onClick)
      window.removeEventListener('touchstart', onClick)
      window.removeEventListener('resize', place)
      window.removeEventListener('scroll', place, true)
    }
  }, [open])

  const toggle = () => {
    setEverOpened(true)
    setOpen((o) => !o)
  }

  const options = [
    { icon: WhatsApp, label: 'WhatsApp', href: contacts.whatsapp, ext: true },
    { icon: Facebook, label: 'Facebook', href: contacts.facebook, ext: true },
    { icon: Vk, label: 'VK', href: contacts.vk, ext: true },
    { icon: Phone, label: contacts.phone, href: contacts.tel, ext: false },
  ]

  return (
    <div ref={ref} className={`relative ${fullWidth ? 'block w-full' : 'inline-block'}`}>
      <button
        ref={btnRef}
        type="button"
        onClick={toggle}
        className={`${fullWidth ? 'w-full' : ''} ${className}`}
      >
        {label}
      </button>

      {everOpened && pos &&
        createPortal(
          <>
            <div
              className={`fixed inset-0 z-[90] bg-ink/40 backdrop-blur-[2px] transition-opacity duration-200 ${
                open ? 'opacity-100' : 'pointer-events-none opacity-0'
              }`}
              onClick={() => setOpen(false)}
            />

            <div
              ref={panelRef}
              style={{ top: pos.top, left: pos.left }}
              className={`fixed z-[95] w-64 border border-ink/10 bg-parchment p-4 shadow-soft transition-all duration-200 ease-out ${
                open ? 'translate-y-0 opacity-100 scale-100' : 'pointer-events-none translate-y-2 opacity-0 scale-95'
              }`}
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t.close}
                className="absolute right-2 top-2 text-ink/40 transition-colors hover:text-ink"
              >
                <X size={15} />
              </button>
              <p className="eyebrow pr-6 text-golddim">{t.title}</p>
              <div className="mt-3 flex flex-col gap-1.5">
                {options.map((o) => (
                  <a
                    key={o.label}
                    href={o.href}
                    {...(o.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group flex items-center gap-3 px-2 py-2 font-sans text-[14px] text-ink/80 transition-colors hover:bg-ink/5 hover:text-ink"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-ink/15 text-golddim transition-colors group-hover:border-pine group-hover:text-pine">
                      <o.icon size={15} />
                    </span>
                    {o.label}
                  </a>
                ))}
              </div>
            </div>
          </>,
          document.body
        )}
    </div>
  )
}
