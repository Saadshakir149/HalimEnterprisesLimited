# Halim Enterprises Limited website

Next.js (App Router) + TypeScript + Tailwind CSS v4, to be hosted on Hostinger as a Node.js app.

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm run build
```

Requires Node 20.9 or later (Hostinger runs Node 22).

## Where things live

- `src/app/globals.css`: every design token (colour, type, spacing, radii, shadows)
- `src/content/`: business facts (`site.ts`), services and audiences
- `src/components/ui/`: base components
- `/styleguide`: visual reference for the design system (not indexed)
- `docs/OPEN-ITEMS.md`: information still needed from the client
- `docs/PROMPTS.md`: the iteration plan
