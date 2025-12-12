import { useState, useEffect, useRef } from 'react';
import { X, Loader2, Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PRICING_PLANS } from '../../config/pricing';
import { usePolar } from '../../hooks/usePolar';
import { useUser } from '../../contexts/UserContext';

export default function PaywallModal({ isOpen, onClose, reason = 'no_credits' }) {
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  
  // ✅ Soft prompt states
  const [showSoftPrompt, setShowSoftPrompt] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSavingAccount, setIsSavingAccount] = useState(false);
  const [saveAccountError, setSaveAccountError] = useState(null);
  
  const { user, session, isAnonymous, isAuthenticated, refreshUser, refreshCredits, refreshing } = useUser();
  const { openCheckout, isLoading, error } = usePolar();
  const navigate = useNavigate();
  
  const pollIntervalRef = useRef(null);
  const initialCreditsRef = useRef(null);
  
  const API_URL = import.meta.env.VITE_API_URL;

  // ✅ Global cleanup function
  useEffect(() => {
    window._cleanupPolarCheckout = () => {
      console.log('🧹 Global cleanup called');
      
      const selectors = [
        'iframe[src*="polar"]',
        'iframe[src*="stripe"]',
        '[id*="polar"]',
        '[class*="polar"]',
        'div[style*="z-index: 2147483647"]',
        'div[style*="position: fixed"][style*="z-index"]'
      ];
      
      selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
          if (!el.closest('#root')) {
            el.remove();
          }
        });
      });
      
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
      
      console.log('✅ Global cleanup done');
    };
    
    return () => {
      delete window._cleanupPolarCheckout;
    };
  }, []);

  // ✅ Cleanup on modal close
  useEffect(() => {
    if (!isOpen) {
      stopCreditsPolling();
      setShowSoftPrompt(false);
      setEmail('');
      setPassword('');
      setSaveAccountError(null);
      
      setTimeout(() => {
        if (window._closePolarCheckout) {
          window._closePolarCheckout();
        }
        if (window._cleanupPolarCheckout) {
          window._cleanupPolarCheckout();
        }
      }, 500);
    }
    return () => {
      stopCreditsPolling();
    };
  }, [isOpen]);

  // ✅ Initial credits kaydet
  useEffect(() => {
    if (isOpen && user) {
      initialCreditsRef.current = user.credits;
      console.log('💾 Initial credits saved:', user.credits);
    }
  }, [isOpen, user]);

 // ✅ FIX: Credits polling'de TRIPLE CHECK
