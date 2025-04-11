"use client";

import { Warehouse, Package, TruckIcon, BarChart3, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[700px]">
        <Image
          src="/images/IMG_3533-1.jpg"
          alt="MVT Warehousing Hero"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
          <div className="animate-fadeIn">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">MVT Warehousing</h1>
            <p className="text-xl md:text-2xl mb-10 text-center max-w-3xl mx-auto">
              Premium Integrated Logistics Services
            </p>
            <p className="text-lg md:text-xl mb-10 text-center max-w-3xl mx-auto">
              We make it work
            </p>
            <p className="text-lg md:text-xl mb-10 text-center max-w-3xl mx-auto">
              Stagecoach Cartage and Distribution, LLC is an integrated company that provides a full range of transportation and warehousing services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="bg-mvt-red hover:bg-mvt-red/90 text-white px-8 py-4 rounded-md text-lg font-semibold transition-colors text-center"
              >
                Get Started Today
              </Link>
              <Link 
                href="/services"
                className="bg-transparent border-2 border-white hover:bg-white hover:text-mvt-blue text-white px-8 py-4 rounded-md text-lg font-semibold transition-colors text-center"
              >
                Explore Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-mvt-blue/20 to-mvt-lightBlue/20 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <p className="text-4xl font-bold text-mvt-blue mb-2">550K+</p>
              <p className="text-mvt-text">Square Feet of Space</p>
            </div>
            <div className="p-6">
              <p className="text-4xl font-bold text-mvt-blue mb-2">36+</p>
              <p className="text-mvt-text">Years of Experience</p>
            </div>
            <div className="p-6">
              <p className="text-4xl font-bold text-mvt-blue mb-2">3</p>
              <p className="text-mvt-text">Strategic Locations</p>
            </div>
            <div className="p-6">
              <p className="text-4xl font-bold text-mvt-blue mb-2">100%</p>
              <p className="text-mvt-text">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Integrated transportation and warehousing services tailored to your business needs
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 flex flex-col">
            <div className="bg-mvt-blue p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <TruckIcon className="text-white" size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Full Truckload Transportation</h3>
            <p className="text-gray-600 mb-6 flex-grow">
              We are a bonded (US Customs) carrier providing both solo and team driver service. All tractors and trailers are equipped with satellite tracking and on demand location reporting. Your freight will be delivered safely and on-time by one of our great drivers.
            </p>
            <Link 
              href="/contact"
              className="text-mvt-blue hover:text-mvt-lightBlue font-semibold inline-flex items-center"
            >
              Learn More
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 flex flex-col">
            <div className="bg-mvt-blue p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <Warehouse className="text-white" size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Warehouse and Distribution</h3>
            <p className="text-gray-600 mb-6 flex-grow">
              With over 550,000 square feet of space, MVT Warehousing has a strong commitment to warehousing on the border providing contract and public warehousing with complete account management. Our facilities are rail served with access to both UPRR and BNSF.
            </p>
            <Link 
              href="/services"
              className="text-mvt-blue hover:text-mvt-lightBlue font-semibold inline-flex items-center"
            >
              Learn More
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 flex flex-col">
            <div className="bg-mvt-blue p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <Package className="text-white" size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Bulk Transfer / Packaging</h3>
            <p className="text-gray-600 mb-6 flex-grow">
              With more than 30 years of experience in the industry, MVT Warehousing can unload from railcar or ocean containers and deliver to the customer silo or box. As the first US carrier to be granted authority to operate in Mexico under NAFTA, we can provide services at any point in Mexico with our own assets. Receiving railcar capacity of 100+ cars.
            </p>
            <Link 
              href="/contact"
              className="text-mvt-blue hover:text-mvt-lightBlue font-semibold inline-flex items-center"
            >
              Learn More
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* More Services Section */}
      <section className="bg-mvt-blue text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Additional Services</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              We offer a comprehensive range of logistics solutions
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-mvt-blue/80 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-2">Intermodal</h3>
              <p className="text-white/80">
                With 20+ years of experience, we specialize in moving intermodal boxes on the Texas / Mexico border and have extensive experience with TOFC and COFC equipment.
              </p>
            </div>
            <div className="bg-mvt-blue/80 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-2">Local Cartage</h3>
              <p className="text-white/80">
                MVT Warehousing offers comprehensive local cartage services at all of our border locations. Our program designs are flexible and can be customized to fit your individual needs.
              </p>
            </div>
            <div className="bg-mvt-blue/80 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-2">Transloading</h3>
              <p className="text-white/80">
                With 45+ lift trucks ranging from 5,000 lbs. to 55,000 lbs. and a wide variety of truck attachments we can virtually transload almost any commodity. Trailer to trailer, trailer to railcar, railcar to trailer.
              </p>
            </div>
            <div className="bg-mvt-blue/80 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-2">Bonded Warehouse</h3>
              <p className="text-white/80">
                Our secured and monitored US Customs bonded warehouse allows you to import dutiable merchandise to be stored, manipulated in our facility without payment of duty.
              </p>
            </div>
            <div className="bg-mvt-blue/80 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-2">LTL Less Than Truck Load</h3>
              <p className="text-white/80">
                Our "Border Express" LTL service will carry your goods with next-business-day delivery from El Paso to Del Rio, Eagle Pass, and Laredo, TX.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About MVT Warehousing</h2>
            <p className="text-gray-700 mb-6 text-lg">
              Based in El Paso, TX, and established in 1986 MVT Warehousing has always been passionate about the trucking and warehousing industry, providing excellent service and building long-term relationships with our customers.
            </p>
            <p className="text-gray-700 mb-8 text-lg">
              Our drivers and personnel have been pivotal in achieving such success. After 36 years of operating in the commercial zone between Mexico and the US, we are your #1 trucking and warehousing strategic partner.
            </p>
            <Link 
              href="/about"
              className="bg-mvt-red hover:bg-mvt-red/90 text-white px-6 py-3 rounded-md font-semibold inline-block transition-colors"
            >
              Learn More About Us
            </Link>
          </div>
          <div className="flex-1 relative h-[400px] order-1 md:order-2 mb-8 md:mb-0">
            <Image
              src="/images/1.jpg"
              alt="About MVT Warehousing"
              fill
              className="object-cover rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-100 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it - hear from some of our satisfied clients
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <svg className="text-yellow-400 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="text-yellow-400 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="text-yellow-400 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="text-yellow-400 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="text-yellow-400 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              </div>
              <p className="text-gray-600 mb-6 italic">
                "MVT Warehousing has transformed our logistics operations. Their state-of-the-art facilities and real-time tracking have significantly improved our efficiency and customer satisfaction."
              </p>
              <div>
                <p className="font-bold">John Smith</p>
                <p className="text-gray-500 text-sm">CEO, ABC Manufacturing</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <svg className="text-yellow-400 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="text-yellow-400 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="text-yellow-400 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="text-yellow-400 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="text-yellow-400 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              </div>
              <p className="text-gray-600 mb-6 italic">
                "We've been working with MVT Warehousing for over 5 years, and their service has been consistently excellent. Their team is responsive, professional, and always goes the extra mile."
              </p>
              <div>
                <p className="font-bold">Sarah Johnson</p>
                <p className="text-gray-500 text-sm">Operations Director, XYZ Retail</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <svg className="text-yellow-400 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="text-yellow-400 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="text-yellow-400 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="text-yellow-400 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="text-yellow-400 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              </div>
              <p className="text-gray-600 mb-6 italic">
                "MVT Warehousing provides exceptional service with their modern facilities and responsive team. They've helped us streamline our operations and reduce costs significantly."
              </p>
              <div>
                <p className="font-bold">Michael Brown</p>
                <p className="text-gray-500 text-sm">Logistics Manager, Global Imports</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="bg-mvt-blue text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8">Contact us today to discuss your transportation and logistics needs.</p>
          <Link 
            href="/contact"
            className="bg-white text-mvt-blue hover:bg-gray-100 px-8 py-3 rounded-md text-lg font-semibold transition-colors inline-block"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}
