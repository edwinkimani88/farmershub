import React, { useState } from 'react';
import { MOCK_VET_SERVICES, KENYAN_COUNTY_HUBS } from '../data/shopAndLivestockData';
import { VetServiceItem } from '../types';
import { 
  Stethoscope, 
  Clock, 
  ShieldCheck, 
  Phone, 
  CheckCircle2, 
  AlertTriangle, 
  MapPin, 
  Calendar, 
  FileCheck, 
  ArrowRight,
  Sparkles,
  Award,
  Users
} from 'lucide-react';

interface VeterinaryPageProps {
  onOpenVetBooking: () => void;
}

export const VeterinaryPage: React.FC<VeterinaryPageProps> = ({ onOpenVetBooking }) => {
  const [selectedService, setSelectedService] = useState<VetServiceItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Clinical & Emergency', 'Poultry Speciality', 'Reproduction & AI', 'Herd Health & Audits'];

  const filteredServices = activeCategory === 'All'
    ? MOCK_VET_SERVICES
    : MOCK_VET_SERVICES.filter(s => s.category === activeCategory);

  return (
    <div className="bg-[#FAF8F2] min-h-screen py-8 sm:py-12">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-12">
        <div className="bg-[#04361A] text-white rounded-3xl p-6 sm:p-12 relative overflow-hidden shadow-2xl border border-[#04361A]">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#419C09]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute right-16 bottom-8 w-44 h-44 bg-[#FFB70F]/15 rounded-full blur-2xl pointer-events-none" />

          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 bg-[#FFB70F] text-[#04361A] text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-4 shadow-xs">
              <ShieldCheck className="w-4 h-4" /> Registered by Kenya Veterinary Board (KVB)
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-4">
              Professional Field Veterinary Care at Your Shamba Gate
            </h1>

            <p className="text-base sm:text-lg text-white/80 leading-relaxed font-medium mb-8">
              No more guessing diseases over blurry WhatsApp photos or losing cows to late treatments. Our licensed mobile veterinary officers arrive at your farm with clinical equipment, emergency medicines, and diagnostic tools in under 2 hours.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onOpenVetBooking}
                className="px-8 py-4 bg-[#FFB70F] hover:bg-white text-[#04361A] font-black text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2.5 group"
              >
                <Stethoscope className="w-5 h-5 text-[#04361A]" />
                <span>Book Emergency Vet Visit</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href="tel:+254707732280"
                className="px-6 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 backdrop-blur-xs"
              >
                <Phone className="w-4 h-4 text-[#FFB70F]" />
                <span>Call Emergency Hotline: 0707 73 22 80</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Trust & Performance Metrics Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { metric: '< 2 Hours', label: 'Average Emergency Dispatch', sub: 'Kiambu, Nakuru, Eldoret & Kericho' },
            { metric: '38+', label: 'KVB-Licensed Field Vets', sub: 'Qualified BVM degree veterinarians' },
            { metric: '98.4%', label: 'Clinical Recovery Rate', sub: 'Over 6,200 treated cattle & flocks' },
            { metric: 'Official PDF', label: 'Digital Visit Certificate', sub: 'Signed treatment history in Portal' }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-[#04361A]/10 shadow-xs">
              <div className="text-2xl sm:text-3xl font-black text-[#04361A] mb-1">
                {item.metric}
              </div>
              <div className="text-xs font-bold text-neutral-800 mb-0.5">
                {item.label}
              </div>
              <div className="text-[11px] text-neutral-500">
                {item.sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-[#419C09]">
              Huduma za Daktari Shambani
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#04361A] tracking-tight">
              Veterinary Services & On-Site Audits
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-[#04361A] text-white shadow-xs'
                    : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-[#04361A]/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl border border-[#04361A]/10 p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#419C09]/15 text-[#419C09] flex items-center justify-center font-bold">
                    <Stethoscope className="w-6 h-6" />
                  </div>
                  {service.emergencyAvailable && (
                    <span className="bg-red-100 text-red-700 text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
                      24/7 Rapid Dispatch
                    </span>
                  )}
                </div>

                <span className="text-[11px] font-extrabold text-[#419C09] uppercase tracking-wider block mb-1">
                  {service.category}
                </span>

                <h3 className="text-xl font-black text-[#04361A] mb-1 leading-snug">
                  {service.title}
                </h3>
                <p className="text-xs text-neutral-500 italic mb-3">
                  {service.swahiliTitle}
                </p>

                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4">
                  {service.shortDesc}
                </p>

                <div className="bg-[#FAF8F2] p-3.5 rounded-2xl border border-[#04361A]/10 space-y-2 mb-6">
                  {service.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-neutral-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#419C09] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#04361A]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] text-neutral-500 block">Estimated Cost</span>
                  <span className="text-sm font-extrabold text-[#04361A]">
                    {service.pricingEstimate}
                  </span>
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="px-4 py-2 rounded-xl border border-[#04361A]/20 text-xs font-bold text-[#04361A] hover:bg-neutral-50"
                  >
                    Details
                  </button>
                  <button
                    onClick={onOpenVetBooking}
                    className="flex-1 sm:flex-none px-5 py-2.5 bg-[#04361A] hover:bg-[#419C09] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Request Visit</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* County Dispatch Hubs Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-16">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#04361A]/10 shadow-sm">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-black uppercase tracking-wider text-[#419C09]">
              Coverage & Response Network
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#04361A] mt-1">
              Active County Field Veterinary Hubs
            </h3>
            <p className="text-sm text-neutral-600 mt-1">
              Our mobile vet vans are permanently stationed in key livestock regions for swift farm-gate arrival.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {KENYAN_COUNTY_HUBS.map((hub, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#04361A]/10">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-extrabold text-sm text-[#04361A]">{hub.county} County</span>
                  <span className="bg-[#419C09]/20 text-[#04361A] text-[10px] font-black px-2 py-0.5 rounded-full">
                    {hub.vetsOnCall} Vets Active
                  </span>
                </div>
                <p className="text-xs font-semibold text-neutral-800 mb-1">{hub.hubName}</p>
                <div className="flex items-center gap-1.5 text-xs text-neutral-600 mb-2">
                  <MapPin className="w-3.5 h-3.5 text-[#419C09] shrink-0" />
                  <span>{hub.town}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#04361A]">
                  <Phone className="w-3.5 h-3.5 text-[#FFB70F] shrink-0" />
                  <a href={`tel:${hub.phone}`} className="hover:underline">{hub.phone}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF8F2] w-full max-w-2xl rounded-3xl shadow-2xl border border-[#04361A]/15 overflow-hidden my-8 p-6 sm:p-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs font-bold text-[#419C09] uppercase tracking-wider">
                  {selectedService.category}
                </span>
                <h3 className="text-2xl font-black text-[#04361A] mt-1">
                  {selectedService.title}
                </h3>
                <p className="text-xs text-neutral-500 italic">{selectedService.swahiliTitle}</p>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="p-2 rounded-lg text-neutral-500 hover:bg-neutral-200"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-neutral-700 mb-6">
              <p className="leading-relaxed font-medium">{selectedService.fullDesc}</p>

              <div className="bg-white p-4 rounded-xl border border-[#04361A]/10 space-y-2">
                <h4 className="font-bold text-[#04361A]">What This Visit Includes:</h4>
                <ul className="space-y-1.5">
                  {selectedService.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#419C09] shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-white p-3 rounded-xl border border-[#04361A]/10">
                  <span className="text-neutral-500 block">Pricing</span>
                  <span className="font-bold text-[#04361A]">{selectedService.pricingEstimate}</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-[#04361A]/10">
                  <span className="text-neutral-500 block">Turnaround Time</span>
                  <span className="font-bold text-[#419C09]">{selectedService.turnaroundTime}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setSelectedService(null)}
                className="w-1/3 py-3 rounded-xl border border-neutral-300 font-bold text-xs text-neutral-700 hover:bg-neutral-100"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedService(null);
                  onOpenVetBooking();
                }}
                className="w-2/3 py-3 bg-[#FFB70F] hover:bg-[#04361A] hover:text-white text-[#04361A] font-extrabold text-sm rounded-xl shadow-md transition-colors"
              >
                Book This Service Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
