import React from 'react';
import { NotificationSettings as NotificationSettingsType } from '../../types/settings';

interface NotificationSettingsProps {
  settings: NotificationSettingsType;
  onSettingsChange: (settings: Partial<NotificationSettingsType>) => void;
}

const NotificationSettings = ({ settings, onSettingsChange }: NotificationSettingsProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold">Notification Settings</h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-300">System Updates</p>
                  <p className="text-sm text-gray-500">Receive notifications about system updates</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings.email.systemUpdates}
                    onChange={(e) => onSettingsChange({
                      email: { ...settings.email, systemUpdates: e.target.checked }
                    })}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Notification Email
                </label>
                <input
                  type="email"
                  value={settings.email.notificationEmail}
                  onChange={(e) => onSettingsChange({
                    email: { ...settings.email, notificationEmail: e.target.value }
                  })}
                  placeholder="admin@company.com"
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">SMS Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-300">Critical Alerts</p>
                  <p className="text-sm text-gray-500">Receive SMS for critical system alerts</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings.sms.criticalAlerts}
                    onChange={(e) => onSettingsChange({
                      sms: { ...settings.sms, criticalAlerts: e.target.checked }
                    })}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  SMS Number
                </label>
                <input
                  type="tel"
                  value={settings.sms.phoneNumber}
                  onChange={(e) => onSettingsChange({
                    sms: { ...settings.sms, phoneNumber: e.target.value }
                  })}
                  placeholder="+1234567890"
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
