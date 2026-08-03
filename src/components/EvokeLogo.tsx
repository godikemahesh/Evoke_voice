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
          className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(245,158,11,0.35)]"
        />
      </div>

      {showText && (
        <span className="flex items-baseline gap-2">
          <span className={`font-display font-semibold tracking-wide text-cream uppercase select-none ${size === 'sm' ? 'text-base' : size === 'lg' ? 'text-3xl' : 'text-2xl'}`}>
            Evoke
          </span>
          <span className="w-6 h-px bg-ember-500 hidden sm:inline-block" />
        </span>
      )}
    </div>
  );
};

