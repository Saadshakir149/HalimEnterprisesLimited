/** Fills {placeholders} in content-file copy, e.g. fill("Hello {name}", { name: "Saad" }). */
export function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);
}
