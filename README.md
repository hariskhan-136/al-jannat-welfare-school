# Al Jannat Welfare School Nowshera — Website

A modern, production-ready school website built with Next.js 15 (App Router), TypeScript,
Tailwind CSS, shadcn/ui, Prisma/PostgreSQL, and Framer Motion.

## Status: All 7 stages delivered ✅

1. ✅ **Foundation** — config, Prisma schema, theme system, layout, homepage
2. ✅ **Admissions** — form (React Hook Form + Zod), Cloudinary uploads, `/api/admissions`, email notifications
3. ✅ **Academics, Fee Structure, Gallery** — all three fetch live data from Postgres
4. ✅ **About + Contact** — story/leadership page, contact form + map
5. ✅ **Admin auth + dashboard shell** — login, JWT sessions, protected routes
6. ✅ **Admin dashboard modules** — admissions review, gallery manager, fee editor, content editor
7. ✅ **SEO + QA pass** — sitemap, robots.txt, and a real build-tool QA pass (this delivery)

## Stage 7: SEO + QA pass

- `app/sitemap.ts` / `app/robots.ts` — Next's metadata-route convention;
  `/admin` and `/api` are excluded from the sitemap and disallowed in robots.txt
- `.gitignore` — was missing since Stage 1; added before this goes anywhere near
  a repo (`node_modules`, `.env`, `.next`, etc.)
- `app/not-found.tsx`, `app/(site)/not-found.tsx`, `app/(site)/error.tsx` —
  branded 404 and error-boundary pages instead of the framework default

### What the QA pass actually found

I ran `npm install` and `tsc --noEmit` for real rather than only reviewing by
eye, which caught issues a read-through wouldn't have:

1. **Fixed — invalid Tailwind classes.** `h-4.5`, `w-4.5`, `h-13`, and `h-18`
   aren't in Tailwind's default spacing scale, so they'd have silently compiled
   to *no sizing at all* on several icons and the navbar height. Replaced with
   real values across `components/admin/*`, `components/contact/*`,
   `components/ui/button.tsx`, and `components/layout/navbar.tsx`.

2. **Fixed — critical dependency vulnerability.** The pinned `next@15.1.0`
   is affected by **CVE-2025-66478**, a CVSS 10.0 unauthenticated RCE in the
   App Router's RSC protocol, plus a follow-up December 2025 DoS/source-exposure
   advisory. Bumped to `next@15.1.11` and `react`/`react-dom@^19.2.4`, the
   confirmed patched versions for this release line. **If you're picking this
   project back up later, check for newer patches before deploying** —
   dependency CVEs don't stop after this handoff.

3. **Fixed — a real bug from the Next.js 15 upgrade.** Next.js 15 made
   `cookies()` (from `next/headers`) and dynamic route `params` asynchronous —
   a breaking change from Next 14. My original code called them
   synchronously. Fixed in `lib/auth.ts`'s `getSession()` and in all four
   dynamic API routes (`admissions/[id]`, `gallery/[id]`, `fees/[classId]`,
   `content/[key]`).

4. **Verified, not just assumed:** every one of the 42 `lucide-react` icons
   used across the project resolves to a real export; every non-Prisma
   dependency (`zod`, `jose`, `bcryptjs`, Radix primitives, `react-hook-form`,
   `framer-motion`, etc.) installs cleanly; every image has real descriptive
   `alt` text; every internal `@/` import resolves to a file that exists.

### One caveat worth knowing about

This sandbox can't reach `binaries.prisma.sh`, so `prisma generate` fails here
and I couldn't get a 100% clean `tsc --noEmit` run — the remaining ~10 errors
are all `PrismaClient`-typed-as-`any` cascades (implicit-`any` on `.map()`
callbacks over Prisma query results, and two enum imports that only exist
once the client is generated against our schema). I traced each one back to
confirm that's genuinely the cause, not a real bug. Once you run
`npm install && npx prisma generate` somewhere with normal internet access,
these resolve on their own — but run `npx tsc --noEmit` yourself after that
as a final check before deploying, since I couldn't confirm a 100% clean
result end-to-end in this environment.

## Stage 6 additions

- `lib/require-admin.ts` — the one canonical guard every admin API route uses;
  returns `{ session }` on success or a ready-to-return `{ response }` (401) on
  failure, so route handlers stay a two-line check
