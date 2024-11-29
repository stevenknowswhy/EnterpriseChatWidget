import React, { useState } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import NotificationDropdown from './NotificationDropdown';
import { useThemeStore } from '../store/useThemeStore';
import { useNotificationStore } from '../store/useNotificationStore';
import { useAuthStore } from '../store/useAuthStore';
import { Sun, Moon, Bell, ChevronDown, LogOut, Settings } from 'lucide-react';

const Layout = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { unreadCount } = useNotificationStore();
  const { user, logout } = useAuthStore();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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
                <div className="relative">
                  <button 
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-3 pl-4 border-l dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-700 dark:to-pink-700 flex items-center justify-center text-white font-medium">
                      {user?.name?.charAt(0).toUpperCase() || 'JD'}
                    </div>
                    <div className="hidden sm:block">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name || 'John Doe'}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{user?.role || 'Admin'}</p>
                    </div>
                    <ChevronDown size={16} className="ml-2 text-gray-500 dark:text-gray-400" />
                  </button>
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                      <div className="py-1">
                        <button 
                          onClick={() => {
                            navigate('/settings');
                            setIsUserMenuOpen(false);
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <Settings size={16} className="mr-3" />
                          Settings
                        </button>
                        <Link
                          to="/profile-settings"
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          Profile Settings
                        </Link>
                        <button 
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <LogOut size={16} className="mr-3" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
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
