/*
  Fixed, full-viewport forest photo behind all content (-z-10).
  position:fixed → content scrolls over a stationary photo (parallax feel).
  `photoUrl` can come from Sanity settings; falls back to /forest.jpg.
*/
export default function SiteBackground({ photoUrl }) {
  const src = photoUrl || '/forest.jpg'
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-birch" aria-hidden="true">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${src})` }} />
      <div className="absolute inset-0 bg-gradient-to-b from-birch/35 via-birch/15 to-birch/45" />
      <div className="absolute inset-0 bg-slatefog/10 mix-blend-luminosity" />
      <div className="grain absolute inset-0 opacity-[0.06]" />
    </div>
  )
}
