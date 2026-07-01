import { createContext, useContext, useState, useCallback, useRef, useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { detectChatContext, chatbotIdentity } from '@/data/chatbotQuickQuestions';
import { generateAIResponse } from '@/services/chatbotAI';
import type { ChatMessage, ChatContext } from '@/types/chatbot';

interface ChatbotContextType {
  isOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
  sendMessage: (text: string) => void;
  messages: ChatMessage[];
  isTyping: boolean;
  context: ChatContext;
}

const ChatbotCtx = createContext<ChatbotContextType | null>(null);

export function ChatbotProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const idRef = useRef(0);

  const context = detectChatContext(location.pathname, user?.role);

  const addMessage = useCallback((role: 'user' | 'assistant', content: string) => {
    idRef.current += 1;
    const msg: ChatMessage = {
      id: String(idRef.current),
      role,
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, msg]);
    return msg;
  }, []);

  const sendMessage = useCallback((text: string) => {
    if (!text.trim() || isTyping) return;

    addMessage('user', text.trim());
    setIsTyping(true);

    const delay = 600 + Math.min(text.length * 15, 1200);

    setTimeout(() => {
      const response = generateAIResponse(text, context, user?.name);
      addMessage('assistant', response.content);
      setIsTyping(false);
    }, delay);
  }, [addMessage, context, isTyping, user?.name]);

  useEffect(() => {
    if (isOpen && !hasGreeted) {
      setHasGreeted(true);
      const ctxLabel = context === 'home' ? 'visitor' : context === 'login' ? 'new user' : user?.name || 'there';
      addMessage('assistant', `Hi ${ctxLabel}! 👋 I'm **${chatbotIdentity.name}**, your ${chatbotIdentity.fullName}.\n\n${chatbotIdentity.tagline}. Ask me about SEMS, your role, or education topics worldwide!\n\n👇 Try a quick question below.`);
    }
  }, [isOpen, hasGreeted, context, user?.name, addMessage]);

  useEffect(() => {
    setHasGreeted(false);
    setMessages([]);
  }, [context]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const isMobile = window.innerWidth < 640;
    if (isMobile) {
      document.body.style.overflow = 'hidden';
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      if (isMobile) {
        document.body.style.overflow = previousOverflow;
      }
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <ChatbotCtx.Provider
      value={{
        isOpen,
        openChat: () => setIsOpen(true),
        closeChat: () => setIsOpen(false),
        toggleChat: () => setIsOpen((p) => !p),
        sendMessage,
        messages,
        isTyping,
        context,
      }}
    >
      {children}
    </ChatbotCtx.Provider>
  );
}

export function useChatbot() {
  const ctx = useContext(ChatbotCtx);
  if (!ctx) throw new Error('useChatbot must be used within ChatbotProvider');
  return ctx;
}
