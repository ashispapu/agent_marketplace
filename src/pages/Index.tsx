
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/common/Navbar';
import Hero from '@/components/marketplace/Hero';
import AgentGrid from '@/components/marketplace/AgentGrid';
import { Settings } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const Index = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="fixed bottom-8 right-8 z-50">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link 
                to="/settings" 
                className="bg-brand-blue text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-200"
                aria-label="Settings"
              >
                <Settings className="h-5 w-5" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Settings</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <main className="flex-grow">
        <Hero />
        <AgentGrid />
      </main>
      <footer className="bg-slate-50 py-12 border-t border-slate-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-brand-blue">
                <div className="absolute h-2 w-2 rounded-full bg-brand-orange top-1 left-1"></div>
              </div>
              <span className="text-lg font-semibold">agent.ai</span>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-8 text-sm text-gray-600">
              <a href="#" className="hover:text-primary">Terms of Service</a>
              <a href="#" className="hover:text-primary">Privacy Policy</a>
              <a href="#" className="hover:text-primary">Contact Us</a>
              <a href="#" className="hover:text-primary">Help Center</a>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} agent.ai. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
