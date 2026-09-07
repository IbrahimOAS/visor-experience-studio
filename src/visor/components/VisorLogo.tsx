import React from 'react';

interface VisorLogoProps {
  className?: string;
  size?: number;
  includeCircleBg?: boolean;
}

export function VisorLogo({
  className = '',
  size = 36,
  includeCircleBg = false,
}: VisorLogoProps) {
  return (
    <div 
      className={`flex items-center justify-center shrink-0 ${includeCircleBg ? 'rounded-full border border-white/20 shadow-[0_0_15px_rgba(153,255,255,0.2)] overflow-hidden bg-black' : ''} ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src="/logo.png"
        alt="VISOR Logo"
        className="w-full h-full object-contain"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
