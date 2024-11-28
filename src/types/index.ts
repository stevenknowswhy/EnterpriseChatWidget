export interface User {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'admin' | 'user';
  companyId: string;
  status: 'active' | 'inactive';
  lastLogin?: string;
  createdAt: string;
}

export interface ChatMetric {
  id: string;
  name: string;
  value: number;
  status: 'success' | 'warning' | 'error' | 'info';
  trend: 'up' | 'down' | 'stable';
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  size: string;
  chatScore: number;
  lastActive: string;
}

export interface AuditLog {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  details: string;
}

export interface ChatFramework {
  id: string;
  name: string;
  description: string;
  features: ChatFeature[];
}

export interface ChatFeature {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
}
