"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AOSProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Only initialize AOS after component is fully mounted
  useEffect(() => {
    // Set mounted to true after the first render cycle is complete
    setMounted(true);
    
    // Initialize AOS only on the client side
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
      mirror: false,
      offset: 50,
      delay: 100,
      disable: 'mobile',
      // This is the key fix - don't initialize AOS until after hydration
      startEvent: 'DOMContentLoaded',
      // Disable AOS on elements until after hydration
      initClassName: mounted ? 'aos-init' : '',
      animatedClassName: mounted ? 'aos-animate' : '',
    });
    
    // Refresh AOS after a short delay to ensure hydration is complete
    const timer = setTimeout(() => {
      AOS.refresh();
    }, 100);
    
    return () => clearTimeout(timer);
  }, [mounted]);

  // Refresh AOS when the route changes
  useEffect(() => {
    if (typeof window !== "undefined" && mounted) {
      window.scrollTo(0, 0);
      AOS.refresh();
    }
  }, [pathname, mounted]);

  return <>{children}</>;
}
