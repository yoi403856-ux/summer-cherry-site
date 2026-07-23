'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import CatPortrait from './CatPortrait'
import { useLocale, useDict } from './LocaleProvider'
import { statusMap, sexLabel, dateLocale } from '@/lib/dict'

const filterKeys = ['all', 'available', 'reserved', 'sold']

export default function KittensGrid({ items = [] }) {
  const [active, setActive] = useState('all')
  const locale = useLocale()
  const d = useDict().kittens
  const list = active === 'all' ? items : items.filter((k) => k.status === active)
  const fmtDate = (iso) =>
    iso ? new Date(iso).toLocaleDateString(dateLocale[locale], { day: 'numeric', month: 'long', year: 'numeric' }) : '—'

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {filterKeys.map((key) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`cursor-pointer border px-4 py-2 font-sans text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 sm:px-5 sm:py-2.5 sm:text-[12px] ${
                active === key ? 'border-ink bg-ink text-parchment' : 'border-ink/20 text-ink/70 hover:border-ink/50'
              }`}
            >
              {d.filters[key]}
            </button>
          ))}
        </div>
        <p className="font-sans text-[13px] tracking-wide text-ink/50">{d.count(list.length)}</p>
      </div>

      <motion.div layout className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 md:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {list.map((k, i) => {
            const s = statusMap[locale][k.status] || statusMap[locale].available
            return (
              <motion.article
                key={k._id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="group"
              >
                <Link href={`/kittens/${k.slug}`} className="block">
                  <div className="relative">
                    <CatPortrait coat={k.coat} alt={k.name} src={k.src} className="aspect-[4/5] w-full" priority={i < 4} />
                    <span className={`absolute left-2 top-2 px-2 py-0.5 font-sans text-[9px] uppercase tracking-[0.16em] sm:left-4 sm:top-4 sm:px-3 sm:py-1 sm:text-[10px] sm:tracking-[0.2em] ${s.cls}`}>{s.label}</span>
                  </div>
                  <div className="mt-2 flex items-start justify-between gap-2 sm:mt-3">
                    <h3 className="font-serif text-lg leading-none text-ink sm:text-2xl">{k.name}</h3>
                    <span className="mt-0.5 font-sans text-[10px] uppercase tracking-[0.14em] text-golddim sm:mt-1 sm:text-[12px] sm:tracking-[0.16em]">{sexLabel(locale, k.sex)}</span>
                  </div>
                </Link>
                <dl className="mt-2 space-y-1 border-t border-ink/10 pt-2 font-sans text-[11px] text-ink/60 sm:mt-3 sm:space-y-1 sm:pt-3 sm:text-[13px]">
                  <div className="flex justify-between"><dt>{d.color}</dt><dd className="text-ink/80">{k.color}</dd></div>
                  <div className="flex justify-between"><dt>{d.born}</dt><dd className="text-ink/80">{fmtDate(k.born)}</dd></div>
                  <div className="flex justify-between"><dt>{d.litter}</dt><dd className="text-ink/80">{k.litter}</dd></div>
                </dl>
                <Link
                  href={`/kittens/${k.slug}`}
                  className="mt-2 inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.16em] text-ink transition-colors hover:text-golddim sm:mt-3 sm:text-[12px] sm:tracking-[0.2em]"
                >
                  {d.more}
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-1 sm:size-[14px]" />
                </Link>
              </motion.article>
            )
          })}
        </AnimatePresence>
      </motion.div>
    </>
  )
}
