export const siteSettings = {
  name: 'siteSettings',
  title: 'Настройки сайта',
  type: 'document',
  fields: [
    { name: 'phone', title: 'Телефон', type: 'string' },
    { name: 'telegram', title: 'Telegram (ссылка)', type: 'url' },
    { name: 'whatsapp', title: 'WhatsApp (ссылка)', type: 'url' },
    { name: 'email', title: 'E-mail', type: 'string' },
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
  ],
  preview: { prepare: () => ({ title: 'Настройки сайта' }) },
}
