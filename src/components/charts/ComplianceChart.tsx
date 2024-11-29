import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ComplianceData {
  name: string;
  score: number;
}

interface ComplianceChartProps {
  data: ComplianceData[];
}

const ComplianceChart = ({ data }: ComplianceChartProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Compliance Trend</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="currentColor" 
              className="text-gray-200 dark:text-gray-700"
            />
            <XAxis 
              dataKey="name" 
              tick={{ 
                fill: 'currentColor', 
                className: 'text-gray-600 dark:text-gray-300' 
              }} 
            />
            <YAxis 
              tick={{ 
                fill: 'currentColor', 
                className: 'text-gray-600 dark:text-gray-300' 
              }} 
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'currentColor', 
                color: 'currentColor',
                className: 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg' 
              }}
              labelStyle={{ color: 'currentColor', className: 'text-gray-900 dark:text-white' }}
            />
            <Bar 
              dataKey="score" 
              fill="#3B82F6" 
              className="transition-colors duration-300"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ComplianceChart;
