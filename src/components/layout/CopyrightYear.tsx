import { cacheLife } from "next/cache";

/*
 * With Cache Components, reading the clock during prerender must be cached.
 * The year is refreshed daily, so it rolls over on its own on 1 January.
 */
export async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
