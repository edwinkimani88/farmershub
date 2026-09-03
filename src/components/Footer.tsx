import React from 'react';
import { Link } from 'react-router-dom';
import { FarmersHubLogo } from './FarmersHubLogo';
import {
  Phone, Mail, MapPin, ShieldCheck,
  ArrowRight, Heart,
} from 'lucide-react';

interface FooterProps {
  onOpenVetBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenVetBooking }) => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#04361A] text-white pt-20 pb-10 border-t-4 border-[#FFB70F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">

        {/* Pre-footer CTA Banner */}
        <div className="relative rounded-3xl overflow-hidden mb-16 p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8"
          style={{ background: 'linear-gradient(135deg, #0B5C2C 0%, #419C09 100%)' }}>
          <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-[#FFB70F]/10 blur-3xl pointer-events-none" />
          <div className="max-w-xl text-center lg:text-left relative z-10">
            <span className="inline-block bg-[#04361A]/60 text-[#FFB70F] text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider mb-3">
              Dharura Shambani? 24/7 Response
            </span>
            <h3 className="font-outfit font-black text-2xl sm:text-3xl leading-tight">
              Get Certified Veterinary Care or Fast Farm Delivery Today
            </h3>
            <p className="text-white/80 text-sm mt-2">
              Join 14,200+ Kenyan farmers across Kiambu, Nakuru, Uasin Gishu, and Kericho who trust Farmers Hub.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 relative z-10 w-full lg:w-auto shrink-0">
            <button
              onClick={onOpenVetBooking}
              className="px-6 py-3.5 bg-[#FFB70F] hover:bg-white text-[#04361A] font-black text-sm rounded-xl shadow-lg transition-all text-center"
            >
              Get Veterinary Help Now
            </button>
            <Link
              to="/shop"
              className="px-6 py-3.5 bg-[#04361A]/60 hover:bg-[#04361A] text-white font-bold text-sm rounded-xl transition-all text-center flex items-center justify-center gap-2"
            >
              Order Feeds & Meds <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">

          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block">
              <div className="bg-white rounded-2xl p-3 inline-block shadow-md">
                <FarmersHubLogo variant="horizontal" size="md" theme="light" />
              </div>
            </Link>
            <p className="text-sm text-white/70 leading-relaxed max-w-sm pt-1">
              Kenya's premier veterinary care and agricultural platform. Professional animal health, high-yield feeds, multi-species livestock expertise, and a united community of everyday farmers.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#FFB70F] font-bold">
              <ShieldCheck className="w-4 h-4 text-[#419C09]" />
              Kenya Veterinary Board (KVB) Registered
            </div>
            <p className="text-xs text-white/40 italic">"Hii ni ya sisi — shamba lako, mifugo yako, faida yako."</p>
          </div>

          {/* Veterinary & Care */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-black uppercase tracking-wider text-xs text-[#FFB70F]">Veterinary & Care</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              {[
                ['Farm Visits & Diagnosis', '/veterinary'],
                ['Poultry Health', '/poultry'],
                ['Vaccination Programs', '/veterinary'],
                ['Artificial Insemination', '/veterinary'],
                ['Nutrition Support', '/veterinary'],
              ].map(([label, path]) => (
                <li key={label}>
                  <Link to={path} className="hover:text-[#FFB70F] transition-colors">{label}</Link>
                </li>
              ))}
              <li>
                <button onClick={onOpenVetBooking} className="text-[#FFB70F] font-bold hover:underline text-sm">
                  Emergency Vet Booking →
                </button>
              </li>
            </ul>
          </div>

          {/* Livestock & Shop */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-black uppercase tracking-wider text-xs text-[#FFB70F]">Livestock & Shop</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              {[
                ['🐔 Poultry Hub', '/poultry'],
                ['🐄 Cattle & Dairy', '/livestock'],
                ['🐖 Pigs', '/livestock'],
                ['🐐 Goats & Sheep', '/livestock'],
                ['Feeds & Nutrition', '/shop'],
                ['Animal Health Products', '/shop'],
                ['Farm Products', '/shop'],
              ].map(([label, path]) => (
                <li key={label}>
                  <Link to={path} className="hover:text-[#FFB70F] transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform & Contacts */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-black uppercase tracking-wider text-xs text-[#FFB70F]">Platform</h4>
            <ul className="space-y-2 text-sm text-white/70 mb-6">
              {[
                ['Farmer Portal', '/portal'],
                ['Community Baraza', '/community'],
                ['Farm Knowledge', '/learn'],
                ['About Farmers Hub', '/about'],
                ['Contact Us', '/contact'],
                ['Sign Up', '/signup'],
              ].map(([label, path]) => (
                <li key={label}>
                  <Link to={path} className="hover:text-[#FFB70F] transition-colors">{label}</Link>
                </li>
              ))}
            </ul>

            <div className="space-y-2.5 text-sm">
              <h4 className="font-black uppercase tracking-wider text-xs text-[#FFB70F]">Contacts</h4>
              <div className="flex items-center gap-2 text-white/70">
                <Phone className="w-4 h-4 text-[#419C09] shrink-0" />
                <a href="tel:+254707732280" className="font-bold text-white hover:text-[#FFB70F] transition-colors">0707 73 22 80</a>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <Mail className="w-4 h-4 text-[#419C09] shrink-0" />
                <a href="mailto:huduma@farmershub.co.ke" className="hover:text-[#FFB70F] transition-colors text-xs">huduma@farmershub.co.ke</a>
              </div>
              <div className="flex items-start gap-2 text-white/70">
                <MapPin className="w-4 h-4 text-[#419C09] shrink-0 mt-0.5" />
                <span className="text-xs">Githunguri, Kiambu • Nakuru • Eldoret • Kericho</span>
              </div>
              <div className="bg-white/08 rounded-xl p-2.5 border border-white/10 text-xs text-white/80 mt-2">
                <span className="text-[#FFB70F] font-bold">M-Pesa Paybill:</span> 842 100 • Account: Your Phone No.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <div className="flex items-center gap-1.5">
            <span>© {year} Farmers Hub Kenya Limited. All Rights Reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Made with</span>
            <Heart className="w-3 h-3 text-[#419C09] hidden sm:inline" />
            <span className="hidden sm:inline">for Kenyan farmers.</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-white transition-colors">About</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
            <Link to="/portal" className="hover:text-white transition-colors">Farmer Portal</Link>
            <Link to="/learn" className="hover:text-white transition-colors">Knowledge</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
