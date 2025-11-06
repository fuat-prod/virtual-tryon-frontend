import { useEffect, useState } from 'react';

export function usePaddle() {
  const [paddle, setPaddle] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initializePaddle = () => {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('🔧 PADDLE INITIALIZATION START');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

      if (!window.Paddle) {
        console.error('❌ window.Paddle not found');
        return;
      }

      console.log('✅ window.Paddle found');

      try {
        // Environment variable kontrol
        const clientToken = import.meta.env.VITE_PADDLE_CLIENT_TOKEN;
        console.log('🔑 Client token exists?', !!clientToken);
        console.log('🔑 Client token starts with:', clientToken?.substring(0, 10) + '...');
        
        if (!clientToken) {
          console.error('❌ VITE_PADDLE_CLIENT_TOKEN not found in environment');
          return;
        }

        // Sandbox mode ayarla
        console.log('🏖️ Setting environment to sandbox...');
        window.Paddle.Environment.set('sandbox');
        console.log('✅ Environment set to sandbox');
        
        // Paddle Setup
        console.log('🚀 Calling Paddle.Setup...');
        window.Paddle.Setup({
          token: clientToken,
          eventCallback: (event) => {
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log('🎯 PADDLE EVENT:', event.name);
            console.log('Event data:', event);
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            
            switch (event.name) {
              case 'checkout.completed':
                console.log('✅ PAYMENT SUCCESSFUL! Reloading page...');
                setTimeout(() => {
                  window.location.reload();
                }, 2000);
                break;
              
              case 'checkout.closed':
                console.log('❌ Checkout closed by user');
                break;
              
              case 'checkout.loaded':
                console.log('📦 Checkout loaded successfully');
                break;
              
              case 'checkout.error':
                console.error('❌ Checkout error:', event.data);
                break;
              
              default:
                console.log('📌 Other event:', event.name);
            }
          }
        });
        
        setPaddle(window.Paddle);
        setIsReady(true);
        
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('✅ PADDLE INITIALIZED SUCCESSFULLY');
        console.log('Environment: sandbox');
        console.log('Ready to checkout: true');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      } catch (error) {
        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.error('❌ PADDLE INITIALIZATION FAILED');
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        console.error('Full error:', error);
        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      }
    };

    // Wait for Paddle script to load
    if (window.Paddle) {
      initializePaddle();
    } else {
      console.log('⏳ Waiting for Paddle.js to load...');
      const timer = setTimeout(() => {
        console.log('⏰ Timer triggered, attempting initialization...');
        initializePaddle();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const openCheckout = (priceId, customData = {}) => {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🛒 OPEN CHECKOUT CALLED');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    // Ready kontrol
    console.log('✓ Paddle ready?', isReady);
    console.log('✓ Paddle instance?', !!paddle);
    
    if (!isReady || !paddle) {
      console.error('❌ Paddle not ready');
      console.error('isReady:', isReady);
      console.error('paddle:', paddle);
      alert('Payment system is not ready yet, please wait...');
      return;
    }

    // Input validation
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📋 INPUT VALIDATION:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Price ID:', priceId);
    console.log('Price ID type:', typeof priceId);
    console.log('Price ID length:', priceId?.length);
    console.log('Price ID starts with:', priceId?.substring(0, 10));
    console.log('Custom data:', customData);
    console.log('User email:', customData.userEmail);
    console.log('User email exists?', !!customData.userEmail);
    console.log('User ID:', customData.userId);
    console.log('Plan ID:', customData.planId);
    console.log('Credits:', customData.credits);

    try {
      // Checkout config oluştur
      const checkoutConfig = {
        items: [
          { 
            priceId: priceId, 
            quantity: 1 
          }
        ],
        customer: customData.userEmail ? {
          email: customData.userEmail
        } : undefined,
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
      };

      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('📦 CHECKOUT CONFIG:');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(JSON.stringify(checkoutConfig, null, 2));
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

      console.log('🚀 Calling paddle.Checkout.open()...');
      paddle.Checkout.open(checkoutConfig);
      console.log('✅ Checkout.open() called successfully');
      
    } catch (error) {
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.error('❌ CHECKOUT OPEN FAILED');
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      console.error('Full error:', error);
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      
      alert('Failed to open checkout. Please check console for details.');
    }
  };

  return { paddle, isReady, openCheckout };
}