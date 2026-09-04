import type { GlobalConfig } from 'payload'

import { publisherOnly } from '@/access/roles'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Homepage',
  access: { read: () => true, update: publisherOnly },
  fields: [
    {
      type: 'group',
      name: 'hero',
      label: 'Landing hero',
      fields: [
        { name: 'eyebrow', type: 'text', defaultValue: 'The Watermill Press presents' },
        { name: 'heading', type: 'text', defaultValue: 'Chronicles, folklore & hand-bound tales' },
        { name: 'intro', type: 'textarea', defaultValue: 'A living library of intimate stories, old-world wonder, and folklore waiting to be read by lantern light.' },
        { name: 'ctaLabel', label: 'Button label', type: 'text', defaultValue: 'Explore the story library' },
        { name: 'ctaHref', label: 'Button link', type: 'text', defaultValue: '#latest-stories' },
      ],
    },
    {
      type: 'group',
      name: 'storyShelf',
      label: 'Story shelf',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Newly illuminated folios' },
        {
          name: 'stories',
          label: 'Featured stories',
          type: 'relationship',
          relationTo: 'stories',
          hasMany: true,
          maxRows: 7,
          admin: { description: 'Optional. Leave empty to show the newest published stories automatically.' },
        },
      ],
    },
    {
      type: 'group',
      name: 'dispatch',
      label: 'Dispatch panel',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Keep a place by the fire.' },
        { name: 'copy', type: 'textarea', defaultValue: 'New tales, editorial notes, and seasonal dispatches from the Watermill Press.' },
        { name: 'ctaLabel', label: 'Button label', type: 'text', defaultValue: 'Write to the press' },
        { name: 'ctaHref', label: 'Button link', type: 'text', defaultValue: 'mailto:hello@example.com' },
      ],
    },
  ],
}
