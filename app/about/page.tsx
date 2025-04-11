import { Suspense } from "react";
import AboutClient from "./about-client";

export const metadata = {
  title: "About Us | MVT Warehousing",
  description: "Learn about MVT Warehousing's story, mission, values, and leadership team. Your trusted partner in transportation and warehousing since 1986.",
};

export default function AboutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AboutClient />
    </Suspense>
  );
}
