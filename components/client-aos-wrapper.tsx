"use client";

import { useEffect, useState } from "react";
import AOSProvider from "./aos-provider";

export default function ClientAOSWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // During SSR and initial hydration, render children without AOS
  if (!isMounted) {
    return <>{children}</>;
  }

  // After hydration is complete, render with AOS
  return <AOSProvider>{children}</AOSProvider>;
}
