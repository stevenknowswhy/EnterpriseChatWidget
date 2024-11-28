export interface ApiKey {
  id: string;
  service: string;
  keyName: string;
  lastModified: string;
  status: 'active' | 'inactive';
}

export interface FeatureToggle {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  category: 'chat' | 'platform';
}

export interface BrandingSettings {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  widgetTitle: string;
  welcomeMessage: string;
  logo?: string;
}

export interface NotificationSettings {
  email: {
    systemUpdates: boolean;
    securityAlerts: boolean;
    userReports: boolean;
    performanceAlerts: boolean;
    notificationEmail: string;
  };
  sms: {
    criticalAlerts: boolean;
    systemDowntime: boolean;
    apiIssues: boolean;
    phoneNumber: string;
  };
}
