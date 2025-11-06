import { useEffect, useState } from 'react';

export function usePaddle() {
  const [paddle, setPaddle] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initializePaddle = () => {
      if (window.Paddle) {
        try {
          // ÖNCE sandbox mode'u ayarla
          window.Paddle.Environment.set('sandbox');
          
          // SONRA Setup ile initialize et
          window.Paddle.Setup({
            token: import.meta.env.VITE_PADDLE_CLIENT_TOKEN,
            eventCallback: (event) => {
              console.log('🎯 Paddle event:', event);
              
              // Checkout tamamlandığında
              if (event.name === 'checkout.completed') {
                console.log('✅ Payment successful! Reloading...');
                setTimeout(() => {
                  window.location.reload(); // Credits güncellensin
                }, 2000);
              }
              
              // Checkout kapatıldığında
              if (event.name === 'checkout.closed') {
                console.log('❌ Checkout closed by user');
              }
            }
          });
          
          setPaddle(window.Paddle);
          setIsReady(true);
          console.log('✅ Paddle initialized successfully (sandbox mode)');
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

    console.log('🚀 Opening Paddle checkout:', { priceId, customData });

    try {
      paddle.Checkout.open({
        items: [
          { 
            priceId, 
            quantity: 1 
          }
        ],
        // Customer email (webhook için gerekli!)
        customer: customData.userEmail ? {
          email: customData.userEmail
        } : undefined,
        // Custom data (backend'e gönderilecek)
        customData: {
          userId: customData.userId || 'anonymous',
          planId: customData.planId || '',
          credits: customData.credits || 0
        },
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