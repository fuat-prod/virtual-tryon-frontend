import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Sparkles, CreditCard } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, hasFreeTrial, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  const handleProfileClick = () => {
    setIsMobileMenuOpen(false);
    navigate('/profile');
  };

  const handleSignInClick = () => {
    setIsMobileMenuOpen(false);
    navigate('/signin');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              DressAI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to="/try-on"
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
            >
              Try On
            </Link>
            <Link
              to="/pricing"
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
            >
              Pricing
            </Link>
          </nav>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Credits Display */}
            {user && (user.credits > 0 || hasFreeTrial) && (
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${
                user.credits > 0 
                  ? 'bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200' 
                  : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'
              }`}>
                <Sparkles className={`w-4 h-4 ${
                  user.credits > 0 ? 'text-purple-500' : 'text-green-500'
                }`} />
                <span className="text-sm font-semibold text-gray-800">
                  {user.credits > 0 ? (
                    <>{user.credits} Credit{user.credits !== 1 ? 's' : ''}</>
                  ) : (
                    <>1 Free Trial</>
                  )}
                </span>
              </div>
            )}

            {/* Profile / Sign In */}
            {isAuthenticated ? (
              <div className="relative group">
                <button
                  onClick={handleProfileClick}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  <User className="w-4 h-4" />
                  <span className="font-medium">Profile</span>
                </button>
              </div>
            ) : (
              <button
                onClick={handleSignInClick}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all font-medium"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Mobile Credits */}
            {user && (user.credits > 0 || hasFreeTrial) && (
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border ${
                user.credits > 0 
                  ? 'bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200' 
                  : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'
              }`}>
                <Sparkles className={`w-3.5 h-3.5 ${
                  user.credits > 0 ? 'text-purple-500' : 'text-green-500'
                }`} />
                <span className="text-xs font-semibold text-gray-800">
                  {user.credits > 0 ? (
                    <>{user.credits}</>
                  ) : (
                    <>1</>
                  )}
                </span>
              </div>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors px-4 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/try-on"
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors px-4 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Try On
              </Link>
              <Link
                to="/pricing"
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors px-4 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>

              <div className="border-t border-gray-200 pt-4">
                {isAuthenticated ? (
                  <>
                    <button
                      onClick={handleProfileClick}
                      className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors"
                    >
                      <User className="w-4 h-4" />
                      <span className="font-medium">My Profile</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="font-medium">Logout</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleSignInClick}
                    className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all font-medium"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}