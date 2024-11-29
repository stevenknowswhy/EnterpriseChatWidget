import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Book,
  BarChart2,
  Building2,
  Settings,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  User,
  Bell,
  HelpCircle
} from 'lucide-react';

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

const mainNavItems: NavItem[] = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { path: '/admin/knowledge-base', label: 'Knowledge Base', icon: <Book size={20} /> },
  { path: '/admin/chat', label: 'Chat Management', icon: <MessageSquare size={20} />, badge: 3 },
  { path: '/admin/users', label: 'User Management', icon: <Users size={20} /> },
  { path: '/admin/departments', label: 'Departments', icon: <Building2 size={20} /> },
  { path: '/admin/analytics', label: 'Analytics', icon: <BarChart2 size={20} /> },
];

const secondaryNavItems: NavItem[] = [
  { path: '/admin/subscription', label: 'Subscription', icon: <CreditCard size={20} /> },
  { path: '/admin/settings', label: 'Settings', icon: <Settings size={20} /> },
  { path: '/admin/profile', label: 'Profile', icon: <User size={20} /> },
  { path: '/admin/notifications', label: 'Notifications', icon: <Bell size={20} />, badge: 5 },
  { path: '/admin/help', label: 'Help & Support', icon: <HelpCircle size={20} /> },
];

const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const NavItem = ({ item }: { item: NavItem }) => {
    const isActive = location.pathname === item.path;
    
    return (
      <NavLink
        to={item.path}
        className={`
          flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative
          ${isActive 
            ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' 
            : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800'
          }
        `}
      >
        <span className={`
          ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}
        `}>
          {item.icon}
        </span>
        {!isCollapsed && (
          <>
            <span className="font-medium">{item.label}</span>
            {item.badge && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold py-0.5 px-2 rounded-full">
                {item.badge}
              </span>
            )}
          </>
        )}
        {isCollapsed && item.badge && (
          <span className="absolute -right-1 -top-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {item.badge}
          </span>
        )}
      </NavLink>
    );
  };

  return (
    <div className={`
      bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
      transition-all duration-300 flex flex-col
      ${isCollapsed ? 'w-20' : 'w-64'}
    `}>
      {/* Header */}
      <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-800">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <Building2 className="text-blue-600" size={24} />
            <span className="font-bold text-gray-900 dark:text-white">
              Admin Portal
            </span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight size={20} className="text-gray-500 dark:text-gray-400" />
          ) : (
            <ChevronLeft size={20} className="text-gray-500 dark:text-gray-400" />
          )}
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        <div className="space-y-1">
          {mainNavItems.map((item) => (
            <NavItem key={item.path} item={item} />
          ))}
        </div>

        <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-800">
          {secondaryNavItems.map((item) => (
            <NavItem key={item.path} item={item} />
          ))}
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <button className="flex items-center gap-3 w-full hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium">
            JD
          </div>
          {!isCollapsed && (
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-gray-900 dark:text-white">John Doe</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Company Admin</p>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
