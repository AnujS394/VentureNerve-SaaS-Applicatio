import { useState } from "react";
import { motion } from "motion/react";
import {
  Target, Download, RefreshCw, ChevronRight, TrendingUp,
  AlertTriangle, CheckCircle, Flame, Layers, Calendar, Globe,
  BarChart2, Zap, ArrowUpRight,
} from "lucide-react";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, Cell,
} from "recharts";
import { toast } from "sonner";
import { downloadTextFile, formatCsv } from "../../utils/download";

const strategicPillars = [
  { subject: "Market Expansion", A: 78, fullMark: 100 },
  { subject: "Product Innovation", A: 85, fullMark: 100 },
  { subject: "Revenue Growth", A: 72, fullMark: 100 },
  { subject: "Operational Efficiency", A: 68, fullMark: 100 },
  { subject: "Brand Awareness", A: 55, fullMark: 100 },
  { subject: "Partnership Dev.", A: 62, fullMark: 100 },
];

const okrProgress = [
  { name: "Close 10 Enterprise Deals", progress: 70, target: 100, status: "on-track" },
  { name: "Expand to EU Market", progress: 35, target: 100, status: "at-risk" },
  { name: "Achieve $60K MRR", progress: 73, target: 100, status: "on-track" },
  { name: "Reduce CAC by 20%", progress: 60, target: 100, status: "on-track" },
  { name: "NPS Score > 70", progress: 95, target: 100, status: "achieved" },
  { name: "SOC 2 Compliance", progress: 45, target: 100, status: "at-risk" },
];

const marketOpportunityData = [
  { segment: "SMB", tam: 4200, sam: 800, current: 120 },
  { segment: "Mid-Market", tam: 12500, sam: 2400, current: 280 },
  { segment: "Enterprise", tam: 38000, sam: 5600, current: 90 },
  { segment: "Gov/EDU", tam: 8900, sam: 1100, current: 20 },
];

const executionScoreData = [
  { month: "Jan", score: 71 }, { month: "Feb", score: 74 },
  { month: "Mar", score: 72 }, { month: "Apr", score: 79 },
  { month: "May", score: 83 }, { month: "Jun", score: 87 },
];

const priorities = [
  { priority: "critical", title: "Accelerate EU market entry", impact: "3x TAM expansion", effort: "High", deadline: "Sep 30, 2026", description: "GDPR compliance and local partnerships are the key blockers. Assign dedicated EU lead." },
  { priority: "high", title: "Launch enterprise self-serve tier", impact: "+40% deal velocity", effort: "Medium", deadline: "Aug 15, 2026", description: "Product-led growth motion for enterprise prospects showing high intent." },
  { priority: "high", title: "Formalize partner ecosystem", impact: "20% referral revenue", effort: "Medium", deadline: "Aug 31, 2026", description: "3 potential integration partners identified. Mutual pipeline opportunity of $1.2M." },
  { priority: "medium", title: "Quarterly OKR review cadence", impact: "15% execution lift", effort: "Low", deadline: "Jul 1, 2026", description: "Move from monthly to weekly OKR check-ins for faster course correction." },
];

const statusColor: Record<string, string> = {
  "on-track": "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  "at-risk": "bg-amber-500/10 text-amber-600 border-amber-500/20",
  "achieved": "bg-violet-500/10 text-violet-600 border-violet-500/20",
};

const priorityColor: Record<string, string> = {
  critical: "bg-red-500/10 text-red-500 border-red-500/20",
  high: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  medium: "bg-blue-500/10 text-blue-500 border-blue-500/20",
};

