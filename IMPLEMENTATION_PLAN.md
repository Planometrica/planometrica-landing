# Planometrica Landing 2.0 — План реализации

> **Проект:** planometrica-landing
> **Референс:** LANDING_STRUCTURE.md
> **Дата создания:** 2026-01-23
> **Статус:** ✅ Завершено

---

## Обзор

Редизайн лендинга Planometrica с добавлением новых компонентов, продуктовых страниц и SEO-оптимизации.

**Tech Stack:**
- Astro 5.16
- Tailwind CSS v4
- React 19
- Lucide Icons

**Design Tokens:**
- Primary: `#0A4C76`
- Secondary: `#1A7BB3`
- Accent: `#92CF93`

---

## Phase 1: Интеграция зависимостей

| Задача | Статус |
|--------|--------|
| Установить lucide-react | ✅ Завершено |

---

## Phase 2: Создание компонентов

### Компоненты главной страницы

| Компонент | Файл | Статус |
|-----------|------|--------|
| ProblemSolution | `src/components/ProblemSolution.astro` | ✅ Создан |
| HowItWorks | `src/components/HowItWorks.astro` | ✅ Создан |
| Testimonials | `src/components/Testimonials.astro` | ✅ Создан |
| PricingPreview | `src/components/PricingPreview.astro` | ✅ Создан |
| ArchitecturalStyles | `src/components/ArchitecturalStyles.astro` | ✅ Создан |

### Компоненты продуктовых страниц

| Компонент | Файл | Статус |
|-----------|------|--------|
| ProductHero | `src/components/ProductHero.astro` | ✅ Создан |
| ProductFeatures | `src/components/ProductFeatures.astro` | ✅ Создан |
| ProductCTA | `src/components/ProductCTA.astro` | ✅ Создан |
| Workflow | `src/components/Workflow.astro` | ✅ Создан |
| ComparisonTable | `src/components/ComparisonTable.astro` | ✅ Создан |

### Специализированные компоненты

| Компонент | Файл | Статус |
|-----------|------|--------|
| MortgageCalculator | `src/components/MortgageCalculator.tsx` | ✅ Создан (React) |
| Accordion | `src/components/Accordion.astro` | ✅ Создан |
| BlogCard | `src/components/BlogCard.astro` | ✅ Создан |

---

## Phase 3: Заполнение страниц

### Структура страниц

| Страница | URL | Блоки | Статус |
|----------|-----|-------|--------|
| Главная | `/` | Hero → ProblemSolution → HowItWorks → Features → Products → ArchitecturalStyles → Testimonials → PricingPreview → CTA | ✅ Обновлена |
| Студия | `/studio` | ProductHero → ProductFeatures → ProductCTA | ✅ Обновлена |
| ПланоCAD | `/planocad` | ProductHero → ComparisonTable → ProductFeatures → ProductCTA | ✅ Обновлена |
| НейроПлан | `/neuroplan` | ProductHero → HowItWorks → ArchitecturalStyles → ProductCTA | ✅ Обновлена |
| AI-Рендер | `/render` | ProductHero → ProductFeatures → ProductCTA | ✅ Обновлена |
| Ипотека | `/mortgage` | ProductHero → MortgageCalculator → ProductCTA | ✅ Обновлена |
| Документы | `/docs` | ProductHero → ProductFeatures → ProductCTA | ✅ Обновлена |
| Блог | `/blog` | Hero → BlogCard grid | ✅ Обновлена |
| FAQ | `/faq` | Hero → Accordion | ✅ Обновлена |

---

## Phase 4: SEO и Meta-теги

### Layout.astro — новые props

```typescript
interface Props {
  title: string
  description?: string
  keywords?: string      // ✅ Добавлено
  ogImage?: string       // ✅ Добавлено
  canonical?: string     // ✅ Добавлено
  transparentHeader?: boolean
  hideHeader?: boolean
  hideFooter?: boolean
}
```

### Meta-теги по страницам

| Страница | Title | Статус |
|----------|-------|--------|
| `/` | Планометрика — AI проектирование дома онлайн | ✅ |
| `/studio` | Студия Планометрика — конструктор дома онлайн | ✅ |
| `/planocad` | ПланоCAD — профессиональное проектирование ИЖС | ✅ |
| `/neuroplan` | НейроПлан — AI архитектор для проектирования | ✅ |
| `/render` | AI-Рендер — фотореалистичная визуализация | ✅ |
| `/mortgage` | Ипотека на строительство дома 2026 | ✅ |
| `/docs` | Документы для строительства дома | ✅ |
| `/blog` | Блог Планометрики | ✅ |
| `/faq` | FAQ — Вопросы и ответы | ✅ |

---

## Phase 5: Тестирование

| Проверка | Статус |
|----------|--------|
| `npm run build` успешен | ✅ (799ms, 9 страниц) |
| Все страницы открываются | ✅ |
| Компоненты работают standalone | ✅ |
| SEO теги присутствуют | ✅ |

---

## Исправленные ошибки

### Build Error: "Cannot read properties of undefined (reading 'map')"

**Причина:** Компоненты ожидали props, но использовались без них в `index.astro`

**Решение:** Добавлены default data arrays в компоненты:
- `ProblemSolution.astro` — defaultProblems, defaultSolutions
- `HowItWorks.astro` — defaultSteps
- `ArchitecturalStyles.astro` — defaultStyles
- `Testimonials.astro` — defaultTestimonials, defaultMetrics
- `PricingPreview.astro` — defaultTiers

---

## Структура файлов

```
src/
├── components/
│   ├── Accordion.astro          # FAQ аккордеон
│   ├── ArchitecturalStyles.astro # 8 стилей домов
│   ├── BlogCard.astro           # Карточка статьи
│   ├── ComparisonTable.astro    # Сравнение подходов
│   ├── HowItWorks.astro         # 4 шага workflow
│   ├── MortgageCalculator.tsx   # React калькулятор
│   ├── PricingPreview.astro     # 3 тарифа
│   ├── ProblemSolution.astro    # Традиционно vs Планометрика
│   ├── ProductCTA.astro         # CTA для продуктов
│   ├── ProductFeatures.astro    # Фичи продукта
│   ├── ProductHero.astro        # Hero для продуктов
│   ├── Testimonials.astro       # Карусель отзывов
│   └── Workflow.astro           # Шаги процесса
├── layouts/
│   └── Layout.astro             # Основной layout + SEO
└── pages/
    ├── index.astro              # Главная
    ├── studio.astro             # Студия
    ├── planocad.astro           # ПланоCAD
    ├── neuroplan.astro          # НейроПлан
    ├── render.astro             # AI-Рендер
    ├── mortgage.astro           # Ипотека
    ├── docs.astro               # Документы
    ├── blog.astro               # Блог
    └── faq.astro                # FAQ
```

---

## Следующие шаги (опционально)

- [ ] Добавить реальные изображения в `/public/images/`
- [ ] Настроить sitemap.xml
- [ ] Добавить Google Analytics
- [ ] Интегрировать с CMS для блога
- [ ] A/B тестирование landing page

---

*Последнее обновление: 2026-01-23*
