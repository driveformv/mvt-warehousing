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
      once: false,
      easing: "ease-out-cubic",
      mirror: true,
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
