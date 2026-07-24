// Singleton "page text" documents open directly instead of showing a list
// with a "create new" button — there is only ever one of each.
const singleton = (S, id, title) =>
  S.listItem().title(title).id(id).child(S.document().schemaType(id).documentId(id))

export const structure = (S) =>
  S.list()
    .title('Summer Cherry')
    .items([
      S.listItem().title('Котёнок').schemaType('kitten').child(S.documentTypeList('kitten').title('Котята')),
      S.listItem().title('Производитель').schemaType('stud').child(S.documentTypeList('stud').title('Производители')),
      S.divider(),
      singleton(S, 'siteSettings', 'Настройки сайта'),
      S.divider(),
      singleton(S, 'homeContent', 'Тексты: Главная'),
      singleton(S, 'aboutContent', 'Тексты: О нас'),
      singleton(S, 'kittensContent', 'Тексты: Котята'),
      singleton(S, 'studsContent', 'Тексты: Производители'),
    ])
