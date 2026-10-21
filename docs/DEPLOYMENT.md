# Deployment

How the Halim Enterprises Limited website is hosted and deployed. For the one-off launch steps, follow `docs/LAUNCH-CHECKLIST.md`.

## Overview

| Part | Where | Notes |
|---|---|---|
| Website | **Vercel** | Deployed from GitHub (`Saadshakir149/HalimEnterprisesLimited`, branch `main`). Must be on a **Pro** plan: Hobby forbids commercial use. |
| Domain registration | **Hostinger** | `halimenterpriseslimited.com` |
| DNS | **Hostinger** | `A @ → 216.198.79.1` (Vercel); `CNAME www →` the target Vercel shows for www. The apex 308-redirects to `https://www.halimenterpriseslimited.com`. |
| Email | **Hostinger** | Mailbox `info@halimenterpriseslimited.com`. The site sends through its SMTP (`smtp.hostinger.com`, port 465). |

**Never change Hostinger's email DNS records** (MX, SPF, DKIM, DMARC, autodiscover/autoconfig). Only the website records above point at Vercel.

## How a deployment works

- **Production:** every push to `main` builds and deploys to https://www.halimenterpriseslimited.com.
- **Previews:** pushes to other branches, and pull requests, get a `*.vercel.app` preview deployment. Previews are never indexed (see below).
- **After changing environment variables:** redeploy (Vercel → Deployments → the latest production deployment → ⋯ → Redeploy). Values are read at build time, so a redeploy is needed for changes to take effect.
- To ship a preview to production, merge it into `main` rather than using "Promote". A production build is then made with production settings, including `VERCEL_ENV=production` (which controls indexing).

## Environment variables

Set these in Vercel → Project → Settings → Environment Variables, for **Production**. `.env.example` documents each one.

| Variable | Value | Secret? |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://www.halimenterpriseslimited.com` | No |
| `SMTP_HOST` | `smtp.hostinger.com` (confirm in hPanel → Emails → Connect apps & devices) | No |
| `SMTP_PORT` | `465` | No |
| `SMTP_SECURE` | `true` | No |
| `SMTP_USER` | `info@halimenterpriseslimited.com` | No |
| `SMTP_PASS` | The mailbox password | **Yes**: Vercel and `.env.local` only, never in Git |
| `MAIL_FROM` | `Halim Enterprises <info@halimenterpriseslimited.com>` (no quotes in Vercel) | No |
| `MAIL_TO` | `info@halimenterpriseslimited.com` | No |
| `GOOGLE_SITE_VERIFICATION` | Optional: only if verifying Search Console with the HTML tag instead of DNS | No |

Optional for previews: add the same SMTP and MAIL variables to the **Preview** environment if you want the forms to send from preview deployments. Without them, preview forms return the friendly "not available" message.

## Search engines and indexing

Controlled automatically by Vercel's `VERCEL_ENV` (no variable to set):

| Deployment | `VERCEL_ENV` | Result |
|---|---|---|
| www.halimenterpriseslimited.com | `production` | Indexable. `robots.txt` allows crawling and lists the sitemap. Draft legal pages, `/send-documents` and `/styleguide` stay noindexed. |
| `*.vercel.app` previews | `preview` | `<meta name="robots" content="noindex, nofollow">` on every page, and `robots.txt` disallows everything. |

This relies on Vercel exposing system environment variables to the build. That is on by default: Project → Settings → Environment Variables → "Automatically expose System Environment Variables".

Every absolute URL (metadataBase, canonical links, `og:url`, `sitemap.xml`, `robots.txt`, JSON-LD and the address in emails) comes from `siteUrl` in `src/content/site.ts`: `NEXT_PUBLIC_SITE_URL`, falling back to the live www address. Nothing uses the `vercel.app` address.

## Forms and email on Vercel

- The enquiry and callback forms post to `/api/enquiry` and `/api/callback`, which run as serverless functions.
- **Origin check:** accepts posts from `NEXT_PUBLIC_SITE_URL`, and on previews from the preview's own URL. Extra origins can go in `FORM_ALLOWED_ORIGINS`.
- **Email** (`src/lib/email.ts`):
  - SMTP over port 465 with 8–12 second timeouts.
  - The From address is always `SMTP_USER`, for SPF/DKIM alignment.
  - The visitor's address goes only in Reply-To.
  - If SMTP isn't configured, the forms answer 503 with a friendly message.
  - Failures log only the error type and SMTP code, never form contents.
- **Rate limiting** is in memory, per function instance (see `docs/OPEN-ITEMS.md`).
- **Test SMTP locally:** put the values in `.env.local` and run `npm run email:test`.

## Checks before every production deploy

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run check:launch   # lists what is still outstanding; exits 1 until everything is done
```
