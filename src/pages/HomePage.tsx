import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Stethoscope, ShoppingBag, ArrowRight, Phone,
  CheckCircle2, Truck, Star, Users, Shield,
  ChevronRight, Heart, Zap, MapPin, Clock, MessageSquare, BookOpen, Sparkles
} from 'lucide-react';
import { MOCK_PRODUCTS, MOCK_VET_SERVICES } from '../data/shopAndLivestockData';
import { COUNTY_WEATHER_DATA, INITIAL_COMMUNITY_POSTS } from '../data/mockData';
import { useCart } from '../context/CartContext';

gsap.registerPlugin(ScrollTrigger);

interface HomePageProps {
  onOpenVetBooking: () => void;
}

// ─── DATA ────────────────────────────────────────────────────────────────────

const ANIMAL_CATEGORIES = [
  { emoji: '🐔', label: 'Poultry', swahili: 'Kuku wa Mayai na Nyama', sub: 'Layers, Broilers & Kienyeji', path: '/poultry', color: '#FFB70F' },
  { emoji: '🐄', label: 'Cattle & Dairy', swahili: 'Ng\'ombe wa Maziwa', sub: 'Friesian, Ayrshire & Boran', path: '/livestock', color: '#419C09' },
  { emoji: '🐖', label: 'Pigs & Swine', swahili: 'Ufugaji wa Nguruwe', sub: 'Feed, Health & Porkers', path: '/livestock', color: '#C4A96B' },
  { emoji: '🐐', label: 'Goats', swahili: 'Mbuzi wa Maziwa na Nyama', sub: 'Toggenburg, Boer & Galla', path: '/livestock', color: '#04361A' },
  { emoji: '🐑', label: 'Sheep', swahili: 'Kondoo wa Nyama', sub: 'Dorper & Red Maasai', path: '/livestock', color: '#419C09' },
  { emoji: '🐎', label: 'Horses', swahili: 'Afya ya Farasi', sub: 'Farm & Working Equines', path: '/livestock', color: '#C4A96B' },
];

const REGIONAL_STORIES = [
  { county: 'Kiambu', region: 'Zero-Grazing & Poultry Belt', story: 'Subdivided quarter-acre plots require high-density precision. Githunguri and Limuru farmers rely on Farmers Hub for high-protein layers mash, mastitis testing, and fast vet visits when production drops.', icon: '🏘️', color: '#04361A' },
  { county: 'Kericho & Bomet', region: 'Cool Highlands Dairy', story: 'Cold morning mist cuts milk letdown if cows drink ice-cold water or sleep on wet mud. Our field vets support Kapsoit and Bureti farmers with TMR feed formulation and warm watering protocols.', icon: '🫖', color: '#419C09' },
  { county: 'Nakuru', region: 'Poultry & Mixed Farming', story: 'From Bahati to Njoro, Nakuru is Kenya\'s broiler and egg heartbeat. Large flock owners use Farmers Hub for coop ventilation audits, chick starter crumbs, and vaccination schedule reminders.', icon: '🌾', color: '#C4A96B' },
  { county: 'Kajiado & Machakos', region: 'Pastoral & Commercial Meat', story: 'Rangeland grazing faces drought stress and mineral leaching. Farmers Hub brings drought-resilient Galla goat guidance, mineral salt blocks, and East Coast Fever tick dips directly to Isinya and Namanga.', icon: '🌵', color: '#04361A' },
  { county: 'Uasin Gishu & Trans Nzoia', region: 'Grain & Dairy Breadbasket', story: 'Moiben and Eldoret mixed farmers silage maize and bale Boma Rhodes hay. We supply silage inoculants, bypass fats, and sexed semen AI for pedigree dairy cows.', icon: '⛰️', color: '#419C09' },
  { county: 'Nyandarua & Nyeri', region: 'High-Altitude Stocking', story: 'Cool mountain air in Ol Kalou demands proper shelter and mineral licks. Farmers Hub connects local dairy units to KVB registered vets for routine herd health checks.', icon: '🥔', color: '#C4A96B' },
];

