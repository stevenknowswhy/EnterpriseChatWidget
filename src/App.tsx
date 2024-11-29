import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import Layout from './components/Layout';
import AdminLayout from './components/shared/AdminLayout';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Companies from './pages/Companies';
import Settings from './pages/Settings';
import Support from './pages/Support';
import Chat from './pages/Chat';
import Notifications from './pages/Notifications';
import ProfileSettings from './pages/ProfileSettings';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/Dashboard';
import KnowledgeBase from './pages/admin/KnowledgeBase';
import ChatManagement from './pages/admin/ChatManagement';
import UserManagement from './pages/admin/UserManagement';
import DepartmentManagement from './pages/admin/DepartmentManagement';
import Analytics from './pages/admin/Analytics';
import Subscription from './pages/admin/Subscription';
import AdminSettings from './pages/admin/Settings';
import AdminProfile from './pages/admin/Profile';
import CompanySettings from './pages/admin/CompanySettings';
import AdminLogin from './pages/admin/AdminLogin';
import Unauthorized from './pages/admin/Unauthorized';
import RoleGuard from './components/guards/RoleGuard';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/unauthorized" element={<Unauthorized />} />

        {/* Regular user routes */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="chat" element={<Chat />} />
          <Route path="users" element={<Users />} />
          <Route path="companies" element={<Companies />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile-settings" element={<ProfileSettings />} />
          <Route path="support" element={<Support />} />
        </Route>

        {/* Admin routes */}
        <Route 
          path="/admin" 
          element={
            <RoleGuard allowedRoles={['company_admin', 'super_admin']}>
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            </RoleGuard>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="knowledge-base" element={<KnowledgeBase />} />
          <Route path="chat-management" element={<ChatManagement />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="department-management" element={<DepartmentManagement />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="subscription" element={<Subscription />} />
          <Route path="settings" element={<CompanySettings />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="admin-settings" element={<AdminSettings />} />
          {/* Redirect /admin to /admin/dashboard */}
          <Route index element={<AdminDashboard />} />
        </Route>

        {/* Catch-all route for unknown paths */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
