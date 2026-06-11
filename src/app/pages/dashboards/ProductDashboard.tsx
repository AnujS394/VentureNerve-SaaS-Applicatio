import { useState } from "react";
import { motion } from "motion/react";
import {
  Package, Download, RefreshCw, ChevronRight, AlertTriangle,
  CheckCircle, Flame, Layers, Calendar, Users, ThumbsUp,
  ArrowUpRight, Zap, Star, Activity, BarChart2,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell,
} from "recharts";
import { toast } from "sonner";
import { downloadTextFile, formatCsv } from "../../utils/download";

const engagementData = [
  { month: "Jan", dau: 3200, mau: 8900, engagement: 72 },
  { month: "Feb", mau: 9400, dau: 3500, engagement: 74 },
  { month: "Mar", mau: 10100, dau: 3900, engagement: 77 },
  { month: "Apr", mau: 10800, dau: 4200, engagement: 79 },
  { month: "May", mau: 11600, dau: 4700, engagement: 80 },
  { month: "Jun", mau: 12450, dau: 5100, engagement: 82 },
];

const featureAdoption = [
  { name: "Analytics Dashboard", adoption: 95, users: 11827 },
  { name: "AI Insights", adoption: 78, users: 9711 },
  { name: "Custom Reports", adoption: 65, users: 8092 },
  { name: "Data Export", adoption: 58, users: 7221 },
  { name: "Team Collaboration", adoption: 43, users: 5353 },
  { name: "API Integration", adoption: 31, users: 3859 },
];

const npsData = [
  { month: "Jan", nps: 52 }, { month: "Feb", nps: 55 },
  { month: "Mar", nps: 57 }, { month: "Apr", nps: 61 },
  { month: "May", nps: 63 }, { month: "Jun", nps: 67 },
];

const topRequests = [
  { feature: "Advanced Filtering", votes: 45, priority: "critical" },
  { feature: "Custom Dashboards", votes: 38, priority: "high" },
  { feature: "Slack Integration", votes: 32, priority: "high" },
  { feature: "Mobile App", votes: 29, priority: "medium" },
  { feature: "Bulk CSV Export", votes: 21, priority: "medium" },
  { feature: "Role-based Access", votes: 18, priority: "low" },
];

const recommendations = [
  { priority: "critical", title: "Ship Advanced Filtering (top request)", impact: "95% user demand", effort: "Medium", deadline: "Jul 30, 2026", description: "45 users explicitly requested this. Blocking 3 enterprise deals. Ship MVP version first." },
  { priority: "high", title: "Improve team collaboration feature", impact: "+22% MAU", effort: "Medium", deadline: "Aug 15, 2026", description: "Collaboration feature at only 43% adoption. In-app discovery and onboarding are needed." },
  { priority: "high", title: "Launch mobile app (iOS)", impact: "+30% engagement", effort: "High", deadline: "Sep 30, 2026", description: "29 votes, rising. Competitors with mobile see 30% higher daily engagement." },
  { priority: "medium", title: "Redesign API documentation", impact: "+40% API adoption", effort: "Low", deadline: "Jul 15, 2026", description: "API integration at 31% adoption. Better docs would unlock a developer-led growth motion." },
];

const priorityColor: Record<string, string> = {
  critical: "bg-red-500/10 text-red-500 border-red-500/20",
  high: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  medium: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  low: "bg-slate-500/10 text-slate-500 border-slate-500/20",
};

