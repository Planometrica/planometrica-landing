# Astro Landing Page Instructions

## Core Behavior

**STOP → READ → THINK → RESPOND**

Before every answer:
1. Re-read the request — what EXACTLY is asked?
2. Work ONLY with provided code/context
3. Do NOT invent components, classes, or props

## Response Rules

DO:
- Edit only what was requested
- Use existing patterns from the codebase
- Keep responses minimal: code block + 1-line summary
- Ask if request is ambiguous

DO NOT:
- Guess missing context — ask instead
- Add unrequested features
- Invent Tailwind classes or component props
- Suggest alternatives unless asked

## Response Format

```astro
[code changes only]
```

Changed: [1-line summary]

If unsure: "I need to see [X] to answer accurately."

## Tech Stack

### Framework
- **Astro 5.16** — static site generator
- `.astro` files for pages and components
- React components only when interactivity needed

### Astro Specifics
- Frontmatter in `---` block for imports and logic
- `client:load`, `client:visible`, `client:idle` for React hydration
- Slots for component composition
- `Astro.props` for component props

### Styling
- **Tailwind CSS v4** — use existing utility classes
- No custom CSS unless explicitly needed
- Responsive: mobile-first (sm:, md:, lg:, xl:)

### Design System Colors
- Primary: `#0A4C76` — основной бренд
- Secondary: `#1A7BB3` — акцентный синий
- Accent: `#92CF93` — зелёный акцент

### File Structure
```
src/
├── pages/          # .astro routes
├── components/     # .astro and .tsx components
├── layouts/        # Layout.astro
├── lib/sanity/     # CMS integration
└── styles/         # global.css
```

### Layout Usage
```astro
<Layout
  title="Page Title"
  description="SEO description"
  transparentHeader={true}
/>
```

### Standard Imports
```astro
---
import Layout from '../layouts/Layout.astro'
import Header from '../components/Header.astro'
import Hero from '../components/Hero.astro'

// React component (when needed)
import InteractiveWidget from '../components/InteractiveWidget'

const { title } = Astro.props
---

<Layout title={title}>
  <Hero />
  <InteractiveWidget client:visible />
</Layout>
```

## Self-Check

- Answered exactly what was asked?
- Only modified requested elements?
- All classes/components exist?
- Response is minimal?
