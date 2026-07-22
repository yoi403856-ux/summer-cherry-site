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
      options: { source: 'name', maxLength: 60 },
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
