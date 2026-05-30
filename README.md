# Greenfield International School — Website & CMS

A complete, SEO-friendly school website with a self-service admin dashboard, built so
school staff can manage all content (news, events, notices, gallery, faculty, settings)
without a developer.

Built with **Next.js 14 (App Router) + TypeScript**, **MongoDB/Mongoose**, **NextAuth**,
**Tailwind + shadcn/ui**, **Tiptap**, and **Cloudinary**. Deploys free on **Vercel**.

---

## Quick start (local development)

**Prerequisites:** Node.js 18+, and a MongoDB instance (local service or MongoDB Atlas).

```bash
# 1. Install dependencies
npm install

# 2. Create your env file
cp .env.example .env.local
#    then edit .env.local — at minimum set MONGODB_URI and NEXTAUTH_SECRET
#    (generate a secret with:  openssl rand -base64 32)

# 3. Create the first admin user (reads SEED_ADMIN_* from .env.local)
npm run seed:admin

# 4. (Optional) Seed demo content so the site isn't empty
npm run seed:content              # only fills empty collections
npm run seed:content -- --fresh   # wipe + reseed

# 5. Run it
npm run dev                       # http://localhost:3000
```

- Public site: <http://localhost:3000>
- Admin login: <http://localhost:3000/admin/login>

## npm scripts

| Script | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build (runs on Vercel/Linux — see caveat below) |
| `npm run start` | Serve a production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` — full type check |
| `npm run seed:admin` | Create/update an admin user from `SEED_ADMIN_*` env vars |
| `npm run seed:content` | Seed demo content (`-- --fresh` to wipe first) |

## Architecture

- **Public pages** (`app/(public)/*`) are server components that read from MongoDB via a
  cached query layer (`lib/queries.ts`, using `unstable_cache` with per-resource tags).
- **Admin** (`app/admin/*`) is auth-gated by NextAuth (credentials + bcrypt). The dashboard
  lives under a `(dashboard)` route group so the login page sits outside the auth guard.
- **CRUD APIs** (`app/api/<resource>`) are thin re-exports of a generic factory
  (`lib/crud.ts`) that validates with Zod, handles slugs/pagination/search, and calls
  `revalidateTag()` after a save — so public pages update within ~1s of an admin edit (ISR).
- **Images** upload directly to Cloudinary using a short-lived signature from
  `/api/upload` (the API secret never reaches the browser). Any image URL can also be pasted.
- **Contact form** posts to `/api/contact` → validates → saves a Submission → emails the
  office via Resend (best-effort).

See `lib/`, `models/`, and `components/` for the details.

## Project structure

```
app/(public)/      Public marketing pages (home, about, news, events, …)
app/admin/         Admin dashboard (auth-gated CRUD)
app/api/           Route handlers (auth, resources, upload, contact, settings)
components/public/ Public UI (Hero, NewsCard, GalleryGrid, …)
components/admin/  Admin UI (DataTable, forms, RichTextEditor, ImageUploader)
components/ui/     shadcn primitives
lib/               db, auth, queries, crud, validation, cloudinary, email
models/            Mongoose schemas
scripts/           seed-admin, seed-content
```

## Deployment & handover

- **Deploy:** see [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) — a step-by-step checklist for
  MongoDB Atlas, Cloudinary, Resend, Vercel, and the custom domain.
- **For school staff:** see [docs/ADMIN-GUIDE.md](docs/ADMIN-GUIDE.md) — how to manage content.
- **Env vars:** `.env.example` is the template; the full list (and where each value comes
  from) is in the deployment guide.

## ⚠️ Windows + OneDrive build caveat

This project folder lives under OneDrive. `npm run build` can fail locally on Windows
because OneDrive locks/syncs the `.next` build folder (`EINVAL`/`EBUSY` errors). This does
**not** affect `npm run dev`, and it does **not** affect Vercel (which builds on Linux).

For local verification use `npm run typecheck` + `npm run dev`. If a long dev session starts
throwing 500s, stop the server, delete `.next`, and restart. The permanent fix is to move
the project out of the OneDrive-synced tree.
