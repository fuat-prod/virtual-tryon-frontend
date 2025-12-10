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

      // ✅ Mobile scroll lock
      if (isMobile) {
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.height = '100%';
        console.log('🔒 Mobile scroll locked');
      }

      // ✅ YENİ: Polar iframe'i bul ve kapat fonksiyonu
      const closePolarIframe = () => {
        console.log('🔍 Looking for Polar iframe...');
        
        // Polar iframe'leri bul
        const iframes = document.querySelectorAll('iframe');
        let polarIframe = null;
        
        iframes.forEach(iframe => {
          const src = iframe.src || '';
          if (src.includes('polar.sh') || src.includes('checkout')) {
            polarIframe = iframe;
          }
        });

        if (polarIframe) {
          console.log('✅ Found Polar iframe, removing...');
          
          // Parent container'ı bul (genelde wrapper div)
          const parent = polarIframe.parentElement;
          if (parent && parent !== document.body) {
            parent.remove();
            console.log('✅ Removed Polar iframe container');
          } else {
            polarIframe.remove();
            console.log('✅ Removed Polar iframe');
          }
        } else {
          console.log('⚠️ Polar iframe not found');
        }

        // Scroll unlock
        if (isMobile) {
          document.body.style.overflow = '';
          document.body.style.position = '';
          document.body.style.width = '';
          document.body.style.height = '';
          console.log('🔓 Mobile scroll unlocked');
        }
      };

      // ✅ Checkout oluştur (timeout ile)
      console.log('🔄 Calling PolarEmbedCheckout.create()...');
      
      let checkoutPromise;
      
      try {
        checkoutPromise = Promise.race([
          PolarEmbedCheckout.create(data.checkoutUrl, { theme: 'light' }),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout')), 10000)
          )
        ]);

        const checkout = await checkoutPromise;

        // Success case (eğer promise resolve olursa)
        console.log('✅ Checkout created successfully (rare case)');
        
        if (typeof checkout.addEventListener === 'function') {
          checkout.addEventListener('success', () => {
            console.log('🎉 Payment successful (event)');
            setTimeout(() => {
              if (typeof checkout.close === 'function') {
                checkout.close();
              } else {
                closePolarIframe();
              }
              setIsLoading(false);
            }, 1500);
          });

          checkout.addEventListener('close', () => {
            console.log('🔒 Checkout closed');
            closePolarIframe();
            setIsLoading(false);
          });
        }

        return { success: true, checkout, closePolarIframe };

      } catch (timeoutError) {
        // ✅ Timeout case (normal durum - Polar SDK bug)
        console.log('⏱️ Checkout creation timeout (expected with Polar SDK)');
        console.log('✅ But checkout iframe is likely open');
        
        // Iframe açıldı, manuel kapatma fonksiyonu döndür
        setIsLoading(false);
        
        return { 
          success: true, 
          checkout: null,
          closePolarIframe // ✅ Manuel kapatma fonksiyonu
        };
      }

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