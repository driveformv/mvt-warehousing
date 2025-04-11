import { Suspense } from "react";
import TermsOfServiceContent from "./terms-client";

export const metadata = {
  title: "Terms of Service | MVT Warehousing",
  description: "Terms of Service for MVT Warehousing - Learn about the terms and conditions governing the use of our services.",
};

export default function TermsOfServicePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TermsOfServiceContent />
    </Suspense>
  );
}
