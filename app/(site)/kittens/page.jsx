import PageHero from '@/components/PageHero'
import KittensGrid from '@/components/KittensGrid'
import { Reveal, Eyebrow, Divider } from '@/components/ui'
import { getKittens } from '@/lib/api'
import { urlForImageCrop } from '@/sanity/image'

export const metadata = { title: 'Котята — Summer Cherry' }
export const revalidate = 60

export default async function KittensPage() {
  const kittens = await getKittens()
  const items = kittens.map((k) => ({
    _id: k._id,
    slug: k.slug,
    name: k.name,
    color: k.color,
    sex: k.sex,
    born: k.born,
    litter: (k.litter || '').replace('Помёт ', ''),
    status: k.status,
    coat: k.coat || null,
    src: k.images?.[0] ? urlForImageCrop(k.images[0], 640, 800) : null,
  }))

  return (
    <>
      <PageHero eyebrow="Котята" title="Малыши" lead="Котята Summer Cherry уезжают в новый дом с полным пакетом документов, привитыми и социализированными." />

      <section className="bg-parchment/50 backdrop-blur-md pb-20 pt-4 sm:pb-28 sm:pt-5">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <KittensGrid items={items} />
        </div>
      </section>

      <section className="bg-birch/45 backdrop-blur-md py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <Reveal>
            <Eyebrow>Как забрать котёнка</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl text-ink sm:text-4xl">Простой и честный путь домой</h2>
          </Reveal>
          <div className="mt-14 grid gap-10 sm:grid-cols-3">
            {[
              { n: '01', t: 'Знакомство', d: 'Пишете нам, рассказываете о себе, выбираете котёнка по фото и видео.' },
              { n: '02', t: 'Бронь', d: 'Резервируем малыша задатком. Присылаем регулярные обновления о его росте.' },
              { n: '03', t: 'Переезд', d: 'В 12–13 недель котёнок готов к переезду — лично или проверенной перевозкой.' },
            ].map((step, i) => (
              <Reveal key={step.n} delay={i * 0.08}>
                <div>
                  <span className="font-display text-5xl text-golddim/70">{step.n}</span>
                  <h3 className="mt-4 font-serif text-2xl text-ink">{step.t}</h3>
                  <p className="mt-3 font-sans text-[14px] leading-relaxed text-ink/65">{step.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Divider className="mt-16" />
        </div>
      </section>
    </>
  )
}
