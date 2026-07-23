import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Check } from 'lucide-react'
import CatPortrait from '@/components/CatPortrait'
import KittenGallery from '@/components/KittenGallery'
import { Reveal, Eyebrow, PineMark } from '@/components/ui'
import { getKitten, getKittenSlugs } from '@/lib/api'
import { urlForImage, urlForImageCrop } from '@/sanity/image'

export const revalidate = 60
export const dynamicParams = true

const statusMap = {
  available: { label: 'Свободен', cls: 'bg-pine text-parchment' },
  reserved: { label: 'Резерв', cls: 'bg-golddim text-ink' },
  sold: { label: 'В новом доме', cls: 'bg-ink/70 text-parchment' },
}

const fmtDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }) : '—'

export async function generateStaticParams() {
  const slugs = await getKittenSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const k = await getKitten(params.slug)
  return { title: k ? `${k.name} — котёнок Summer Cherry` : 'Котёнок' }
}

export default async function KittenDetail({ params }) {
  const k = await getKitten(params.slug)
  if (!k) notFound()

  const images = (k.images || [])
    .map((img) => ({ display: urlForImageCrop(img, 1000, 1000), full: urlForImage(img, 1400) }))
    .filter((x) => x.display)
  const s = statusMap[k.status] || statusMap.available

  return (
    <article className="relative">
      {/* slim top bar */}
      <section className="px-5 pb-2 pt-24 sm:px-8 sm:pt-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Link href="/kittens" className="inline-flex items-center gap-2 font-sans text-[12px] uppercase tracking-[0.24em] text-ink/60 transition-colors hover:text-ink">
              <ArrowLeft size={14} /> Все котята
            </Link>
          </Reveal>
        </div>
      </section>

      {/* body */}
      <section className="bg-parchment/65 backdrop-blur-md px-5 py-8 sm:px-8 sm:py-12">
        <div className="mx-auto grid max-w-6xl items-start gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
          {/* gallery */}
          <Reveal>
            {images.length > 0 ? (
              <KittenGallery images={images} name={k.name} />
            ) : (
              <div className="group">
                <CatPortrait coat={k.coat} alt={k.name} className="aspect-[4/5] w-full shadow-card" />
              </div>
            )}
          </Reveal>

          {/* info */}
          <Reveal delay={0.1}>
            <div>
              <Eyebrow>{k.litter ? `Помёт «${k.litter.replace('Помёт ', '')}»` : 'Котёнок'}</Eyebrow>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <h1 className="font-display text-5xl leading-none text-ink sm:text-6xl">{k.name}</h1>
                <span className={`px-3 py-1 font-sans text-[11px] uppercase tracking-[0.2em] ${s.cls}`}>{s.label}</span>
              </div>
              <dl className="mt-8 grid grid-cols-2 gap-y-6 border-t border-ink/10 pt-8">
                <div><dt className="eyebrow text-golddim">Окрас</dt><dd className="mt-2 font-serif text-lg text-ink">{k.color || '—'}</dd></div>
                <div><dt className="eyebrow text-golddim">Пол</dt><dd className="mt-2 font-serif text-lg text-ink">{k.sex || '—'}</dd></div>
                <div><dt className="eyebrow text-golddim">Дата рождения</dt><dd className="mt-2 font-serif text-lg text-ink">{fmtDate(k.born)}</dd></div>
                <div><dt className="eyebrow text-golddim">Стоимость</dt><dd className="mt-2 font-serif text-lg text-ink">{k.price || 'по запросу'}</dd></div>
              </dl>

              {k.description && (
                <p className="mt-6 font-serif text-xl italic leading-relaxed text-ink/80">{k.description}</p>
              )}

              <ul className="mt-8 space-y-2">
                {['Привит по возрасту', 'Приучён к лотку и когтеточке', 'Ветпаспорт и родословная WCF', 'Договор купли-продажи'].map((t) => (
                  <li key={t} className="flex items-center gap-2 font-sans text-[14px] text-pinedeep">
                    <Check size={15} className="text-pine" /> {t}
                  </li>
                ))}
              </ul>

              {k.status !== 'sold' && (
                <a href="#contact" className="mt-10 inline-flex w-full items-center justify-center gap-3 bg-ink px-8 py-4 font-sans text-[13px] uppercase tracking-[0.24em] text-parchment transition-colors duration-300 hover:bg-pine">
                  Забронировать
                </a>
              )}
              <div className="mt-6 flex items-center gap-3 text-ink/45">
                <PineMark className="h-4 w-4 text-golddim" />
                <span className="font-sans text-[12px] tracking-[0.14em]">Питомник Summer Cherry</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* parents */}
      {(k.father || k.mother) && (
        <section className="bg-parchment/65 backdrop-blur-md px-5 pb-16 sm:px-8 sm:pb-20">
          <div className="mx-auto max-w-6xl border-t border-ink/10 pt-12">
            <Reveal>
              <Eyebrow>Родословная</Eyebrow>
              <h2 className="mt-4 font-serif text-3xl text-ink sm:text-4xl">Родители</h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {[{ p: k.father, role: 'Отец' }, { p: k.mother, role: 'Мать' }]
                  .filter((x) => x.p)
                  .map(({ p, role }) => {
                    const src = p.images?.[0] ? urlForImage(p.images[0], 500) : null
                    const inner = (
                      <>
                        <div className="h-24 w-24 shrink-0 overflow-hidden">
                          <CatPortrait src={src} alt={p.call || p.name} className="h-full w-full" />
                        </div>
                        <div>
                          <p className="eyebrow text-golddim">{role}</p>
                          <h3 className="mt-1 font-serif text-2xl text-ink">{p.call || p.name}</h3>
                          <p className="mt-1 font-sans text-[13px] text-ink/55">{p.color || ''}</p>
                        </div>
                      </>
                    )
                    const cls = 'group flex items-center gap-5 border border-ink/10 bg-parchment/40 p-4 transition-colors'
                    return p.slug ? (
                      <Link key={p._id} href={`/studs/${p.slug}`} className={`${cls} hover:border-pine/40`}>{inner}</Link>
                    ) : (
                      <div key={p._id} className={cls}>{inner}</div>
                    )
                  })}
              </div>
            </Reveal>
          </div>
        </section>
      )}
    </article>
  )
}
