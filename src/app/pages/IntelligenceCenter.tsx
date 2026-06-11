import { useState } from "react";
import { Brain, Database, TrendingUp, Users, Package, DollarSign, Activity, Zap, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { toast } from "sonner";

const dataConnections = [
  { name: "Stripe", type: "Financial", status: "connected", icon: DollarSign, color: "from-emerald-500 to-teal-500", records: "12.4K transactions" },
  { name: "HubSpot", type: "CRM", status: "connected", icon: Users, color: "from-orange-500 to-red-500", records: "1,247 contacts" },
  { name: "Mixpanel", type: "Product Analytics", status: "connected", icon: Activity, color: "from-violet-500 to-purple-500", records: "2.3M events" },
  { name: "Greenhouse", type: "HR", status: "connected", icon: Users, color: "from-blue-500 to-cyan-500", records: "12 employees" },
  { name: "Intercom", type: "Customer Feedback", status: "connected", icon: Package, color: "from-pink-500 to-rose-500", records: "847 conversations" },
  { name: "Crunchbase", type: "Market Data", status: "connected", icon: TrendingUp, color: "from-amber-500 to-orange-500", records: "450 companies tracked" },
];

const insightCategories = [
  { name: "Financial Insights", value: 156, color: "#10b981" },
  { name: "Customer Insights", value: 243, color: "#8b5cf6" },
  { name: "Product Insights", value: 189, color: "#3b82f6" },
  { name: "Market Insights", value: 127, color: "#f59e0b" },
  { name: "Competitive Intel", value: 98, color: "#ec4899" },
];

const dataQuality = [
  { date: "Jun 1", quality: 92 },
  { date: "Jun 8", quality: 94 },
  { date: "Jun 15", quality: 91 },
  { date: "Jun 22", quality: 95 },
  { date: "Jun 29", quality: 96 },
  { date: "Today", quality: 97 },
];

const recentInsights = [
  {
    id: 1,
    category: "Financial",
    title: "Revenue concentration risk detected",
    description: "Top 3 customers account for 42% of MRR. Diversification recommended.",
    priority: "high",
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    category: "Customer",
    title: "Onboarding completion rate improved",
    description: "New onboarding flow increased completion from 67% to 84%.",
    priority: "low",
    timestamp: "5 hours ago",
  },
  {
    id: 3,
    category: "Product",
    title: "Feature adoption pattern identified",
    description: "Users who adopt analytics feature within 7 days show 3x higher retention.",
    priority: "medium",
    timestamp: "8 hours ago",
  },
  {
    id: 4,
    category: "Market",
    title: "European market opportunity expanding",
    description: "DACH region showing 3.2x YoY growth in target segment.",
    priority: "high",
    timestamp: "1 day ago",
  },
];

const allInsights = [
  ...recentInsights,
  {
    id: 5,
    category: "Financial",
    title: "CAC payback period improving",
    description: "Average CAC payback reduced from 8.2 to 6.5 months. Indicates stronger unit economics.",
    priority: "medium",
    timestamp: "2 days ago",
  },
  {
    id: 6,
    category: "Product",
    title: "Mobile usage increasing significantly",
    description: "Mobile traffic up 45% quarter-over-quarter. Consider mobile-first features.",
    priority: "medium",
    timestamp: "3 days ago",
  },
  {
    id: 7,
    category: "Competitive",
    title: "Competitor A raised Series B",
    description: "Primary competitor secured $45M Series B. Expect aggressive market expansion.",
    priority: "high",
    timestamp: "4 days ago",
  },
  {
    id: 8,
    category: "Customer",
    title: "Enterprise churn rate decreased",
    description: "Enterprise segment churn dropped from 12% to 7% following account management expansion.",
    priority: "low",
    timestamp: "5 days ago",
  },
  {
    id: 9,
    category: "Market",
    title: "Regulatory changes in EU market",
    description: "New GDPR enforcement could impact data processing. Compliance review recommended.",
    priority: "high",
    timestamp: "1 week ago",
  },
  {
    id: 10,
    category: "Financial",
    title: "Gross margin expansion opportunity",
    description: "Infrastructure optimization could improve gross margin from 78% to 82%.",
    priority: "medium",
    timestamp: "1 week ago",
  },
];

export function IntelligenceCenter() {
  const [showAllInsights, setShowAllInsights] = useState(false);

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Unified Business Intelligence</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Your startup's digital twin powered by real-time data</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20">
          <Zap className="w-5 h-5 text-emerald-600 dark:text-emerald-400 animate-pulse" />
          <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Real-time Sync</span>
        </div>
      </div>

      {/* Data Connections */}
      <div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Connected Data Sources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dataConnections.map((connection, index) => (
            <motion.div
              key={connection.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="rounded-xl backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-5 shadow-lg"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${connection.color} flex items-center justify-center`}>
                  <connection.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Live</span>
                </div>
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white">{connection.name}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">{connection.type}</p>
              <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">{connection.records}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Insight Distribution */}
        <div className="rounded-2xl backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-xl">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">AI Insights Generated (30 Days)</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={insightCategories}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {insightCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {insightCategories.map((category) => (
              <div key={category.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                <div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">{category.name}</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{category.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Quality */}
        <div className="rounded-2xl backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-xl">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Data Quality Score</h3>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-5xl font-bold text-slate-900 dark:text-white">97</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Excellent</p>
            </div>
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
              <Database className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={120}>
            <AreaChart data={dataQuality}>
              <defs>
                <linearGradient id="qualityGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.2} />
              <XAxis dataKey="date" stroke="#94a3b8" tick={{ fontSize: 10 }} />
              <YAxis domain={[85, 100]} stroke="#94a3b8" tick={{ fontSize: 10 }} />
              <Tooltip />
              <Area type="monotone" dataKey="quality" stroke="#10b981" fillOpacity={1} fill="url(#qualityGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Insights */}
      <div className="rounded-2xl backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Recent AI Insights</h3>
          <button
            onClick={() => setShowAllInsights(true)}
            className="text-sm font-medium text-violet-600 dark:text-violet-400 hover:underline transition-all hover:text-violet-700 dark:hover:text-violet-300"
          >
            View All ({allInsights.length})
          </button>
        </div>
        <div className="space-y-4">
          {recentInsights.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-xl border ${
                insight.priority === "high"
                  ? "bg-red-500/10 dark:bg-red-500/20 border-red-500/20 dark:border-red-500/30"
                  : insight.priority === "medium"
                  ? "bg-amber-500/10 dark:bg-amber-500/20 border-amber-500/20 dark:border-amber-500/30"
                  : "bg-blue-500/10 dark:bg-blue-500/20 border-blue-500/20 dark:border-blue-500/30"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 rounded-md text-xs font-medium ${
                      insight.priority === "high"
                        ? "bg-red-500/20 text-red-700 dark:text-red-300"
                        : insight.priority === "medium"
                        ? "bg-amber-500/20 text-amber-700 dark:text-amber-300"
                        : "bg-blue-500/20 text-blue-700 dark:text-blue-300"
                    }`}
                  >
                    {insight.category}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-500">{insight.timestamp}</span>
                </div>
                <span
                  className={`text-xs font-bold uppercase ${
                    insight.priority === "high"
                      ? "text-red-700 dark:text-red-300"
                      : insight.priority === "medium"
                      ? "text-amber-700 dark:text-amber-300"
                      : "text-blue-700 dark:text-blue-300"
                  }`}
                >
                  {insight.priority}
                </span>
              </div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-1">{insight.title}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">{insight.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Live Activity Feed */}
      <div className="rounded-2xl backdrop-blur-xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 dark:from-violet-500/20 dark:to-fuchsia-500/20 border border-violet-500/20 dark:border-violet-500/30 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Live Intelligence Feed</h3>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>AI CFO analyzing June financial data...</span>
            <span className="ml-auto text-xs text-slate-500 dark:text-slate-500">just now</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
            <div className="w-2 h-2 rounded-full bg-violet-500" />
            <span>Growth Agent identified new conversion opportunity</span>
            <span className="ml-auto text-xs text-slate-500 dark:text-slate-500">1m ago</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span>Product Agent detected feature usage spike (+45%)</span>
            <span className="ml-auto text-xs text-slate-500 dark:text-slate-500">3m ago</span>
          </div>
        </div>
      </div>

      {/* All Insights Modal */}
      <AnimatePresence>
        {showAllInsights && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAllInsights(false)}
              className="fixed inset-0 bg-black/50 dark:bg-black/70 z-40 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-4 md:inset-10 lg:inset-20 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 dark:from-violet-500/20 dark:to-fuchsia-500/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">All AI Insights</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      {allInsights.length} insights generated across all categories
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAllInsights(false)}
                    className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                  >
                    <X className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-4 max-w-4xl mx-auto">
                  {allInsights.map((insight, index) => (
                    <motion.div
                      key={insight.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`p-5 rounded-xl border ${
                        insight.priority === "high"
                          ? "bg-red-500/10 dark:bg-red-500/20 border-red-500/20 dark:border-red-500/30"
                          : insight.priority === "medium"
                          ? "bg-amber-500/10 dark:bg-amber-500/20 border-amber-500/20 dark:border-amber-500/30"
                          : "bg-blue-500/10 dark:bg-blue-500/20 border-blue-500/20 dark:border-blue-500/30"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-1 rounded-md text-xs font-medium ${
                              insight.priority === "high"
                                ? "bg-red-500/20 text-red-700 dark:text-red-300"
                                : insight.priority === "medium"
                                ? "bg-amber-500/20 text-amber-700 dark:text-amber-300"
                                : "bg-blue-500/20 text-blue-700 dark:text-blue-300"
                            }`}
                          >
                            {insight.category}
                          </span>
                          <span className="text-xs text-slate-500 dark:text-slate-500">{insight.timestamp}</span>
                        </div>
                        <span
                          className={`text-xs font-bold uppercase ${
                            insight.priority === "high"
                              ? "text-red-700 dark:text-red-300"
                              : insight.priority === "medium"
                              ? "text-amber-700 dark:text-amber-300"
                              : "text-blue-700 dark:text-blue-300"
                          }`}
                        >
                          {insight.priority}
                        </span>
                      </div>
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-1">{insight.title}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{insight.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Insights are updated in real-time based on your connected data sources
                  </p>
                  <button
                    onClick={() => {
                      setShowAllInsights(false);
                      toast.success("Insights refreshed");
                    }}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-medium hover:shadow-lg transition-all"
                  >
                    Refresh Insights
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
