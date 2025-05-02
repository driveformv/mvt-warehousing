"use client";

import { Award, Users, Target, TrendingUp, Warehouse, Clock, Globe2, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutClient() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[500px]">
        <Image
          src="/images/2-1.jpg"
          alt="About MVT Warehousing"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">About MVT Warehousing</h1>
          <p className="text-xl md:text-2xl text-center max-w-3xl mx-auto">
            Our Story of Excellence in Integrated Logistics Services
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-600 mb-6 text-lg">
              Based in El Paso, TX, and established in 1986, MVT Warehousing started with a passionate commitment to excellence in the trucking and warehousing industry. With 38 years of dedicated service, we've built our reputation on providing reliable logistics solutions and fostering long-term relationships with our customers.
            </p>
            <p className="text-gray-600 mb-6 text-lg">
              What began as a small operation has evolved into a comprehensive logistics provider with over 700,000 square feet of warehousing space strategically located on the Border. We now offer access to both Union Pacific and BNSF railroads with over 50 rail spots across our facilities.
            </p>
            <p className="text-gray-600 text-lg">
              Our focus on safety, innovative technology, and exceptional personnel has been pivotal in our success. With decades of experience operating in the commercial zone between Mexico and the US, we are your premier trucking and warehousing strategic partner.
            </p>
          </div>
          <div className="space-y-6">
            <div className="relative h-[300px]">
              <Image
                src="/images/1-1.jpg"
                alt="Company History"
                fill
                className="object-cover rounded-xl shadow-lg"
              />
            </div>
            <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/DjlYVUEVThs" 
                title="MVT Warehousing Video" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission & Vision</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Driving excellence in logistics through innovation, reliability, and customer-focused solutions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-10 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold mb-4 text-primary">Our Mission</h3>
              <p className="text-gray-600 mb-6">
                To provide exceptional warehousing and logistics solutions that optimize our clients' supply chains, reduce costs, and improve efficiency. We are committed to delivering reliable, innovative services that exceed expectations and build long-term partnerships.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <ShieldCheck className="text-primary mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-600">Ensuring the highest standards of safety and security</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="text-primary mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-600">Delivering on-time, every time</span>
                </li>
                <li className="flex items-start gap-3">
                  <Users className="text-primary mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-600">Building lasting relationships with clients and partners</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-10 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold mb-4 text-primary">Our Vision</h3>
              <p className="text-gray-600 mb-6">
                To be the premier warehousing and logistics provider, recognized for our innovative solutions, operational excellence, and exceptional customer service. We aim to set the industry standard for reliability, efficiency, and technological advancement.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Globe2 className="text-primary mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-600">Expanding our reach to serve clients nationwide</span>
                </li>
                <li className="flex items-start gap-3">
                  <TrendingUp className="text-primary mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-600">Continuously improving our processes and technology</span>
                </li>
                <li className="flex items-start gap-3">
                  <Warehouse className="text-primary mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-600">Developing innovative warehousing solutions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-primary/5 p-8 rounded-xl text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Excellence</h3>
              <p className="text-gray-600">
                We are committed to delivering the highest quality service in everything we do, exceeding expectations and setting new standards.
              </p>
            </div>
            <div className="bg-primary/5 p-8 rounded-xl text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Teamwork</h3>
              <p className="text-gray-600">
                Collaboration drives our success. We work together across departments and with our clients to achieve common goals.
              </p>
            </div>
            <div className="bg-primary/5 p-8 rounded-xl text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Reliability</h3>
              <p className="text-gray-600">
                Our clients can count on us to deliver consistent and dependable service, meeting deadlines and keeping promises.
              </p>
            </div>
            <div className="bg-primary/5 p-8 rounded-xl text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Innovation</h3>
              <p className="text-gray-600">
                We embrace new technologies and solutions to continuously improve our services and stay ahead of industry trends.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Facilities</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Over 700,000 square feet of warehousing space strategically located on the Border
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative h-[200px]">
                <Image
                  src="/images/3-1.jpg"
                  alt="El Paso Facility - Chino"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">El Paso, TX - Chino</h3>
                <p className="text-gray-600 mb-4">
                  Corporate headquarters with 100,000 square feet and 27 dock doors handling various commodities.
                </p>
                <p className="text-gray-600">
                  <strong>Address:</strong> 7167 Chino Drive, El Paso, TX 79915
                </p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative h-[200px]">
                <Image
                  src="/images/warehouse1.jpg"
                  alt="El Paso Facility - Merchant"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">El Paso, TX - Merchant</h3>
                <p className="text-gray-600 mb-4">
                  110,000 sq ft facility with 15 dock doors and rail service (13 cars), specializing in plastic packout operations.
                </p>
                <p className="text-gray-600">
                  <strong>Address:</strong> 7180 Merchant, El Paso, TX
                </p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative h-[200px]">
                <Image
                  src="/images/DJI_20240104093418_0040_D.jpg"
                  alt="El Paso Facility - Welch"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">El Paso, TX - Welch</h3>
                <p className="text-gray-600 mb-4">
                  170,000 sq ft bonded warehouse with rail service (20 cars) and Chicago Mercantile Exchange (CME) certification.
                </p>
                <p className="text-gray-600">
                  <strong>Address:</strong> 5850 Welch, El Paso, TX
                </p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative h-[200px]">
                <Image
                  src="/images/DJI_20240104110909_0108_D.jpg"
                  alt="El Paso Facility - Welch II"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">El Paso, TX - Welch II</h3>
                <p className="text-gray-600 mb-4">
                  40,000 sq ft storage facility with rail service (5 cars) and specialized steel storage capabilities.
                </p>
                <p className="text-gray-600">
                  <strong>Address:</strong> 5830 Welch, El Paso, TX
                </p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative h-[200px]">
                <Image
                  src="/images/DJI_20240104112814_0140_D.jpg"
                  alt="El Paso Facility - Cross Dock"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">El Paso, TX - Cross Dock</h3>
                <p className="text-gray-600 mb-4">
                  10,000 sq ft cross-dock facility with 19 dock doors, handling up to 1.4 million lbs weekly.
                </p>
                <p className="text-gray-600">
                  <strong>Address:</strong> 7131 Copper Queen, El Paso, TX
                </p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative h-[200px]">
                <Image
                  src="/images/DJI_20240104123252_0164_D.jpg"
                  alt="Santa Teresa Facility"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Santa Teresa, NM</h3>
                <p className="text-gray-600 mb-4">
                  70,000 sq ft warehouse with rail service (15 cars) and no ad valorem tax, with potential expansion of 84,000 sq ft.
                </p>
                <p className="text-gray-600">
                  <strong>Address:</strong> 4950 Avenida Creel, Santa Teresa, NM
                </p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative h-[200px]">
                <Image
                  src="/images/2.jpg"
                  alt="Del Rio Facility"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Del Rio, TX</h3>
                <p className="text-gray-600 mb-4">
                  10,800 sq ft cross-dock facility with 8 doors, situated on 5 acres with trailer yard.
                </p>
                <p className="text-gray-600">
                  <strong>Address:</strong> 195 Frontera Rd, Del Rio, TX 78840
                </p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative h-[200px]">
                <Image
                  src="/images/DJI_20240104124641_0181_D.jpg"
                  alt="Laredo Facility"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Laredo, TX</h3>
                <p className="text-gray-600 mb-4">
                  40,000 sq ft warehouse on 7.7 acres with trailer yard capacity for expanding operations.
                </p>
                <p className="text-gray-600">
                  <strong>Address:</strong> 8900 San Gabriel Dr, Laredo, TX 78045
                </p>
              </div>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto bg-primary/5 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-4 text-center">Warehouse Management Features</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <Warehouse className="h-5 w-5 text-primary" />
                </div>
                <p className="text-gray-700">Industry-proven WMS (Cadre Accuplus)</p>
              </div>
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <p className="text-gray-700">RF scanning for receiving, shipping and inventories</p>
              </div>
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <p className="text-gray-700">24/7 web access to inventory management</p>
              </div>
            </div>
          </div>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Partner with MVT Warehousing?</h2>
            <p className="text-xl mb-10 text-white/80 max-w-2xl mx-auto">
              Contact us today to discuss how our transportation and warehousing solutions can help your business grow.
            </p>
            
            <div className="flex flex-col md:flex-row gap-6 justify-center mb-12">
              <Link 
                href="/contact"
                className="btn bg-white text-primary hover:bg-gray-100 btn-lg group inline-flex items-center justify-center"
              >
                <span>Contact Us</span>
                <Target className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              
              <Link 
                href="/services"
                className="btn btn-outline border-white text-white hover:bg-white/10 btn-lg inline-flex items-center justify-center"
              >
                <Warehouse className="mr-2 h-5 w-5" />
                <span>Explore Our Services</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
