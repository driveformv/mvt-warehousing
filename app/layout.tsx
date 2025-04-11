import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import MainNav from '@/components/layout/main-nav';
import Footer from '@/components/layout/footer';
import AOSProvider from '@/components/aos-provider';

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
        <AOSProvider>
          <MainNav />
          
          <main className="min-h-screen pt-20">
            {children}
          </main>
          
          <Footer />
        </AOSProvider>
      </body>
    </html>
  );
}
