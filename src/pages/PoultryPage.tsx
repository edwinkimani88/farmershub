import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Egg, ShoppingBag, Stethoscope, ArrowRight, CheckCircle2,
  Thermometer, AlertTriangle, Heart, Zap, Star, Shield,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { MOCK_PRODUCTS } from '../data/shopAndLivestockData';

gsap.registerPlugin(ScrollTrigger);

interface PoultryPageProps {
  onOpenVetBooking: () => void;
}

const POULTRY_BREEDS = [
  { name: 'ISA Brown Layers', type: 'Layers', emoji: '🐔', peak: '300–320 eggs/year', highlight: 'Most popular in Kenya', color: '#FFB70F' },
  { name: 'Kenbro Dual Purpose', type: 'Dual Purpose', emoji: '🐓', peak: '200–220 eggs/year', highlight: 'Hardy Kenyan breed', color: '#419C09' },
  { name: 'Arbor Acres Broilers', type: 'Broilers', emoji: '🍗', peak: '2.5kg in 42 days', highlight: 'Fast market weight', color: '#04361A' },
  { name: 'Kienyeji (Indigenous)', type: 'Free Range', emoji: '🐤', peak: 'Slow but resilient', highlight: 'Disease resistant', color: '#C4A96B' },
  { name: 'Bronze Turkeys', type: 'Turkeys', emoji: '🦃', peak: '5–7kg at maturity', highlight: 'Growing demand', color: '#04361A' },
];

const POULTRY_HEALTH = [
  { disease: 'Newcastle Disease (NCD)', swahili: 'Kideri', signs: 'Twisting of neck, gasping, greenish diarrhea, sudden deaths', prevention: 'Vaccine at 7, 21, 56 days. Boost every 3–4 months.', severity: 'CRITICAL' },
  { disease: 'Gumboro (IBD)', swahili: 'Gumboro', signs: 'Depression, ruffled feathers, watery diarrhea, reduced feed intake', prevention: 'Vaccinate at 14 and 28 days. Maintain biosecurity.', severity: 'HIGH' },
  { disease: 'Coccidiosis', swahili: 'Kuku Kuumwa Tumbo', signs: 'Bloody droppings, weight loss, hunching, dehydration', prevention: 'Coccidiostat in feed. Dry litter. Drinker hygiene.', severity: 'HIGH' },
  { disease: 'Fowl Typhoid', swahili: 'Homa ya Kuku', signs: 'Yellow-green diarrhea, pale combs, sudden drop in eggs', prevention: 'Pullet vaccination. Clean water. Rodent control.', severity: 'MEDIUM' },
];

const VET_SERVICES_POULTRY = [
  { icon: Shield, title: 'Flock Health Assessment', desc: 'Full audit of your poultry house — mortality review, feed efficiency, vaccination status, and biosecurity scoring.' },
  { icon: Thermometer, title: 'Disease Diagnosis & Treatment', desc: 'Lab-backed diagnosis for Newcastle, Gumboro, Coccidiosis, and Fowl Typhoid. On-farm treatment protocols.' },
  { icon: Zap, title: 'Vaccination Programs', desc: 'Custom vaccination schedules for layer and broiler flocks. Certified vaccines supplied and administered.' },
  { icon: Egg, title: 'Egg Production Optimization', desc: 'Feed ratio analysis, lighting programs, stress reduction, and molt management to maximize lay rates.' },
];

const COMMUNITY_POSTS = [
  { author: 'Mary Wanjiku', county: 'Kiambu', content: 'Kuku zangu zimepunguza eggs in the last week — weather imebadilika na sijui kama ni stress or feed. Anyone else seeing this with their ISA Browns?', likes: 47, replies: 23, time: '2h ago' },
  { author: 'Peter Kamau', county: 'Nakuru', content: 'My broilers are at day 35, weight ni 2.1kg tu. Feed conversion ratio inaonekana poor. What finisher should I switch to before day 42?', likes: 31, replies: 18, time: '5h ago' },
  { author: 'Esther Chelimo', county: 'Uasin Gishu', content: 'Anyone keeping Kenbro in highland areas? What are your mortality rates like? Mine are at 3% which I think is okay but would love to compare.', likes: 28, replies: 14, time: '1d ago' },
];

