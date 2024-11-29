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

## Firestore Collections

### Users Collection
```typescript
interface User {
  uid: string;
  email: string;
  displayName: string;
  role: 'user' | 'company_admin' | 'super_admin';
  companyId?: string;  // For company admins and company users
  phone?: string;
  photo?: string;
  bannerPhoto?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastLogin?: Timestamp;
  status: 'active' | 'inactive' | 'suspended';
  preferences?: {
    theme: 'light' | 'dark' | 'system';
    language: string;
    timezone: string;
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
  };
}
```

### Companies Collection
```typescript
interface Company {
  id: string;
  companyName: string;
  adminId: string;
  industry?: string;
  domain?: string;
  logo?: string;
  subscriptionTier: 'free' | 'basic' | 'pro' | 'enterprise';
  status: 'active' | 'suspended' | 'cancelled';
  employeeCount: number;
  settings: {
    allowedDomains: string[];
    ssoEnabled: boolean;
    chatFeatures: {
      fileSharing: boolean;
      videoCall: boolean;
      screenSharing: boolean;
      customization: boolean;
    };
  };
  billing: {
    plan: string;
    nextBillingDate: Timestamp;
    paymentMethod?: string;
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### Departments Collection
```typescript
interface Department {
  id: string;
  companyId: string;
  name: string;
  description?: string;
  managerId?: string;
  parentDepartmentId?: string;
  members: string[];  // User IDs
  settings: {
    autoAssignment: boolean;
    workingHours: {
      start: string;
      end: string;
      timezone: string;
    };
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### Knowledge Base Collection
```typescript
interface KnowledgeBaseArticle {
  id: string;
  companyId: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  authorId: string;
  status: 'draft' | 'published' | 'archived';
  viewCount: number;
  helpfulCount: number;
  lastUpdatedBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  publishedAt?: Timestamp;
}
```

### Chat Sessions Collection
```typescript
interface ChatSession {
  id: string;
  companyId: string;
  departmentId?: string;
  userId: string;
  agentId?: string;
  status: 'active' | 'closed' | 'transferred';
  startedAt: Timestamp;
  endedAt?: Timestamp;
  metadata: {
    browser: string;
    os: string;
    device: string;
    location?: string;
  };
  ratings?: {
    satisfaction: number;
    comment?: string;
    ratedAt: Timestamp;
  };
}
```

### Analytics Collection
```typescript
interface AnalyticsData {
  id: string;
  companyId: string;
  type: 'daily' | 'weekly' | 'monthly';
  period: string;
  metrics: {
    totalSessions: number;
    averageResponseTime: number;
    satisfactionScore: number;
    resolvedChats: number;
    activeUsers: number;
    peakHours: {
      hour: number;
      count: number;
    }[];
  };
  departmentMetrics: {
    [departmentId: string]: {
      sessions: number;
      responseTime: number;
      satisfaction: number;
    };
  };
  createdAt: Timestamp;
}
```

### Audit Logs Collection
```typescript
interface AuditLog {
  id: string;
  companyId: string;
  userId: string;
  action: string;
  resource: string;
  resourceId: string;
  changes?: {
    before: any;
    after: any;
  };
  metadata: {
    ip: string;
    userAgent: string;
    location?: string;
  };
  timestamp: Timestamp;
  severity: 'low' | 'medium' | 'high';
}
```

## User Profile

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
  bannerPhoto?: string;
}

interface PersonalInfo {
  firstName: string;
  lastName: string;
  preferredName?: string;
  email: string;
  bio?: string;
  pronouns?: string;
  phone?: string;
  address?: string;
  address2?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  maritalStatus?: string;
  placeOfBirth?: string;
  gender?: string;
  dateOfBirth?: string;
  birthTime?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactEmail?: string;
  socialMedia?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
}
```

## Notifications

```typescript
interface Notification {
  id: string;
  userId: string;
  companyId?: string;
  title: string;
  message: string;
  type: 'message' | 'alert' | 'update' | 'system';
  priority: 'low' | 'medium' | 'high';
  read: boolean;
  action?: {
    type: string;
    url?: string;
    data?: any;
  };
  metadata?: {
    sender?: string;
    category?: string;
    tags?: string[];
  };
  createdAt: Timestamp;
  expiresAt?: Timestamp;
}

interface NotificationsState {
  emailNotifications: boolean;
  smsNotifications: boolean;
  afterHoursNotifications: boolean;
  workStartTime: string;
  workEndTime: string;
  smsPhoneType: PhoneType;
  otherPhoneNumber: string;
  smsPermissionGranted: boolean;
  setNotificationPreference: (
    key: 'emailNotifications' | 'smsNotifications' | 'afterHoursNotifications' | 'smsPermissionGranted',
    value: boolean
  ) => void;
  setWorkHours: (startTime: string, endTime: string) => void;
  setSmsPhoneType: (phoneType: PhoneType) => void;
  setOtherPhoneNumber: (phoneNumber: string) => void;
  resetNotifications: () => void;
}

const defaultNotifications = {
  emailNotifications: true,
  smsNotifications: false,
  afterHoursNotifications: false,
  workStartTime: '09:00',
  workEndTime: '17:00',
  smsPhoneType: 'work',
  otherPhoneNumber: '',
  smsPermissionGranted: true,
};
```

## Authentication

```typescript
interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (user: User) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}
```

## Component Props

### ToggleSwitch
```typescript
interface ToggleSwitchProps {
  enabled: boolean;
  onChange: () => void;
  label: string;
  description: string;
}
```

### Panels
```typescript
interface PanelProps {
  className?: string;
  children: React.ReactNode;
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

## System Requirements
- TypeScript strict mode
- React 18+
- Zustand for state management
- Tailwind CSS for styling
- React Router for navigation
