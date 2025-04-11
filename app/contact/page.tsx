import { Suspense } from "react";
import ContactClient from "./contact-client";

export const metadata = {
  title: "Contact Us | MVT Warehousing",
  description: "Get in touch with MVT Warehousing for all your transportation and warehousing needs. Contact our team today.",
};

export default function ContactPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContactClient />
    </Suspense>
  );
}
