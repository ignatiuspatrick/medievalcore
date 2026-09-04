import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { LayoutTemplates } from './collections/LayoutTemplates'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Stories } from './collections/Stories'
import { Users } from './collections/Users'
import { SiteSettings } from './globals/SiteSettings'
import { Homepage } from './globals/Homepage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || '',
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  editor: lexicalEditor(),
  admin: {
    user: Users.slug,
    livePreview: {
      collections: ['pages'],
      url: ({ data }) => typeof data?.slug === 'string' && data.slug ? `/${data.slug}?preview=true` : '/',
      breakpoints: [
        { name: 'phone', label: 'Phone', width: 390, height: 844 },
        { name: 'tablet', label: 'Tablet', width: 768, height: 1024 },
        { name: 'desktop', label: 'Desktop', width: 1440, height: 1000 },
      ],
    },
    importMap: { baseDir: path.resolve(dirname) },
    components: {
      // This view is the entry point for both editorial roles.
      views: {
        dashboard: {
          Component: '@/components/admin/WorkspaceDashboard#WorkspaceDashboard',
        },
        publisherStudio: {
          Component: '@/components/admin/PublisherStudio#PublisherStudio',
          path: '/publisher-studio',
        },
      },
      // Kept in the normal Payload header on every admin screen.
      actions: ['@/components/admin/WorkspaceSwitch#WorkspaceSwitch'],
    },
  },
  collections: [Users, Media, LayoutTemplates, Stories, Pages],
  globals: [SiteSettings, Homepage],
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL },
  }),
  sharp,
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
})
