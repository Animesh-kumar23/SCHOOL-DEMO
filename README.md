# RR International School & Hostel — Website & CMS

The official website for **RR International School & Hostel**, Jitwarpur, Samastipur — a
value-based school (Nursery to Class 10) with a hostel and in-house entrance-exam coaching.
It ships with a self-service admin dashboard so school staff can manage all content (news,
events, notices, gallery, staff, and site settings) without a developer.

**Live:** <https://rrworld.org>

Built with **Next.js 14 (App Router) + TypeScript**, **MongoDB/Mongoose**, **NextAuth**,
**Tailwind + shadcn/ui**, **Tiptap**, and **Cloudinary**. Deploys free on **Vercel**.
Bilingual (English / हिंदी) with a cookie-based locale toggle.

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
| `npm run build` | Production build |
| `npm run start` | Serve a production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` — full type check |
| `npm run seed:admin` | Create/update an admin user from `SEED_ADMIN_*` env vars |
| `npm run seed:content` | Seed demo content (`-- --fresh` to wipe first) |

## What admins can manage

Everything visitors see is editable from `/admin` and revalidates on the public site within
~1s of saving:

- **News, Events, Notices, Gallery, Staff** — full create/edit/delete with image uploads.
- **Settings** — school name, logo, homepage hero image, address, phone, email, social links,
  Google Maps embed, and the editable **Founder's Message** (name, photo, designation, text)
  shown on the home and about pages.
- **Submissions** — contact-form enquiries land here (and are also emailed if Resend is set up).

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
  Static brand images (logo, default hero, gallery seeds) live in `public/rr/`.
- **Contact form** posts to `/api/contact` → validates → saves a Submission → emails the
  office via Resend (best-effort; the submission is saved even if email isn't configured).
- **SEO/PWA** — sitemap, robots, OpenGraph share image, favicons (`app/favicon.ico`,
  `app/icon.png`, `app/apple-icon.png`) and a web manifest (`app/manifest.ts`).

See `lib/`, `models/`, and `components/` for the details.

## Project structure

```
app/(public)/      Public pages (home, academics, news, events, faculty, gallery, contact)
app/admin/         Admin dashboard (auth-gated CRUD)
app/api/           Route handlers (auth, resources, upload, contact, settings)
components/public/ Public UI (Hero, NewsCard, GalleryGrid, …)
components/admin/  Admin UI (DataTable, forms, RichTextEditor, ImageUploader)
components/ui/     shadcn primitives
lib/i18n/          English + Hindi dictionaries
lib/               db, auth, queries, crud, validation, cloudinary, email
models/            Mongoose schemas
public/rr/         Static school images (logo, hero, gallery)
scripts/           seed-admin, seed-content
```

## Deployment & handover

- **Deploy:** see [DEPLOYMENT.md](DEPLOYMENT.md) — a step-by-step checklist for MongoDB Atlas,
  Cloudinary, Vercel, and the custom domain.
- **For school staff:** see [ADMIN-GUIDE.md](ADMIN-GUIDE.md) — how to manage content.
- **Env vars:** `.env.example` is the template; the full list (and where each value comes
  from) is in the deployment guide. The live site reads content from the database, so after
  changing an env var on Vercel you must redeploy (uncheck "Use existing Build Cache" for
  `NEXT_PUBLIC_*` values, which are inlined at build time).

## Notes

- The `docs/` folder (source photos, PDFs, working files) is intentionally git-ignored.
- Content shown on the live site comes from MongoDB, not the seed files — edit it in `/admin`
  (or re-seed) rather than expecting code changes to demo content to appear in production.
