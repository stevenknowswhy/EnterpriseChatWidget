import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  Settings, 
  HelpCircle,
  Menu,
  Box,
  Bell,
  MessageSquare,
  Activity
} from 'lucide-react';
import { useState } from 'react';
import { useNotificationStore } from '../store/useNotificationStore';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { unreadCount } = useNotificationStore();

  const navItems = [
    { icon: Activity, label: 'Dashboard', path: '/' },
    { icon: MessageSquare, label: 'Chat', path: '/chat', badge: 3 },
    { icon: Users, label: 'Users', path: '/users' },
    { icon: Building2, label: 'Companies', path: '/companies' },
    { icon: Bell, label: 'Notifications', path: '/notifications', badge: unreadCount },
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: HelpCircle, label: 'Support', path: '/support' },
  ];

  return (
    <div className={`bg-[#1b1a1e] border-r border-border/10 transition-all duration-300 flex flex-col ${
      isCollapsed ? 'w-20' : 'w-72'
    }`}>
      <div className="p-4 flex justify-between items-center border-b border-border/10">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <Box className="text-primary" size={24} />
            <span className="font-bold text-white">
              Enterprise Chat Widget
            </span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-white/5 rounded-lg transition-colors"
        >
          <Menu size={20} className="text-white/70" />
        </button>
      </div>
      
      <nav className="mt-4 px-2 flex-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all relative ${
                isActive
                  ? 'bg-white/10 text-white'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <item.icon size={20} />
            {!isCollapsed && (
              <>
                <span>{item.label}</span>
                {item.badge && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold py-0.5 px-2 rounded-full shadow-md animate-pulse-soft">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </>
            )}
            {isCollapsed && item.badge && (
              <span className="absolute -right-1 top-0 bg-primary w-4 h-4 text-xs flex items-center justify-center rounded-full">
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto p-4 border-t border-border/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-purple-600 flex items-center justify-center text-white font-medium">
            JD
          </div>
          {!isCollapsed && (
            <div>
              <p className="text-sm font-medium text-white">John Doe</p>
              <p className="text-xs text-white/50">Super Admin</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
