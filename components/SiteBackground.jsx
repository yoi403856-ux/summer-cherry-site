import Image from 'next/image'

/*
  Fixed, full-viewport forest photo behind all content (-z-10).
  position:fixed → content scrolls over a stationary photo (parallax feel).
  `photoUrl` can come from Sanity settings; falls back to /forest.jpg.

  Uses next/image so the (locally hosted, ~900KB) forest photo is served
  pre-resized and re-encoded to WebP/AVIF — much less to decode per paint.

  The panels above no longer read this layer through `backdrop-blur` at
  all (see globals.css / Navbar / Footer) — they're plain tinted
  backgrounds now, which is what actually fixed the reported 15fps
  scrolling (live backdrop-filter over a fixed layer recomputes every
  scroll frame; that cost is gone regardless of what this photo looks
  like). A `blur-md` was added here for a bit as a stand-in "misty" look,
  but it softened the photo itself more than intended — removed, this is
  back to the original sharp photo.
*/
export default function SiteBackground({ photoUrl }) {
  const src = photoUrl || '/forest.jpg'
  return (
    <div
      className="h-screen-stable fixed inset-x-0 top-0 -z-10 overflow-hidden bg-birch [transform:translateZ(0)] [-webkit-transform:translateZ(0)] [backface-visibility:hidden] [will-change:transform]"
      aria-hidden="true"
    >
      <Image src={src} alt="" fill priority quality={65} sizes="100vw" className="object-cover object-center" />
      <div className="absolute inset-0 bg-gradient-to-b from-birch/35 via-birch/15 to-birch/45" />
      <div className="absolute inset-0 bg-slatefog/10 mix-blend-luminosity" />
      <div className="grain absolute inset-0 opacity-[0.06]" />
    </div>
  )
}