const COMMUNITY_POSTS = [
  { author: 'Mama Stacy Wanjiku', county: 'Kiambu', topic: 'Poultry', time: '2h ago', content: 'Kuku zangu 500 layers zimepunguza eggs from 430 to 310 daily within 4 days. Weather imekuwa ya baridi sana usiku. What should I check kwanza kabla sijanunua dawa ovyo?', likes: 47, replies: 23, avatar: '👩🏾‍🌾', verifiedVetReply: true },
  { author: 'Kiprotich Koech', county: 'Kericho', topic: 'Dairy', time: '4h ago', content: 'Hii cold weather imeaffect milk production for anyone? My Friesians dropped from 22L to 16L after rains started. Dr. Faith advised warm water + dry straw and yield is recovering!', likes: 62, replies: 31, avatar: '👨🏾‍🌾', verifiedVetReply: true },
  { author: 'Sammy Ndegwa', county: 'Nakuru', topic: 'Feeds', time: '6h ago', content: 'Commercial feeds are expensive! 50kg Dairy Meal is KSh 3,200. Anyone mixing homemade TMR with maize silage, sunflower meal na mineral salt successfully?', likes: 64, replies: 31, avatar: '👨🏾‍🌾', verifiedVetReply: false },
];

const STATS = [
  { value: '14,200+', label: 'Kenyan Wakulima', suffix: '' },
  { value: '< 2 Hrs', label: 'Emergency Dispatch', suffix: '' },
  { value: '98.4%', label: 'Flock Recovery', suffix: '' },
];

