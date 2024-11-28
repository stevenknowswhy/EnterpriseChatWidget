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

export interface ComplianceMetric {
  id: string;
  name: string;
  value: number;
  target: number;
  status: 'success' | 'warning' | 'error';
  trend: number;
  lastUpdated: string;
}

export interface Company {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  complianceScore: number;
  employeeCount: number;
  industry: string;
  subscription: 'basic' | 'professional' | 'enterprise';
  createdAt: string;
  lastAudit?: string;
}

export interface AuditLog {
  id: string;
  action: string;
  userId: string;
  companyId: string;
  timestamp: string;
  details: string;
  severity: 'low' | 'medium' | 'high';
}

export interface ComplianceFramework {
  id: string;
  name: string;
  description: string;
  version: string;
  status: 'active' | 'draft' | 'archived';
  controls: ComplianceControl[];
}

export interface ComplianceControl {
  id: string;
  code: string;
  title: string;
  description: string;
  category: string;
  risk: 'low' | 'medium' | 'high';
  status: 'implemented' | 'in_progress' | 'not_implemented';
}
