# Story Publisher

Next.js App Router + Payload CMS 3 starter for authoring and publishing stories.

## Start locally

Requires Node.js 20.9+ and PostgreSQL.

```bash
cp .env.example .env
createdb story_publisher
npm install
npm run generate:importmap
npm run generate:types
npm run dev
```

Open `http://localhost:3000/admin` and create the first user. For a local first publisher, select the `publisher` role during initial creation; after that, publishers manage users and roles.

The PostgreSQL adapter creates its tables in development. For production schema changes, create and run Payload migrations before deploying:

```bash
npx payload migrate:create story-schema
npx payload migrate
```

## Structure

- `src/collections` contains authorization-aware content collections.
- `src/blocks` holds the reusable page-builder blocks.
- `src/components/admin` provides the role-aware workspace switcher and custom dashboard.
- `src/app/(payload)` bridges Payload into the Next.js App Router; `src/app/(frontend)` contains server-rendered reader routes.
