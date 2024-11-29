import React from 'react';
import { BarChart2, Users, MessageSquare, Bot } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, trend }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">{value}</p>
        {change && (
          <p className={`text-sm mt-1 ${
            trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          }`}>
            {trend === 'up' ? '↑' : '↓'} {change}
          </p>
        )}
      </div>
      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        {icon}
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome back, here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Departments"
          value="12"
          change="2 new this month"
          icon={<Users size={24} className="text-blue-600 dark:text-blue-400" />}
          trend="up"
        />
        <StatCard
          title="Active Employees"
          value="284"
          change="14% increase"
          icon={<Users size={24} className="text-blue-600 dark:text-blue-400" />}
          trend="up"
        />
        <StatCard
          title="Total Chats"
          value="1,234"
          change="32% this week"
          icon={<MessageSquare size={24} className="text-blue-600 dark:text-blue-400" />}
          trend="up"
        />
        <StatCard
          title="AI Resolution Rate"
          value="76%"
          change="5% improvement"
          icon={<Bot size={24} className="text-blue-600 dark:text-blue-400" />}
          trend="up"
        />
      </div>

      {/* Placeholder for charts and other dashboard components */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm min-h-[400px]">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Chat Volume Trends
          </h2>
          <div className="flex items-center justify-center h-[300px] text-gray-400">
            Chart placeholder
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm min-h-[400px]">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Department Performance
          </h2>
          <div className="flex items-center justify-center h-[300px] text-gray-400">
            Chart placeholder
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
