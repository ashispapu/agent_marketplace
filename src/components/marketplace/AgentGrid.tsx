
import { useState } from 'react';
import AgentCard from '../common/AgentCard';
import { agents } from '@/lib/data';

const AgentGrid = () => {
  const [filter, setFilter] = useState('all');

  const filteredAgents = filter === 'all' 
    ? agents 
    : agents.filter(agent => agent.category === filter);

  return (
    <section className="py-16 px-4 sm:px-6 md:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col md:flex-row items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900">Popular Agents</h2>
          <div className="mt-4 md:mt-0 flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
            <FilterButton 
              active={filter === 'all'} 
              onClick={() => setFilter('all')}
            >
              All
            </FilterButton>
            <FilterButton 
              active={filter === 'marketing'} 
              onClick={() => setFilter('marketing')}
            >
              Marketing
            </FilterButton>
            <FilterButton 
              active={filter === 'data'} 
              onClick={() => setFilter('data')}
            >
              Data
            </FilterButton>
            <FilterButton 
              active={filter === 'content'} 
              onClick={() => setFilter('content')}
            >
              Content
            </FilterButton>
            <FilterButton 
              active={filter === 'productivity'} 
              onClick={() => setFilter('productivity')}
            >
              Productivity
            </FilterButton>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAgents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FilterButton = ({ 
  children, 
  active, 
  onClick 
}: { 
  children: React.ReactNode; 
  active: boolean; 
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
      active
        ? 'bg-primary text-white shadow-sm'
        : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
    }`}
  >
    {children}
  </button>
);

export default AgentGrid;
