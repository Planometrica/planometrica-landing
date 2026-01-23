import { sanityClient, isSanityConfigured } from './client'
import type { 
  BlogPost, 
  FAQItem, 
  FAQCategory,
  SiteSettings,
  Page,
  Hero,
  Product,
  Feature,
  Testimonial,
  Stat,
  Pricing
} from './types'

// ============================================
// FRAGMENTS
// ============================================

const imageFragment = `
  asset->{
    _id,
    url,
    metadata { lqip, dimensions }
  },
  alt,
  hotspot
`

const ctaFragment = `
  text,
  link
`

// ============================================
// SITE SETTINGS QUERIES
// ============================================

const siteSettingsQuery = `*[_type == "siteSettings"][0] {
  _id,
  siteName,
  siteDescription,
  logo { ${imageFragment} },
  favicon { ${imageFragment} },
  ogImage { ${imageFragment} },
  contactEmail,
  social,
  footerText,
  analyticsId
}`

export async function getSiteSettings(): Promise<SiteSettings | null> {
  if (!isSanityConfigured()) return null
  try {
    return await sanityClient.fetch<SiteSettings>(siteSettingsQuery)
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return null
  }
}

// ============================================
// PAGE QUERIES
// ============================================

const pageBySlugQuery = `*[_type == "page" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  seo {
    metaTitle,
    metaDescription,
    keywords,
    ogImage { ${imageFragment} },
    noIndex
  },
  hero->{
    _id,
    internalName,
    badge,
    title,
    titleHighlight,
    subtitle,
    description,
    primaryCta { ${ctaFragment} },
    secondaryCta { ${ctaFragment} },
    featureBadges,
    stats[] { _key, value, label },
    backgroundImage { ${imageFragment} },
    gradient
  },
  sections[] {
    _type,
    _key,
    ...,
    _type == "featuresSection" => {
      badge,
      title,
      subtitle,
      features[]->{
        _id,
        title,
        description,
        icon,
        iconName,
        image { ${imageFragment} },
        link,
        order
      }
    },
    _type == "testimonialsSection" => {
      badge,
      title,
      testimonials[]->{
        _id,
        quote,
        name,
        role,
        company,
        location,
        avatar { ${imageFragment} },
        rating,
        order
      },
      stats[]->{
        _id,
        value,
        label,
        order
      }
    },
    _type == "pricingSection" => {
      badge,
      title,
      plans[]->{
        _id,
        name,
        description,
        price,
        period,
        features,
        notIncluded,
        ctaText,
        ctaLink,
        highlighted,
        badge,
        order
      }
    }
  }
}`

export async function getPageBySlug(slug: string): Promise<Page | null> {
  if (!isSanityConfigured()) return null
  try {
    return await sanityClient.fetch<Page>(pageBySlugQuery, { slug })
  } catch (error) {
    console.error('Error fetching page:', error)
    return null
  }
}

// ============================================
// HERO QUERIES
// ============================================

const heroByNameQuery = `*[_type == "hero" && internalName == $name][0] {
  _id,
  internalName,
  badge,
  title,
  titleHighlight,
  subtitle,
  description,
  primaryCta { ${ctaFragment} },
  secondaryCta { ${ctaFragment} },
  featureBadges,
  stats[] { _key, value, label },
  backgroundImage { ${imageFragment} },
  gradient
}`

export async function getHeroByName(name: string): Promise<Hero | null> {
  if (!isSanityConfigured()) return null
  try {
    return await sanityClient.fetch<Hero>(heroByNameQuery, { name })
  } catch (error) {
    console.error('Error fetching hero:', error)
    return null
  }
}

// ============================================
// PRODUCT QUERIES
// ============================================

const productsQuery = `*[_type == "product"] | order(order asc) {
  _id,
  name,
  slug,
  tagline,
  description,
  icon { ${imageFragment} },
  image { ${imageFragment} },
  gradient,
  productUrl,
  featureBadges,
  order
}`

const productBySlugQuery = `*[_type == "product" && slug.current == $slug][0] {
  _id,
  name,
  slug,
  tagline,
  description,
  icon { ${imageFragment} },
  image { ${imageFragment} },
  gradient,
  productUrl,
  features[]->{
    _id,
    title,
    description,
    icon,
    iconName,
    image { ${imageFragment} },
    link,
    order
  },
  featureBadges,
  workflow[] { _key, number, title, description },
  comparison,
  pricing[]->{
    _id,
    name,
    description,
    price,
    period,
    features,
    notIncluded,
    ctaText,
    ctaLink,
    highlighted,
    badge,
    order
  },
  ctaTitle,
  ctaDescription,
  primaryCta { ${ctaFragment} },
  secondaryCta { ${ctaFragment} },
  order
}`

