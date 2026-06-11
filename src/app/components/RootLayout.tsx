import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  MessageSquare,
  Bot,
  Brain,
  AlertTriangle,
  FlaskConical,
  TrendingUp,
  Target,
  FileText,
  Settings as SettingsIcon,
  Sun,
  Moon,
  Sparkles,
  User,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { NotificationCenter } from "./NotificationCenter";
import SiteChatbot from "./SiteChatbot";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/copilot", label: "Founder Copilot", icon: MessageSquare },
  { path: "/agents", label: "AI Agents", icon: Bot },
  { path: "/intelligence", label: "Intelligence Center", icon: Brain },
  { path: "/risk", label: "Risk Engine", icon: AlertTriangle },
  { path: "/simulator", label: "Scenario Simulator", icon: FlaskConical },
  { path: "/investor", label: "Investor Hub", icon: TrendingUp },
  { path: "/competitor", label: "Competitor Intel", icon: Target },
  { path: "/boardroom", label: "AI Board Room", icon: FileText },
  { path: "/settings", label: "Settings", icon: SettingsIcon },
];

export function RootLayout() {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('venturenerve_profile');
    return saved ? JSON.parse(saved) : {
      fullName: "John Doe",
      email: "john@startup.com",
      company: "My Startup Inc.",
    };
  });

  // Listen for profile updates
  useEffect(() => {
    const handleProfileUpdate = (e: CustomEvent) => {
      setProfile(e.detail);
    };

    window.addEventListener('profile-updated' as any, handleProfileUpdate);
    return () => {
      window.removeEventListener('profile-updated' as any, handleProfileUpdate);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900"
    >
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-200/50 dark:border-slate-800/50 backdrop-blur-xl bg-white/40 dark:bg-slate-950/40 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-slate-200/50 dark:border-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
                VentureNerve
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Strategic AI OS</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 dark:from-violet-500/20 dark:to-fuchsia-500/20 text-violet-700 dark:text-violet-300 font-medium"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <item.icon className="w-5 h-5" />
                      <span className="text-sm">{item.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeNav"
                          className="ml-auto w-1.5 h-1.5 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Profile & Theme Switcher */}
        <div className="p-4 border-t border-slate-200/50 dark:border-slate-800/50 space-y-3">
          {/* User Profile */}
          <div className="px-4 py-3 rounded-lg bg-slate-200/50 dark:bg-slate-800/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                  {profile.fullName}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 truncate">
                  {profile.company}
                </p>
              </div>
            </div>
          </div>

          {/* Theme Switcher */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-slate-200/50 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {theme === "dark" ? "Dark Mode" : "Light Mode"}
            </span>
            {theme === "dark" ? (
              <Moon className="w-5 h-5 text-violet-500" />
            ) : (
              <Sun className="w-5 h-5 text-amber-500" />
            )}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 18, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.99 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="min-h-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>

        {/* Notification Bell - Fixed Position (floating) */}
        <div className="fixed top-8 right-8 z-40">
          <NotificationCenter />
        </div>
        {/* Site Chatbot - static knowledge widget */}
        <SiteChatbot />
      </main>
    </motion.div>
  );
}
