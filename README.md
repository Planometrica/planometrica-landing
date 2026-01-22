<div align="center">

# Planometrica Landing

Маркетинговый сайт для B2B платформы проектирования индивидуальных жилых домов

[![Deploy to Staging](https://github.com/Planometrica/planometrica-landing/actions/workflows/deploy-staging.yml/badge.svg)](https://github.com/Planometrica/planometrica-landing/actions/workflows/deploy-staging.yml)
[![Astro](https://img.shields.io/badge/Astro-5.16-BC52EE?logo=astro&logoColor=white)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

[Staging](https://staging.planometrica.ru) · [Production](https://planometrica.ru)

</div>

---

## О проекте

Planometrica Landing — статический маркетинговый сайт, презентующий продукты экосистемы Planometrica:

- **Planometrica Studio** — основная платформа для проектирования
- **PlanoCAD** — браузерный CAD-редактор
- **NeuroPlan AI** — генерация планировок с помощью AI
- **Planometrica Render** — фотореалистичная визуализация
- **Ипотечный калькулятор** — расчёт стоимости строительства

## Быстрый старт

```bash
# Клонирование
git clone https://github.com/Planometrica/planometrica-landing.git
cd planometrica-landing

# Установка зависимостей
npm install

# Запуск dev-сервера
npm run dev
```

Откройте [http://localhost:4321](http://localhost:4321)

## Команды

| Команда | Описание |
|---------|----------|
| `npm run dev` | Dev-сервер с hot reload |
| `npm run build` | Production сборка в `./dist/` |
| `npm run preview` | Локальный preview production сборки |
| `./deploy-staging.sh` | Ручной деплой на staging |

## Технологии

- **[Astro 5](https://astro.build)** — статический генератор с island architecture
- **[Tailwind CSS 4](https://tailwindcss.com)** — utility-first CSS framework
- **[React 19](https://react.dev)** — для интерактивных компонентов (islands)
- **TypeScript** — типизация

## Структура проекта

```
├── src/
│   ├── components/     # Переиспользуемые компоненты
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── ProductHero.astro
│   │   └── ...
│   ├── layouts/
│   │   └── Layout.astro  # Базовый layout
│   ├── pages/            # File-based routing
│   │   ├── index.astro
│   │   ├── studio.astro
│   │   ├── planocad.astro
│   │   └── ...
│   └── styles/
│       └── global.css    # Design tokens & Tailwind config
├── public/               # Static assets
├── .github/workflows/    # CI/CD
└── deploy-staging.sh     # Manual deploy script
```

## Дизайн-система

### Цвета

| Название | HEX | Использование |
|----------|-----|---------------|
| Primary | `#0A4C76` | Основной бренд, кнопки, ссылки |
| Secondary | `#1A7BB3` | Акцентный синий, hover состояния |
| Accent | `#92CF93` | Зелёный акцент, success состояния |

### Шрифты

- **Inter** — основной шрифт (Google Fonts)
- **Aileron** — логотип

## Деплой

### Staging

- **URL:** https://staging.planometrica.ru
- **Auth:** `planometrica` / `staging2026`
- **Автодеплой:** push в `main` → GitHub Actions

### Production

- **URL:** https://planometrica.ru
- **Статус:** В разработке

### GitHub Secrets

Для CI/CD необходимы:
- `STAGING_HOST` — IP сервера
- `STAGING_USER` — SSH пользователь
- `STAGING_SSH_KEY` — Приватный SSH ключ

## Разработка

### Добавление новой страницы продукта

1. Создайте файл в `src/pages/[product-name].astro`
2. Используйте компоненты `ProductHero`, `ProductFeatures`, `ProductCTA`
3. Добавьте ссылку в `Header.astro` и `Footer.astro`

### Локальный деплой на staging

```bash
./deploy-staging.sh
```

## Связанные проекты

| Проект | Описание |
|--------|----------|
| [planometrica-studio](https://github.com/Planometrica/planometrica-studio) | Основной frontend |
| [planometrica-backend](https://github.com/Planometrica/planometrica-backend) | Backend API |
| [PlanoCAD](https://github.com/Planometrica/PlanoCAD) | CAD редактор |

## Лицензия

Proprietary © 2026 Planometrica
