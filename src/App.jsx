import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import ProtectedRoute from './components/common/ProtectedRoute';

// Pages
import VirtualTryOnPage from './pages/VirtualTryOnPage';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import PaymentSuccess from './pages/PaymentSuccess'; 
import ProfilePage from './pages/ProfilePage'; // ✅ YENİ

// Legal Pages
import TermsOfService from './pages/legal/TermsOfService';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import RefundPolicy from './pages/legal/RefundPolicy';

// Layout
import AppLayout from './components/common/AppLayout';
import UserInfo from './components/common/UserInfo';

function App() {
  return (
    <UserProvider>
      <Router>
        <UserInfo />
        
        <Routes>
          {/* Main App Route - PUBLIC (anonymous access) ✅ */}
          <Route 
            path="/" 
            element={
              <AppLayout>
                <VirtualTryOnPage />
              </AppLayout>
            } 
          />
          
          {/* Auth Routes - Public (redirect if authenticated) */}
          <Route 
            path="/login" 
            element={
              <ProtectedRoute requireAuth={false}>
                <Login />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/register" 
            element={
              <ProtectedRoute requireAuth={false}>
                <Register />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/forgot-password" 
            element={<ForgotPassword />} 
          />
          
         {/* ✅ YENİ: Profile Page (Authenticated Users Only) */}
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute requireAuth={true}>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />

          {/* ✅ PAYMENT SUCCESS ROUTE */}
          <Route 
            path="/payment/success" 
            element={<PaymentSuccess />} 
          />

          {/* Legal Pages - Public */}
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;