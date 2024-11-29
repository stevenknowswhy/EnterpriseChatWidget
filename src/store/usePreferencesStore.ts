import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PreferencesState {
  defaultMode: 'light' | 'dark';
  increaseContrast: boolean;
  displayContrast: number;
  textSize: number;
  systemFeatures: string[];
  setPreference: <K extends keyof Omit<PreferencesState, 'setPreference' | 'resetPreferences'>>(
    key: K,
    value: PreferencesState[K]
  ) => void;
  resetPreferences: () => void;
}

const defaultPreferences = {
  defaultMode: 'light' as const,
  increaseContrast: false,
  displayContrast: 50,
  textSize: 100,
  systemFeatures: [],
};

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      ...defaultPreferences,
      setPreference: (key, value) => set({ [key]: value }),
      resetPreferences: () => set(defaultPreferences),
    }),
    {
      name: 'preferences-storage',
    }
  )
);
