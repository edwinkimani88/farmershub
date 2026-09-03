import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Sprout, 
  ArrowRight, 
  Milk, 
  Egg, 
  Scissors, 
  FileCheck2,
  CheckCircle,
  MapPin
} from 'lucide-react';
import { VET_FIELD_SERVICES } from '../data/mockData';

gsap.registerPlugin(ScrollTrigger);

interface ServicesSectionProps {
  onSelectService: (serviceId: string) => void;
  onBookVisit: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onBookVisit
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      gsap.from('.service-card-item', {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Milk':
        return <Milk className="w-5 h-5 text-white" />;
      case 'Egg':
        return <Egg className="w-5 h-5 text-white" />;
      case 'Sprout':
        return <Sprout className="w-5 h-5 text-white" />;
      default:
        return <FileCheck2 className="w-5 h-5 text-white" />;
    }
  };

  return (
    <section 
      ref={sectionRef} 
      id="services"
      className="py-16 sm:py-24 bg-[#FAFBF7] border-t border-[#E8EEE3]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header (Exact match to reference image) */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12 sm:mb-16">
          <div className="flex items-center justify-center space-x-2 text-[#2D6A4F]">
            <Sprout className="w-5 h-5" />
            <span className="font-script text-2xl sm:text-3xl font-bold">
              What We Offer • Huduma Zetu
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#152B1E] tracking-tight">
            Trusted Veterinary & Field Expertise
          </h2>

          <p className="text-sm sm:text-base text-[#4E6656]">
            When you need more than community discussions, licensed Kenyan veterinary officers and livestock agronomists are ready on the ground.
          </p>
        </div>

        {/* 4-Card Grid with Overlapping Circular Icon Badges (Exact match to reference) */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7"
        >
          {VET_FIELD_SERVICES.map((service, index) => (
            <div
              key={service.id}
              className="service-card-item bg-white rounded-2xl overflow-hidden border border-[#DCE6D7] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Card Photo Container */}
              <div className="relative h-44 sm:h-48 overflow-hidden bg-[#1B4332]">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                
                {/* County badge inside photo */}
                <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-semibold text-white flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#52B788]" />
                  <span>Active in {service.countyCoverage.split(',')[0]}</span>
                </div>
              </div>

              {/* Card Content with Overlapping Badge Perched on the Line */}
              <div className="relative p-5 pt-7 flex-1 flex flex-col justify-between space-y-4">
                
                {/* The Overlapping Circular Icon Badge (Exact signature detail from reference) */}
                <div className="absolute -top-6 left-5 w-12 h-12 rounded-full bg-[#2D6A4F] border-2 border-white shadow-md flex items-center justify-center transition-transform group-hover:scale-110">
                  {getIcon(service.iconName)}
                </div>

                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#52796F]">
                    {service.subtitle}
                  </span>
                  <h3 className="text-lg font-extrabold text-[#173322] group-hover:text-[#2D6A4F] transition-colors leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4E6656] leading-relaxed line-clamp-3">
                    {service.description}
                  </p>
                </div>

                {/* Features Mini Checklist */}
                <ul className="space-y-1 text-xs text-[#35523E] border-t border-[#EDF3EA] pt-3">
                  {service.features.slice(0, 2).map((f, i) => (
                    <li key={i} className="flex items-center space-x-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-[#2D6A4F] shrink-0" />
                      <span className="truncate">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* Learn More link with arrow (Exact match to reference) */}
                <div className="pt-1">
                  <button
                    onClick={onBookVisit}
                    className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-bold text-[#2D6A4F] hover:text-[#183B29] transition-colors group-hover:translate-x-1 duration-200"
                  >
                    <span>Request Farm Checkup</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Secondary reassurance note */}
        <div className="mt-10 text-center text-xs text-[#6A8271]">
          <span>KVB Registered Veterinary Surgeons • Transparent Field Visit Rates • Digital Records Linked to Portal</span>
        </div>

      </div>
    </section>
  );
};
