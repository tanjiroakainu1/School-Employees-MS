import { useState, useRef, useEffect } from 'react';
import { useChatbot } from '@/context/ChatbotContext';
import { getQuickQuestions, chatbotIdentity } from '@/data/chatbotQuickQuestions';
import { roleGradients } from '@/config/navIcons';
import type { ChatContext } from '@/types/chatbot';

function formatMessage(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/_(.*?)_/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code class="rounded bg-primary-100 px-1 text-xs text-primary-800">$1</code>')
    .replace(/\n/g, '<br/>');
}

function getGradient(context: ChatContext): string {
  if (context in roleGradients) return roleGradients[context as keyof typeof roleGradients];
  return 'from-primary-500 via-primary-600 to-accent-500';
}

export default function ChatbotWidget() {
  const { isOpen, toggleChat, closeChat, sendMessage, messages, isTyping, context } = useChatbot();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const quickQuestions = getQuickQuestions(context);
  const gradient = getGradient(context);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  const handleQuickQuestion = (question: string) => {
    sendMessage(question);
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="chatbot-launcher group"
          aria-label="Open AI assistant"
        >
          <span className="chatbot-launcher-label">
            Ask {chatbotIdentity.name} ✨
          </span>
          <div className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-2xl shadow-glow transition-transform group-hover:scale-110 group-active:scale-95 sm:h-16 sm:w-16`}>
            <span className="relative z-10">{chatbotIdentity.avatar}</span>
            <span className="absolute inset-0 animate-ping rounded-2xl bg-primary-400 opacity-20" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent-400 text-[8px] font-bold text-white ring-2 ring-white">
              AI
            </span>
          </div>
        </button>
      )}

      {isOpen && (
        <div className="chatbot-panel flex items-end justify-end">
          <div className="absolute inset-0 bg-ink-950/40 backdrop-blur-sm sm:hidden" onClick={closeChat} aria-hidden />

          <div className="chatbot-window">
            <div className={`flex shrink-0 items-center gap-3 bg-gradient-to-r ${gradient} px-4 py-3.5 text-white sm:px-5`}>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-xl backdrop-blur-sm">
                {chatbotIdentity.avatar}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold">{chatbotIdentity.name}</h3>
                  <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold">AI</span>
                </div>
                <p className="truncate text-xs text-white/80">{chatbotIdentity.fullName}</p>
              </div>
              <button
                onClick={closeChat}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/10 transition hover:bg-white/20"
                aria-label="Close chat"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="chatbot-quick-questions">
              <div className="mb-2 flex items-center justify-between gap-2">
                <p className="text-[10px] font-bold uppercase tracking-wider text-ink-400">Quick Questions</p>
                <span className="rounded-full bg-primary-100 px-2 py-0.5 text-[10px] font-semibold text-primary-800 ring-1 ring-primary-200/70">
                  {quickQuestions.length}
                </span>
              </div>
              <div className="chatbot-quick-scroll max-h-24 overflow-y-auto sm:max-h-28">
                <div className="flex flex-wrap gap-1.5 pb-1">
                  {quickQuestions.map((q) => (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => handleQuickQuestion(q.question)}
                      disabled={isTyping}
                      title={q.question}
                      className="chatbot-chip"
                    >
                      {q.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="chatbot-messages flex-1 overflow-y-auto px-3 py-4 sm:px-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[88%] px-3.5 py-2.5 text-sm leading-relaxed sm:max-w-[85%] ${
                        msg.role === 'user'
                          ? `rounded-2xl rounded-br-md bg-gradient-to-br ${gradient} text-white`
                          : 'chatbot-bubble-assistant px-3.5 py-2.5'
                      }`}
                    >
                      {msg.role === 'assistant' ? (
                        <div dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }} />
                      ) : (
                        msg.content
                      )}
                      <p className={`mt-1 text-[10px] ${msg.role === 'user' ? 'text-white/60' : 'text-ink-400'}`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="chatbot-bubble-typing">
                      <div className="flex gap-1">
                        <span className="chatbot-dot" />
                        <span className="chatbot-dot" />
                        <span className="chatbot-dot" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="shrink-0 border-t border-primary-100 bg-white p-3 pb-safe sm:p-4">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about SEMS or anything..."
                  disabled={isTyping}
                  className="input-field flex-1 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className={`flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-sm transition hover:shadow-glow-sm disabled:opacity-40`}
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
              <p className="mt-2 text-center text-[10px] text-ink-400">
                SAGE knows SEMS + education worldwide 🌍
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
