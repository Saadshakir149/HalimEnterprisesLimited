import { afterEach, describe, expect, it, vi } from "vitest";

/*
 * Every absolute URL comes from one place (siteUrl): NEXT_PUBLIC_SITE_URL, or
 * the live production address. Production deployments are indexable; Vercel
 * preview deployments are not.
 */
async function load(env: Record<string, string>) {
  vi.resetModules();
  for (const [key, value] of Object.entries(env)) vi.stubEnv(key, value);
  const { pageMetadata } = await import("@/lib/metadata");
  const sitemap = (await import("@/app/sitemap")).default;
  const robots = (await import("@/app/robots")).default;
  const { breadcrumbList, organization } = await import("@/lib/structured-data");
  const { indexingAllowed } = await import("@/lib/env");
  const { siteUrl } = await import("@/content/site");
  return { pageMetadata, sitemap, robots, breadcrumbList, organization, indexingAllowed, siteUrl };
}

const LIVE = "https://www.halimenterpriseslimited.com";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("absolute URLs", () => {
  it("default to the live www address when NEXT_PUBLIC_SITE_URL is unset", async () => {
    const { siteUrl, sitemap, robots, breadcrumbList, organization } = await load({ NEXT_PUBLIC_SITE_URL: "", VERCEL_ENV: "" });
    expect(siteUrl).toBe(LIVE);
    const urls = sitemap().map((entry) => entry.url);
    expect(urls[0]).toBe(LIVE);
    expect(urls.every((url) => url.startsWith(LIVE))).toBe(true);
    expect(robots()).toHaveProperty("sitemap", `${LIVE}/sitemap.xml`);
    expect(breadcrumbList([{ name: "Home", href: "/" }]).itemListElement[0].item).toBe(LIVE);
    expect(organization().url).toBe(LIVE);
  });

  it("use NEXT_PUBLIC_SITE_URL when set, without a trailing slash, and never a vercel.app or localhost address", async () => {
    const { siteUrl, sitemap } = await load({ NEXT_PUBLIC_SITE_URL: `${LIVE}/` });
    expect(siteUrl).toBe(LIVE);
    expect(JSON.stringify(sitemap())).not.toMatch(/vercel\.app|localhost|halimaccountants/);
  });

  it("sitemap lists indexable pages only", async () => {
    const { sitemap } = await load({});
    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toHaveLength(19); // home, 2 indexes, 7 services, 5 audiences, about, contact, consultation, FAQs
    expect(urls).toContain(`${LIVE}/services/bookkeeping`);
    expect(urls.join(" ")).not.toMatch(/send-documents|styleguide|self-assessment|privacy-policy/);
  });

  it("page metadata carries a relative canonical and og:url, resolved by the layout's metadataBase", async () => {
    const { pageMetadata } = await load({});
    const meta = pageMetadata({ title: "Payroll Services for Small Employers", description: "d", path: "/services/payroll" });
    expect(meta.alternates).toEqual({ canonical: "/services/payroll" });
    expect(meta.openGraph).toMatchObject({ url: "/services/payroll", siteName: "Halim Enterprises Limited", locale: "en_GB", title: "Payroll Services for Small Employers | Halim Enterprises Limited" });
    expect(meta.robots).toBeUndefined();
    expect(pageMetadata({ title: "t", description: "d", path: "/terms", noindex: true }).robots).toEqual({ index: false, follow: true });
  });
});

describe("indexing", () => {
  it("allows production deployments and local builds", async () => {
    expect((await load({ VERCEL_ENV: "production" })).indexingAllowed()).toBe(true);
    const local = await load({ VERCEL_ENV: "" });
    expect(local.indexingAllowed()).toBe(true);
    expect(local.robots().rules).toEqual({ userAgent: "*", allow: "/", disallow: "/api/" });
  });

  it("blocks preview deployments completely", async () => {
    const { indexingAllowed, robots } = await load({ VERCEL_ENV: "preview" });
    expect(indexingAllowed()).toBe(false);
    expect(robots()).toEqual({ rules: { userAgent: "*", disallow: "/" } });
  });
});

describe("organisation data", () => {
  it("lists the business email and WhatsApp as contact points, with no telephone or address", async () => {
    const { organization } = await load({});
    const org = organization();
    expect(org.email).toBe("info@halimenterpriseslimited.com");
    expect(org.contactPoint).toEqual([
      expect.objectContaining({ "@type": "ContactPoint", email: "info@halimenterpriseslimited.com" }),
      expect.objectContaining({ "@type": "ContactPoint", name: "WhatsApp", url: expect.stringMatching(/^https:\/\/wa\.me\/447884607135/) }),
    ]);
    expect(JSON.stringify(org)).not.toMatch(/telephone|address|Shaftesbury|ratingValue/);
  });
});
