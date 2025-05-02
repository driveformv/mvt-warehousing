import { TrendingUp, MapPin, Clock, Award, Train } from "lucide-react";

export default function StatsSection() {
  const stats = [
    {
      value: "700K+",
      label: "Square Feet of Space",
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      delay: 100,
    },
    {
      value: "38+",
      label: "Years of Experience",
      icon: <Clock className="h-8 w-8 text-primary" />,
      delay: 300,
    },
    {
      value: "7",
      label: "Strategic Locations",
      icon: <MapPin className="h-8 w-8 text-primary" />,
      delay: 500,
    },
    {
      value: "Rail",
      label: "UPRR & BNSF Access",
      icon: <Train className="h-8 w-8 text-primary" />,
      delay: 700,
    },
  ];

  return (
    <section className="bg-gradient-to-r from-primary/5 to-accent/5 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              data-aos="fade-up"
              data-aos-delay={stat.delay}
              suppressHydrationWarning={true}
            >
              <div className="flex justify-center mb-4">
                {stat.icon}
              </div>
              <p className="text-4xl font-bold text-primary mb-2">{stat.value}</p>
              <p className="text-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
