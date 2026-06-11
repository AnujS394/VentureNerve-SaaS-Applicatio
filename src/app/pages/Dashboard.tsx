import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle, Clock, DollarSign, Users, Activity } from "lucide-react";
import { motion } from "motion/react";

const healthScores = [
  { label: "Company Health", score: 87, trend: "up", color: "from-emerald-500 to-teal-500" },
  { label: "Growth Score", score: 92, trend: "up", color: "from-violet-500 to-purple-500" },
  { label: "Runway Score", score: 68, trend: "down", color: "from-amber-500 to-orange-500" },
  { label: "Product Health", score: 85, trend: "up", color: "from-blue-500 to-cyan-500" },
  { label: "Team Health", score: 79, trend: "stable", color: "from-pink-500 to-rose-500" },
  { label: "Fundraising Readiness", score: 74, trend: "up", color: "from-fuchsia-500 to-purple-500" },
];

const revenueData = [
  { month: "Jan", revenue: 45000, forecast: 48000 },
  { month: "Feb", revenue: 52000, forecast: 55000 },
  { month: "Mar", revenue: 61000, forecast: 63000 },
  { month: "Apr", revenue: 73000, forecast: 72000 },
  { month: "May", revenue: 88000, forecast: 85000 },
  { month: "Jun", revenue: 95000, forecast: 98000 },
];

const burnRateData = [
  { month: "Jan", burn: 35000, runway: 18 },
  { month: "Feb", burn: 38000, runway: 17 },
  { month: "Mar", burn: 42000, runway: 16 },
  { month: "Apr", burn: 45000, runway: 15 },
  { month: "May", burn: 48000, runway: 14 },
  { month: "Jun", burn: 52000, runway: 13 },
];

const alerts = [
  { id: 1, type: "critical", title: "Runway approaching critical threshold", description: "Current burn rate will exhaust runway in 13 months", confidence: 94 },
  { id: 2, type: "warning", title: "Churn rate increasing", description: "Customer churn up 12% compared to last month", confidence: 87 },
  { id: 3, type: "opportunity", title: "Market expansion opportunity", description: "European market showing 3x growth potential", confidence: 78 },
];

const kpis = [
  { label: "Monthly Recurring Revenue", value: "$95,000", change: "+12.3%", trend: "up", icon: DollarSign },
  { label: "Active Customers", value: "1,247", change: "+8.5%", trend: "up", icon: Users },
  { label: "Burn Rate", value: "$52,000", change: "+8.3%", trend: "down", icon: TrendingDown },
  { label: "Runway", value: "13 months", change: "-1 month", trend: "down", icon: Clock },
];

export function Dashboard() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Strategic Command Center</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">AI-powered insights for your startup</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20">
          <Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-400 animate-pulse" />
          <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">All Systems Active</span>
        </div>
      </div>

      {/* Health Scores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {healthScores.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative overflow-hidden rounded-2xl backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-xl"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">{item.label}</p>
                <h3 className={`text-4xl font-bold mt-1 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                  {item.score}
                </h3>
              </div>
              {item.trend === "up" ? (
                <TrendingUp className="w-6 h-6 text-emerald-500" />
              ) : item.trend === "down" ? (
                <TrendingDown className="w-6 h-6 text-red-500" />
              ) : (
                <div className="w-6 h-6 rounded-full bg-slate-300 dark:bg-slate-700" />
              )}
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.score}%` }}
                transition={{ delay: index * 0.1 + 0.3, duration: 1 }}
                className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 + 0.6 }}
            className="rounded-2xl backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-xl"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center">
                <kpi.icon className="w-6 h-6 text-violet-600 dark:text-violet-400" />
              </div>
              <span className={`text-sm font-medium ${kpi.trend === "up" ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
                {kpi.change}
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">{kpi.label}</p>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{kpi.value}</h4>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue & Forecast */}
        <div className="rounded-2xl backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-xl">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Revenue vs Forecast</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.2} />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.9)",
                  border: "1px solid rgba(148, 163, 184, 0.2)",
                  borderRadius: "8px",
                }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorRevenue)" />
              <Area type="monotone" dataKey="forecast" stroke="#ec4899" strokeDasharray="5 5" fillOpacity={1} fill="url(#colorForecast)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Burn Rate & Runway */}
        <div className="rounded-2xl backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-xl">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Burn Rate & Runway</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={burnRateData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.2} />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis yAxisId="left" stroke="#94a3b8" />
              <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.9)",
                  border: "1px solid rgba(148, 163, 184, 0.2)",
                  borderRadius: "8px",
                }}
              />
              <Bar yAxisId="left" dataKey="burn" fill="#f59e0b" radius={[8, 8, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="runway" stroke="#ef4444" strokeWidth={2} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Executive Summary */}
      <div className="rounded-2xl backdrop-blur-xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 dark:from-violet-500/20 dark:to-fuchsia-500/20 border border-violet-500/20 dark:border-violet-500/30 p-6 shadow-xl">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center flex-shrink-0">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">AI Executive Summary</h3>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Your startup is showing strong growth momentum with a 92/100 growth score and 12.3% MRR increase. However, the AI CFO has identified a critical risk: your current burn rate of $52K/month will exhaust runway in 13 months. Strategic recommendation: accelerate fundraising timeline by 2-3 months or reduce operational costs by 15% to extend runway to 18+ months. The AI Growth Agent projects continued revenue growth at current trajectory, making this an optimal fundraising window.
            </p>
          </div>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="rounded-2xl backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-xl">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Recent Alerts & Recommendations</h3>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`flex items-start gap-4 p-4 rounded-xl border ${
                alert.type === "critical"
                  ? "bg-red-500/10 border-red-500/20 dark:bg-red-500/20 dark:border-red-500/30"
                  : alert.type === "warning"
                  ? "bg-amber-500/10 border-amber-500/20 dark:bg-amber-500/20 dark:border-amber-500/30"
                  : "bg-emerald-500/10 border-emerald-500/20 dark:bg-emerald-500/20 dark:border-emerald-500/30"
              }`}
            >
              {alert.type === "critical" ? (
                <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              ) : alert.type === "warning" ? (
                <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              ) : (
                <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <h4 className="font-semibold text-slate-900 dark:text-white">{alert.title}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{alert.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-slate-500 dark:text-slate-500">Confidence:</span>
                  <div className="flex-1 max-w-xs bg-slate-200 dark:bg-slate-800 rounded-full h-1.5">
                    <div
                      className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full"
                      style={{ width: `${alert.confidence}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{alert.confidence}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
