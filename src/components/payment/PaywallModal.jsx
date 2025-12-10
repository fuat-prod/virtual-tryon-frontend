import { useState, useEffect, useRef } from 'react';
import { X, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PRICING_PLANS } from '../../config/pricing';
import { usePolar } from '../../hooks/usePolar';
import { useUser } from '../../contexts/UserContext';

export default function PaywallModal({ isOpen, onClose, reason = 'no_credits' }) {
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const { user, session, isAnonymous, isAuthenticated, refreshUser, refreshCredits, refreshing } = useUser(); // ✅ refreshCredits, refreshing ekle
  const { openCheckout, isLoading, error } = usePolar();
  const navigate = useNavigate();
  
  const pollIntervalRef = useRef(null); // ✅ YENİ: Polling interval ref
  const initialCreditsRef = useRef(null); // ✅ YENİ: Initial credits ref

  // ✅ YENİ: Cleanup - modal kapanınca polling durdur
  useEffect(() => {
    if (!isOpen) {
      stopCreditsPolling();
    }
    return () => {
      stopCreditsPolling();
    };
  }, [isOpen]);

  // ✅ YENİ: Initial credits kaydet
  useEffect(() => {
    if (isOpen && user) {
      initialCreditsRef.current = user.credits;
      console.log('💾 Initial credits saved:', user.credits);
    }
  }, [isOpen, user]);

 
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
        
        // ✅ YENİ: Polar iframe'i kapat
        if (window._closePolarCheckout) {
          console.log('🔄 Closing Polar checkout iframe...');
          window._closePolarCheckout();
        }
        
        setTimeout(() => {
          console.log('🎉 Closing modal after successful payment');
          onClose();
        }, 1500);
      }
    }

    if (pollCount >= maxPolls) {
      console.log('⏱️ Max polling reached, stopping...');
      stopCreditsPolling();
    }
  }, 3000);
};

  // ✅ YENİ: Polling durdur
  const stopCreditsPolling = () => {
    if (pollIntervalRef.current) {
      console.log('🛑 Stopping credits polling');
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
  };

  if (!isOpen) return null;

 // PaywallModal.jsx - handlePurchase

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
        
        // ✅ YENİ: closePolarIframe fonksiyonunu kaydet
        window._closePolarCheckout = result.closePolarIframe;
        
        if (result?.checkout?.addEventListener) {
          console.log('✅ Adding success event listener');
          result.checkout.addEventListener('success', async () => {
            console.log('🎉 Polar success event received!');
            stopCreditsPolling();
            await refreshCredits();
            
            // Checkout kapat
            if (result.closePolarIframe) {
              result.closePolarIframe();
            }
            
            setTimeout(() => onClose(), 1500);
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

  return (
    <>
      {/* Main Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
          
          {/* Close Button - iOS Optimized */}
          <button
            onClick={onClose}
            disabled={isLoading || refreshing}
            className="absolute top-4 right-4 z-10 p-3 rounded-full bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-colors touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          {/* Header */}
          <div className="text-center px-6 sm:px-8 pt-12 pb-8 bg-gradient-to-br from-purple-600 to-blue-600 text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              {getTitle()}
            </h2>
            <p className="text-base sm:text-lg text-purple-100">
              {getSubtitle()}
            </p>
            
            {/* Anonymous User Notice */}
            {isAnonymous && (
              <div className="mt-4 inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg">
                <p className="text-sm text-white">
                  💡 You'll create an account during checkout
                </p>
              </div>
            )}

            {/* ✅ YENİ: Refreshing Credits Indicator */}
            {refreshing && (
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white/30 backdrop-blur-sm rounded-lg">
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <p className="text-sm text-white font-medium">
                  Updating your credits...
                </p>
              </div>
            )}
          </div>

          {/* Pricing Cards */}
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
                  {/* Badge */}
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold rounded-full">
                      {plan.badge}
                    </div>
                  )}

                  {/* Plan Name */}
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 mt-2">
                    {plan.name}
                  </h3>

                  {/* Price */}
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

                  {/* Credits */}
                  <div className="mb-4 p-3 bg-purple-100 rounded-lg">
                    <div className="text-xl sm:text-2xl font-bold text-purple-700">
                      {plan.credits} Credits
                    </div>
                    <div className="text-xs text-purple-600">
                      {plan.credits} AI Try-Ons
                    </div>
                  </div>

                  {/* Features */}
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

                  {/* Select Button - iOS Optimized */}
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

            {/* Purchase Button - iOS Optimized */}
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
                  isAnonymous ? 'Create Account & Continue →' : 'Continue to Payment →'
                )}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-4 sm:mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm sm:text-base text-red-600 text-center">
                  ❌ {error}
                </p>
              </div>
            )}

            {/* Trust Badges */}
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

      {/* Loading Overlay - Mobile Optimized */}
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