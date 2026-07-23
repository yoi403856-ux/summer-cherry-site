import { CalendarDays, MapPin, Sparkles } from 'lucide-react'
import PageHero from '@/components/PageHero'
import CatPortrait from '@/components/CatPortrait'
import { Reveal, Eyebrow, Divider, PineMark } from '@/components/ui'
import { getSettings } from '@/lib/api'
import { urlForImageCrop } from '@/sanity/image'

export const metadata = { title: 'О нас — Summer Cherry' }
export const revalidate = 60

const timeline = [
  { year: '2014', title: 'Первый кун', text: 'Всё началось с одного котёнка из Финляндии — и любви, которая переросла в дело жизни.' },
  { year: '2017', title: 'Регистрация питомника', text: 'Summer Cherry получает официальный статус и приставку в системе WCF.' },
  { year: '2020', title: 'Первые чемпионы', text: 'Наши производители берут титулы Champion и Grand Champion на выставках Европы.' },
  { year: '2026', title: 'Сегодня', text: 'Небольшой домашний питомник с проверенными линиями и котятами по всему миру.' },
]

export default async function About() {
  const settings = await getSettings()
  const aboutSrc = settings?.aboutPhoto ? urlForImageCrop(settings.aboutPhoto, 800, 1000) : null

  return (
    <>
      <PageHero eyebrow="О нас" title={<>Из тумана<br />хвойного леса</>} lead="Семейный питомник, где кошки живут в доме, а не в вольерах." />

      <section className="bg-parchment/50 backdrop-blur-md pb-24 pt-10 sm:pb-32 sm:pt-14">
        <div className="mx-auto grid max-w-6xl gap-14 px-5 sm:px-8 md:grid-cols-[1.1fr_0.9fr] md:gap-20">
          <Reveal>
            <Eyebrow>Наша философия</Eyebrow>
            <h2 className="mt-6 font-serif text-4xl leading-[1.1] text-ink sm:text-5xl">
              Дикая красота, <span className="italic text-pine">прирученная</span> заботой
            </h2>
            <div className="mt-8 space-y-6 font-sans text-[16px] leading-[1.85] text-ink/75">
              <p>
                Summer Cherry вырос из простой мечты — жить рядом с кошками,
                напоминающими маленьких рысей. Мейн-кун оказался именно таким:
                крупный, лохматый, с кисточками на ушах и удивительно мягким,
                почти собачьим характером.
              </p>
              <p>
                Мы намеренно остаёмся маленькими. Несколько помётов в год —
                это возможность вложить в каждого котёнка максимум времени,
                тепла и внимания.
              </p>
              <p>
                Наша цель — не только породность и титулы, но и здоровье
                линий на десятилетия вперёд.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="relative sm:pb-12">
              <CatPortrait coat={{ from: '#5b6152', to: '#23271f' }} alt="Кот питомника Summer Cherry" src={aboutSrc} className="aspect-[4/5] w-full" />
              <div className="absolute -bottom-6 -left-6 hidden bg-pinedeep p-6 text-parchment sm:block">
                <PineMark className="h-6 w-6 text-gold" />
                <p className="mt-3 max-w-[180px] font-serif text-lg italic leading-snug">«Кошка, которая смотрит на тебя как равная.»</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-birch/45 backdrop-blur-md py-16">
        <div className="mx-auto grid max-w-5xl gap-10 px-5 sm:grid-cols-3 sm:px-8">
          {[
            { icon: MapPin, t: 'Локация', d: 'Северо-запад России · доставка по миру' },
            { icon: CalendarDays, t: 'Опыт', d: '10 лет разведения мейн-кунов' },
            { icon: Sparkles, t: 'Стандарт', d: 'Разведение и родословные WCF' },
          ].map((f, i) => (
            <Reveal key={f.t} delay={i * 0.08}>
              <div className="flex items-start gap-4">
                <f.icon className="h-7 w-7 shrink-0 text-golddim" strokeWidth={1.4} />
                <div>
                  <p className="eyebrow text-golddim">{f.t}</p>
                  <p className="mt-2 font-serif text-xl text-ink">{f.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-parchment/50 backdrop-blur-md py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <Reveal className="text-center">
            <Eyebrow>Наш путь</Eyebrow>
            <h2 className="mt-5 font-serif text-4xl text-ink sm:text-5xl">Хроника питомника</h2>
          </Reveal>
          <div className="relative mt-16 border-l border-ink/15 pl-8 sm:pl-12">
            {timeline.map((t, i) => (
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
