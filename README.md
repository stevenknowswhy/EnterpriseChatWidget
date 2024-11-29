# Enterprise Chat Widget

A modern, enterprise-grade chat widget built with React, TypeScript, and Tailwind CSS.

## Features

### Company Admin Dashboard
- Complete admin authentication system
- Role-based access control
- Company profile management
- Department management
- User management
- Analytics dashboard
- Knowledge base management
- Subscription management
- Company-wide settings

### User Management
- Firebase Authentication integration
- Multi-role support (User, Company Admin)
- Profile management with customizable fields
- Profile photo upload and management
- Comprehensive personal information fields
- Profile dropdown menu with click-outside behavior
- Quick access to Settings and Profile Settings

### Accessibility & Display
- Dark/Light mode toggle
- Contrast adjustment settings
- Text size customization
- System features selection
- Reset to default options
- Persistent preferences storage
- Comprehensive accessibility controls
- Language and localization settings
  - Multiple language support
  - Time zone selection
  - Currency format
  - Date format preferences

### Notifications
- Email notification preferences
- SMS notification settings
  - Configurable phone number selection (work/personal/other)
  - Custom phone number input
  - SMS permission management
- After-hours notification control
  - Customizable work hours
  - Default: 9 AM - 5 PM
- Persistent notification preferences

### UI/UX
- Modern, responsive design
- Dark mode support
- Accessible interface
- Intuitive navigation
- Tailwind CSS styling
- Smooth transitions and animations
- Click-outside behavior for dropdowns
- Consistent UI patterns

### Authentication & Routing
- Implemented role-based authentication routing
- Super Admin and Company Admin automatically redirected to `/admin/dashboard`
- Secure role-based access control
- Flexible login and registration flow
- Comprehensive error handling for authentication processes

## Technology Stack

- React
- TypeScript
- Tailwind CSS
- Firebase
  - Authentication
  - Firestore Database
  - Storage
  - Analytics
- Zustand (State Management)
  - Persist middleware for local storage
- Custom React Hooks
  - useClickOutside for improved UX
  - useProfile for profile management
  - useRoleGuard for access control

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/enterprise-chat-widget.git
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase:
   - Create a Firebase project
   - Enable Authentication, Firestore, Storage, and Analytics
   - Copy your Firebase config to `.env`
   - Set up Firestore rules for role-based access

4. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── shared/        # Shared components
│   └── guards/        # Route protection components
├── pages/             # Page components
│   ├── admin/         # Admin dashboard pages
│   └── user/          # User pages
├── store/             # Zustand stores
│   ├── useAuthStore.ts
│   ├── usePreferencesStore.ts
│   └── useNotificationsStore.ts
├── hooks/             # Custom React hooks
├── config/            # Configuration files
├── types/             # TypeScript types
└── styles/            # Global styles and Tailwind config
```

## Database Schema

### Users Collection
```typescript
interface User {
  uid: string;
  email: string;
  displayName: string;
  firstName?: string;
  lastName?: string;
  preferredName?: string;
  username?: string;
  role: 'user' | 'company_admin' | 'super_admin';
  companyId?: string;  // For company admins
  phone?: string;
  bio?: string;
  profilePhotoUrl?: string;
  preferences?: {
    darkMode?: boolean;
    language?: string;
    timezone?: string;
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### Companies Collection
```typescript
interface Company {
  id: string;
  companyName: string;
  adminId: string;
  industry?: string;
  subscriptionTier: string;
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
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

## Access Control

The application implements role-based access control:

- **Users**: Can access chat widget and personal settings
- **Company Admins**: Full access to company dashboard and management features
- **Super Admins**: System-wide access and management capabilities

## Routes

- `/` - Main chat widget
- `/profile` - User profile settings
- `/admin/login` - Company admin login/registration
- `/admin/dashboard` - Admin dashboard
- `/admin/knowledge-base` - Knowledge base management
- `/admin/chat-management` - Chat configuration
- `/admin/user-management` - User management
- `/admin/department-management` - Department management
- `/admin/analytics` - Analytics dashboard
- `/admin/subscription` - Subscription management
- `/admin/settings` - Company settings
- `/admin/profile` - Admin profile

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.