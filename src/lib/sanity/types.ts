// ============================================
// COMMON TYPES
// ============================================

export interface SanityImage {
  asset: {
    _ref: string
    _id?: string
    url?: string
    metadata?: {
      lqip?: string
      dimensions?: {
        width: number
        height: number
      }
    }
  }
  alt?: string
  hotspot?: {
    x: number
    y: number
  }
}

export interface CTA {
  text?: string
  link?: string
}

// ============================================
// SITE SETTINGS
// ============================================

export interface SiteSettings {
  _id: string
  siteName: string
  siteDescription?: string
  logo?: SanityImage
  favicon?: SanityImage
  ogImage?: SanityImage
  contactEmail?: string
  social?: {
    telegram?: string
    vk?: string
    youtube?: string
    github?: string
  }
  footerText?: string
  analyticsId?: string
}

// ============================================
// PAGES
// ============================================

export interface SEO {
  metaTitle?: string
  metaDescription?: string
  keywords?: string
  ogImage?: SanityImage
  noIndex?: boolean
}

export interface Page {
  _id: string
  title: string
  slug: { current: string }
  seo?: SEO
  hero?: Hero
  sections?: PageSection[]
}

export type PageSection = 
  | FeaturesSection
  | TestimonialsSection
  | PricingSection
  | CTASection
  | CustomSection

export interface FeaturesSection {
  _type: 'featuresSection'
  _key: string
  badge?: string
  title?: string
  subtitle?: string
  features?: Feature[]
}

export interface TestimonialsSection {
  _type: 'testimonialsSection'
  _key: string
  badge?: string
  title?: string
  testimonials?: Testimonial[]
  stats?: Stat[]
}

export interface PricingSection {
  _type: 'pricingSection'
  _key: string
  badge?: string
  title?: string
  plans?: Pricing[]
}

export interface CTASection {
  _type: 'ctaSection'
  _key: string
  title?: string
  description?: string
  primaryCtaText?: string
  primaryCtaLink?: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
}

export interface CustomSection {
  _type: 'customSection'
  _key: string
  sectionId?: string
  title?: string
  content?: any[] // Portable Text
}

// ============================================
// HERO
// ============================================

export interface HeroStat {
  _key: string
  value: string
  label: string
}

export interface Hero {
  _id: string
  internalName: string
  badge?: string
  title: string
  titleHighlight?: string
  subtitle?: string
  description?: string
  primaryCta?: CTA
  secondaryCta?: CTA
  featureBadges?: string[]
  stats?: HeroStat[]
  backgroundImage?: SanityImage
  gradient?: string
}

// ============================================
// PRODUCTS
// ============================================

export interface WorkflowStep {
  _key: string
  number: string
  title: string
  description?: string
}

export interface ProductComparison {
  ourTitle?: string
  ourPoints?: string[]
  theirTitle?: string
  theirPoints?: string[]
}

export interface Product {
  _id: string
  name: string
  slug: { current: string }
  tagline?: string
  description?: string
  icon?: SanityImage
  image?: SanityImage
  gradient?: string
  productUrl?: string
  features?: Feature[]
  featureBadges?: string[]
  workflow?: WorkflowStep[]
  comparison?: ProductComparison
  pricing?: Pricing[]
  ctaTitle?: string
  ctaDescription?: string
  primaryCta?: CTA
  secondaryCta?: CTA
  order?: number
}

// ============================================
// FEATURES
// ============================================

export interface Feature {
  _id: string
  title: string
  description: string
  icon?: string
  iconName?: string
  image?: SanityImage
  link?: string
  category?: string
  order?: number
}

// ============================================
// TESTIMONIALS
// ============================================

export interface Testimonial {
  _id: string
  quote: string
  name: string
  role?: string
  company?: string
  location?: string
  avatar?: SanityImage
  rating?: number
  product?: { _ref: string }
  featured?: boolean
  order?: number
}

// ============================================
// STATS
// ============================================

export interface Stat {
  _id: string
  value: string
  label: string
  description?: string
  icon?: string
  category?: string
  order?: number
}

// ============================================
// PRICING
// ============================================

export interface Pricing {
  _id: string
  name: string
  description?: string
  price: string
  period?: 'month' | 'year' | 'once' | 'custom'
  features?: string[]
  notIncluded?: string[]
  ctaText?: string
  ctaLink?: string
  highlighted?: boolean
  badge?: string
  product?: { _ref: string }
  order?: number
}

// ============================================
// BLOG (existing)
// ============================================

export interface BlogPost {
  _id: string
  _createdAt: string
  title: string
  slug: { current: string }
  excerpt: string
  mainImage?: SanityImage
  categories?: string[]
  author?: {
    name: string
    image?: SanityImage
  }
  publishedAt: string
  body?: any[] // Portable Text
  readTime?: number
}

// ============================================
// FAQ (existing)
// ============================================

export interface FAQItem {
  _id: string
  _createdAt: string
  question: string
  answer: string
  category: string
  order?: number
}

export interface FAQCategory {
  name: string
  items: FAQItem[]
}
