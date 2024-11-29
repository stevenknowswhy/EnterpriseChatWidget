import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

const Unauthorized = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const handleBack = () => {
    // Navigate based on user role
    if (user?.role === 'user') {
      navigate('/');
    } else if (user?.role === 'company_admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center px-4">
      <ShieldAlert className="w-16 h-16 text-red-500 mb-4" />
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Access Denied
      </h1>
      <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
        You don't have permission to access this page.
      </p>
      <button
        onClick={handleBack}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <ArrowLeft size={20} />
        Go Back
      </button>
    </div>
  );
};

export default Unauthorized;
