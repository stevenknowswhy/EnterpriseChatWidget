import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Camera, Loader2, User, Phone, Heart, Share2, Mail, MapPin, Building, Globe, Calendar, UserPlus } from 'lucide-react';
import { auth } from '../lib/firebase';
import { updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface PersonalInfo {
  name: string;
  email: string;
  bio?: string;
  pronouns?: string;
  phone?: string;
  cellPhone?: string;
  workCellPhone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactEmail?: string;
  defaultLanguage?: string;
  timezone?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  gender?: string;
  maritalStatus?: string;
  dateOfBirth?: string;
  bannerPhoto?: string;
}

const ProfileSettings = () => {
  const { user, login } = useAuthStore();
  const [activeTab, setActiveTab] = useState('basic');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [info, setInfo] = useState<PersonalInfo>({
    name: user?.name || '',
    email: user?.email || '',
    bannerPhoto: user?.bannerPhoto || '',
  });

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'banner') => {
    if (!e.target.files?.length) return;
    
    try {
      setIsLoading(true);
      const file = e.target.files[0];
      const storage = getStorage();
      const storageRef = ref(storage, `${type}-photos/${user?.id}`);
      
      await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(storageRef);
      
      if (auth.currentUser) {
        if (type === 'profile') {
          await updateProfile(auth.currentUser, { photoURL });
          login({ ...user!, photo: photoURL });
        } else {
          // Update banner photo in your user store/backend
          login({ ...user!, bannerPhoto: photoURL });
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // TODO: Implement API call to update profile
      login({ ...user!, ...info });
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile.' });
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: User },
    { id: 'contact', label: 'Contact', icon: Phone },
    { id: 'emergency', label: 'Emergency', icon: Heart },
    { id: 'social', label: 'Social', icon: Share2 },
  ];

  const inputClasses = "mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 h-11 px-4";
  const textareaClasses = "mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 px-4";
  const labelClasses = "block text-sm font-medium text-gray-700 dark:text-gray-200";

  const renderInput = (label: string, name: string, type: string = 'text', icon?: React.ReactNode) => (
    <div className="relative">
      <label className={labelClasses}>{label}</label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          name={name}
          value={info[name as keyof PersonalInfo] || ''}
          onChange={handleInputChange}
          className={`${inputClasses} ${icon ? 'pl-11' : 'pl-4'}`}
        />
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden transition-all duration-200">
        {/* Header Section */}
        <div className="relative h-48 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700">
          {info.bannerPhoto ? (
            <img
              src={info.bannerPhoto}
              alt="Profile Banner"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700" />
          )}
          
          {/* Banner Upload Button */}
          <label
            htmlFor="banner-upload"
            className="absolute top-4 right-4 bg-black/30 hover:bg-black/40 text-white rounded-lg p-2 
              cursor-pointer transition-colors duration-200 backdrop-blur-sm flex items-center gap-2"
          >
            <Camera size={16} />
            <span className="text-sm font-medium">Change Banner</span>
          </label>
          <input
            id="banner-upload"
            type="file"
            accept="image/*"
            onChange={(e) => handlePhotoChange(e, 'banner')}
            className="hidden"
          />

          {/* Profile Section */}
          <div className="absolute -bottom-16 left-8 flex items-end space-x-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-xl bg-white dark:bg-gray-700 p-1 shadow-lg">
                <div className="w-full h-full rounded-lg bg-gray-200 dark:bg-gray-600 overflow-hidden">
                  {user?.photo ? (
                    <img src={user.photo} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <Camera size={40} />
                    </div>
                  )}
                </div>
              </div>
              <label
                htmlFor="photo-upload"
                className="absolute bottom-2 right-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-2 
                  shadow-lg cursor-pointer transition-colors duration-200 flex items-center gap-2"
              >
                <Camera size={16} />
              </label>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={(e) => handlePhotoChange(e, 'profile')}
                className="hidden"
              />
            </div>
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-white drop-shadow-sm">{info.name}</h2>
              <p className="text-blue-100 drop-shadow-sm">{user?.role}</p>
            </div>
          </div>
        </div>

        {/* Message Alert */}
        {message.text && (
          <div
            className={`mx-8 mt-20 mb-4 p-4 rounded-lg ${
              message.type === 'success' 
                ? 'bg-green-50 text-green-800 dark:bg-green-900/50 dark:text-green-200' 
                : 'bg-red-50 text-red-800 dark:bg-red-900/50 dark:text-red-200'
            } transition-all duration-200`}
          >
            {message.text}
          </div>
        )}

        <div className="px-8 py-6 mt-16">
          {/* Tabs */}
          <div className="flex space-x-1 mb-8 bg-gray-100 dark:bg-gray-700/50 p-1 rounded-lg">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <tab.icon size={18} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {activeTab === 'basic' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderInput('Full Name', 'name', 'text', <User size={18} className="text-gray-400" />)}
                {renderInput('Email', 'email', 'email', <Mail size={18} className="text-gray-400" />)}
                <div className="md:col-span-2">
                  <label className={labelClasses}>Bio</label>
                  <textarea
                    name="bio"
                    value={info.bio || ''}
                    onChange={handleInputChange}
                    rows={4}
                    className={textareaClasses}
                  />
                </div>
                {renderInput('Pronouns', 'pronouns')}
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderInput('Phone', 'phone', 'tel', <Phone size={18} className="text-gray-400" />)}
                {renderInput('Address', 'address', 'text', <MapPin size={18} className="text-gray-400" />)}
                {renderInput('City', 'city', 'text', <Building size={18} className="text-gray-400" />)}
                {renderInput('Country', 'country', 'text', <Globe size={18} className="text-gray-400" />)}
              </div>
            )}

            {activeTab === 'emergency' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderInput('Emergency Contact Name', 'emergencyContactName', 'text', <UserPlus size={18} className="text-gray-400" />)}
                {renderInput('Emergency Contact Phone', 'emergencyContactPhone', 'tel', <Phone size={18} className="text-gray-400" />)}
                {renderInput('Emergency Contact Email', 'emergencyContactEmail', 'email', <Mail size={18} className="text-gray-400" />)}
              </div>
            )}

            {activeTab === 'social' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderInput('LinkedIn', 'linkedin', 'url')}
                {renderInput('Twitter', 'twitter', 'url')}
                {renderInput('Facebook', 'facebook', 'url')}
                {renderInput('Instagram', 'instagram', 'url')}
              </div>
            )}

            <div className="flex justify-end pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm 
                  font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 
                  focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed
                  transition-all duration-200"
              >
                {isLoading && <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />}
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
