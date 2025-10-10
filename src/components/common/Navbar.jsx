import { useState } from 'react';
import Logo from './Logo';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-md border-b border-violet-500/20">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo - mobile'de küçük */}
          <div className="flex items-center">
            <Logo size="small" type="text" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button className="flex items-center space-x-2 text-white hover:text-violet-400 transition-colors">
              <span>✨</span>
              <span>AI Dress Up</span>
            </button>
            
            <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
              <span>🖼️</span>
              <span>My Gallery</span>
            </button>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <button className="hidden md:flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
              <span>🌐</span>
              <span>ENGLISH</span>
            </button>
            
            {/* Mobile-optimized sign in button */}
            <button className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-4 md:px-6 py-1.5 md:py-2 rounded-full text-sm md:text-base font-medium hover:opacity-90 transition-opacity">
              Sign In
            </button>

            {/* Mobile menu button - büyük touch target */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white p-2 -mr-1 rounded-lg touch-manipulation"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu - full screen overlay */}
        {isMenuOpen && (
          <div className="md:hidden">
            {/* Dark overlay */}
            <div 
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Menu content */}
            <div className="fixed inset-x-0 top-14 bg-gray-900 border-t border-violet-500/20 z-50">
              <div className="p-4 space-y-2">
                <button className="w-full flex items-center space-x-3 text-white px-4 py-3 bg-gray-800/50 rounded-xl">
                  <span className="text-xl">✨</span>
                  <span className="text-lg">AI Dress Up</span>
                </button>
                <button className="w-full flex items-center space-x-3 text-gray-300 px-4 py-3 hover:bg-gray-800/50 rounded-xl">
                  <span className="text-xl">🖼️</span>
                  <span className="text-lg">My Gallery</span>
                </button>
                <button className="w-full flex items-center space-x-3 text-gray-300 px-4 py-3 hover:bg-gray-800/50 rounded-xl">
                  <span className="text-xl">🌐</span>
                  <span className="text-lg">ENGLISH</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
