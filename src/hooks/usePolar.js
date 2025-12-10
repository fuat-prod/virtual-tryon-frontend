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
      console.log('Product ID:', productId);
      console.log('Plan:', planDetails);
      console.log('User ID:', userId);

      // Backend'den checkout session al
      console.log('📤 Fetching checkout session from backend...');
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/payment/create-checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, productId, planDetails })
      });

      console.log('📥 Backend response received:', response.status);

      const data = await response.json();
      console.log('📦 Parsed data:', data);

      if (!data.success) {
        throw new Error(data.error || 'Checkout creation failed');
      }

      console.log('✅ Checkout session created');
      console.log('   Checkout URL:', data.checkoutUrl);

      const isMobile = window.innerWidth < 768;
      console.log('📱 Device:', isMobile ? 'Mobile' : 'Desktop');

      // ✅ CRITICAL DEBUG: create() öncesi
      console.log('🔄 Calling PolarEmbedCheckout.create()...');
      console.log('   URL:', data.checkoutUrl);
      console.log('   Theme: light');
      
      // ✅ Timeout ekle (10 saniye)
      const createWithTimeout = Promise.race([
        PolarEmbedCheckout.create(data.checkoutUrl, { theme: 'light' }),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Checkout creation timeout (10s)')), 10000)
        )
      ]);

      const checkout = await createWithTimeout;

      // ✅ CRITICAL DEBUG: create() sonrası
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('✅ EMBEDDED CHECKOUT OPENED!');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('Checkout object:', checkout);
      console.log('Checkout type:', typeof checkout);
      console.log('Checkout keys:', Object.keys(checkout));
      console.log('Has addEventListener:', typeof checkout.addEventListener);
      console.log('Has on:', typeof checkout.on);
      console.log('Has close:', typeof checkout.close);

      // Mobile scroll lock
      if (isMobile) {
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.height = '100%';
        console.log('🔒 Mobile scroll locked');
      }

      // Event listeners
      console.log('🎯 Attempting to add event listeners...');

      if (typeof checkout.addEventListener === 'function') {
        console.log('✅ Using addEventListener');
        
        checkout.addEventListener('success', (event) => {
          console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
          console.log('🎉 PAYMENT SUCCESSFUL (addEventListener)!');
          console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
          console.log('Event:', event);
          
          setTimeout(() => {
            console.log('✅ Closing checkout after 1.5s...');
            
            if (isMobile) {
              document.body.style.overflow = '';
              document.body.style.position = '';
              document.body.style.width = '';
              document.body.style.height = '';
              console.log('🔓 Mobile scroll unlocked');
            }
            
            if (typeof checkout.close === 'function') {
              checkout.close();
              console.log('✅ Checkout closed');
            } else {
              console.error('❌ checkout.close is not a function');
            }
            
            setIsLoading(false);
          }, 1500);
        });

        checkout.addEventListener('close', () => {
          console.log('🔒 Checkout closed by user (addEventListener)');
          
          if (isMobile) {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.height = '';
            console.log('🔓 Mobile scroll unlocked');
          }
          
          setIsLoading(false);
        });
        
        console.log('✅ Event listeners added (addEventListener)');
        
      } else if (typeof checkout.on === 'function') {
        console.log('✅ Using on() method');
        
        checkout.on('success', (event) => {
          console.log('🎉 PAYMENT SUCCESSFUL (on)!');
          
          setTimeout(() => {
            if (isMobile) {
              document.body.style.overflow = '';
              document.body.style.position = '';
              document.body.style.width = '';
              document.body.style.height = '';
            }
            
            if (typeof checkout.close === 'function') {
              checkout.close();
            }
            
            setIsLoading(false);
          }, 1500);
        });

        checkout.on('close', () => {
          console.log('🔒 Checkout closed by user (on)');
          
          if (isMobile) {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.height = '';
          }
          
          setIsLoading(false);
        });
        
        console.log('✅ Event listeners added (on)');
        
      } else {
        console.error('❌ No event listener method found!');
        console.error('   Available methods:', Object.keys(checkout));
      }

      // Global debug
      window._polarCheckout = checkout;
      console.log('💡 Checkout saved to window._polarCheckout');

      return { success: true, checkout };

    } catch (err) {
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.error('❌ CHECKOUT ERROR');
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.error('Error:', err);
      console.error('Error message:', err.message);
      console.error('Error stack:', err.stack);
      
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