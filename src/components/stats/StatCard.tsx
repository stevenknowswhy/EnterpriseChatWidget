import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  trend: string;
  trendUp: boolean;
}

const StatCard = ({ icon: Icon, title, value, trend, trendUp }: StatCardProps) => {
  return (
    <div className="bg-card p-6 rounded-xl shadow-sm card-hover">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold mt-1 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            {value}
          </p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon className="text-primary" size={24} />
        </div>
      </div>
      <div className={`mt-4 text-sm flex items-center gap-1 ${
        trendUp ? 'text-green-500' : 'text-red-500'
      }`}>
        {trendUp ? '↑' : '↓'} {trend}
        <span className="text-gray-500 dark:text-gray-400 text-xs">vs last month</span>
      </div>
    </div>
  );
};

export default StatCard;
