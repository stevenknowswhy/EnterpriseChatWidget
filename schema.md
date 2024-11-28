# Enterprise Chat Widget Schema

## Core Types

### Chat Message
```typescript
interface ChatMessage {
  id: string;
  content: string;
  sender: User;
  timestamp: string;
  read: boolean;
  attachments?: Attachment[];
  replyTo?: ChatMessage;
}
```

### User
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'support';
  avatar?: string;
  companyId: string;
  status: 'online' | 'offline' | 'away';
  lastActive: string;
}
```

### Company
```typescript
interface Company {
  id: string;
  name: string;
  industry: string;
  size: string;
  chatScore: number;
  lastActive: string;
  settings: CompanySettings;
}
```

### Notification
```typescript
interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'message' | 'alert' | 'update';
}
```

### Chat Metric
```typescript
interface ChatMetric {
  id: string;
  name: string;
  value: number;
  status: 'success' | 'warning' | 'error' | 'info';
  trend: 'up' | 'down' | 'stable';
}
```

## Settings Types

### Company Settings
```typescript
interface CompanySettings {
  theme: {
    primary: string;
    logo?: string;
  };
  notifications: {
    email: boolean;
    desktop: boolean;
    sound: boolean;
  };
  chat: {
    autoResponse: boolean;
    fileSharing: boolean;
    maxFileSize: number;
  };
}
```

### User Settings
```typescript
interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  notifications: {
    email: boolean;
    desktop: boolean;
    sound: boolean;
  };
  privacy: {
    showStatus: boolean;
    readReceipts: boolean;
  };
}
```

## Auxiliary Types

### Attachment
```typescript
interface Attachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
}
```

### Audit Log
```typescript
interface AuditLog {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  details: string;
}
```

### Chat Thread
```typescript
interface ChatThread {
  id: string;
  participants: User[];
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'archived' | 'closed';
}
```

## State Management

The application uses Zustand for state management with the following stores:

### Chat Store
- Manages active chat threads
- Handles message sending/receiving
- Tracks typing indicators
- Manages read receipts

### Notification Store
- Tracks notifications
- Manages unread count
- Handles notification preferences
- Controls notification display

### User Store
- Manages user authentication
- Handles user preferences
- Controls user status
- Manages user settings

### Theme Store
- Manages theme preferences
- Handles dark/light mode
- Controls company branding

## API Endpoints

The application expects the following API endpoints:

### Chat
- `GET /api/chats` - List chat threads
- `GET /api/chats/:id` - Get chat thread
- `POST /api/chats` - Create chat thread
- `POST /api/chats/:id/messages` - Send message
- `PUT /api/messages/:id/read` - Mark message as read

### Users
- `GET /api/users` - List users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user
- `PUT /api/users/:id/status` - Update user status

### Notifications
- `GET /api/notifications` - List notifications
- `PUT /api/notifications/:id/read` - Mark notification as read
- `PUT /api/notifications/read-all` - Mark all notifications as read

### Companies
- `GET /api/companies` - List companies
- `GET /api/companies/:id` - Get company
- `PUT /api/companies/:id` - Update company
- `PUT /api/companies/:id/settings` - Update company settings
