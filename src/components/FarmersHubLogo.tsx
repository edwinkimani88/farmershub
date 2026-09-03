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
  const heightPx = heightMaps[size] || 44;

  // On dark header backgrounds: use transparent PNG with NO filter — the green artwork
  // shows clearly against the dark green. On light backgrounds: use the full PNG.
  const logoSrc = theme === 'light' ? logoFull : logoTransparent;

  const imgStyle: React.CSSProperties = {
    height: `${heightPx}px`,
    width: 'auto',
    maxHeight: `${heightPx}px`,
    objectFit: 'contain',
    // No CSS filter — show the official colours as designed
  };

  return (
    <img
      src={logoSrc}
      alt="Farmers Hub"
      style={imgStyle}
      className={`shrink-0 block ${className}`}
    />
  );
};
