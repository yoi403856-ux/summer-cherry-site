import Link from 'next/link'
import { Check, Weight, Award, ArrowRight } from 'lucide-react'
import PageHero from '@/components/PageHero'
import CatPortrait from '@/components/CatPortrait'
import { Reveal, Eyebrow } from '@/components/ui'
import { getStuds } from '@/lib/api'
import { urlForImageCrop } from '@/sanity/image'
import { getLocale, hreflangAlternates } from '@/lib/i18n'
import { withLocale } from '@/lib/locale'
import { roleLabel, pick, pickList } from '@/lib/dict'
import { getStudsContent } from '@/lib/content'

export async function generateMetadata() {
  const locale = getLocale()
  const d = await getStudsContent(locale)
  return {
    title: locale === 'en' ? 'Our Cats — Summer Cherry' : 'Производители — Summer Cherry',
    description: d.heroLead,
    alternates: hreflangAlternates('/studs', locale),
  }
}

export default async function StudsPage() {
  const locale = getLocale()
  const [studs, d] = await Promise.all([getStuds(), getStudsContent(locale)])

  return (
    <>
      <PageHero eyebrow={d.heroEyebrow} title={d.heroTitle} lead={d.heroLead} />

      <section className="bg-parchment/50 py-10 sm:py-14">
        <div className="mx-auto max-w-6xl space-y-14 px-5 sm:space-y-20 sm:px-8">
          {studs.map((c, i) => {
            const flip = i % 2 === 1
            const src = c.images?.[0] ? urlForImageCrop(c.images[0], 720, 900) : null
            const call = pick(locale, c.call, c.callEn)
            const fullName = pick(locale, c.name, c.nameEn)
            const color = pick(locale, c.color, c.colorEn)
            const weight = pick(locale, c.weight, c.weightEn)
            const titles = pick(locale, c.titles, c.titlesEn)
            const tests = pickList(locale, c.tests, c.testsEn)
            const polydactyl = pick(locale, c.polydactyl, c.polydactylEn)
            return (
              <Reveal key={c._id}>
                <article className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
                  {c.slug ? (
                    <Link href={withLocale(`/studs/${c.slug}`, locale)} className={`group block w-full md:max-w-[420px] ${flip ? 'md:order-2 md:justify-self-end' : ''}`}>
                      <CatPortrait coat={c.coat} alt={call} src={src} className="aspect-[4/5] w-full shadow-card" />
                    </Link>
                  ) : (
                    <div className={`group w-full md:max-w-[420px] ${flip ? 'md:order-2 md:justify-self-end' : ''}`}>
                      <CatPortrait coat={c.coat} alt={call} src={src} className="aspect-[4/5] w-full shadow-card" />
                    </div>
                  )}
                  <div className={flip ? 'md:order-1' : ''}>
                    <Eyebrow>{roleLabel(locale, c.role)}</Eyebrow>
                    {c.slug ? (
                      <Link href={withLocale(`/studs/${c.slug}`, locale)} className="mt-4 block font-serif text-5xl leading-none text-ink transition-colors hover:text-pine">{call}</Link>
                    ) : (
                      <h2 className="mt-4 font-serif text-5xl leading-none text-ink">{call}</h2>
                    )}
                    <p className="mt-2 font-sans text-[13px] uppercase tracking-[0.22em] text-ink/45">{fullName}</p>
                    <dl className="mt-8 grid grid-cols-2 gap-y-6 border-t border-ink/10 pt-8">
                      {color && (
                        <div className="col-span-2">
                          <dt className="eyebrow text-golddim">{d.color}</dt>
                          <dd className="mt-2 font-serif text-lg text-ink">{color}</dd>
                        </div>
                      )}
                      {polydactyl && (
                        <div>
                          <dt className="eyebrow text-golddim">{d.polydactyl}</dt>
                          <dd className="mt-2 font-serif text-lg text-ink">{polydactyl}</dd>
                        </div>
                      )}
                      {weight && (
                        <div>
                          <dt className="eyebrow text-golddim">{d.weight}</dt>
                          <dd className="mt-2 flex items-center gap-2 font-serif text-lg text-ink"><Weight size={16} className="text-pine" /> {weight}</dd>
                        </div>
                      )}
                      {titles && (
                        <div className="col-span-2">
                          <dt className="eyebrow text-golddim">{d.titles}</dt>
                          <dd className="mt-2 flex items-center gap-2 font-serif text-lg text-ink"><Award size={16} className="text-pine" /> {titles}</dd>
                        </div>
                      )}
                    </dl>
                    {tests?.length > 0 && (
                      <div className="mt-6">
                        <p className="eyebrow text-golddim">{d.health}</p>
                        <ul className="mt-3 flex flex-wrap gap-2">
                          {tests.map((t) => (
                            <li key={t} className="inline-flex items-center gap-1.5 border border-pine/30 bg-pine/5 px-3 py-1.5 font-sans text-[12px] tracking-wide text-pinedeep">
                              <Check size={13} className="text-pine" /> {t}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {c.slug && (
                      <Link href={withLocale(`/studs/${c.slug}`, locale)} className="group mt-8 inline-flex items-center gap-2 font-sans text-[12px] uppercase tracking-[0.24em] text-ink transition-colors hover:text-golddim">
                        {d.profile}
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

      <section className="border-t border-ink/10 bg-birch/45 py-20">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <Reveal>
            <Eyebrow>{d.respEyebrow}</Eyebrow>
            <p className="mt-6 font-serif text-2xl italic leading-relaxed text-ink/80 sm:text-3xl">{d.respText}</p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
