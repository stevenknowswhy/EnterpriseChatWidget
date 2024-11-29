import React, { useState } from 'react';
import { 
  User as UserIcon, Mail, Settings, Bell, MessageSquare, Globe, Eye, 
  Plus, ArrowLeft, Camera, Edit, Trash2, RotateCcw, Phone, User, 
  Heart, AlertCircle, Share2, Building2, Briefcase, Shield
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { auth } from '../../lib/firebase';
import { updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const inputClasses = "w-full px-4 h-12 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200";
const labelClasses = "block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2";

interface CompanyInfo {
  companyName: string;
  industry: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  foundedYear?: string;
  employeeCount?: string;
  website?: string;
}

type TabType = 'basic' | 'contact' | 'company' | 'preferences';

const tabs: { id: TabType; label: string; icon: React.ReactNode; color: string }[] = [
  { 
    id: 'basic', 
    label: 'Basic Info',
    icon: <User size={18} />,
    color: 'from-blue-500 to-blue-600'
  },
  { 
    id: 'contact', 
    label: 'Contact',
    icon: <Phone size={18} />,
    color: 'from-purple-500 to-purple-600'
  },
  { 
    id: 'company', 
    label: 'Company Details',
    icon: <Building2 size={18} />,
    color: 'from-green-500 to-green-600'
  },
  { 
    id: 'preferences', 
    label: 'Preferences',
    icon: <Settings size={18} />,
    color: 'from-orange-500 to-orange-600'
  }
];

const Profile: React.FC = () => {
  const { user, login } = useAuthStore();
  const [activeTab, setActiveTab] = useState<TabType>('basic');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | ''; text: string }>({ type: '', text: '' });
  
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    preferredName: user?.preferredName || '',
    username: user?.username || '',
    displayName: user?.displayName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    companyName: user?.companyName || '',
    industry: user?.industry || '',
    address: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    language: 'English',
    timezone: 'UTC',
    bio: user?.bio || '',
    newPassword: '',
    confirmPassword: '',
  });

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length || !user?.id) return;
    
    try {
      setLoading(true);
      const file = e.target.files[0];
      const storage = getStorage();
      const storageRef = ref(storage, `profile-photos/${user.id}`);
      
      await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(storageRef);
      
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { photoURL });
        login({ ...user, photo: photoURL });
        setMessage({ type: 'success', text: 'Profile photo updated successfully!' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile photo.' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Implement profile update logic here
      await updateProfile(profileData);
      setIsEditing(false);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Company Profile</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Photo Section */}
        <div className="flex items-center space-x-6 mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
              {user?.photo ? (
                <img src={user.photo} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <UserIcon size={40} className="text-gray-400" />
                </div>
              )}
            </div>
            <label
              htmlFor="photo-upload"
              className="absolute bottom-0 right-0 bg-white dark:bg-gray-700 rounded-full p-1.5 shadow-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              <Plus size={16} className="text-gray-600 dark:text-gray-300" />
            </label>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Company Administrator Profile</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Manage your company profile settings</p>
          </div>
        </div>

        {/* Error/Success Message */}
        {message.text && (
          <div className={`
            mb-6 p-4 rounded-lg 
            ${message.type === 'success' 
              ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' 
              : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
            }
          `}>
            {message.text}
          </div>
        )}

        {/* Tabs Navigation */}
        <nav className="flex flex-wrap gap-3 mb-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl
                transition-all duration-200 shadow-sm hover:shadow-md
                ${activeTab === tab.id
                  ? `bg-gradient-to-r ${tab.color} text-white shadow-lg scale-105`
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                }
              `}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8">
          {activeTab === 'basic' && (
            <div className="space-y-8">
              {/* Names Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className={labelClasses}>First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    className={inputClasses}
                    value={profileData.firstName || ''}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="Enter your first name"
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className={labelClasses}>Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    className={inputClasses}
                    value={profileData.lastName || ''}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Enter your last name"
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label htmlFor="preferredName" className={labelClasses}>Preferred Name</label>
                  <input
                    type="text"
                    id="preferredName"
                    className={inputClasses}
                    value={profileData.preferredName || ''}
                    onChange={(e) => handleInputChange('preferredName', e.target.value)}
                    placeholder="How would you like to be called?"
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label htmlFor="username" className={labelClasses}>Username</label>
                  <input
                    type="text"
                    id="username"
                    className={inputClasses}
                    value={profileData.username || ''}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    placeholder="Choose a unique username"
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {/* Password Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-medium text-gray-900 dark:text-gray-100">Change Password</h4>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Optional</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="newPassword" className={labelClasses}>New Password</label>
                    <input
                      type="password"
                      id="newPassword"
                      className={inputClasses}
                      placeholder="Enter new password"
                      onChange={(e) => handleInputChange('newPassword', e.target.value)}
                      disabled={!isEditing}
                    />
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Must be at least 8 characters
                    </p>
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className={labelClasses}>Confirm Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      className={inputClasses}
                      placeholder="Confirm new password"
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              {/* Bio Section */}
              <div>
                <label htmlFor="bio" className={labelClasses}>Bio</label>
                <textarea
                  id="bio"
                  rows={4}
                  className={`${inputClasses} resize-none`}
                  value={profileData.bio || ''}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Tell us a little about yourself"
                  disabled={!isEditing}
                />
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Brief description for your profile. Maximum 250 characters.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className={labelClasses}>Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    className={inputClasses}
                    value={profileData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label htmlFor="language" className={labelClasses}>Preferred Language</label>
                  <select
                    id="language"
                    className={inputClasses}
                    value={profileData.language}
                    onChange={(e) => handleInputChange('language', e.target.value)}
                    disabled={!isEditing}
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'company' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="companyName" className={labelClasses}>Company Name</label>
                  <input
                    type="text"
                    id="companyName"
                    className={inputClasses}
                    value={profileData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label htmlFor="industry" className={labelClasses}>Industry</label>
                  <input
                    type="text"
                    id="industry"
                    className={inputClasses}
                    value={profileData.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="timezone" className={labelClasses}>Timezone</label>
                  <select
                    id="timezone"
                    className={inputClasses}
                    value={profileData.timezone}
                    onChange={(e) => handleInputChange('timezone', e.target.value)}
                    disabled={!isEditing}
                  >
                    <option value="UTC">UTC</option>
                    <option value="EST">Eastern Standard Time (EST)</option>
                    <option value="PST">Pacific Standard Time (PST)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Edit Toggle and Save Button */}
          <div className="mt-8 flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-6">
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
                <Shield className="h-5 w-5 mr-2 text-blue-500" />
                Account Type
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Company Administrator
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
              {isEditing && (
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                    disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
