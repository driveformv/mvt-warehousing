"use client";

import { Warehouse, Package, TruckIcon, BarChart3, Clock, Globe2, Shield, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ServicesClient() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[500px]">
        <Image
          src="/images/3-1.jpg"
          alt="Services Hero"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Our Services</h1>
          <p className="text-xl md:text-2xl text-center max-w-3xl mx-auto">
            Comprehensive Transportation and Warehousing Solutions for Your Business
          </p>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">End-to-End Logistics Solutions</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              MVT Warehousing offers a complete range of transportation and warehousing services designed to optimize your supply chain and improve your bottom line, with over 30 years of industry experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Warehouse className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Warehouse and Distribution</h3>
              <p className="text-gray-600">
                Over 700,000 square feet strategically located on the Border with rail-served facilities and complete inventory management systems.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Bulk Transfer / Packaging</h3>
              <p className="text-gray-600">
                Specialized in handling PVC, PE, PP, and PET resins with capacity to pack 200,000 lbs per day using modern automated packaging systems.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Value-Added Services</h3>
              <p className="text-gray-600">
                Custom solutions including packaging, cross-docking, pick and pack, inventory management, and just-in-time delivery services.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe2 className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Transloading & Cross Dock</h3>
              <p className="text-gray-600">
                Premier domestic and international freight-management solutions from ocean containers, dry vans, flatbeds, railcars, and more with specialized equipment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Warehousing Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto" id="warehousing">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold mb-6">Warehouse and Distribution</h2>
            <p className="text-gray-600 mb-8">
              With over 700,000 square feet of space strategically located on the Border, MVT Warehousing provides contract and public warehousing solutions with complete inventory management. Our facilities are rail-served with access to both Union Pacific and BNSF railroads.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-primary mt-1 flex-shrink-0" size={20} />
                <span className="text-gray-600">Industry-proven Warehouse Management System (Cadre Accuplus) with 24/7 web access</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-primary mt-1 flex-shrink-0" size={20} />
                <span className="text-gray-600">RF scanning technology for receiving, shipping, and inventories</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-primary mt-1 flex-shrink-0" size={20} />
                <span className="text-gray-600">US Customs bonded facilities and CME certified warehouse for copper cathode storage</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-primary mt-1 flex-shrink-0" size={20} />
                <span className="text-gray-600">Bar coding, labeling, and shrink wrapping services available</span>
              </div>
            </div>
          </div>
          <div className="relative h-[400px] order-1 md:order-2">
            <Image
              src="/images/1-1.jpg"
              alt="Warehousing Services"
              fill
              className="object-cover rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Bulk Transfer Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto" id="bulk-transfer">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold mb-6">Bulk Transfer / Packaging</h2>
            <p className="text-gray-600 mb-8">
              With more than 30 years of experience in the industry, MVT Warehousing provides a full menu of bulk transportation and packaging services. We can unload from railcar or ocean containers and deliver directly to customer silos or boxes.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-primary mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold">High-Volume Capacity</h3>
                  <p className="text-gray-600">Capacity to pack 200,000 lbs per day with modern automated systems.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-primary mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold">Railcar Processing</h3>
                  <p className="text-gray-600">Receiving railcar capacity of 100+ cars with rail service to both UPRR and BNSF.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-primary mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold">Specialized Equipment</h3>
                  <p className="text-gray-600">24 pneumatic tankers with 1630 cubic feet capacity for bulk resin delivery.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-[400px] order-1 md:order-2">
            <Image
              src="/images/2.jpg"
              alt="Bulk Transfer Services"
              fill
              className="object-cover rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Transloading Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto bg-gray-50" id="transloading">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative h-[400px]">
            <Image
              src="/images/2-1.jpg"
              alt="Transloading Services"
              fill
              className="object-cover rounded-xl shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">Transloading & Cross Dock</h2>
            <p className="text-gray-600 mb-8">
              We offer premier domestic and international freight-management transloading solutions from ocean containers, dry vans, flatbeds, railcars, gondolas, and A-frames. Our specialized equipment and expertise make us a trusted partner for complex transloading operations.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-primary mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold">Versatile Equipment</h3>
                  <p className="text-gray-600">50+ lift trucks ranging from 5,000 to 55,000 lbs capacity with specialized attachments.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-primary mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold">Real-Time Tracking</h3>
                  <p className="text-gray-600">Transload app providing real-time information and detailed reporting.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-primary mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold">High-Volume Handling</h3>
                  <p className="text-gray-600">Cross-dock facility handling up to 1.4 million lbs weekly with 19 dock doors.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto" id="additional-services">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Additional Specialized Services</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            MVT Warehousing offers an extensive range of specialized logistics services to complement our core offerings
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <TruckIcon className="text-primary" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Intermodal & Local Cartage</h3>
            <p className="text-gray-600 mb-4">
              Local pickup and delivery services with over 2,000 moves per month on domestic containers in El Paso and Laredo.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="text-primary mr-2 h-4 w-4" />
                <span>Dedicated yard spotting operations</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="text-primary mr-2 h-4 w-4" />
                <span>Experienced border crossing specialists</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="text-primary mr-2 h-4 w-4" />
                <span>Flexible program designs</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <Warehouse className="text-primary" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Bonded & CME Warehouse</h3>
            <p className="text-gray-600 mb-4">
              US Customs bonded warehouse facilities and Chicago Mercantile Exchange (CME) certified warehouse for copper cathode storage.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="text-primary mr-2 h-4 w-4" />
                <span>One of only seven CME-certified warehouses in the US</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="text-primary mr-2 h-4 w-4" />
                <span>Store dutiable merchandise without duty payment</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="text-primary mr-2 h-4 w-4" />
                <span>Secure monitored facilities</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <Globe2 className="text-primary" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Cross-Border Services</h3>
            <p className="text-gray-600 mb-4">
              First U.S. carrier certified under NAFTA to obtain Mexico operating authority with extensive cross-border experience.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="text-primary mr-2 h-4 w-4" />
                <span>Daily deliveries to Juarez</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="text-primary mr-2 h-4 w-4" />
                <span>On-demand deliveries into Mexico's interior</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="text-primary mr-2 h-4 w-4" />
                <span>Extensive knowledge of border logistics</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <BarChart3 className="text-primary" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Rail Service</h3>
            <p className="text-gray-600 mb-4">
              Access to both Union Pacific and BNSF railroads with multiple rail-served facilities throughout our network.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="text-primary mr-2 h-4 w-4" />
                <span>Over 50 rail spots across our locations</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="text-primary mr-2 h-4 w-4" />
                <span>RailCar Tracker app for real-time monitoring</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="text-primary mr-2 h-4 w-4" />
                <span>Efficient bulk transportation solutions</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <Shield className="text-primary" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Specialized Systems</h3>
            <p className="text-gray-600 mb-4">
              We leverage advanced technology for transparent, efficient operations and detailed reporting.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="text-primary mr-2 h-4 w-4" />
                <span>Warehouse Management System (WMS)</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="text-primary mr-2 h-4 w-4" />
                <span>RF scanning technology</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="text-primary mr-2 h-4 w-4" />
                <span>Transload app with web access reports</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="text-center">
          <Link 
            href="/contact" 
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            <span>Contact Us About Specialized Services</span>
            <CheckCircle className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-20 md:py-24 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Optimize Your Supply Chain?</h2>
            <p className="text-xl mb-10 text-white/80 max-w-2xl mx-auto">
              Contact us today to discuss how our comprehensive transportation and warehousing solutions can help your business grow.
            </p>
            
            <div className="flex flex-col md:flex-row gap-6 justify-center mb-12">
              <Link 
                href="/contact"
                className="btn bg-white text-primary hover:bg-gray-100 btn-lg group inline-flex items-center justify-center"
              >
                <span>Contact Us</span>
                <TruckIcon className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              
              <Link 
                href="tel:8003271204"
                className="btn btn-outline border-white text-white hover:bg-white/10 btn-lg inline-flex items-center justify-center"
              >
                <Clock className="mr-2 h-5 w-5" />
                <span>Request a Quote</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
