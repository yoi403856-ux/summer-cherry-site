'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import CatPortrait from './CatPortrait'

const filters = [
  { key: 'all', label: 'Все' },
  { key: 'available', label: 'Свободны' },
  { key: 'reserved', label: 'Резерв' },
  { key: 'sold', label: 'В новых домах' },
]

const statusMap = {
  available: { label: 'Свободен', cls: 'bg-pine text-parchment' },
  reserved: { label: 'Резерв', cls: 'bg-golddim text-ink' },
  sold: { label: 'Продан', cls: 'bg-ink/70 text-parchment' },
}

const fmtDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }) : '—'

export default function KittensGrid({ items = [] }) {
  const [active, setActive] = useState('all')
  const list = active === 'all' ? items : items.filter((k) => k.status === active)

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-6">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={`cursor-pointer border px-5 py-2.5 font-sans text-[12px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                active === f.key ? 'border-ink bg-ink text-parchment' : 'border-ink/20 text-ink/70 hover:border-ink/50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <p className="font-sans text-[13px] tracking-wide text-ink/50">
          {list.length} {list.length === 1 ? 'котёнок' : 'котят'}
        </p>
      </div>

      <motion.div layout className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((k) => {
            const s = statusMap[k.status] || statusMap.available
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
                    <CatPortrait coat={k.coat} alt={k.name} src={k.src} className="aspect-[8/5] w-full" />
                    <span className={`absolute left-4 top-4 px-3 py-1 font-sans text-[10px] uppercase tracking-[0.2em] ${s.cls}`}>{s.label}</span>
                  </div>
                  <div className="mt-3 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-serif text-2xl leading-none text-ink">{k.name}</h3>
                      <p className="mt-2 font-sans text-[13px] tracking-wide text-ink/55">{k.color}</p>
                    </div>
                    <span className="mt-1 font-sans text-[12px] uppercase tracking-[0.16em] text-golddim">{k.sex}</span>
                  </div>
                </Link>
                <dl className="mt-3 space-y-1 border-t border-ink/10 pt-3 font-sans text-[13px] text-ink/60">
                  <div className="flex justify-between"><dt>Дата рождения</dt><dd className="text-ink/80">{fmtDate(k.born)}</dd></div>
                  <div className="flex justify-between"><dt>Помёт</dt><dd className="text-ink/80">{k.litter}</dd></div>
                  <div className="flex justify-between"><dt>Стоимость</dt><dd className="text-ink/80">{k.price}</dd></div>
                </dl>
                <Link
                  href={`/kittens/${k.slug}`}
                  className="mt-3 inline-flex items-center gap-2 font-sans text-[12px] uppercase tracking-[0.2em] text-ink transition-colors hover:text-golddim"
                >
                  Узнать подробнее
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.article>
            )
          })}
        </AnimatePresence>
      </motion.div>
    </>
  )
}
