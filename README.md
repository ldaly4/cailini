# Cailíní

Pre-launch waitlist landing page for women in Dublin who want to find other women to do sport and activities with.

## Local Setup

```bash
npm install
cp .env.example .env
npm run db:push
npm run dev
```

The waitlist API writes to a local SQLite database via Prisma:

```prisma
waitlist(id, first_name, email, area, activities, created_at)
```

`activities` is stored as a JSON string in SQLite so the model can be swapped to Postgres later.

## Deploy

Deploy on Vercel as a Next.js app. For a production database, replace `DATABASE_URL` with a Postgres connection string and update the Prisma datasource provider.
