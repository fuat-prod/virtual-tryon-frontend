import { useEffect, useState } from 'react';

export function usePaddle() {
  const [paddle, setPaddle] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initializePaddle = () => {
      if (window.Paddle) {
        try {
          window.Paddle.Initialize({
            token: import.meta.env.VITE_PADDLE_CLIENT_TOKEN,
            // environment parametresi KALDIRILDI - token ile otomatik tanınıyor
            eventCallback: (event) => {
              console.log('Paddle event:', event);
            }
          });
          
          setPaddle(window.Paddle);
          setIsReady(true);
          console.log('✅ Paddle initialized successfully');
        } catch (error) {
          console.error('❌ Paddle initialization error:', error);
        }
      }
    };

    // Wait for Paddle script to load
    if (window.Paddle) {
      initializePaddle();
    } else {
      const timer = setTimeout(initializePaddle, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const openCheckout = (priceId, customData = {}) => {
    if (!isReady || !paddle) {
      console.error('❌ Paddle not ready');
      alert('Payment system is not ready yet, please wait...');
      return;
    }

    console.log('🚀 Opening Paddle checkout:', priceId);

    try {
      paddle.Checkout.open({
        items: [{ priceId, quantity: 1 }],
        customData,
        settings: {
          displayMode: 'overlay',
          theme: 'light',
          locale: 'en'
        }
      });
    } catch (error) {
      console.error('❌ Checkout error:', error);
      alert('Failed to open checkout. Please try again.');
    }
  };

  return { paddle, isReady, openCheckout };
}