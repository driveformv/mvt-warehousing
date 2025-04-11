import Link from "next/link";
import Image from "next/image";
import { Facebook, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-mvt-blue text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Image 
                src="/logos/MVTW logo-white.png" 
                alt="MVT Warehousing Logo" 
                width={160} 
                height={40} 
                className="transition-transform hover:scale-105 duration-300"
              />
            </div>
            <p className="text-gray-300 leading-relaxed">
              Your strategic partner for transportation, warehousing, and logistics services.
            </p>
            <div className="flex gap-4 mt-6">
              <a 
                href="#" 
                className="text-white hover:text-mvt-lightBlue transition-colors hover-lift focus-ring p-2 rounded-full bg-mvt-blue/30"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                className="text-white hover:text-mvt-lightBlue transition-colors hover-lift focus-ring p-2 rounded-full bg-mvt-blue/30"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="#" 
                className="text-white hover:text-mvt-lightBlue transition-colors hover-lift focus-ring p-2 rounded-full bg-mvt-blue/30"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link 
                  href="/services" 
                  className="text-gray-300 hover:text-white transition-colors focus-ring inline-block"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="text-gray-300 hover:text-white transition-colors focus-ring inline-block"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-gray-300 hover:text-white transition-colors focus-ring inline-block"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  href="/careers" 
                  className="text-gray-300 hover:text-white transition-colors focus-ring inline-block"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link 
                  href="/blog" 
                  className="text-gray-300 hover:text-white transition-colors focus-ring inline-block"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6">Services</h3>
            <ul className="space-y-4">
              <li>
                <Link 
                  href="/services#transportation" 
                  className="text-gray-300 hover:text-white transition-colors focus-ring inline-block"
                >
                  Transportation
                </Link>
              </li>
              <li>
                <Link 
                  href="/services#warehousing" 
                  className="text-gray-300 hover:text-white transition-colors focus-ring inline-block"
                >
                  Warehousing
                </Link>
              </li>
              <li>
                <Link 
                  href="/services#bulk-transfer" 
                  className="text-gray-300 hover:text-white transition-colors focus-ring inline-block"
                >
                  Bulk Transfer
                </Link>
              </li>
              <li>
                <Link 
                  href="/services#additional-services" 
                  className="text-gray-300 hover:text-white transition-colors focus-ring inline-block"
                >
                  Additional Services
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6">Contact</h3>
            <address className="text-gray-300 not-italic space-y-4">
              <p className="flex items-start">
                <span className="inline-block mr-2 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </span>
                <span>
                  7167 Chino Drive<br />
                  El Paso, TX 79915<br /><br />
                  195 Frontera Rd<br />
                  Del Rio, TX 78840<br /><br />
                  8900 San Gabriel Dr<br />
                  Laredo, TX 78045
                </span>
              </p>
              <p className="flex items-start">
                <span className="inline-block mr-2 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </span>
                <span>Phone: (800) 327-1204</span>
              </p>
              <p className="flex items-start">
                <span className="inline-block mr-2 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </span>
                <span>Email: sales@mvtwarehousing.com</span>
              </p>
            </address>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-mvt-blue/30 flex flex-col md:flex-row justify-between items-center text-gray-300 text-sm">
          <p>&copy; {new Date().getFullYear()} MVT Warehousing, LLC. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex gap-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
