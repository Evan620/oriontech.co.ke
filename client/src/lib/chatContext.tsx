import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { apiRequest } from "@/lib/queryClient";

// Message type definition
interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

// Suggested questions for the chatbot
export const suggestedQuestions = [
  "What services do you offer?",
  "How can AI help my business?",
  "Tell me about your software development",
  "Book a consultation"
];

interface ChatContextType {
  messages: Message[];
  isOpen: boolean;
  isLoading: boolean;
  addMessage: (content: string, sender: "user" | "bot") => void;
  sendMessage: (content: string) => Promise<void>;
  toggleChat: () => void;
  closeChat: () => void;
}

// Create a default context value to avoid undefined checks
const defaultChatContext: ChatContextType = {
  messages: [{
    id: "welcome",
    content: "👋 Hello! I'm the Orion AI assistant. How can I help you today?",
    sender: "bot",
    timestamp: new Date()
  }],
  isOpen: false,
  isLoading: false,
  addMessage: () => {},
  sendMessage: async () => {},
  toggleChat: () => {},
  closeChat: () => {}
};

const ChatContext = createContext<ChatContextType>(defaultChatContext);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "👋 Hello! I'm the Orion AI assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleChat = () => setIsOpen(prev => !prev);
  const closeChat = () => setIsOpen(false);

  const addMessage = (content: string, sender: "user" | "bot") => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const sendMessage = async (content: string) => {
    try {
      // Add user message to chat
      addMessage(content, "user");
      
      // Set loading state
      setIsLoading(true);
      
      // Make API request to chatbot endpoint
      const response = await apiRequest("POST", "/api/chat", { message: content });
      const data = await response.json();
      
      // Add bot response to chat
      addMessage(data.response, "bot");
    } catch (error) {
      console.error("Failed to send message:", error);
      addMessage("Sorry, I'm having trouble processing your request. Please try again later.", "bot");
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    messages,
    isOpen,
    isLoading,
    addMessage,
    sendMessage,
    toggleChat,
    closeChat
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  return context;
};
