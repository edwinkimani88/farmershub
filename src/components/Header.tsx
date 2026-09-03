import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FarmersHubLogo } from './FarmersHubLogo';
import { useCart } from '../context/CartContext';
import { FarmerProfile } from '../types';
import gsap from 'gsap';
import {
  Phone,
  Menu,
  X,
  ShoppingBag,
  Stethoscope,
  User,
  ChevronDown,
  Egg,
  Beef,
  Leaf,
  ShieldPlus,
  BookOpen,
  Users,
  LayoutDashboard,
  ArrowRight,
  Wheat,
} from 'lucide-react';

interface HeaderProps {
  currentFarmer: FarmerProfile | null;
  onOpenVetBooking: () => void;
  onOpenAuth: () => void;
}

const shopLinks = [
  { icon: Wheat, label: 'Feeds & Nutrition', sub: 'Poultry, dairy, pig & calf feeds', path: '/shop' },
  { icon: ShieldPlus, label: 'Animal Health', sub: 'Medicines, vaccines & supplements', path: '/shop' },
  { icon: Leaf, label: 'Farm Products', sub: 'Consumables & farm supplies', path: '/shop' },
];

const livestockLinks = [
  { emoji: '🐔', label: 'Poultry', sub: 'Layers, broilers & turkeys', path: '/poultry' },
  { emoji: '🐄', label: 'Cattle & Dairy', sub: 'Dairy & beef breeds', path: '/livestock' },
  { emoji: '🐖', label: 'Pigs', sub: 'Feed, health & production', path: '/livestock' },
  { emoji: '🐐', label: 'Goats & Sheep', sub: 'Breeds, nutrition & care', path: '/livestock' },
];

