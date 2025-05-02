import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import MainNav from '@/components/layout/main-nav';
import LoginSection from '@/components/layout/login-section';
import Footer from '@/components/layout/footer';
import ClientAOSWrapper from '@/components/client-aos-wrapper';
import AnalyticsProvider from '@/components/analytics-provider';
import StructuredData from '@/components/structured-data';

// Import Inter with multiple weights for better typography hierarchy
const inter = Inter({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'MVT Warehousing | Premium Integrated Logistics Services',
  description: 'Your strategic partner for transportation, warehousing, and logistics services',
  icons: {
    icon: '/logos/MVT Logo 500X500.svg',
    apple: '/logos/MVT Logo 500X500.svg',
  },
  openGraph: {
    title: 'MVT Warehousing | Premium Integrated Logistics Services',
    description: 'Your strategic partner for transportation, warehousing, and logistics services',
    type: 'website',
    locale: 'en_US',
    url: 'https://www.mvtwarehousing.com',
    siteName: 'MVT Warehousing',
    images: [{
      url: '/images/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'MVT Warehousing'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MVT Warehousing | Premium Integrated Logistics Services',
    description: 'Your strategic partner for transportation, warehousing, and logistics services',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.mvtwarehousing.com'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <StructuredData />
        <Suspense fallback={<>Loading analytics...</>}>
          <AnalyticsProvider>
            <ClientAOSWrapper>
              <Suspense fallback={<div className="fixed top-0 left-0 right-0 h-32 bg-white"></div>}>
                <LoginSection />
                <MainNav />
              </Suspense>
              
              <main className="min-h-screen pt-32">
                <Suspense fallback={<div>Loading...</div>}>
                  {children}
                </Suspense>
              </main>
              
              <Footer />
            </ClientAOSWrapper>
          </AnalyticsProvider>
        </Suspense>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
