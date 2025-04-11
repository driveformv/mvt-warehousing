'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { initGA, pageview } from '@/lib/analytics';

export default function AnalyticsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Initialize Google Analytics
    initGA();
  }, []);

  useEffect(() => {
    // Track page views when the route changes
    if (pathname) {
      // Include search parameters if they exist
      const url = searchParams?.size
        ? `${pathname}?${searchParams.toString()}`
        : pathname;
      
      pageview(url);
    }
  }, [pathname, searchParams]);

  return <>{children}</>;
}
