const RU = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z',
  и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r',
  с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'c', ч: 'ch', ш: 'sh', щ: 'sch',
  ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya',
}
export function slugify(input) {
  return input
    .toLowerCase()
    .split('')
    .map((ch) => (ch in RU ? RU[ch] : ch))
    .join('')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
}

export const kitten = {
  name: 'kitten',
  title: 'Котёнок',
  type: 'document',
  fields: [
    { name: 'name', title: 'Кличка', type: 'string', validation: (r) => r.required() },
    {
      name: 'slug',
      title: 'Адрес страницы (slug)',
      type: 'slug',
      options: { source: 'name', maxLength: 60, slugify },
      validation: (r) => r.required(),
    },
    { name: 'litter', title: 'Помёт', type: 'string' },
    { name: 'color', title: 'Окрас', type: 'string' },
    {
      name: 'sex',
      title: 'Пол',
      type: 'string',
      options: { list: ['Кот', 'Кошка'], layout: 'radio' },
    },
    { name: 'born', title: 'Дата рождения', type: 'date' },
    {
      name: 'status',
      title: 'Статус',
      type: 'string',
      initialValue: 'available',
      options: {
        list: [
          { title: 'Свободен', value: 'available' },
          { title: 'Резерв', value: 'reserved' },
          { title: 'Продан', value: 'sold' },
        ],
        layout: 'radio',
      },
    },
    { name: 'price', title: 'Стоимость (текст)', type: 'string' },
    { name: 'description', title: 'Описание', type: 'text', rows: 4 },
    { name: 'father', title: 'Отец', type: 'reference', to: [{ type: 'stud' }] },
    { name: 'mother', title: 'Мать', type: 'reference', to: [{ type: 'stud' }] },
    {
      name: 'images',
      title: 'Фотографии',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
    { name: 'order', title: 'Порядок сортировки', type: 'number', initialValue: 0 },
  ],
  preview: {
    select: { title: 'name', subtitle: 'color', media: 'images.0' },
  },
}
