import React from 'react';
import { NavTab } from '../types';
import { AJCLogo } from './AJCLogo';

interface HeaderProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onGoHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onGoHome,
}) => {
  const navItems: { label: string; tab: NavTab }[] = [
    { label: 'Home', tab: 'home' },
    { label: 'Research', tab: 'research' },
    { label: 'Code', tab: 'code' },
    { label: 'About', tab: 'about' },
    { label: 'Archive', tab: 'archive' },
  ];

  return (
    <header className="w-full bg-[#f7f6f1] border-b border-[#e5e3dc]">
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Brand / Title */}
        <button
          onClick={onGoHome}
          className="flex items-center gap-3 text-left group transition-opacity hover:opacity-85 focus:outline-none"
          aria-label="Shehan Kulathilake Home"
        >
          <AJCLogo />
          <span className="font-serif text-[19px] sm:text-[21px] text-[#1a1a1a] tracking-tight">
            Shehan Kulathilake: Computational Experiments &amp; Research Notes
          </span>
        </button>

        {/* Navigation Items */}
        <nav className="flex items-center space-x-6 sm:space-x-7 text-[15px] sm:text-[16px] font-sans text-[#222222]">
          {navItems.map((item) => {
            const isActive = currentTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => onSelectTab(item.tab)}
                className={`transition-colors py-1 focus:outline-none relative ${
                  isActive
                    ? 'text-black font-medium border-b border-black'
                    : 'text-[#444444] hover:text-black hover:border-b hover:border-[#999999]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
