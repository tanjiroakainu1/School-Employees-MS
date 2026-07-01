import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { AppDataProvider } from '@/context/AppDataContext';
import GlobalChatbot from '@/components/chatbot/GlobalChatbot';
import AppRoutes from '@/routes/AppRoutes';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppDataProvider>
          <AppRoutes />
          <GlobalChatbot />
        </AppDataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
