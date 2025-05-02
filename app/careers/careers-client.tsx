"use client";

import { Briefcase, CheckCircle, Clock, DollarSign, MapPin, Phone, Shield, Truck, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";

export default function CareersClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    resume: "",
    message: "",
  });
  
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({
    type: null,
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });
    
    try {
      // Create a FormData object to send the file
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('position', formData.position);
      formDataToSend.append('experience', formData.experience);
      formDataToSend.append('message', formData.message || '');
      
      // Append the resume file if it exists
      if (resumeFile) {
        formDataToSend.append('resume', resumeFile);
      }
      
      const response = await fetch('/api/careers/apply', {
        method: 'POST',
        body: formDataToSend
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you for your application! We will get back to you soon.'
        });
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          position: "",
          experience: "",
          resume: "",
          message: "",
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.error || 'Something went wrong. Please try again.'
        });
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmitStatus({
        type: 'error',
        message: 'An error occurred. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[400px]">
        <Image
          src="/images/4-1.jpg"
          alt="Careers at MVT Warehousing"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Join Our Team</h1>
          <p className="text-xl md:text-2xl text-center max-w-3xl mx-auto">
            Build your career with a company that values safety, integrity, and excellence
          </p>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Work With MVT Warehousing?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer competitive benefits and a supportive work environment where you can thrive
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <DollarSign className="text-blue-600" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Competitive Pay</h3>
            <p className="text-gray-600">
              New and better pay structures with performance-based incentives to reward your hard work and dedication.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="text-blue-600" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Home Time</h3>
            <p className="text-gray-600">
              Weekly home time with 34-hour resets at home, allowing you to maintain a healthy work-life balance.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="text-blue-600" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Safety First</h3>
            <p className="text-gray-600">
              We prioritize safety with well-maintained equipment, comprehensive training, and 24/7 roadside assistance.
            </p>
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Current Openings</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our available positions and find the perfect fit for your skills and experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Truck className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">CDL Drivers</h3>
                  <p className="text-gray-600 mb-4">
                    We're looking for experienced CDL drivers to join our team at our terminal locations in El Paso, Del Rio, and Laredo, TX.
                  </p>
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">Full-Time</span>
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">CDL Required</span>
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">Benefits</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={16} />
                    <span>El Paso, Del Rio, Laredo, TX</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Briefcase className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Warehouse Associates</h3>
                  <p className="text-gray-600 mb-4">
                    Join our warehouse team to help manage inventory, load/unload shipments, and ensure efficient operations.
                  </p>
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">Full-Time</span>
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">Experience Preferred</span>
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">Benefits</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={16} />
                    <span>El Paso, TX</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Driver Benefits */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative h-[400px]">
            <Image
              src="/images/3.jpg"
              alt="Driver Benefits"
              fill
              className="object-cover rounded-xl shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">Driver Benefits</h2>
            <p className="text-gray-600 mb-8">
              At MVT Warehousing, we value our drivers and provide a range of benefits to ensure their success and satisfaction.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold">Weekly Home Time</h3>
                  <p className="text-gray-600">Regular home time to maintain a healthy work-life balance.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold">Performance-Based Pay</h3>
                  <p className="text-gray-600">Competitive pay structure with incentives for performance.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold">Well-Maintained Equipment</h3>
                  <p className="text-gray-600">Modern, well-maintained trucks for safety and comfort.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold">24/7 Roadside Assistance</h3>
                  <p className="text-gray-600">Support whenever and wherever you need it.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold">Recognition Programs</h3>
                  <p className="text-gray-600">Driver of the Month and Driver of the Year awards to recognize excellence.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Apply Now</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Take the first step toward joining our team by filling out the application form below
            </p>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg">
            {submitStatus.type && (
              <div 
                className={`mb-6 p-4 rounded-md ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-50 text-green-700 border-l-4 border-green-500' 
                    : 'bg-red-50 text-red-700 border-l-4 border-red-500'
                }`}
              >
                {submitStatus.message}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address*
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number*
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">
                    Position Applying For*
                  </label>
                  <select
                    id="position"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select a position</option>
                    <option value="cdl-driver">CDL Driver</option>
                    <option value="warehouse-associate">Warehouse Associate</option>
                    <option value="dispatcher">Dispatcher</option>
                    <option value="administrative">Administrative</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Experience*
                </label>
                <select
                  id="experience"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select experience</option>
                  <option value="0-1">Less than 1 year</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5-10">5-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>
              <div>
                <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">
                  Resume/CV (PDF or Word document)
                </label>
                <input
                  type="file"
                  id="resume"
                  ref={fileInputRef}
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files && files.length > 0) {
                      setResumeFile(files[0]);
                      setFormData({ ...formData, resume: files[0].name });
                    }
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  accept=".pdf,.doc,.docx"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Information
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-blue-600 text-white py-4 px-6 rounded-md hover:bg-blue-700 transition-colors font-semibold text-lg ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
              <p className="text-sm text-gray-500 text-center mt-4">
                By submitting this application, you agree to our privacy policy and terms of service.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What Our Team Says</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from the people who make MVT Warehousing a great place to work
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <User className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="font-bold">Victor Leyva</h3>
                  <p className="text-gray-600">CDL Driver - 14 years</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "I'm honored to be recognized as Driver of the Year. The real reward has been working with such a great company for all these years. MVT Warehousing treats their drivers right, and that makes all the difference."
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <User className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="font-bold">Juan Perez</h3>
                  <p className="text-gray-600">Terminal Manager - 12 years</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "What I love most about working at MVT Warehousing is the family atmosphere. Even as we've grown, we've maintained that close-knit culture where everyone looks out for each other."
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <User className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="font-bold">Omar Lazo</h3>
                  <p className="text-gray-600">OTR Driver - 8 months</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Even though I've only been with MVT Warehousing for 8 months, I already feel like part of the family. The support from dispatch and management makes all the difference when you're on the road."
              </p>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join Our Team?</h2>
            <p className="text-xl mb-10 text-white/80 max-w-2xl mx-auto">
              Apply today and take the first step toward a rewarding career with MVT Warehousing.
            </p>
            
            <div className="flex flex-col md:flex-row gap-6 justify-center mb-12">
              <a 
                href="#apply-now"
                className="btn bg-white text-mvt-blue hover:bg-gray-100 btn-lg group inline-flex items-center justify-center"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <span>Apply Now</span>
                <Briefcase className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
              
              <Link 
                href="/contact"
                className="btn btn-outline border-white text-white hover:bg-white/10 btn-lg inline-flex items-center justify-center"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <Phone className="mr-2 h-5 w-5" />
                <span>Contact Recruiting</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
