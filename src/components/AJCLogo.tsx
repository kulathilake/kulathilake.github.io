import React from 'react';

interface AJCLogoProps {
  className?: string;
}

export const AJCLogo: React.FC<AJCLogoProps> = ({ className = 'w-9 h-9' }) => {
  return (
    <div
      className={`relative flex items-center justify-center border border-[#d6d4cb] bg-[#faf9f5] ${className} select-none`}
      title="Shehan Kulathilake"
    >
      {/* Subtle geometric wireframe cube lines */}
      <svg
        className="absolute inset-0 w-full h-full text-[#cfcdc4] pointer-events-none"
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
      >
        {/* Isometric cube wireframe */}
        <polygon points="20,5 34,13 20,21 6,13" opacity="0.6" />
        <polygon points="6,13 20,21 20,35 6,27" opacity="0.4" />
        <polygon points="34,13 20,21 20,35 34,27" opacity="0.5" />
        <line x1="20" y1="5" x2="20" y2="21" strokeDasharray="1 1" opacity="0.4" />
        <line x1="6" y1="13" x2="34" y2="27" opacity="0.25" />
      </svg>
      {/* Monogram Text */}
      <span className="relative z-10 font-serif font-medium text-[13px] tracking-wider text-[#1a1a1a]">
        SK
      </span>
    </div>
  );
};
