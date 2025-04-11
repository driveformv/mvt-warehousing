import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const testimonials = [
    {
      quote: "MVT Warehousing has transformed our logistics operations. Their state-of-the-art facilities and real-time tracking have significantly improved our efficiency and customer satisfaction.",
      author: "John Smith",
      position: "CEO, ABC Manufacturing",
      rating: 5,
    },
    {
      quote: "We've been working with MVT Warehousing for over 5 years, and their service has been consistently excellent. Their team is responsive, professional, and always goes the extra mile.",
      author: "Sarah Johnson",
      position: "Operations Director, XYZ Retail",
      rating: 5,
    },
    {
      quote: "MVT Warehousing provides exceptional service with their modern facilities and responsive team. They've helped us streamline our operations and reduce costs significantly.",
      author: "Michael Brown",
      position: "Logistics Manager, Global Imports",
      rating: 5,
    },
    {
      quote: "The team at MVT Warehousing understands our business needs and consistently delivers solutions that exceed our expectations. Their attention to detail and commitment to excellence is unmatched.",
      author: "Jennifer Lee",
      position: "Supply Chain Director, Tech Innovations",
      rating: 5,
    },
  ];

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="bg-gray-50 py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it - hear from some of our satisfied clients
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative" data-aos="fade-up" data-aos-delay="200">
          {/* Testimonial Cards */}
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg">
                    {/* Rating Stars */}
                    <div className="flex mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="text-yellow-400 fill-yellow-400 w-5 h-5" />
                      ))}
                    </div>
                    
                    {/* Quote */}
                    <blockquote className="text-lg md:text-xl text-gray-700 mb-8 italic">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    {/* Author */}
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-mvt-blue/10 rounded-full flex items-center justify-center text-mvt-blue font-bold text-xl">
                        {testimonial.author.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <p className="font-bold text-mvt-text">{testimonial.author}</p>
                        <p className="text-gray-500 text-sm">{testimonial.position}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center mt-8 gap-4">
            <button 
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-white shadow-md hover:bg-mvt-blue hover:text-white transition-colors focus-ring"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            {/* Indicators */}
            <div className="flex items-center gap-2 mx-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    activeIndex === index 
                      ? "bg-mvt-blue w-6" 
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-white shadow-md hover:bg-mvt-blue hover:text-white transition-colors focus-ring"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        {/* Trust Signals */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center" data-aos="fade-up" data-aos-delay="400">
          <div className="bg-white p-6 rounded-lg shadow-sm w-full max-w-[180px] h-24 flex items-center justify-center">
            <div className="text-gray-400 font-bold text-xl">CLIENT LOGO</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm w-full max-w-[180px] h-24 flex items-center justify-center">
            <div className="text-gray-400 font-bold text-xl">CLIENT LOGO</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm w-full max-w-[180px] h-24 flex items-center justify-center">
            <div className="text-gray-400 font-bold text-xl">CLIENT LOGO</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm w-full max-w-[180px] h-24 flex items-center justify-center">
            <div className="text-gray-400 font-bold text-xl">CLIENT LOGO</div>
          </div>
        </div>
      </div>
    </section>
  );
}
