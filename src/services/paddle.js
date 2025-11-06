// Paddle Service - Checkout Management

class PaddleService {
  constructor() {
    this.initialized = false;
  }

  async initialize() {
    if (this.initialized) return;

    try {
      // Paddle.js yüklenmesini bekle
      if (typeof window.Paddle === 'undefined') {
        console.error('❌ Paddle.js not loaded');
        return;
      }

      // VITE environment variable (REACT_APP değil!)
      const clientToken = import.meta.env.VITE_PADDLE_CLIENT_TOKEN;
      
      if (!clientToken) {
        console.error('❌ VITE_PADDLE_CLIENT_TOKEN not found in .env');
        return;
      }

      // Sandbox mode
      window.Paddle.Environment.set('sandbox');
      
      // Initialize Paddle
      window.Paddle.Setup({ 
        token: clientToken,
        eventCallback: this.handlePaddleEvent.bind(this)
      });

      this.initialized = true;
      console.log('✅ Paddle initialized (sandbox mode)');
    } catch (error) {
      console.error('❌ Paddle initialization failed:', error);
    }
  }

  handlePaddleEvent(event) {
    console.log('🎯 Paddle event:', event);
    
    switch (event.name) {
      case 'checkout.completed':
        console.log('✅ Checkout completed!');
        // Kullanıcıyı success sayfasına yönlendir veya credits'i güncelle
        window.location.reload(); // Geçici - credits güncellensin
        break;
      
      case 'checkout.closed':
        console.log('❌ Checkout closed');
        break;
      
      default:
        console.log('📌 Paddle event:', event.name);
    }
  }

  openCheckout(priceId, userEmail) {
    if (!this.initialized) {
      console.error('❌ Paddle not initialized');
      return;
    }

    try {
      window.Paddle.Checkout.open({
        items: [
          {
            priceId: priceId,
            quantity: 1
          }
        ],
        customer: {
          email: userEmail
        },
        customData: {
          userId: localStorage.getItem('userId') || 'anonymous'
        }
      });
    } catch (error) {
      console.error('❌ Failed to open checkout:', error);
      throw error;
    }
  }
}

export const paddleService = new PaddleService();