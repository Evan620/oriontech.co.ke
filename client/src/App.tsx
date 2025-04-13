import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Portfolio from "@/pages/Portfolio";
import Contact from "@/pages/Contact";
import ChatbotWidget from "@/components/ChatbotWidget";
import { useTheme } from "@/lib/themeContext";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/services" component={Services} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Get theme here in App component
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen flex flex-col bg-background text-foreground font-inter bg-noise theme-${theme}`}>
      <Layout>
        <Router />
      </Layout>
      <ChatbotWidget />
      <Toaster />
    </div>
  );
}

export default App;
