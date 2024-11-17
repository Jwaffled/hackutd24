import React, { useState } from 'react';
import { IconMenu2, IconHome, IconHelpCircle, IconChevronDown, IconX } from '@tabler/icons-react';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (menu: string) => {
    if (openDropdown === menu) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(menu);
    }
  };

  const handleClickOutside = () => {
    setOpenDropdown(null);
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900/95 backdrop-blur-sm transform transition-transform duration-300 ease-in-out z-40 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">Menu</h2>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="text-white hover:text-gray-300 transition-colors"
          >
            <IconX size={24} />
          </button>
        </div>
        
        <nav className="p-4">
          <div className="space-y-2">
            <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-blue-600/80 rounded-md transition-colors">
              Examples
            </a>
            <a href="/comparisons" className="block px-4 py-2 text-sm text-white hover:bg-blue-600/80 rounded-md transition-colors">
              Comparisons
            </a>
            <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-blue-600/80 rounded-md transition-colors">
              Aggregation
            </a>
            <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-blue-600/80 rounded-md transition-colors">
              Models
            </a>
          </div>
          
          <div className="mt-8 pt-4 border-t border-white/10">
            <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Quick Links
            </h3>
            <div className="mt-2 space-y-2">
              <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-blue-600/80 rounded-md transition-colors">
                Documentation
              </a>
              <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-blue-600/80 rounded-md transition-colors">
                Support
              </a>
              <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-blue-600/80 rounded-md transition-colors">
                FAQ
              </a>
            </div>
          </div>
        </nav>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Visor Header */}
      <header className="fixed top-0 left-0 right-0 z-30 flex justify-between items-center px-5 py-3 bg-gray-900/70 backdrop-blur-sm border-b border-white/10 shadow-lg">
        {/* Menu Button */}
        <button 
          className="flex items-center px-4 py-2 rounded-md bg-white/10 hover:bg-blue-600/80 transition-all duration-300 transform hover:scale-105 z-50"
          onClick={() => setIsSidebarOpen(true)}
        >
          <IconMenu2 className="text-white" size={20} />
          <span className="ml-2 text-sm font-bold text-white">Menu</span>
        </button>
        
        <div className="flex gap-4">
          {/* Home Button with Dropdown */}
          <div className="relative">
            <button 
              className="flex items-center px-4 py-2 rounded-md bg-white/10 hover:bg-blue-600/80 transition-all duration-300 transform hover:scale-105"
              onClick={(e) => {
                e.stopPropagation();
                toggleDropdown('home');
              }}
            >
              <IconHome className="text-white" size={20} />
              <span className="ml-2 text-sm font-bold text-white">Home</span>
              <IconChevronDown className="ml-2 text-white" size={16} />
            </button>
            
            {openDropdown === 'home' && (
              <div className="absolute right-0 mt-2 w-48 rounded-md bg-gray-900/90 backdrop-blur-sm shadow-lg py-1 z-50">
                <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-blue-600/80">Overview</a>
                <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-blue-600/80">Recent</a>
                <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-blue-600/80">Favorites</a>
              </div>
            )}
          </div>
          
          {/* Help Button with Dropdown */}
          <div className="relative">
            <button 
              className="flex items-center px-4 py-2 rounded-md bg-white/10 hover:bg-blue-600/80 transition-all duration-300 transform hover:scale-105"
              onClick={(e) => {
                e.stopPropagation();
                toggleDropdown('help');
              }}
            >
              <IconHelpCircle className="text-white" size={20} />
              <span className="ml-2 text-sm font-bold text-white">Help</span>
              <IconChevronDown className="ml-2 text-white" size={16} />
            </button>
            
            {openDropdown === 'help' && (
              <div className="absolute right-0 mt-2 w-48 rounded-md bg-gray-900/90 backdrop-blur-sm shadow-lg py-1 z-50">
                <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-blue-600/80">FAQ</a>
                <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-blue-600/80">Documentation</a>
                <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-blue-600/80">Contact Support</a>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main
        className="absolute top-0 left-0 w-screen h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/images/background.jpg')" }}
      >
        {/* Welcome Text Container */}
        <div className="absolute inset-x-0 top-1/4 -translate-y-16 flex flex-col items-center justify-center px-4 text-center">
          <div className="bg-black/50 backdrop-blur-md p-8 rounded-lg max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-4">
              Welcome
            </h1>
            <p className="text-lg text-gray-200 mb-6">
              Your central hub for the latest information about Toyotas fuel economy. Here you can access your profile, view analytics, and manage your settings.
            </p>
            <div className="space-y-3 text-gray-300">
              <p className="text-sm">
                🚀 <span className="font-semibold">Quick Access:</span> Use the menu buttons above to navigate through different sections
              </p>
              <p className="text-sm">
                💡 <span className="font-semibold">Need Help?</span> Click the Help button for documentation and support
              </p>
              <p className="text-sm">
                ⚡ <span className="font-semibold">Getting Started:</span> Check out our quick start guide in the Help section
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full bg-gray-800/90 py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-400">
            © 2024 Toyota Insights. All rights reserved.
          </p>
          <p className="text-sm text-gray-400">
            For inquiries, contact <a href="mailto:support@toyota.com" className="text-blue-400 hover:underline">support@toyota.com</a>.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
