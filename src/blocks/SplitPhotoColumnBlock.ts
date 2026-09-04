import type { Block } from 'payload'

export const SplitPhotoColumnBlock: Block = {
  slug: 'splitPhotoColumn',
  interfaceName: 'SplitPhotoColumnBlock',
  labels: { singular: 'Split photo and copy', plural: 'Split photo and copy' },
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'content', type: 'richText', required: true },
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'imagePosition',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Image left', value: 'left' },
        { label: 'Image right', value: 'right' },
      ],
    },
  ],
}
