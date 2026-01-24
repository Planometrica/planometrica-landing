// Blog Post type
export interface BlogPost {
  _id: string
  _createdAt: string
  title: string
  slug: { current: string }
  excerpt: string
  mainImage?: {
    asset: {
      _ref: string
    }
    alt?: string
  }
  categories?: string[]
  author?: {
    name: string
    image?: {
      asset: { _ref: string }
    }
  }
  publishedAt: string
  body?: any[] // Portable Text
  readTime?: number
}

// FAQ Item type
export interface FAQItem {
  _id: string
  _createdAt: string
  question: string
  answer: string
  category: string
  order?: number
}

// FAQ Category for grouping
export interface FAQCategory {
  name: string
  items: FAQItem[]
}
