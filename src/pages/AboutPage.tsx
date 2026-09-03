import React from 'react';
import { FarmersHubLogo } from '../components/FarmersHubLogo';
import { ShieldCheck, Heart, Users, Award, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-[#FAF8F2] min-h-screen py-8 sm:py-16">
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-16">
        <div className="bg-[#04361A] text-white rounded-3xl p-8 sm:p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#419C09]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl relative z-10">
            <span className="inline-block bg-[#FFB70F] text-[#04361A] text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-4">
              Kuhusu Sisi • Our Story
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-6">
              Born from the Soil, Built for the Everyday Kenyan Farmer
            </h1>
            <p className="text-base sm:text-lg text-white/80 leading-relaxed font-medium">
              Farmers Hub was founded with a singular conviction: Kenyan livestock and poultry farming should be profitable, predictable, and dignified. We bridged the gap between scientific veterinary medicine and the everyday reality of the shamba.
            </p>
          </div>
        </div>
      </div>

      {/* Narrative Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-neutral-700 leading-relaxed text-sm sm:text-base">
            <h2 className="text-2xl sm:text-3xl font-black text-[#04361A]">
              Why We Rejected Textbook Theories
            </h2>
            <p>
              For decades, African farming advice was either copied from temperate European manuals or relegated to informal hearsay in agrovets. Smallholders were sold diluted medicines, uncertified feeds with missing proteins, and left stranded when cows developed East Coast Fever at 2:00 AM.
            </p>
            <p>
              Farmers Hub changed that model. We deployed mobile veterinary vans staffed by registered veterinarians with the Kenya Veterinary Board (KVB). We partnered with reputable feed mills to deliver genuine layers mash, silage inoculants, and mineral blocks directly to farm gates.
            </p>
            <div className="p-6 bg-white rounded-2xl border-l-4 border-[#FFB70F] shadow-sm font-semibold text-[#04361A] italic">
              “Hii ni ya sisi. Every protocol, medicine dosage, and feed ratio on Farmers Hub is calibrated for Kenyan altitudes, heat stress, local forage varieties, and commercial market reality.”
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-3xl border border-[#04361A]/10 shadow-sm space-y-2">
              <span className="text-3xl font-black text-[#419C09]">14,200+</span>
              <h4 className="font-bold text-sm text-[#04361A]">Registered Wakulima</h4>
              <p className="text-xs text-neutral-500">Across 10 Kenyan counties managing dairy herds and poultry flocks.</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#04361A]/10 shadow-sm space-y-2">
              <span className="text-3xl font-black text-[#FFB70F]">38+</span>
              <h4 className="font-bold text-sm text-[#04361A]">Field Veterinarians</h4>
              <p className="text-xs text-neutral-500">KVB registered officers stationed across regional mobile vans.</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#04361A]/10 shadow-sm space-y-2">
              <span className="text-3xl font-black text-[#04361A]">98.4%</span>
              <h4 className="font-bold text-sm text-[#04361A]">Clinical Recovery</h4>
              <p className="text-xs text-neutral-500">Proven on-site survival for acute mastitis, ECF, and brooding stress.</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#04361A]/10 shadow-sm space-y-2">
              <span className="text-3xl font-black text-[#419C09]">100%</span>
              <h4 className="font-bold text-sm text-[#04361A]">Certified Inputs</h4>
              <p className="text-xs text-neutral-500">Strict laboratory quality control on protein and mineral levels.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Leadership & Vets */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-16">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#04361A]/10 shadow-sm">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-black uppercase tracking-wider text-[#419C09]">Vetted Expertise</span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#04361A] mt-1">
              Field Leadership & Veterinary Board
            </h3>
            <p className="text-sm text-neutral-600 mt-1">
              Led by seasoned livestock practitioners committed to ethical farming and animal welfare.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Dr. Beatrice Mwangi, BVM',
                role: 'Head of Veterinary Clinical Services',
                qualification: 'KVB Reg. #2948 • University of Nairobi',
                focus: 'Poultry pathology, flock necropsy audits, and biosecurity design.'
              },
              {
                name: 'Dr. David Kiprop, BVM, MSc',
                role: 'Director of Herd Health & Genetics',
                qualification: 'KVB Reg. #1872 • Egerton University',
                focus: 'Dairy cattle reproduction, sexed semen AI, and Mastitis prevention.'
              },
              {
                name: 'Agnes Wangari, MSc',
                role: 'Lead Animal Nutritionist & Forage Agronomist',
                qualification: 'MSc Animal Science • JKUAT',
                focus: 'Maize silage fermentation, TMR rations, and zero-grazing feed economics.'
              }
            ].map((member, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#FAF8F2] border border-[#04361A]/10">
                <div className="w-12 h-12 rounded-xl bg-[#04361A] text-white flex items-center justify-center font-bold text-sm mb-4">
                  {member.name.slice(4, 6).toUpperCase()}
                </div>
                <h4 className="font-extrabold text-base text-[#04361A]">{member.name}</h4>
                <div className="text-xs font-bold text-[#419C09] mb-1">{member.role}</div>
                <div className="text-[11px] text-neutral-500 font-medium mb-3">{member.qualification}</div>
                <p className="text-xs text-neutral-600 leading-relaxed">{member.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
