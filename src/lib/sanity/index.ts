// Client
export { sanityClient, urlFor, isSanityConfigured } from './client'

// Queries
export {
  // Site Settings
  getSiteSettings,
  // Footer Navigation
  getFooterNavigation,
  // Pages
  getPageBySlug,
  // Hero
  getHeroByName,
  // Products
  getProducts,
  getProductBySlug,
  // Features
  getFeatures,
  getFeaturesByCategory,
  // Testimonials
  getTestimonials,
  getFeaturedTestimonials,
  // Stats
  getStats,
  getStatsByCategory,
  // Pricing
  getPricing,
  getPricingByProduct,
  // Blog
  getBlogPosts, 
  getBlogPostBySlug, 
  // FAQ
  getFAQItems, 
  getFAQByCategories 
} from './queries'

// Types
export type { 
  // Common
  SanityImage,
  CTA,
  // Site Settings
  SiteSettings,
  // Footer Navigation
  FooterNavigation,
  FooterNavLink,
  // Pages
  SEO,
  Page,
  PageSection,
  FeaturesSection,
  TestimonialsSection,
  PricingSection,
  CTASection,
  CustomSection,
  // Hero
  Hero,
  HeroStat,
  // Products
  Product,
  WorkflowStep,
  ProductComparison,
  // Features
  Feature,
  // Testimonials
  Testimonial,
  // Stats
  Stat,
  // Pricing
  Pricing,
  // Blog
  BlogPost, 
  // FAQ
  FAQItem, 
  FAQCategory 
} from './types'
