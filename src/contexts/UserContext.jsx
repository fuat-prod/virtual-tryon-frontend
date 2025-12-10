import { createContext, useContext, useState, useEffect } from 'react';
import { getDeviceFingerprint } from '../utils/fingerprint';
import { supabase } from '../config/supabase';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // ✅ YENİ
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  /**
   * Anonymous user oluştur veya mevcut user'ı getir
   */
  const initializeUser = async () => {
    try {
      setLoading(true);
      setError(null);

      // 1. Supabase session kontrolü
      const { data: { session: existingSession } } = await supabase.auth.getSession();
      
      if (existingSession) {
        // Registered user var
        await loadRegisteredUser(existingSession);
        return;
      }

      // 2. localStorage'dan anonymous user kontrol et
      const cachedUser = localStorage.getItem('user');
      if (cachedUser) {
        const parsedUser = JSON.parse(cachedUser);
        setUser(parsedUser);
        
        // Backend'den güncel bilgiyi al (background)
        refreshUser(parsedUser.id);
      }

      // 3. Device fingerprint al
      const { deviceId, deviceInfo } = await getDeviceFingerprint();

      // 4. Backend'e anonymous auth isteği gönder
      const response = await fetch(`${API_URL}/api/auth/anonymous`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          deviceId,
          deviceInfo
        })
      });

      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      const data = await response.json();

      if (data.success) {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        console.log('✅ User initialized:', data.isNew ? 'New user' : 'Existing user');
      } else {
        throw new Error(data.error || 'Authentication failed');
      }
    } catch (err) {
      console.error('User initialization error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Registered user'ı yükle (Supabase session'dan)
   */
  const loadRegisteredUser = async (session) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/user/${session.user.id}`);
      const data = await response.json();

      if (data.success) {
        setUser(data.user);
        setSession(session);
        localStorage.setItem('user', JSON.stringify(data.user));
        console.log('✅ Registered user loaded');
      }
    } catch (err) {
      console.error('Load registered user error:', err);
    }
  };

  /**
   * Email/Password ile kayıt ol
   */
  const registerWithEmail = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const { deviceId } = await getDeviceFingerprint();

      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          deviceId
        })
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Registration failed');
      }

      setUser(data.user);
      setSession(data.session);
      localStorage.setItem('user', JSON.stringify(data.user));

      return {
        success: true,
        message: 'Registration successful'
      };

    } catch (err) {
      console.error('Register error:', err);
      setError(err.message);
      return {
        success: false,
        error: err.message
      };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Email/Password ile giriş yap
   */
  const loginWithEmail = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Login failed');
      }

      setUser(data.user);
      setSession(data.session);
      localStorage.setItem('user', JSON.stringify(data.user));

      return {
        success: true,
        message: 'Login successful'
      };

    } catch (err) {
      console.error('Login error:', err);
      setError(err.message);
      return {
        success: false,
        error: err.message
      };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Anonymous user'ı registered user'a dönüştür
   */
  const migrateAnonymousToAuth = async (email, password) => {
    try {
      if (!user || !user.is_anonymous) {
        throw new Error('No anonymous user to migrate');
      }

      setLoading(true);
      setError(null);

      const response = await fetch(`${API_URL}/api/auth/migrate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          anonymousUserId: user.id,
          email,
          password
        })
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Migration failed');
      }

      setUser(data.user);
      setSession(data.session);
      localStorage.setItem('user', JSON.stringify(data.user));

      return {
        success: true,
        message: 'Account created successfully! Your credits have been preserved.'
      };

    } catch (err) {
      console.error('Migration error:', err);
      setError(err.message);
      return {
        success: false,
        error: err.message
      };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Google ile giriş yap
   */
  const loginWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) throw error;

      return {
        success: true
      };

    } catch (err) {
      console.error('Google login error:', err);
      return {
        success: false,
        error: err.message
      };
    }
  };

  /**
   * Password reset email gönder
   */
  const sendPasswordReset = async (email) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to send reset email');
      }

      return {
        success: true,
        message: 'Password reset email sent! Check your inbox.'
      };

    } catch (err) {
      console.error('Password reset error:', err);
      return {
        success: false,
        error: err.message
      };
    }
  };

  /**
   * User bilgilerini güncelle (backend'den)
   */
  const refreshUser = async (userId) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/user/${userId}`);
      
      if (!response.ok) {
        throw new Error('Failed to refresh user');
      }

      const data = await response.json();

      if (data.success) {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
    } catch (err) {
      console.error('Refresh user error:', err);
    }
  };

 /**
 * ✅ Credits'i güncelle ve yeni credits değerini DÖNDÜR
 */
const refreshCredits = async () => {
  if (!user?.id) {
    console.warn('⚠️ No user ID, cannot refresh credits');
    return { success: false, credits: null };
  }

  console.log('🔄 Refreshing user credits...');
  console.log('   User ID:', user.id);
  setRefreshing(true);

  try {
    const response = await fetch(`${API_URL}/api/auth/user/${user.id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch user');
    }

    const data = result.user;

    if (data && data.credits !== undefined) {
      console.log('✅ Credits refreshed successfully');
      console.log(`   Old: ${user.credits} → New: ${data.credits}`);
      
      const updatedUser = {
        ...user,
        credits: data.credits,
        last_payment_at: data.last_payment_at || user.last_payment_at,
        updated_at: data.updated_at || new Date().toISOString()
      };
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // ✅ YENİ: credits değerini döndür
      return { success: true, credits: data.credits };
    } else {
      console.warn('⚠️ No credits data in response');
      return { success: false, credits: null };
    }
  } catch (error) {
    console.error('❌ Failed to refresh credits:', error.message);
    return { success: false, credits: null };
  } finally {
    setRefreshing(false);
  }
};

  /**
   * User credits'i güncelle (lokal)
   */
  const updateUserCredits = (newCredits) => {
    if (user) {
      const updatedUser = { ...user, credits: newCredits };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  /**
   * Free trial kullan
   */
  const useFreeTrialLocally = () => {
    if (user) {
      const updatedUser = { 
        ...user, 
        free_trials_used: user.free_trials_used + 1 
      };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  /**
   * Logout
   */
  const logout = async () => {
    try {
      // Supabase session varsa çıkış yap
      if (session) {
        await supabase.auth.signOut();
      }

      setUser(null);
      setSession(null);
      localStorage.removeItem('user');

      // Yeni anonymous user oluştur
      await initializeUser();

    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Auth state değişikliklerini dinle
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);

        if (event === 'SIGNED_IN' && session) {
          await loadRegisteredUser(session);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setSession(null);
          await initializeUser();
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Component mount olunca user'ı initialize et
  useEffect(() => {
    initializeUser();
  }, []);

  const value = {
    user,
    session,
    loading,
    refreshing, // ✅ YENİ
    error,
    registerWithEmail,
    loginWithEmail,
    loginWithGoogle,
    migrateAnonymousToAuth,
    sendPasswordReset,
    refreshUser,
    refreshCredits, // ✅ YENİ
    updateUserCredits,
    useFreeTrialLocally,
    logout,
    hasFreeTrial: user ? user.free_trials_used < user.free_trials_limit : false,
    hasCredits: user ? user.credits > 0 : false,
    isAnonymous: user ? user.is_anonymous : true,
    isAuthenticated: !!(session && user && !user.is_anonymous)
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}