export function StrategyDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "okrs" | "market" | "priorities">("overview");
  const [refreshing, setRefreshing] = useState(false);

  return (
    <div className="p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-lg">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">AI Strategy Agent</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm text-slate-500 dark:text-slate-400">Live · 87% alignment score</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => { setRefreshing(true); setTimeout(() => { setRefreshing(false); toast.success("Strategy data refreshed"); }, 1400); }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100/60 dark:bg-slate-800/60 border border-slate-200/40 dark:border-slate-700/40 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors">
            <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <button onClick={() => {
              const rows = [
                ["Metric", "Value", "Status"],
                ["Strategy Alignment", "87%", "Live"],
                ["Active OKRs", "6", "Ongoing"],
                ["Market Opportunities", "4", "Tracked"],
              ];
                const ok = downloadTextFile("strategy-report.csv", formatCsv(rows), "text/csv;charset=utf-8");
                if (ok) toast.success("Strategy report downloaded");
                else toast.error("Failed to download Strategy report. Check console for details.");
            }}
            type="button"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium transition-colors shadow-lg shadow-violet-500/20">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Strategic Priorities", value: "5 Active", change: "+1 this quarter", icon: Target, color: "text-violet-500" },
          { label: "Opportunities", value: "12 Identified", change: "+3 this month", icon: Globe, color: "text-blue-500" },
          { label: "Mission Alignment", value: "87%", change: "+4% vs last mo", icon: BarChart2, color: "text-emerald-500" },
          { label: "Execution Score", value: "Good", change: "+12 pts", icon: Zap, color: "text-amber-500" },
        ].map((kpi, i) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.04 }}
            className="rounded-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-4 shadow-sm">
            <div className="flex items-start justify-between mb-2">
              <p className="text-xs text-slate-500 dark:text-slate-400">{kpi.label}</p>
              <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
            </div>
            <p className="text-xl font-bold text-slate-900 dark:text-white">{kpi.value}</p>
            <div className="flex items-center gap-1 mt-1 text-xs font-medium text-emerald-500"><ArrowUpRight className="w-3 h-3" />{kpi.change}</div>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-slate-100/60 dark:bg-slate-800/60 border border-slate-200/40 dark:border-slate-700/40 w-fit">
        {(["overview", "okrs", "market", "priorities"] as const).map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${activeTab === tab ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 dark:text-slate-400"}`}>
            {tab === "okrs" ? "OKRs" : tab}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Strategic Pillar Assessment</h2>
            <p className="text-sm text-slate-500 mb-4">AI evaluation across 6 dimensions</p>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={strategicPillars}>
                <PolarGrid stroke="rgba(148,163,184,0.2)" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "#94a3b8" }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Score" dataKey="A" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.25} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Execution Score Trend</h2>
            <p className="text-sm text-slate-500 mb-4">Monthly strategic execution quality</p>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={executionScoreData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="rgba(148,163,184,0.3)" />
                <YAxis domain={[50, 100]} tick={{ fontSize: 11 }} stroke="rgba(148,163,184,0.3)" />
                <Tooltip contentStyle={{ background: "rgba(15,23,42,0.9)", border: "none", borderRadius: 8 }} />
                <Line type="monotone" dataKey="score" name="Score" stroke="#8b5cf6" strokeWidth={2.5} dot={{ r: 5, fill: "#8b5cf6" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === "okrs" && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Q3 2026 OKRs — Progress Tracker</h2>
          {okrProgress.map((okr, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
              className="rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{okr.name}</span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full border capitalize ${statusColor[okr.status]}`}>{okr.status.replace("-", " ")}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${okr.progress}%` }} transition={{ delay: i * 0.06 + 0.2, duration: 0.6 }}
                    className={`h-full rounded-full ${okr.status === "achieved" ? "bg-violet-500" : okr.status === "on-track" ? "bg-emerald-500" : "bg-amber-500"}`} />
                </div>
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 w-10 text-right">{okr.progress}%</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === "market" && (
        <div className="space-y-6">
          <div className="rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Market Opportunity by Segment</h2>
            <p className="text-sm text-slate-500 mb-4">TAM vs SAM vs current revenue ($K)</p>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={marketOpportunityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                <XAxis dataKey="segment" tick={{ fontSize: 11 }} stroke="rgba(148,163,184,0.3)" />
                <YAxis tickFormatter={(v) => `$${v}K`} tick={{ fontSize: 11 }} stroke="rgba(148,163,184,0.3)" />
                <Tooltip formatter={(v: number) => [`$${v}K`, ""]} contentStyle={{ background: "rgba(15,23,42,0.9)", border: "none", borderRadius: 8 }} />
                <Legend />
                <Bar dataKey="tam" name="TAM" fill="#8b5cf6" opacity={0.3} radius={[4, 4, 0, 0]} />
                <Bar dataKey="sam" name="SAM" fill="#8b5cf6" opacity={0.6} radius={[4, 4, 0, 0]} />
                <Bar dataKey="current" name="Current" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === "priorities" && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center"><Layers className="w-4 h-4 text-white" /></div>
            <div><h2 className="text-lg font-semibold text-slate-900 dark:text-white">Strategic Priorities</h2><p className="text-sm text-slate-500">AI-ranked by strategic impact</p></div>
          </div>
          {priorities.map((rec, i) => (
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
                  <div className="flex items-center gap-1 text-violet-600 dark:text-violet-400 text-sm font-semibold"><TrendingUp className="w-4 h-4" />{rec.impact}</div>
                  <div className="flex items-center gap-1 text-slate-500 text-xs"><Calendar className="w-3.5 h-3.5" />{rec.deadline}</div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100/60 dark:border-slate-800/60 flex justify-end">
                <button onClick={() => toast.success(`"${rec.title}" added to roadmap`)} className="flex items-center gap-1.5 text-sm font-medium text-violet-600 dark:text-violet-400">
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
