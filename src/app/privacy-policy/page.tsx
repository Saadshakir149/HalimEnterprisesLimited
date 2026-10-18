import { LegalPage, legalMetadata } from "@/components/sections/LegalPage";
import { legalDocuments } from "@/content/legal";

export const metadata = legalMetadata(legalDocuments.privacy);

export default function PrivacyPolicyPage() {
  return <LegalPage doc={legalDocuments.privacy} />;
}
