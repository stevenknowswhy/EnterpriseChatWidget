import React from 'react';
import { MessageSquare, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { ChatMetric } from '../../types';

interface ChatOverviewProps {
  metrics: ChatMetric[];
}

const ChatOverview = ({ metrics }: ChatOverviewProps) => {
  const getStatusIcon = (status: ChatMetric['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="text-green-500" size={24} />;
      case 'warning':
        return <AlertTriangle className="text-yellow-500" size={24} />;
      case 'error':
        return <XCircle className="text-red-500" size={24} />;
      default:
        return <MessageSquare className="text-blue-500" size={24} />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {metrics.map((metric) => (
        <div
          key={metric.id}
          className="bg-white p-6 rounded-lg shadow-sm flex items-start gap-4"
        >
          <div className="flex-shrink-0">{getStatusIcon(metric.status)}</div>
          <div>
            <h3 className="font-medium text-gray-900">{metric.name}</h3>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-semibold">{metric.value}</span>
              <span
                className={`text-sm ${
                  metric.trend === 'up'
                    ? 'text-green-600'
                    : metric.trend === 'down'
                    ? 'text-red-600'
                    : 'text-gray-600'
                }`}
              >
                {metric.trend === 'up' ? '↑' : metric.trend === 'down' ? '↓' : '→'}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatOverview;
