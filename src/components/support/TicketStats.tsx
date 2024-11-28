import React from 'react';
import { Ticket, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

const TicketStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Open Tickets</p>
            <p className="text-2xl font-semibold mt-1">25</p>
          </div>
          <Ticket className="text-blue-500" size={24} />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">In Progress</p>
            <p className="text-2xl font-semibold mt-1">15</p>
          </div>
          <Clock className="text-yellow-500" size={24} />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">High Priority</p>
            <p className="text-2xl font-semibold mt-1">8</p>
          </div>
          <AlertTriangle className="text-red-500" size={24} />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Resolution Rate</p>
            <p className="text-2xl font-semibold mt-1">95%</p>
          </div>
          <CheckCircle className="text-green-500" size={24} />
        </div>
      </div>
    </div>
  );
};

export default TicketStats;
