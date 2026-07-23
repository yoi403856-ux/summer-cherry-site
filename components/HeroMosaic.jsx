'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const easeOut = [0.22, 1, 0.36, 1]
const tileOffset = ['lg:mt-12', 'lg:mt-0', 'lg:mt-16', 'lg:mt-4', 'lg:mt-14', 'lg:mt-2']

export default function HeroMosaic({ images = [] }) {
  if (!images.length) return null
  return (
    <div className="mt-12 grid w-full grid-cols-2 items-start gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
      {images.map((src, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 + i * 0.09, ease: easeOut }}
          className={`group relative aspect-[3/4] w-full overflow-hidden border border-ink/10 shadow-card ${tileOffset[i % tileOffset.length]}`}
        >
          <Image
            src={src}
            alt={`Мейн-кун питомника Summer Cherry ${i + 1}`}
            fill
            priority={i === 0}
            sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover grayscale-[0.15] transition-all duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:grayscale-0"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />
        </motion.div>
      ))}
    </div>
  )
}
