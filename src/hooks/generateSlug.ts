import type { CollectionBeforeValidateHook, CollectionSlug, Where } from 'payload'

const slugify = (value: string) =>
  value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 90)

/**
 * Produces a human-readable, collision-free slug during document creation.
 * Existing documents retain their URL even if their title is later renamed.
 */
export const generateSlug = (
  collection: CollectionSlug,
  sourceField: 'title' | 'name' = 'title',
): CollectionBeforeValidateHook => async ({ data, operation, originalDoc, req }) => {
  if (!data) return data

  const source = data[sourceField]
  const hasSlugInput = typeof data.slug === 'string' && data.slug.trim().length > 0

  // On updates, leave the current stable URL alone unless an editor changes it.
  if (operation !== 'create' && originalDoc?.slug && !hasSlugInput) return data
  if (typeof source !== 'string' || !source.trim()) return data

  const requestedSlug = hasSlugInput ? data.slug : source
  const base = slugify(requestedSlug) || slugify(source)
  if (!base) return data

  let suffix = 1
  let candidate = base

  while (suffix < 1000) {
    const where = (originalDoc?.id
      ? { and: [{ slug: { equals: candidate } }, { id: { not_equals: originalDoc.id } }] }
      : { slug: { equals: candidate } }) as Where
    const { totalDocs } = await req.payload.find({
      collection,
      depth: 0,
      limit: 0,
      overrideAccess: true,
      where,
    })

    if (totalDocs === 0) {
      data.slug = candidate
      return data
    }

    suffix += 1
    candidate = `${base}-${suffix}`
  }

  throw new Error(`Unable to generate a unique slug for ${source}.`)
}
