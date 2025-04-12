"use client";

import HeroSection from "@/components/home/hero-section";
import StatsSection from "@/components/home/stats-section";
import ServicesSection from "@/components/home/services-section";
import TestimonialsSection from "@/components/home/testimonials-section";
import CTASection from "@/components/home/cta-section";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomeClient() {
  return (
    <main>
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Additional Services Section */}
      <section className="bg-mvt-blue text-white py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Additional Services</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Comprehensive logistics solutions for your business needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div 
              className="bg-mvt-blue/30 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:bg-mvt-blue/40 transition-all duration-300 hover:-translate-y-1"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <h3 className="text-xl font-bold mb-4">Rail Service</h3>
              <p className="text-white/80">
                Access to both Union Pacific and BNSF railroads with multiple rail-served facilities totaling over 50 rail spots across our locations, supporting efficient bulk transportation.
              </p>
            </div>
            
            <div 
              className="bg-mvt-blue/30 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:bg-mvt-blue/40 transition-all duration-300 hover:-translate-y-1"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h3 className="text-xl font-bold mb-4">Equipment & Attachments</h3>
              <p className="text-white/80">
                Over 50 forklift trucks ranging from 5,000 to 55,000 lbs capacity, with specialized attachments including push pulls, basiloid, long forks, paper clamp, squeeze clamp, and coil handlers.
              </p>
            </div>
            
            <div 
              className="bg-mvt-blue/30 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:bg-mvt-blue/40 transition-all duration-300 hover:-translate-y-1"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <h3 className="text-xl font-bold mb-4">Bonded & CME Warehouse</h3>
              <p className="text-white/80">
                US Customs bonded warehouse facilities and Chicago Mercantile Exchange (CME) certified warehouse for copper cathode storage, one of only seven in the United States.
              </p>
            </div>
            
            <div 
              className="bg-mvt-blue/30 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:bg-mvt-blue/40 transition-all duration-300 hover:-translate-y-1"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <h3 className="text-xl font-bold mb-4">Computerized Systems</h3>
              <p className="text-white/80">
                Industry-proven Warehouse Management System (WMS), RF scanning technology, RailCar Tracker (RCT) for real-time railcar information, and Transload app with web access reports.
              </p>
            </div>
            
            <div 
              className="bg-mvt-blue/30 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:bg-mvt-blue/40 transition-all duration-300 hover:-translate-y-1"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <h3 className="text-xl font-bold mb-4">Specialized Fleet</h3>
              <p className="text-white/80">
                62 day-cab power units for local and rail drayage, 24 pneumatic tankers with 1630 cubic feet capacity, and 22 trucks with power take-off (PTO) for diverse transportation needs.
              </p>
            </div>
            
            <div 
              className="bg-mvt-blue/30 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:bg-mvt-blue/40 transition-all duration-300 hover:-translate-y-1"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <h3 className="text-xl font-bold mb-4">Cross-Border Services</h3>
              <p className="text-white/80">
                First U.S. carrier certified under NAFTA to obtain Mexico operating authority, with daily deliveries to Juarez and on-demand deliveries into Mexico's interior.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center" data-aos="fade-up" data-aos-delay="700">
            <Link 
              href="/services#additional-services" 
              className="btn btn-outline border-white text-white hover:bg-white/10 btn-lg inline-flex items-center group"
            >
              <span>View All Services</span>
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div 
              className="flex-1 order-2 md:order-1"
              data-aos="fade-right"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">About MVT Warehousing</h2>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                Founded in 1986, MVT Warehousing provides a full suite of transportation and warehousing services with a focus on safety, our personnel, and customer satisfaction.
              </p>
              <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                With 38 years of experience and over 550,000 square feet of warehousing space across 7 strategic locations, we're an integrated company offering rail-served facilities with access to both UPRR and BNSF railroads.
              </p>
              <p className="text-gray-700 mb-8">
                <strong>Our slogan:</strong> <span className="text-mvt-blue font-medium">We Make It Work</span>
              </p>
              <Link 
                href="/about"
                className="btn btn-secondary btn-lg group inline-flex items-center"
              >
                <span>Learn More About Us</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            
            <div 
              className="flex-1 relative h-[400px] order-1 md:order-2 mb-8 md:mb-0 rounded-xl overflow-hidden"
              data-aos="fade-left"
            >
              <Image
                src="/images/1.jpg"
                alt="About MVT Warehousing"
                fill
                className="object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <CTASection />
    </main>
  );
}
