import OpenAI from 'openai';

// Initialize OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Company information for context
const COMPANY_INFO = `
Orion is a technology consultancy based in Nairobi, Kenya, offering the following services:

1. AI Automation: Deploying AI agents for business process automation, customer service, and operational efficiency.
2. Software Development: Building custom web applications, mobile apps, enterprise systems, and API integrations.
3. Website Modernization: Transforming outdated websites with responsive designs, improved UX, and SEO optimization.
4. Management Consulting: Providing digital transformation strategies and technology implementation roadmaps.
5. Data Analytics: Creating visualization dashboards and AI-driven insights for business intelligence.
6. Training & Support: Offering comprehensive training programs and ongoing technical assistance.

Orion was founded by Lazarus Magwaro with a mission to empower Kenyan businesses to compete globally through technology.
Contact: info@oriontech.co.ke, Phone: +254 (0) 712 345 678
Location: Nairobi Business District, Suite 200, Kenya
`;

// Fallback responses in case API fails
const fallbackResponses: Record<string, string> = {
  "services": "We offer several services including: AI Automation, Software Development, Management Consulting, Website Modernization, Data Analytics, and Training & Support. Each service is tailored to help Kenyan businesses modernize and compete globally.",
  "default": "Thank you for your message. How else can I assist you with Orion's services today? We offer AI automation, software development, website modernization, and management consulting."
};

// Helper function to find a fallback response
function findFallbackResponse(message: string): string {
  const normalizedMessage = message.toLowerCase();
  
  for (const [key, response] of Object.entries(fallbackResponses)) {
    if (normalizedMessage.includes(key)) {
      return response;
    }
  }
  
  return fallbackResponses.default;
}

// Main handler function for chat messages
export async function handleChatMessage(message: string): Promise<string> {
  try {
    // Make a request to the OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        {
          role: "system",
          content: `You are Orion's AI assistant, representing a technology consultancy in Kenya. 
          Be helpful, concise, and friendly. Focus on providing accurate information about Orion's services.
          Here's information about the company: ${COMPANY_INFO}
          Keep responses under 150 words.`
        },
        { role: "user", content: message }
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    // Extract and return the response
    return response.choices[0].message.content || findFallbackResponse(message);
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    
    // Return a fallback response if the API call fails
    return findFallbackResponse(message);
  }
}
