const bilingual = (name, title, type = 'string', extra = {}) => [
  { name, title: `${title}`, type, ...extra },
  { name: `${name}En`, title: `${title} (English)`, type, ...extra },
]

export const studsContent = {
  name: 'studsContent',
  title: 'Тексты: Производители',
  type: 'document',
  fields: [
    ...bilingual('heroEyebrow', 'Надпись над заголовком'),
    ...bilingual('heroTitle', 'Заголовок страницы'),
    ...bilingual('heroLead', 'Подзаголовок', 'text', { rows: 2 }),

    ...bilingual('respEyebrow', 'Блок «Ответственное разведение» — надпись'),
    ...bilingual('respText', 'Блок «Ответственное разведение» — текст', 'text', { rows: 3 }),
  ],
  preview: { prepare: () => ({ title: 'Тексты: Производители' }) },
}
