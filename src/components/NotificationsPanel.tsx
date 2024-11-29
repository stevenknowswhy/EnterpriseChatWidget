import React from 'react';
import { useNotificationsStore } from '../store/useNotificationsStore';

const ToggleSwitch: React.FC<{
  enabled: boolean;
  onChange: () => void;
  label: string;
  description: string;
}> = ({ enabled, onChange, label, description }) => (
  <div className="flex items-center justify-between py-4">
    <div>
      <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">{label}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
    </div>
    <button
      onClick={onChange}
      className={`
        relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent 
        transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${enabled ? 'bg-blue-600' : 'bg-gray-200'}
      `}
    >
      <span
        className={`
          pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 
          transition duration-200 ease-in-out
          ${enabled ? 'translate-x-5' : 'translate-x-0'}
        `}
      />
    </button>
  </div>
);

const NotificationsPanel: React.FC = () => {
  const {
    emailNotifications,
    smsNotifications,
    afterHoursNotifications,
    workStartTime,
    workEndTime,
    setNotificationPreference,
    setWorkHours,
    smsPhoneType,
    setSmsPhoneType,
    otherPhoneNumber,
    setOtherPhoneNumber,
    smsPermissionGranted,
  } = useNotificationsStore();

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <div className="space-y-6">
          <ToggleSwitch
            enabled={emailNotifications}
            onChange={() => setNotificationPreference('emailNotifications', !emailNotifications)}
            label="Email Notifications"
            description="Receive notifications via email about important updates and messages"
          />

          <div className="border-t border-gray-200 dark:border-gray-700" />

          <div className="space-y-4">
            <ToggleSwitch
              enabled={smsNotifications}
              onChange={() => setNotificationPreference('smsNotifications', !smsNotifications)}
              label="SMS Notifications"
              description="Get text messages for urgent notifications and alerts"
            />

            {smsNotifications && (
              <div className="ml-8 mt-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="smsPhoneType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Phone to Use
                    </label>
                    <select
                      id="smsPhoneType"
                      value={smsPhoneType}
                      onChange={(e) => setSmsPhoneType(e.target.value as PhoneType)}
                      className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 sm:text-sm"
                    >
                      <option value="work">Work Phone</option>
                      <option value="personal">Personal Phone</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  {smsPhoneType === 'other' && (
                    <div>
                      <label htmlFor="otherPhone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Other Phone Number
                      </label>
                      <input
                        type="tel"
                        id="otherPhone"
                        value={otherPhoneNumber}
                        onChange={(e) => setOtherPhoneNumber(e.target.value)}
                        placeholder="(XXX) XXX-XXXX"
                        className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 sm:text-sm"
                      />
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="smsPermission"
                    checked={smsPermissionGranted}
                    onChange={(e) => setNotificationPreference('smsPermissionGranted', e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                  />
                  <label htmlFor="smsPermission" className="text-sm text-gray-700 dark:text-gray-300">
                    I agree to receive SMS notifications
                  </label>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700" />

          <div className="space-y-4">
            <ToggleSwitch
              enabled={afterHoursNotifications}
              onChange={() => setNotificationPreference('afterHoursNotifications', !afterHoursNotifications)}
              label="After-Hours Notifications"
              description="Receive notifications outside of regular business hours"
            />

            {afterHoursNotifications && (
              <div className="ml-8 mt-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="workStartTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Work Start Time
                    </label>
                    <input
                      type="time"
                      id="workStartTime"
                      value={workStartTime}
                      onChange={(e) => setWorkHours(e.target.value, workEndTime)}
                      className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="workEndTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Work End Time
                    </label>
                    <input
                      type="time"
                      id="workEndTime"
                      value={workEndTime}
                      onChange={(e) => setWorkHours(workStartTime, e.target.value)}
                      className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 sm:text-sm"
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  You will only receive notifications between these hours unless after-hours notifications are enabled
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { NotificationsPanel };
export default NotificationsPanel;
