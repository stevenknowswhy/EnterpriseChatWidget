import React from 'react';
import { usePreferencesStore } from '../store/usePreferencesStore';

const ToggleSwitch: React.FC<{
  enabled: boolean;
  onChange: () => void;
  label: string;
  description: string;
}> = ({ enabled, onChange, label, description }) => (
  <div className="flex items-center justify-between">
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

const Slider: React.FC<{
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  label: string;
  description: string;
  showReset?: boolean;
  onReset?: () => void;
}> = ({ value, onChange, min, max, label, description, showReset, onReset }) => (
  <div className="space-y-3">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">{label}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      {showReset && onReset && (
        <button
          onClick={onReset}
          className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400"
        >
          Reset
        </button>
      )}
    </div>
    <div className="flex items-center gap-4">
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      />
      <span className="text-sm text-gray-500 dark:text-gray-400 min-w-[3rem]">
        {value}%
      </span>
    </div>
  </div>
);

const PreferencesPanel: React.FC = () => {
  const preferences = usePreferencesStore();

  return (
    <div className="space-y-8">
      <ToggleSwitch
        enabled={preferences.defaultMode === 'dark'}
        onChange={() => preferences.setPreference('defaultMode', preferences.defaultMode === 'light' ? 'dark' : 'light')}
        label="Default Mode"
        description="Choose between light and dark mode for better visibility"
      />

      <ToggleSwitch
        enabled={preferences.increaseContrast}
        onChange={() => preferences.setPreference('increaseContrast', !preferences.increaseContrast)}
        label="Increase Contrast"
        description="Increase contrast between text and background"
      />

      <Slider
        value={preferences.displayContrast}
        onChange={(value) => preferences.setPreference('displayContrast', value)}
        min={0}
        max={100}
        label="Display Contrast"
        description="Adjust the contrast of the display"
      />

      <Slider
        value={preferences.textSize}
        onChange={(value) => preferences.setPreference('textSize', value)}
        min={50}
        max={200}
        label="Text Size"
        description="Adjust the size of text on screen"
        showReset
        onReset={() => preferences.setPreference('textSize', 100)}
      />

      <div className="space-y-3">
        <div>
          <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">System Features</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Select additional system features
          </p>
        </div>
        <select
          multiple
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 h-32"
          value={preferences.systemFeatures}
          onChange={(e) => {
            const selected = Array.from(e.target.selectedOptions, option => option.value);
            preferences.setPreference('systemFeatures', selected);
          }}
        >
          <option value="feature1">Feature 1</option>
          <option value="feature2">Feature 2</option>
          <option value="feature3">Feature 3</option>
        </select>
      </div>

      <div className="pt-4">
        <button
          onClick={preferences.resetPreferences}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Reset to Default Settings
        </button>
      </div>
    </div>
  );
};

export { PreferencesPanel };
export default PreferencesPanel;
