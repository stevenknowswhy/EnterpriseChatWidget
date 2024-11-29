import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type PhoneType = 'work' | 'personal' | 'other';

interface NotificationsState {
  emailNotifications: boolean;
  smsNotifications: boolean;
  afterHoursNotifications: boolean;
  workStartTime: string;
  workEndTime: string;
  smsPhoneType: PhoneType;
  otherPhoneNumber: string;
  smsPermissionGranted: boolean;
  setNotificationPreference: (
    key: 'emailNotifications' | 'smsNotifications' | 'afterHoursNotifications' | 'smsPermissionGranted',
    value: boolean
  ) => void;
  setWorkHours: (startTime: string, endTime: string) => void;
  setSmsPhoneType: (phoneType: PhoneType) => void;
  setOtherPhoneNumber: (phoneNumber: string) => void;
  resetNotifications: () => void;
}

const defaultNotifications = {
  emailNotifications: true,
  smsNotifications: false,
  afterHoursNotifications: false,
  workStartTime: '09:00',
  workEndTime: '17:00',
  smsPhoneType: 'work' as PhoneType,
  otherPhoneNumber: '',
  smsPermissionGranted: true,
};

export const useNotificationsStore = create<NotificationsState>()(
  persist(
    (set) => ({
      ...defaultNotifications,
      setNotificationPreference: (key, value) => set({ [key]: value }),
      setWorkHours: (startTime, endTime) => set({ workStartTime: startTime, workEndTime: endTime }),
      setSmsPhoneType: (phoneType) => set({ smsPhoneType: phoneType }),
      setOtherPhoneNumber: (phoneNumber) => set({ otherPhoneNumber: phoneNumber }),
      resetNotifications: () => set(defaultNotifications),
    }),
    {
      name: 'notifications-storage',
    }
  )
);
