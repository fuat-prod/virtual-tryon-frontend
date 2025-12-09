import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Loader2 } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { refreshUser } = useUser();
  const [countdown, setCountdown] = useState(3);
  
  const checkoutId = searchParams.get('checkout_id');

  useEffect(() => {
    // User bilgisini yenile (credits güncellenmiş olacak)
    refreshUser();
    
    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate, refreshUser]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 
                    flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl 
                      p-6 sm:p-8 text-center">
        
        {/* Success Icon - Touch-friendly size */}
        <div className="inline-flex items-center justify-center 
                        w-16 h-16 sm:w-20 sm:h-20 
                        bg-green-100 rounded-full mb-4 sm:mb-6">
          <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-green-600" />
        </div>
        
        {/* Title - Mobile-first text size */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
          Payment Successful! 🎉
        </h1>
        
        {/* Description - 16px+ for iOS */}
        <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">
          Your credits have been added to your account.
        </p>
        
        {/* Countdown */}
        <div className="mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center 
                          w-12 h-12 sm:w-14 sm:h-14 
                          bg-purple-100 rounded-full mb-3">
            <span className="text-xl sm:text-2xl font-bold text-purple-600">
              {countdown}
            </span>
          </div>
          <p className="text-sm sm:text-base text-gray-500">
            Redirecting to homepage...
          </p>
        </div>
        
        {/* Manual Navigation Button - 56px+ touch target */}
        <button
          onClick={() => navigate('/')}
          className="w-full py-4 px-6 bg-gradient-to-r from-green-600 to-blue-600 
                     text-white text-base sm:text-lg font-semibold rounded-lg 
                     shadow-lg hover:shadow-xl active:scale-95 
                     transition-all touch-manipulation"
        >
          Continue Now
        </button>
        
        {/* Checkout ID - Small text */}
        {checkoutId && (
          <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-400">
            Checkout ID: {checkoutId.substring(0, 20)}...
          </p>
        )}
      </div>
    </div>
  );
}