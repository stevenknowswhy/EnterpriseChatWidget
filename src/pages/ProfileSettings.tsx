import React, { useState } from 'react';
import { User as UserIcon, Mail, Settings, Bell, MessageSquare, Globe, Eye, Plus, ArrowLeft, Camera } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { auth } from '../lib/firebase';
import { updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { PreferencesPanel } from '../components/PreferencesPanel';
import { NotificationsPanel } from '../components/NotificationsPanel';

const inputClasses = "w-full px-4 h-12 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200";
const labelClasses = "block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2";

interface User {
  id: string;
  name?: string;
  email?: string;
  photo?: string;
  bannerPhoto?: string;
}

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  bio?: string;
  pronouns?: string;
  phone?: string;
  address?: string;
  address2?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  maritalStatus?: string;
  placeOfBirth?: string;
  gender?: string;
  dateOfBirth?: string;
  birthTime?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactEmail?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  bannerPhoto?: string;
}

type TabType = 'basic' | 'contact' | 'personal' | 'emergency' | 'social';

const tabs: { id: TabType; label: string }[] = [
  { id: 'basic', label: 'Basic Info' },
  { id: 'contact', label: 'Contact' },
  { id: 'personal', label: 'Personal Details' },
  { id: 'emergency', label: 'Emergency Contact' },
  { id: 'social', label: 'Social' },
];

const maritalStatusOptions = [
  'Single',
  'Married',
  'Divorced',
  'Widowed',
  'Separated',
  'Domestic Partnership'
];

const genderOptions = [
  'Male',
  'Female',
  'Non-binary',
  'Prefer not to say',
  'Other'
];

const pronounOptions = [
  'He/Him',
  'She/Her',
  'They/Them',
  'Ze/Zir',
  'Prefer not to say',
  'Custom'
];