const PRODUCT_CATEGORIES = [
  { icon: '🌾', label: 'Feeds & Nutrition', sub: 'Poultry, dairy, pig & calf feeds', bg: '#04361A', fg: '#FFB70F', path: '/shop' },
  { icon: '💊', label: 'Animal Health', sub: 'Medicines, vaccines & supplements', bg: '#419C09', fg: 'white', path: '/shop' },
  { icon: '🧪', label: 'Minerals & Licks', sub: 'High-phos blocks & bypass fat', bg: '#FFB70F', fg: '#04361A', path: '/shop' },
  { icon: '🛒', label: 'Farm Supplies', sub: 'CMT kits, heat lamps & equipment', bg: '#C4A96B', fg: '#04361A', path: '/shop' },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export const HomePage: React.FC<HomePageProps> = ({ onOpenVetBooking }) => {
  const { addToCart, setIsCartOpen } = useCart();

  const heroRef = useRef<HTMLElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const funnelRef = useRef<HTMLElement>(null);
  const vetRef = useRef<HTMLElement>(null);
  const productsRef = useRef<HTMLElement>(null);
  const animalRef = useRef<HTMLElement>(null);
  const regionalRef = useRef<HTMLElement>(null);
  const communityRef = useRef<HTMLElement>(null);

  // ── Hero GSAP timeline ──
  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.2 });

      tl.from('.hero-badge', { opacity: 0, y: -20, duration: 0.5, stagger: 0.1 })
        .from('.hero-headline .word', { y: '110%', opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power4.out' }, '-=0.2')
        .from('.hero-sub', { opacity: 0, y: 20, duration: 0.6 }, '-=0.3')
        .from('.hero-ctas', { opacity: 0, y: 20, duration: 0.5 }, '-=0.3')
        .from('.hero-stats > *', { opacity: 0, y: 15, stagger: 0.1, duration: 0.5 }, '-=0.3')
        .from('.hero-image-col', { opacity: 0, x: 40, scale: 0.96, duration: 0.9, ease: 'power2.out' }, '-=0.8')
        .from('.hero-float-badge', { opacity: 0, scale: 0.7, stagger: 0.2, duration: 0.5, ease: 'back.out(1.4)' }, '-=0.4');

      gsap.to('.hero-float-badge:nth-child(1)', { y: -8, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.hero-float-badge:nth-child(2)', { y: -6, duration: 2.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.5 });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  // ── ScrollTrigger animations ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.stat-number', {
        textContent: 0,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: { trigger: statsRef.current, start: 'top 80%' },
        stagger: 0.15,
      });

      gsap.from('.funnel-step', {
        y: 40, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: funnelRef.current, start: 'top 75%' },
      });

      gsap.from('.vet-heading', {
        x: -60, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: vetRef.current, start: 'top 75%' },
      });
      gsap.from('.vet-card', {
        y: 50, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: vetRef.current, start: 'top 70%' },
      });

      gsap.from('.product-cat-card', {
        scale: 0.85, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'back.out(1.2)',
        scrollTrigger: { trigger: productsRef.current, start: 'top 75%' },
      });

      gsap.from('.animal-card-item', {
        y: 60, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: animalRef.current, start: 'top 75%' },
      });

      gsap.from('.region-card', {
        x: 80, opacity: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: regionalRef.current, start: 'top 70%' },
      });

      gsap.from('.community-post', {
        y: 40, opacity: 0, duration: 0.6, stagger: 0.12,
        scrollTrigger: { trigger: communityRef.current, start: 'top 75%' },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="overflow-x-hidden">

      {/* ══════════════════════════════════════════════════════
          1. ORIGINAL HERO SECTION — Restored Exact Copy & Chicken Image
      ══════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative bg-[#04361A] text-white overflow-hidden pt-10 sm:pt-16 pb-16 sm:pb-24 min-h-[90vh] flex items-center">
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(ellipse at 70% 50%, rgba(65,156,9,0.25) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(255,183,15,0.12) 0%, transparent 50%)',
        }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left column: Text + CTAs */}
            <div className="lg:col-span-6 xl:col-span-7 space-y-6">
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <span className="hero-badge inline-flex items-center gap-1.5 bg-[#FFB70F] text-[#04361A] text-[11px] font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" /> Hii Ni Ya Sisi
                </span>
                <span className="hero-badge inline-flex items-center gap-1.5 bg-white/10 text-white text-[11px] font-bold px-3 py-1.5 rounded-full border border-white/15">
                  <Shield className="w-3.5 h-3.5 text-[#419C09]" /> Kenya Veterinary Board Registered
                </span>
              </div>

              {/* Exact Headline */}
              <h1 className="hero-headline font-outfit font-black text-3xl sm:text-5xl xl:text-6xl leading-[1.08] tracking-tight">
                {['Veterinary Care &', 'Certified Inputs for', 'the Kenyan Farmer.'].map((line, i) => (
                  <span key={i} className="block">
                    {line.split(' ').map((word, j) => (
                      <span key={j} className="word inline-block overflow-hidden mr-2.5">
                        <span className="inline-block" style={{ color: i === 2 ? '#FFB70F' : 'white' }}>
                          {word}
                        </span>
                      </span>
                    ))}
                  </span>
                ))}
              </h1>

              {/* Exact Subheadline */}
              <p className="hero-sub text-base sm:text-lg text-white/85 leading-relaxed max-w-xl font-medium">
                Fast on-site veterinary response, high-yield layers & dairy feeds, and flock management. From Kiambu to Kericho, we keep your livestock healthy and your shamba profitable.
              </p>

              {/* Action Buttons */}
              <div className="hero-ctas flex flex-col sm:flex-row gap-3.5 pt-2">
                <button
                  onClick={onOpenVetBooking}
                  className="magnetic-btn flex items-center justify-center gap-2.5 px-7 py-4 bg-[#FFB70F] hover:bg-white text-[#04361A] font-black text-sm rounded-2xl shadow-xl transition-all duration-250 group border-2 border-[#FFB70F]"
                >
                  <Stethoscope className="w-4.5 h-4.5" />
                  <span>GET VETERINARY HELP</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <Link
                  to="/shop"
                  className="flex items-center justify-center gap-2.5 px-7 py-4 bg-transparent hover:bg-white/10 border-2 border-white/30 hover:border-white/60 text-white font-bold text-sm rounded-2xl transition-all"
                >
                  <ShoppingBag className="w-4.5 h-4.5" />
                  <span>Order Feeds & Meds</span>
                </Link>
              </div>

              {/* Exact Stats Bar */}
              <div ref={statsRef} className="hero-stats grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                {STATS.map((s, i) => (
                  <div key={i}>
                    <div className="stat-number text-2xl sm:text-3xl font-black font-outfit" style={{ color: i === 0 ? '#FFB70F' : '#5AC40B' }}>
                      {s.value}
                    </div>
                    <div className="text-[11px] text-white/70 font-semibold mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column: Original Chicken Image Hero Frame & Quote */}
            <div className="hero-image-col lg:col-span-6 xl:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-sm lg:max-w-full">
                <div className="hero-arch-frame relative w-full aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl border-4 border-white/15">
                  <img
                    src="https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80"
                    alt="Kenyan farm with healthy livestock and cattle"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#04361A] via-transparent to-transparent opacity-90" />
                  <div className="absolute bottom-6 left-6 right-6 text-white space-y-1.5">
                    <span className="text-[10px] uppercase font-black tracking-wider bg-[#FFB70F] text-[#04361A] px-2.5 py-0.5 rounded-md inline-block">
                      Kiambu & Kericho • Field Inspection
                    </span>
                    <p className="text-sm sm:text-base font-black leading-snug">
                      "Dr. Aura resolved our farm livestock issue in 24 hours. Hii ni ya sisi!"
                    </p>
                    <p className="text-xs text-white/70 font-medium">— John Mburu, Multi-Livestock Shamba</p>
                  </div>
                </div>

                {/* Floating badge 1: Mobile Clinic */}
                <div className="hero-float-badge float-badge -top-4 -left-4 lg:-left-8 max-w-[200px] bg-white p-3 rounded-2xl shadow-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#419C09] flex items-center justify-center shrink-0 shadow-md">
                    <Stethoscope className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-black text-[#419C09] block">Mobile Clinic</span>
                    <span className="text-xs font-bold text-[#04361A]">38 Field Vets On Call</span>
                  </div>
                </div>

                {/* Floating badge 2: Express Farm Gate */}
                <div className="hero-float-badge float-badge -bottom-4 -right-4 lg:-right-8 max-w-[210px] bg-white p-3 rounded-2xl shadow-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FFB70F] flex items-center justify-center shrink-0 shadow-md">
                    <Truck className="w-5 h-5 text-[#04361A]" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-black text-[#04361A] block">Express Farm Gate</span>
                    <span className="text-xs font-bold text-[#04361A]">Free Delivery &gt; 5k</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          2. COUNTY AGRONOMIC TICKER
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#021A0D] border-y border-white/10 overflow-hidden py-3">
        <div ref={tickerRef} className="flex items-center">
          <div className="ticker-track flex items-center gap-12 whitespace-nowrap">
            {[...COUNTY_WEATHER_DATA, ...COUNTY_WEATHER_DATA].map((w, idx) => (
              <span key={idx} className="flex items-center gap-2 text-xs text-white/80 shrink-0">
                <MapPin className="w-3.5 h-3.5 text-[#FFB70F] shrink-0" />
                <span className="font-bold text-[#FFB70F]">{w.county}:</span>
                <span>{w.temperature} {w.condition}</span>
                <span className="text-white/30 mx-2">•</span>
                <span className="text-white/70 italic text-[11px]">{w.poultryAdvice}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          3. THE FARMER JOURNEY / FUNNEL (Discover -> Recognize -> Join -> Learn -> Trust -> Vet Care)
      ══════════════════════════════════════════════════════ */}
      <section ref={funnelRef} className="py-16 sm:py-24 bg-[#FAF8F2] border-b border-[#04361A]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-[#419C09] block mb-2">
              Jinsi Farmers Hub Inavyofanya Kazi
            </span>
            <h2 className="font-outfit font-black text-3xl sm:text-4xl text-[#04361A] leading-tight">
              From Everyday Shamba Conversations to Trusted Vet Support
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 mt-2 font-medium">
              We built this platform so every Kenyan farmer can find answers, share experiences, and get professional veterinary backing when it matters most.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="funnel-step bg-white p-6 rounded-2xl border border-[#04361A]/10 shadow-xs relative flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#04361A] text-[#FFB70F] font-black text-base flex items-center justify-center mb-4">
                  01
                </div>
                <h3 className="font-outfit font-extrabold text-base text-[#04361A] mb-1">
                  Discover & Recognize
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Ona changamoto za shamba lako zikizungumzwa na wakulima wengine kutoka Kiambu, Kericho, Nakuru, Kajiado na Eldoret.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-100 text-[11px] font-bold text-[#419C09]">
                "Hii story ni kama shamba langu!"
              </div>
            </div>

            {/* Step 2 */}
            <div className="funnel-step bg-white p-6 rounded-2xl border border-[#04361A]/10 shadow-xs relative flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#419C09] text-white font-black text-base flex items-center justify-center mb-4">
                  02
                </div>
                <h3 className="font-outfit font-extrabold text-base text-[#04361A] mb-1">
                  Join & Participate
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Ingia kwa Baraza la Wakulima. Uliza maswali ya kuku kupunguza mayai, maziwa ya ng'ombe, au bei za commercial feed.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-100 text-[11px] font-bold text-[#419C09]">
                Interactive Farmer Community
              </div>
            </div>

            {/* Step 3 */}
            <div className="funnel-step bg-white p-6 rounded-2xl border border-[#04361A]/10 shadow-xs relative flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#FFB70F] text-[#04361A] font-black text-base flex items-center justify-center mb-4">
                  03
                </div>
                <h3 className="font-outfit font-extrabold text-base text-[#04361A] mb-1">
                  Learn & Build Trust
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Pata maoni kutoka kwa wakulima tajika pamoja na majibu ya kitaalamu kutoka kwa ma-vet wa KVB certified walio na tajriba.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-100 text-[11px] font-bold text-[#04361A]">
                Accredited Vet Guidance
              </div>
            </div>

            {/* Step 4 */}
            <div className="funnel-step bg-[#04361A] text-white p-6 rounded-2xl shadow-md relative flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#419C09] text-white font-black text-base flex items-center justify-center mb-4">
                  04
                </div>
                <h3 className="font-outfit font-extrabold text-base text-white mb-1">
                  Access Vet Care & Inputs
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Wakati wowote ukiwa na dharura shambani, request mobile vet visit au agiza certified feeds na dawa ziletwe fast gate.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 text-[11px] font-bold text-[#FFB70F]">
                24/7 Mobile Clinic & Farm Store
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          4. VETERINARY CARE — THE EXPERTISE BEHIND THE HUB
      ══════════════════════════════════════════════════════ */}
      <section ref={vetRef} className="py-20 sm:py-28 bg-[#F5F0E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
            <div>
              <span className="vet-heading inline-block text-xs font-black uppercase tracking-widest text-[#419C09] mb-2">
                Usawa na Kitaalamu • KVB Registered Doctors
              </span>
              <h2 className="vet-heading font-outfit font-black text-3xl sm:text-4xl xl:text-5xl text-[#04361A] leading-tight max-w-2xl">
                Veterinary Expertise Standing Behind Every Farmer
              </h2>
              <p className="vet-heading text-base text-[#3D5A44] mt-3 max-w-xl leading-relaxed">
                Platform yetu haitokani na biashara tu — inatokana na upendo wa afya ya mifugo yako. Our licensed vets are active on the community baraza and available for mobile farm dispatch.
              </p>
            </div>
            <button
              onClick={onOpenVetBooking}
              className="vet-heading flex items-center gap-2 px-6 py-3.5 bg-[#FFB70F] hover:bg-[#04361A] hover:text-white text-[#04361A] font-black text-sm rounded-xl shadow-lg transition-all duration-200 shrink-0"
            >
              <Stethoscope className="w-4.5 h-4.5" />
              Request Farm Vet Visit (0707 73 22 80)
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_VET_SERVICES.map((service) => (
              <div
                key={service.id}
                className="vet-card fh-card p-6 flex flex-col justify-between group cursor-pointer"
                onClick={onOpenVetBooking}
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#04361A]/08 group-hover:bg-[#04361A] flex items-center justify-center mb-4 transition-colors duration-250">
                    <Stethoscope className="w-6 h-6 text-[#04361A] group-hover:text-[#FFB70F] transition-colors" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#419C09] block mb-1.5">{service.category}</span>
                  <h3 className="font-outfit font-bold text-base text-[#04361A] mb-2 leading-snug group-hover:text-[#419C09] transition-colors">{service.title}</h3>
                  <p className="text-xs text-[#3D5A44] leading-relaxed line-clamp-3">{service.shortDesc}</p>
                  <div className="space-y-1.5 mt-4">
                    {service.features.slice(0, 2).map((f, fi) => (
                      <div key={fi} className="flex items-start gap-1.5 text-[11px] text-[#3D5A44]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#419C09] shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-5 pt-4 border-t border-[#04361A]/08">
                  <div className="text-[11px] text-[#7A9480] mb-2">{service.pricingEstimate.split('(')[0]}</div>
                  <button onClick={onOpenVetBooking} className="w-full py-2.5 bg-[#04361A] hover:bg-[#419C09] text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5">
                    Request Visit <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to="/veterinary" className="inline-flex items-center gap-2 text-sm font-bold text-[#419C09] hover:text-[#04361A] transition-colors">
              Explore complete veterinary care services <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          5. FARM STORE & CERTIFIED INPUTS (FEEDS & PRODUCTS)
      ══════════════════════════════════════════════════════ */}
      <section ref={productsRef} className="py-20 sm:py-28 bg-[#04361A] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <span className="inline-block text-xs font-black uppercase tracking-widest text-[#FFB70F] mb-3">
              Duka la Farmers Hub • KVB & KEBS Verified
            </span>
            <h2 className="font-outfit font-black text-3xl sm:text-4xl xl:text-5xl leading-tight">
              Certified Feeds, Animal Health & Farm Products
            </h2>
            <p className="text-white/75 mt-3 text-base font-medium">
              Hatuna dawa au feeds ghushi. Kila bag na bottle imepimwa ubora. Agiza kwa M-Pesa na ziletwe gate shambani kwako.
            </p>
          </div>

          {/* Product Category shortcuts */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {PRODUCT_CATEGORIES.map((cat, i) => (
              <Link
                key={i}
                to={cat.path}
                className="product-cat-card group relative rounded-2xl p-6 flex flex-col items-center text-center gap-3 transition-all duration-300 hover:scale-[1.04] cursor-pointer"
                style={{ background: cat.bg, color: cat.fg }}
              >
                <span className="text-4xl">{cat.icon}</span>
                <div>
                  <div className="font-outfit font-black text-sm sm:text-base">{cat.label}</div>
                  <div className="text-[11px] mt-0.5 opacity-80">{cat.sub}</div>
                </div>
                <ArrowRight className="w-4 h-4 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>

          {/* Featured products slider */}
          <div className="horizontal-scroll-track pb-4">
            {MOCK_PRODUCTS.slice(0, 8).map((product) => (
              <div key={product.id} className="product-card-item product-card w-64 shrink-0 bg-white text-[#04361A] rounded-2xl overflow-hidden border border-[#04361A]/06 shadow-md flex flex-col justify-between">
                <div>
                  <div className="relative h-44 overflow-hidden bg-[#F5F0E8]">
                    <img src={product.imageUrl} alt={product.name} className="product-img w-full h-full object-cover" />
                    {product.badge && (
                      <div className="absolute top-3 left-3 bg-[#FFB70F] text-[#04361A] text-[10px] font-black px-2 py-0.5 rounded-lg uppercase tracking-wider">
                        {product.badge}
                      </div>
                    )}
                    <div className="absolute top-3 right-3 bg-[#04361A]/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm">
                      {product.targetAnimal}
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="text-[10px] font-bold text-[#419C09] uppercase tracking-wider block mb-1">{product.category}</span>
                    <h3 className="font-bold text-sm text-[#04361A] leading-snug line-clamp-2">{product.name}</h3>
                    {product.swahiliName && (
                      <p className="text-[11px] text-neutral-500 italic mt-0.5">{product.swahiliName}</p>
                    )}
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <div className="text-sm font-black text-[#04361A] mb-3">
                    KES {product.priceKes.toLocaleString()}
                    <span className="text-xs text-[#7A9480] font-normal ml-1">/ {product.unit}</span>
                  </div>
                  <button
                    onClick={() => { addToCart(product); setIsCartOpen(true); }}
                    className="w-full py-2.5 bg-[#04361A] hover:bg-[#419C09] text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#FFB70F]" /> Add to Basket
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/shop" className="inline-flex items-center gap-2 px-8 py-4 bg-[#FFB70F] hover:bg-white text-[#04361A] font-black text-sm rounded-2xl shadow-xl transition-all">
              <ShoppingBag className="w-4.5 h-4.5" />
              Browse All Feeds, Vaccines & Farm Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          6. MULTI-SPECIES LIVESTOCK & POULTRY HUB
      ══════════════════════════════════════════════════════ */}
      <section ref={animalRef} className="py-20 sm:py-28 bg-[#FAF7F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-black uppercase tracking-widest text-[#419C09] mb-3">
              Mifugo Yote ya Kenya • Broad Species Support
            </span>
            <h2 className="font-outfit font-black text-3xl sm:text-4xl xl:text-5xl text-[#04361A] leading-tight">
              Poultry, Cattle, Pigs, Goats, Sheep & Horses
            </h2>
            <p className="text-[#3D5A44] mt-3 text-base max-w-xl mx-auto font-medium">
              We support your entire shamba. Select your livestock category to access species-specific breeding, vaccination guides, and custom feeds.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {ANIMAL_CATEGORIES.map((cat, i) => (
              <Link
                key={i}
                to={cat.path}
                className="animal-card-item animal-card group"
              >
                <div className="text-4xl mb-3">{cat.emoji}</div>
                <div className="font-outfit font-black text-sm text-[#04361A] group-hover:text-white transition-colors">{cat.label}</div>
                <div className="text-[11px] text-[#7A9480] group-hover:text-white/70 mt-0.5 transition-colors">{cat.swahili}</div>
                <div className="text-[10px] text-[#7A9480] group-hover:text-white/60 mt-1 leading-snug transition-colors">{cat.sub}</div>
                <ArrowRight className="w-3.5 h-3.5 text-[#419C09] group-hover:text-[#FFB70F] mt-3 mx-auto transition-all group-hover:translate-x-1" />
              </Link>
            ))}
          </div>

          {/* Highlight cards: Poultry & Mobile Vets */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative rounded-3xl overflow-hidden group" style={{ background: 'linear-gradient(135deg, #04361A 0%, #0B5C2C 100%)' }}>
              <div className="p-8 sm:p-10 relative z-10">
                <span className="text-4xl">🐔</span>
                <h3 className="font-outfit font-black text-2xl sm:text-3xl text-white mt-3 leading-tight">
                  Poultry Hub — Karibu Mkulima wa Kuku
                </h3>
                <p className="text-white/80 text-sm mt-2 leading-relaxed font-medium">
                  Layers mash 16%, chick starter crumbs, infrared lamps, automated nipple drinkers, and post-mortem flock diagnosis. Everything for your poultry unit.
                </p>
                <Link to="/poultry" className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 bg-[#FFB70F] text-[#04361A] font-black text-xs rounded-xl hover:bg-white transition-colors">
                  Explore Poultry Section <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #FFB70F 0%, #E6A200 100%)' }}>
              <div className="p-8 sm:p-10 relative z-10">
                <Stethoscope className="w-8 h-8 text-[#04361A]" />
                <h3 className="font-outfit font-black text-2xl sm:text-3xl text-[#04361A] mt-3 leading-tight">
                  Emergency Vet Visits — 0707 73 22 80
                </h3>
                <p className="text-[#04361A]/85 text-sm mt-2 leading-relaxed font-medium">
                  Don't wait overnight when an animal is in distress. Our licensed field vets respond within 2 hours across Kiambu, Nakuru, Uasin Gishu, and Kericho.
                </p>
                <button onClick={onOpenVetBooking} className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 bg-[#04361A] text-white font-black text-xs rounded-xl hover:bg-[#0B5C2C] transition-colors">
                  Book On-Farm Emergency Vet <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          7. AUTHENTIC KENYAN REGIONAL STORIES
      ══════════════════════════════════════════════════════ */}
      <section ref={regionalRef} className="py-20 sm:py-28 bg-[#04361A] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <span className="inline-block text-xs font-black uppercase tracking-widest text-[#FFB70F] mb-3">
              Kenya Yetu • Authentic Farming Realities
            </span>
            <h2 className="font-outfit font-black text-3xl sm:text-4xl xl:text-5xl leading-tight">
              Every County Has Its Own Shamba Story
            </h2>
            <p className="text-white/75 mt-3 text-sm sm:text-base">
              From zero-grazing plots in Kiambu to tea-belt dairy in Kericho and free-range flocks in Nakuru — we understand your exact farming context.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {REGIONAL_STORIES.map((r, i) => (
              <div key={i} className="region-card group relative p-6 rounded-2xl border border-white/10 hover:border-[#FFB70F]/40 transition-all duration-300 cursor-default bg-white/05 hover:bg-white/08 backdrop-blur-sm">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl">{r.icon}</span>
                  <div>
                    <div className="font-outfit font-black text-base text-white">{r.county}</div>
                    <div className="text-[11px] text-[#FFB70F] font-bold uppercase tracking-wider">{r.region}</div>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-white/75 leading-relaxed font-medium">{r.story}</p>
                <div className="mt-4 h-[2px] w-0 group-hover:w-full rounded-full bg-[#FFB70F] transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          8. FARMER COMMUNITY BARAZA (Recognize Yourself -> Join)
      ══════════════════════════════════════════════════════ */}
      <section ref={communityRef} className="py-20 sm:py-28 bg-[#FAF7F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <span className="inline-block text-xs font-black uppercase tracking-widest text-[#419C09] mb-3">
                Baraza la Wakulima • Community First
              </span>
              <h2 className="font-outfit font-black text-3xl sm:text-4xl text-[#04361A] leading-tight">
                Recognize Yourself in the Content.<br />Join the Conversation.
              </h2>
              <p className="text-[#3D5A44] mt-3 text-sm max-w-lg leading-relaxed font-medium">
                Join 14,200+ Kenyan farmers talking about what's happening on their farms today. Share experiences, get advice, and connect with trusted KVB veterinary specialists.
              </p>
            </div>
            <Link to="/community" className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#04361A] hover:bg-[#419C09] text-white font-bold text-sm rounded-xl transition-all shrink-0">
              <Users className="w-4 h-4" />
              Join the Farmer Baraza
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {COMMUNITY_POSTS.map((post, i) => (
              <div key={i} className="community-post post-card flex flex-col justify-between bg-white p-6 rounded-2xl border border-[#04361A]/10 shadow-xs">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{post.avatar}</span>
                      <div>
                        <div className="font-bold text-sm text-[#04361A]">{post.author}</div>
                        <div className="text-[10px] text-neutral-500">{post.county} • {post.time}</div>
                      </div>
                    </div>
                    {post.verifiedVetReply && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#419C09]/15 text-[#419C09] flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Vet Replied
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-medium">{post.content}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#04361A]/06 flex items-center justify-between text-xs text-neutral-500 font-semibold">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 text-[#419C09]" />{post.likes}</span>
                    <span>{post.replies} replies</span>
                  </div>
                  <Link to="/community" className="text-[#419C09] font-bold hover:text-[#04361A] transition-colors">
                    Join Discussion →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          9. EMERGENCY DISPATCH & HOTLINE BANNER (0707 73 22 80)
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#021A0D] text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(ellipse at center, rgba(255,183,15,0.1) 0%, transparent 70%)',
        }} />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-[#FFB70F] text-[#04361A] text-xs font-black px-4 py-2 rounded-full uppercase tracking-wider mb-6">
            <Phone className="w-3.5 h-3.5" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#04361A] animate-ping" />
            24/7 National Emergency Dispatch
          </div>
          <h2 className="font-outfit font-black text-3xl sm:text-5xl xl:text-6xl leading-tight mb-4">
            Animal Down?<br />Call 0707 73 22 80
          </h2>
          <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-10 max-w-xl mx-auto font-medium">
            Usifanye mchezo na afya ya mifugo. Mobile clinic vans zetu ziko tayari na dawa za dharura na ma-vet wa KVB kote Kiambu, Nakuru, Uasin Gishu na Kericho.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onOpenVetBooking}
              className="magnetic-btn px-8 py-4 bg-[#FFB70F] hover:bg-white text-[#04361A] font-black text-sm rounded-2xl shadow-xl transition-all"
            >
              Book On-Farm Emergency Vet Visit
            </button>
            <a
              href="tel:+254707732280"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm rounded-2xl transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#FFB70F]" />
              Call 0707 73 22 80
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
