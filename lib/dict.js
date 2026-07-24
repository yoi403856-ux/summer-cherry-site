// All user-facing UI strings in both languages.
// CMS content (kitten/stud data) is translated separately via English
// override fields in Sanity (see pick() / sexLabel() / roleLabel()).

export const T = {
  ru: {
    nav: { home: 'Главная', about: 'О нас', kittens: 'Котята', studs: 'Производители', contact: 'Связаться' },

    footer: {
      blurb: 'Питомник мейн-кунов родом из туманного северного леса. Крупные, статные, с характером — и всегда с родословной.',
      sections: 'Разделы',
      contacts: 'Контакты',
      rights: 'Питомник мейн-кунов',
      standard: 'Разведение по стандарту WCF',
    },

    home: {
      eyebrow: 'Питомник мейн-кунов · с 2014 года',
      lead: 'Крупные кошки родом из туманного хвойного леса — со статью рыси и характером домашнего компаньона.',
      ourKittens: 'Наши котята',
      history: 'История питомника',
      aboutEyebrow: 'О питомнике',
      aboutH2a: 'Мы растим не породу — ',
      aboutH2b: 'характер',
      p1: 'ummer Cherry — небольшой семейный питомник, где каждый котёнок растёт в доме, среди людей и запаха сосновой хвои. Мы не гонимся за количеством: за год у нас всего несколько тщательно спланированных помётов.',
      p2: 'Все производители проверены на HCM, PKD и генетические заболевания. Котята уезжают привитыми, приучёнными к лотку и когтеточке, с ветеринарным паспортом и родословной WCF.',
      p3: 'Каждый наш кун — это дикая красота северного леса, приручённая любовью и терпением.',
      stats: [
        { n: '10', l: 'лет в породе' },
        { n: '40+', l: 'выращенных котят' },
        { n: '12', l: 'титулов WCF' },
        { n: '7', l: 'стран прописки' },
      ],
      residentsEyebrow: 'Обитатели леса',
      residentsH2: 'Наши кошки',
      allStuds: 'Все производители',
      whyEyebrow: 'Почему Summer Cherry',
      whyH2: 'Четыре обещания каждому котёнку',
      values: [
        { t: 'Здоровье', d: 'Генетические тесты, УЗИ сердца родителей и полная вакцинация.' },
        { t: 'Социализация', d: 'Растём в доме, среди детей, звуков и рук — не в вольере.' },
        { t: 'Родословная', d: 'Документы WCF и линии чемпионов Европы в каждом помёте.' },
        { t: 'Сопровождение', d: 'Консультации по кормлению и уходу на всю жизнь кота.' },
      ],
      quote: '«Мейн-кун не занимает место в доме. Он занимает место в жизни — и остаётся там навсегда.»',
      quoteBy: 'Питомник Summer Cherry',
      ctaH2a: 'Ищете своего ',
      ctaH2b: 'лесного',
      ctaH2c: ' компаньона?',
      ctaLead: 'Расскажите, о каком коте вы мечтаете — и мы подберём котёнка, который станет частью вашей семьи.',
      ctaKittens: 'Смотреть котят',
      ctaWrite: 'Написать нам',
    },

    about: {
      heroTitle: ['Из тумана', 'хвойного леса'],
      heroLead: 'Семейный питомник, где кошки живут в доме, а не в вольерах.',
      philEyebrow: 'Наша философия',
      philH2a: 'Дикая красота, ',
      philH2b: 'прирученная',
      philH2c: ' заботой',
      pp: [
        'Summer Cherry вырос из простой мечты — жить рядом с кошками, напоминающими маленьких рысей. Мейн-кун оказался именно таким: крупный, лохматый, с кисточками на ушах и удивительно мягким, почти собачьим характером.',
        'Мы намеренно остаёмся маленькими. Несколько помётов в год — это возможность вложить в каждого котёнка максимум времени, тепла и внимания.',
        'Наша цель — не только породность и титулы, но и здоровье линий на десятилетия вперёд.',
      ],
      quote: '«Кошка, которая смотрит на тебя как равная.»',
      features: [
        { t: 'Локация', d: 'Северо-запад России · доставка по миру' },
        { t: 'Опыт', d: '10 лет разведения мейн-кунов' },
        { t: 'Стандарт', d: 'Разведение и родословные WCF' },
      ],
      pathEyebrow: 'Наш путь',
      pathH2: 'Хроника питомника',
      timeline: [
        { year: '2014', title: 'Первый кун', text: 'Всё началось с одного котёнка из Финляндии — и любви, которая переросла в дело жизни.' },
        { year: '2017', title: 'Регистрация питомника', text: 'Summer Cherry получает официальный статус и приставку в системе WCF.' },
        { year: '2020', title: 'Первые чемпионы', text: 'Наши производители берут титулы Champion и Grand Champion на выставках Европы.' },
        { year: '2026', title: 'Сегодня', text: 'Небольшой домашний питомник с проверенными линиями и котятами по всему миру.' },
      ],
    },

    kittens: {
      heroEyebrow: 'Котята',
      heroTitle: 'Малыши',
      heroLead: 'Котята Summer Cherry уезжают в новый дом с полным пакетом документов, привитыми и социализированными.',
      filters: { all: 'Все', available: 'Свободны', reserved: 'Резерв', sold: 'В новых домах' },
      count: (n) => `${n} ${n === 1 ? 'котёнок' : 'котят'}`,
      color: 'Окрас',
      polydactyl: 'Полидактилия',
      born: 'Дата рождения',
      litter: 'Помёт',
      more: 'Узнать подробнее',
      howEyebrow: 'Как забрать котёнка',
      howH2: 'Простой и честный путь домой',
      steps: [
        { n: '01', t: 'Знакомство', d: 'Пишете нам, рассказываете о себе, выбираете котёнка по фото и видео.' },
        { n: '02', t: 'Бронь', d: 'Резервируем малыша задатком. Присылаем регулярные обновления о его росте.' },
        { n: '03', t: 'Переезд', d: 'В 12–13 недель котёнок готов к переезду — лично или проверенной перевозкой.' },
      ],
    },

    kittenDetail: {
      back: 'Все котята',
      litterOf: (n) => `Помёт «${n}»`,
      kitten: 'Котёнок',
      color: 'Окрас',
      polydactyl: 'Полидактилия',
      sex: 'Пол',
      born: 'Дата рождения',
      checklist: ['Привит по возрасту', 'Приучён к лотку и когтеточке', 'Ветпаспорт и родословная WCF', 'Договор купли-продажи'],
      book: 'Забронировать',
      cattery: 'Питомник Summer Cherry',
      parentsHint: 'Родители ниже',
      pedigree: 'Родословная',
      parents: 'Родители',
      father: 'Отец',
      mother: 'Мать',
    },

    studs: {
      heroEyebrow: 'Производители',
      heroTitle: 'Наши линии',
      heroLead: 'Проверенные, титулованные и здоровые кошки — основа каждого помёта Summer Cherry.',
      color: 'Окрас',
      polydactyl: 'Полидактилия',
      weight: 'Вес',
      titles: 'Титулы',
      health: 'Здоровье',
      profile: 'Смотреть профиль',
      respEyebrow: 'Ответственное разведение',
      respText: 'Все производители ежегодно проходят УЗИ сердца и генетические тесты. Мы не вяжем носителей наследственных заболеваний — это наш принцип, а не формальность.',
    },

    studDetail: {
      back: 'Все производители',
      color: 'Окрас',
      polydactyl: 'Полидактилия',
      weight: 'Вес',
      titles: 'Титулы',
      health: 'Здоровье',
      contact: 'Связаться с питомником',
      cattery: 'Питомник Summer Cherry',
      offspringHint: 'Котята ниже',
      offspringEyebrow: 'Потомство',
      offspring: 'Котята',
    },
  },

  en: {
    nav: { home: 'Home', about: 'About', kittens: 'Kittens', studs: 'Our Cats', contact: 'Contact' },

    footer: {
      blurb: 'A Maine Coon cattery born of the misty northern forest. Large, stately, full of character — and always pedigreed.',
      sections: 'Pages',
      contacts: 'Contacts',
      rights: 'Maine Coon Cattery',
      standard: 'Bred to the WCF standard',
    },

    home: {
      eyebrow: 'Maine Coon Cattery · since 2014',
      lead: 'Large cats born of the misty coniferous forest — with the stature of a lynx and the temperament of a home companion.',
      ourKittens: 'Our Kittens',
      history: 'Our Story',
      aboutEyebrow: 'About the cattery',
      aboutH2a: 'We raise not a breed — but ',
      aboutH2b: 'character',
      p1: 'ummer Cherry is a small family cattery where every kitten grows up in the home, among people and the scent of pine. We don’t chase numbers: only a few carefully planned litters a year.',
      p2: 'Every breeding cat is tested for HCM, PKD and genetic conditions. Kittens leave vaccinated, litter- and scratch-post-trained, with a veterinary passport and a WCF pedigree.',
      p3: 'Each of our Coons is the wild beauty of the northern forest, tamed with love and patience.',
      stats: [
        { n: '10', l: 'years in the breed' },
        { n: '40+', l: 'kittens raised' },
        { n: '12', l: 'WCF titles' },
        { n: '7', l: 'countries of residence' },
      ],
      residentsEyebrow: 'Dwellers of the forest',
      residentsH2: 'Our Cats',
      allStuds: 'All breeding cats',
      whyEyebrow: 'Why Summer Cherry',
      whyH2: 'Four promises to every kitten',
      values: [
        { t: 'Health', d: 'Genetic testing, parents’ heart ultrasound and full vaccination.' },
        { t: 'Socialisation', d: 'Raised in the home — among children, sounds and hands, not in a pen.' },
        { t: 'Pedigree', d: 'WCF papers and lines of European champions in every litter.' },
        { t: 'Support', d: 'Feeding and care guidance for the cat’s whole life.' },
      ],
      quote: '“A Maine Coon doesn’t take up space in your home. It takes up space in your life — and stays there forever.”',
      quoteBy: 'Summer Cherry Cattery',
      ctaH2a: 'Looking for your ',
      ctaH2b: 'forest',
      ctaH2c: ' companion?',
      ctaLead: 'Tell us about the cat you dream of — and we’ll match you with a kitten who becomes part of your family.',
      ctaKittens: 'See kittens',
      ctaWrite: 'Write to us',
    },

    about: {
      heroTitle: ['Out of the mist', 'of the pine forest'],
      heroLead: 'A family cattery where cats live in the home, not in pens.',
      philEyebrow: 'Our philosophy',
      philH2a: 'Wild beauty, ',
      philH2b: 'tamed',
      philH2c: ' with care',
      pp: [
        'Summer Cherry grew out of a simple dream — to live alongside cats that look like little lynxes. The Maine Coon turned out to be exactly that: large, shaggy, with lynx-tipped ears and a wonderfully soft, almost dog-like character.',
        'We deliberately stay small. A few litters a year means we can give each kitten the maximum of time, warmth and attention.',
        'Our goal is not only pedigree and titles, but the health of the lines for decades to come.',
      ],
      quote: '“A cat that looks at you as an equal.”',
      features: [
        { t: 'Location', d: 'North-west Russia · worldwide delivery' },
        { t: 'Experience', d: '10 years of breeding Maine Coons' },
        { t: 'Standard', d: 'WCF breeding and pedigrees' },
      ],
      pathEyebrow: 'Our journey',
      pathH2: 'Cattery timeline',
      timeline: [
        { year: '2014', title: 'The first Coon', text: 'It all began with a single kitten from Finland — and a love that grew into a life’s work.' },
        { year: '2017', title: 'Cattery registered', text: 'Summer Cherry receives official status and a prefix in the WCF system.' },
        { year: '2020', title: 'First champions', text: 'Our breeding cats earn Champion and Grand Champion titles at European shows.' },
        { year: '2026', title: 'Today', text: 'A small home cattery with proven lines and kittens all over the world.' },
      ],
    },

    kittens: {
      heroEyebrow: 'Kittens',
      heroTitle: 'The Little Ones',
      heroLead: 'Summer Cherry kittens go to their new home fully documented, vaccinated and socialised.',
      filters: { all: 'All', available: 'Available', reserved: 'Reserved', sold: 'In new homes' },
      count: (n) => `${n} ${n === 1 ? 'kitten' : 'kittens'}`,
      color: 'Colour',
      polydactyl: 'Polydactyly',
      born: 'Date of birth',
      litter: 'Litter',
      more: 'Learn more',
      howEyebrow: 'How to bring a kitten home',
      howH2: 'A simple, honest way home',
      steps: [
        { n: '01', t: 'Get acquainted', d: 'Write to us, tell us about yourself, choose a kitten from photos and video.' },
        { n: '02', t: 'Reserve', d: 'We reserve the kitten with a deposit and send you regular updates as it grows.' },
        { n: '03', t: 'Coming home', d: 'At 12–13 weeks the kitten is ready to travel — in person or by trusted transport.' },
      ],
    },

    kittenDetail: {
      back: 'All kittens',
      litterOf: (n) => `Litter “${n}”`,
      kitten: 'Kitten',
      color: 'Colour',
      polydactyl: 'Polydactyly',
      sex: 'Sex',
      born: 'Date of birth',
      checklist: ['Vaccinated for age', 'Litter- and scratch-post-trained', 'Vet passport and WCF pedigree', 'Sale contract'],
      book: 'Reserve',
      cattery: 'Summer Cherry Cattery',
      parentsHint: 'Parents below',
      pedigree: 'Pedigree',
      parents: 'Parents',
      father: 'Father',
      mother: 'Mother',
    },

    studs: {
      heroEyebrow: 'Our Cats',
      heroTitle: 'Our Lines',
      heroLead: 'Proven, titled and healthy cats — the foundation of every Summer Cherry litter.',
      color: 'Colour',
      polydactyl: 'Polydactyly',
      weight: 'Weight',
      titles: 'Titles',
      health: 'Health',
      profile: 'View profile',
      respEyebrow: 'Responsible breeding',
      respText: 'Every breeding cat has an annual heart ultrasound and genetic testing. We never breed carriers of hereditary disease — that is our principle, not a formality.',
    },

    studDetail: {
      back: 'All cats',
      color: 'Colour',
      polydactyl: 'Polydactyly',
      weight: 'Weight',
      titles: 'Titles',
      health: 'Health',
      contact: 'Contact the cattery',
      cattery: 'Summer Cherry Cattery',
      offspringHint: 'Kittens below',
      offspringEyebrow: 'Offspring',
      offspring: 'Kittens',
    },
  },
}

