import './globals.css';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import Link from 'next/link';
import { Warehouse } from 'lucide-react';
import Image from 'next/image';

const montserrat = Montserrat({ subsets: ['latin'] });

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
    <html lang="en">
      <body className={montserrat.className}>
        <header className="bg-white shadow-md sticky top-0 z-50">
          <nav className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center">
                <Image src="/logos/MVTW logo_outlined.png" alt="MVT Warehousing Logo" width={160} height={40} />
              </Link>
              <div className="hidden md:flex gap-8">
                <Link href="/" className="text-gray-600 hover:text-mvt-blue transition-colors">Home</Link>
                <Link href="/services" className="text-gray-600 hover:text-mvt-blue transition-colors">Services</Link>
                <Link href="/about" className="text-gray-600 hover:text-mvt-blue transition-colors">About</Link>
                <Link href="/contact" className="text-gray-600 hover:text-mvt-blue transition-colors">Contact</Link>
                <Link href="/careers" className="text-gray-600 hover:text-mvt-blue transition-colors">Careers</Link>
                <Link href="/blog" className="text-gray-600 hover:text-mvt-blue transition-colors">Blog</Link>
              </div>
              <button className="md:hidden text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </nav>
        </header>
        
        <main className="min-h-screen">
          {children}
        </main>
        
        <footer className="bg-mvt-blue text-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center mb-4">
                  <Image src="/logos/MVTW logo-white.png" alt="MVT Warehousing Logo" width={160} height={40} />
                </div>
                <p className="text-gray-300">Your strategic partner for transportation, warehousing, and logistics services.</p>
                <div className="flex gap-4 mt-6">
                  <a href="#" className="text-white hover:text-mvt-lightBlue transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  </a>
                  <a href="#" className="text-white hover:text-mvt-lightBlue transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  </a>
                  <a href="#" className="text-white hover:text-mvt-lightBlue transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                <ul className="space-y-3">
                  <li><Link href="/services" className="text-gray-300 hover:text-white transition-colors">Services</Link></li>
                  <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
                  <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
                  <li><Link href="/careers" className="text-gray-300 hover:text-white transition-colors">Careers</Link></li>
                  <li><Link href="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Services</h3>
                <ul className="space-y-3">
                  <li><Link href="/services#transportation" className="text-gray-300 hover:text-white transition-colors">Transportation</Link></li>
                  <li><Link href="/services#warehousing" className="text-gray-300 hover:text-white transition-colors">Warehousing</Link></li>
                  <li><Link href="/services#bulk-transfer" className="text-gray-300 hover:text-white transition-colors">Bulk Transfer</Link></li>
                  <li><Link href="/services#additional-services" className="text-gray-300 hover:text-white transition-colors">Additional Services</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Contact</h3>
                <address className="text-gray-300 not-italic space-y-2">
                  <p>7167 Chino Drive. El Paso, TX 79915</p>
                  <p>195 Frontera Rd. Del Rio, TX 78840</p>
                  <p>8900 San Gabriel Dr. Laredo, TX 78045</p>
                  <p className="mt-2">Phone: (800) 327-1204</p>
                  <p>Email: sales@mvtwarehousing.com</p>
                </address>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-mvt-blue/70 text-center text-gray-300">
              <p>&copy; {new Date().getFullYear()} MVT Warehousing, LLC. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
