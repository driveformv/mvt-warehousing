"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AOSProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true, // Set to true to prevent re-animation and potential mismatches
      easing: "ease-out-cubic",
      mirror: false, // Set to false to simplify animation behavior
      offset: 50,
      delay: 100,
    });
  }, []);

  // Refresh AOS when the route changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
      AOS.refresh();
    }
  }, [pathname]);

  return <>{children}</>;
}
