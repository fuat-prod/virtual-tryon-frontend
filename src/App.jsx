import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { UserProvider } from './contexts/UserContext'
import VirtualTryOnPage from './pages/VirtualTryOnPage'
import TermsOfService from './pages/legal/TermsOfService'
import PrivacyPolicy from './pages/legal/PrivacyPolicy'
import RefundPolicy from './pages/legal/RefundPolicy' 
import AppLayout from './components/common/AppLayout'
import UserInfo from './components/common/UserInfo'

function App() {
  return (
    <UserProvider>
      <Router>
        <UserInfo />
        
        <Routes>
          {/* Main App Route */}
          <Route 
            path="/" 
            element={
              <AppLayout>
                <VirtualTryOnPage />
              </AppLayout>
            } 
          />
          
          {/* Legal Pages - No AppLayout (they have their own layout) */}
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
        </Routes>
      </Router>
    </UserProvider>
  )
}

export default App