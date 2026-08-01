import React from 'react';
import logoSvg from '../assets/logo.svg';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const EvokeLogo: React.FC<LogoProps> = ({
  className = '',
  showText = true,
  size = 'md',
}) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Flame + Soundwave Image Logo from assets */}
      <div className={`relative flex items-center justify-center shrink-0 ${iconSizes[size]}`}>
        <img
          src={logoSvg}
          alt="EVOKE Logo"
          className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(245,158,11,0.4)]"
        />
      </div>

      {showText && (
        <span className="text-xl md:text-2xl font-normal tracking-[0.22em] bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent font-serif uppercase select-none">
          EVOKE
        </span>
      )}
    </div>
  );
};

