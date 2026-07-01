import { ChatbotProvider } from '@/context/ChatbotContext';
import ChatbotWidget from '@/components/chatbot/ChatbotWidget';

export default function GlobalChatbot() {
  return (
    <ChatbotProvider>
      <ChatbotWidget />
    </ChatbotProvider>
  );
}
