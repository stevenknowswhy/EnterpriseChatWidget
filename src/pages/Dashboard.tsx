import React from 'react';
import { Shield, Users, Building2, AlertTriangle } from 'lucide-react';
import StatCard from '../components/stats/StatCard';
import ComplianceChart from '../components/charts/ComplianceChart';
import ComplianceOverview from '../components/dashboard/ComplianceOverview';
import AuditLogTable from '../components/dashboard/AuditLogTable';
import { ComplianceMetric, AuditLog } from '../types';

const mockMetrics: ComplianceMetric[] = [
  {
    id: '1',
    name: 'Data Protection',
    value: 92,
    target: 95,
    status: 'warning',
    trend: 2.5,
    lastUpdated: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Access Control',
    value: 88,
    target: 90,
    status: 'success',
    trend: 5,
    lastUpdated: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Risk Assessment',
    value: 78,
    target: 85,
    status: 'error',
    trend: -3,
    lastUpdated: new Date().toISOString()
  }
];

const mockAuditLogs: AuditLog[] = [
  {
    id: '1',
    action: 'User Login',
    userId: 'user123',
    companyId: 'company1',
    timestamp: new Date().toISOString(),
    details: 'Successful login attempt',
    severity: 'low'
  },
  {
    id: '2',
    action: 'Policy Update',
    userId: 'admin456',
    companyId: 'company2',
    timestamp: new Date().toISOString(),
    details: 'Updated security policy',
    severity: 'medium'
  }
];

const Dashboard = () => {
  const chartData = [
    { name: 'Jan', score: 85 },
    { name: 'Feb', score: 88 },
    { name: 'Mar', score: 92 },
    { name: 'Apr', score: 90 },
    { name: 'May', score: 95 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Shield}
          title="Overall Compliance"
          value="92%"
          trend="+5%"
          trendUp={true}
        />
        <StatCard
          icon={Users}
          title="Active Users"
          value="1,234"
          trend="+12"
          trendUp={true}
        />
        <StatCard
          icon={Building2}
          title="Companies"
          value="48"
          trend="+3"
          trendUp={true}
        />
        <StatCard
          icon={AlertTriangle}
          title="Alerts"
          value="7"
          trend="-2"
          trendUp={false}
        />
      </div>

      <ComplianceChart data={chartData} />
      <ComplianceOverview metrics={mockMetrics} />
      <AuditLogTable logs={mockAuditLogs} />
    </div>
  );
};

export default Dashboard;
