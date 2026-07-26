import { slugify } from './kitten'

export const stud = {
  name: 'stud',
  title: 'Производитель',
  type: 'document',
  fields: [
    { name: 'name', title: 'Полное имя (с приставкой)', type: 'string', validation: (r) => r.required() },
    { name: 'nameEn', title: 'Полное имя (English)', type: 'string' },
    { name: 'call', title: 'Домашняя кличка', type: 'string' },
    { name: 'callEn', title: 'Домашняя кличка (English)', type: 'string' },
    {
      name: 'slug',
      title: 'Адрес страницы (slug)',
      type: 'slug',
      options: { source: 'call', maxLength: 60, slugify },
    },
    {
      name: 'role',
      title: 'Роль',
      type: 'string',
      options: {
        list: [
          { title: 'Производитель', value: 'Производитель' },
          { title: 'Производительница', value: 'Производительница' },
        ],
        layout: 'radio',
      },
    },
    { name: 'color', title: 'Окрас', type: 'string' },
    { name: 'colorEn', title: 'Окрас (English)', type: 'string' },
    { name: 'polydactyl', title: 'Полидактилия', type: 'string', description: 'Оставьте пустым, если не применимо — тогда поле не появится на карточке' },
    { name: 'polydactylEn', title: 'Полидактилия (English)', type: 'string' },
    { name: 'weight', title: 'Вес', type: 'string' },
    { name: 'weightEn', title: 'Вес (English)', type: 'string' },
    { name: 'titles', title: 'Титулы', type: 'string' },
    { name: 'titlesEn', title: 'Титулы (English)', type: 'string' },
    {
      name: 'tests',
      title: 'Тесты здоровья',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'testsEn',
      title: 'Тесты здоровья (English)',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'images',
      title: 'Фотографии',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
    { name: 'order', title: 'Порядок сортировки', type: 'number', initialValue: 0 },
  ],
  preview: {
    select: { title: 'call', subtitle: 'role', media: 'images.0' },
  },
}
