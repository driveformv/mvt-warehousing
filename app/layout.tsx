import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import MainNav from '@/components/layout/main-nav';
import LoginSection from '@/components/layout/login-section';
import Footer from '@/components/layout/footer';
import AOSProvider from '@/components/aos-provider';
import AnalyticsProvider from '@/components/analytics-provider';

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <Suspense fallback={<>Loading analytics...</>}>
          <AnalyticsProvider>
            <AOSProvider>
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
            </AOSProvider>
          </AnalyticsProvider>
        </Suspense>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
