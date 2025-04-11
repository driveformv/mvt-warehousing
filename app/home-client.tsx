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
              We offer a comprehensive range of logistics solutions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div 
              className="bg-mvt-blue/30 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:bg-mvt-blue/40 transition-all duration-300 hover:-translate-y-1"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <h3 className="text-xl font-bold mb-4">Intermodal</h3>
              <p className="text-white/80">
                With 20+ years of experience, we specialize in moving intermodal boxes on the Texas / Mexico border and have extensive experience with TOFC and COFC equipment.
              </p>
            </div>
            
            <div 
              className="bg-mvt-blue/30 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:bg-mvt-blue/40 transition-all duration-300 hover:-translate-y-1"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h3 className="text-xl font-bold mb-4">Local Cartage</h3>
              <p className="text-white/80">
                MVT Warehousing offers comprehensive local cartage services at all of our border locations. Our program designs are flexible and can be customized to fit your individual needs.
              </p>
            </div>
            
            <div 
              className="bg-mvt-blue/30 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:bg-mvt-blue/40 transition-all duration-300 hover:-translate-y-1"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <h3 className="text-xl font-bold mb-4">Transloading</h3>
              <p className="text-white/80">
                With 45+ lift trucks ranging from 5,000 lbs. to 55,000 lbs. and a wide variety of truck attachments we can virtually transload almost any commodity. Trailer to trailer, trailer to railcar, railcar to trailer.
              </p>
            </div>
            
            <div 
              className="bg-mvt-blue/30 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:bg-mvt-blue/40 transition-all duration-300 hover:-translate-y-1"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <h3 className="text-xl font-bold mb-4">Bonded Warehouse</h3>
              <p className="text-white/80">
                Our secured and monitored US Customs bonded warehouse allows you to import dutiable merchandise to be stored, manipulated in our facility without payment of duty.
              </p>
            </div>
            
            <div 
              className="bg-mvt-blue/30 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:bg-mvt-blue/40 transition-all duration-300 hover:-translate-y-1"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <h3 className="text-xl font-bold mb-4">LTL Less Than Truck Load</h3>
              <p className="text-white/80">
                Our "Border Express" LTL service will carry your goods with next-business-day delivery from El Paso to Del Rio, Eagle Pass, and Laredo, TX.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center" data-aos="fade-up" data-aos-delay="600">
            <Link 
              href="/services#additional-services" 
              className="btn btn-outline border-white text-white hover:bg-white/10 btn-lg inline-flex items-center group"
            >
              <span>View All Additional Services</span>
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
                Based in El Paso, TX, and established in 1986 MVT Warehousing has always been passionate about the trucking and warehousing industry, providing excellent service and building long-term relationships with our customers.
              </p>
              <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                Our drivers and personnel have been pivotal in achieving such success. After 36 years of operating in the commercial zone between Mexico and the US, we are your #1 trucking and warehousing strategic partner.
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
