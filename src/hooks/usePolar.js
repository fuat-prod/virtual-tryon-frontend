import { useState } from 'react';
import { PolarEmbedCheckout } from '@polar-sh/checkout/embed';

/**
 * Polar.sh checkout hook (Mobile-first)
 */
export function usePolar() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Checkout aç (Embedded)
   */
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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/payment/create-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId,
          productId,
          planDetails
        })
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Checkout creation failed');
      }

      console.log('✅ Checkout session created');
      console.log('   Checkout URL:', data.checkoutUrl);

      // Mobile detection
      const isMobile = window.innerWidth < 768;
      
      console.log('📱 Device:', isMobile ? 'Mobile' : 'Desktop');

      // Embedded checkout aç
      const checkout = await PolarEmbedCheckout.create(
        data.checkoutUrl,
        'light' // theme: 'light' or 'dark'
      );

      console.log('✅ Embedded checkout opened');

      // Mobile-specific handling
      if (isMobile) {
        // iOS scroll lock (checkout açıkken scroll engelle)
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.height = '100%';
        
        console.log('🔒 Mobile scroll locked');
      }

      // Success event
      checkout.addEventListener('success', (event) => {
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('🎉 PAYMENT SUCCESSFUL!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('Event:', event);
        
        // Unlock scroll
        if (isMobile) {
          document.body.style.overflow = '';
          document.body.style.position = '';
          document.body.style.width = '';
          document.body.style.height = '';
          console.log('🔓 Mobile scroll unlocked');
        }
        
        setIsLoading(false);
      });

      // Close event
      checkout.addEventListener('close', () => {
        console.log('🔒 Checkout closed by user');
        
        // Unlock scroll
        if (isMobile) {
          document.body.style.overflow = '';
          document.body.style.position = '';
          document.body.style.width = '';
          document.body.style.height = '';
          console.log('🔓 Mobile scroll unlocked');
        }
        
        setIsLoading(false);
      });

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