import { CalendarDays, MapPin, Sparkles } from 'lucide-react'
import PageHero from '@/components/PageHero'
import CatPortrait from '@/components/CatPortrait'
import { Reveal, Eyebrow, Divider, PineMark } from '@/components/ui'
import { getSettings } from '@/lib/api'
import { urlForImageCrop } from '@/sanity/image'
import { getDict, getLocale, hreflangAlternates } from '@/lib/i18n'
import { getAboutContent } from '@/lib/content'

export async function generateMetadata() {
  const locale = getLocale()
  return {
    title: locale === 'en' ? 'About — Summer Cherry' : 'О нас — Summer Cherry',
    alternates: hreflangAlternates('/about', locale),
  }
}

const featureIcons = [MapPin, CalendarDays, Sparkles]

export default async function About() {
  const locale = getLocale()
  const [settings, d] = await Promise.all([getSettings(), getAboutContent(locale)])
  const dict = getDict()
  const aboutSrc = settings?.aboutPhoto ? urlForImageCrop(settings.aboutPhoto, 800, 1000) : null

  return (
    <>
      <PageHero
        eyebrow={dict.nav.about}
        title={
          <>
            <span className="sm:hidden">{d.heroTitle[0]} {d.heroTitle[1]}</span>
            <span className="hidden sm:inline">
              {d.heroTitle[0]}
              <br />
              <span className="ml-[0.6em] inline-block">{d.heroTitle[1]}</span>
            </span>
          </>
        }
        lead={d.heroLead}
      />

      <section className="bg-parchment/50 backdrop-blur-md pb-24 pt-10 sm:pb-32 sm:pt-14">
        <div className="mx-auto grid max-w-6xl gap-14 px-5 sm:px-8 md:grid-cols-[1.1fr_0.9fr] md:gap-20">
          <Reveal>
            <Eyebrow>{d.philEyebrow}</Eyebrow>
            <h2 className="mt-6 font-serif text-4xl leading-[1.1] text-ink sm:text-5xl">
              {d.philH2a}<span className="italic text-pine">{d.philH2b}</span>{d.philH2c}
            </h2>
            <div className="mt-8 space-y-6 font-sans text-[16px] leading-[1.85] text-ink/75">
              {d.pp.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="relative sm:pb-12">
              <CatPortrait coat={{ from: '#5b6152', to: '#23271f' }} alt="Кот питомника Summer Cherry" src={aboutSrc} className="aspect-[4/5] w-full" />
              <div className="absolute -bottom-6 -left-6 hidden bg-pinedeep p-6 text-parchment sm:block">
                <PineMark className="h-6 w-6 text-gold" />
                <p className="mt-3 max-w-[180px] font-serif text-lg italic leading-snug">{d.quote}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-birch/45 backdrop-blur-md py-16">
        <div className="mx-auto grid max-w-5xl gap-10 px-5 sm:grid-cols-3 sm:px-8">
          {d.features.map((f, i) => {
            const Icon = featureIcons[i]
            return (
              <Reveal key={i} delay={i * 0.08}>
                <div className="flex items-start gap-4">
                  <Icon className="h-7 w-7 shrink-0 text-golddim" strokeWidth={1.4} />
                  <div>
                    <p className="eyebrow text-golddim">{f.t}</p>
                    <p className="mt-2 font-serif text-xl text-ink">{f.d}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      <section className="bg-parchment/50 backdrop-blur-md py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <Reveal className="text-center">
            <Eyebrow>{d.pathEyebrow}</Eyebrow>
            <h2 className="mt-5 font-serif text-4xl text-ink sm:text-5xl">{d.pathH2}</h2>
          </Reveal>
          <div className="relative mt-16 border-l border-ink/15 pl-8 sm:pl-12">
            {d.timeline.map((t, i) => (
              <Reveal key={t.year} delay={i * 0.06}>
                <div className="relative pb-14 last:pb-0">
                  <span className="absolute -left-[41px] top-1 flex h-4 w-4 items-center justify-center sm:-left-[57px]">
                    <span className="h-3 w-3 rounded-full bg-pine ring-4 ring-parchment" />
                  </span>
                  <span className="font-display text-3xl text-golddim">{t.year}</span>
                  <h3 className="mt-2 font-serif text-2xl text-ink">{t.title}</h3>
                  <p className="mt-2 max-w-xl font-sans text-[15px] leading-relaxed text-ink/70">{t.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Divider className="mt-8" />
        </div>
      </section>
    </>
  )
}
