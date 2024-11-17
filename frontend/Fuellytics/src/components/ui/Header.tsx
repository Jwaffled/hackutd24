// components/ui/Header.tsx
import React from 'react';
import { IconMenu2, IconHome, IconHelpCircle, IconChevronDown } from '@tabler/icons-react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 flex justify-between items-center px-5 py-3 bg-gray-900/70 backdrop-blur-sm border-b border-white/10 shadow-lg">
      <button 
        onClick={onMenuClick}
        className="flex items-center px-4 py-2 rounded-md bg-white/10 hover:bg-blue-600/80 transition-all duration-300 transform hover:scale-105 z-50"
      >
        <IconMenu2 className="text-white" size={20} />
        <span className="ml-2 text-sm font-bold text-white">Home</span>
      </button>
      
      {/* Rest of your header content */}
    </header>
  );
};

export default Header;