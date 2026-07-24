import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Check, Weight, Award } from 'lucide-react'
import CatPortrait from '@/components/CatPortrait'
import KittenGallery from '@/components/KittenGallery'
import ContactLink from '@/components/ContactLink'
import ScrollHint from '@/components/ScrollHint'
import { Reveal, Eyebrow, PineMark } from '@/components/ui'
import { getStud, getStudSlugs, getKittensByStud } from '@/lib/api'
import { urlForImage, urlForImageCrop } from '@/sanity/image'
import { getDict, getLocale } from '@/lib/i18n'
import { roleLabel, pick, pickList } from '@/lib/dict'

export const dynamicParams = true

export async function generateStaticParams() {
  const slugs = await getStudSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const c = await getStud(params.slug)
  return { title: c ? `${c.call || c.name} — Summer Cherry` : 'Summer Cherry' }
}

export default async function StudDetail({ params }) {
  const c = await getStud(params.slug)
  if (!c) notFound()

  const locale = getLocale()
  const d = getDict().studDetail
  const images = (c.images || [])
    .map((img) => ({ display: urlForImageCrop(img, 1000, 1000), full: urlForImage(img, 1400) }))
    .filter((x) => x.display)
  const kittens = await getKittensByStud(c._id)
  const call = pick(locale, c.call, c.callEn)
  const fullName = pick(locale, c.name, c.nameEn)
  const weight = pick(locale, c.weight, c.weightEn)
  const titles = pick(locale, c.titles, c.titlesEn)
  const tests = pickList(locale, c.tests, c.testsEn)
  const polydactyl = pick(locale, c.polydactyl, c.polydactylEn)

  return (
    <article className="relative">
      <section className="px-5 pb-2 pt-32 sm:px-8 sm:pt-36">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Link href="/studs" className="inline-flex items-center gap-2 font-sans text-[12px] uppercase tracking-[0.24em] text-ink/60 transition-colors hover:text-ink">
              <ArrowLeft size={14} /> {d.back}
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-parchment/55 backdrop-blur-md px-5 py-8 sm:px-8 sm:py-12">
        <div className="mx-auto grid max-w-6xl items-start gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
          <Reveal>
            {images.length > 0 ? (
              <KittenGallery images={images} name={call || fullName} />
            ) : (
              <div className="group">
                <CatPortrait coat={c.coat} alt={call || fullName} className="aspect-[4/5] w-full shadow-card" />
              </div>
            )}
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <Eyebrow>{roleLabel(locale, c.role)}</Eyebrow>
              <h1 className="mt-3 font-display text-5xl leading-none text-ink sm:text-6xl">{call || fullName}</h1>
              {fullName && fullName !== call && (
                <p className="mt-2 font-sans text-[13px] uppercase tracking-[0.22em] text-ink/45">{fullName}</p>
              )}

              <dl className="mt-8 grid grid-cols-2 gap-y-6 border-t border-ink/10 pt-8">
                {c.color && (
                  <div><dt className="eyebrow text-golddim">{d.color}</dt><dd className="mt-2 font-serif text-lg text-ink">{c.color}</dd></div>
                )}
                {polydactyl && (
                  <div><dt className="eyebrow text-golddim">{d.polydactyl}</dt><dd className="mt-2 font-serif text-lg text-ink">{polydactyl}</dd></div>
                )}
                {weight && (
                  <div><dt className="eyebrow text-golddim">{d.weight}</dt><dd className="mt-2 flex items-center gap-2 font-serif text-lg text-ink"><Weight size={16} className="text-pine" /> {weight}</dd></div>
                )}
                {titles && (
                  <div className="col-span-2"><dt className="eyebrow text-golddim">{d.titles}</dt><dd className="mt-2 flex items-center gap-2 font-serif text-lg text-ink"><Award size={16} className="text-pine" /> {titles}</dd></div>
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

              <ContactLink className="mt-10 inline-flex w-full items-center justify-center gap-3 bg-ink px-8 py-4 font-sans text-[13px] uppercase tracking-[0.24em] text-parchment transition-colors duration-300 hover:bg-pine">
                {d.contact}
              </ContactLink>
              <div className="mt-6 flex items-center gap-3 text-ink/45">
                <PineMark className="h-4 w-4 text-golddim" />
                <span className="font-sans text-[12px] tracking-[0.14em]">{d.cattery}</span>
              </div>

              {kittens.length > 0 && <ScrollHint targetId="offspring" label={d.offspringHint} />}
            </div>
          </Reveal>
        </div>
      </section>

      {/* offspring */}
      {kittens.length > 0 && (
        <section id="offspring" className="bg-parchment/55 backdrop-blur-md px-5 pb-16 sm:px-8 sm:pb-20">
          <div className="mx-auto max-w-6xl border-t border-ink/10 pt-12">
            <Reveal>
              <Eyebrow>{d.offspringEyebrow}</Eyebrow>
              <h2 className="mt-4 font-serif text-3xl text-ink sm:text-4xl">{d.offspring}</h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {kittens.map((k) => {
                  const src = k.images?.[0] ? urlForImage(k.images[0], 500) : null
                  const kName = pick(locale, k.name, k.nameEn)
                  return (
                    <Link
                      key={k._id}
                      href={`/kittens/${k.slug}`}
                      className="group flex items-center gap-5 border border-ink/10 bg-parchment/40 p-4 transition-colors hover:border-pine/40"
                    >
                      <div className="h-24 w-24 shrink-0 overflow-hidden">
                        <CatPortrait src={src} alt={kName} className="h-full w-full" />
                      </div>
                      <div>
                        <h3 className="font-serif text-2xl text-ink">{kName}</h3>
                        <p className="mt-1 font-sans text-[13px] text-ink/55">{k.color || ''}</p>
                      </div>
                    </Link>
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
