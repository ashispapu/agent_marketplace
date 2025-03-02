
import { useState } from 'react';
import { Star, Users, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

export interface AgentData {
  id: string;
  title: string;
  description: string;
  icon: string;
  createdBy: string;
  creditsPerTask: number;
  tasksCompleted: number;
  rating: number;
  reviews: number;
}

const AgentCard = ({ agent }: { agent: AgentData }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div
      className="card-container group animate-fade-up"
      style={{ animationDelay: `${Math.random() * 0.3}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-pattern"></div>
      <div className="relative z-10 flex flex-col h-full p-6">
        <div className="mb-5 flex items-center justify-center">
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-slate-50 p-2">
            <img
              src={agent.icon}
              alt={agent.title}
              className="h-16 w-16 object-contain transition-all duration-300 group-hover:scale-110"
            />
          </div>
        </div>
        <h3 className="mb-2 text-center text-xl font-semibold text-gray-800">{agent.title}</h3>
        <p className="text-center text-sm text-gray-500">By {agent.createdBy}</p>
        
        <div className="mt-4 mb-4 text-center">
          <div className="inline-flex items-center justify-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={i < Math.floor(agent.rating) ? "rating-star fill-current" : "text-gray-300"}
                fill={i < Math.floor(agent.rating) ? "currentColor" : "none"}
              />
            ))}
            {agent.rating % 1 > 0 && (
              <div className="relative rating-star">
                <Star size={16} className="text-gray-300" />
                <div 
                  className="absolute top-0 left-0 overflow-hidden" 
                  style={{ width: `${(agent.rating % 1) * 100}%` }}
                >
                  <Star size={16} className="rating-star fill-current" fill="currentColor" />
                </div>
              </div>
            )}
            <span className="ml-1 text-sm text-gray-500">
              {agent.rating.toFixed(2)} ({agent.reviews.toLocaleString()} reviews)
            </span>
          </div>
        </div>
        
        <div className="mt-auto flex flex-col space-y-2">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div>{agent.creditsPerTask} credit per task</div>
            <div className="flex items-center">
              <Users size={14} className="mr-1" />
              {agent.tasksCompleted.toLocaleString()} tasks completed
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Link
              to={`/agent/${agent.id}`}
              className="btn btn-primary py-2"
            >
              Go
            </Link>
            <button className="btn btn-outline py-2 flex items-center justify-center">
              <Users size={16} className="mr-2" />
              Team
            </button>
          </div>
        </div>
      </div>
      
      {/* Hover effect on desktop */}
      {!isMobile && isHovered && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/5 backdrop-blur-sm transition-all duration-300 z-20 opacity-0 group-hover:opacity-100">
          <Link
            to={`/agent/${agent.id}`}
            className="btn btn-primary px-8 py-3 flex items-center"
          >
            View Agent <ExternalLink size={16} className="ml-2" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default AgentCard;
