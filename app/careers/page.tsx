import { Suspense } from "react";
import CareersClient from "./careers-client";

export const metadata = {
  title: "Careers | MVT Warehousing",
  description: "Join our team at MVT Warehousing. Explore current job openings and learn about our competitive benefits and supportive work environment.",
};

export default function CareersPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CareersClient />
    </Suspense>
  );
}
