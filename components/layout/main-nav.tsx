"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";

export default function MainNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const pathname = usePathname();
  const servicesDropdownRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Navigation items
  const navItems = [
    { name: "Home", path: "/" },
    { 
      name: "Services", 
      path: "/services",
      hasDropdown: true,
      dropdownItems: [
        { name: "Warehousing", path: "/services#warehousing" },
        { name: "Transportation", path: "/services#transportation" },
        { name: "Bulk Transfer", path: "/services#bulk-transfer" },
        { name: "Transloading", path: "/services#transloading" },
        { name: "Additional Services", path: "/services#additional-services" },
      ]
    },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Careers", path: "/careers" },
    { name: "Blog", path: "/blog" },
  ];

  return (
    <header 
      className={`fixed top-[32px] left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-sm shadow-md py-2" 
          : "bg-white shadow-sm py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center relative z-10">
            <Image 
              src="/logos/MVTW logo_outlined.png" 
              alt="MVT Warehousing Logo" 
              width={160} 
              height={40} 
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <div key={item.name} className="relative" ref={item.name === "Services" ? servicesDropdownRef : null}>
                {item.hasDropdown ? (
                  <>
                    <button
                      className={`px-2 py-2 text-base font-medium transition-colors flex items-center ${
                        pathname === item.path || pathname.includes(item.path)
                          ? "text-mvt-blue font-semibold"
                          : "text-gray-600 hover:text-mvt-blue"
                      }`}
                      onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                      aria-expanded={servicesDropdownOpen}
                      aria-haspopup="true"
                    >
                      {item.name}
                      <ChevronDown size={16} className={`ml-1 transition-transform ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {servicesDropdownOpen && (
                      <div className="absolute top-full left-0 w-64 bg-white rounded-md shadow-lg py-2 mt-1 z-20">
                        {item.dropdownItems?.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.path}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-mvt-blue"
                            onClick={() => setServicesDropdownOpen(false)}
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.path}
                    className={`px-2 py-2 text-base font-medium transition-colors ${
                      pathname === item.path
                        ? "text-mvt-blue font-semibold"
                        : "text-gray-600 hover:text-mvt-blue"
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}

            {/* CTA Button */}
            <Link 
              href="/contact" 
              className="ml-4 bg-mvt-blue text-white hover:bg-mvt-blue/90 px-6 py-2 rounded-md font-medium"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-600 p-2 rounded-md"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.hasDropdown ? (
                    <>
                      <button
                        className={`flex justify-between items-center w-full py-2 text-lg font-medium ${
                          pathname === item.path ? "text-mvt-blue font-semibold" : "text-gray-600"
                        }`}
                        onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                      >
                        {item.name}
                        <ChevronDown size={20} className={`transition-transform ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {servicesDropdownOpen && (
                        <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-100 pl-4">
                          {item.dropdownItems?.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              href={dropdownItem.path}
                              className="block py-2 text-base text-gray-600 hover:text-mvt-blue"
                              onClick={() => {
                                setServicesDropdownOpen(false);
                                setIsMobileMenuOpen(false);
                              }}
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.path}
                      className={`py-2 text-lg font-medium ${
                        pathname === item.path
                          ? "text-mvt-blue font-semibold"
                          : "text-gray-600"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              
              {/* Mobile CTA */}
              <Link 
                href="/contact" 
                className="bg-mvt-blue text-white hover:bg-mvt-blue/90 px-6 py-3 rounded-md font-medium text-center mt-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