const startCreditsPolling = () => {
  console.log('🔄 Starting credits polling...');
  
  let pollCount = 0;
  const maxPolls = 20;

  pollIntervalRef.current = setInterval(async () => {
    pollCount++;
    console.log(`📊 Polling credits... (${pollCount}/${maxPolls})`);

    const result = await refreshCredits();

    if (result.success && result.credits !== null) {
      if (result.credits > initialCreditsRef.current) {
        console.log('✅ Credits updated detected!');
        console.log(`   ${initialCreditsRef.current} → ${result.credits}`);
        
        stopCreditsPolling();
        
        // ✅ AGGRESSIVE POLAR CLEANUP
        console.log('🧹 Cleaning up Polar checkout...');
        
        if (window._closePolarCheckout) {
          window._closePolarCheckout();
        }
        
        if (window._cleanupPolarCheckout) {
          window._cleanupPolarCheckout();
        }
        
        setTimeout(() => {
          if (window._cleanupPolarCheckout) {
            console.log('🧹 Force cleanup (delayed)');
            window._cleanupPolarCheckout();
          }
        }, 500);
        
        // ✅ FIX: TRIPLE CHECK - 3 kez API call yap
        console.log('🔄 Triple-checking user state...');
        
        let finalUser = result.user;
        
        // API Call #1
        try {
          console.log('🔄 API Check #1...');
          const check1 = await fetch(`${API_URL}/api/auth/user/${user.id}`);
          const data1 = await check1.json();
          if (data1.success && data1.user) {
            finalUser = data1.user;
            console.log('✅ Check #1:', {
              email: data1.user.email,
              isAnonymous: data1.user.is_anonymous,
              credits: data1.user.credits
            });
          }
        } catch (error) {
          console.error('⚠️ Check #1 failed:', error);
        }
        
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // API Call #2
        try {
          console.log('🔄 API Check #2...');
          const check2 = await fetch(`${API_URL}/api/auth/user/${user.id}`);
          const data2 = await check2.json();
          if (data2.success && data2.user) {
            finalUser = data2.user;
            console.log('✅ Check #2:', {
              email: data2.user.email,
              isAnonymous: data2.user.is_anonymous,
              credits: data2.user.credits
            });
          }
        } catch (error) {
          console.error('⚠️ Check #2 failed:', error);
        }
        
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // API Call #3
        try {
          console.log('🔄 API Check #3...');
          const check3 = await fetch(`${API_URL}/api/auth/user/${user.id}`);
          const data3 = await check3.json();
          if (data3.success && data3.user) {
            finalUser = data3.user;
            console.log('✅ Check #3:', {
              email: data3.user.email,
              isAnonymous: data3.user.is_anonymous,
              credits: data3.user.credits
            });
          }
        } catch (error) {
          console.error('⚠️ Check #3 failed:', error);
        }
        
        // ✅ FIX: Force UserContext update
        console.log('🔄 Force updating UserContext...');
        await refreshUser();
        await new Promise(resolve => setTimeout(resolve, 800));
        
        await refreshUser(); // ✅ 2. kez
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // ✅ KARAR: Final user data'ya göre
        const isStillAnonymous = finalUser?.is_anonymous ?? true;
        
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('🎯 FINAL DECISION:');
        console.log('   Email:', finalUser?.email);
        console.log('   Is Anonymous:', isStillAnonymous);
        console.log('   Credits:', finalUser?.credits);
        console.log('   Action:', isStillAnonymous ? 'Show soft prompt' : 'Close modal');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        
        setTimeout(() => {
          if (isStillAnonymous) {
            console.log('💡 Showing soft prompt');
            setShowSoftPrompt(true);
          } else {
            console.log('🎉 User authenticated, closing modal');
            handleModalClose();
          }
        }, 500);
      }
    }

    if (pollCount >= maxPolls) {
      console.log('⏱️ Max polling reached, stopping...');
      stopCreditsPolling();
    }
  }, 3000);
};

  // ✅ Polling durdur
  const stopCreditsPolling = () => {
    if (pollIntervalRef.current) {
      console.log('🛑 Stopping credits polling');
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
  };

  // ✅ Modal close handler
  const handleModalClose = async () => {
    console.log('🔒 Closing PaywallModal...');
    
    console.log('🧹 Final cleanup...');
    
    if (window._closePolarCheckout) {
      window._closePolarCheckout();
    }
    
    if (window._cleanupPolarCheckout) {
      window._cleanupPolarCheckout();
    }
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    await refreshUser();
    await refreshCredits();
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    console.log('✅ Modal closed, user data refreshed');
    onClose();
  };

  // ✅ Save account handler
  const handleSaveAccount = async () => {
    if (!email || !email.includes('@')) {
      setSaveAccountError('Please enter a valid email');
      return;
    }

    if (password && password.length < 6) {
      setSaveAccountError('Password must be at least 6 characters');
      return;
    }

    setIsSavingAccount(true);
    setSaveAccountError(null);

    try {
      console.log('💾 Saving account...');
      console.log('   Email:', email);
      console.log('   Password:', password ? 'Provided' : 'Not provided (passwordless)');

      const response = await fetch(`${API_URL}/api/auth/save-account`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password: password || null,
          anonymousUserId: user.id
        })
      });

      const data = await response.json();

      if (data.success) {
        console.log('✅ Account saved successfully');
        console.log('   Has password:', data.hasPassword ? 'Yes' : 'No');
        
        console.log('🔄 Refreshing user data...');
        await refreshUser();
        await new Promise(resolve => setTimeout(resolve, 500));
        await refreshCredits();
        
        console.log('✅ User data refreshed');
        
        setTimeout(() => {
          setShowSoftPrompt(false);
          handleModalClose();
        }, 1000);
      } else {
        setSaveAccountError(data.error || 'Failed to save account');
      }
    } catch (error) {
      console.error('Save account error:', error);
      setSaveAccountError('Something went wrong. Please try again.');
    } finally {
      setIsSavingAccount(false);
    }
  };

  // ✅ Handle purchase
  const handlePurchase = (plan) => {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('💳 PURCHASE HANDLER CALLED');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    if (!user || !user.id) {
      console.error('❌ No user ID found');
      alert('Error: User session not found. Please refresh the page.');
      return;
    }

    console.log('✅ Proceeding with payment');
    console.log('   User ID:', user.id);
    console.log('   Anonymous:', isAnonymous);

    const checkoutPromise = openCheckout(
      plan.polarProductId,
      {
        id: plan.id,
        name: plan.name,
        price: plan.price,
        credits: plan.credits
      },
      user.id
    );

    console.log('🔄 Starting background credits polling immediately...');
    startCreditsPolling();

    if (checkoutPromise && typeof checkoutPromise.then === 'function') {
      checkoutPromise
        .then(result => {
          console.log('📦 Checkout result (async):', result);
          
          window._closePolarCheckout = result.closePolarIframe;
          
          if (result?.checkout?.addEventListener) {
            console.log('✅ Adding success event listener');
            result.checkout.addEventListener('success', async () => {
              console.log('🎉 Polar success event received!');
              stopCreditsPolling();
              await refreshCredits();
              
              if (result.closePolarIframe) {
                result.closePolarIframe();
              }
              
              setTimeout(() => handleModalClose(), 1500);
            });
          }
        })
        .catch(err => {
          console.error('❌ Checkout error (async):', err);
        });
    }
  };

  const getTitle = () => {
    switch (reason) {
      case 'no_credits':
        return '⚠️ No Credits Remaining';
      case 'trial_exhausted':
        return '🎉 Free Trial Used!';
      default:
        return '💎 Upgrade Your Experience';
    }
  };

  const getSubtitle = () => {
    switch (reason) {
      case 'no_credits':
        return 'Purchase credits to continue creating amazing looks';
      case 'trial_exhausted':
        return 'Your free trial is complete. Choose a plan to continue!';
      default:
        return 'Unlock unlimited AI-powered virtual try-ons';
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* ✅ Soft Prompt Modal */}
      {showSoftPrompt && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
            
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
              🎉 Credits Added!
            </h3>
            
            <p className="text-gray-600 text-center mb-6">
              Secure your account (optional)
            </p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setSaveAccountError(null);
                  }}
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  disabled={isSavingAccount}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password (optional)
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setSaveAccountError(null);
                  }}
                  placeholder="Set a password (optional)"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  disabled={isSavingAccount}
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                💡 No password? You can set it later from your profile
              </p>
            </div>

            {saveAccountError && (
              <p className="mb-4 text-sm text-red-600">
                {saveAccountError}
              </p>
            )}

            <button
              onClick={handleSaveAccount}
              disabled={isSavingAccount || !email}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold mb-3 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSavingAccount ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Saving...
                </span>
              ) : (
                password ? 'Save Account with Password' : 'Save Email Only'
              )}
            </button>

            <button
              onClick={async () => {
                console.log('⏭️ User clicked "Maybe later"');
                
                console.log('🔄 Final refresh before closing...');
                await refreshUser();
                await refreshCredits();
                await new Promise(resolve => setTimeout(resolve, 300));
                
                setShowSoftPrompt(false);
                handleModalClose();
              }}
              disabled={isSavingAccount}
              className="w-full text-gray-600 hover:text-gray-900 py-2 text-sm font-medium transition-colors disabled:opacity-50"
            >
              Maybe later
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              {password 
                ? 'Create account with password for easy login' 
                : 'Skip password - you can set it later from profile'}
            </p>
          </div>
        </div>
      )}

      {/* Main Paywall Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
          
          <button
            onClick={handleModalClose}
            disabled={isLoading || refreshing}
            className="absolute top-4 right-4 z-10 p-3 rounded-full bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-colors touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          <div className="text-center px-6 sm:px-8 pt-12 pb-8 bg-gradient-to-br from-purple-600 to-blue-600 text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              {getTitle()}
            </h2>
            <p className="text-base sm:text-lg text-purple-100">
              {getSubtitle()}
            </p>
            
            {isAnonymous && (
              <div className="mt-4 inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg">
                <p className="text-sm text-white">
                  💡 Optional: Set password after payment
                </p>
              </div>
            )}

            {refreshing && (
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white/30 backdrop-blur-sm rounded-lg">
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <p className="text-sm text-white font-medium">
                  Updating your credits...
                </p>
              </div>
            )}
          </div>

          <div className="p-4 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {PRICING_PLANS.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative rounded-xl border-2 p-4 sm:p-6 transition-all cursor-pointer touch-manipulation ${
                    selectedPlan === plan.id
                      ? 'border-purple-600 bg-purple-50 shadow-lg scale-[1.02]'
                      : 'border-gray-200 hover:border-purple-300 hover:shadow-md active:scale-[0.98]'
                  } ${plan.popular ? 'ring-2 ring-purple-600 ring-offset-2' : ''}`}
                  onClick={() => !isLoading && !refreshing && setSelectedPlan(plan.id)}
                >
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold rounded-full">
                      {plan.badge}
                    </div>
                  )}

                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 mt-2">
                    {plan.name}
                  </h3>

                  <div className="mb-4">
                    <span className="text-3xl sm:text-4xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    {plan.period !== 'one-time' && (
                      <span className="text-sm sm:text-base text-gray-600 ml-2">
                        / {plan.period}
                      </span>
                    )}
                  </div>

                  <div className="mb-4 p-3 bg-purple-100 rounded-lg">
                    <div className="text-xl sm:text-2xl font-bold text-purple-700">
                      {plan.credits} Credits
                    </div>
                    <div className="text-xs text-purple-600">
                      {plan.credits} AI Try-Ons
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-600">
                        <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePurchase(plan);
                    }}
                    disabled={isLoading || refreshing}
                    className={`w-full py-4 rounded-lg font-semibold transition-all touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed ${
                      selectedPlan === plan.id
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg active:scale-95'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300'
                    }`}
                  >
                    {selectedPlan === plan.id ? 'Selected ✓' : 'Select Plan'}
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 sm:mt-8 text-center">
              <button
                onClick={() => {
                  const plan = PRICING_PLANS.find(p => p.id === selectedPlan);
                  handlePurchase(plan);
                }}
                disabled={isLoading || refreshing}
                className="px-8 sm:px-12 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-base sm:text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 mr-2 animate-spin" />
                    Opening checkout...
                  </span>
                ) : refreshing ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 mr-2 animate-spin" />
                    Updating credits...
                  </span>
                ) : (
                  'Continue to Payment →'
                )}
              </button>
            </div>

            {error && (
              <div className="mt-4 sm:mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm sm:text-base text-red-600 text-center">
                  ❌ {error}
                </p>
              </div>
            )}

            <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Secure Payment
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                SSL Encrypted
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Instant Activation
              </div>
            </div>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 sm:p-8 text-center max-w-sm mx-4 shadow-2xl">
            <Loader2 className="w-12 h-12 sm:w-16 sm:h-16 text-purple-600 animate-spin mx-auto mb-4" />
            <p className="text-base sm:text-lg text-gray-700 font-medium mb-2">
              Opening secure checkout...
            </p>
            <p className="text-sm sm:text-base text-gray-500">
              Please wait a moment
            </p>
          </div>
        </div>
      )}
    </>
  );
}