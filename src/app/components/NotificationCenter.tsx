import { useState, useEffect } from "react";
import { Bell, X, AlertTriangle, TrendingUp, DollarSign, Target, CheckCircle, Info } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

export interface Notification {
  id: string;
  type: "critical" | "warning" | "info" | "success";
  category: "criticalAlerts" | "dailyDigest" | "aiRecommendations" | "marketEvents";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionLabel?: string;
  onAction?: () => void;
}

const STORAGE_KEY = 'venturenerve_notifications';
const SETTINGS_KEY = 'venturenerve_notification_settings';

// Mock notifications for demonstration
const generateMockNotifications = (): Notification[] => [
  {
    id: "1",
    type: "critical",
    category: "criticalAlerts",
    title: "Runway Alert",
    message: "Cash runway has dropped below 12 months. Immediate action recommended.",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    read: false,
  },
  {
    id: "2",
    type: "warning",
    category: "criticalAlerts",
    title: "Burn Rate Increase",
    message: "Monthly burn rate increased by 8.3% compared to last month.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    read: false,
  },
  {
    id: "3",
    type: "success",
    category: "aiRecommendations",
    title: "MRR Growth Target Achieved",
    message: "Congratulations! You've reached 95% of your monthly MRR target.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    read: false,
  },
  {
    id: "4",
    type: "info",
    category: "marketEvents",
    title: "Competitor Launch Detected",
    message: "TechStartup Inc. launched a new feature similar to your Q3 roadmap item.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
    read: true,
  },
  {
    id: "5",
    type: "info",
    category: "aiRecommendations",
    title: "AI Strategy Recommendation",
    message: "Consider hiring a senior sales executive to capture enterprise opportunity.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    read: true,
  },
];

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : generateMockNotifications();
  });

  const [notificationSettings, setNotificationSettings] = useState(() => {
    const saved = localStorage.getItem(SETTINGS_KEY);
    return saved ? JSON.parse(saved) : {
      criticalAlerts: true,
      dailyDigest: true,
      aiRecommendations: false,
      marketEvents: false,
    };
  });

  // Save notifications to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
  }, [notifications]);

  // Save notification settings to localStorage
  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(notificationSettings));
  }, [notificationSettings]);

  // Listen for notification settings changes
  useEffect(() => {
    const handleSettingsChange = (e: CustomEvent) => {
      setNotificationSettings(e.detail);
    };

    window.addEventListener('notification-settings-changed' as any, handleSettingsChange);
    return () => {
      window.removeEventListener('notification-settings-changed' as any, handleSettingsChange);
    };
  }, []);

  // Filter notifications based on settings
  const visibleNotifications = notifications.filter(
    (notif) => notificationSettings[notif.category]
  );

  const unreadCount = visibleNotifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    toast.success("Notification dismissed");
  };

  const clearAll = () => {
    setNotifications([]);
    toast.success("All notifications cleared");
    setIsOpen(false);
  };

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case "success":
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case "info":
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getBgColor = (type: Notification["type"]) => {
    switch (type) {
      case "critical":
        return "bg-red-500/10 dark:bg-red-500/20 border-red-500/30";
      case "warning":
        return "bg-amber-500/10 dark:bg-amber-500/20 border-amber-500/30";
      case "success":
        return "bg-emerald-500/10 dark:bg-emerald-500/20 border-emerald-500/30";
      case "info":
        return "bg-blue-500/10 dark:bg-blue-500/20 border-blue-500/30";
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <>
      {/* Notification Bell Button */}
      <motion.button
        type="button"
        aria-label="Toggle notifications"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative inline-flex h-12 w-12 items-center justify-center rounded-xl hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 shadow-lg"
      >
        <motion.div
          animate={unreadCount > 0 ? { rotate: [0, -15, 15, -15, 0] } : {}}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
        >
          <Bell className="w-6 h-6 text-slate-700 dark:text-slate-300" />
        </motion.div>
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 2 }}
            className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-red-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg"
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </motion.span>
        )}
      </motion.button>

      {/* Notification Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 dark:bg-black/40 z-40"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, x: 100, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 350,
                damping: 25,
                mass: 0.8
              }}
              className="fixed top-0 right-0 h-screen w-full md:w-[450px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-l border-slate-200/50 dark:border-slate-800/50 shadow-2xl z-50 flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">Notifications</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  </button>
                </div>

                {visibleNotifications.length > 0 && (
                  <div className="flex gap-2">
                    <button
                      onClick={markAllAsRead}
                      className="px-3 py-1.5 text-sm rounded-lg bg-violet-500/10 text-violet-700 dark:text-violet-300 hover:bg-violet-500/20 transition-colors"
                    >
                      Mark all read
                    </button>
                    <button
                      onClick={clearAll}
                      className="px-3 py-1.5 text-sm rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                      Clear all
                    </button>
                  </div>
                )}
              </div>

              {/* Notifications List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {visibleNotifications.length === 0 ? (
                  <div className="text-center py-12">
                    <Bell className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
                    <p className="text-slate-600 dark:text-slate-400">No notifications</p>
                    <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">
                      You're all caught up!
                    </p>
                  </div>
                ) : (
                  visibleNotifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      onClick={() => !notification.read && markAsRead(notification.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${getBgColor(
                        notification.type
                      )} ${
                        !notification.read
                          ? "border-l-4"
                          : "opacity-60 hover:opacity-100"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">{getIcon(notification.type)}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                              {notification.title}
                            </h3>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification.id);
                              }}
                              className="flex-shrink-0 p-1 rounded hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors"
                            >
                              <X className="w-4 h-4 text-slate-400" />
                            </button>
                          </div>
                          <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-500 dark:text-slate-500">
                              {formatTimestamp(notification.timestamp)}
                            </span>
                            {!notification.read && (
                              <span className="w-2 h-2 bg-violet-500 rounded-full" />
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
