/** True only under `next dev`. Use it to show warnings that must never reach visitors. */
export const isDev = process.env.NODE_ENV === "development";

/**
 * Whether search engines may index this deployment.
 *
 * Vercel sets VERCEL_ENV on every build: "production" for the live site,
 * "preview" for branch and pull-request deployments (*.vercel.app) and
 * "development" for `vercel dev`. Only production is indexed; every other
 * Vercel deployment gets a site-wide noindex and a robots.txt that blocks
 * crawling. Builds outside Vercel (no VERCEL_ENV, e.g. a local `npm run build`)
 * behave like production, since they are never public.
 *
 * Pages are prerendered at build time, so this is decided per deployment by
 * the environment it was built in. Nothing needs setting by hand: Vercel
 * provides VERCEL_ENV automatically.
 */
export function indexingAllowed(): boolean {
  const vercelEnv = process.env.VERCEL_ENV;
  return !vercelEnv || vercelEnv === "production";
}
