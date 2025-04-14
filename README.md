
# Orion - AI-Powered Business Solutions

A modern, AI-powered website for Orion, a global technology consultancy headquartered in Nairobi, Kenya. The website showcases our services, portfolio, and enables client interactions through an intelligent chatbot.

## Features

- 🎯 **Modern Design**: Responsive, animated UI with dark/light theme support
- 🤖 **AI Chatbot**: Intelligent customer service powered by OpenAI
- 💼 **Service Showcase**: Detailed presentation of our technology solutions
- 📱 **Portfolio Gallery**: Filterable showcase of our project work
- 📬 **Contact System**: Integrated contact form with database storage
- 👤 **Admin Panel**: Manage contact requests and website content

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **AI Integration**: OpenAI API
- **Styling**: Tailwind CSS + Shadcn/ui
- **Animations**: GSAP + Framer Motion

## Getting Started

1. **Installation**
   ```bash
   npm install
   ```

2. **Environment Setup**
   Configure your environment variables in the Secrets tab:
   - `DATABASE_URL`: PostgreSQL connection string
   - `OPENAI_API_KEY`: OpenAI API key
   - `SESSION_SECRET`: Secret for session management

3. **Database Setup**
   ```bash
   npm run db:push
   ```

4. **Development**
   ```bash
   npm run dev
   ```
   The application will be available at port 5000.

## Project Structure

```
├── client/          # Frontend React application
├── server/          # Express.js backend
├── shared/          # Shared types and schemas
└── public/          # Static assets
```

## Features Overview

### AI Automation
- Business process automation
- Customer service enhancement
- Operational efficiency

### Software Development
- Custom web/mobile applications
- Enterprise systems
- API integrations

### Website Modernization
- Responsive design
- UX improvements
- SEO optimization

### Management Consulting
- Digital transformation
- Implementation roadmaps

## Contact

- Email: info@oriontech.co.ke
- Phone: +254 (0) 712 345 678
- Location: Nairobi Business District, Suite 200, Kenya

## License

MIT License - feel free to use this code for your own projects.
