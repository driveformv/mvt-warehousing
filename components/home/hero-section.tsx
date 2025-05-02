"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

export default function HeroSection() {
  // Initialize to false for SSR consistency
  const [isLoaded, setIsLoaded] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const warehouseImages = [
    {
      src: "/images/warehouse1.jpg",
      alt: "MVT Warehouse"
    },
    {
      src: "/images/WIDE_0034-Pano.jpg",
      alt: "MVT Warehousing Facility"
    },
    {
      src: "/images/DJI_20240104112814_0140_D.jpg",
      alt: "MVT Logistics Services"
    },
    {
      src: "/images/IMG_2575.jpg",
      alt: "MVT Warehousing Services"
    }
  ];

  useEffect(() => {
    // Only run on the client side to avoid hydration issues
    if (typeof window !== 'undefined') {
      setIsLoaded(true);
    }
  }, []);

  // Set up auto-rotation for the carousel
  useEffect(() => {
    // Only run on the client side to avoid hydration issues
    if (typeof window === 'undefined' || !api) return;
    
    // Start auto-rotation
    intervalRef.current = setInterval(() => {
      api.scrollNext();
    }, 5000); // Change slide every 5 seconds
    
    // Clean up interval on component unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [api]);

  return (
    <section className="relative h-[700px] overflow-hidden">
      {/* Background Image Carousel */}
      <div className="absolute inset-0 transition-transform duration-[2000ms] ease-out"
        style={{ transform: isLoaded ? 'translateY(0)' : 'translateY(20px)' }}
      >
        <Carousel className="w-full h-full" opts={{ loop: true }} setApi={setApi}>
          <CarouselContent className="h-full" style={{ height: '700px' }}>
            {warehouseImages.map((image, index) => (
              <CarouselItem key={index} className="h-full w-full">
                <div className="relative w-full h-full" style={{ height: '700px' }}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover brightness-50 transition-all duration-1000 ease-out scale-[1.03]"
                    style={{ 
                      transform: isLoaded ? 'scale(1)' : 'scale(1.1)',
                      opacity: isLoaded ? 1 : 0.7
                    }}
                    priority={index === 0}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Staggered Animation for Text Elements */}
          
          <h1 
            className="text-4xl md:text-6xl font-bold mb-6 opacity-0"
            data-aos="fade-up"
            data-aos-delay="400"
            data-aos-duration="1000"
            suppressHydrationWarning={true}
          >
            Premium Integrated Logistics
          </h1>
          
          <p 
            className="text-xl md:text-2xl mb-6 opacity-0"
            data-aos="fade-up"
            data-aos-delay="600"
            data-aos-duration="1000"
            suppressHydrationWarning={true}
          >
            <span className="font-semibold">We Make It Work</span>
          </p>
          
          <p 
            className="text-lg md:text-xl mb-10 max-w-3xl mx-auto opacity-0"
            data-aos="fade-up"
            data-aos-delay="800"
            data-aos-duration="1000"
            suppressHydrationWarning={true}
          >
            Founded in 1986, MVT Warehousing provides a full suite of transportation and warehousing services with 700,000 square feet strategically located on the Border.
          </p>
          
          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center opacity-0"
            data-aos="fade-up"
            data-aos-delay="1000"
            data-aos-duration="1000"
            suppressHydrationWarning={true}
          >
            <Link 
              href="/contact"
              className="btn btn-secondary btn-lg group"
            >
              <span>Request a Quote</span>
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
        suppressHydrationWarning={true}
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
