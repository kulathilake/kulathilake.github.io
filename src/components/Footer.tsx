import React from 'react';

interface FooterProps {
  onOpenContact: () => void;
  onOpenCode?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact, onOpenCode }) => {
  return (
    <footer className="w-full max-w-4xl mx-auto px-6 pt-16 pb-12 text-center text-[13.5px] sm:text-[14px] text-[#4d4d4d] font-sans">
      <div className="w-full h-px bg-[#e5e3dc] mb-8" />
      <p className="tracking-wide">
        <span>© 2024 Shehan Kulathilake.</span>
        <span className="mx-2 text-[#b0ae9f]">|</span>
        <a
          href="https://www.github.com/kulathilake"
          target="_blank"
          rel="noreferrer"
          className="hover:text-black underline underline-offset-2 transition-colors focus:outline-none"
        >
          GitHub
        </a>
        <span className="mx-2 text-[#b0ae9f]">|</span>
        <button
          onClick={onOpenContact}
          className="hover:text-black focus:outline-none font-medium text-[#222222]"
        >
          [Contact]
        </button>
      </p>
    </footer>
  );
};
