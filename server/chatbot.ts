import OpenAI from 'openai';

// Initialize OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Company information for context
const COMPANY_INFO = `
Orion is a global technology consultancy with headquarters in Nairobi, Kenya, offering the following services worldwide:

1. AI Automation: Deploying AI agents for business process automation, customer service, and operational efficiency.
2. Software Development: Building custom web applications, mobile apps, enterprise systems, and API integrations.
3. Website Modernization: Transforming outdated websites with responsive designs, improved UX, and SEO optimization.
4. Management Consulting: Providing digital transformation strategies and technology implementation roadmaps.
5. Data Analytics: Creating visualization dashboards and AI-driven insights for business intelligence.
6. Training & Support: Offering comprehensive training programs and ongoing technical assistance.

Orion was founded by Lazarus Magwaro with a mission to help businesses worldwide compete in the digital age through innovative technology.
Contact: info@oriontech.co.ke, Phone: +254 (0) 712 345 678
Location: Headquarters in Nairobi Business District, Suite 200, Kenya, with global operations
`;

// Fallback responses in case API fails (using markdown)
const fallbackResponses: Record<string, string> = {
  "services": "## Orion's Services\n\nWe offer several global services including:\n\n* **AI Automation**: Intelligent business process automation\n* **Software Development**: Custom web, mobile, and enterprise solutions\n* **Website Modernization**: Responsive design and UX improvements\n* **Management Consulting**: Digital transformation strategies\n* **Data Analytics**: Visualization and AI-driven insights\n* **Training & Support**: Comprehensive technical assistance\n\nEach service is tailored to help businesses worldwide modernize and compete in the digital age.",
  
  "ai": "## AI Automation\n\nOur **AI automation services** help businesses worldwide:\n\n1. **Streamline operations** with intelligent workflows\n2. **Enhance customer experiences** through AI-powered interactions\n3. **Reduce operational costs** via smart process optimization\n4. **Scale capabilities** without proportional resource increases\n\nWe leverage cutting-edge AI technologies to create custom solutions for your unique business challenges.",
  
  "software": "## Software Development\n\nOur **software development services** include:\n\n* **Custom Web Applications**: Scalable, secure solutions\n* **Mobile Apps**: Native and cross-platform development\n* **Enterprise Systems**: Complex business management tools\n* **API Integrations**: Connecting your systems seamlessly\n\nEach solution is custom-built to address your specific business requirements.",
  
  "website": "## Website Modernization\n\nWe transform outdated websites into **modern digital experiences** through:\n\n* **Responsive Design**: Perfect viewing across all devices\n* **Improved UX**: Intuitive navigation and interactions\n* **SEO Optimization**: Better visibility in search engines\n* **Performance Tuning**: Faster loading and responsive interfaces",
  
  "consulting": "## Management Consulting\n\nOur **global consulting services** provide:\n\n* **Digital Transformation Strategies**: Roadmaps for technology adoption\n* **Implementation Planning**: Practical execution guidelines\n* **Change Management**: Helping teams adapt to new technologies\n* **Performance Optimization**: Improving existing digital systems",
  
  "contact": "## Contact Information\n\n* **Email**: info@oriontech.co.ke\n* **Phone**: +254 (0) 712 345 678\n* **Website**: www.oriontech.co.ke\n\nOur team is ready to discuss how we can help your business succeed globally through technology.",
  
  "location": "## Our Location\n\nOur headquarters is in **Nairobi, Kenya**, but we operate **globally** to serve clients worldwide. Our distributed team of experts allows us to provide service across different time zones and understand diverse market needs.",
  
  "default": "Thank you for your message. How else can I assist you with **Orion's global technology services** today? Feel free to ask about our specific services, expertise, or how we can help your business."
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
    console.log("Calling OpenAI API with message:", message);
    // Make a request to the OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        {
          role: "system",
          content: `You are Orion's AI assistant, representing a global technology consultancy with headquarters in Kenya. 
          Be helpful, concise, and friendly. Focus on providing accurate information about Orion's services.
          
          Here's information about the company: ${COMPANY_INFO}
          
          IMPORTANT FORMATTING INSTRUCTIONS:
          1. Format your responses using Markdown syntax for better readability
          2. Use numbered lists, bullet points, and headers when appropriate
          3. Use bold for important terms or names using ** syntax
          4. Break complex information into clear, structured sections
          5. Keep responses organized and easy to scan
          
          Keep total response under 200 words.`
        },
        { role: "user", content: message }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    console.log("OpenAI API response:", response.choices[0].message.content);
    // Extract and return the response
    return response.choices[0].message.content || findFallbackResponse(message);
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    
    // Return a fallback response if the API call fails
    return findFallbackResponse(message);
  }
}
