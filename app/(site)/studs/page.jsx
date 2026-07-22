import { Check, Weight, Award } from 'lucide-react'
import PageHero from '@/components/PageHero'
import CatPortrait from '@/components/CatPortrait'
import { Reveal, Eyebrow } from '@/components/ui'
import { getStuds } from '@/lib/api'
import { urlForImage } from '@/sanity/image'

export const metadata = { title: 'Производители — Summer Cherry' }

export default async function StudsPage() {
  const studs = await getStuds()

  return (
    <>
      <PageHero eyebrow="Производители" title="Наши линии" lead="Проверенные, титулованные и здоровые кошки — основа каждого помёта Summer Cherry." />

      <section className="bg-parchment/50 backdrop-blur-md py-20 sm:py-28">
        <div className="mx-auto max-w-6xl space-y-20 px-5 sm:space-y-28 sm:px-8">
          {studs.map((c, i) => {
            const flip = i % 2 === 1
            const src = c.images?.[0] ? urlForImage(c.images[0], 900) : null
            return (
              <Reveal key={c._id}>
                <article className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
                  <div className={`group ${flip ? 'md:order-2' : ''}`}>
                    <CatPortrait coat={c.coat} alt={c.name} src={src} className="aspect-[4/5] w-full shadow-card" />
                  </div>
                  <div className={flip ? 'md:order-1' : ''}>
                    <Eyebrow>{c.role}</Eyebrow>
                    <h2 className="mt-4 font-serif text-5xl leading-none text-ink">{c.call}</h2>
                    <p className="mt-2 font-sans text-[13px] uppercase tracking-[0.22em] text-ink/45">{c.name}</p>
                    <dl className="mt-8 grid grid-cols-2 gap-y-6 border-t border-ink/10 pt-8">
                      <div>
                        <dt className="eyebrow text-golddim">Окрас</dt>
                        <dd className="mt-2 font-serif text-lg text-ink">{c.color}</dd>
                      </div>
                      <div>
                        <dt className="eyebrow text-golddim">Вес</dt>
                        <dd className="mt-2 flex items-center gap-2 font-serif text-lg text-ink"><Weight size={16} className="text-pine" /> {c.weight}</dd>
                      </div>
                      <div className="col-span-2">
                        <dt className="eyebrow text-golddim">Титулы</dt>
                        <dd className="mt-2 flex items-center gap-2 font-serif text-lg text-ink"><Award size={16} className="text-pine" /> {c.titles}</dd>
                      </div>
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
