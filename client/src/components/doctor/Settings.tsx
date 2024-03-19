import React, { useState } from 'react';

interface Setting {
  id: string;
  label: string;
  value: string;
}

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<Setting[]>([
    { id: '1', label: 'Dark Mode', value: 'Enabled' },
    { id: '2', label: 'Notification Sound', value: 'Disabled' },
    { id: '3', label: 'Email Notifications', value: 'Enabled' },
    { id: '4', label: 'Language', value: 'English' },
    // Add more settings as needed
  ]);

  const handleToggleSetting = (id: string) => {
    setSettings((prevSettings) =>
      prevSettings.map((setting) =>
        setting.id === id
          ? {
              ...setting,
              value: setting.value === 'Enabled' ? 'Disabled' : 'Enabled',
            }
          : setting
      )
    );
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow rounded-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Settings</h2>
      <div className="space-y-4">
        {settings.map((setting) => (
          <div
            key={setting.id}
            className="flex items-center justify-between py-2 px-4 bg-gray-100 rounded-md"
          >
            <div>{setting.label}</div>
            <button
              className={`text-sm ${
                setting.value === 'Enabled' ? 'text-green-500' : 'text-red-500'
              } font-semibold`}
              onClick={() => handleToggleSetting(setting.id)}
            >
              {setting.value}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsPage;
