import { 
  users, type User, type InsertUser,
  chatMessages, type ChatMessage, type InsertChatMessage,
  contactRequests, type ContactRequest, type InsertContactRequest,
  portfolioItems, type PortfolioItem, type InsertPortfolioItem
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

// Storage interface with all CRUD methods
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Chat message methods
  getChatMessages(userId: number | null, limit?: number): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  
  // Contact request methods
  getContactRequests(limit?: number, status?: string): Promise<ContactRequest[]>;
  getContactRequest(id: number): Promise<ContactRequest | undefined>;
  createContactRequest(request: InsertContactRequest): Promise<ContactRequest>;
  updateContactStatus(id: number, status: string): Promise<ContactRequest | undefined>;
  
  // Portfolio item methods
  getPortfolioItems(category?: string): Promise<PortfolioItem[]>;
  getPortfolioItem(id: number): Promise<PortfolioItem | undefined>;
  createPortfolioItem(item: InsertPortfolioItem): Promise<PortfolioItem>;
}

// Database storage implementation
export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  // Chat message methods
  async getChatMessages(userId: number | null, limit: number = 50): Promise<ChatMessage[]> {
    if (userId) {
      return await db.select()
        .from(chatMessages)
        .where(eq(chatMessages.userId, userId))
        .orderBy(desc(chatMessages.timestamp))
        .limit(limit);
    } else {
      return await db.select()
        .from(chatMessages)
        .orderBy(desc(chatMessages.timestamp))
        .limit(limit);
    }
  }
  
  async createChatMessage(message: InsertChatMessage): Promise<ChatMessage> {
    const [newMessage] = await db
      .insert(chatMessages)
      .values({
        userId: message.userId,
        content: message.content,
        sender: message.sender
      })
      .returning();
    return newMessage;
  }
  
  // Contact request methods
  async getContactRequests(limit: number = 50, status?: string): Promise<ContactRequest[]> {
    if (status) {
      return await db.select()
        .from(contactRequests)
        .where(eq(contactRequests.status, status))
        .orderBy(desc(contactRequests.createdAt))
        .limit(limit);
    } else {
      return await db.select()
        .from(contactRequests)
        .orderBy(desc(contactRequests.createdAt))
        .limit(limit);
    }
  }
  
  async getContactRequest(id: number): Promise<ContactRequest | undefined> {
    const [request] = await db
      .select()
      .from(contactRequests)
      .where(eq(contactRequests.id, id));
    return request || undefined;
  }
  
  async createContactRequest(request: InsertContactRequest): Promise<ContactRequest> {
    const [newRequest] = await db
      .insert(contactRequests)
      .values(request)
      .returning();
    return newRequest;
  }
  
  async updateContactStatus(id: number, status: string): Promise<ContactRequest | undefined> {
    const [updatedRequest] = await db
      .update(contactRequests)
      .set({ status })
      .where(eq(contactRequests.id, id))
      .returning();
    return updatedRequest || undefined;
  }
  
  // Portfolio item methods
  async getPortfolioItems(category?: string): Promise<PortfolioItem[]> {
    if (category && category !== 'all') {
      return await db.select()
        .from(portfolioItems)
        .where(eq(portfolioItems.category, category));
    } else {
      return await db.select().from(portfolioItems);
    }
  }
  
  async getPortfolioItem(id: number): Promise<PortfolioItem | undefined> {
    const [item] = await db
      .select()
      .from(portfolioItems)
      .where(eq(portfolioItems.id, id));
    return item || undefined;
  }
  
  async createPortfolioItem(item: InsertPortfolioItem): Promise<PortfolioItem> {
    const [newItem] = await db
      .insert(portfolioItems)
      .values({
        title: item.title,
        description: item.description,
        imageUrl: item.imageUrl,
        category: item.category,
        categoryLabel: item.categoryLabel,
        featured: item.featured || false
      })
      .returning();
    return newItem;
  }
}

// Export the database storage implementation
export const storage = new DatabaseStorage();
