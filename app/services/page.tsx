import { Suspense } from "react";
import ServicesClient from "./services-client";

export const metadata = {
  title: "Services | MVT Warehousing",
  description: "Comprehensive transportation and warehousing solutions for your business - Full Truckload, Warehousing, Bulk Transfer, and more.",
};

export default function ServicesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ServicesClient />
    </Suspense>
  );
}
