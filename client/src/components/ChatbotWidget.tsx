import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import ReactMarkdown from 'react-markdown';
import 'boxicons';

const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      content: "👋 Hello! I'm the Orion AI assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatHeight, setChatHeight] = useState("30rem"); // Default height
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to the bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Adjust height based on content (expanded when many messages)
  useEffect(() => {
    if (messages.length > 5) {
      setChatHeight("40rem"); // Taller for more messages
    } else if (messages.length > 2) {
      setChatHeight("35rem"); // Medium height
    } else {
      setChatHeight("30rem"); // Default height
    }
  }, [messages.length]);
  
  const toggleChat = () => {
    console.log("Toggle chat button clicked");
    setIsOpen(prev => !prev);
  };
  
  const closeChat = () => {
    setIsOpen(false);
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      content,
      sender: "user" as const,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    
    // Set loading state
    setIsLoading(true);
    
    try {
      // Make API request to chatbot endpoint
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content }),
      });
      
      const data = await response.json();
      
      // Add bot response
      const botMessage = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        sender: "bot" as const,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Failed to send message:", error);
      
      // Add error message from bot
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I'm having trouble processing your request. Please try again later.",
        sender: "bot" as const,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Suggested questions
  const suggestedQuestions = [
    "What services do you offer?",
    "How can AI help my business?",
    "Tell me about your software development",
    "Book a consultation"
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      {!isOpen && (
        <button 
          onClick={toggleChat}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20 hover:shadow-xl hover:scale-110 transition-all"
          aria-label="Open chat"
        >
          <i className='bx bx-message-dots text-3xl text-primary-foreground'></i>
        </button>
      )}
      
      {/* Chat Window */}
      {isOpen && (
        <div style={{ height: chatHeight }} className="w-80 md:w-96 bg-background rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-primary/20 transition-all duration-500 scale-100">
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
                  "flex items-start",
                  message.sender === "user" ? "ml-auto justify-end max-w-[80%]" : "max-w-[90%]"
                )}
              >
                {message.sender === "bot" && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2 flex-shrink-0">
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
                  {message.sender === "bot" ? (
                    <div className="prose prose-sm dark:prose-invert prose-headings:mb-2 prose-p:mb-2 prose-ul:mb-2 prose-ul:mt-0 max-w-none">
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                  ) : (
                    <p>{message.content}</p>
                  )}
                </div>
              </div>
            ))}
            
            {/* Suggested Questions (after bot's first message) */}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {suggestedQuestions.map((question, index) => (
                  <button 
                    key={index}
                    onClick={() => sendMessage(question)}
                    className="px-3 py-1 bg-card text-sm rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
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
