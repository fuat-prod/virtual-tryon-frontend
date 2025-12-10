import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { 
  User, 
  Mail, 
  Calendar, 
  CreditCard, 
  TrendingUp, 
  LogOut,
  Loader2,
  ArrowLeft
} from 'lucide-react';

export default function ProfilePage() {
  const { user, isAuthenticated, logout, loading } = useUser();
  const navigate = useNavigate();
  
  const [creditHistory, setCreditHistory] = useState([]);
  const [stats, setStats] = useState(null);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [loading, isAuthenticated, navigate]);

  // Fetch data
  useEffect(() => {
    if (user?.id) {
      fetchCreditHistory();
      fetchStats();
    }
  }, [user?.id]);

  const fetchCreditHistory = async () => {
    try {
      setLoadingHistory(true);
      const response = await fetch(`${API_URL}/api/user/credit-history/${user.id}`);
      const data = await response.json();

      if (data.success) {
        setCreditHistory(data.history);
      }
    } catch (error) {
      console.error('Failed to fetch credit history:', error);
    } finally {
      setLoadingHistory(false);
    }
  };

  const fetchStats = async () => {
    try {
      setLoadingStats(true);
      const response = await fetch(`${API_URL}/api/user/stats/${user.id}`);
      const data = await response.json();

      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoadingStats(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'purchase':
        return '💳';
      case 'usage':
        return '🎨';
      case 'trial':
        return '🎁';
      case 'refund':
        return '↩️';
      default:
        return '📊';
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-violet-950 to-fuchsia-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-violet-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-violet-950 to-fuchsia-950 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-gray-300 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            My Profile
          </h1>
          <p className="text-gray-400">
            Manage your account and view your activity
          </p>
        </div>

        {/* User Info Card */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-violet-500/20 rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  {user.full_name || 'User'}
                </h2>
                <p className="text-gray-400 flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>{user.email}</span>
                </p>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>

          {/* Account Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-violet-500/20">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-violet-400" />
              <div>
                <p className="text-sm text-gray-400">Member Since</p>
                <p className="font-medium text-white">
                  {formatDate(user.created_at)}
                </p>
              </div>
            </div>
            
            {user.last_payment_at && (
              <div className="flex items-center space-x-3">
                <CreditCard className="w-5 h-5 text-violet-400" />
                <div>
                  <p className="text-sm text-gray-400">Last Payment</p>
                  <p className="font-medium text-white">
                    {formatDate(user.last_payment_at)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        {loadingStats ? (
          <div className="bg-gray-800/50 backdrop-blur-sm border border-violet-500/20 rounded-2xl shadow-lg p-8 mb-6 flex justify-center">
            <Loader2 className="w-6 h-6 text-violet-400 animate-spin" />
          </div>
        ) : stats && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {/* Current Credits */}
            <div className="bg-gradient-to-br from-violet-600 to-violet-700 rounded-2xl p-6 text-white border border-violet-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-violet-200">Current Credits</span>
                <CreditCard className="w-5 h-5 text-violet-300" />
              </div>
              <p className="text-3xl font-bold">{stats.currentCredits}</p>
            </div>

            {/* Total Earned */}
            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6 text-white border border-green-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-green-200">Total Earned</span>
                <TrendingUp className="w-5 h-5 text-green-300" />
              </div>
              <p className="text-3xl font-bold">{stats.totalEarned}</p>
            </div>

            {/* Total Used */}
            <div className="bg-gradient-to-br from-fuchsia-600 to-fuchsia-700 rounded-2xl p-6 text-white border border-fuchsia-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-fuchsia-200">Total Used</span>
                <User className="w-5 h-5 text-fuchsia-300" />
              </div>
              <p className="text-3xl font-bold">{stats.totalSpent}</p>
              <p className="text-sm text-fuchsia-200 mt-1">
                {stats.totalGenerations} generations
              </p>
            </div>
          </div>
        )}

        {/* Credit History */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-violet-500/20 rounded-2xl shadow-lg p-6 sm:p-8">
          <h3 className="text-xl font-bold text-white mb-6">
            Credit History
          </h3>

          {loadingHistory ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-6 h-6 text-violet-400 animate-spin" />
            </div>
          ) : creditHistory.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <p>No transaction history yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {creditHistory.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 bg-gray-900/50 border border-violet-500/10 rounded-lg hover:bg-gray-900/70 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">
                      {getTransactionIcon(transaction.type)}
                    </span>
                    <div>
                      <p className="font-medium text-white">
                        {transaction.description || transaction.type}
                      </p>
                      <p className="text-sm text-gray-400">
                        {formatDate(transaction.created_at)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${
                      transaction.amount > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                    </p>
                    <p className="text-sm text-gray-500">
                      Balance: {transaction.balance_after}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}