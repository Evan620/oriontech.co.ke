import React, { useState, useRef, useEffect } from "react";
import { useChat, suggestedQuestions } from "@/lib/chatContext";
import { useTheme } from "@/lib/themeContext";
import { cn } from "@/lib/utils";
import 'boxicons';

const ChatbotWidget: React.FC = () => {
  const { messages, isOpen, isLoading, sendMessage, toggleChat, closeChat } = useChat();
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme } = useTheme();
  
  console.log("Chatbot Widget Rendered, isOpen:", isOpen);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Focus input when chat is opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      await sendMessage(inputValue);
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = async (question: string) => {
    await sendMessage(question);
  };

  const handleToggleChat = () => {
    console.log("Toggle chat button clicked");
    toggleChat();
  };
  
  return (
    <div className="chatbot-container fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      {!isOpen && (
        <button 
          onClick={handleToggleChat}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20 hover:shadow-xl hover:scale-110 transition-all"
          aria-label="Open chat"
        >
          <i className='bx bx-message-dots text-3xl text-primary-foreground'></i>
        </button>
      )}
      
      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 md:w-96 h-[30rem] bg-background rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-primary/20 transition-all duration-500 scale-100">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-primary to-secondary px-4 py-3 flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center mr-3">
                <i className='bx bx-bot text-2xl text-primary'></i>
              </div>
              <div>
                <h3 className="font-medium text-primary-foreground">Orion Assistant</h3>
                <p className="text-xs text-primary-foreground text-opacity-80">AI-powered support</p>
              </div>
            </div>
            <button 
              onClick={closeChat}
              className="w-8 h-8 rounded-full bg-background bg-opacity-10 flex items-center justify-center text-primary-foreground hover:bg-opacity-20 transition-all"
              aria-label="Close chat"
            >
              <i className='bx bx-x text-xl'></i>
            </button>
          </div>
          
          {/* Chat Messages */}
          <div className="flex-grow p-4 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id}
                className={cn(
                  "flex items-start max-w-[80%]",
                  message.sender === "user" && "ml-auto justify-end"
                )}
              >
                {message.sender === "bot" && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                    <i className='bx bx-bot text-sm text-primary'></i>
                  </div>
                )}
                
                <div 
                  className={cn(
                    "p-3 rounded-lg",
                    message.sender === "bot" 
                      ? "bg-card rounded-tl-none" 
                      : "bg-primary/20 rounded-tr-none"
                  )}
                >
                  <p>{message.content}</p>
                </div>
              </div>
            ))}
            
            {/* Suggested Questions (after bot's first message) */}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {suggestedQuestions.map((question, index) => (
                  <button 
                    key={index}
                    onClick={() => handleSuggestionClick(question)}
                    className="suggestion px-3 py-1 bg-card text-sm rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex items-start max-w-[80%]">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                  <i className='bx bx-bot text-sm text-primary'></i>
                </div>
                <div className="bg-card p-3 rounded-lg rounded-tl-none">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Chat Input */}
          <div className="p-4 border-t border-card">
            <div className="flex">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                ref={inputRef}
                className="flex-grow px-4 py-2 bg-card rounded-l-lg outline-none" 
                placeholder="Type your message..."
              />
              <button 
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                className={cn(
                  "px-4 py-2 bg-primary text-primary-foreground rounded-r-lg",
                  (isLoading || !inputValue.trim()) && "opacity-50 cursor-not-allowed"
                )}
                aria-label="Send message"
              >
                <i className='bx bx-send'></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotWidget;
