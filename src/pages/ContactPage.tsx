import React, { useState } from 'react';
import { KENYAN_COUNTY_HUBS } from '../data/shopAndLivestockData';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [county, setCounty] = useState('Kiambu');
  const [inquiryType, setInquiryType] = useState('Veterinary Emergency');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#FAF8F2] min-h-screen py-8 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-black uppercase tracking-wider text-[#419C09]">
            Wasiliana Nasi • Always Here for You
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-[#04361A] mt-2 mb-4 tracking-tight">
            Contact Farmers Hub Kenya
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
            Need emergency on-farm veterinary care, bulk delivery of commercial layers mash or dairy meal, or want to speak with our animal nutrition team? Reach us via phone, M-Pesa desk, or visit our county depots.
          </p>
        </div>

        {/* Emergency Callout Card */}
        <div className="bg-[#04361A] text-white p-6 sm:p-10 rounded-3xl shadow-xl mb-12 flex flex-col md:flex-row items-center justify-between gap-6 border-4 border-[#FFB70F]">
          <div>
            <span className="text-xs font-black uppercase text-[#FFB70F] tracking-wider block mb-1">
              Dharura ya Mifugo (24/7 Hotline)
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              0707 73 22 80
            </h3>
            <p className="text-xs sm:text-sm text-white/80 mt-1">
              Direct dispatch line for acute bovine or poultry emergencies. Under 2 hours response time.
            </p>
          </div>

          <a
            href="tel:+254707732280"
            className="px-8 py-3.5 bg-[#FFB70F] hover:bg-white text-[#04361A] font-black text-sm rounded-xl shadow-md transition-all shrink-0"
          >
            Call Now: 0707 73 22 80
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-[#04361A]/10 shadow-sm">
            <h3 className="text-xl font-black text-[#04361A] mb-2">Send Us a Direct Message</h3>
            <p className="text-xs text-neutral-500 mb-6">Our livestock desk responds within 30 minutes during business hours.</p>

            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#419C09] mx-auto" />
                <h4 className="text-lg font-black text-[#04361A]">Asante! Ujumbe Umepokelewa</h4>
                <p className="text-xs text-neutral-600 max-w-sm mx-auto">
                  Our regional field coordinator in {county} will call you back at <strong>{phone}</strong> shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 bg-[#04361A] text-white text-xs font-bold rounded-xl"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[#04361A] mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Samuel Kiprotich"
                      className="w-full bg-[#FAF8F2] border border-[#04361A]/20 rounded-xl p-3 text-sm font-medium"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#04361A] mb-1">M-Pesa / Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="07XX XXX XXX"
                      className="w-full bg-[#FAF8F2] border border-[#04361A]/20 rounded-xl p-3 text-sm font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[#04361A] mb-1">Your County</label>
                    <select
                      value={county}
                      onChange={(e) => setCounty(e.target.value)}
                      className="w-full bg-[#FAF8F2] border border-[#04361A]/20 rounded-xl p-3 text-sm font-medium"
                    >
                      <option value="Kiambu">Kiambu County</option>
                      <option value="Nakuru">Nakuru County</option>
                      <option value="Uasin Gishu">Uasin Gishu / Eldoret</option>
                      <option value="Kericho">Kericho County</option>
                      <option value="Kajiado">Kajiado County</option>
                      <option value="Nyeri">Nyeri County</option>
                      <option value="Machakos">Machakos County</option>
                      <option value="Other">Other Region</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-[#04361A] mb-1">Inquiry Type</label>
                    <select
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      className="w-full bg-[#FAF8F2] border border-[#04361A]/20 rounded-xl p-3 text-sm font-medium"
                    >
                      <option value="Veterinary Emergency">Veterinary Emergency Visit</option>
                      <option value="Feed Orders">Bulk Feed & Minerals Order</option>
                      <option value="AI Services">Artificial Insemination (AI)</option>
                      <option value="TMR Audit">Silage & TMR Nutrition Audit</option>
                      <option value="General">General Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#04361A] mb-1">Your Message or Farm Challenge</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe how we can help your farm..."
                    className="w-full bg-[#FAF8F2] border border-[#04361A]/20 rounded-xl p-3 text-sm font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#419C09] hover:bg-[#04361A] text-white font-bold text-sm rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to Farmers Hub Desk</span>
                </button>
              </form>
            )}
          </div>

          {/* Contact Details & Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-[#04361A]/10 shadow-sm space-y-4">
              <h3 className="text-xl font-black text-[#04361A]">Head Office & Main Depot</h3>
              
              <div className="space-y-3 text-xs text-neutral-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#419C09] shrink-0 mt-1" />
                  <div>
                    <strong className="block text-[#04361A]">Farmers Hub Central Complex</strong>
                    <span>Opposite Githunguri Dairy Farmers Co-op, Kiambu County.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#419C09] shrink-0 mt-1" />
                  <div>
                    <strong className="block text-[#04361A]">Operating Hours</strong>
                    <span>Mon – Sat: 6:30 AM – 7:30 PM EAT</span>
                    <span className="block text-[#419C09] font-bold">24/7 Mobile Vet On-Call Hotline Active</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#419C09] shrink-0 mt-1" />
                  <div>
                    <strong className="block text-[#04361A]">Official Email</strong>
                    <span>huduma@farmershub.co.ke</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-[#04361A]/10 shadow-sm">
              <h4 className="font-extrabold text-sm text-[#04361A] mb-3">Field Hubs Nationwide</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {KENYAN_COUNTY_HUBS.map((hub, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-[#FAF8F2]">
                    <strong className="block text-[#04361A]">{hub.county}</strong>
                    <span className="text-[11px] text-neutral-500">{hub.town.split(',')[0]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