export async function getProducts(): Promise<Product[]> {
  if (!isSanityConfigured()) return []
  try {
    return await sanityClient.fetch<Product[]>(productsQuery)
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!isSanityConfigured()) return null
  try {
    return await sanityClient.fetch<Product>(productBySlugQuery, { slug })
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

// ============================================
// FEATURE QUERIES
// ============================================

const featuresQuery = `*[_type == "feature"] | order(order asc) {
  _id,
  title,
  description,
  icon,
  iconName,
  image { ${imageFragment} },
  link,
  category,
  order
}`

const featuresByCategoryQuery = `*[_type == "feature" && category == $category] | order(order asc) {
  _id,
  title,
  description,
  icon,
  iconName,
  image { ${imageFragment} },
  link,
  order
}`

export async function getFeatures(): Promise<Feature[]> {
  if (!isSanityConfigured()) return []
  try {
    return await sanityClient.fetch<Feature[]>(featuresQuery)
  } catch (error) {
    console.error('Error fetching features:', error)
    return []
  }
}

export async function getFeaturesByCategory(category: string): Promise<Feature[]> {
  if (!isSanityConfigured()) return []
  try {
    return await sanityClient.fetch<Feature[]>(featuresByCategoryQuery, { category })
  } catch (error) {
    console.error('Error fetching features by category:', error)
    return []
  }
}

// ============================================
// TESTIMONIAL QUERIES
// ============================================

const testimonialsQuery = `*[_type == "testimonial"] | order(featured desc, order asc) {
  _id,
  quote,
  name,
  role,
  company,
  location,
  avatar { ${imageFragment} },
  rating,
  featured,
  order
}`

const featuredTestimonialsQuery = `*[_type == "testimonial" && featured == true] | order(order asc) {
  _id,
  quote,
  name,
  role,
  company,
  location,
  avatar { ${imageFragment} },
  rating,
  order
}`

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!isSanityConfigured()) return []
  try {
    return await sanityClient.fetch<Testimonial[]>(testimonialsQuery)
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return []
  }
}

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  if (!isSanityConfigured()) return []
  try {
    return await sanityClient.fetch<Testimonial[]>(featuredTestimonialsQuery)
  } catch (error) {
    console.error('Error fetching featured testimonials:', error)
    return []
  }
}

// ============================================
// STAT QUERIES
// ============================================

const statsQuery = `*[_type == "stat"] | order(order asc) {
  _id,
  value,
  label,
  description,
  icon,
  category,
  order
}`

const statsByCategoryQuery = `*[_type == "stat" && category == $category] | order(order asc) {
  _id,
  value,
  label,
  description,
  icon,
  order
}`

export async function getStats(): Promise<Stat[]> {
  if (!isSanityConfigured()) return []
  try {
    return await sanityClient.fetch<Stat[]>(statsQuery)
  } catch (error) {
    console.error('Error fetching stats:', error)
    return []
  }
}

export async function getStatsByCategory(category: string): Promise<Stat[]> {
  if (!isSanityConfigured()) return []
  try {
    return await sanityClient.fetch<Stat[]>(statsByCategoryQuery, { category })
  } catch (error) {
    console.error('Error fetching stats by category:', error)
    return []
  }
}

// ============================================
// PRICING QUERIES
// ============================================

const pricingQuery = `*[_type == "pricing"] | order(order asc) {
  _id,
  name,
  description,
  price,
  period,
  features,
  notIncluded,
  ctaText,
  ctaLink,
  highlighted,
  badge,
  order
}`

const pricingByProductQuery = `*[_type == "pricing" && product._ref == $productId] | order(order asc) {
  _id,
  name,
  description,
  price,
  period,
  features,
  notIncluded,
  ctaText,
  ctaLink,
  highlighted,
  badge,
  order
}`

export async function getPricing(): Promise<Pricing[]> {
  if (!isSanityConfigured()) return []
  try {
    return await sanityClient.fetch<Pricing[]>(pricingQuery)
  } catch (error) {
    console.error('Error fetching pricing:', error)
    return []
  }
}

export async function getPricingByProduct(productId: string): Promise<Pricing[]> {
  if (!isSanityConfigured()) return []
  try {
    return await sanityClient.fetch<Pricing[]>(pricingByProductQuery, { productId })
  } catch (error) {
    console.error('Error fetching pricing by product:', error)
    return []
  }
}

// ============================================
// BLOG QUERIES (existing)
// ============================================

const blogPostsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  _createdAt,
  title,
  slug,
  excerpt,
  mainImage { ${imageFragment} },
  categories,
  author->{
    name,
    image { ${imageFragment} }
  },
  publishedAt,
  "readTime": round(length(pt::text(body)) / 5 / 200)
}`

const blogPostBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  _createdAt,
  title,
  slug,
  excerpt,
  mainImage { ${imageFragment} },
  categories,
  author->{
    name,
    image { ${imageFragment} }
  },
  publishedAt,
  body,
  "readTime": round(length(pt::text(body)) / 5 / 200)
}`

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!isSanityConfigured()) {
    console.log('Sanity not configured, using fallback data')
    return []
  }

  try {
    return await sanityClient.fetch<BlogPost[]>(blogPostsQuery)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isSanityConfigured()) {
    return null
  }

  try {
    return await sanityClient.fetch<BlogPost>(blogPostBySlugQuery, { slug })
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}

// ============================================
// FAQ QUERIES (existing)
// ============================================

const faqItemsQuery = `*[_type == "faq"] | order(category asc, order asc) {
  _id,
  _createdAt,
  question,
  answer,
  category,
  order
}`

export async function getFAQItems(): Promise<FAQItem[]> {
  if (!isSanityConfigured()) {
    console.log('Sanity not configured, using fallback data')
    return []
  }

  try {
    return await sanityClient.fetch<FAQItem[]>(faqItemsQuery)
  } catch (error) {
    console.error('Error fetching FAQ items:', error)
    return []
  }
}

// Group FAQ items by category
export async function getFAQByCategories(): Promise<FAQCategory[]> {
  const items = await getFAQItems()

  const categoryMap = new Map<string, FAQItem[]>()

  for (const item of items) {
    const category = item.category || 'Общие вопросы'
    if (!categoryMap.has(category)) {
      categoryMap.set(category, [])
    }
    categoryMap.get(category)!.push(item)
  }

  return Array.from(categoryMap.entries()).map(([name, items]) => ({
    name,
    items
  }))
}