export function ProductDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "features" | "nps" | "recommendations">("overview");
  const [refreshing, setRefreshing] = useState(false);

  return (
    <div className="p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-lg">
            <Package className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">AI Product Agent</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm text-slate-500 dark:text-slate-400">Live · NPS +67 · 12,450 MAU</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => { setRefreshing(true); setTimeout(() => { setRefreshing(false); toast.success("Product data refreshed"); }, 1400); }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100/60 dark:bg-slate-800/60 border border-slate-200/40 dark:border-slate-700/40 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors">
            <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <button onClick={() => {
              const rows = [
                ["Feature", "Adoption", "Users"],
                ...topRequests.map((req) => [req.feature, req.priority, req.votes]),
              ];
                const ok = downloadTextFile("product-agent-report.csv", formatCsv(rows), "text/csv;charset=utf-8");
                if (ok) toast.success("Product report downloaded");
                else toast.error("Failed to download Product report. Check console for details.");
            }}
            type="button"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-sm font-medium transition-colors shadow-lg shadow-pink-500/20">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Monthly Active Users", value: "12,450", change: "+7.3% vs last mo", icon: Users },
          { label: "Engagement Rate", value: "82%", change: "+2%", icon: Activity },
          { label: "NPS Score", value: "+67", change: "+4 pts", icon: ThumbsUp },
          { label: "Feature Adoption", value: "High", change: "+5 features", icon: Star },
        ].map((kpi, i) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.04 }}
            className="rounded-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-4 shadow-sm">
            <div className="flex items-start justify-between mb-2">
              <p className="text-xs text-slate-500 dark:text-slate-400">{kpi.label}</p>
              <kpi.icon className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-xl font-bold text-slate-900 dark:text-white">{kpi.value}</p>
            <div className="flex items-center gap-1 mt-1 text-xs font-medium text-emerald-500"><ArrowUpRight className="w-3 h-3" />{kpi.change}</div>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-slate-100/60 dark:bg-slate-800/60 border border-slate-200/40 dark:border-slate-700/40 w-fit">
        {(["overview", "features", "nps", "recommendations"] as const).map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${activeTab === tab ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 dark:text-slate-400"}`}>
            {tab === "nps" ? "NPS" : tab}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">MAU & DAU Growth</h2>
            <p className="text-sm text-slate-500 mb-4">Monthly & daily active users</p>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={engagementData}>
                <defs>
                  <linearGradient id="mauGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2} /><stop offset="95%" stopColor="#f43f5e" stopOpacity={0} /></linearGradient>
                  <linearGradient id="dauGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f97316" stopOpacity={0.2} /><stop offset="95%" stopColor="#f97316" stopOpacity={0} /></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="rgba(148,163,184,0.3)" />
                <YAxis tick={{ fontSize: 11 }} stroke="rgba(148,163,184,0.3)" />
                <Tooltip contentStyle={{ background: "rgba(15,23,42,0.9)", border: "none", borderRadius: 8 }} />
                <Legend />
                <Area type="monotone" dataKey="mau" name="MAU" stroke="#f43f5e" fill="url(#mauGrad)" strokeWidth={2} dot={false} />
                <Area type="monotone" dataKey="dau" name="DAU" stroke="#f97316" fill="url(#dauGrad)" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Top Feature Requests</h2>
            <div className="space-y-3">
              {topRequests.map((req, i) => (
                <div key={req.feature} className="flex items-center gap-4">
                  <span className="text-xs font-bold text-slate-400 w-4">{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{req.feature}</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full border capitalize ${priorityColor[req.priority]}`}>{req.priority}</span>
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{req.votes} votes</span>
                      </div>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${(req.votes / 45) * 100}%` }} transition={{ delay: i * 0.07, duration: 0.5 }}
                        className="h-full rounded-full bg-gradient-to-r from-pink-500 to-rose-500" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "features" && (
        <div className="space-y-6">
          <div className="rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Feature Adoption Rates</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={featureAdoption} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} tick={{ fontSize: 11 }} stroke="rgba(148,163,184,0.3)" />
                <YAxis dataKey="name" type="category" width={140} tick={{ fontSize: 11 }} stroke="rgba(148,163,184,0.3)" />
                <Tooltip formatter={(v: number) => [`${v}%`, "Adoption"]} contentStyle={{ background: "rgba(15,23,42,0.9)", border: "none", borderRadius: 8 }} />
                <Bar dataKey="adoption" radius={[0, 4, 4, 0]}>
                  {featureAdoption.map((e, i) => <Cell key={i} fill={e.adoption >= 80 ? "#10b981" : e.adoption >= 50 ? "#f59e0b" : "#f43f5e"} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === "nps" && (
        <div className="space-y-6">
          <div className="rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">NPS Score Trend</h2>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={npsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="rgba(148,163,184,0.3)" />
                <YAxis domain={[40, 80]} tick={{ fontSize: 11 }} stroke="rgba(148,163,184,0.3)" />
                <Tooltip contentStyle={{ background: "rgba(15,23,42,0.9)", border: "none", borderRadius: 8 }} />
                <Line type="monotone" dataKey="nps" name="NPS" stroke="#f43f5e" strokeWidth={2.5} dot={{ r: 5, fill: "#f43f5e" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[{ label: "Promoters", pct: "62%", color: "emerald" }, { label: "Passives", pct: "25%", color: "amber" }, { label: "Detractors", pct: "13%", color: "red" }].map((seg) => (
              <div key={seg.label} className={`rounded-2xl bg-${seg.color}-500/10 border border-${seg.color}-500/20 p-5 text-center`}>
                <p className={`text-3xl font-bold text-${seg.color}-600 dark:text-${seg.color}-400`}>{seg.pct}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{seg.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "recommendations" && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center"><Layers className="w-4 h-4 text-white" /></div>
            <div><h2 className="text-lg font-semibold text-slate-900 dark:text-white">Product Recommendations</h2><p className="text-sm text-slate-500">AI-ranked by user impact</p></div>
          </div>
          {recommendations.map((rec, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
              className="rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-5 shadow-lg">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-0.5">
                    {rec.priority === "critical" ? <AlertTriangle className="w-5 h-5 text-red-500" /> : rec.priority === "high" ? <Flame className="w-5 h-5 text-amber-500" /> : <CheckCircle className="w-5 h-5 text-blue-500" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-semibold text-slate-900 dark:text-white">{rec.title}</h3>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full border capitalize ${priorityColor[rec.priority]}`}>{rec.priority}</span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{rec.description}</p>
                  </div>
                </div>
                <div className="flex flex-row md:flex-col items-center md:items-end gap-3 flex-shrink-0">
                  <div className="flex items-center gap-1 text-pink-600 dark:text-pink-400 text-sm font-semibold"><Zap className="w-4 h-4" />{rec.impact}</div>
                  <div className="flex items-center gap-1 text-slate-500 text-xs"><Calendar className="w-3.5 h-3.5" />{rec.deadline}</div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100/60 dark:border-slate-800/60 flex justify-end">
                <button onClick={() => toast.success(`"${rec.title}" added to product roadmap`)} className="flex items-center gap-1.5 text-sm font-medium text-violet-600 dark:text-violet-400">
                  Add to Roadmap<ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