export const Header: React.FC<HeaderProps> = ({
  currentFarmer,
  onOpenVetBooking,
  onOpenAuth,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [livestockOpen, setLivestockOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { totalItems, setIsCartOpen } = useCart();
  const headerRef = useRef<HTMLElement>(null);
  const shopTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const livestockTimerRef = useRef<ReturnType<typeof setTimeout>>();

  // Scroll detection for glass effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // GSAP entrance
  useEffect(() => {
    if (!headerRef.current) return;
    gsap.from(headerRef.current, {
      y: -80,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.2,
    });
  }, []);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleShopEnter = () => {
    clearTimeout(shopTimerRef.current);
    setShopOpen(true);
  };
  const handleShopLeave = () => {
    shopTimerRef.current = setTimeout(() => setShopOpen(false), 150);
  };
  const handleLivestockEnter = () => {
    clearTimeout(livestockTimerRef.current);
    setLivestockOpen(true);
  };
  const handleLivestockLeave = () => {
    livestockTimerRef.current = setTimeout(() => setLivestockOpen(false), 150);
  };

  return (
    <header
      ref={headerRef}
      className={`w-full sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#04361A]/95 backdrop-blur-md shadow-2xl'
          : 'bg-[#04361A]'
      }`}
    >
      {/* Top strip */}
      <div className="border-b border-white/10 py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1 sm:gap-0">
          <div className="flex items-center gap-2 text-[11px] text-white/70">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFB70F] animate-pulse" />
            <span className="font-semibold text-white/80">Karibu Farmers Hub Kenya</span>
            <span className="hidden md:inline text-white/40">•</span>
            <span className="hidden md:inline">KVB Registered Veterinary Services & Certified Feeds</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-white/60">24/7 Emergency Vet</span>
            <a href="tel:+254707732280" className="font-bold text-[#FFB70F] hover:underline flex items-center gap-1">
              <Phone className="w-3 h-3" /> 0707 73 22 80
            </a>
          </div>
        </div>
      </div>

      {/* Main nav bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0 group" aria-label="Farmers Hub Home">
            <FarmersHubLogo variant="horizontal" size="md" theme="dark" className="group-hover:scale-[1.02] transition-transform duration-200" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Main navigation">
            {/* Home */}
            <Link to="/" className={`nav-item-underline px-3 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 ${isActive('/') ? 'text-[#FFB70F]' : 'text-white/85 hover:text-white'}`}>
              Home
            </Link>

            {/* Veterinary Care */}
            <Link to="/veterinary" className={`nav-item-underline px-3 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 flex items-center gap-1.5 ${isActive('/veterinary') ? 'text-[#FFB70F]' : 'text-white/85 hover:text-white'}`}>
              <Stethoscope className="w-3.5 h-3.5" />
              Veterinary Care
            </Link>

            {/* Livestock & Poultry Mega */}
            <div
              className="relative"
              onMouseEnter={handleLivestockEnter}
              onMouseLeave={handleLivestockLeave}
            >
              <Link to="/livestock" className={`nav-item-underline px-3 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 flex items-center gap-1.5 ${isActive('/livestock') || isActive('/poultry') ? 'text-[#FFB70F]' : 'text-white/85 hover:text-white'}`}>
                Livestock & Poultry
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${livestockOpen ? 'rotate-180' : ''}`} />
              </Link>

              {/* Livestock Mega Menu */}
              <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[380px] bg-white rounded-2xl shadow-2xl border border-[#04361A]/10 p-3 transition-all duration-200 origin-top z-50 ${livestockOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}>
                <div className="grid grid-cols-2 gap-2">
                  {livestockLinks.map((l) => (
                    <Link
                      key={l.path + l.label}
                      to={l.path}
                      onClick={() => setLivestockOpen(false)}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#F5F0E8] transition-colors group"
                    >
                      <span className="text-2xl">{l.emoji}</span>
                      <div>
                        <div className="font-bold text-sm text-[#04361A] group-hover:text-[#419C09] transition-colors">{l.label}</div>
                        <div className="text-[11px] text-neutral-500">{l.sub}</div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-2 pt-2 border-t border-[#04361A]/08">
                  <Link to="/livestock" onClick={() => setLivestockOpen(false)} className="flex items-center gap-1.5 text-xs font-bold text-[#419C09] hover:text-[#04361A] transition-colors px-3">
                    View all livestock guides <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Shop Mega */}
            <div
              className="relative"
              onMouseEnter={handleShopEnter}
              onMouseLeave={handleShopLeave}
            >
              <Link to="/shop" className={`nav-item-underline px-3 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 flex items-center gap-1.5 ${isActive('/shop') ? 'text-[#FFB70F]' : 'text-white/85 hover:text-white'}`}>
                <ShoppingBag className="w-3.5 h-3.5" />
                Farm Shop
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${shopOpen ? 'rotate-180' : ''}`} />
              </Link>

              {/* Shop Mega Menu */}
              <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[340px] bg-white rounded-2xl shadow-2xl border border-[#04361A]/10 p-3 transition-all duration-200 origin-top z-50 ${shopOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}>
                <div className="space-y-1">
                  {shopLinks.map((l) => (
                    <Link
                      key={l.path + l.label}
                      to={l.path}
                      onClick={() => setShopOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F5F0E8] transition-colors group"
                    >
                      <div className="w-9 h-9 rounded-xl bg-[#04361A]/08 flex items-center justify-center group-hover:bg-[#04361A] transition-colors">
                        <l.icon className="w-4.5 h-4.5 text-[#04361A] group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-[#04361A]">{l.label}</div>
                        <div className="text-[11px] text-neutral-500">{l.sub}</div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-2 pt-2 border-t border-[#04361A]/08">
                  <Link to="/shop" onClick={() => setShopOpen(false)} className="flex items-center gap-1.5 text-xs font-bold text-[#419C09] hover:text-[#04361A] transition-colors px-3">
                    Browse all products <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Community */}
            <Link to="/community" className={`nav-item-underline px-3 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 ${isActive('/community') ? 'text-[#FFB70F]' : 'text-white/85 hover:text-white'}`}>
              Community
            </Link>

            {/* Learn */}
            <Link to="/learn" className={`nav-item-underline px-3 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 ${isActive('/learn') ? 'text-[#FFB70F]' : 'text-white/85 hover:text-white'}`}>
              Learn
            </Link>

            {/* About */}
            <Link to="/about" className={`nav-item-underline px-3 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 ${isActive('/about') ? 'text-[#FFB70F]' : 'text-white/85 hover:text-white'}`}>
              About
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Primary CTA */}
            <button
              onClick={onOpenVetBooking}
              id="header-vet-cta"
              className="magnetic-btn hidden sm:flex items-center gap-2 px-4 py-2.5 bg-[#FFB70F] hover:bg-white text-[#04361A] font-extrabold text-xs rounded-xl shadow-lg transition-all duration-200 border-2 border-[#FFB70F]"
            >
              <span className="w-2 h-2 rounded-full bg-[#04361A] animate-ping" />
              <Stethoscope className="w-4 h-4" />
              <span>GET VET HELP</span>
            </button>

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              id="header-cart"
              className="relative p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all flex items-center gap-2"
              title="View Shamba Basket"
            >
              <ShoppingBag className="w-4.5 h-4.5" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#FFB70F] text-[#04361A] font-extrabold text-[11px] flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Portal / Login */}
            {currentFarmer ? (
              <Link to="/portal" className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition-all">
                <div className="w-6 h-6 rounded-full bg-[#419C09] flex items-center justify-center font-bold text-[10px]">
                  {currentFarmer.name.slice(0, 2).toUpperCase()}
                </div>
                <span className="max-w-[90px] truncate">{currentFarmer.name.split(' ')[0]}</span>
              </Link>
            ) : (
              <Link to="/login" id="header-login" className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition-colors">
                <User className="w-3.5 h-3.5" />
                Sign In
              </Link>
            )}

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all"
              aria-label="Toggle navigation"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <div className="bg-[#021A0D] border-t border-white/10 px-4 py-5 space-y-2">
          {/* Quick actions */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <button
              onClick={() => { onOpenVetBooking(); setMobileOpen(false); }}
              className="py-3 bg-[#FFB70F] text-[#04361A] font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5"
            >
              <Stethoscope className="w-4 h-4" /> Get Vet Help
            </button>
            <button
              onClick={() => { setIsCartOpen(true); setMobileOpen(false); }}
              className="py-3 bg-white/10 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 border border-white/20"
            >
              <ShoppingBag className="w-4 h-4 text-[#FFB70F]" /> Basket ({totalItems})
            </button>
          </div>

          {/* Nav links */}
          {[
            { label: 'Home', path: '/', icon: null },
            { label: 'Veterinary Care', path: '/veterinary', icon: null },
            { label: 'Poultry', path: '/poultry', icon: null },
            { label: 'Livestock', path: '/livestock', icon: null },
            { label: 'Farm Shop', path: '/shop', icon: null },
            { label: 'Community', path: '/community', icon: null },
            { label: 'Learn', path: '/learn', icon: null },
            { label: 'About', path: '/about', icon: null },
            { label: 'Contact', path: '/contact', icon: null },
          ].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-colors ${isActive(link.path) ? 'bg-[#419C09]/20 text-[#FFB70F]' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
            >
              {link.label}
              <ArrowRight className="w-4 h-4 opacity-40" />
            </Link>
          ))}

          {/* Auth */}
          <div className="pt-3 border-t border-white/10">
            {currentFarmer ? (
              <Link to="/portal" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 text-white text-sm font-bold">
                <LayoutDashboard className="w-4 h-4 text-[#FFB70F]" />
                Farmer Portal — {currentFarmer.name.split(' ')[0]}
              </Link>
            ) : (
              <Link to="/login" onClick={() => setMobileOpen(false)} className="block text-center py-3 px-4 rounded-xl bg-white/10 text-white text-sm font-bold border border-white/20">
                Sign In / Register
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
