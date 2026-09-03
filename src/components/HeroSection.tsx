import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { 
  Sprout, 
  ArrowRight, 
  MapPin, 
  CreditCard, 
  CloudRain, 
  Bot, 
  Sparkles,
  Users,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';

interface HeroSectionProps {
  onJoinClick: () => void;
  onExploreCommunity: () => void;
  onOpenPortal: () => void;
  onOpenWeather: () => void;
  onOpenCompanion: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onJoinClick,
  onExploreCommunity,
  onOpenPortal,
  onOpenWeather,
  onOpenCompanion
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const archImageRef = useRef<HTMLDivElement>(null);
  const floatingBarRef = useRef<HTMLDivElement>(null);
  const floatingBadge1Ref = useRef<HTMLDivElement>(null);
  const floatingBadge2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Check prefers-reduced-motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Staggered text entrance
      tl.from('.hero-anim-item', {
        y: 35,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12
      })
      // Arch frame reveal with slight scale and clip
      .from(archImageRef.current, {
        scale: 0.94,
        opacity: 0,
        y: 20,
        duration: 1.1,
        ease: 'power2.out'
      }, '-=0.6')
      // Floating badges gentle pop
      .from([floatingBadge1Ref.current, floatingBadge2Ref.current], {
        scale: 0.8,
        opacity: 0,
        y: 15,
        stagger: 0.15,
        duration: 0.7,
        ease: 'back.out(1.7)'
      }, '-=0.4')
      // Floating bottom bar slide up
      .from(floatingBarRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.85
      }, '-=0.5');

      // Continuous subtle breathing animation on badges
      gsap.to(floatingBadge1Ref.current, {
        y: '-=6',
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
      gsap.to(floatingBadge2Ref.current, {
        y: '+=5',
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.4
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      id="hero"
      className="relative pt-8 sm:pt-14 pb-16 sm:pb-24 overflow-hidden bg-gradient-to-b from-[#F7F8F4] via-[#F4F6F0] to-[#EBF0E6]"
    >
      {/* Subtle organic background decoration */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-[#E2ECE0]/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Main 2-Column Hero Grid (Exact composition to reference image) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs (Spans 6 cols on lg) */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-6 sm:space-y-7">
            
            {/* Swahili Warm Greeting Eyebrow */}
            <div className="hero-anim-item inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#EBF2E8] border border-[#D5E3D0] text-[#1B4332] text-xs font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#2D6A4F] animate-ping" />
              <span>SHAMBA IKO AJE? • WAKULIMA WOTE PAMOJA</span>
            </div>

            {/* Display Headline with Script Accent */}
            <div className="space-y-2">
              <h1 
                ref={headlineRef}
                className="hero-anim-item text-4xl sm:text-5xl xl:text-6xl font-extrabold text-[#152B1E] tracking-tight leading-[1.12]"
              >
                Everything Kenyan <br />
                Farmers Need to <br />
                <span className="font-script text-5xl sm:text-6xl xl:text-7xl font-bold text-[#2D6A4F] inline-block pt-1 -rotate-1">
                  Thrive Together
                </span>
              </h1>
            </div>

            {/* Sprout divider accent matching reference leaf line */}
            <div className="hero-anim-item flex items-center space-x-3 text-[#2D6A4F]">
              <div className="w-10 h-0.5 bg-[#D1E0CC]" />
              <Sprout className="w-5 h-5 text-[#2D6A4F]" />
              <div className="w-16 h-0.5 bg-[#D1E0CC]" />
            </div>

            {/* Supporting Copy blending English and Kenyan reality */}
            <p className="hero-anim-item text-base sm:text-lg text-[#3F5446] leading-relaxed max-w-xl font-normal">
              From the dairy farmer in <strong>Kericho</strong> dealing with cold highland mornings, 
              to the poultry keeper in <strong>Kiambu</strong> balancing high feed costs — this is where 
              ordinary Kenyan farmers meet, share real shamba challenges, and get trusted field advice.
            </p>

            {/* Language & Identity Pill */}
            <div className="hero-anim-item flex items-center gap-2 text-xs text-[#52796F] font-medium">
              <span className="px-2.5 py-1 bg-white border border-[#D5E3D0] rounded-md font-semibold text-[#1B4332]">
                60% English • 40% Swahili
              </span>
              <span>“Hii ni ya sisi. No polished textbook jargon.”</span>
            </div>

            {/* Dual CTA Buttons: Exact match to reference button styling */}
            <div className="hero-anim-item flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                id="hero-join-cta"
                onClick={onJoinClick}
                className="inline-flex items-center justify-center space-x-2.5 bg-[#1B4332] hover:bg-[#143525] text-white font-bold text-sm sm:text-base py-3.5 px-7 rounded-full shadow-md hover:shadow-lg transition-all duration-200 group active:scale-98"
              >
                <span>JOIN FARMERS HUB</span>
                <Sprout className="w-4 h-4 text-[#95D5B2] transition-transform group-hover:rotate-12" />
              </button>

              <button
                id="hero-browse-cta"
                onClick={onExploreCommunity}
                className="inline-flex items-center justify-center space-x-2 bg-white hover:bg-[#F2F6EF] text-[#1B4332] border border-[#CBDBC7] font-semibold text-sm sm:text-base py-3.5 px-6 rounded-full transition-all duration-200 shadow-xs hover:border-[#1B4332] group active:scale-98"
              >
                <span>SEE WHAT FARMERS ARE TALKING ABOUT</span>
                <ArrowRight className="w-4 h-4 text-[#2D6A4F] transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Live stats ticker */}
            <div className="hero-anim-item pt-2 flex items-center space-x-6 text-xs text-[#486350]">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-[#2D6A4F]" />
                <span><strong>4,820+</strong> Kenyan Farmers</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-[#2D6A4F]" />
                <span>Verified Field Vets</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-[#2D6A4F]" />
                <span>10 Farming Counties</span>
              </div>
            </div>

          </div>

          {/* Right Column: Arched Photographic Hero Frame (Exact match to reference) */}
          <div className="lg:col-span-6 xl:col-span-6 relative flex justify-center lg:justify-end">
            
            {/* The Distinctive Curved Organic Arch Frame */}
            <div 
              ref={archImageRef}
              className="relative w-full max-w-[490px] h-[480px] sm:h-[540px] hero-arch-frame overflow-hidden shadow-2xl border-4 border-white bg-[#1B4332]"
            >
              {/* Authentic High-Res Kenyan/African Agricultural Visual */}
              <img
                src="https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=1000&q=85"
                alt="Kenyan agriculture highland shamba"
                className="w-full h-full object-cover object-center transform scale-105 hover:scale-100 transition-transform duration-700"
                loading="eager"
              />

              {/* Gradient Overlay for Editorial Depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#143525]/85 via-[#143525]/20 to-transparent" />

              {/* In-photo Bottom Caption */}
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1 z-10">
                <div className="flex items-center space-x-1.5 text-xs text-[#95D5B2] font-bold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Githunguri, Kiambu County</span>
                </div>
                <div className="font-extrabold text-lg sm:text-xl leading-tight">
                  “Hapa Kiambu kila kilo ya dairy meal lazima ilete maziwa.”
                </div>
                <p className="text-xs text-[#E0ECD8] opacity-90">
                  Zero-grazing dairy optimization & daily milk production tracking.
                </p>
              </div>
            </div>

            {/* Floating Badge 1 (Top Left/Center): Live milk peak */}
            <div 
              ref={floatingBadge1Ref}
              className="absolute -top-4 left-0 sm:left-4 bg-white/95 backdrop-blur-md border border-[#D5E3D0] shadow-xl rounded-2xl p-3.5 flex items-center space-x-3 z-20"
            >
              <div className="w-10 h-10 rounded-xl bg-[#2D6A4F] text-white flex items-center justify-center font-bold shadow-sm">
                🥛
              </div>
              <div className="text-left">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#52796F]">Highland Peak</div>
                <div className="text-base font-extrabold text-[#1B4332]">28.4 Liters / Day</div>
                <div className="text-[10px] text-[#2D6A4F] font-semibold">Kericho Dairy Member</div>
              </div>
            </div>

            {/* Floating Badge 2 (Right Mid): Live Community Alert */}
            <div 
              ref={floatingBadge2Ref}
              className="absolute bottom-16 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md border border-[#D5E3D0] shadow-xl rounded-2xl p-3 max-w-[210px] z-20 hidden sm:flex flex-col gap-1 text-left"
            >
              <div className="flex items-center justify-between text-[10px] text-[#52796F] font-bold">
                <span className="flex items-center gap-1 text-[#1B4332]">
                  <Sparkles className="w-3 h-3 text-[#2D6A4F]" /> Farm Talk
                </span>
                <span className="text-emerald-700">Just Now</span>
              </div>
              <p className="text-xs font-bold text-[#1F3325] leading-snug">
                “Kuku zangu zimeanza kutaga tena baada ya warm water!”
              </p>
              <span className="text-[10px] text-[#718578]">Wanjiku • Kiambu Poultry</span>
            </div>

          </div>

        </div>

        {/* =========================================================
            OVERLAPPING 4-PILL FLOATING ACTION BANNER
            (Exact match to the reference image's dark green banner)
           ========================================================= */}
        <div 
          ref={floatingBarRef}
          className="mt-12 sm:mt-16 bg-[#143525] text-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-2xl border border-[#2D6A4F]/40"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 divide-y sm:divide-y-0 lg:divide-x divide-[#264E3A]">
            
            {/* Pill 1: Live Shamba Talk */}
            <button 
              onClick={onExploreCommunity}
              className="pt-3 sm:pt-0 lg:px-4 text-left group flex items-start space-x-3.5 focus:outline-none transition-transform hover:-translate-y-0.5"
            >
              <div className="w-11 h-11 rounded-full bg-[#2D6A4F]/60 group-hover:bg-[#2D6A4F] border border-[#52B788]/40 flex items-center justify-center shrink-0 text-[#95D5B2] transition-colors">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white group-hover:text-[#95D5B2] transition-colors flex items-center gap-1">
                  <span>Live Shamba Talk</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h2>
                <p className="text-xs text-[#A3B899] mt-0.5 leading-snug">
                  See real discussions across Kiambu, Kericho, Nakuru & Kajiado.
                </p>
              </div>
            </button>

            {/* Pill 2: Farmer Portal & Card */}
            <button 
              onClick={onOpenPortal}
              className="pt-3 sm:pt-0 lg:px-4 text-left group flex items-start space-x-3.5 focus:outline-none transition-transform hover:-translate-y-0.5"
            >
              <div className="w-11 h-11 rounded-full bg-[#2D6A4F]/60 group-hover:bg-[#2D6A4F] border border-[#52B788]/40 flex items-center justify-center shrink-0 text-[#95D5B2] transition-colors">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white group-hover:text-[#95D5B2] transition-colors flex items-center gap-1">
                  <span>Farmer Portal & Card</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h2>
                <p className="text-xs text-[#A3B899] mt-0.5 leading-snug">
                  Access your digital farm card, herd records & official vet visit reports.
                </p>
              </div>
            </button>

            {/* Pill 3: County Weather & Alerts */}
            <button 
              onClick={onOpenWeather}
              className="pt-3 sm:pt-0 lg:px-4 text-left group flex items-start space-x-3.5 focus:outline-none transition-transform hover:-translate-y-0.5"
            >
              <div className="w-11 h-11 rounded-full bg-[#2D6A4F]/60 group-hover:bg-[#2D6A4F] border border-[#52B788]/40 flex items-center justify-center shrink-0 text-[#95D5B2] transition-colors">
                <CloudRain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white group-hover:text-[#95D5B2] transition-colors flex items-center gap-1">
                  <span>County Weather & Alerts</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h2>
                <p className="text-xs text-[#A3B899] mt-0.5 leading-snug">
                  Actionable rain & cold advice: poultry brooders to milk letdown.
                </p>
              </div>
            </button>

            {/* Pill 4: Shamba Companion AI */}
            <button 
              onClick={onOpenCompanion}
              className="pt-3 sm:pt-0 lg:px-4 text-left group flex items-start space-x-3.5 focus:outline-none transition-transform hover:-translate-y-0.5"
            >
              <div className="w-11 h-11 rounded-full bg-[#2D6A4F]/60 group-hover:bg-[#2D6A4F] border border-[#52B788]/40 flex items-center justify-center shrink-0 text-[#95D5B2] transition-colors">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white group-hover:text-[#95D5B2] transition-colors flex items-center gap-1">
                  <span>Shamba Companion AI</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h2>
                <p className="text-xs text-[#A3B899] mt-0.5 leading-snug">
                  Fast conversational advice in English & Swahili for your shamba.
                </p>
              </div>
            </button>

          </div>
        </div>

      </div>
    </section>
  );
};
