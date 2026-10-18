import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  /*
   * Off on purpose. With Partial Prefetching, unknown [slug] URLs stream the
   * prerendered shell before notFound() runs, so they answer 200 instead of 404.
   * Without it they render blocking and return a real 404.
   */
  partialPrefetching: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
