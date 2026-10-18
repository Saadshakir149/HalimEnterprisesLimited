/**
 * Renders structured data. "<" is escaped so content can never close the
 * script element early. Renders nothing for null (data that needs the
 * confirmed production domain, before it is set).
 */
export function JsonLd({ data }: { data: object | null }) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
