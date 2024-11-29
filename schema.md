# Enterprise Chat Widget - Data Schema

## Core Types

### User
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  companyId: string;
  createdAt: Date;
  lastLogin?: Date;
}
```

### Company
```typescript
interface Company {
  id: string;
  name: string;
  domain: string;
  complianceScore: number;
  status: 'active' | 'suspended';
  employeeCount: number;
  createdAt: Date;
}
```

### Compliance Metric
```typescript
interface ComplianceMetric {
  id: string;
  name: string;
  value: number;
  target: number;
  trend: number;
  status: 'success' | 'warning' | 'error';
}
```

### Audit Log
```typescript
interface AuditLog {
  id: string;
  timestamp: Date;
  action: string;
  userId: string;
  companyId: string;
  severity: 'low' | 'medium' | 'high';
}
```

### Notification
```typescript
interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'message' | 'alert' | 'update';
  timestamp: Date;
  read: boolean;
}
```

## State Management

### Authentication State
```typescript
interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}
```

### Theme Store
```typescript
interface ThemeStore {
  isDarkMode: boolean;
  toggleTheme: () => void;
}
```

## Feature Toggle
```typescript
interface FeatureToggle {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  category: 'chat' | 'platform';
}
```

## System Requirements
- TypeScript strict mode
- React 18+
- Zustand for state management
- Tailwind CSS for styling
- React Router for navigation
