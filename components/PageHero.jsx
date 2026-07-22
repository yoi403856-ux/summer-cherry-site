'use client'

import { motion } from 'framer-motion'

const easeOut = [0.22, 1, 0.36, 1]

export default function PageHero({ eyebrow, title, lead }) {
  return (
    <section className="relative flex min-h-[62vh] items-end overflow-hidden pb-16 pt-40 sm:min-h-[68vh] sm:pb-24">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-parchment/90 via-parchment/40 to-transparent" />
      <div className="grain pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: easeOut }}
          className="eyebrow text-golddim"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.12, ease: easeOut }}
          className="mt-4 font-display text-6xl leading-[0.9] tracking-tight text-ink sm:text-8xl"
        >
          {title}
        </motion.h1>
        {lead && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.28 }}
            className="mt-6 max-w-xl font-serif text-xl italic leading-relaxed text-ink/70 sm:text-2xl"
          >
            {lead}
          </motion.p>
        )}
      </div>
    </section>
  )
}
