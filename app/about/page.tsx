import { Metadata } from 'next';
import { generateMetadata as getMetadata } from '@/lib/get-seo-metadata';

export async function generateMetadata(): Promise<Metadata> {
  return await getMetadata('/about');
}

"use client";

import { Award, Users, Target, TrendingUp, Warehouse, Clock, Globe2, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function About() {
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
              Based in El Paso, TX, and established in 1986 MVT Warehousing has always been passionate about the trucking and warehousing industry, providing excellent service and building long-term relationships with our customers.
            </p>
            <p className="text-gray-600 mb-6 text-lg">
              What began as a small operation has evolved into a comprehensive logistics provider with over 550,000 square feet of space across strategic locations. Our growth has been fueled by our unwavering dedication to meeting our clients' needs and exceeding their expectations.
            </p>
            <p className="text-gray-600 text-lg">
              Our drivers and personnel have been pivotal in achieving such success. After 36 years of operating in the commercial zone between Mexico and the US, we are your #1 trucking and warehousing strategic partner.
            </p>
          </div>
          <div className="relative h-[450px]">
            <Image
              src="/images/1-1.jpg"
              alt="Company History"
              fill
              className="object-cover rounded-xl shadow-lg"
            />
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
              <h3 className="text-2xl font-bold mb-4 text-blue-600">Our Mission</h3>
              <p className="text-gray-600 mb-6">
                To provide exceptional warehousing and logistics solutions that optimize our clients' supply chains, reduce costs, and improve efficiency. We are committed to delivering reliable, innovative services that exceed expectations and build long-term partnerships.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <ShieldCheck className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-600">Ensuring the highest standards of safety and security</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-600">Delivering on-time, every time</span>
                </li>
                <li className="flex items-start gap-3">
                  <Users className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-600">Building lasting relationships with clients and partners</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-10 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold mb-4 text-blue-600">Our Vision</h3>
              <p className="text-gray-600 mb-6">
                To be the premier warehousing and logistics provider, recognized for our innovative solutions, operational excellence, and exceptional customer service. We aim to set the industry standard for reliability, efficiency, and technological advancement.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Globe2 className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-600">Expanding our reach to serve clients nationwide</span>
                </li>
                <li className="flex items-start gap-3">
                  <TrendingUp className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-600">Continuously improving our processes and technology</span>
                </li>
                <li className="flex items-start gap-3">
                  <Warehouse className="text-blue-600 mt-1 flex-shrink-0" size={20} />
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
            <div className="bg-blue-50 p-8 rounded-xl text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Excellence</h3>
              <p className="text-gray-600">
                We are committed to delivering the highest quality service in everything we do, exceeding expectations and setting new standards.
              </p>
            </div>
            <div className="bg-blue-50 p-8 rounded-xl text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Teamwork</h3>
              <p className="text-gray-600">
                Collaboration drives our success. We work together across departments and with our clients to achieve common goals.
              </p>
            </div>
            <div className="bg-blue-50 p-8 rounded-xl text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Reliability</h3>
              <p className="text-gray-600">
                Our clients can count on us to deliver consistent and dependable service, meeting deadlines and keeping promises.
              </p>
            </div>
            <div className="bg-blue-50 p-8 rounded-xl text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Innovation</h3>
              <p className="text-gray-600">
                We embrace new technologies and solutions to continuously improve our services and stay ahead of industry trends.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the experienced professionals guiding our company
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative h-[350px]">
                <Image
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80"
                  alt="CEO"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-1">John Smith</h3>
                <p className="text-blue-600 font-semibold mb-4">Chief Executive Officer</p>
                <p className="text-gray-600">
                  With over 25 years of experience in the logistics industry, John leads our company with a focus on strategic growth and operational excellence.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative h-[350px]">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80"
                  alt="COO"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-1">Sarah Johnson</h3>
                <p className="text-blue-600 font-semibold mb-4">Chief Operations Officer</p>
                <p className="text-gray-600">
                  Sarah oversees all operational aspects of our business, ensuring efficiency, quality, and customer satisfaction across all our services.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative h-[350px]">
                <Image
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80"
                  alt="CTO"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-1">Michael Brown</h3>
                <p className="text-blue-600 font-semibold mb-4">Chief Technology Officer</p>
                <p className="text-gray-600">
                  Michael leads our technology initiatives, implementing cutting-edge solutions to enhance our warehousing and logistics capabilities.
                </p>
              </div>
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
              State-of-the-art warehousing facilities strategically located to serve your business needs
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative h-[250px]">
                <Image
                  src="/images/3-1.jpg"
                  alt="El Paso Facility"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">El Paso, TX</h3>
                <p className="text-gray-600 mb-4">
                  Our headquarters and main distribution center, featuring over 300,000 square feet of warehousing space.
                </p>
                <p className="text-gray-600">
                  <strong>Address:</strong> 7167 Chino Drive, El Paso, TX 79915
                </p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative h-[250px]">
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
                  Strategic border location with 100,000 square feet of space, specializing in cross-border logistics.
                </p>
                <p className="text-gray-600">
                  <strong>Address:</strong> 195 Frontera Rd, Del Rio, TX 78840
                </p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative h-[250px]">
                <Image
                  src="/images/4-1.jpg"
                  alt="Laredo Facility"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Laredo, TX</h3>
                <p className="text-gray-600 mb-4">
                  Our newest facility with 150,000 square feet of modern warehousing space and advanced technology.
                </p>
                <p className="text-gray-600">
                  <strong>Address:</strong> 8900 San Gabriel Dr, Laredo, TX 78045
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-mvt-blue text-white py-20 md:py-24 relative overflow-hidden">
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
          <div className="max-w-4xl mx-auto text-center" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Partner with MVT Warehousing?</h2>
            <p className="text-xl mb-10 text-white/80 max-w-2xl mx-auto">
              Contact us today to discuss how our transportation and warehousing solutions can help your business grow.
            </p>
            
            <div className="flex flex-col md:flex-row gap-6 justify-center mb-12">
              <Link 
                href="/contact"
                className="btn bg-white text-mvt-blue hover:bg-gray-100 btn-lg group inline-flex items-center justify-center"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <span>Contact Us</span>
                <Target className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              
              <Link 
                href="/services"
                className="btn btn-outline border-white text-white hover:bg-white/10 btn-lg inline-flex items-center justify-center"
                data-aos="fade-up"
                data-aos-delay="300"
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
