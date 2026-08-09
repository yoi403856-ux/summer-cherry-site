'use client'

import { useEffect } from 'react'

/*
  Desktop-only issue: mouse-wheel scrolling keeps the cursor stationary
  while content slides underneath it, so the browser keeps re-evaluating
  :hover against whatever now sits under the pointer. With hover
  transitions on nav links, buttons and every card grid on the site,
  that's many hover toggles firing mid-scroll — invisible on touch, since
  touch has no hover concept at all (this is why the site scrolls smoothly
  on phones but not on desktop).

  Gated to real mouse/trackpad devices via matchMedia so touch is
  untouched. While the page is actively scrolling, pointer-events go off
  site-wide so the cursor can't trigger :hover on anything sliding past
  it; they return ~150ms after the last scroll event, once things settle.
*/
export default function ScrollHoverGuard() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const html = document.documentElement
    let timeout

    const onScroll = () => {
      html.classList.add('is-scrolling')
      clearTimeout(timeout)
      timeout = setTimeout(() => html.classList.remove('is-scrolling'), 150)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(timeout)
      html.classList.remove('is-scrolling')
    }
  }, [])

  return null
}
