"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative h-[700px] overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 transition-transform duration-[2000ms] ease-out"
        style={{ transform: `translateY(${isLoaded ? '0' : '20px'})` }}
      >
        <Image
          src="/images/IMG_3533-1.jpg"
          alt="MVT Warehousing Hero"
          fill
          className="object-cover brightness-50 transition-all duration-1000 ease-out scale-[1.03]"
          style={{ 
            transform: `scale(${isLoaded ? 1 : 1.1})`,
            opacity: isLoaded ? 1 : 0.7
          }}
          priority
        />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Staggered Animation for Text Elements */}
          <h1 
            className="text-4xl md:text-6xl font-bold mb-6 opacity-0"
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-duration="1000"
          >
            MVT Warehousing
          </h1>
          
          <p 
            className="text-xl md:text-2xl mb-6 opacity-0"
            data-aos="fade-up"
            data-aos-delay="400"
            data-aos-duration="1000"
          >
            Premium Integrated Logistics Services
          </p>
          
          <p 
            className="text-lg md:text-xl mb-6 opacity-0"
            data-aos="fade-up"
            data-aos-delay="600"
            data-aos-duration="1000"
          >
            We make it work
          </p>
          
          <p 
            className="text-lg md:text-xl mb-10 max-w-3xl mx-auto opacity-0"
            data-aos="fade-up"
            data-aos-delay="800"
            data-aos-duration="1000"
          >
            Stagecoach Cartage and Distribution, LLC is an integrated company that provides a full range of transportation and warehousing services.
          </p>
          
          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center opacity-0"
            data-aos="fade-up"
            data-aos-delay="1000"
            data-aos-duration="1000"
          >
            <Link 
              href="/contact"
              className="btn btn-secondary btn-lg group"
            >
              <span>Get Started Today</span>
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            
            <Link 
              href="/services"
              className="btn btn-outline border-white text-white hover:bg-white hover:text-mvt-blue btn-lg"
            >
              Explore Our Services
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0"
        data-aos="fade-up"
        data-aos-delay="1200"
        data-aos-duration="1000"
      >
        <div className="flex flex-col items-center">
          <span className="text-white text-sm mb-2">Scroll Down</span>
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
