import React, { useState } from 'react';
import { Sprout, Send, CheckCircle2 } from 'lucide-react';

export const NewsletterBar: React.FC = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrPhone.trim()) return;
    setSubscribed(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 -mb-10 sm:-mb-12 relative z-20">
      {/* Exact Match to Reference Image's Dark Green Rounded Bar with Leaf Motifs */}
      <div className="bg-[#143525] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-[#2D6A4F]/40 flex flex-col lg:flex-row items-center justify-between gap-6">
        
        {/* Left: Leaf Emblem & Text */}
        <div className="flex items-center space-x-4 text-left">
          <div className="w-12 h-12 rounded-2xl bg-[#2D6A4F] border border-[#52B788]/40 flex items-center justify-center text-[#95D5B2] shrink-0">
            <Sprout className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-white">
              Stay Updated with Shamba Alerts & County Weather
            </h3>
            <p className="text-xs sm:text-sm text-[#A3B899] mt-0.5">
              Jiunge upate SMS alerts za mvua, bei za commercial feeds, na ushauri wa madaktari wa mifugo!
            </p>
          </div>
        </div>

        {/* Right: Input & Subscribe Button */}
        <div className="w-full lg:w-auto shrink-0">
          {subscribed ? (
            <div className="flex items-center space-x-2 bg-[#2D6A4F]/40 border border-[#52B788]/50 px-5 py-3 rounded-full text-xs sm:text-sm font-bold text-[#95D5B2]">
              <CheckCircle2 className="w-4 h-4 text-[#52B788]" />
              <span>Asante! Tumekuongeza kwa weekly farming alerts.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
              <input
                type="text"
                required
                placeholder="Phone (+254) au Email yako..."
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                className="w-full sm:w-72 px-4 py-3 bg-white text-[#1A2E20] placeholder-[#7F9988] text-xs sm:text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-[#52B788]"
              />
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#2D6A4F] hover:bg-[#235740] text-white text-xs sm:text-sm font-bold py-3 px-6 rounded-full transition-all shadow-md active:scale-98"
              >
                <span>Jiunge</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
