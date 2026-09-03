import React from 'react';

interface FarmersHubLogoProps {
  className?: string;
  variant?: 'full' | 'horizontal' | 'icon-only';
  theme?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const heightMaps: Record<string, number> = {
  sm: 32,
  md: 44,
  lg: 60,
  xl: 80,
};

// These files live in /public/assets/ and are served by Vite/XAMPP as-is at a stable path.
// Using URL strings (not ESM imports) avoids Vite hashing the filename on every build.
const LOGO_TRANSPARENT = './assets/logo-transparent.png';
const LOGO_FULL = './assets/logo-full.png';

export const FarmersHubLogo: React.FC<FarmersHubLogoProps> = ({
  className = '',
  variant = 'horizontal',
  theme = 'dark',
  size = 'md',
}) => {
  const heightPx = heightMaps[size] ?? 44;

  // Dark header → transparent PNG (green/yellow artwork shows on dark green bg)
  // Light background → full PNG (white bg baked in)
  const logoSrc = theme === 'light' ? LOGO_FULL : LOGO_TRANSPARENT;

  return (
    <img
      src={logoSrc}
      alt="Farmers Hub"
      style={{
        height: `${heightPx}px`,
        width: 'auto',
        maxHeight: `${heightPx}px`,
        objectFit: 'contain',
        display: 'block',
      }}
      className={`shrink-0 ${className}`}
    />
  );
};
