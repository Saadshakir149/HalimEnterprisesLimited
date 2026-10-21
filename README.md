# Halim Enterprises Limited website

Next.js (App Router) + TypeScript + Tailwind CSS v4, hosted on Vercel at https://www.halimenterpriseslimited.com. The domain, DNS and the info@ mailbox are at Hostinger.

## Development

```bash
npm install
npm run dev           # http://localhost:3000
npm run lint
npm run typecheck
npm test
npm run build
npm run email:test    # sends one test email using .env.local (see .env.example)
npm run check:launch  # lists what is still outstanding before launch
```

Requires Node 20.9 or later (Node 22 recommended).

## Where things live

- `src/app/globals.css`: every design token (colour, type, spacing, radii, shadows)
- `src/content/`: business facts (`site.ts`), services, audiences and all page copy
- `src/components/ui/`: base components
- `/styleguide`: visual reference for the design system (not indexed)
- `.env.example`: every environment variable, with the Hostinger email defaults
- `docs/DEPLOYMENT.md`: how the site is hosted and deployed (Vercel, Hostinger DNS and email)
- `docs/LAUNCH-CHECKLIST.md`: the dashboard steps for going live
- `docs/OPEN-ITEMS.md`: information still needed from the client
- `docs/PROMPTS.md`: the iteration plan (historical)
