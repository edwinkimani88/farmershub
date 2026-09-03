import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Compass, 
  MapPin, 
  TrendingUp, 
  AlertTriangle, 
  Quote, 
  ArrowRight, 
  ChevronRight,
  ChevronLeft,
  Sparkles
} from 'lucide-react';
import { REGIONAL_STORIES } from '../data/mockData';
import { RegionalStory } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface RegionalStorytellingProps {
  onSelectCountyCommunity: (county: string) => void;
}

export const RegionalStorytelling: React.FC<RegionalStorytellingProps> = ({
  onSelectCountyCommunity
}) => {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const storyCardRef = useRef<HTMLDivElement>(null);

  const currentStory: RegionalStory = REGIONAL_STORIES[activeStoryIndex];

  // GSAP animation when switching regions
  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      gsap.fromTo(
        storyCardRef.current,
        { opacity: 0.2, y: 20, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: 'power2.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [activeStoryIndex]);

  const handleNext = () => {
    setActiveStoryIndex((prev) => (prev + 1) % REGIONAL_STORIES.length);
  };

  const handlePrev = () => {
    setActiveStoryIndex((prev) => (prev - 1 + REGIONAL_STORIES.length) % REGIONAL_STORIES.length);
  };

  return (
    <section 
      ref={containerRef} 
      id="regions"
      className="py-16 sm:py-24 bg-[#142A1D] text-white relative overflow-hidden"
    >
      {/* Editorial Watermark */}
      <div className="absolute top-8 right-8 text-[120px] font-black text-white/[0.03] select-none pointer-events-none uppercase tracking-tighter">
        {currentStory.region}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Lead Banner */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#2D6A4F]/50 border border-[#52B788]/30 text-[#95D5B2] text-xs font-bold tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            <span>GSAP SCROLL JOURNEY • MAZINGIRA YA KILA COUNTY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Kenya Doesn't Have <br />
            <span className="font-script text-4xl sm:text-5xl lg:text-6xl text-[#74C69D] font-bold">
              One Farming Story
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#B7D1BF] leading-relaxed">
            From the frosty tea hills of Kericho to the zero-grazing pressure of Kiambu and the arid plains of Kajiado — 
            every Kenyan region plays a completely different livestock game.
          </p>
        </div>

        {/* Region Tab Selector Bar */}
        <div className="flex items-center space-x-2 sm:space-x-3 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {REGIONAL_STORIES.map((story, idx) => (
            <button
              key={story.id}
              onClick={() => setActiveStoryIndex(idx)}
              className={`px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all shrink-0 flex items-center space-x-2 ${
                activeStoryIndex === idx
                  ? 'bg-[#2D6A4F] text-white shadow-lg ring-2 ring-[#74C69D]/40 scale-102'
                  : 'bg-[#1E3B2A] text-[#B7D1BF] hover:bg-[#284E38] hover:text-white'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-[#95D5B2]" />
              <span>{story.region}</span>
              <span className="text-[10px] opacity-75 font-normal hidden md:inline">
                • {story.livestockFocus.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>

        {/* Dynamic Storytelling Showcase Card */}
        <div 
          ref={storyCardRef}
          className="bg-[#1A3826] border border-[#2D6A4F]/60 rounded-3xl overflow-hidden shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Cinematic Image Frame (Spans 6 cols) */}
            <div className="lg:col-span-6 relative min-h-[300px] sm:min-h-[420px] bg-[#0E1E15] overflow-hidden">
              <img
                src={currentStory.imageUrl}
                alt={currentStory.region}
                className="w-full h-full object-cover object-center transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A3826] via-transparent to-black/30" />

              {/* Tagline Badge */}
              <div className="absolute top-5 left-5 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#74C69D]" />
                <span>{currentStory.tagline}</span>
              </div>

              {/* Regional Metric Badges */}
              <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-2">
                {currentStory.stats.map((st, i) => (
                  <div key={i} className="bg-black/60 backdrop-blur-md rounded-xl p-2.5 border border-white/10 text-center">
                    <div className="text-[10px] text-[#A3C4AC] font-semibold">{st.label}</div>
                    <div className="text-xs sm:text-sm font-extrabold text-white">{st.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Editorial Content Breakdown (Spans 6 cols) */}
            <div className="lg:col-span-6 p-6 sm:p-9 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-[#74C69D] flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  <span>{currentStory.region} AGRICULTURAL REALITY</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  {currentStory.headline}
                </h3>

                <p className="text-sm sm:text-base text-[#C4D9CA] leading-relaxed">
                  {currentStory.description}
                </p>

                {/* Challenge vs Solution Block */}
                <div className="space-y-2.5 pt-2">
                  <div className="p-3.5 rounded-xl bg-[#142A1D] border border-[#2D6A4F]/40 flex items-start space-x-3">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-amber-300">Local Farming Challenge:</span>
                      <p className="text-xs text-[#D8E6DC] mt-0.5">{currentStory.primaryChallenge}</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#234932] border border-[#52B788]/40 flex items-start space-x-3">
                    <TrendingUp className="w-4 h-4 text-[#74C69D] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-[#95D5B2]">Winning Strategy:</span>
                      <p className="text-xs text-[#E1EFE6] mt-0.5">{currentStory.farmingReality}</p>
                    </div>
                  </div>
                </div>

                {/* Farmer Direct Quote in Swahili + English */}
                <div className="border-l-2 border-[#74C69D] pl-4 py-1 space-y-1">
                  <div className="flex items-center space-x-2 text-xs font-bold text-[#95D5B2]">
                    <Quote className="w-3.5 h-3.5" />
                    <span>{currentStory.quote.farmer}:</span>
                  </div>
                  <p className="text-xs sm:text-sm italic font-medium text-white">
                    “{currentStory.quote.swahili}”
                  </p>
                  <p className="text-[11px] text-[#9FBBA6]">
                    ({currentStory.quote.english})
                  </p>
                </div>
              </div>

              {/* Bottom Interactive Navigation & Filter */}
              <div className="pt-4 border-t border-[#264F35] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <button
                  onClick={() => onSelectCountyCommunity(currentStory.region.split('/')[0].trim())}
                  className="inline-flex items-center justify-center space-x-2 bg-[#2D6A4F] hover:bg-[#235740] text-white font-bold text-xs sm:text-sm py-3 px-5 rounded-full shadow-md transition-all group"
                >
                  <span>See {currentStory.region} Farm Discussions</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>

                <div className="flex items-center justify-center space-x-2">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous Region"
                    className="p-2.5 rounded-full bg-[#142A1D] hover:bg-[#234A33] text-white transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs text-[#A3C4AC] font-semibold px-2">
                    {activeStoryIndex + 1} / {REGIONAL_STORIES.length}
                  </span>
                  <button
                    onClick={handleNext}
                    aria-label="Next Region"
                    className="p-2.5 rounded-full bg-[#142A1D] hover:bg-[#234A33] text-white transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
