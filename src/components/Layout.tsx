import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import NotificationDropdown from './NotificationDropdown';
import { useThemeStore } from '../store/useThemeStore';
import { useNotificationStore } from '../store/useNotificationStore';
import { Sun, Moon, Bell } from 'lucide-react';

const Layout = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { unreadCount } = useNotificationStore();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <div className="flex-1">
          <header className="sticky top-0 z-50 glass-effect">
            <div className="px-6 py-4 flex justify-between items-center">
              <h1 className="text-xl font-semibold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Enterprise Chat Widget
              </h1>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <button
                    onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                    className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <Bell size={20} className={`${isDarkMode ? 'text-blue-300' : ''}`} />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                  <NotificationDropdown
                    isOpen={isNotificationOpen}
                    onClose={() => setIsNotificationOpen(false)}
                  />
                </div>
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {isDarkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
                </button>
                <div className="flex items-center gap-3 pl-4 border-l dark:border-gray-700">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-medium">
                    JD
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Admin</p>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <main className="p-6 animate-in">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
