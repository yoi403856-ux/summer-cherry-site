import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Check, Weight, Award } from 'lucide-react'
import CatPortrait from '@/components/CatPortrait'
import KittenGallery from '@/components/KittenGallery'
import { Reveal, Eyebrow, PineMark } from '@/components/ui'
import { getStud, getStudSlugs } from '@/lib/api'
import { urlForImage, urlForImageCrop } from '@/sanity/image'

export const revalidate = 60
export const dynamicParams = true

export async function generateStaticParams() {
  const slugs = await getStudSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const c = await getStud(params.slug)
  return { title: c ? `${c.call || c.name} — производитель Summer Cherry` : 'Производитель' }
}

export default async function StudDetail({ params }) {
  const c = await getStud(params.slug)
  if (!c) notFound()

  const images = (c.images || [])
    .map((img) => ({ display: urlForImageCrop(img, 1000, 1000), full: urlForImage(img, 1400) }))
    .filter((x) => x.display)

  return (
    <article className="relative">
      <section className="px-5 pb-2 pt-32 sm:px-8 sm:pt-36">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Link href="/studs" className="inline-flex items-center gap-2 font-sans text-[12px] uppercase tracking-[0.24em] text-ink/60 transition-colors hover:text-ink">
              <ArrowLeft size={14} /> Все производители
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-parchment/65 backdrop-blur-md px-5 py-8 sm:px-8 sm:py-12">
        <div className="mx-auto grid max-w-6xl items-start gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
          <Reveal>
            {images.length > 0 ? (
              <KittenGallery images={images} name={c.call || c.name} />
            ) : (
              <div className="group">
                <CatPortrait coat={c.coat} alt={c.call || c.name} className="aspect-[4/5] w-full shadow-card" />
              </div>
            )}
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <Eyebrow>{c.role || 'Производитель'}</Eyebrow>
              <h1 className="mt-3 font-display text-5xl leading-none text-ink sm:text-6xl">{c.call || c.name}</h1>
              {c.name && c.name !== c.call && (
                <p className="mt-2 font-sans text-[13px] uppercase tracking-[0.22em] text-ink/45">{c.name}</p>
              )}

              <dl className="mt-8 grid grid-cols-2 gap-y-6 border-t border-ink/10 pt-8">
                {c.color && (
                  <div><dt className="eyebrow text-golddim">Окрас</dt><dd className="mt-2 font-serif text-lg text-ink">{c.color}</dd></div>
                )}
                {c.weight && (
                  <div><dt className="eyebrow text-golddim">Вес</dt><dd className="mt-2 flex items-center gap-2 font-serif text-lg text-ink"><Weight size={16} className="text-pine" /> {c.weight}</dd></div>
                )}
                {c.titles && (
                  <div className="col-span-2"><dt className="eyebrow text-golddim">Титулы</dt><dd className="mt-2 flex items-center gap-2 font-serif text-lg text-ink"><Award size={16} className="text-pine" /> {c.titles}</dd></div>
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

              <a href="#contact" className="mt-10 inline-flex w-full items-center justify-center gap-3 bg-ink px-8 py-4 font-sans text-[13px] uppercase tracking-[0.24em] text-parchment transition-colors duration-300 hover:bg-pine">
                Связаться с питомником
              </a>
              <div className="mt-6 flex items-center gap-3 text-ink/45">
                <PineMark className="h-4 w-4 text-golddim" />
                <span className="font-sans text-[12px] tracking-[0.14em]">Питомник Summer Cherry</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </article>
  )
}
