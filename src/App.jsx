import { UserProvider } from './contexts/UserContext';
import VirtualTryOnPage from './pages/VirtualTryOnPage'
import AppLayout from './components/common/AppLayout'
import UserInfo from './components/common/UserInfo' 

function App() {
  return (
    <UserProvider>
      <UserInfo />  
      <AppLayout>
        <VirtualTryOnPage />
      </AppLayout>
    </UserProvider>
  )
}

export default App