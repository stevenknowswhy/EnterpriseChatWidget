export type UserRole = 'user' | 'company_admin' | 'super_admin';

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  role: UserRole;
  companyId?: string;
  photoURL?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CompanyAdmin extends User {
  role: 'company_admin';
  companyName: string;
  companySize?: string;
  industry?: string;
  phone?: string;
}