export const PoultryPage: React.FC<PoultryPageProps> = ({ onOpenVetBooking }) => {
  const { addToCart, setIsCartOpen } = useCart();
  const heroRef = useRef<HTMLElement>(null);
  const breedsRef = useRef<HTMLElement>(null);
  const healthRef = useRef<HTMLElement>(null);
  const vetRef = useRef<HTMLElement>(null);
  const communityRef = useRef<HTMLElement>(null);

  const poultryProducts = MOCK_PRODUCTS.filter(p =>
    p.targetAnimal?.toLowerCase().includes('poult') ||
    p.targetAnimal?.toLowerCase().includes('chicken') ||
    p.targetAnimal?.toLowerCase().includes('layer') ||
    p.targetAnimal?.toLowerCase().includes('broiler') ||
    p.category?.toLowerCase().includes('feed')
  ).slice(0, 6);

  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.2 });
      tl.from('.poultry-badge', { opacity: 0, y: -15, duration: 0.5 })
        .from('.poultry-headline', { opacity: 0, y: 30, duration: 0.7 }, '-=0.2')
        .from('.poultry-sub', { opacity: 0, y: 20, duration: 0.5 }, '-=0.3')
        .from('.poultry-ctas', { opacity: 0, y: 15, duration: 0.4 }, '-=0.2')
        .from('.poultry-hero-image', { opacity: 0, scale: 0.95, x: 30, duration: 0.8, ease: 'power2.out' }, '-=0.5');

      gsap.from('.breed-card', {
        y: 50, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: breedsRef.current, start: 'top 75%' },
      });

      gsap.from('.health-row', {
        x: -40, opacity: 0, duration: 0.6, stagger: 0.12,
        scrollTrigger: { trigger: healthRef.current, start: 'top 75%' },
      });

      gsap.from('.vet-service-card', {
        scale: 0.9, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'back.out(1.2)',
        scrollTrigger: { trigger: vetRef.current, start: 'top 75%' },
      });

      gsap.from('.poultry-community-post', {
        y: 40, opacity: 0, duration: 0.6, stagger: 0.12,
        scrollTrigger: { trigger: communityRef.current, start: 'top 75%' },
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="overflow-x-hidden">

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative bg-[#04361A] text-white pt-14 pb-20 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(ellipse at 60% 50%, rgba(255,183,15,0.12) 0%, transparent 60%)',
        }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <div className="flex gap-2">
                <span className="poultry-badge inline-flex items-center gap-1.5 bg-[#FFB70F] text-[#04361A] text-[11px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider">
                  <Egg className="w-3.5 h-3.5" /> Poultry Hub
                </span>
                <span className="poultry-badge inline-flex items-center gap-1.5 bg-white/10 text-white text-[11px] font-semibold px-3 py-1.5 rounded-full">
                  Layers · Broilers · Turkeys · Kienyeji
                </span>
              </div>
              <h1 className="poultry-headline font-outfit font-black text-4xl sm:text-5xl xl:text-6xl leading-[1.05]">
                Hii Platform<br />
                <span className="text-[#FFB70F]">Ni Yako Pia.</span>
              </h1>
              <p className="poultry-sub text-base sm:text-lg text-white/75 leading-relaxed max-w-lg">
                From day-old chick to peak lay — Farmers Hub gives poultry farmers veterinary expertise, certified feeds, disease management, and a community that speaks your language.
              </p>
              <div className="poultry-ctas flex flex-col sm:flex-row gap-3">
                <button
                  onClick={onOpenVetBooking}
                  className="flex items-center justify-center gap-2 px-6 py-4 bg-[#FFB70F] hover:bg-white text-[#04361A] font-black text-sm rounded-2xl shadow-xl transition-all"
                >
                  <Stethoscope className="w-4.5 h-4.5" />
                  Flock Health Assessment
                  <ArrowRight className="w-4 h-4" />
                </button>
                <Link
                  to="/shop"
                  className="flex items-center justify-center gap-2 px-6 py-4 bg-white/10 hover:bg-white/20 border-2 border-white/20 text-white font-bold text-sm rounded-2xl transition-all"
                >
                  <ShoppingBag className="w-4.5 h-4.5" />
                  Poultry Feeds & Meds
                </Link>
              </div>
              {/* Quick trust bars */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                {[
                  { v: '8,400+', l: 'Poultry Farmers' },
                  { v: '15+', l: 'Poultry Vets' },
                  { v: '99%', l: 'NDV Recovery' },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="font-outfit font-black text-xl sm:text-2xl text-[#FFB70F]">{s.v}</div>
                    <div className="text-[11px] text-white/60 font-semibold">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="poultry-hero-image relative">
              <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl border-4 border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80"
                  alt="Kenyan poultry farm layers"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(4,54,26,0.7) 0%, transparent 50%)' }} />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-[10px] uppercase font-black tracking-wider text-[#FFB70F]">Kiambu County • Layer Farm</span>
                  <p className="text-sm font-bold mt-1">"With Farmers Hub, my flock mortality dropped from 12% to under 2%."</p>
                  <p className="text-xs text-white/60 mt-1">— Grace Njambi, 2,000 ISA Brown Layers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BREEDS ── */}
      <section ref={breedsRef} className="py-20 sm:py-24 bg-[#F5F0E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#419C09] block mb-2">Aina za Kuku</span>
            <h2 className="font-outfit font-black text-3xl sm:text-4xl text-[#04361A]">Popular Poultry Breeds in Kenya</h2>
            <p className="text-[#3D5A44] mt-2 text-sm max-w-xl mx-auto">
              Choose the right breed for your goals — egg production, meat, or dual-purpose. Our vets help you select and manage any breed.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {POULTRY_BREEDS.map((b, i) => (
              <div
                key={i}
                className="breed-card fh-card p-6 text-center group cursor-default"
              >
                <div className="text-4xl mb-3">{b.emoji}</div>
                <span className="text-[10px] font-black uppercase tracking-wider block mb-1" style={{ color: b.color }}>
                  {b.type}
                </span>
                <h3 className="font-outfit font-bold text-sm text-[#04361A] leading-snug">{b.name}</h3>
                <div className="mt-3 bg-[#F5F0E8] rounded-xl p-2.5 text-xs text-[#3D5A44]">
                  <div className="font-bold text-[#04361A]">{b.peak}</div>
                </div>
                <div className="mt-2 text-[11px] text-[#419C09] font-bold">{b.highlight}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HEALTH & DISEASE ── */}
      <section ref={healthRef} className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#419C09] block mb-2">Afya ya Kuku</span>
              <h2 className="font-outfit font-black text-3xl sm:text-4xl text-[#04361A]">Common Poultry Diseases & Prevention</h2>
              <p className="text-[#3D5A44] mt-2 text-sm max-w-lg">
                Knowing the signs and prevention protocols could save your entire flock. Our vets provide customized vaccination calendars and treatment protocols.
              </p>
            </div>
            <button onClick={onOpenVetBooking} className="flex items-center gap-2 px-6 py-3.5 bg-[#FFB70F] hover:bg-[#04361A] hover:text-white text-[#04361A] font-black text-sm rounded-xl transition-all shrink-0">
              <Stethoscope className="w-4 h-4" /> Get Vaccination Program
            </button>
          </div>

          <div className="space-y-4">
            {POULTRY_HEALTH.map((h, i) => (
              <div key={i} className="health-row p-5 sm:p-6 rounded-2xl border border-[#04361A]/08 bg-[#FAF7F0] grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                      h.severity === 'CRITICAL' ? 'bg-red-100 text-red-700' :
                      h.severity === 'HIGH' ? 'bg-orange-100 text-orange-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>{h.severity}</span>
                  </div>
                  <h3 className="font-outfit font-bold text-sm text-[#04361A]">{h.disease}</h3>
                  <p className="text-[11px] text-[#7A9480] italic mt-0.5">{h.swahili}</p>
                </div>
                <div className="md:col-span-5">
                  <div className="text-[10px] font-black text-[#419C09] uppercase tracking-wider mb-1">Signs to watch</div>
                  <p className="text-xs text-[#3D5A44] leading-relaxed">{h.signs}</p>
                </div>
                <div className="md:col-span-4">
                  <div className="text-[10px] font-black text-[#04361A] uppercase tracking-wider mb-1">Prevention</div>
                  <p className="text-xs text-[#3D5A44] leading-relaxed">{h.prevention}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VET SERVICES FOR POULTRY ── */}
      <section ref={vetRef} className="py-20 sm:py-24 bg-[#04361A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#FFB70F] block mb-2">Huduma za Daktari</span>
            <h2 className="font-outfit font-black text-3xl sm:text-4xl">Veterinary Services for Poultry Farmers</h2>
            <p className="text-white/65 mt-2 text-sm max-w-lg mx-auto">
              Our licensed poultry vets come to your farm. Emergency same-day response within 2 hours for most Kenyan counties.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VET_SERVICES_POULTRY.map((s, i) => (
              <div key={i} className="vet-service-card p-6 rounded-2xl bg-white/08 border border-white/10 hover:bg-white/12 hover:border-[#FFB70F]/30 transition-all group cursor-default">
                <div className="w-10 h-10 rounded-xl bg-[#FFB70F]/15 flex items-center justify-center mb-4 group-hover:bg-[#FFB70F] transition-colors">
                  <s.icon className="w-5 h-5 text-[#FFB70F] group-hover:text-[#04361A] transition-colors" />
                </div>
                <h3 className="font-outfit font-bold text-sm text-white mb-2">{s.title}</h3>
                <p className="text-xs text-white/60 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button
              onClick={onOpenVetBooking}
              className="px-8 py-4 bg-[#FFB70F] hover:bg-white text-[#04361A] font-black text-sm rounded-2xl shadow-xl transition-all inline-flex items-center gap-2"
            >
              <Stethoscope className="w-4.5 h-4.5" />
              Book a Poultry Vet Visit
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── POULTRY FEEDS FROM SHOP ── */}
      <section className="py-20 sm:py-24 bg-[#FAF7F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#419C09] block mb-2">Chakula cha Kuku</span>
              <h2 className="font-outfit font-black text-3xl sm:text-4xl text-[#04361A]">Poultry Feeds & Health Products</h2>
            </div>
            <Link to="/shop" className="flex items-center gap-2 px-5 py-3 bg-[#04361A] hover:bg-[#419C09] text-white font-bold text-sm rounded-xl transition-all shrink-0">
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="horizontal-scroll-track">
            {(poultryProducts.length > 0 ? poultryProducts : MOCK_PRODUCTS.slice(0, 5)).map((p) => (
              <div key={p.id} className="product-card w-60 shrink-0 bg-white rounded-2xl overflow-hidden border border-[#04361A]/06">
                <div className="relative h-40 overflow-hidden bg-[#F5F0E8]">
                  <img src={p.imageUrl} alt={p.name} className="product-img w-full h-full object-cover" />
                  {p.badge && (
                    <div className="absolute top-2 left-2 bg-[#FFB70F] text-[#04361A] text-[10px] font-black px-2 py-0.5 rounded-lg uppercase">{p.badge}</div>
                  )}
                </div>
                <div className="p-4">
                  <span className="text-[10px] font-bold text-[#419C09] uppercase tracking-wider">{p.category}</span>
                  <h3 className="font-bold text-sm text-[#04361A] mt-1 line-clamp-2">{p.name}</h3>
                  <div className="font-black text-sm text-[#04361A] mt-2">KES {p.priceKes.toLocaleString()}</div>
                  <button
                    onClick={() => { addToCart(p); setIsCartOpen(true); }}
                    className="w-full mt-3 py-2 bg-[#04361A] hover:bg-[#419C09] text-white font-bold text-xs rounded-xl transition-colors"
                  >
                    Add to Basket
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMUNITY ── */}
      <section ref={communityRef} className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#419C09] block mb-2">Baraza la Kuku Farmers</span>
              <h2 className="font-outfit font-black text-3xl text-[#04361A]">What Poultry Farmers Are Saying</h2>
            </div>
            <Link to="/community" className="flex items-center gap-2 px-5 py-3 bg-[#04361A] hover:bg-[#419C09] text-white font-bold text-sm rounded-xl transition-all shrink-0">
              Join the Baraza <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {COMMUNITY_POSTS.map((p, i) => (
              <div key={i} className="poultry-community-post post-card">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-[#419C09]/12 flex items-center justify-center">
                    <Egg className="w-4 h-4 text-[#419C09]" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-[#04361A]">{p.author}</div>
                    <div className="text-[10px] text-[#7A9480]">{p.county} • {p.time}</div>
                  </div>
                </div>
                <p className="text-sm text-[#3D5A44] leading-relaxed">{p.content}</p>
                <div className="mt-4 pt-3 border-t border-[#04361A]/06 flex items-center justify-between text-xs text-[#7A9480]">
                  <span>{p.likes} likes • {p.replies} replies</span>
                  <Link to="/community" className="text-[#419C09] font-bold hover:underline">Read →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
