
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ChevronLeft, Users, PlusCircle, Share2, BookmarkPlus } from 'lucide-react';
import Navbar from '@/components/common/Navbar';
import { agents, Agent } from '@/lib/data';

const AgentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const fetchAgent = async () => {
      setIsLoading(true);
      try {
        // Find the agent by id
        const foundAgent = agents.find((a) => a.id === id);
        
        // Simulate network delay
        setTimeout(() => {
          setAgent(foundAgent || null);
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error('Failed to fetch agent:', error);
        setIsLoading(false);
      }
    };

    fetchAgent();
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-pulse-subtle">
            <div className="w-12 h-12 rounded-full bg-gray-200 mx-auto mb-4"></div>
            <div className="h-6 w-48 bg-gray-200 rounded mb-4 mx-auto"></div>
            <div className="h-4 w-32 bg-gray-200 rounded mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center p-8">
          <h1 className="text-3xl font-bold mb-4">Agent Not Found</h1>
          <p className="text-gray-600 mb-8">The agent you're looking for doesn't exist or has been removed.</p>
          <Link to="/" className="btn btn-primary px-6 py-2">
            Return to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12 max-w-5xl">
          {/* Back button */}
          <Link to="/" className="inline-flex items-center text-gray-600 hover:text-primary mb-8 transition-colors">
            <ChevronLeft size={20} />
            <span className="ml-1">Back to Marketplace</span>
          </Link>

          {/* Agent header */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8 animate-fade-up">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="relative flex h-32 w-32 flex-shrink-0 items-center justify-center rounded-xl bg-slate-50 p-2">
                <img
                  src={agent.icon}
                  alt={agent.title}
                  className="h-20 w-20 object-contain"
                />
              </div>
              
              <div className="flex-grow text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{agent.title}</h1>
                <p className="text-gray-600 mb-4">By {agent.createdBy}</p>
                
                <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-6">
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className={i < Math.floor(agent.rating) ? "rating-star fill-current" : "text-gray-300"}
                          fill={i < Math.floor(agent.rating) ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-gray-600">
                      {agent.rating.toFixed(2)} ({agent.reviews.toLocaleString()} reviews)
                    </span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Users size={18} className="mr-2" />
                    <span>{agent.tasksCompleted.toLocaleString()} tasks completed</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <button className="btn btn-primary px-6 py-2 flex items-center">
                    <PlusCircle size={18} className="mr-2" />
                    Use Agent
                  </button>
                  <button className="btn btn-outline px-6 py-2 flex items-center">
                    <Users size={18} className="mr-2" />
                    Team Access
                  </button>
                  <button className="btn btn-outline px-4 py-2 flex items-center">
                    <Share2 size={18} className="mr-2" />
                    Share
                  </button>
                  <button className="btn btn-outline px-4 py-2 flex items-center">
                    <BookmarkPlus size={18} className="mr-2" />
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Agent details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="md:col-span-2">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-full">
                <h2 className="text-2xl font-bold mb-6">About this Agent</h2>
                <p className="text-gray-700 mb-6">{agent.description}</p>
                <p className="text-gray-700 mb-6">
                  This powerful AI agent is designed to automate and optimize your workflow. 
                  It can handle complex tasks with minimal input, saving you time and resources 
                  while delivering high-quality results.
                </p>
                
                <h3 className="text-xl font-semibold mb-4">What it can do</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                  <li>Analyze customer data and generate comprehensive profiles</li>
                  <li>Identify key patterns and trends in user behavior</li>
                  <li>Create detailed reports with actionable insights</li>
                  <li>Integrate with your existing tools and workflows</li>
                  <li>Continuously improve based on feedback and results</li>
                </ul>
                
                <h3 className="text-xl font-semibold mb-4">How to use it</h3>
                <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                  <li>Select "Use Agent" to add it to your workspace</li>
                  <li>Connect your data sources or upload relevant files</li>
                  <li>Configure the agent settings to match your requirements</li>
                  <li>Start a new task and follow the guided workflow</li>
                  <li>Review, save, and share the results</li>
                </ol>
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 sticky top-24">
                <h2 className="text-xl font-bold mb-6">Pricing</h2>
                <div className="mb-6 p-4 rounded-lg bg-slate-50">
                  <div className="text-3xl font-bold text-gray-900 mb-2">{agent.creditsPerTask} credit</div>
                  <div className="text-gray-600">per task</div>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Average completion time</span>
                    <span className="font-medium">2-3 minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Daily usage limit</span>
                    <span className="font-medium">50 tasks</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Data retention</span>
                    <span className="font-medium">30 days</span>
                  </div>
                </div>
                
                <button className="btn btn-primary w-full py-3 mb-4">
                  Start Using Now
                </button>
                <button className="btn btn-outline w-full py-3">
                  View Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-slate-50 py-12 border-t border-slate-200 mt-12">
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

export default AgentDetails;
