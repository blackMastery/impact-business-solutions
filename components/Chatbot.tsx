'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Typing animation component
function TypingIndicator() {
  return (
    <div className="flex items-center space-x-1.5 px-1">
      <div className="w-2 h-2 bg-gray-500 rounded-full typing-dot"></div>
      <div className="w-2 h-2 bg-gray-500 rounded-full typing-dot"></div>
      <div className="w-2 h-2 bg-gray-500 rounded-full typing-dot"></div>
    </div>
  );
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const suggestedQuestions = [
  "What services do you offer?",
  "How much does social media management cost?",
  "Tell me about company incorporation",
  "What is your contact information?",
  "How do I get started?"
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m here to help you learn more about Impact Business Solutions. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async (messageText?: string, retryCount = 0) => {
    const messageToSend = messageText || input.trim();
    if (!messageToSend || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!messageText) setInput('');
    setShowSuggestions(false);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage.content }),
      });

      if (!response.ok) {
        // Handle rate limiting
        if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please wait a moment and try again.');
        }
        throw new Error(`Failed to get response: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.result?.response || data.result?.passOutput?.safe_text || 'I apologize, but I encountered an error. Please try again or contact us directly at +592 679 2338.',
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error('Error sending message:', error);
      
      // Retry logic with exponential backoff
      if (retryCount < 2 && (error.message?.includes('rate limit') || error.message?.includes('Failed to get response'))) {
        const delay = 1000 * Math.pow(2, retryCount);
        await new Promise(resolve => setTimeout(resolve, delay));
        return sendMessage(messageToSend, retryCount + 1);
      }

      // Show user-friendly error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: error.message?.includes('Rate limit') 
          ? 'I\'m receiving too many requests right now. Please wait a moment and try again, or contact us directly on WhatsApp at +592 679 2338.'
          : 'I apologize, but I encountered an error. Please try again or contact us directly on WhatsApp at +592 679 2338 or email us at marketingimpact20@gmail.com.',
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (question: string) => {
    sendMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Show suggestions only when there are 1-2 messages (initial greeting + maybe one user message)
  useEffect(() => {
    setShowSuggestions(messages.length <= 2 && !isLoading);
  }, [messages.length, isLoading]);

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 ${
          isOpen
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-[#1e3a5f] hover:bg-[#1e3a8a]'
        } text-white`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[90vw] sm:w-96 h-[600px] bg-white rounded-lg shadow-2xl flex flex-col border border-gray-200">
          {/* Header */}
          <div className="bg-[#1e3a5f] text-white p-4 rounded-t-lg flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">Impact Business Solutions</h3>
              <p className="text-xs text-gray-200">We're here to help!</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {showSuggestions && messages.length <= 2 && (
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(question)}
                      disabled={isLoading}
                      className="text-xs px-3 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 hover:border-[#1e3a5f] rounded-full text-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-[#1e3a5f] text-white'
                      : 'bg-white text-gray-800 border border-gray-200'
                  }`}
                >
                  {message.role === 'assistant' ? (
                    <div className="text-sm prose prose-sm max-w-none prose-headings:text-gray-800 prose-p:text-gray-800 prose-p:my-1 prose-strong:text-gray-900 prose-strong:font-semibold prose-ul:my-2 prose-ol:my-2 prose-li:my-1 prose-code:text-[#1e3a5f] prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-pre:bg-gray-100 prose-pre:border prose-pre:border-gray-200 prose-pre:rounded prose-pre:p-2 prose-pre:overflow-x-auto prose-a:text-[#1e3a5f] prose-a:underline hover:prose-a:text-[#1e3a8a] prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:italic prose-table:border-collapse prose-table:border prose-table:border-gray-300 prose-th:bg-gray-100 prose-th:border prose-th:border-gray-300 prose-th:p-2 prose-td:border prose-td:border-gray-300 prose-td:p-2">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  )}
                  <p className={`text-xs mt-1 opacity-70 ${message.role === 'user' ? 'text-white' : 'text-gray-600'}`}>
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
                  <TypingIndicator />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
            <div className="flex items-center space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
                disabled={isLoading}
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || isLoading}
                className="bg-[#1e3a5f] text-white p-2 rounded-lg hover:bg-[#1e3a8a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Need immediate help?{' '}
              <a
                href="https://wa.me/5926792338"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1e3a5f] hover:underline"
              >
                Contact us on WhatsApp
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

