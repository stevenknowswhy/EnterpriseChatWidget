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
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  bannerPhoto?: string;
}
```

## Preferences

```typescript
interface PreferencesState {
  defaultMode: 'light' | 'dark';
  increaseContrast: boolean;
  displayContrast: number;
  textSize: number;
  systemFeatures: string[];
  setPreference: <K extends keyof Omit<PreferencesState, 'setPreference' | 'resetPreferences'>>(
    key: K,
    value: PreferencesState[K]
  ) => void;
  resetPreferences: () => void;
}

const defaultPreferences = {
  defaultMode: 'light',
  increaseContrast: false,
  displayContrast: 50,
  textSize: 100,
  systemFeatures: [],
};
```

## Notifications

```typescript
type PhoneType = 'work' | 'personal' | 'other';

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

The application uses Zustand for state management with persist middleware for local storage. Each store (Auth, Preferences, Notifications) maintains its own state and provides actions to modify that state.

## System Requirements
- TypeScript strict mode
- React 18+
- Zustand for state management
- Tailwind CSS for styling
- React Router for navigation