const ProfileSettings: React.FC = () => {
  const { user, login } = useAuthStore();
  const [activeTab, setActiveTab] = useState<TabType>('basic');
  const [activeMenuItem, setActiveMenuItem] = useState('personal');
  const [info, setInfo] = useState<PersonalInfo>({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    bannerPhoto: user?.bannerPhoto || '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | ''; text: string }>({ type: '', text: '' });

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'banner') => {
    if (!e.target.files?.length || !user?.id) return;
    
    try {
      setIsLoading(true);
      const file = e.target.files[0];
      const storage = getStorage();
      const storageRef = ref(storage, `${type}-photos/${user.id}`);
      
      await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(storageRef);
      
      if (auth.currentUser) {
        if (type === 'profile') {
          await updateProfile(auth.currentUser, { photoURL });
          login({ ...user, photo: photoURL });
        } else {
          login({ ...user, bannerPhoto: photoURL });
          setInfo(prev => ({ ...prev, bannerPhoto: photoURL }));
        }
        setMessage({ type: 'success', text: `${type === 'profile' ? 'Profile' : 'Banner'} photo updated successfully!` });
      }
    } catch (error) {
      setMessage({ type: 'error', text: `Failed to update ${type} photo.` });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (name: keyof PersonalInfo, value: string) => {
    setInfo(prev => ({ ...prev, [name]: value }));
  };

  const menuItems = [
    { icon: <UserIcon size={20} />, label: 'Personal Info', id: 'personal', description: 'Update your profile and personal details' },
    { icon: <Settings size={20} />, label: 'Preferences', id: 'preferences', description: 'Customize your dashboard experience' },
    { icon: <Bell size={20} />, label: 'Notifications', id: 'notifications', description: 'Configure notification settings' },
    { icon: <MessageSquare size={20} />, label: 'Messages', id: 'messages', description: 'Manage message preferences' },
    { icon: <Globe size={20} />, label: 'Language', id: 'language', description: 'Set your preferred language' },
    { icon: <Eye size={20} />, label: 'Accessibility', id: 'accessibility', description: 'Manage accessibility settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                <ArrowLeft className="w-5 h-5 mr-2" />
                <span>Back</span>
              </button>
            </div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Account</h1>
            <div className="w-[200px]">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="col-span-3">
            <nav className="space-y-1">
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  onClick={() => setActiveMenuItem(item.id)}
                  className={`flex items-start space-x-4 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
                    activeMenuItem === item.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                  }`}
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className={`p-2 rounded-lg ${
                      activeMenuItem === item.id ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                    }`}>
                      {item.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-sm font-medium ${
                      activeMenuItem === item.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-gray-100'
                    }`}>
                      {item.label}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                  </div>
                </a>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 xl:overflow-y-auto">
            <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:py-12 lg:px-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Settings</h1>
              
              {activeMenuItem === 'personal' && (
                <>
                  <div className="mt-6">
                    {/* Profile photo section */}
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
                          onChange={(e) => handlePhotoChange(e, 'profile')}
                          className="hidden"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Profile picture</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">PNG, JPEG under 15MB</p>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">Profile</h3>
                      <p className="max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                        This information will be displayed publicly so be careful what you share.
                      </p>
                    </div>

                    <div className="mt-6">
                      <div className="space-y-6 sm:space-y-5">
                        {/* Tabs */}
                        <nav className="flex space-x-4" aria-label="Tabs">
                          {tabs.map((tab) => (
                            <button
                              key={tab.id}
                              onClick={() => setActiveTab(tab.id)}
                              className={`
                                px-3 py-2 text-sm font-medium rounded-md
                                ${activeTab === tab.id
                                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100'
                                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                                }
                              `}
                            >
                              {tab.label}
                            </button>
                          ))}
                        </nav>

                        {/* Tab Panels */}
                        {activeTab === 'basic' && (
                          <>
                            <div className="grid grid-cols-2 gap-6">
                              <div>
                                <label htmlFor="firstName" className={labelClasses}>First Name</label>
                                <input
                                  type="text"
                                  id="firstName"
                                  className={inputClasses}
                                  value={info.firstName}
                                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                                />
                              </div>
                              <div>
                                <label htmlFor="lastName" className={labelClasses}>Last Name</label>
                                <input
                                  type="text"
                                  id="lastName"
                                  className={inputClasses}
                                  value={info.lastName}
                                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                                />
                              </div>
                            </div>

                            <div>
                              <label htmlFor="bio" className={labelClasses}>Bio</label>
                              <textarea
                                id="bio"
                                rows={4}
                                className={`${inputClasses} resize-none`}
                                value={info.bio}
                                onChange={(e) => handleInputChange('bio', e.target.value)}
                                placeholder="Tell us about yourself..."
                              />
                            </div>
                          </>
                        )}

                        {activeTab === 'contact' && (
                          <>
                            <div>
                              <label htmlFor="email" className={labelClasses}>Email</label>
                              <input
                                type="email"
                                id="email"
                                className={inputClasses}
                                value={info.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                              />
                            </div>

                            <div>
                              <label htmlFor="phone" className={labelClasses}>Phone</label>
                              <input
                                type="tel"
                                id="phone"
                                className={inputClasses}
                                value={info.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                placeholder="(XXX) XXX-XXXX"
                              />
                            </div>

                            <div>
                              <label htmlFor="address" className={labelClasses}>Address</label>
                              <input
                                type="text"
                                id="address"
                                className={inputClasses}
                                value={info.address}
                                onChange={(e) => handleInputChange('address', e.target.value)}
                              />
                            </div>

                            <div>
                              <label htmlFor="address2" className={labelClasses}>Address Line 2</label>
                              <input
                                type="text"
                                id="address2"
                                className={inputClasses}
                                value={info.address2}
                                onChange={(e) => handleInputChange('address2', e.target.value)}
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                              <div>
                                <label htmlFor="city" className={labelClasses}>City</label>
                                <input
                                  type="text"
                                  id="city"
                                  className={inputClasses}
                                  value={info.city}
                                  onChange={(e) => handleInputChange('city', e.target.value)}
                                />
                              </div>
                              <div>
                                <label htmlFor="state" className={labelClasses}>State</label>
                                <input
                                  type="text"
                                  id="state"
                                  className={inputClasses}
                                  value={info.state}
                                  onChange={(e) => handleInputChange('state', e.target.value)}
                                />
                              </div>
                            </div>

                            <div>
                              <label htmlFor="postalCode" className={labelClasses}>Postal Code</label>
                              <input
                                type="text"
                                id="postalCode"
                                className={inputClasses}
                                value={info.postalCode}
                                onChange={(e) => handleInputChange('postalCode', e.target.value)}
                              />
                            </div>
                          </>
                        )}

                        {activeTab === 'personal' && (
                          <>
                            <div className="grid grid-cols-2 gap-6">
                              <div>
                                <label htmlFor="gender" className={labelClasses}>Gender</label>
                                <select
                                  id="gender"
                                  className={inputClasses}
                                  value={info.gender}
                                  onChange={(e) => handleInputChange('gender', e.target.value)}
                                >
                                  <option value="">Select gender</option>
                                  {genderOptions.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label htmlFor="pronouns" className={labelClasses}>Pronouns</label>
                                <select
                                  id="pronouns"
                                  className={inputClasses}
                                  value={info.pronouns}
                                  onChange={(e) => handleInputChange('pronouns', e.target.value)}
                                >
                                  <option value="">Select pronouns</option>
                                  {pronounOptions.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div>
                              <label htmlFor="maritalStatus" className={labelClasses}>Marital Status</label>
                              <select
                                id="maritalStatus"
                                className={inputClasses}
                                value={info.maritalStatus}
                                onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
                              >
                                <option value="">Select status</option>
                                {maritalStatusOptions.map(status => (
                                  <option key={status} value={status}>{status}</option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label htmlFor="placeOfBirth" className={labelClasses}>Place of Birth</label>
                              <input
                                type="text"
                                id="placeOfBirth"
                                className={inputClasses}
                                value={info.placeOfBirth}
                                onChange={(e) => handleInputChange('placeOfBirth', e.target.value)}
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                              <div>
                                <label htmlFor="dateOfBirth" className={labelClasses}>Date of Birth</label>
                                <input
                                  type="date"
                                  id="dateOfBirth"
                                  className={inputClasses}
                                  value={info.dateOfBirth}
                                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                                />
                              </div>
                              <div>
                                <label htmlFor="birthTime" className={labelClasses}>Birth Time</label>
                                <input
                                  type="time"
                                  id="birthTime"
                                  className={inputClasses}
                                  value={info.birthTime}
                                  onChange={(e) => handleInputChange('birthTime', e.target.value)}
                                />
                              </div>
                            </div>
                          </>
                        )}

                        {activeTab === 'emergency' && (
                          <>
                            <div className="grid grid-cols-2 gap-6">
                              <div>
                                <label htmlFor="emergencyContactName" className={labelClasses}>Name</label>
                                <input
                                  type="text"
                                  id="emergencyContactName"
                                  className={inputClasses}
                                  value={info.emergencyContactName}
                                  onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
                                />
                              </div>
                              <div>
                                <label htmlFor="emergencyContactPhone" className={labelClasses}>Phone</label>
                                <input
                                  type="tel"
                                  id="emergencyContactPhone"
                                  className={inputClasses}
                                  value={info.emergencyContactPhone}
                                  onChange={(e) => handleInputChange('emergencyContactPhone', e.target.value)}
                                  placeholder="(XXX) XXX-XXXX"
                                />
                              </div>
                            </div>
                            <div>
                              <label htmlFor="emergencyContactEmail" className={labelClasses}>Email</label>
                              <input
                                type="email"
                                id="emergencyContactEmail"
                                className={inputClasses}
                                value={info.emergencyContactEmail}
                                onChange={(e) => handleInputChange('emergencyContactEmail', e.target.value)}
                              />
                            </div>
                          </>
                        )}

                        {activeTab === 'social' && (
                          <>
                            <div>
                              <label htmlFor="linkedin" className={labelClasses}>LinkedIn</label>
                              <input
                                type="url"
                                id="linkedin"
                                className={inputClasses}
                                value={info.linkedin}
                                onChange={(e) => handleInputChange('linkedin', e.target.value)}
                                placeholder="https://linkedin.com/in/username"
                              />
                            </div>
                            <div>
                              <label htmlFor="twitter" className={labelClasses}>Twitter</label>
                              <input
                                type="url"
                                id="twitter"
                                className={inputClasses}
                                value={info.twitter}
                                onChange={(e) => handleInputChange('twitter', e.target.value)}
                                placeholder="https://twitter.com/username"
                              />
                            </div>
                            <div>
                              <label htmlFor="facebook" className={labelClasses}>Facebook</label>
                              <input
                                type="url"
                                id="facebook"
                                className={inputClasses}
                                value={info.facebook}
                                onChange={(e) => handleInputChange('facebook', e.target.value)}
                                placeholder="https://facebook.com/username"
                              />
                            </div>
                            <div>
                              <label htmlFor="instagram" className={labelClasses}>Instagram</label>
                              <input
                                type="url"
                                id="instagram"
                                className={inputClasses}
                                value={info.instagram}
                                onChange={(e) => handleInputChange('instagram', e.target.value)}
                                placeholder="https://instagram.com/username"
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeMenuItem === 'notifications' && (
                <div className="mt-6">
                  <div className="space-y-1">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">Notifications</h3>
                    <p className="max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                      Manage how you receive notifications and alerts.
                    </p>
                  </div>
                  <div className="mt-6">
                    <NotificationsPanel />
                  </div>
                </div>
              )}

              {activeMenuItem === 'preferences' && (
                <div className="mt-6">
                  <div className="space-y-1">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">Preferences</h3>
                    <p className="max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                      Customize your dashboard experience and accessibility settings.
                    </p>
                  </div>
                  <div className="mt-6">
                    <PreferencesPanel />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
