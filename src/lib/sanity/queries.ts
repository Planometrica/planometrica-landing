import { sanityClient, isSanityConfigured } from './client'
import type { BlogPost, FAQItem, FAQCategory } from './types'

// ============================================
// BLOG QUERIES
// ============================================

const blogPostsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  _createdAt,
  title,
  slug,
  excerpt,
  mainImage,
  categories,
  author->{
    name,
    image
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
  mainImage,
  categories,
  author->{
    name,
    image
  },
  publishedAt,
  body,
  "readTime": round(length(pt::text(body)) / 5 / 200)
}`

// ============================================
// FAQ QUERIES
// ============================================

const faqItemsQuery = `*[_type == "faq"] | order(category asc, order asc) {
  _id,
  _createdAt,
  question,
  answer,
  category,
  order
}`

// ============================================
// FETCH FUNCTIONS
// ============================================

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
