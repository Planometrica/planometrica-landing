/**
 * Sanity Studio Schemas
 *
 * Copy these schemas to your Sanity Studio project.
 * Create a new Sanity project at: https://www.sanity.io/get-started
 *
 * 1. Run: npm create sanity@latest -- --template clean
 * 2. Copy these schemas to schemas/ directory
 * 3. Import them in schemas/index.ts
 */

// ============================================
// POST SCHEMA (for Blog)
// ============================================
export const postSchema = {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Заголовок',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'URL',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'excerpt',
      title: 'Краткое описание',
      type: 'text',
      rows: 3
    },
    {
      name: 'mainImage',
      title: 'Главное изображение',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt текст',
          type: 'string'
        }
      ]
    },
    {
      name: 'categories',
      title: 'Категории',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Проектирование', value: 'design' },
          { title: 'Строительство', value: 'construction' },
          { title: 'Ипотека', value: 'mortgage' },
          { title: 'Документы', value: 'docs' },
          { title: 'AI технологии', value: 'ai' },
          { title: 'Новости', value: 'news' }
        ]
      }
    },
    {
      name: 'author',
      title: 'Автор',
      type: 'reference',
      to: [{ type: 'author' }]
    },
    {
      name: 'publishedAt',
      title: 'Дата публикации',
      type: 'datetime'
    },
    {
      name: 'body',
      title: 'Содержимое',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', title: 'Alt текст', type: 'string' },
            { name: 'caption', title: 'Подпись', type: 'string' }
          ]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage'
    },
    prepare(selection: any) {
      const { author } = selection
      return { ...selection, subtitle: author && `by ${author}` }
    }
  }
}

// ============================================
// AUTHOR SCHEMA
// ============================================
export const authorSchema = {
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Имя',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'image',
      title: 'Фото',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'bio',
      title: 'Биография',
      type: 'text'
    }
  ]
}

// ============================================
// FAQ SCHEMA
// ============================================
export const faqSchema = {
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    {
      name: 'question',
      title: 'Вопрос',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'answer',
      title: 'Ответ',
      type: 'text',
      rows: 5,
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'category',
      title: 'Категория',
      type: 'string',
      options: {
        list: [
          { title: 'Общие вопросы', value: 'general' },
          { title: 'Проектирование', value: 'design' },
          { title: 'Оплата и тарифы', value: 'pricing' },
          { title: 'Документы', value: 'docs' },
          { title: 'Технические вопросы', value: 'technical' }
        ]
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'order',
      title: 'Порядок',
      type: 'number',
      description: 'Порядок отображения в категории'
    }
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'category'
    }
  }
}

// ============================================
// EXPORT ALL SCHEMAS
// ============================================
// In your Sanity Studio schemas/index.ts:
// import { postSchema, authorSchema, faqSchema } from './schemas'
// export const schemaTypes = [postSchema, authorSchema, faqSchema]
