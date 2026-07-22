import Link from 'next/link'
import { ArrowRight, ShieldCheck, HeartHandshake, Trees, Award } from 'lucide-react'
import CatPortrait from '@/components/CatPortrait'
import HeroMosaic from '@/components/HeroMosaic'
import { Reveal, Eyebrow, Divider, PineMark } from '@/components/ui'
import { getStuds, getSettings } from '@/lib/api'
import { getLocalHeroImages } from '@/lib/heroImages'
import { urlForImage } from '@/sanity/image'

export default async function Home() {
  const [studs, settings] = await Promise.all([getStuds(), getSettings()])
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
            <p className="eyebrow text-golddim">Питомник мейн-кунов · с 2014 года</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-5 text-center font-display text-[15vw] leading-[0.88] tracking-[0.03em] text-ink sm:text-[11vw] md:text-[104px]">
              Summer Cherry
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-xl text-center font-serif text-xl italic leading-relaxed text-ink/70 sm:text-2xl">
              Крупные кошки родом из туманного хвойного леса — со статью рыси
              и характером домашнего компаньона.
            </p>
          </Reveal>

          <HeroMosaic images={heroImages} />

          <Reveal delay={0.2}>
            <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
              <Link
                href="/kittens"
                className="group inline-flex items-center gap-3 bg-ink px-8 py-4 font-sans text-[13px] uppercase tracking-[0.24em] text-parchment transition-colors duration-300 hover:bg-pine"
              >
                Наши котята
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link href="/about" className="link-underline font-sans text-[13px] uppercase tracking-[0.24em] text-ink/80">
                История питомника
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─────────── MANIFESTO ─────────── */}
      <section className="relative bg-parchment/50 backdrop-blur-md py-24 sm:py-36">
        <div className="mx-auto grid max-w-6xl gap-14 px-5 sm:px-8 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
          <Reveal>
            <Eyebrow>О питомнике</Eyebrow>
            <h2 className="mt-6 font-serif text-4xl leading-[1.08] text-ink sm:text-5xl">
              Мы растим не породу — <span className="italic text-pine">характер</span>.
            </h2>
            <PineMark className="mt-8 h-8 w-8 text-golddim/70" />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-6 font-sans text-[16px] leading-[1.85] text-ink/75">
              <p>
                <span className="float-left mr-3 font-display text-6xl leading-[0.7] text-pine">S</span>
                ummer Cherry — небольшой семейный питомник, где каждый котёнок
                растёт в доме, среди людей и запаха сосновой хвои. Мы не гонимся
                за количеством: за год у нас всего несколько тщательно
                спланированных помётов.
              </p>
              <p>
                Все производители проверены на HCM, PKD и генетические
                заболевания. Котята уезжают привитыми, приучёнными к лотку и
                когтеточке, с ветеринарным паспортом и родословной WCF.
              </p>
              <p className="border-l-2 border-golddim/60 pl-5 font-serif text-xl italic text-ink/85">
                Каждый наш кун — это дикая красота северного леса, приручённая
                любовью и терпением.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─────────── STATS ─────────── */}
      <section className="border-y border-ink/10 bg-birch/45 backdrop-blur-md">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-ink/10 px-5 sm:px-8 md:grid-cols-4">
          {[
            { n: '10', l: 'лет в породе' },
            { n: '40+', l: 'выращенных котят' },
            { n: '12', l: 'титулов WCF' },
            { n: '7', l: 'стран прописки' },
          ].map((s, i) => (
            <Reveal key={s.l} delay={i * 0.08}>
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
              <Eyebrow>Обитатели леса</Eyebrow>
              <h2 className="mt-5 font-serif text-4xl leading-tight text-ink sm:text-5xl">Наши кошки</h2>
            </div>
            <Link href="/studs" className="group inline-flex items-center gap-2 font-sans text-[13px] uppercase tracking-[0.24em] text-ink/70 transition-colors hover:text-ink">
              Все производители
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {studs.slice(0, 4).map((c, i) => {
              const src = c.images?.[0] ? urlForImage(c.images[0], 700) : null
              return (
                <Reveal key={c._id} delay={i * 0.08}>
                  <article className="group cursor-pointer">
                    <CatPortrait coat={c.coat} alt={c.name} src={src} className="aspect-[3/4] w-full" />
                    <div className="mt-4">
                      <p className="eyebrow text-golddim">{c.role}</p>
                      <h3 className="mt-1.5 font-serif text-2xl text-ink">{c.call}</h3>
                      <p className="mt-1 font-sans text-[13px] tracking-wide text-ink/55">{c.color}</p>
                    </div>
                  </article>
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
            <Eyebrow>Почему Summer Cherry</Eyebrow>
            <h2 className="mx-auto mt-5 max-w-2xl font-serif text-4xl leading-tight text-ink sm:text-5xl">
              Четыре обещания каждому котёнку
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-px overflow-hidden border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: ShieldCheck, t: 'Здоровье', d: 'Генетические тесты, УЗИ сердца родителей и полная вакцинация.' },
              { icon: HeartHandshake, t: 'Социализация', d: 'Растём в доме, среди детей, звуков и рук — не в вольере.' },
              { icon: Award, t: 'Родословная', d: 'Документы WCF и линии чемпионов Европы в каждом помёте.' },
              { icon: Trees, t: 'Сопровождение', d: 'Консультации по кормлению и уходу на всю жизнь кота.' },
            ].map((v, i) => (
              <Reveal key={v.t} delay={i * 0.07}>
                <div className="group h-full bg-parchment/70 backdrop-blur-md p-8 transition-colors duration-500 hover:bg-pinedeep">
                  <v.icon className="h-8 w-8 text-golddim transition-colors duration-500 group-hover:text-gold" strokeWidth={1.4} />
                  <h3 className="mt-6 font-serif text-2xl text-ink transition-colors duration-500 group-hover:text-parchment">{v.t}</h3>
                  <p className="mt-3 font-sans text-[14px] leading-relaxed text-ink/65 transition-colors duration-500 group-hover:text-birch/75">{v.d}</p>
                </div>
              </Reveal>
            ))}
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
            <p className="mt-8 font-serif text-3xl italic leading-[1.35] text-birch sm:text-[42px]">
              «Мейн-кун не занимает место в доме. Он занимает место в жизни —
              и остаётся там навсегда.»
            </p>
            <p className="mt-8 eyebrow text-gold">Питомник Summer Cherry</p>
          </Reveal>
        </div>
      </section>

      {/* ─────────── CTA ─────────── */}
      <section className="bg-parchment/50 backdrop-blur-md py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <Reveal>
            <Divider className="mb-10" />
            <h2 className="font-serif text-4xl leading-tight text-ink sm:text-6xl">
              Ищете своего <span className="italic text-pine">лесного</span> компаньона?
            </h2>
            <p className="mx-auto mt-6 max-w-xl font-sans text-[16px] leading-relaxed text-ink/70">
              Расскажите, о каком коте вы мечтаете — и мы подберём котёнка,
              который станет частью вашей семьи.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/kittens" className="group inline-flex items-center gap-3 bg-ink px-8 py-4 font-sans text-[13px] uppercase tracking-[0.24em] text-parchment transition-colors duration-300 hover:bg-pine">
                Смотреть котят
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <a href="#contact" className="border border-ink/25 px-8 py-4 font-sans text-[13px] uppercase tracking-[0.24em] text-ink transition-colors duration-300 hover:bg-ink hover:text-parchment">
                Написать нам
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
