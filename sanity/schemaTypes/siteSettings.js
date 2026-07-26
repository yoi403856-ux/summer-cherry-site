const bilingual = (name, title, type = 'string', extra = {}) => [
  { name, title: `${title}`, type, ...extra },
  { name: `${name}En`, title: `${title} (English)`, type, ...extra },
]

export const siteSettings = {
  name: 'siteSettings',
  title: 'Настройки сайта',
  type: 'document',
  fields: [
    { name: 'phone', title: 'Телефон', type: 'string' },
    { name: 'whatsapp', title: 'WhatsApp (ссылка)', type: 'url' },
    { name: 'facebook', title: 'Facebook (ссылка)', type: 'url' },
    { name: 'vk', title: 'ВКонтакте (ссылка)', type: 'url' },
    { name: 'email', title: 'E-mail', type: 'string' },

    ...bilingual('navHome', 'Меню — «Главная»'),
    ...bilingual('navAbout', 'Меню — «О нас»'),
    ...bilingual('navKittens', 'Меню — «Котята»'),
    ...bilingual('navStuds', 'Меню — «Производители»'),
    ...bilingual('navContact', 'Меню — кнопка «Связаться»'),

    ...bilingual('footerBlurb', 'Подвал — текст под логотипом', 'text', { rows: 3 }),

    {
      name: 'heroImages',
      title: 'Фото для мозаики на главной',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'forestBackground',
      title: 'Фоновое фото леса',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'aboutPhoto',
      title: 'Фото на странице «О нас»',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'ogImage',
      title: 'Превью для соцсетей и мессенджеров',
      description: 'Показывается, когда кто-то присылает ссылку на сайт в WhatsApp, Telegram и т.п. Рекомендуемый размер — 1200×630. Если не загружено, используется фото леса по умолчанию.',
      type: 'image',
      options: { hotspot: true },
    },
  ],
  preview: { prepare: () => ({ title: 'Настройки сайта' }) },
}
