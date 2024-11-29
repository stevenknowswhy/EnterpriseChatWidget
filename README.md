# Enterprise Chat Widget

## Overview
A comprehensive, modern enterprise communication platform built with React, TypeScript, and Tailwind CSS. Designed for seamless team collaboration and communication.

## Features

- 💬 Real-time chat functionality
- 🔔 Advanced notification system with dropdown and unread count
- 🌓 Dark/Light mode support
- 📊 Analytics dashboard with chat metrics
- 👥 User and company management
- ⚙️ Customizable settings
- 🎨 Modern UI with Tailwind CSS
- 📱 Responsive design

### Authentication
- Secure login system
- Role-based access control
- Persistent authentication state
- Protected routing

### Dark Mode
- Full dark mode support
- Responsive design across all components
- Smooth theme transitions
- Consistent color palette

### Dashboard
- Compliance tracking
- Audit log monitoring
- Real-time metrics visualization
- Interactive charts and statistics

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Zustand (State Management)
- React Router
- Lucide Icons
- Recharts

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/stevenknowswhy/EnterpriseChatWidget.git
cd EnterpriseChatWidget
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:5174](http://localhost:5174) in your browser

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── store/              # Zustand store configurations
├── types/              # TypeScript type definitions
├── styles/             # Global styles and Tailwind config
└── utils/              # Utility functions
```

## Features in Detail

### Chat System
- Real-time messaging
- Message history
- Typing indicators
- File attachments
- Read receipts

### Notification System
- Real-time notifications
- Unread count badge
- Notification categories (message, alert, update)
- Mark as read functionality
- Notification history page
- YouTube-style dropdown

### Dashboard
- Chat activity metrics
- User statistics
- Company overview
- Recent activity log

### User Management
- User profiles
- Role-based access control
- Company associations
- Activity tracking

## Authentication
Test Credentials:
- Email: `admin@example.com`
- Password: `password`

## Testing
- Comprehensive unit and integration tests
- Mock authentication for development
- Responsive design testing

## Current Limitations
- Mock authentication
- Needs backend integration
- Ongoing feature development

## Roadmap
- [ ] Implement full authentication backend
- [ ] Add internationalization
- [ ] Enhance performance optimization
- [ ] Comprehensive test coverage
- [ ] Advanced analytics and reporting

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.