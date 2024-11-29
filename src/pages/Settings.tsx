import React, { useState } from 'react';
import FeatureToggles from '../components/settings/FeatureToggles';
import ApiKeys from '../components/settings/ApiKeys';
import BrandingSettings from '../components/settings/BrandingSettings';
import NotificationSettings from '../components/settings/NotificationSettings';
import { ApiKey, FeatureToggle, BrandingSettings as BrandingSettingsType, NotificationSettings as NotificationSettingsType } from '../types/settings';

const mockChatFeatures: FeatureToggle[] = [
  {
    id: '1',
    name: 'AI Chat Assistant',
    description: 'Enable AI-powered chat assistance',
    enabled: true,
    category: 'chat'
  },
  {
    id: '2',
    name: 'Voice Support',
    description: 'Enable voice-based interactions',
    enabled: false,
    category: 'chat'
  }
];

const mockPlatformFeatures: FeatureToggle[] = [
  {
    id: '3',
    name: 'Analytics Dashboard',
    description: 'Enable advanced analytics features',
    enabled: true,
    category: 'platform'
  },
  {
    id: '4',
    name: 'Custom Knowledge Base',
    description: 'Enable custom knowledge base management',
    enabled: false,
    category: 'platform'
  }
];

const mockApiKeys: ApiKey[] = [
  {
    id: '1',
    service: 'OpenAI',
    keyName: 'Production API Key',
    lastModified: '2024-01-15',
    status: 'active'
  },
  {
    id: '2',
    service: 'Twilio',
    keyName: 'SMS Gateway',
    lastModified: '2024-01-10',
    status: 'active'
  }
];

const Settings = () => {
  const [chatFeatures, setChatFeatures] = useState(mockChatFeatures);
  const [platformFeatures, setPlatformFeatures] = useState(mockPlatformFeatures);
  const [apiKeys, setApiKeys] = useState(mockApiKeys);
  const [brandingSettings, setBrandingSettings] = useState<BrandingSettingsType>({
    primaryColor: '#007bff',
    secondaryColor: '#6c757d',
    fontFamily: 'system-ui',
    widgetTitle: 'Chat Assistant',
    welcomeMessage: 'How can I help you today?'
  });
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettingsType>({
    email: {
      systemUpdates: true,
      securityAlerts: true,
      userReports: false,
      performanceAlerts: false,
      notificationEmail: ''
    },
    sms: {
      criticalAlerts: true,
      systemDowntime: true,
      apiIssues: false,
      phoneNumber: ''
    }
  });

  const handleToggleFeature = (id: string, enabled: boolean) => {
    const updateFeatures = (features: FeatureToggle[]) =>
      features.map(feature =>
        feature.id === id ? { ...feature, enabled } : feature
      );

    setChatFeatures(updateFeatures(chatFeatures));
    setPlatformFeatures(updateFeatures(platformFeatures));
  };

  const handleSaveChanges = () => {
    // Implement save logic here
    console.log('Saving changes...');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">Admin Settings</h1>
        <button
          onClick={handleSaveChanges}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300"
        >
          Save Changes
        </button>
      </div>

      <FeatureToggles
        chatFeatures={chatFeatures}
        platformFeatures={platformFeatures}
        onToggleFeature={handleToggleFeature}
      />
      
      <ApiKeys
        apiKeys={apiKeys}
        onAddKey={() => console.log('Add key')}
        onViewKey={(key) => console.log('View key', key)}
        onRotateKey={(key) => console.log('Rotate key', key)}
        onDeleteKey={(key) => console.log('Delete key', key)}
      />
      
      <BrandingSettings
        settings={brandingSettings}
        onSettingsChange={(settings) => setBrandingSettings({ ...brandingSettings, ...settings })}
      />
      
      <NotificationSettings
        settings={notificationSettings}
        onSettingsChange={(settings) => setNotificationSettings({ ...notificationSettings, ...settings })}
      />
    </div>
  );
};

export default Settings;
