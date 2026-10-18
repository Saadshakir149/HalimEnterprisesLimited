/** True only under `next dev`. Use it to show warnings that must never reach visitors. */
export const isDev = process.env.NODE_ENV === "development";
