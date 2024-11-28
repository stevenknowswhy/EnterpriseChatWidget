import React from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { ComplianceMetric } from '../../types';

interface ComplianceOverviewProps {
  metrics: ComplianceMetric[];
}

const ComplianceOverview = ({ metrics }: ComplianceOverviewProps) => {
  const getStatusIcon = (status: ComplianceMetric['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="text-green-500" size={24} />;
      case 'warning':
        return <AlertTriangle className="text-yellow-500" size={24} />;
      case 'error':
        return <XCircle className="text-red-500" size={24} />;
      default:
        return <Shield className="text-blue-500" size={24} />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {metrics.map((metric) => (
        <div key={metric.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">{metric.name}</h3>
            {getStatusIcon(metric.status)}
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Current</span>
              <span className="font-semibold">{metric.value}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Target</span>
              <span className="font-semibold">{metric.target}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Trend</span>
              <span className={metric.trend >= 0 ? 'text-green-500' : 'text-red-500'}>
                {metric.trend >= 0 ? '+' : ''}{metric.trend}%
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComplianceOverview;
