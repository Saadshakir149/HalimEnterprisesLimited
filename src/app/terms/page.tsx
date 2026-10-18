import { LegalPage, legalMetadata } from "@/components/sections/LegalPage";
import { legalDocuments } from "@/content/legal";

export const metadata = legalMetadata(legalDocuments.terms);

export default function TermsPage() {
  return <LegalPage doc={legalDocuments.terms} />;
}
