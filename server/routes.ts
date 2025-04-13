import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { handleChatMessage } from "./chatbot";

export async function registerRoutes(app: Express): Promise<Server> {
  // Chat API endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = req.body;
      
      if (!message || typeof message !== "string") {
        return res.status(400).json({ 
          error: "Invalid request. Message is required and must be a string." 
        });
      }
      
      const response = await handleChatMessage(message);
      
      res.json({ response });
    } catch (error) {
      console.error("Error in chat endpoint:", error);
      res.status(500).json({ 
        error: "An error occurred while processing your message." 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
