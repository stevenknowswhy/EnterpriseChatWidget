export type UserRole = 'user' | 'company_admin' | 'super_admin';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  companyName?: string;
  industry?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Company {
  companyName: string;
  adminId: string;
  industry?: string;
  createdAt: Date;
  updatedAt: Date;
}
