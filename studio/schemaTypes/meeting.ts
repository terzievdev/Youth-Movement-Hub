import { defineField, defineType } from 'sanity'

export const meeting = defineType({
  name: 'meeting',
  title: 'Събития',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Заглавие',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dateTime',
      title: 'Дата и час',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Място',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Описание',
      type: 'text',
      rows: 4,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'dateTime',
      location: 'location',
    },
    prepare({ title, date, location }) {
      return {
        title,
        subtitle: `${date ? new Date(date).toLocaleDateString('bg-BG') : ''} ${location ? '| ' + location : ''}`,
      }
    },
  },
})
