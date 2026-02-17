import { defineField, defineType } from 'sanity'

export const gallery = defineType({
  name: 'gallery',
  title: 'Галерия',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Заглавие на албума',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Снимки',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              title: 'Описание на снимката',
              type: 'string',
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'images.0',
    },
  },
})
