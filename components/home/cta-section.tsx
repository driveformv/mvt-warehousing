import Link from "next/link";
import { ArrowRight, Phone, Mail } from "lucide-react";

export default function CTASection() {
  return (
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
        <div className="max-w-4xl mx-auto text-center" data-aos="fade-up" suppressHydrationWarning={true}>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-10 text-white/80 max-w-2xl mx-auto">
            Contact us today to discuss your transportation and logistics needs. Our team of experts is ready to help you optimize your supply chain.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center mb-12">
            <Link 
              href="/contact"
              className="btn bg-white text-primary hover:bg-gray-100 btn-lg group inline-flex items-center justify-center"
              data-aos="fade-up"
              data-aos-delay="200"
              suppressHydrationWarning={true}
            >
              <span>Contact Us</span>
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            
            <Link 
              href="tel:8003271204"
              className="btn btn-outline border-white text-white hover:bg-white/10 btn-lg inline-flex items-center justify-center"
              data-aos="fade-up"
              data-aos-delay="300"
              suppressHydrationWarning={true}
            >
              <Phone className="mr-2 h-5 w-5" />
              <span>(800) 327-1204</span>
            </Link>
          </div>
          
          <div 
            className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="400"
            suppressHydrationWarning={true}
          >
            <h3 className="text-2xl font-bold mb-4">Quick Contact</h3>
            <p className="mb-6 text-white/80">
              Send us a message and we'll get back to you within 24 hours.
            </p>
            
            <div className="flex items-center justify-center gap-4">
              <Link 
                href="mailto:sales@mvtwarehousing.com"
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors px-4 py-3 rounded-lg"
              >
                <Mail className="h-5 w-5" />
                <span>sales@mvtwarehousing.com</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
