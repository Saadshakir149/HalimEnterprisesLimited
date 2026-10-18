import { LegalPage, legalMetadata } from "@/components/sections/LegalPage";
import { legalDocuments } from "@/content/legal";

export const metadata = legalMetadata(legalDocuments.cookies);

export default function CookiePolicyPage() {
  return <LegalPage doc={legalDocuments.cookies} />;
}
