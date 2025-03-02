
import { Search } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative overflow-hidden px-6 py-24 sm:px-8 md:px-12 lg:px-16">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white"></div>
        <div className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-slate-100 ring-1 ring-slate-100 sm:-mr-80 lg:-mr-96"></div>
      </div>

      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl animate-fade-up" style={{ animationDelay: '0.1s' }}>
          Agent Marketplace
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-600 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          Discover and connect with powerful AI agents that can help automate tasks and enhance your workflow.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6 animate-fade-up" style={{ animationDelay: '0.5s' }}>
          <div className="relative max-w-md w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="search"
              className="glass block w-full p-4 pl-10 text-sm text-gray-900 rounded-full focus:ring-primary focus:border-primary"
              placeholder="Search for agents..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
