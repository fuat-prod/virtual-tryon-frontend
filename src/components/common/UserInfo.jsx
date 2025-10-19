import { useUser } from '../../contexts/UserContext';

export default function UserInfo() {
  const { user, loading, hasFreeTrial, hasCredits } = useUser();

  if (loading) {
    return (
      <div className="fixed top-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg">
        <p className="text-sm">Loading user...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="fixed top-4 right-4 bg-gradient-to-br from-purple-600 to-blue-600 text-white p-4 rounded-lg shadow-lg max-w-xs z-50">
      <div className="space-y-2">
        <div className="flex items-center justify-between border-b border-white/20 pb-2">
          <span className="text-xs font-semibold uppercase tracking-wide">User Info</span>
          <span className="text-xs bg-white/20 px-2 py-1 rounded">{user.segment}</span>
        </div>
        
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-white/70">ID:</span>
            <span className="font-mono text-xs">{user.id.slice(0, 8)}...</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-white/70">Credits:</span>
            <span className="font-bold">{user.credits}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-white/70">Free Trials:</span>
            <span className="font-bold">{user.free_trials_used} / {user.free_trials_limit}</span>
          </div>

          <div className="pt-2 border-t border-white/20 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span>Has Free Trial:</span>
              <span className={hasFreeTrial ? 'text-green-300' : 'text-red-300'}>
                {hasFreeTrial ? '✓ Yes' : '✗ No'}
              </span>
            </div>
            
            <div className="flex items-center justify-between text-xs">
              <span>Has Credits:</span>
              <span className={hasCredits ? 'text-green-300' : 'text-red-300'}>
                {hasCredits ? '✓ Yes' : '✗ No'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}