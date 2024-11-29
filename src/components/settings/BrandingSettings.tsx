import React from 'react';
import { Upload } from 'lucide-react';
import { BrandingSettings as BrandingSettingsType } from '../../types/settings';

interface BrandingSettingsProps {
  settings: BrandingSettingsType;
  onSettingsChange: (settings: Partial<BrandingSettingsType>) => void;
}

const BrandingSettings = ({ settings, onSettingsChange }: BrandingSettingsProps) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle file upload logic here
      console.log('File uploaded:', file);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">Branding Settings</h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white transition-colors duration-300">Widget Appearance</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Primary Color
                </label>
                <input
                  type="color"
                  value={settings.primaryColor}
                  onChange={(e) => onSettingsChange({ primaryColor: e.target.value })}
                  className="h-10 w-full rounded-lg border-gray-300 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Secondary Color
                </label>
                <input
                  type="color"
                  value={settings.secondaryColor}
                  onChange={(e) => onSettingsChange({ secondaryColor: e.target.value })}
                  className="h-10 w-full rounded-lg border-gray-300 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Font Family
                </label>
                <select
                  value={settings.fontFamily}
                  onChange={(e) => onSettingsChange({ fontFamily: e.target.value })}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                >
                  <option value="system-ui">System Default</option>
                  <option value="Arial">Arial</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Open Sans">Open Sans</option>
                </select>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white transition-colors duration-300">Widget Content</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Widget Title
                </label>
                <input
                  type="text"
                  value={settings.widgetTitle}
                  onChange={(e) => onSettingsChange({ widgetTitle: e.target.value })}
                  placeholder="Chat Assistant"
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Welcome Message
                </label>
                <textarea
                  value={settings.welcomeMessage}
                  onChange={(e) => onSettingsChange({ welcomeMessage: e.target.value })}
                  placeholder="How can I help you today?"
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Logo
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600 dark:text-gray-400">
                      <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                        <span>Upload a file</span>
                        <input
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleFileUpload}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandingSettings;
