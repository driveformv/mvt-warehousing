"use client";

import { Mail, Phone, MapPin, Clock } from "lucide-react";
import Image from "next/image";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import ContactForm from "@/components/contact-form";
import { pageview } from "@/lib/analytics";
import { useEffect, useState } from "react";
import { 
  DEFAULT_MAP_CENTER, 
  DEFAULT_CONTAINER_STYLE,
  DEFAULT_ZOOM_LEVEL,
  FACILITY_LOCATIONS,
  BLUE_MAP_STYLE
} from "@/lib/google-maps";

export default function ContactClient() {
  useEffect(() => {
    pageview('/contact');
  }, []);

  // State for map loading
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [mapError, setMapError] = useState<string | null>(null);
  const [mapApiKey, setMapApiKey] = useState<string>('');
  const [mapScriptLoaded, setMapScriptLoaded] = useState(false);
  
  // Fetch the API key only once
  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const { getSupabaseUrl, getSupabaseAnonKey } = await import('@/lib/supabase');
        const supabaseUrl = getSupabaseUrl();
        const anonKey = getSupabaseAnonKey();
        
        if (!supabaseUrl || !anonKey) {
          setMapError('SUPABASE_URL or SUPABASE_ANON_KEY is not defined');
          console.error('SUPABASE_URL or SUPABASE_ANON_KEY is not defined');
          setIsMapLoading(false);
          return;
        }
        
        console.log('Fetching Google Maps API key from Supabase Edge Function');
        
        const response = await fetch(`${supabaseUrl}/functions/v1/google-maps/api-key`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${anonKey}`
          }
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch API key: ${response.status} ${errorText}`);
        }
        
        const data = await response.json();
        if (!data.apiKey) {
          throw new Error('API key not found in response');
        }
        
        console.log('Successfully fetched Google Maps API key');
        setMapApiKey(data.apiKey);
        
        // Now that we have the API key, load the Google Maps script
        loadGoogleMapsScript(data.apiKey);
      } catch (error) {
        console.error('Error fetching API key:', error);
        setMapError(error instanceof Error ? error.message : 'Failed to load Google Maps');
        setIsMapLoading(false);
      }
    };
    
    fetchApiKey();
  }, []);
  
  // Function to load the Google Maps script
  const loadGoogleMapsScript = (apiKey: string) => {
    if (typeof window === 'undefined' || window.google?.maps || document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]')) {
      setMapScriptLoaded(true);
      setIsMapLoading(false);
      return;
    }
    
    const libraries = ['places', 'geometry'];
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=${libraries.join(',')}`;
    script.async = true;
    script.onload = () => {
      setMapScriptLoaded(true);
      setIsMapLoading(false);
    };
    script.onerror = () => {
      setMapError('Failed to load Google Maps script');
      setIsMapLoading(false);
    };
    
    document.head.appendChild(script);
  };
  
  const [selectedFacility, setSelectedFacility] = useState<null | typeof FACILITY_LOCATIONS[0]>(null);

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

      {/* Contact Information and Form Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
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
                      <p className="font-medium">El Paso - Chino (Headquarters)</p>
                      <p className="text-gray-600">7167 Chino Drive, El Paso, TX 79915</p>
                    </div>
                    <div>
                      <p className="font-medium">El Paso - Merchant</p>
                      <p className="text-gray-600">7180 Merchant, El Paso, TX</p>
                    </div>
                    <div>
                      <p className="font-medium">El Paso - Welch</p>
                      <p className="text-gray-600">5850 Welch Ave, El Paso, TX 79905</p>
                    </div>
                    <div>
                      <p className="font-medium">El Paso - Welch II</p>
                      <p className="text-gray-600">5830 Welch Ave, El Paso, TX 79905</p>
                    </div>
                    <div>
                      <p className="font-medium">El Paso - Cross Dock</p>
                      <p className="text-gray-600">7131 Copper Queen, El Paso, TX</p>
                    </div>
                    <div>
                      <p className="font-medium">Santa Teresa</p>
                      <p className="text-gray-600">4950 Avenida Creel, Santa Teresa, NM</p>
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
          </div>
          <ContactForm className="p-8 rounded-xl shadow-lg" />
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Strategic Locations</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Seven strategically located facilities across the US-Mexico border regions
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-lg">
            <div className="w-full h-[500px] relative">
              {mapScriptLoaded ? (
                <GoogleMap
                  mapContainerStyle={DEFAULT_CONTAINER_STYLE}
                  center={DEFAULT_MAP_CENTER}
                  zoom={DEFAULT_ZOOM_LEVEL}
                  options={{
                    styles: BLUE_MAP_STYLE,
                    disableDefaultUI: false,
                    zoomControl: true,
                    mapTypeControl: true,
                    streetViewControl: false,
                    fullscreenControl: true
                  }}
                >
                  {FACILITY_LOCATIONS.map((facility, index) => (
                    <Marker 
                      key={index} 
                      position={facility.position} 
                      title={facility.name}
                      onClick={() => setSelectedFacility(facility)}
                    />
                  ))}
                  
                  {selectedFacility && (
                    <InfoWindow
                      position={selectedFacility.position}
                      onCloseClick={() => setSelectedFacility(null)}
                    >
                      <div className="p-2 max-w-xs">
                        <h3 className="font-bold text-lg">{selectedFacility.name}</h3>
                        <p className="text-sm mb-2">{selectedFacility.address}</p>
                        <a 
                          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(selectedFacility.address)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Get Directions →
                        </a>
                      </div>
                    </InfoWindow>
                  )}
                </GoogleMap>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-lg text-gray-500">Loading map...</p>
                </div>
              )}
              <div className="absolute bottom-4 left-4 right-4 text-black bg-white/70 p-2 rounded">
                <h4 className="font-bold text-xl mb-1">US-Mexico Border Operations</h4>
                <p>Strategically positioned facilities along the US-Mexico border for efficient cross-border logistics</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-mvt-blue text-white py-20 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Need Immediate Assistance?</h2>
            <p className="text-xl mb-10 text-white/80 max-w-2xl mx-auto">
              Our team is ready to help you with any questions about our transportation and warehousing services.
            </p>

            <div className="flex flex-col md:flex-row gap-6 justify-center mb-12">
              <a href="tel:8003271204" className="btn bg-white text-mvt-blue hover:bg-gray-100 btn-lg group inline-flex items-center justify-center">
                <Phone className="mr-2 h-5 w-5" />
                <span>Call (800) 327-1204</span>
              </a>
              <a href="mailto:sales@mvtwarehousing.com" className="btn btn-outline border-white text-white hover:bg-white/10 btn-lg inline-flex items-center justify-center">
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
