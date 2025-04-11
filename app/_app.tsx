// This file is not used in the App Router
// It's kept for reference only
// The App Router uses app/layout.tsx instead

import { Suspense } from 'react';
import type { AppProps } from 'next/app';

// This file is not used in the App Router
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...pageProps} />
    </Suspense>
  );
}
