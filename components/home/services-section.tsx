import Link from "next/link";
import { TruckIcon, Warehouse, Package, ArrowRight } from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      icon: <TruckIcon className="text-white" size={28} />,
      title: "Full Truckload Transportation",
      description: "We are a bonded (US Customs) carrier providing both solo and team driver service. All tractors and trailers are equipped with satellite tracking and on demand location reporting.",
      link: "/services#transportation",
      delay: 100,
    },
    {
      icon: <Warehouse className="text-white" size={28} />,
      title: "Warehouse and Distribution",
      description: "With over 550,000 square feet of space, MVT Warehousing has a strong commitment to warehousing on the border providing contract and public warehousing with complete account management.",
      link: "/services#warehousing",
      delay: 300,
    },
    {
      icon: <Package className="text-white" size={28} />,
      title: "Bulk Transfer / Packaging",
      description: "With more than 30 years of experience in the industry, MVT Warehousing can unload from railcar or ocean containers and deliver to the customer silo or box.",
      link: "/services#bulk-transfer",
      delay: 500,
    },
  ];

  return (
    <section className="py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Integrated transportation and warehousing services tailored to your business needs
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full group hover:-translate-y-2"
              data-aos="fade-up"
              data-aos-delay={service.delay}
            >
              <div className="p-8">
                <div className="bg-mvt-blue p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-mvt-red transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6 flex-grow">
                  {service.description}
                </p>
                <Link 
                  href={service.link}
                  className="text-mvt-blue hover:text-mvt-lightBlue font-semibold inline-flex items-center group/link"
                >
                  <span>Learn More</span>
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center" data-aos="fade-up" data-aos-delay="700">
          <Link 
            href="/services" 
            className="btn btn-primary btn-lg inline-flex items-center group"
          >
            <span>View All Services</span>
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
