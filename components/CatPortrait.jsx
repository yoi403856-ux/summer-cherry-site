import Image from 'next/image'

/*
  Portrait frame. Shows a photo if `src` given, otherwise a coat-toned
  Maine Coon silhouette so layouts never look broken before photos exist.
*/
export default function CatPortrait({ src, alt, coat, className = '', priority = false }) {
  return (
    <div className={`relative overflow-hidden bg-coal ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />
      ) : (
        <Placeholder coat={coat} />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
    </div>
  )
}

function Placeholder({ coat = { from: '#5b6152', to: '#2c3128' } }) {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0" style={{ background: `radial-gradient(120% 90% at 50% 12%, ${coat.from}, ${coat.to})` }} />
      <div className="grain absolute inset-0" />
      <svg viewBox="0 0 200 240" className="absolute inset-0 h-full w-full opacity-80 transition-transform duration-[1200ms] ease-out group-hover:scale-105" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
        <g fill="#000" opacity="0.28">
          <path d="M64 96 C58 70 60 52 66 40 C72 58 82 70 90 82 Z" />
          <path d="M136 96 C142 70 140 52 134 40 C128 58 118 70 110 82 Z" />
          <path d="M100 70 C74 70 60 92 60 118 C60 150 78 168 100 168 C122 168 140 150 140 118 C140 92 126 70 100 70 Z" />
          <path d="M100 150 C66 150 46 176 44 214 C44 232 60 240 100 240 C140 240 156 232 156 214 C154 176 134 150 100 150 Z" />
        </g>
      </svg>
    </div>
  )
}
