import React from 'react';
import { Search, Filter } from 'lucide-react';

interface TicketFiltersProps {
  onFilterChange: (filters: any) => void;
}

const TicketFilters = ({ onFilterChange }: TicketFiltersProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Status
          </label>
          <select 
            className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
            onChange={(e) => onFilterChange({ status: e.target.value })}
          >
            <option value="all">All Tickets</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Priority
          </label>
          <select 
            className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
            onChange={(e) => onFilterChange({ priority: e.target.value })}
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Company
          </label>
          <select 
            className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
            onChange={(e) => onFilterChange({ company: e.target.value })}
          >
            <option value="all">All Companies</option>
            <option value="tech_corp">Tech Corp</option>
            <option value="startup_inc">StartUp Inc</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Date Range
          </label>
          <input 
            type="date" 
            className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
            onChange={(e) => onFilterChange({ date: e.target.value })}
          />
        </div>
      </div>
      
      <div className="mt-4 flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search tickets..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
              onChange={(e) => onFilterChange({ search: e.target.value })}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          <Filter size={20} className="mr-2" />
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default TicketFilters;
