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
  
  // Contact Form API endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, service, message } = req.body;
      
      // Validate required fields
      if (!name || !email || !service || !message) {
        return res.status(400).json({
          error: "All fields are required: name, email, service, and message."
        });
      }
      
      // Create a contact request in the database
      const contactRequest = await storage.createContactRequest({
        name,
        email,
        service,
        message,
        status: "new" // Default status
      });
      
      console.log("Contact request created:", contactRequest);
      
      // Return success response
      res.status(201).json({
        success: true,
        message: "Contact request submitted successfully",
        requestId: contactRequest.id
      });
    } catch (error) {
      console.error("Error in contact endpoint:", error);
      res.status(500).json({
        error: "An error occurred while submitting your contact request."
      });
    }
  });
  
  // Get Contact Requests API endpoint (could be protected in production)
  app.get("/api/contact", async (req, res) => {
    try {
      const { status } = req.query;
      const contactRequests = await storage.getContactRequests(
        50, // Limit to 50 requests
        status as string | undefined
      );
      
      res.json(contactRequests);
    } catch (error) {
      console.error("Error fetching contact requests:", error);
      res.status(500).json({
        error: "An error occurred while fetching contact requests."
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
