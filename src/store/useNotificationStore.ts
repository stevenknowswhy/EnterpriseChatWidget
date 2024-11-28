import { create } from 'zustand';

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'message' | 'alert' | 'update';
}

interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [
    {
      id: '1',
      title: 'New Message',
      message: 'You have a new message from the support team',
      timestamp: new Date().toISOString(),
      read: false,
      type: 'message'
    },
    {
      id: '2',
      title: 'System Update',
      message: 'New features have been added to the chat widget',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      read: false,
      type: 'update'
    },
    {
      id: '3',
      title: 'Alert',
      message: 'High usage detected in production environment',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      read: false,
      type: 'alert'
    }
  ],
  unreadCount: 3,
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        {
          ...notification,
          id: Math.random().toString(36).substr(2, 9),
          read: false
        },
        ...state.notifications
      ],
      unreadCount: state.unreadCount + 1
    })),
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
      unreadCount: state.unreadCount - 1
    })),
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0
    }))
}));
