import Link from 'next/link'
import { Check, Weight, Award, ArrowRight } from 'lucide-react'
import PageHero from '@/components/PageHero'
import CatPortrait from '@/components/CatPortrait'
import { Reveal, Eyebrow } from '@/components/ui'
import { getStuds } from '@/lib/api'
import { urlForImageCrop } from '@/sanity/image'

export const metadata = { title: 'Производители — Summer Cherry' }
export const revalidate = 60

export default async function StudsPage() {
  const studs = await getStuds()

  return (
    <>
      <PageHero eyebrow="Производители" title="Наши линии" lead="Проверенные, титулованные и здоровые кошки — основа каждого помёта Summer Cherry." />

      <section className="bg-parchment/50 backdrop-blur-md py-10 sm:py-14">
        <div className="mx-auto max-w-6xl space-y-14 px-5 sm:space-y-20 sm:px-8">
          {studs.map((c, i) => {
            const flip = i % 2 === 1
            const src = c.images?.[0] ? urlForImageCrop(c.images[0], 720, 900) : null
            return (
              <Reveal key={c._id}>
                <article className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
                  {c.slug ? (
                    <Link href={`/studs/${c.slug}`} className={`group block w-full md:max-w-[420px] ${flip ? 'md:order-2 md:justify-self-end' : ''}`}>
                      <CatPortrait coat={c.coat} alt={c.name} src={src} className="aspect-[4/5] w-full shadow-card" />
                    </Link>
                  ) : (
                    <div className={`group w-full md:max-w-[420px] ${flip ? 'md:order-2 md:justify-self-end' : ''}`}>
                      <CatPortrait coat={c.coat} alt={c.name} src={src} className="aspect-[4/5] w-full shadow-card" />
                    </div>
                  )}
                  <div className={flip ? 'md:order-1' : ''}>
                    <Eyebrow>{c.role}</Eyebrow>
                    {c.slug ? (
                      <Link href={`/studs/${c.slug}`} className="mt-4 block font-serif text-5xl leading-none text-ink transition-colors hover:text-pine">{c.call}</Link>
                    ) : (
                      <h2 className="mt-4 font-serif text-5xl leading-none text-ink">{c.call}</h2>
                    )}
                    <p className="mt-2 font-sans text-[13px] uppercase tracking-[0.22em] text-ink/45">{c.name}</p>
                    <dl className="mt-8 grid grid-cols-2 gap-y-6 border-t border-ink/10 pt-8">
                      {c.color && (
                        <div>
                          <dt className="eyebrow text-golddim">Окрас</dt>
                          <dd className="mt-2 font-serif text-lg text-ink">{c.color}</dd>
                        </div>
                      )}
                      {c.weight && (
                        <div>
                          <dt className="eyebrow text-golddim">Вес</dt>
                          <dd className="mt-2 flex items-center gap-2 font-serif text-lg text-ink"><Weight size={16} className="text-pine" /> {c.weight}</dd>
                        </div>
                      )}
                      {c.titles && (
                        <div className="col-span-2">
                          <dt className="eyebrow text-golddim">Титулы</dt>
                          <dd className="mt-2 flex items-center gap-2 font-serif text-lg text-ink"><Award size={16} className="text-pine" /> {c.titles}</dd>
                        </div>
                      )}
                    </dl>
                    {c.tests?.length > 0 && (
                      <div className="mt-6">
                        <p className="eyebrow text-golddim">Здоровье</p>
                        <ul className="mt-3 flex flex-wrap gap-2">
                          {c.tests.map((t) => (
                            <li key={t} className="inline-flex items-center gap-1.5 border border-pine/30 bg-pine/5 px-3 py-1.5 font-sans text-[12px] tracking-wide text-pinedeep">
                              <Check size={13} className="text-pine" /> {t}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {c.slug && (
                      <Link href={`/studs/${c.slug}`} className="group mt-8 inline-flex items-center gap-2 font-sans text-[12px] uppercase tracking-[0.24em] text-ink transition-colors hover:text-golddim">
                        Смотреть профиль
                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                      </Link>
                    )}
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </section>

      <section className="border-t border-ink/10 bg-birch/45 backdrop-blur-md py-20">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <Reveal>
            <Eyebrow>Ответственное разведение</Eyebrow>
            <p className="mt-6 font-serif text-2xl italic leading-relaxed text-ink/80 sm:text-3xl">
              Все производители ежегодно проходят УЗИ сердца и генетические
              тесты. Мы не вяжем носителей наследственных заболеваний — это
              наш принцип, а не формальность.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
