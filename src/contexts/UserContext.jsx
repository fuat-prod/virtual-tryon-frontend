import { createContext, useContext, useState, useEffect } from 'react';
import { getDeviceFingerprint } from '../utils/fingerprint';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  /**
   * Anonymous user oluştur veya mevcut user'ı getir
   */
  const initializeUser = async () => {
    try {
      setLoading(true);
      setError(null);

      // 1. localStorage'dan mevcut user'ı kontrol et
      const cachedUser = localStorage.getItem('user');
      if (cachedUser) {
        const parsedUser = JSON.parse(cachedUser);
        setUser(parsedUser);
        
        // Backend'den güncel bilgiyi al (background)
        refreshUser(parsedUser.id);
      }

      // 2. Device fingerprint al
      const { deviceId, deviceInfo } = await getDeviceFingerprint();

      // 3. Backend'e anonymous auth isteği gönder
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
   * Logout (clear local state)
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Component mount olunca user'ı initialize et
  useEffect(() => {
    initializeUser();
  }, []);

  const value = {
    user,
    loading,
    error,
    refreshUser,
    updateUserCredits,
    useFreeTrialLocally,
    logout,
    hasFreeTrial: user ? user.free_trials_used < user.free_trials_limit : false,
    hasCredits: user ? user.credits > 0 : false
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