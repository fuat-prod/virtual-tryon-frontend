import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, CreditCard } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import Logo from './Logo';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsMenuOpen(false);
    await logout();
    navigate('/');
  };

  const handleProfileClick = () => {
    setIsMenuOpen(false);
    navigate('/profile');
  };

  const handleLoginClick = () => {
    setIsMenuOpen(false);
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-md border-b border-violet-500/20">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo size="small" type="text" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/"
              className="flex items-center space-x-2 text-white hover:text-violet-400 transition-colors"
            >
              <span>✨</span>
              <span>AI Dress Up</span>
            </Link>
            
            {/* Profile Link - Desktop (Authenticated Only) */}
            {isAuthenticated && (
              <Link 
                to="/profile"
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
              >
                <User className="w-4 h-4" />
                <span>My Profile</span>
              </Link>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2 md:space-x-4">
            
            {/* Credits Display */}
            {user && (
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 rounded-full backdrop-blur-sm">
                <CreditCard className="w-4 h-4 text-violet-400" />
                <span className="text-sm font-semibold text-white">
                  {user.credits}
                </span>
              </div>
            )}

            {/* Login/Logout Button - Desktop */}
            {isAuthenticated ? (
              <button 
                onClick={handleLogout}
                className="hidden md:flex items-center space-x-2 text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-gray-800/50"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            ) : (
              <Link 
                to="/login"
                className="hidden md:block bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-6 py-2 rounded-full text-base font-medium hover:opacity-90 transition-opacity"
              >
                Sign In
              </Link>
            )}

            {/* Mobile: Sign In/Profile Button */}
            {isAuthenticated ? (
              <button 
                onClick={handleProfileClick}
                className="md:hidden bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity flex items-center space-x-2"
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </button>
            ) : (
              <Link 
                to="/login"
                className="md:hidden bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Sign In
              </Link>
            )}

            {/* Mobile menu button */}
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

        {/* Mobile Menu */}
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
                {/* AI Dress Up */}
                <Link 
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full flex items-center space-x-3 text-white px-4 py-3 bg-gray-800/50 rounded-xl"
                >
                  <span className="text-xl">✨</span>
                  <span className="text-lg">AI Dress Up</span>
                </Link>
                
                {/* My Profile - Mobile (Authenticated Only) */}
                {isAuthenticated && (
                  <button 
                    onClick={handleProfileClick}
                    className="w-full flex items-center space-x-3 text-gray-300 px-4 py-3 hover:bg-gray-800/50 rounded-xl"
                  >
                    <User className="w-5 h-5" />
                    <span className="text-lg">My Profile</span>
                  </button>
                )}

                {/* Credits Display - Mobile */}
                {user && (
                  <div className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-5 h-5 text-violet-400" />
                      <span className="text-lg text-white">Credits</span>
                    </div>
                    <span className="text-xl font-bold text-white">{user.credits}</span>
                  </div>
                )}

                {/* Logout - Mobile (Authenticated Only) */}
                {isAuthenticated && (
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 text-red-400 px-4 py-3 hover:bg-gray-800/50 rounded-xl"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="text-lg">Logout</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;