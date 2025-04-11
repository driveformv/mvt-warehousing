import { Metadata } from 'next';
import { generateMetadata as getMetadata } from '@/lib/get-seo-metadata';

export async function generateMetadata(): Promise<Metadata> {
  return await getMetadata('/contact');
}

"use client";

import { Mail, Phone, MapPin, Clock, Warehouse, TruckIcon, Package } from "lucide-react";
import Image from "next/image";
import ContactForm from "@/components/contact-form";
import { pageview } from "@/lib/analytics";
import { useEffect } from "react";

export default function Contact() {
  // Track page view
  useEffect(() => {
    pageview('/contact');
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[400px]">
        <Image
          src="/images/1.jpg"
          alt="Contact MVT Warehousing"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Contact Us</h1>
          <p className="text-xl md:text-2xl text-center max-w-3xl mx-auto">
            Get in touch with our team to discuss your transportation and warehousing needs
          </p>
        </div>
      </section>

      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <MapPin className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Our Locations</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium">El Paso (Headquarters)</p>
                      <p className="text-gray-600">7167 Chino Drive, El Paso, TX 79915</p>
                    </div>
                    <div>
                      <p className="font-medium">Del Rio</p>
                      <p className="text-gray-600">195 Frontera Rd, Del Rio, TX 78840</p>
                    </div>
                    <div>
                      <p className="font-medium">Laredo</p>
                      <p className="text-gray-600">8900 San Gabriel Dr, Laredo, TX 78045</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Phone className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Phone</h3>
                  <p className="text-gray-600">(800) 327-1204</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Mail className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Email</h3>
                  <p className="text-gray-600">sales@mvtwarehousing.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Clock className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Hours of Operation</h3>
                  <p className="text-gray-600">
                    Monday - Friday: 8:00 AM - 6:00 PM<br />
                    Saturday: 9:00 AM - 2:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold mb-6">Our Services</h3>
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <TruckIcon className="text-blue-600 mx-auto mb-2" size={24} />
                <p className="font-medium">Transportation</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <Warehouse className="text-blue-600 mx-auto mb-2" size={24} />
                <p className="font-medium">Warehousing</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <Package className="text-blue-600 mx-auto mb-2" size={24} />
                <p className="font-medium">Bulk Transfer</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <ContactForm className="p-8 rounded-xl shadow-lg" />
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Locations</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Strategically located facilities to serve your business needs
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-lg">
            <div className="aspect-w-16 aspect-h-9 w-full h-[500px] relative">
              <Image
                src="/images/4-1.jpg"
                alt="Map of our locations"
                fill
                className="object-cover rounded-lg"
              />
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Need Immediate Assistance?</h2>
            <p className="text-xl mb-10 text-white/80 max-w-2xl mx-auto">
              Our team is ready to help you with any questions about our transportation and warehousing services.
            </p>
            
            <div className="flex flex-col md:flex-row gap-6 justify-center mb-12">
              <a 
                href="tel:8003271204"
                className="btn bg-white text-mvt-blue hover:bg-gray-100 btn-lg group inline-flex items-center justify-center"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <Phone className="mr-2 h-5 w-5" />
                <span>Call (800) 327-1204</span>
              </a>
              
              <a 
                href="mailto:sales@mvtwarehousing.com"
                className="btn btn-outline border-white text-white hover:bg-white/10 btn-lg inline-flex items-center justify-center"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <Mail className="mr-2 h-5 w-5" />
                <span>Email Us</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
