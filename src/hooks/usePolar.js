import { useState } from 'react';
import { PolarEmbedCheckout } from '@polar-sh/checkout/embed';

export function usePolar() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const openCheckout = async (productId, planDetails, userId) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('💳 OPENING POLAR CHECKOUT');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/payment/create-checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, productId, planDetails })
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Checkout creation failed');
      }

      console.log('✅ Checkout session created');
      console.log('   Checkout URL:', data.checkoutUrl);

      const isMobile = window.innerWidth < 768;
      console.log('📱 Device:', isMobile ? 'Mobile' : 'Desktop');

      // ✅ DÜZELTME: Cleanup function
      const unlockScroll = () => {
        if (isMobile) {
          document.body.style.overflow = '';
          document.body.style.position = '';
          document.body.style.width = '';
          document.body.style.height = '';
          console.log('🔓 Mobile scroll unlocked');
        }
      };

      // Mobile scroll lock
      if (isMobile) {
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.height = '100%';
        console.log('🔒 Mobile scroll locked');
      }

      // ✅ DÜZELTME: Checkout create with config
      const checkout = await PolarEmbedCheckout.create(data.checkoutUrl, {
        theme: 'light'
      });

      console.log('✅ Embedded checkout opened');
      console.log('   Checkout object:', checkout);
      console.log('   Available methods:', Object.keys(checkout));

      // ✅ TÜM EVENT TİPLERİNİ DENE
      
      // Try 1: addEventListener
      if (typeof checkout.addEventListener === 'function') {
        console.log('✅ Using addEventListener');
        
        checkout.addEventListener('success', (event) => {
          console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
          console.log('🎉 PAYMENT SUCCESSFUL! (addEventListener)');
          console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
          console.log('Event:', event);
          
          setTimeout(() => {
            console.log('✅ Closing checkout after success...');
            unlockScroll();
            
            if (typeof checkout.close === 'function') {
              checkout.close();
              console.log('✅ Checkout closed');
            }
            
            setIsLoading(false);
          }, 1500);
        });

        checkout.addEventListener('close', () => {
          console.log('🔒 Checkout closed by user (addEventListener)');
          unlockScroll();
          setIsLoading(false);
        });
      }
      
      // Try 2: on() method
      else if (typeof checkout.on === 'function') {
        console.log('✅ Using on() method');
        
        checkout.on('success', (event) => {
          console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
          console.log('🎉 PAYMENT SUCCESSFUL! (on)');
          console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
          
          setTimeout(() => {
            unlockScroll();
            if (typeof checkout.close === 'function') {
              checkout.close();
            }
            setIsLoading(false);
          }, 1500);
        });

        checkout.on('close', () => {
          console.log('🔒 Checkout closed by user (on)');
          unlockScroll();
          setIsLoading(false);
        });
      }
      
      else {
        console.warn('⚠️ No event listener method found on checkout');
        console.warn('   Available methods:', Object.keys(checkout));
      }

      // ✅ Debug için global'e kaydet
      window._polarCheckout = checkout;
      console.log('💡 Checkout saved to window._polarCheckout for debugging');

      return { success: true, checkout };

    } catch (err) {
      console.error('❌ Checkout error:', err);
      setError(err.message);
      setIsLoading(false);
      return { success: false, error: err.message };
    }
  };

  return {
    openCheckout,
    isLoading,
    error
  };
}