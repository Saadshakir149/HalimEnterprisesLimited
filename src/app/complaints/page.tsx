import { LegalPage, legalMetadata } from "@/components/sections/LegalPage";
import { legalDocuments } from "@/content/legal";

export const metadata = legalMetadata(legalDocuments.complaints);

export default function ComplaintsPage() {
  return <LegalPage doc={legalDocuments.complaints} />;
}
