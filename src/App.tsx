import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import AdminDashboard from './pages/admin/Dashboard';
import AdminLogin from './pages/admin/AdminLogin';
import AdminProfile from './pages/admin/Profile';
import Help from './pages/admin/Help';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProfileSettings from './pages/ProfileSettings';
import NotFound from './pages/NotFound';
import RoleGuard from './components/guards/RoleGuard';
import Layout from './components/Layout';
import AdminLayout from './components/shared/AdminLayout';
import Users from './pages/Users';
import Companies from './pages/Companies';
import Settings from './pages/Settings';
import Support from './pages/Support';
import Chat from './pages/Chat';
import Notifications from './pages/Notifications';
import KnowledgeBase from './pages/admin/KnowledgeBase';
import ChatManagement from './pages/admin/ChatManagement';
import UserManagement from './pages/admin/UserManagement';
import DepartmentManagement from './pages/admin/DepartmentManagement';
import Analytics from './pages/admin/Analytics';
import Subscription from './pages/admin/Subscription';
import AdminSettings from './pages/admin/Settings';
import CompanySettings from './pages/admin/CompanySettings';

const App: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <Login />
            ) : user?.role === 'super_admin' ? (
              <Navigate to="/admin/dashboard" replace />
            ) : user?.role === 'company_admin' ? (
              <Navigate to="/admin/dashboard" replace />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <RoleGuard allowedRoles={['company_admin', 'super_admin']}>
              <AdminLayout>
                <Routes>
                  <Route index element={<Navigate to="dashboard" replace />} />
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="profile" element={<AdminProfile />} />
                  <Route path="knowledge-base" element={<KnowledgeBase />} />
                  <Route path="chat-management" element={<ChatManagement />} />
                  <Route path="user-management" element={<UserManagement />} />
                  <Route path="department-management" element={<DepartmentManagement />} />
                  <Route path="analytics" element={<Analytics />} />
                  <Route path="subscription" element={<Subscription />} />
                  <Route path="settings" element={<CompanySettings />} />
                  <Route path="admin-settings" element={<AdminSettings />} />
                  <Route path="help" element={<Help />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AdminLayout>
            </RoleGuard>
          }
        />

        {/* Protected User Routes */}
        <Route
          path="/*"
          element={
            <RoleGuard allowedRoles={['user', 'company_admin', 'super_admin']}>
              <Layout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="profile-settings" element={<ProfileSettings />} />
                  <Route path="users" element={<Users />} />
                  <Route path="companies" element={<Companies />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="chat" element={<Chat />} />
                  <Route path="notifications" element={<Notifications />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
            </RoleGuard>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
