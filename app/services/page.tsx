"use client";

import { Warehouse, Package, TruckIcon, BarChart3, Clock, Globe2, Shield, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Services() {
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
              MVT Warehousing offers a complete range of transportation and warehousing services designed to optimize your supply chain and improve your bottom line.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <TruckIcon className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Full Truckload Transportation</h3>
              <p className="text-gray-600">
                Bonded carrier providing both solo and team driver service with satellite tracking and on-demand location reporting.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Warehouse className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Warehouse and Distribution</h3>
              <p className="text-gray-600">
                Over 550,000 square feet of space with contract and public warehousing with complete account management.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Bulk Transfer / Packaging</h3>
              <p className="text-gray-600">
                Unload from railcar or ocean containers and deliver to customer silo or box with receiving railcar capacity of 100+ cars.
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
              With over 550,000 square feet of space, MVT Warehousing has a strong commitment to warehousing on the border providing contract and public warehousing with complete account management. Our facilities are rail served with access to both UPRR and BNSF.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold">Rail Served Facilities</h3>
                  <p className="text-gray-600">Access to both UPRR and BNSF railways for efficient transportation.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold">Complete Account Management</h3>
                  <p className="text-gray-600">Dedicated account managers to ensure your needs are met.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold">Strategic Border Locations</h3>
                  <p className="text-gray-600">Facilities in key border locations for cross-border logistics.</p>
                </div>
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

      {/* Transportation Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto bg-gray-50" id="transportation">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative h-[400px]">
            <Image
              src="/images/4-1.jpg"
              alt="Transportation Services"
              fill
              className="object-cover rounded-xl shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">Full Truckload Transportation</h2>
            <p className="text-gray-600 mb-8">
              We are a bonded (US Customs) carrier providing both solo and team driver service. All tractors and trailers are equipped with satellite tracking and on demand location reporting. Your freight will be delivered safely and on-time by one of our great drivers.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold">US Customs Bonded Carrier</h3>
                  <p className="text-gray-600">Authorized to transport bonded shipments across borders.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold">Satellite Tracking</h3>
                  <p className="text-gray-600">Real-time tracking and on-demand location reporting for all shipments.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold">Solo and Team Driver Service</h3>
                  <p className="text-gray-600">Flexible driver options to meet your delivery timeline requirements.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bulk Transfer Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto" id="bulk-transfer">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold mb-6">Bulk Transfer / Packaging</h2>
            <p className="text-gray-600 mb-8">
              With more than 30 years of experience in the industry, MVT Warehousing can unload from railcar or ocean containers and deliver to the customer silo or box. As the first US carrier to be granted authority to operate in Mexico under NAFTA, we can provide services at any point in Mexico with our own assets.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold">Railcar Capacity</h3>
                  <p className="text-gray-600">Receiving railcar capacity of 100+ cars for efficient bulk transfer operations.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold">Mexico Operations</h3>
                  <p className="text-gray-600">First US carrier granted authority to operate in Mexico under NAFTA with our own assets.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold">Container Unloading</h3>
                  <p className="text-gray-600">Efficient unloading from railcar or ocean containers with delivery to customer silo or box.</p>
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

      {/* Additional Services Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto bg-gray-50" id="additional-services">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative h-[400px]">
            <Image
              src="/images/3.jpg"
              alt="Additional Services"
              fill
              className="object-cover rounded-xl shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">Additional Services</h2>
            <p className="text-gray-600 mb-8">
              MVT Warehousing offers a comprehensive range of additional logistics services to meet all your transportation and warehousing needs.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold">Intermodal</h3>
                  <p className="text-gray-600">With 20+ years of experience, we specialize in moving intermodal boxes on the Texas / Mexico border.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold">Local Cartage</h3>
                  <p className="text-gray-600">Comprehensive local cartage services at all of our border locations with flexible program designs.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold">LTL Less Than Truck Load</h3>
                  <p className="text-gray-600">Our "Border Express" LTL service with next-business-day delivery across Texas border cities.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-900 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Optimize Your Supply Chain?</h2>
          <p className="text-xl text-blue-200 mb-10 max-w-3xl mx-auto">
            Contact us today to discuss how our comprehensive transportation and warehousing solutions can help your business grow.
          </p>
          <Link 
            href="/contact"
            className="bg-white text-blue-900 hover:bg-blue-100 px-8 py-4 rounded-md text-lg font-semibold transition-colors inline-block"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </main>
  );
}
