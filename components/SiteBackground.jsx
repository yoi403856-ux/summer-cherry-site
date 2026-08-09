import Image from 'next/image'

/*
  Fixed, full-viewport forest photo behind all content (-z-10).
  position:fixed → content scrolls over a stationary photo (parallax feel).
  `photoUrl` can come from Sanity settings; falls back to /forest.jpg.

  Uses next/image so the (locally hosted, ~900KB) forest photo is served
  pre-resized and re-encoded to WebP/AVIF — much less to decode per paint.

  The photo carries its own `blur-md` filter instead of relying on
  `backdrop-blur` on the parchment panels above it. Every panel on every
  page used to live-sample this fixed layer through backdrop-filter, which
  can't be cached — it forced a full recompute on every single scroll
  frame, for every panel, on every page (the actual cause of the reported
  15fps scrolling). Blurring the photo once here is a normal, cacheable
  paint: panels go back to a plain tinted background and the "misty
  forest" look is unchanged, since it's now baked into the layer itself.
*/
export default function SiteBackground({ photoUrl }) {
  const src = photoUrl || '/forest.jpg'
  return (
    <div
      className="h-screen-stable fixed inset-x-0 top-0 -z-10 overflow-hidden bg-birch blur-md [transform:translateZ(0)] [-webkit-transform:translateZ(0)] [backface-visibility:hidden] [will-change:transform]"
      aria-hidden="true"
    >
      <Image src={src} alt="" fill priority quality={65} sizes="100vw" className="object-cover object-center" />
      <div className="absolute inset-0 bg-gradient-to-b from-birch/35 via-birch/15 to-birch/45" />
      <div className="absolute inset-0 bg-slatefog/10 mix-blend-luminosity" />
      <div className="grain absolute inset-0 opacity-[0.06]" />
    </div>
  )
}
