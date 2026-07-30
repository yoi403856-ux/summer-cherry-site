# Graph Report - summer-cherry-site  (2026-07-29)

## Corpus Check
- 53 files · ~110,805 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 205 nodes · 247 edges · 31 communities (21 shown, 10 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.7)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `cfb7f4bf`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Зависимости npm
- Sanity: схемы контента
- UI-компоненты
- Инструменты сборки
- Кнопки связи и подвал
- API-запросы к Sanity
- Словарь переводов
- Sanity-клиент и изображения
- CMS-контент страниц
- Корневой layout
- Страница «О нас»
- Мозаика на главной
- Конфигурация путей
- Главная страница
- Галерея фото котёнка
- Шапка страницы
- Плавная прокрутка
- Контакты по умолчанию
- Конфиг Next.js
- sitemap.js
- middleware.js

## God Nodes (most connected - your core abstractions)
1. `safeFetch()` - 9 edges
2. `useLocale()` - 8 edges
3. `useDict()` - 8 edges
4. `WhatsApp()` - 5 edges
5. `Vk()` - 5 edges
6. `fetchDoc()` - 5 edges
7. `f()` - 5 edges
8. `scripts` - 5 edges
9. `ContactPopover()` - 4 edges
10. `mergeList()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `ContactPopover()` --indirect_call--> `Vk()`  [INFERRED]
  components/ContactPopover.jsx → components/icons.jsx
- `ContactPopover()` --indirect_call--> `WhatsApp()`  [INFERRED]
  components/ContactPopover.jsx → components/icons.jsx
- `ContactPopover()` --calls--> `useDict()`  [EXTRACTED]
  components/ContactPopover.jsx → components/LocaleProvider.jsx
- `Footer()` --indirect_call--> `Vk()`  [INFERRED]
  components/Footer.jsx → components/icons.jsx
- `Footer()` --indirect_call--> `WhatsApp()`  [INFERRED]
  components/Footer.jsx → components/icons.jsx

## Import Cycles
- None detected.

## Communities (31 total, 10 thin omitted)

### Community 0 - "Зависимости npm"
Cohesion: 0.08
Nodes (25): framer-motion, lucide-react, next, next-sanity, dependencies, framer-motion, lucide-react, next (+17 more)

### Community 1 - "Sanity: схемы контента"
Cohesion: 0.13
Nodes (9): aboutContent, homeContent, kitten, RU, slugify(), kittensContent, siteSettings, stud (+1 more)

### Community 2 - "UI-компоненты"
Cohesion: 0.20
Nodes (11): CatPortrait(), ContactLink(), smoothScrollTo(), filterKeys, KittensGrid(), LangToggle(), LocaleContext, useDict() (+3 more)

### Community 3 - "Инструменты сборки"
Cohesion: 0.12
Nodes (15): autoprefixer, devDependencies, autoprefixer, postcss, tailwindcss, name, private, scripts (+7 more)

### Community 4 - "Кнопки связи и подвал"
Cohesion: 0.24
Nodes (7): ContactPopover(), DEFAULTS, Footer(), Vk(), WhatsApp(), easeOut, PineMark()

### Community 5 - "API-запросы к Sanity"
Cohesion: 0.38
Nodes (9): getKitten(), getKittens(), getKittensByStud(), getKittenSlugs(), getSettings(), getStud(), getStuds(), getStudSlugs() (+1 more)

### Community 6 - "Словарь переводов"
Cohesion: 0.19
Nodes (7): dateLocale, statusMap, T, getDict(), getLocale(), hreflangAlternates(), withLocale()

### Community 7 - "Sanity-клиент и изображения"
Cohesion: 0.24
Nodes (4): isSanityConfigured, schema, singleton(), structure()

### Community 8 - "CMS-контент страниц"
Cohesion: 0.64
Nodes (7): f(), fetchDoc(), getAboutContent(), getHomeContent(), getKittensContent(), getStudsContent(), mergeList()

### Community 14 - "Конфигурация путей"
Cohesion: 0.50
Nodes (3): compilerOptions, baseUrl, paths

### Community 21 - "Контакты по умолчанию"
Cohesion: 0.43
Nodes (4): CONTACT_DEFAULTS, resolveContacts(), organizationJsonLd(), resolveOgImage()

## Knowledge Gaps
- **42 isolated node(s):** `featureIcons`, `valueIcons`, `metadata`, `DEFAULTS`, `easeOut` (+37 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Зависимости npm` to `Инструменты сборки`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **Why does `useDict()` connect `UI-компоненты` to `Кнопки связи и подвал`?**
  _High betweenness centrality (0.007) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `WhatsApp()` (e.g. with `ContactPopover()` and `Footer()`) actually correct?**
  _`WhatsApp()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `featureIcons`, `valueIcons`, `metadata` to the rest of the system?**
  _42 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Зависимости npm` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._
- **Should `Sanity: схемы контента` be split into smaller, more focused modules?**
  _Cohesion score 0.12987012987012986 - nodes in this community are weakly interconnected._
- **Should `Инструменты сборки` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._