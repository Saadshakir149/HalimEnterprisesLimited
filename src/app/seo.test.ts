import { afterEach, describe, expect, it, vi } from "vitest";

/*
 * Canonical URLs, the sitemap and og:url must appear only once the production
 * domain is confirmed (NEXT_PUBLIC_SITE_URL), and never point at the
 * provisional domain or localhost before then.
 */
async function load(url: string) {
  vi.resetModules();
  vi.stubEnv("NEXT_PUBLIC_SITE_URL", url);
  const { pageMetadata } = await import("@/lib/metadata");
  const sitemap = (await import("@/app/sitemap")).default;
  const robots = (await import("@/app/robots")).default;
  const { breadcrumbList, organization } = await import("@/lib/structured-data");
  return { pageMetadata, sitemap, robots, breadcrumbList, organization };
}

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("before the production domain is confirmed", () => {
  it("emits no canonical, og:url, sitemap entries or breadcrumb URLs", async () => {
    const { pageMetadata, sitemap, robots, breadcrumbList, organization } = await load("");
    const meta = pageMetadata({ title: "Bookkeeping Services for UK Small Businesses", description: "d", path: "/services/bookkeeping" });
    expect(meta.alternates).toBeUndefined();
    expect(meta.openGraph).not.toHaveProperty("url");
    expect(sitemap()).toEqual([]);
    expect(robots()).not.toHaveProperty("sitemap");
    expect(breadcrumbList([{ name: "Home", href: "/" }])).toBeNull();
    expect(organization()).not.toHaveProperty("url");
    expect(JSON.stringify(meta)).not.toMatch(/halimaccountants|localhost/);
  });

  it("titles carry the company name once, through the layout template", async () => {
    const { pageMetadata } = await load("");
    const meta = pageMetadata({ title: "Payroll Services for Small Employers", description: "d", path: "/services/payroll" });
    expect(meta.title).toBe("Payroll Services for Small Employers");
    expect(meta.openGraph?.title).toBe("Payroll Services for Small Employers | Halim Enterprises Limited");
    expect(meta.openGraph).toMatchObject({ siteName: "Halim Enterprises Limited", locale: "en_GB" });
  });
});

describe("once NEXT_PUBLIC_SITE_URL is set", () => {
  it("adds canonicals, og:url and a sitemap of indexable pages only", async () => {
    const { pageMetadata, sitemap, robots, breadcrumbList } = await load("https://www.example.co.uk/");
    const meta = pageMetadata({ title: "t", description: "d", path: "/about" });
    expect(meta.alternates).toEqual({ canonical: "/about" });
    expect(meta.openGraph).toHaveProperty("url", "/about");

    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toContain("https://www.example.co.uk");
    expect(urls).toContain("https://www.example.co.uk/services/bookkeeping");
    expect(urls).toContain("https://www.example.co.uk/who-we-help/individuals");
    expect(urls).toHaveLength(19); // home, 2 indexes, 7 services, 5 audiences, about, contact, consultation, FAQs
    expect(urls.join(" ")).not.toMatch(/send-documents|styleguide|self-assessment|privacy-policy/);
    expect(robots()).toHaveProperty("sitemap", "https://www.example.co.uk/sitemap.xml");
    expect(breadcrumbList([{ name: "Home", href: "/" }])?.itemListElement[0].item).toBe("https://www.example.co.uk");
  });
});