// value-mappings for enum-like CMS fields
export function sexLabel(locale, v) {
  if (locale === 'en') return { 'Кот': 'Male', 'Кошка': 'Female' }[v] || v
  return v
}
export function roleLabel(locale, v) {
  if (locale === 'en') return { 'Производитель': 'Sire', 'Производительница': 'Dam' }[v] || v
  return v
}
export const statusMap = {
  ru: {
    available: { label: 'Свободен', cls: 'bg-pine text-parchment' },
    reserved: { label: 'Резерв', cls: 'bg-golddim text-ink' },
    sold: { label: 'В новом доме', cls: 'bg-ink/70 text-parchment' },
  },
  en: {
    available: { label: 'Available', cls: 'bg-pine text-parchment' },
    reserved: { label: 'Reserved', cls: 'bg-golddim text-ink' },
    sold: { label: 'In a new home', cls: 'bg-ink/70 text-parchment' },
  },
}

// pick an English override CMS value, falling back to the Russian one
export function pick(locale, ru, en) {
  return locale === 'en' && en ? en : ru
}

// same, for array fields (an empty English list falls back to Russian)
export function pickList(locale, ru, en) {
  return locale === 'en' && en?.length ? en : ru
}

export const dateLocale = { ru: 'ru-RU', en: 'en-GB' }
