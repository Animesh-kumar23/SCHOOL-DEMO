# Deployment Guide

Step-by-step instructions to take this project live on free tiers. Target cost: **$0/month**
(the client pays only for the domain, ~₹500–₹1000/year).

> **Account ownership:** Create every account below under the **client's** email from day one
> (MongoDB Atlas, Cloudinary, Resend, Netlify, domain registrar). This avoids a painful
> migration later. The developer can be added as a collaborator.

---

## 0. Accounts you'll need

| Service | Plan | Used for |
|---|---|---|
| [MongoDB Atlas](https://www.mongodb.com/atlas) | M0 (free, 512 MB) | Database |
| [Cloudinary](https://cloudinary.com) | Free (25 GB) | Image & PDF uploads |
| [Resend](https://resend.com) | Free (100 emails/day) | Optional contact-form email |
| [Netlify](https://www.netlify.com) | Free | Hosting + CDN |
| Domain registrar | paid | Custom domain; this project uses Cloudflare Registrar |
| [GitHub](https://github.com) | free | Source code + auto-deploy |

---

## 1. MongoDB Atlas

1. Create a free **M0** cluster.
2. **Database Access** → add a database user (username + strong password). Save these.
3. **Network Access** → add IP `0.0.0.0/0` (serverless hosting uses dynamic IPs).
4. **Connect → Drivers** → copy the connection string. It looks like:
   `mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
5. Add the database name before the `?` — e.g. `.../school?retryWrites=true...`. This is your
   `MONGODB_URI`.

## 2. Cloudinary

1. From the dashboard, copy **Cloud name**, **API Key**, **API Secret**.
2. These become `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`,
   and `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` (same value as the cloud name).

## 3. Resend

1. Create an API key → `RESEND_API_KEY`.
2. For real email, verify the school's domain in Resend and set `RESEND_FROM_EMAIL` to an
   address on it (e.g. `no-reply@school.edu.in`). Until the domain is verified you can use
   `onboarding@resend.dev` for testing.
3. `CONTACT_INBOX_EMAIL` = where enquiries should arrive (e.g. the school office inbox).

## 4. Push to GitHub

```bash
git init           # if not already a repo
git add -A
git commit -m "School website"
git branch -M main
git remote add origin https://github.com/<client-org>/school-website.git
git push -u origin main
```

> `.env.local` is gitignored — secrets are **never** committed. They go into Netlify (next step).

## 5. Netlify

1. **Add new project → Import an existing project** and choose the GitHub repo.
2. Netlify reads `netlify.toml`; keep the repo root as the base directory.
3. Build settings should be:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. **Environment variables** → import `.env.local` or add every row from the table below.
5. **Deploy.** First build takes a few minutes.

### Environment variables to set in Netlify

| Variable | Where it comes from | Example |
|---|---|---|
| `MONGODB_URI` | Atlas step 1 | `mongodb+srv://user:pass@cluster0.../school?...` |
| `NEXTAUTH_SECRET` | `openssl rand -base64 32` | long random string |
| `NEXTAUTH_URL` | your production URL | `https://rrworld.org` |
| `NEXT_PUBLIC_SITE_URL` | your production URL | `https://rrworld.org` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary | `school-media` |
| `CLOUDINARY_API_KEY` | Cloudinary | `1234567890` |
| `CLOUDINARY_API_SECRET` | Cloudinary | `••••••••` |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary (same as cloud name) | `school-media` |
| `RESEND_API_KEY` | Resend, optional if email notifications are unused | `re_••••` or temporary placeholder |
| `RESEND_FROM_EMAIL` | Resend verified sender, optional | `no-reply@school.edu.in` |
| `CONTACT_INBOX_EMAIL` | school office inbox, optional for email notification | `office@school.edu.in` |
| `NEXT_PUBLIC_GA_ID` | GA4 Measurement ID, optional | `G-XXXXXXXXXX` |

> Set `NEXTAUTH_URL` / `NEXT_PUBLIC_SITE_URL` to the final domain once it's connected
> (step 7); use the `*.netlify.app` URL until then, and update + redeploy.
> For `NEXT_PUBLIC_*` changes, use **Clear cache and deploy site**.

## 6. Create the production admin user

The seed script talks to whatever `MONGODB_URI` is in your local `.env.local`. To create the
admin in the **production** database:

1. Temporarily set `.env.local` `MONGODB_URI` to the **Atlas** URI, and set
   `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` / `SEED_ADMIN_NAME` to the real admin.
2. Run `npm run seed:admin`.
3. Revert `.env.local` back to your local DB.

To add more admins, repeat with a different `SEED_ADMIN_EMAIL`. (All seeded users are
`superadmin`. There's no in-app user management UI yet — see "Known limitations".)

## 7. Custom domain

1. In Netlify → **Domain management** → add `rrworld.org`; Netlify also adds
   `www.rrworld.org` as a redirect to the primary domain.
2. In Cloudflare DNS, remove old Vercel web records for `@` and `www`.
3. Add these DNS records:
   - `CNAME @ apex-loadbalancer.netlify.com` with proxy status **DNS only**
   - `CNAME www <your-netlify-subdomain>.netlify.app` with proxy status **DNS only**
4. Keep Cloudflare as the DNS provider; Cloudflare Registrar domains must use Cloudflare DNS.
5. In Netlify, verify DNS and provision the Let's Encrypt certificate.
6. Update `NEXTAUTH_URL` and `NEXT_PUBLIC_SITE_URL` to `https://rrworld.org` → redeploy.

## 8. Production smoke test

- [ ] Home page loads over HTTPS; padlock shows valid SSL.
- [ ] Every nav page renders (About, Academics, Admissions, Faculty, Gallery, News, Events, Notices, Contact).
- [ ] A news/event detail page opens.
- [ ] `/sitemap.xml` and `/robots.txt` load.
- [ ] Admin login works at `/admin/login`.
- [ ] Create a test News item → it appears on `/news` within seconds → delete it.
- [ ] Upload an image in the admin (lands in the Cloudinary dashboard).
- [ ] Submit the contact form → appears in admin **Submissions**. Email arrives at
      `CONTACT_INBOX_EMAIL` only if Resend is fully configured.
- [ ] Atlas / Cloudinary / Resend dashboards show production traffic.

## 9. After launch

- Record short Loom walkthroughs (add news, upload gallery, post a notice, edit settings, reset a password).
- Hand over the credentials sheet (template below) and [ADMIN-GUIDE.md](ADMIN-GUIDE.md).
- 30-day bug-fix support included; new features billed separately.

---

## Credentials sheet (fill in & hand to the client — do NOT commit real values)

```
Live URL:            https://__________________________
Admin login:         https://__________________________/admin/login
  Admin email:       __________________________
  Admin password:    __________________________  (change after first login*)

GitHub repo:         https://github.com/__________________________
Netlify project:     https://app.netlify.com/sites/__________________________
MongoDB Atlas:       https://cloud.mongodb.com  (org: __________)
Cloudinary:          https://cloudinary.com/console  (cloud: __________)
Resend:              https://resend.com  (from: __________)
Domain registrar:    __________________________
```

\* Password changes are done by the developer via `npm run seed:admin` (see step 6) — there
is no self-service password reset in the UI yet.

## Known limitations (candidate v2 upsells)

- No in-app **user management** or self-service **password reset** (use the seed script).
- No "Pages" editor for home/about copy — that text is in `lib/demo-content.ts` for now.
- No online admission form, student/parent portal, or payments.