- **Admissions review** (`/admin/dashboard/admissions`) — full table with a
  status filter (Pending/Reviewing/Accepted/Rejected), direct links to the
  uploaded photo and birth certificate, and an inline status dropdown that
  PATCHes `/api/admissions/[id]` with optimistic UI (reverts on failure)
- **Gallery manager** (`/admin/dashboard/gallery`) — upload form (title,
  category, image) that posts to `/api/gallery`, uploads straight to
  Cloudinary, and stores the `cloudinaryPublicId`; delete removes from both
  Cloudinary and Postgres via `/api/gallery/[id]`
- **Fee editor** (`/admin/dashboard/fees`) — editable table, per-row inline
  save against `/api/fees/[classId]` (upserts, so it works even for a class
  that didn't have a fee row yet)
- **Site content editor** (`/admin/dashboard/content`) — edits the homepage
  stats block through the generic `/api/content/[key]` endpoint (GET is public,
  PUT is admin-only) — **the homepage's animated counters now read this data
  live** instead of hardcoded numbers, so this is the first real end-to-end
  admin-to-public-site edit in the project
- Every mutating admin route validates with Zod and checks `requireAdmin()`
  before touching the database

## Stage 5 additions

- **Restructured routing**: every public page moved under `app/(site)/` — a route
  group that carries the navbar/footer/floating buttons via its own layout. URLs
  are unchanged (`/`, `/about`, etc.); this just lets `/admin` have completely
  separate chrome instead of the public site wrapped around the dashboard.
  `app/layout.tsx` is now a thin shell: fonts, theme, JSON-LD, skip link.
- `lib/auth.ts` — session signing/verification with `jose` (edge-compatible, so
  it works in middleware), plus `bcryptjs` password hashing helpers
- `middleware.ts` — protects every `/admin/dashboard/*` route at the edge;
  redirects unauthenticated visitors to `/admin/login?from=...`, and redirects
  already-logged-in visitors away from the login page
- `app/api/login` / `app/api/logout` — verifies credentials against the `Admin`
  table (bcrypt compare, generic "invalid email or password" message either way),
  issues/clears an `httpOnly`, `sameSite=lax` session cookie
- `app/admin/login` — standalone login page (noindex, no public chrome)
- `app/admin/dashboard/layout.tsx` — server-side session guard (defense in depth
  behind the middleware) wrapping the sidebar/topbar shell
- `app/admin/dashboard/page.tsx` — live overview: total/pending applications,
  unread messages, gallery count, and the 5 most recent applications — all
  queried directly from Postgres
- Placeholder pages for Admissions/Gallery/Fees/Content management screens, so
  every sidebar link resolves — these get built out fully in Stage 6

## Stage 4 additions

- **About** (`app/about`) — story intro, reuses the homepage mission/vision/values
  section, plus a principal's message block (photo + quote)
- **Contact** (`app/contact`) — info cards (address/phone/email/office timing),
  a Google Maps `<iframe>` embed, and a full contact form
- `lib/validations/contact.ts` — Zod schema for the contact form
- `app/api/contact/route.ts` — validates, writes to the `Message` table, and
  emails the office via the same Nodemailer transporter from Stage 2 (email
  failure doesn't block the success response, same pattern as admissions)
- `components/contact/` — the form (inline errors, animated success state) and
  the info/map sidebar

## Stage 3 additions

- `components/ui/tabs.tsx` — Radix-based Tabs primitive, reused by Academics and Gallery
- **Academics** (`app/academics`) — Server Component queries `SchoolClass` with its
  `subjects` and latest `syllabus`, grouped by section (Pre-Primary → Primary →
  Middle → Matric). Client `AcademicsTabs` renders subject chips per class and a
  "Download Syllabus" button wired to the seeded PDF path.
- **Fee Structure** (`app/fee-structure`) — Server Component queries `SchoolClass`
  with its `Fee`. Renders as a real `<table>` on desktop and stacked cards on
  mobile — same data, no layout compromise either way.
- **Gallery** (`app/gallery`) — Server Component queries `GalleryItem`. Client
  `GalleryGrid` adds category filtering (Campus / Events / Classrooms / Sports /
  Labs) with animated re-layout, and a full lightbox preview on click
  (`yet-another-react-lightbox`).
- `prisma/seed.ts` extended — now also seeds subjects per section, one syllabus
  PDF placeholder per class, and 10 sample gallery entries.
- All three pages use Next's `revalidate` (ISR) so admin edits in Stage 6 show
  up without a full redeploy.

## Stage 2 additions

- `lib/validations/admission.ts` — shared Zod schema (client + server), including
  file-type/size validation for the photo and birth certificate
- `lib/cloudinary.ts` — server-side upload helper (buffers the File, streams to
  Cloudinary, returns a secure URL + public ID for later deletion)
- `lib/email.ts` — Nodemailer transporter; sends a staff notification **and** a
  parent confirmation email on every submission
- `app/api/admissions/route.ts` — `POST` handler: validates, uploads both files
  in parallel, writes the record with Prisma, emails both parties (email failure
  doesn't fail the submission — the applicant still gets their success state)
- `components/admissions/` — the form itself (drag-and-drop file fields, Zod
  inline errors, animated success state), plus a process-steps/required-documents
  sidebar
- `app/admissions/page.tsx` — assembles it all with page-level SEO metadata

The admissions **GET** endpoint (for listing applications) and the admin auth
guard that protects it are wired together in Stage 5, so they ship as one
consistent piece rather than a route with no way to call it yet.

## What's included so far

- Full project scaffold & folder structure
- `package.json` with every dependency from the spec pinned
- Tailwind config with the brand design tokens (Emerald / Sky / Slate palette,
  Plus Jakarta Sans + Inter + Spline Sans Mono type system, soft shadow scale,
  and a signature 8-point geometric star motif used sparingly as a background texture)
- Prisma schema covering all 10 required tables (admins, admissions, gallery,
  events, news, classes, subjects, fees, syllabuses, messages, site content)
- Seed script with realistic starter data (classes, fees, admin login)
- Light/Dark mode via `next-themes`, persisted automatically
- Sticky responsive navbar, footer, floating WhatsApp + scroll-to-top buttons
- Fully animated, responsive homepage: hero, mission/vision/values, animated
  stat counters, features grid, "why choose us", and a closing CTA
- Global SEO metadata, Open Graph tags, and JSON-LD `School` structured data
- Accessibility floor: skip-to-content link, visible focus rings, semantic
  headings, `aria-label`s on icon-only controls, `prefers-reduced-motion` support

## Getting started

```bash
npm install
cp .env.example .env       # then fill in your real DATABASE_URL, SMTP, Cloudinary keys
npx prisma db push         # create tables in your PostgreSQL database
npx prisma db seed         # seed classes, fees, and the default admin login
npm run dev
```

Default seeded admin login (change immediately in production):
- URL: `/admin/login`
- Email: `admin@aljannatschool.edu.pk`
- Password: `ChangeMe123!`

Set a real, long `JWT_SECRET` in `.env` before deploying — sessions are signed
with it and anyone with the secret can forge an admin session.

## Images you'll need to add

Drop real photos into `public/images/`:
- `hero-campus.jpg` — homepage hero (4:3 or wider)
- `classroom.jpg` — "Why Choose Us" section
- `og-cover.jpg` — 1200×630 social share image
- `apple-touch-icon.png`, `favicon.ico`
- `principal.jpg` — About page leadership message
- `gallery/campus-1.jpg`, `campus-2.jpg`, `events-1.jpg`, `events-2.jpg`,
  `classroom-1.jpg`, `classroom-2.jpg`, `sports-1.jpg`, `sports-2.jpg`,
  `labs-1.jpg`, `labs-2.jpg` — referenced by the seeded gallery rows (once the
  admin Gallery module ships in Stage 6, you can replace these with real
  Cloudinary uploads instead)

Syllabus PDFs are seeded pointing at `/syllabus/<class-name>.pdf` — add real
files under `public/syllabus/` with matching names, or replace the URLs from
the admin dashboard once Stage 6 ships.

## Folder structure

```
app/                  Next.js App Router pages & API routes
components/
  layout/             Navbar, Footer, floating buttons
  home/               Homepage sections
  ui/                 shadcn/ui primitives (Button, Card, Input, Select...)
  shared/             Cross-page shared components (theme toggle, etc.)
features/             Feature-specific logic (admissions, gallery, fees...) — added in later stages
lib/                  Prisma client, utils, constants
hooks/                Custom React hooks
prisma/               schema.prisma + seed.ts
types/                Shared TypeScript interfaces
public/               Static assets, uploads
```

## Next step

Reply to continue and I'll deliver **Stage 2: the Admissions page** — the
online form (React Hook Form + Zod), file uploads, the `/api/admissions`
route (Prisma write + Nodemailer notification), and the success state.
