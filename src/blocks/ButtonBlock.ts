import type { Block } from 'payload'

export const ButtonBlock: Block = {
  slug: 'button',
  interfaceName: 'ButtonBlock',
  labels: { singular: 'Button', plural: 'Buttons' },
  fields: [
    { name: 'label', type: 'text', required: true, defaultValue: 'Read more' },
    {
      name: 'linkType',
      label: 'Destination type',
      type: 'select',
      defaultValue: 'internal',
      options: [
        { label: 'Internal page', value: 'internal' },
        { label: 'External link', value: 'external' },
      ],
    },
    {
      name: 'href',
      label: 'Destination URL',
      type: 'text',
      required: true,
      defaultValue: '/',
      admin: { description: 'Internal: /about-mia or #section. External: https://example.com, mailto:hello@example.com, or tel:+31201234567.' },
      validate: (value: unknown) => {
        if (typeof value !== 'string' || !value.trim()) return 'A destination URL is required.'
        return /^(\/|#|https?:\/\/|mailto:|tel:)/i.test(value.trim()) || 'Use an internal path (/page), anchor (#section), https:// URL, mailto:, or tel: URL.'
      },
    },
    {
      name: 'variant',
      label: 'Button style',
      type: 'select',
      defaultValue: 'primary',
      options: [
        { label: 'Primary ink', value: 'primary' },
        { label: 'Secondary sage', value: 'secondary' },
        { label: 'Parchment outline', value: 'outline' },
        { label: 'Text link', value: 'text' },
      ],
    },
    {
      name: 'alignment',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },
    { name: 'openInNewTab', label: 'Open in a new tab', type: 'checkbox', defaultValue: false, admin: { description: 'Usually appropriate for external websites.' } },
  ],
}
