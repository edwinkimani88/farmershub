import React from 'react';
import logoTransparent from '../assets/Hub Logo transparent.png';
import logoFull from '../assets/Hub Logo.png';

interface FarmersHubLogoProps {
  className?: string;
  variant?: 'full' | 'horizontal' | 'icon-only';
  theme?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const heightMaps = {
  sm: 32,
  md: 44,
  lg: 60,
  xl: 80,
};

export const FarmersHubLogo: React.FC<FarmersHubLogoProps> = ({
  className = '',
  variant = 'horizontal',
  theme = 'dark',
  size = 'md',
}) => {
  const isDark = theme === 'dark';
  const heightPx = heightMaps[size] || 44;

  // Use official transparent PNG or official full logo PNG
  const logoSrc = variant === 'full' ? logoFull : logoTransparent;

  // On dark backgrounds (like header #04361A), invert logo if needed or use high contrast
  const imgStyle: React.CSSProperties = {
    height: `${heightPx}px`,
    width: 'auto',
    maxHeight: `${heightPx}px`,
    objectFit: 'contain',
    filter: isDark ? 'brightness(0) invert(1)' : undefined,
  };

  return (
    <img
      src={logoSrc}
      alt="Farmers Hub Logo"
      style={imgStyle}
      className={`shrink-0 block ${className}`}
    />
  );
};
