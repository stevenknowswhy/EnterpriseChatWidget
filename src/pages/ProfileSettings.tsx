import React, { useState } from 'react';
import { User as UserIcon, Mail, Settings, Bell, MessageSquare, Globe, Eye, Plus, ArrowLeft, Camera, Edit, Trash2, RotateCcw } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { auth } from '../lib/firebase';
import { updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { PreferencesPanel } from '../components/PreferencesPanel';
import { NotificationsPanel } from '../components/NotificationsPanel';
import { useStore } from '../store/useStore';
import useMessagesStore from '../store/useMessagesStore';

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
  const messagesStore = useMessagesStore();
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
    { icon: <UserIcon size={20} />, label: 'Personal', id: 'personal', description: 'Manage your personal information' },
    { icon: <Bell size={20} />, label: 'Notifications', id: 'notifications', description: 'Configure notification settings' },
    { icon: <MessageSquare size={20} />, label: 'Messages', id: 'messages', description: 'Manage message preferences' },
    { icon: <Globe size={20} />, label: 'Language and Location', id: 'language', description: 'Set your preferred language and location' },
    { icon: <Eye size={20} />, label: 'Accessibility', id: 'accessibility', description: 'Manage display and accessibility settings' },
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

              {activeMenuItem === 'accessibility' && (
                <div className="mt-6">
                  <div className="space-y-1">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">Display and Accessibility</h3>
                    <p className="max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                      Customize your display preferences and accessibility settings
                    </p>
                  </div>
                  <div className="mt-6">
                    <PreferencesPanel />
                  </div>
                </div>
              )}

              {activeMenuItem === 'messages' && (
                <div className="mt-6">
                  <div className="space-y-1">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">Message Preferences</h3>
                    <p className="max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                      Manage your message templates, labels, and preferences.
                    </p>
                  </div>

                  <div className="mt-6 space-y-8">
                    {/* Auto-Reply Section */}
                    <div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-base font-medium text-gray-900 dark:text-gray-100">Auto-Reply</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Automatically respond to messages when you're away
                          </p>
                        </div>
                        <div className="flex items-center">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={messagesStore.autoReply}
                              onChange={(e) => messagesStore.setAutoReply(e.target.checked)}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Message Templates Section */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-base font-medium text-gray-900 dark:text-gray-100">Message Templates</h4>
                        <button
                          onClick={() => {
                            const name = window.prompt('Enter template name:');
                            const content = window.prompt('Enter template content:');
                            if (name && content) {
                              messagesStore.addTemplate({ name, content });
                            }
                          }}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add Template
                        </button>
                      </div>
                      <div className="space-y-3">
                        {messagesStore.templates.map((template) => (
                          <div
                            key={template.id}
                            className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
                          >
                            <div>
                              <h5 className="font-medium text-gray-900 dark:text-gray-100">{template.name}</h5>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{template.content}</p>
                            </div>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => {
                                  const content = window.prompt('Edit template content:', template.content);
                                  if (content) {
                                    messagesStore.updateTemplate(template.id, { content });
                                  }
                                }}
                                className="p-1.5 text-gray-400 hover:text-gray-500"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => messagesStore.deleteTemplate(template.id)}
                                className="p-1.5 text-red-400 hover:text-red-500"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Message Labels Section */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-base font-medium text-gray-900 dark:text-gray-100">Message Labels</h4>
                        <button
                          onClick={() => {
                            const name = window.prompt('Enter label name:');
                            if (name) {
                              messagesStore.addLabel({ name, color: '#' + Math.floor(Math.random()*16777215).toString(16) });
                            }
                          }}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add Label
                        </button>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {messagesStore.labels.map((label) => (
                          <div
                            key={label.id}
                            className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg shadow"
                          >
                            <div className="flex items-center space-x-2">
                              <div
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: label.color }}
                              />
                              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {label.name}
                              </span>
                            </div>
                            <button
                              onClick={() => messagesStore.deleteLabel(label.id)}
                              className="p-1.5 text-red-400 hover:text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Deleted Messages Section */}
                    <div>
                      <h4 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-4">Deleted Messages</h4>
                      <div className="space-y-3">
                        {messagesStore.deletedMessages.map((message) => (
                          <div
                            key={message.id}
                            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                  From: {message.sender}
                                </span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                  To: {message.recipient}
                                </span>
                              </div>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {new Date(message.deletedAt).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-gray-900 dark:text-gray-100 mb-2">{message.content}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex gap-1">
                                {message.labels.map((labelId) => {
                                  const label = messagesStore.labels.find((l) => l.id === labelId);
                                  return label ? (
                                    <span
                                      key={label.id}
                                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
                                      style={{
                                        backgroundColor: label.color + '40',
                                        color: label.color,
                                      }}
                                    >
                                      {label.name}
                                    </span>
                                  ) : null;
                                })}
                              </div>
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => messagesStore.restoreDeletedMessage(message.id)}
                                  className="p-1.5 text-gray-400 hover:text-gray-500"
                                  title="Restore Message"
                                >
                                  <RotateCcw className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => messagesStore.permanentlyDeleteMessage(message.id)}
                                  className="p-1.5 text-red-400 hover:text-red-500"
                                  title="Permanently Delete"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                        {messagesStore.deletedMessages.length === 0 && (
                          <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                            No deleted messages to display
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeMenuItem === 'language' && (
                <div className="mt-6">
                  <div className="space-y-1">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">Language and Location</h3>
                    <p className="max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                      Configure your language preferences and localization settings
                    </p>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-4">Language Selection</h4>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="language" className={labelClasses}>
                          Interface Language
                        </label>
                        <select
                          id="language"
                          name="language"
                          className={inputClasses}
                          defaultValue="en"
                        >
                          <option value="en">English</option>
                          <option value="es">Español</option>
                          <option value="fr">Français</option>
                          <option value="de">Deutsch</option>
                          <option value="it">Italiano</option>
                          <option value="pt">Português</option>
                          <option value="ru">Русский</option>
                          <option value="zh">中文</option>
                          <option value="ja">日本語</option>
                          <option value="ko">한국어</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h4 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-4">Localization Settings</h4>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="timezone" className={labelClasses}>
                          Time Zone
                        </label>
                        <select
                          id="timezone"
                          name="timezone"
                          className={inputClasses}
                          defaultValue="America/Los_Angeles"
                        >
                          <option value="America/Los_Angeles">Los Angeles (UTC-8)</option>
                          <option value="America/New_York">New York (UTC-5)</option>
                          <option value="America/Chicago">Chicago (UTC-6)</option>
                          <option value="America/Denver">Denver (UTC-7)</option>
                          <option value="America/Phoenix">Phoenix (UTC-7)</option>
                          <option value="America/Anchorage">Anchorage (UTC-9)</option>
                          <option value="Pacific/Honolulu">Honolulu (UTC-10)</option>
                          <option value="Europe/London">London (UTC+0)</option>
                          <option value="Europe/Paris">Paris (UTC+1)</option>
                          <option value="Asia/Tokyo">Tokyo (UTC+9)</option>
                          <option value="Asia/Shanghai">Shanghai (UTC+8)</option>
                          <option value="Australia/Sydney">Sydney (UTC+11)</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="currency" className={labelClasses}>
                          Currency
                        </label>
                        <select
                          id="currency"
                          name="currency"
                          className={inputClasses}
                          defaultValue="USD"
                        >
                          <option value="USD">US Dollar ($)</option>
                          <option value="EUR">Euro (€)</option>
                          <option value="GBP">British Pound (£)</option>
                          <option value="JPY">Japanese Yen (¥)</option>
                          <option value="AUD">Australian Dollar (A$)</option>
                          <option value="CAD">Canadian Dollar (C$)</option>
                          <option value="CHF">Swiss Franc (CHF)</option>
                          <option value="CNY">Chinese Yuan (¥)</option>
                          <option value="INR">Indian Rupee (₹)</option>
                          <option value="BRL">Brazilian Real (R$)</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="dateFormat" className={labelClasses}>
                          Date Format
                        </label>
                        <select
                          id="dateFormat"
                          name="dateFormat"
                          className={inputClasses}
                          defaultValue="MM/DD/YYYY"
                        >
                          <option value="MM/DD/YYYY">MM/DD/YYYY (US)</option>
                          <option value="DD/MM/YYYY">DD/MM/YYYY (UK/EU)</option>
                          <option value="YYYY-MM-DD">YYYY-MM-DD (ISO)</option>
                          <option value="YYYY.MM.DD">YYYY.MM.DD (Asia)</option>
                        </select>
                      </div>
                    </div>
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
