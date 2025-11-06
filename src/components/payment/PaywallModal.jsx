import { useState } from 'react';
import { X } from 'lucide-react';
import { PRICING_PLANS } from '../../config/pricing';
import { usePaddle } from '../../hooks/usePaddle'; 
import { useUser } from '../../contexts/UserContext'; 

export default function PaywallModal({ isOpen, onClose, reason = 'no_credits' }) {
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const { paddle, isReady, openCheckout } = usePaddle();
  const { user } = useUser();

  if (!isOpen) return null;

  const handlePurchase = (plan) => {
   console.log('Purchase clicked:', plan);
  
   // Paddle hazır mı kontrol et
   if (!isReady) {
     alert('Payment system is loading, please wait...');
     return;
   }

   // User var mı kontrol et
   if (!user) {
     alert('User not found, please refresh the page');
     return;
   }

   // Paddle Checkout'u aç
    openCheckout(plan.paddlePriceId, {
     userId: user.id,
     userEmail: user.email,
     planId: plan.id,
     credits: plan.credits
   });
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Header */}
        <div className="text-center px-8 pt-12 pb-8 bg-gradient-to-br from-purple-600 to-blue-600 text-white">
          <h2 className="text-4xl font-bold mb-3">
            {getTitle()}
          </h2>
          <p className="text-lg text-purple-100">
            {getSubtitle()}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRICING_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-xl border-2 p-6 transition-all cursor-pointer ${
                  selectedPlan === plan.id
                    ? 'border-purple-600 bg-purple-50 shadow-lg scale-105'
                    : 'border-gray-200 hover:border-purple-300 hover:shadow-md'
                } ${plan.popular ? 'ring-2 ring-purple-600 ring-offset-2' : ''}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold rounded-full">
                    {plan.badge}
                  </div>
                )}

                {/* Plan Name */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 mt-2">
                  {plan.name}
                </h3>

                {/* Price */}
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  {plan.period !== 'one-time' && (
                    <span className="text-gray-600 ml-2">
                      / {plan.period}
                    </span>
                  )}
                </div>

                {/* Credits */}
                <div className="mb-4 p-3 bg-purple-100 rounded-lg">
                  <div className="text-2xl font-bold text-purple-700">
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

                {/* Select Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePurchase(plan);
                  }}
                  className={`w-full py-3 rounded-lg font-semibold transition-all ${
                    selectedPlan === plan.id
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {selectedPlan === plan.id ? 'Selected ✓' : 'Select Plan'}
                </button>
              </div>
            ))}
          </div>

          {/* Purchase Button */}
          <div className="mt-8 text-center">
            <button
              onClick={() => {
                const plan = PRICING_PLANS.find(p => p.id === selectedPlan);
                handlePurchase(plan);
              }}
              className="px-12 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              Continue to Payment →
            </button>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-gray-500">
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
  );
}