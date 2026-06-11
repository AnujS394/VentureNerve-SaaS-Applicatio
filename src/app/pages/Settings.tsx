import { useState, useEffect } from "react";
import { Settings as SettingsIcon, User, Bell, Database, Shield, Palette } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

const STORAGE_KEYS = {
  PROFILE: 'venturenerve_profile',
  NOTIFICATION_SETTINGS: 'venturenerve_notification_settings',
  DATA_SOURCES: 'venturenerve_data_sources',
  TWO_FA: 'venturenerve_2fa_enabled',
  API_KEYS: 'venturenerve_api_keys',
};

const DEFAULT_DATA_SOURCES = [
  { name: 'Stripe', status: 'connected' },
  { name: 'HubSpot', status: 'connected' },
  { name: 'Mixpanel', status: 'connected' },
  { name: 'Greenhouse', status: 'connected' },
  { name: 'Salesforce', status: 'disconnected' },
  { name: 'Google Analytics', status: 'disconnected' },
];

const DEFAULT_API_KEYS = [
  { id: 'key-001', name: 'Production API Key', created: '2026-01-15', lastUsed: '2026-06-10' },
  { id: 'key-002', name: 'Development API Key', created: '2026-02-20', lastUsed: '2026-06-11' },
];

export function Settings() {
  // Initialize from localStorage or use defaults
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
    return saved ? JSON.parse(saved) : {
      fullName: "John Doe",
      email: "john@startup.com",
      company: "My Startup Inc.",
    };
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATION_SETTINGS);
    return saved ? JSON.parse(saved) : {
      criticalAlerts: true,
      dailyDigest: true,
      aiRecommendations: false,
      marketEvents: false,
    };
  });

  const [dataSources, setDataSources] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DATA_SOURCES);
      return saved ? JSON.parse(saved) : DEFAULT_DATA_SOURCES;
    } catch (e) {
      return DEFAULT_DATA_SOURCES;
    }
  });

  const [twoFaEnabled, setTwoFaEnabled] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TWO_FA);
      return saved ? JSON.parse(saved) : false;
    } catch (e) {
      return false;
    }
  });

  const [apiKeys, setApiKeys] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.API_KEYS);
      return saved ? JSON.parse(saved) : DEFAULT_API_KEYS;
    } catch (e) {
      return DEFAULT_API_KEYS;
    }
  });

  // Save to localStorage whenever notifications change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATION_SETTINGS, JSON.stringify(notifications));
  }, [notifications]);

  // Save data sources
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.DATA_SOURCES, JSON.stringify(dataSources));
    } catch (e) {
      // ignore
    }
  }, [dataSources]);

  // Save 2FA status
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TWO_FA, JSON.stringify(twoFaEnabled));
    } catch (e) {
      // ignore
    }
  }, [twoFaEnabled]);

  // Save API keys
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.API_KEYS, JSON.stringify(apiKeys));
    } catch (e) {
      // ignore
    }
  }, [apiKeys]);

  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
    return saved ? new Date() : null;
  });

  const handleSaveProfile = () => {
    try {
      setIsSaving(true);
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));

      setTimeout(() => {
        setIsSaving(false);
        setLastSaved(new Date());
        toast.success("✓ Profile changes saved successfully!");

        // Dispatch custom event to notify other components
        window.dispatchEvent(new CustomEvent('profile-updated', { detail: profile }));
      }, 500);
    } catch (error) {
      setIsSaving(false);
      toast.error("Failed to save profile. Please try again.");
    }
  };

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    const newValue = !notifications[key];
    const newNotifications = {
      ...notifications,
      [key]: newValue,
    };
    setNotifications(newNotifications);

    if (newValue) {
      toast.success(`✓ ${getCategoryLabel(key)} notifications enabled`);
    } else {
      toast.info(`${getCategoryLabel(key)} notifications disabled`);
    }

    // Dispatch event for notification system
    window.dispatchEvent(new CustomEvent('notification-settings-changed', {
      detail: newNotifications
    }));
  };

  const getCategoryLabel = (key: keyof typeof notifications) => {
    const labels = {
      criticalAlerts: "Critical Alert",
      dailyDigest: "Daily Digest",
      aiRecommendations: "AI Recommendation",
      marketEvents: "Market Event",
    };
    return labels[key];
  };

  const handleConnect = (service: string) => {
    toast.success(`Connecting to ${service}...`);
    setTimeout(() => {
      setDataSources((prev) =>
        prev.map((src) =>
          src.name === service ? { ...src, status: 'connected' } : src
        )
      );
      toast.success(`${service} connected successfully!`);
    }, 1000);
  };

  const handleDisconnect = (service: string) => {
    toast.success(`Disconnecting from ${service}...`);
    setTimeout(() => {
      setDataSources((prev) =>
        prev.map((src) =>
          src.name === service ? { ...src, status: 'disconnected' } : src
        )
      );
      toast.success(`${service} disconnected`);
    }, 1000);
  };

  const handleToggle2FA = () => {
    setTwoFaEnabled((prev) => !prev);
    if (!twoFaEnabled) {
      toast.success('2FA enabled successfully');
    } else {
      toast.info('2FA disabled');
    }
  };

  const handleDataExport = () => {
    try {
      const exportData = {
        exportDate: new Date().toISOString(),
        profile,
        notifications,
        dataSources: dataSources.map((s) => ({ name: s.name, status: s.status })),
        twoFaEnabled,
        apiKeysCount: apiKeys.length,
      };

      const dataStr = JSON.stringify(exportData, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `venturenerve-export-${new Date().getTime()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);

      toast.success('Your data has been exported successfully');
    } catch (error) {
      toast.error('Failed to export data. Please try again.');
    }
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Settings</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Manage your VentureNerve preferences</p>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Profile Settings</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">Manage your account information</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
              <input
                type="text"
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Company</label>
              <input
                type="text"
                value={profile.company}
                onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50"
              />
            </div>
            <button
              onClick={handleSaveProfile}
              disabled={isSaving}
              className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
            {lastSaved && (
              <p className="text-xs text-center text-slate-500 dark:text-slate-500 mt-2">
                Last saved: {lastSaved.toLocaleTimeString()}
              </p>
            )}
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Notifications</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">Configure alert preferences</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
              <div>
                <p className="font-medium text-slate-900 dark:text-white">Critical Risk Alerts</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Immediate notification for critical risks</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.criticalAlerts}
                  onChange={() => handleNotificationToggle("criticalAlerts")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-violet-500/50 dark:bg-slate-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
              <div>
                <p className="font-medium text-slate-900 dark:text-white">Daily Digest</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Summary of key insights and metrics</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.dailyDigest}
                  onChange={() => handleNotificationToggle("dailyDigest")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-violet-500/50 dark:bg-slate-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
              <div>
                <p className="font-medium text-slate-900 dark:text-white">AI Recommendations</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Strategic recommendations from AI agents</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.aiRecommendations}
                  onChange={() => handleNotificationToggle("aiRecommendations")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-violet-500/50 dark:bg-slate-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
              <div>
                <p className="font-medium text-slate-900 dark:text-white">Market Events</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Competitor and market intelligence updates</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.marketEvents}
                  onChange={() => handleNotificationToggle("marketEvents")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-violet-500/50 dark:bg-slate-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-500"></div>
              </label>
            </div>
          </div>
        </motion.div>

        {/* Data Sources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
              <Database className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Data Connections</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">Manage integrated data sources</p>
            </div>
          </div>
          <div className="space-y-3">
            {dataSources.map((source, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${source.status === "connected" ? "bg-emerald-500 animate-pulse" : "bg-slate-300 dark:bg-slate-700"}`} />
                  <span className="font-medium text-slate-900 dark:text-white">{source.name}</span>
                </div>
                <button
                  onClick={() =>
                    source.status === "connected"
                      ? handleDisconnect(source.name)
                      : handleConnect(source.name)
                  }
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    source.status === "connected"
                      ? "bg-red-500/10 text-red-700 dark:text-red-300 hover:bg-red-500/20"
                      : "bg-violet-500/10 text-violet-700 dark:text-violet-300 hover:bg-violet-500/20"
                  }`}
                >
                  {source.status === "connected" ? "Disconnect" : "Connect"}
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Privacy & Security */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Privacy & Security</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">Manage security settings</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-medium text-slate-900 dark:text-white mb-1">Two-Factor Authentication</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Add an extra layer of security</p>
                </div>
                <div className={`w-2 h-2 rounded-full ${twoFaEnabled ? 'bg-emerald-500' : 'bg-slate-400'}`} />
              </div>
              <button
                onClick={handleToggle2FA}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  twoFaEnabled
                    ? 'bg-red-500/10 text-red-700 dark:text-red-300 hover:bg-red-500/20'
                    : 'bg-violet-500/10 text-violet-700 dark:text-violet-300 hover:bg-violet-500/20'
                }`}
              >
                {twoFaEnabled ? 'Disable 2FA' : 'Enable 2FA'}
              </button>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
              <p className="font-medium text-slate-900 dark:text-white mb-1">API Keys</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">Manage API access — {apiKeys.length} active key{apiKeys.length !== 1 ? 's' : ''}</p>
              <div className="space-y-2 mb-3 max-h-32 overflow-y-auto">
                {apiKeys.map((key) => (
                  <div key={key.id} className="text-xs bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-700">
                    <p className="font-medium text-slate-900 dark:text-white">{key.name}</p>
                    <p className="text-slate-600 dark:text-slate-400">Created: {new Date(key.created).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => toast.success('Opening API key management')}
                className="px-4 py-2 rounded-lg bg-violet-500/10 text-violet-700 dark:text-violet-300 hover:bg-violet-500/20 font-medium text-sm transition-colors"
              >
                Manage Keys
              </button>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
              <p className="font-medium text-slate-900 dark:text-white mb-1">Data Export</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">Download your data as JSON</p>
              <button
                onClick={handleDataExport}
                className="px-4 py-2 rounded-lg bg-violet-500/10 text-violet-700 dark:text-violet-300 hover:bg-violet-500/20 font-medium text-sm transition-colors"
              >
                Download Data
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
