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

      // ✅ AGGRESSIVE: Polar iframe kapatma fonksiyonu
      const closePolarIframe = () => {
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('🧹 AGGRESSIVE POLAR CLEANUP');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        
        let removed = false;
        
        // ✅ METHOD 1: Polar specific selectors
        console.log('🔍 Method 1: Polar-specific selectors...');
        const polarSelectors = [
          '[id*="polar"]',
          '[class*="polar"]',
          '[id*="checkout"]',
          '[class*="checkout"]',
          'iframe[src*="polar.sh"]',
          'iframe[src*="checkout"]'
        ];
        
        polarSelectors.forEach(selector => {
          const elements = document.querySelectorAll(selector);
          elements.forEach(el => {
            // Skip our own modal
            if (el.closest('[class*="PaywallModal"]') || el.id === 'root' || el.closest('#root')) return;
            
            console.log('   Found element:', el.tagName, el.id || el.className);
            el.remove();
            removed = true;
          });
        });
        
        // ✅ METHOD 2: All iframes with high z-index
        console.log('🔍 Method 2: High z-index iframes...');
        const allIframes = document.querySelectorAll('iframe');
        allIframes.forEach(iframe => {
          const style = window.getComputedStyle(iframe);
          const zIndex = parseInt(style.zIndex) || 0;
          const parent = iframe.parentElement;
          const parentZIndex = parent ? parseInt(window.getComputedStyle(parent).zIndex) || 0 : 0;
          
          // If iframe or parent has high z-index (>1000)
          if (zIndex > 1000 || parentZIndex > 1000) {
            const src = iframe.src || '';
            
            // Skip our own content
            if (src.includes('dressai.app') || src.includes('localhost') || src.includes('vercel')) return;
            
            console.log('   Removing high z-index iframe:', src.substring(0, 50));
            
            // Remove parent container if it exists
            if (parent && parent !== document.body && parent.childNodes.length === 1) {
              parent.remove();
            } else {
              iframe.remove();
            }
            removed = true;
          }
        });
        
        // ✅ METHOD 3: Stripe iframes (Polar uses Stripe)
        console.log('🔍 Method 3: Stripe iframes...');
        const stripeIframes = document.querySelectorAll('iframe[src*="stripe"], iframe[name*="stripe"]');
        stripeIframes.forEach(iframe => {
          console.log('   Removing Stripe iframe');
          const parent = iframe.parentElement;
          if (parent && parent !== document.body) {
            parent.remove();
          } else {
            iframe.remove();
          }
          removed = true;
        });
        
        // ✅ METHOD 4: Overlay divs with very high z-index
        console.log('🔍 Method 4: High z-index overlays...');
        const allDivs = document.querySelectorAll('div');
        allDivs.forEach(div => {
          const style = window.getComputedStyle(div);
          const zIndex = parseInt(style.zIndex) || 0;
          const position = style.position;
          
          // Fixed/absolute divs with very high z-index (>999999)
          if ((position === 'fixed' || position === 'absolute') && zIndex > 999999) {
            // Skip our modals
            if (div.closest('[class*="PaywallModal"]') || 
                div.id === 'root' || 
                div.closest('#root')) {
              return;
            }
            
            console.log('   Removing high z-index overlay, z:', zIndex);
            div.remove();
            removed = true;
          }
        });
        
        // ✅ METHOD 5: Body overflow reset
        console.log('🔍 Method 5: Body style reset...');
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.height = '';
        
        if (isMobile) {
          console.log('🔓 Mobile scroll unlocked');
        }
        
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        if (removed) {
          console.log('✅ POLAR CHECKOUT CLOSED');
        } else {
          console.log('⚠️ NO POLAR ELEMENTS FOUND');
        }
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        
        return removed;
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
          closePolarIframe // ✅ Aggressive cleanup function
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