import type { Field } from 'payload'

const surfaceColors = {
  primary: '#cfe2c9',
  secondary: '#eef5ea',
  parchment: '#fff9e9',
  transparent: 'transparent',
  sage: '#dce7d7',
  ink: '#173425',
} as const

const hexColorPattern = /^#(?:[\da-f]{3}|[\da-f]{6}|[\da-f]{8})$/i

/** Shared picker-backed surface field for presentation blocks. */
export const surfaceField = (label = 'Background color', defaultValue = 'transparent', name = 'background'): Field => ({
  name,
  label,
  type: 'text',
  defaultValue: surfaceColors[defaultValue as keyof typeof surfaceColors] || defaultValue,
  validate: (value: unknown) =>
    !value ||
    (typeof value === 'string' && (hexColorPattern.test(value) || value in surfaceColors)) ||
    'Choose a valid color.',
  admin: {
    components: { Field: '@/components/admin/HexColorPicker#HexColorPicker' },
    description: 'Choose the surface behind this component.',
  },
})
