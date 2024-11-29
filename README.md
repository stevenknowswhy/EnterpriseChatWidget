# Enterprise Chat Widget

A modern, enterprise-grade chat widget built with React, TypeScript, and Tailwind CSS.

## Features

### User Management
- Firebase Authentication integration
- Profile management with customizable fields
- Profile photo upload and management
- Comprehensive personal information fields

### Preferences
- Dark/Light mode toggle
- Contrast adjustment settings
- Text size customization
- System features selection
- Reset to default options
- Persistent preferences storage

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

## Technology Stack

- React
- TypeScript
- Tailwind CSS
- Firebase (Authentication & Storage)
- Zustand (State Management)
  - Persist middleware for local storage

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
   - Enable Authentication and Storage
   - Copy your Firebase config to `.env`

4. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── components/         # Reusable UI components
├── pages/             # Page components
├── store/             # Zustand stores
│   ├── useAuthStore.ts
│   ├── usePreferencesStore.ts
│   └── useNotificationsStore.ts
├── lib/               # Utility functions and configurations
└── styles/            # Global styles and Tailwind config
```

## State Management

The application uses Zustand for state management with the following stores:

### Auth Store
- User authentication state
- Profile information

### Preferences Store
- UI preferences
- Accessibility settings
- System features

### Notifications Store
- Email notifications
- SMS preferences
- Work hours settings
- Notification permissions

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.