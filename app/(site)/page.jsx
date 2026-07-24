import Link from 'next/link'
import { ArrowRight, ShieldCheck, HeartHandshake, Trees, Award } from 'lucide-react'
import CatPortrait from '@/components/CatPortrait'
import HeroMosaic from '@/components/HeroMosaic'
import ContactLink from '@/components/ContactLink'
import { Reveal, Eyebrow, Divider, PineMark } from '@/components/ui'
import { getStuds, getSettings } from '@/lib/api'
import { getLocalHeroImages } from '@/lib/heroImages'
import { urlForImage } from '@/sanity/image'
import { getDict, getLocale } from '@/lib/i18n'
import { roleLabel, pick } from '@/lib/dict'

const valueIcons = [ShieldCheck, HeartHandshake, Award, Trees]

export default async function Home() {
  const [studs, settings] = await Promise.all([getStuds(), getSettings()])
  const locale = getLocale()
  const d = getDict().home
  const heroImages =
    settings?.heroImages?.length
      ? settings.heroImages.map((img) => urlForImage(img, 900))
      : getLocalHeroImages()

  return (
    <>
      {/* ─────────── HERO (mosaic) ─────────── */}
      <section className="relative min-h-[100svh] overflow-hidden px-5 pb-16 pt-32 sm:px-8 sm:pt-36">
        <div className="grain pointer-events-none absolute inset-0" />
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center">
          <Reveal>
            <p className="eyebrow text-golddim">{d.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-5 text-center font-display text-[15vw] leading-[0.88] tracking-[0.03em] text-ink sm:text-[11vw] md:text-[104px]">
              Summer Cherry
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-xl text-center font-serif text-xl italic leading-relaxed text-ink/70 sm:text-2xl">
              {d.lead}
            </p>
          </Reveal>

          <HeroMosaic images={heroImages} />

          <Reveal delay={0.2}>
            <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
              <Link
                href="/kittens"
                className="group inline-flex items-center gap-3 bg-ink px-8 py-4 font-sans text-[13px] uppercase tracking-[0.24em] text-parchment transition-colors duration-300 hover:bg-pine"
              >
                {d.ourKittens}
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link href="/about" className="link-underline font-sans text-[13px] uppercase tracking-[0.24em] text-ink/80">
                {d.history}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─────────── MANIFESTO ─────────── */}
      <section className="relative bg-parchment/50 backdrop-blur-md py-24 sm:py-36">
        <div className="mx-auto grid max-w-6xl gap-14 px-5 sm:px-8 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
          <Reveal>
            <Eyebrow>{d.aboutEyebrow}</Eyebrow>
            <h2 className="mt-6 font-serif text-4xl leading-[1.08] text-ink sm:text-5xl">
              {d.aboutH2a}<span className="italic text-pine">{d.aboutH2b}</span>.
            </h2>
            <PineMark className="mt-8 h-8 w-8 text-golddim/70" />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-6 font-sans text-[16px] leading-[1.85] text-ink/75">
              <p>
                <span className="float-left mr-3 font-display text-6xl leading-[0.7] text-pine">S</span>
                {d.p1}
              </p>
              <p>{d.p2}</p>
              <p className="border-l-2 border-golddim/60 pl-5 font-serif text-xl italic text-ink/85">{d.p3}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─────────── STATS ─────────── */}
      <section className="border-y border-ink/10 bg-birch/45 backdrop-blur-md">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-ink/10 px-5 sm:px-8 md:grid-cols-4">
          {d.stats.map((s, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="flex flex-col items-center py-12">
                <span className="font-display text-5xl text-pine sm:text-6xl">{s.n}</span>
                <span className="mt-3 eyebrow text-center text-golddim">{s.l}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─────────── RESIDENTS ─────────── */}
      <section className="bg-parchment/50 backdrop-blur-md py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="mb-14 flex flex-col items-end justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <Eyebrow>{d.residentsEyebrow}</Eyebrow>
              <h2 className="mt-5 font-serif text-4xl leading-tight text-ink sm:text-5xl">{d.residentsH2}</h2>
            </div>
            <Link href="/studs" className="group inline-flex items-center gap-2 font-sans text-[13px] uppercase tracking-[0.24em] text-ink/70 transition-colors hover:text-ink">
              {d.allStuds}
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {studs.slice(0, 4).map((c, i) => {
              const src = c.images?.[0] ? urlForImage(c.images[0], 700) : null
              const call = pick(locale, c.call, c.callEn) || pick(locale, c.name, c.nameEn)
              return (
                <Reveal key={c._id} delay={i * 0.08}>
                  <Link href={c.slug ? `/studs/${c.slug}` : '/studs'} className="group block">
                    <CatPortrait coat={c.coat} alt={call} src={src} className="aspect-[3/4] w-full" />
                    <div className="mt-4">
                      <p className="eyebrow text-golddim">{roleLabel(locale, c.role)}</p>
                      <h3 className="mt-1.5 font-serif text-2xl text-ink">{call}</h3>
                      <p className="mt-1 font-sans text-[13px] tracking-wide text-ink/55">{c.color}</p>
                    </div>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─────────── VALUES ─────────── */}
      <section className="bg-birch/45 backdrop-blur-md py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal className="text-center">
            <Eyebrow>{d.whyEyebrow}</Eyebrow>
            <h2 className="mx-auto mt-5 max-w-2xl font-serif text-4xl leading-tight text-ink sm:text-5xl">{d.whyH2}</h2>
          </Reveal>
          <div className="mt-16 grid gap-px overflow-hidden border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
            {d.values.map((v, i) => {
              const Icon = valueIcons[i]
              return (
                <Reveal key={i} delay={i * 0.07}>
                  <div className="group h-full bg-parchment/70 backdrop-blur-md p-8 transition-colors duration-500 hover:bg-pinedeep">
                    <Icon className="h-8 w-8 text-golddim transition-colors duration-500 group-hover:text-gold" strokeWidth={1.4} />
                    <h3 className="mt-6 font-serif text-2xl text-ink transition-colors duration-500 group-hover:text-parchment">{v.t}</h3>
                    <p className="mt-3 font-sans text-[14px] leading-relaxed text-ink/65 transition-colors duration-500 group-hover:text-birch/75">{v.d}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─────────── QUOTE BAND ─────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-ink/60" />
        <div className="grain absolute inset-0" />
        <div className="relative mx-auto max-w-4xl px-5 py-32 text-center sm:px-8 sm:py-40">
          <Reveal>
            <PineMark className="mx-auto h-8 w-8 text-gold" />
            <p className="mt-8 font-serif text-3xl italic leading-[1.35] text-birch sm:text-[42px]">{d.quote}</p>
            <p className="mt-8 eyebrow text-gold">{d.quoteBy}</p>
          </Reveal>
        </div>
      </section>

      {/* ─────────── CTA ─────────── */}
      <section className="bg-parchment/50 backdrop-blur-md py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <Reveal>
            <Divider className="mb-10" />
            <h2 className="font-serif text-4xl leading-tight text-ink sm:text-6xl">
              {d.ctaH2a}<span className="italic text-pine">{d.ctaH2b}</span>{d.ctaH2c}
            </h2>
            <p className="mx-auto mt-6 max-w-xl font-sans text-[16px] leading-relaxed text-ink/70">{d.ctaLead}</p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/kittens" className="group inline-flex items-center gap-3 bg-ink px-8 py-4 font-sans text-[13px] uppercase tracking-[0.24em] text-parchment transition-colors duration-300 hover:bg-pine">
                {d.ctaKittens}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <ContactLink className="border border-ink/25 px-8 py-4 font-sans text-[13px] uppercase tracking-[0.24em] text-ink transition-colors duration-300 hover:bg-ink hover:text-parchment">
                {d.ctaWrite}
              </ContactLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
