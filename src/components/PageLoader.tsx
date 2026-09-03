import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface PageLoaderProps {
  onComplete: () => void;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ onComplete }) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = document.getElementById('fh-loader');
    if (el) el.style.display = 'none'; // hide the HTML loader since React takes over

    if (!loaderRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loaderRef.current, {
          clipPath: 'inset(0 0 100% 0)',
          duration: 0.7,
          ease: 'power3.inOut',
          onComplete,
        });
      },
    });

    // Entrance
    tl.from(logoRef.current, {
      scale: 0.6,
      opacity: 0,
      duration: 0.7,
      ease: 'back.out(1.5)',
    })
      .from(textRef.current, { opacity: 0, y: 10, duration: 0.4 }, '-=0.2')
      .from(taglineRef.current, { opacity: 0, y: 8, duration: 0.4 }, '-=0.2')
      .from(barRef.current, { scaleX: 0, duration: 0.5, ease: 'power2.out', transformOrigin: 'left center' }, '-=0.1')
      // Hold for a moment
      .to({}, { duration: 0.6 })
      // Quick logo zoom out
      .to(logoRef.current, { scale: 1.1, opacity: 0, duration: 0.3, ease: 'power2.in' })
      .to([textRef.current, taglineRef.current], { opacity: 0, duration: 0.2 }, '<');

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      style={{ clipPath: 'inset(0 0 0 0)' }}
      className="fixed inset-0 z-[9999] bg-[#04361A] flex flex-col items-center justify-center gap-6"
      role="status"
      aria-label="Loading Farmers Hub"
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, rgba(65,156,9,0.15) 0%, transparent 60%)',
      }} />

      {/* Logo — official transparent PNG from /public/assets/ */}
      <img
        ref={logoRef}
        src="./assets/logo-transparent.png"
        alt="Farmers Hub"
        style={{ width: 130, height: 130, objectFit: 'contain' }}
      />

      {/* Progress bar */}
      <div className="w-44 h-[3px] rounded-full overflow-hidden bg-white/10">
        <div
          ref={barRef}
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #FFB70F, #419C09)', width: '100%' }}
        />
      </div>

      {/* Text */}
      <span ref={textRef} className="font-outfit font-bold text-xs tracking-[0.3em] text-white/60 uppercase">
        Loading Farmers Hub
      </span>
      <span ref={taglineRef} className="font-jakarta text-[11px] text-[#FFB70F]/60 italic -mt-4">
        Shamba lako, mifugo yako, faida yako.
      </span>
    </div>
  );
};
