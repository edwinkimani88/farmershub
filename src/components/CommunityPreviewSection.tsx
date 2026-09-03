import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Sprout, 
  Users, 
  Leaf, 
  ArrowRight, 
  MessageSquarePlus, 
  CheckCircle2,
  HelpCircle,
  TrendingUp
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CommunityPreviewSectionProps {
  onExploreCommunity: () => void;
  onStartDiscussion: () => void;
}

export const CommunityPreviewSection: React.FC<CommunityPreviewSectionProps> = ({
  onExploreCommunity,
  onStartDiscussion
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      gsap.from(leftColRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        x: -40,
        opacity: 0,
        duration: 0.9,
        ease: 'power2.out'
      });

      gsap.from(rightColRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        x: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power2.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="about-community"
      className="py-16 sm:py-24 bg-[#F7F8F4] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Exact 2-Column Composition from Reference Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column (Spans 5 cols on lg) */}
          <div ref={leftColRef} className="lg:col-span-5 space-y-6">
            
            {/* Script Eyebrow with leaf icon (Exact match to reference) */}
            <div className="flex items-center space-x-2 text-[#2D6A4F]">
              <Sprout className="w-5 h-5 text-[#2D6A4F]" />
              <span className="font-script text-2xl font-bold tracking-wide">
                Grow Together • Tukue Pamoja
              </span>
            </div>

            {/* Bold Headline */}
            <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-[#152B1E] tracking-tight leading-[1.15]">
              Your Community, <br />
              Your Shamba
            </h2>

            {/* Narrative copy */}
            <p className="text-base sm:text-lg text-[#3E5245] leading-relaxed">
              Connect with fellow farmers across Kiambu, Kericho, Nakuru, and Kajiado. 
              Share real shamba knowledge, compare feed recipes, tackle sudden drops in milk or eggs, 
              and build healthier, more profitable farms together.
            </p>

            {/* Feature 1 with circular badge (Exact match to reference) */}
            <div className="flex items-start space-x-4 pt-2">
              <div className="w-12 h-12 rounded-full bg-[#E5EFE2] border border-[#D0E2CC] flex items-center justify-center shrink-0 text-[#2D6A4F]">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#183525]">
                  Stronger Together • Wakulima Hodari
                </h3>
                <p className="text-sm text-[#4E6656] mt-0.5 leading-snug">
                  Join county circles of farmers facing identical weather, feed prices, and market realities.
                </p>
              </div>
            </div>

            {/* Feature 2 with circular badge (Exact match to reference) */}
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-[#E5EFE2] border border-[#D0E2CC] flex items-center justify-center shrink-0 text-[#2D6A4F]">
                <Leaf className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#183525]">
                  Share & Learn • Mashauriano
                </h3>
                <p className="text-sm text-[#4E6656] mt-0.5 leading-snug">
                  Exchange homemade silage formulas, zero-grazing tips, and verified disease control methods.
                </p>
              </div>
            </div>

            {/* CTA Button (Exact match to reference green pill button) */}
            <div className="pt-3">
              <button
                onClick={onExploreCommunity}
                className="inline-flex items-center space-x-2 bg-[#1B4332] hover:bg-[#143525] text-white font-bold text-sm sm:text-base py-3.5 px-7 rounded-full shadow-sm hover:shadow transition-all duration-200 group active:scale-98"
              >
                <span>Explore Farmer Community</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#95D5B2]" />
              </button>
            </div>

          </div>

          {/* Right Column (Spans 7 cols on lg) */}
          <div ref={rightColRef} className="lg:col-span-7 space-y-6">
            
            {/* Featured Photo Box with Rounded Corners (Exact match to reference) */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-[#D8E4D3] h-[260px] sm:h-[320px] bg-[#183525]">
              <img
                src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1000&q=80"
                alt="Kenyan agricultural shamba community"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-5 right-5 text-white flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#95D5B2] uppercase tracking-wider">
                    Community Shamba Spotlight
                  </span>
                  <div className="text-base sm:text-lg font-extrabold">
                    Zero-Grazing Hygiene & High-Protein Silage
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full text-xs font-semibold text-white border border-white/20">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#52B788]" />
                  <span>Verified Kenyan Shamba</span>
                </div>
              </div>
            </div>

            {/* Lower Light-Green Card (Exact match to reference lower card) */}
            <div className="bg-[#EBF2E8] border border-[#D5E3D0] rounded-2xl sm:rounded-3xl p-6 sm:p-7 space-y-4">
              
              {/* Header with leaf icon */}
              <div className="flex items-center space-x-2 text-[#1B4332]">
                <Sprout className="w-5 h-5 text-[#2D6A4F]" />
                <h3 className="font-bold text-lg sm:text-xl text-[#163A2B]">
                  Create a Thriving Shamba • Jenga Shamba Yako
                </h3>
              </div>

              <p className="text-sm sm:text-base text-[#3E5245] leading-relaxed">
                Every healthy animal we protect, every dairy yield we optimize, and every bag of feed we save leads 
                to a better, cleaner, and more profitable tomorrow for Kenyan farming families.
              </p>

              {/* Inner Dashed/Bordered Prompt Card with Sprout in Pot (Exact match to reference) */}
              <div className="bg-white/90 border border-dashed border-[#A9C4A4] rounded-xl sm:rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors hover:border-[#2D6A4F]">
                <div className="flex items-center space-x-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#E2EDE0] text-[#2D6A4F] flex items-center justify-center shrink-0 font-bold text-xl">
                    🌱
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#183525]">
                      Start Your Community Discussion • Uliza Wakulima
                    </h4>
                    <p className="text-xs text-[#52796F] mt-0.5">
                      Ask about sudden egg drops, milk decline, or silage formulas. Other farmers are seeing the same thing!
                    </p>
                  </div>
                </div>

                <button
                  onClick={onStartDiscussion}
                  className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-bold text-[#2D6A4F] hover:text-[#1B4332] py-2 px-3 rounded-lg hover:bg-[#EBF2E8] transition-colors shrink-0 group"
                >
                  <span>Uliza Saa Hii</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
