# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Planometrica Landing — маркетинговый сайт для B2B платформы проектирования жилых домов. Заменит planometrica.ru (Studio переедет на субдомен).

## Commands

```bash
npm run dev      # Dev server на localhost:4321
npm run build    # Production build в ./dist/
npm run preview  # Preview production build

./deploy-staging.sh  # Ручной деплой на staging
```

## Architecture

**Stack:** Astro 5.16 + Tailwind CSS v4 + React (для интерактивных компонентов)

```
src/
├── layouts/Layout.astro    # Базовый layout с Header/Footer
├── components/
│   ├── Header.astro        # Навигация (transparent mode для hero)
│   ├── Footer.astro        # Подвал с навигацией
│   ├── Hero.astro          # Главная hero-секция
│   ├── Features.astro      # Секция преимуществ
│   ├── Products.astro      # Карточки продуктов
│   ├── CTA.astro           # Call-to-action секция
│   ├── ProductHero.astro   # Hero для страниц продуктов
│   ├── ProductFeatures.astro # Features для продуктов
│   └── ProductCTA.astro    # CTA для продуктов
└── pages/                  # File-based routing
    ├── index.astro         # Главная
    ├── studio.astro        # Planometrica Studio
    ├── planocad.astro      # PlanoCAD
    ├── neuroplan.astro     # NeuroPlan AI
    ├── render.astro        # Planometrica Render
    ├── mortgage.astro      # Ипотечный калькулятор
    ├── docs.astro          # Документация
    ├── blog.astro          # Блог
    └── faq.astro           # FAQ
```

## Design System

**Цвета (определены в `src/styles/global.css`):**
- Primary: `#0A4C76` — основной бренд
- Secondary: `#1A7BB3` — акцентный синий
- Accent: `#92CF93` — зелёный акцент

**Шрифты:** Inter (Google Fonts)

**Layout Props:**
```astro
<Layout
  title="Page Title"
  description="SEO description"
  transparentHeader={true}  // Для hero с фоном
  hideHeader={false}
  hideFooter={false}
/>
```

## Deployment

**Staging:** https://staging.planometrica.ru
- Auth: planometrica / staging2026
- Auto-deploy: push to `main` → GitHub Actions
- Server: 81.19.135.123 → /var/www/staging-landing

**Production:** https://planometrica.ru (planned)

**GitHub Secrets:** STAGING_HOST, STAGING_USER, STAGING_SSH_KEY

## Sanity CMS Integration

**Блог и FAQ управляются через Sanity CMS.**

### Конфигурация

| Параметр | Значение |
|----------|----------|
| Project ID | `xdm8bhqx` |
| Dataset | `production` |
| Studio | `../cms-planometrica` |

### ENV Variables

```env
PUBLIC_SANITY_PROJECT_ID=xdm8bhqx
PUBLIC_SANITY_DATASET=production
```

### Структура `src/lib/sanity/`

```
src/lib/sanity/
├── client.ts   # Sanity client (@sanity/client)
├── queries.ts  # GROQ queries (posts, faq)
├── types.ts    # TypeScript типы (Post, FAQ, Author)
├── schemas.ts  # Zod schemas для валидации
└── index.ts    # Re-exports
```

### Основные GROQ Queries

```groq
// Все посты
*[_type == "post"] | order(publishedAt desc)

// Пост по slug
*[_type == "post" && slug.current == $slug][0]

// FAQ по категории
*[_type == "faq" && category == $category] | order(order asc)
```

### Workflow с CMS

1. **Редактирование контента:**
   ```bash
   cd ../cms-planometrica
   npm run dev  # http://localhost:3333
   ```

2. **Публикация изменений:**
   - Сделай изменения в Sanity Studio
   - Нажми **Publish**
   - Задеплой landing:
   ```bash
   ./deploy-staging.sh
   ```

### Связанные файлы

- **CMS Studio:** `../cms-planometrica/`
- **Схемы контента:** `../cms-planometrica/schemaTypes/`
- **README CMS:** `../cms-planometrica/README.md`
