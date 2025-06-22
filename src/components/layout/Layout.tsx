import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuth } from '../../contexts/AuthContext';
import LoadingScreen from '../common/LoadingScreen';
import MessageCircle from '../chat/MessageCircle';

function Layout() {
  const { isLoading, isAuthenticated } = useAuth();
  const location = useLocation();
  
  // Check if current path is a chat page
  const isChatPage = location.pathname.startsWith('/chat');

  // Show loading screen while auth is being checked
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      {!isChatPage && <Footer />}
      {isAuthenticated && <MessageCircle />}
    </div>
  );
}

export default Layout;