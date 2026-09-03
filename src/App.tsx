import React, { useState, useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CartProvider, useCart } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { QuickVetBookingModal } from './components/QuickVetBookingModal';
import { ShambaCompanion } from './components/ShambaCompanion';
import { PageLoader } from './components/PageLoader';

// Pages
import { HomePage } from './pages/HomePage';
import { VeterinaryPage } from './pages/VeterinaryPage';
import { LivestockPage } from './pages/LivestockPage';
import { PoultryPage } from './pages/PoultryPage';
import { ShopPage } from './pages/ShopPage';
import { CommunityPage } from './pages/CommunityPage';
import { LearnPage } from './pages/LearnPage';
import { PortalPage } from './pages/PortalPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AuthPage } from './pages/AuthPage';

import { FarmerProfile } from './types';
import { MOCK_FARMER_PROFILE } from './data/mockData';
import { Bot, Sparkles, CheckCircle2 } from 'lucide-react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Scroll to top on every navigation change
function ScrollToTop() {
  const { pathname } = useLocation();
  const curtainRef = useRef<HTMLDivElement>(null);
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;

    // Page transition curtain wipe
    const curtain = document.getElementById('page-curtain');
    if (!curtain) return;

    const tl = gsap.timeline();
    // Wipe down to reveal
    tl.fromTo(curtain,
      { clipPath: 'inset(0 0 100% 0)' },
      { clipPath: 'inset(0 0 0% 0)', duration: 0.3, ease: 'power3.in' }
    ).to(curtain, {
      clipPath: 'inset(100% 0 0 0)',
      duration: 0.35,
      ease: 'power3.out',
      delay: 0.05,
    });

    window.scrollTo(0, 0);

    // Kill old ScrollTriggers to prevent accumulation
    ScrollTrigger.getAll().forEach(t => t.kill());
  }, [pathname]);

  return null;
}

// Global Toast for Cart Additions
function CartNotificationToast() {
  const { addedNotice } = useCart();
  if (!addedNotice) return null;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-[#04361A] text-white px-5 py-3 rounded-2xl shadow-2xl border-2 border-[#FFB70F] flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <CheckCircle2 className="w-5 h-5 text-[#419C09] shrink-0" />
      <span className="text-xs sm:text-sm font-bold">{addedNotice}</span>
    </div>
  );
}

function MainAppContent() {
  const [currentFarmer, setCurrentFarmer] = useState<FarmerProfile | null>(MOCK_FARMER_PROFILE);
  const [isVetBookingOpen, setIsVetBookingOpen] = useState(false);
  const [isCompanionOpen, setIsCompanionOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {/* Page Loader */}
      {isLoading && <PageLoader onComplete={handleLoaderComplete} />}

      {/* Page Transition Curtain */}
      <div
        id="page-curtain"
        className="fixed inset-0 z-[8000] bg-[#04361A] pointer-events-none"
        style={{ clipPath: 'inset(0 0 100% 0)' }}
        aria-hidden="true"
      />

      <div className={`min-h-screen flex flex-col bg-[#F5F0E8] text-[#04361A] selection:bg-[#419C09] selection:text-white transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <ScrollToTop />

        {/* Persistent Navigation Header */}
        <Header
          currentFarmer={currentFarmer}
          onOpenVetBooking={() => setIsVetBookingOpen(true)}
          onOpenAuth={() => window.location.hash = '#/login'}
        />

        {/* Main Multi-Page Route Outlet */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage onOpenVetBooking={() => setIsVetBookingOpen(true)} />} />
            <Route path="/veterinary" element={<VeterinaryPage onOpenVetBooking={() => setIsVetBookingOpen(true)} />} />
            <Route path="/services" element={<VeterinaryPage onOpenVetBooking={() => setIsVetBookingOpen(true)} />} />
            <Route path="/livestock" element={<LivestockPage />} />
            <Route path="/poultry" element={<PoultryPage onOpenVetBooking={() => setIsVetBookingOpen(true)} />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/shop/feeds" element={<ShopPage initialCategory="feeds" />} />
            <Route path="/shop/animal-health" element={<ShopPage initialCategory="animal-health" />} />
            <Route path="/shop/products" element={<ShopPage initialCategory="products" />} />
            <Route path="/community" element={<CommunityPage currentFarmer={currentFarmer} onOpenAuth={() => window.location.hash = '#/login'} />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/portal" element={<PortalPage currentFarmer={currentFarmer} onOpenVetBooking={() => setIsVetBookingOpen(true)} onOpenAuth={() => window.location.hash = '#/login'} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<AuthPage onLoginSuccess={(f) => setCurrentFarmer(f)} />} />
            <Route path="/signup" element={<AuthPage onLoginSuccess={(f) => setCurrentFarmer(f)} defaultMode="signup" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Persistent Footer */}
        <Footer onOpenVetBooking={() => setIsVetBookingOpen(true)} />

        {/* Global Interactive Overlays */}
        <CartDrawer />
        <CartNotificationToast />
        <QuickVetBookingModal
          isOpen={isVetBookingOpen}
          onClose={() => setIsVetBookingOpen(false)}
        />

        {/* Shamba AI Companion */}
        {isCompanionOpen && (
          <ShambaCompanion
            currentFarmer={currentFarmer}
            onClose={() => setIsCompanionOpen(false)}
          />
        )}

        {/* Floating AI Launcher */}
        {!isCompanionOpen && !isLoading && (
          <div className="fixed bottom-5 right-5 z-40">
            <button
              onClick={() => setIsCompanionOpen(true)}
              className="group flex items-center gap-2.5 px-4 py-3 bg-[#04361A] hover:bg-[#419C09] text-white rounded-2xl shadow-2xl border-2 border-[#FFB70F] transition-all duration-300 hover:scale-105 active:scale-95"
              aria-label="Open Shamba Companion AI"
            >
              <div className="w-8 h-8 rounded-xl bg-[#FFB70F] text-[#04361A] flex items-center justify-center font-bold shadow-sm">
                <Bot className="w-5 h-5" />
              </div>
              <div className="text-left hidden sm:block">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-black tracking-tight">Shamba Companion AI</span>
                  <Sparkles className="w-3 h-3 text-[#FFB70F]" />
                </div>
                <span className="text-[10px] text-white/80 block">Ask Vet or Disease Questions</span>
              </div>
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <CartProvider>
        <MainAppContent />
      </CartProvider>
    </HashRouter>
  );
}
