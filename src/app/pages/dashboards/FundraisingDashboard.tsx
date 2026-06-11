import { useState } from "react";
import { motion } from "motion/react";
import {
  Briefcase, Download, RefreshCw, ChevronRight, AlertTriangle,
  CheckCircle, Flame, Layers, Calendar, Users, TrendingUp,
  ArrowUpRight, Zap, DollarSign, Star, Mail, Phone,
} from "lucide-react";
import {
  RadialBarChart, RadialBar, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell,
} from "recharts";
import { toast } from "sonner";
import { downloadTextFile, formatCsv } from "../../utils/download";

const readinessData = [{ name: "Readiness", value: 74, fill: "#8b5cf6" }];

const metricsReadiness = [
  { metric: "MRR Growth (MoM)", score: 90, benchmark: "10%+", actual: "10%", status: "strong" },
  { metric: "Gross Margin", score: 85, benchmark: "65%+", actual: "72%", status: "strong" },
  { metric: "CAC:LTV Ratio", score: 95, benchmark: "1:3+", actual: "1:12.4", status: "strong" },
  { metric: "Net Revenue Retention", score: 80, benchmark: "100%+", actual: "108%", status: "strong" },
  { metric: "Cash Runway", score: 55, benchmark: "18mo+", actual: "13 mo", status: "at-risk" },
  { metric: "Customer Count", score: 60, benchmark: "100+", actual: "86", status: "improving" },
];

const investorPipeline = [
  { name: "Sequoia Capital", stage: "Intro Sent", tier: 1, fit: 95, lastContact: "Jun 3" },
  { name: "a16z", stage: "Meeting Scheduled", tier: 1, fit: 88, lastContact: "Jun 5" },
  { name: "Lightspeed", stage: "Intro Sent", tier: 1, fit: 82, lastContact: "Jun 1" },
  { name: "Bessemer Ventures", stage: "Not Contacted", tier: 1, fit: 79, lastContact: "—" },
  { name: "Accel Partners", stage: "Not Contacted", tier: 2, fit: 74, lastContact: "—" },
  { name: "Index Ventures", stage: "Meeting Scheduled", tier: 1, fit: 86, lastContact: "Jun 6" },
  { name: "General Catalyst", stage: "Due Diligence", tier: 1, fit: 91, lastContact: "Jun 7" },
];

const valuationData = [
  { scenario: "Bear", valuation: 8, arr: 528 },
  { scenario: "Base", valuation: 12, arr: 528 },
  { scenario: "Bull", valuation: 18, arr: 528 },
];

const timelineData = [
  { month: "Jul", task: "Finalize deck & data room", done: false },
  { month: "Aug", task: "Soft outreach to 5 target VCs", done: false },
  { month: "Sep", task: "Partner meetings & pitch", done: false },
  { month: "Oct", task: "Term sheet discussions", done: false },
  { month: "Nov", task: "Due diligence process", done: false },
  { month: "Dec", task: "Close Series A", done: false },
];

const recommendations = [
  { priority: "critical", title: "Extend runway to 18+ months", impact: "Series A prerequisite", effort: "High", deadline: "Sep 1, 2026", description: "Most Series A investors want 18mo runway. Bridge round of $500K or aggressive revenue growth needed." },
  { priority: "high", title: "Build warm intro path to Sequoia", impact: "Tier-1 VC access", effort: "Medium", deadline: "Aug 1, 2026", description: "3 portfolio company founders in your network. Ask for intros now to build relationship before formal process." },
  { priority: "high", title: "Achieve 100 paying customers", impact: "Key credibility milestone", effort: "Medium", deadline: "Aug 31, 2026", description: "Currently at 86. 14 more customers before outreach converts perception from 'early' to 'traction'." },
  { priority: "medium", title: "Prepare investor data room", impact: "Accelerates DD by 3 weeks", effort: "Low", deadline: "Jul 20, 2026", description: "Cap table, financial model, legal docs, customer references all need to be organized proactively." },
];

const stageColor: Record<string, string> = {
  "Intro Sent": "bg-blue-500/10 text-blue-500 border-blue-500/20",
  "Meeting Scheduled": "bg-violet-500/10 text-violet-500 border-violet-500/20",
  "Not Contacted": "bg-slate-500/10 text-slate-400 border-slate-500/20",
  "Due Diligence": "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
};

const priorityColor: Record<string, string> = {
  critical: "bg-red-500/10 text-red-500 border-red-500/20",
  high: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  medium: "bg-blue-500/10 text-blue-500 border-blue-500/20",
};

const statusColor: Record<string, string> = {
  strong: "text-emerald-500",
  "at-risk": "text-red-500",
  improving: "text-amber-500",
};

export function FundraisingDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "pipeline" | "timeline" | "recommendations">("overview");
  const [refreshing, setRefreshing] = useState(false);

  return (
    <div className="p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-500 to-purple-500 flex items-center justify-center shadow-lg">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">AI Fundraising Agent</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm text-slate-500 dark:text-slate-400">Live · Series A in 3-4 months</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => { setRefreshing(true); setTimeout(() => { setRefreshing(false); toast.success("Fundraising data refreshed"); }, 1400); }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100/60 dark:bg-slate-800/60 border border-slate-200/40 dark:border-slate-700/40 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors">
            <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <button onClick={() => {
              const rows = [
                ["Investor", "Stage", "Fit", "Last Contact"],
                ...investorPipeline.map((item) => [item.name, item.stage, `${item.fit}%`, item.lastContact]),
              ];
            const ok = downloadTextFile("fundraising-agent-report.csv", formatCsv(rows), "text/csv;charset=utf-8");
            if (ok) toast.success("Fundraising report downloaded");
            else toast.error("Failed to download Fundraising report. Check console for details.");
            }}
            type="button"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-700 text-white text-sm font-medium transition-colors shadow-lg shadow-fuchsia-500/20">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Raise Readiness", value: "74%", change: "+6% this month", icon: Star },
          { label: "Investors Mapped", value: "23", change: "+5 new", icon: Users },
          { label: "Ideal Timeline", value: "Q4 2026", change: "3-4 months out", icon: Calendar },
          { label: "Valuation Range", value: "$12-15M", change: "Base: 22.7x ARR", icon: DollarSign },
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
        {(["overview", "pipeline", "timeline", "recommendations"] as const).map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${activeTab === tab ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 dark:text-slate-400"}`}>
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Readiness Gauge */}
            <div className="rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-xl flex flex-col items-center">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 self-start">Raise Readiness</h2>
              <ResponsiveContainer width="100%" height={180}>
                <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={readinessData} startAngle={180} endAngle={0}>
                  <RadialBar dataKey="value" cornerRadius={8} background={{ fill: "rgba(148,163,184,0.1)" }} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="-mt-10 text-center">
                <p className="text-4xl font-bold text-slate-900 dark:text-white">74%</p>
                <p className="text-sm text-slate-500 mt-1">Series A Ready</p>
              </div>
            </div>

            {/* Valuation scenarios */}
            <div className="lg:col-span-2 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-xl">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Valuation Scenarios</h2>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={valuationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                  <XAxis dataKey="scenario" tick={{ fontSize: 12 }} stroke="rgba(148,163,184,0.3)" />
                  <YAxis tickFormatter={(v) => `$${v}M`} tick={{ fontSize: 11 }} stroke="rgba(148,163,184,0.3)" />
                  <Tooltip formatter={(v: number) => [`$${v}M`, "Valuation"]} contentStyle={{ background: "rgba(15,23,42,0.9)", border: "none", borderRadius: 8 }} />
                  <Bar dataKey="valuation" radius={[6, 6, 0, 0]}>
                    {valuationData.map((e, i) => <Cell key={i} fill={i === 0 ? "#f43f5e" : i === 1 ? "#8b5cf6" : "#10b981"} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-3 gap-3 mt-4">
                {[{ l: "Bear Case", v: "$8M", m: "15.2x ARR", c: "text-red-500" }, { l: "Base Case", v: "$12M", m: "22.7x ARR", c: "text-violet-500" }, { l: "Bull Case", v: "$18M", m: "34.1x ARR", c: "text-emerald-500" }].map(s => (
                  <div key={s.l} className="text-center"><p className={`text-lg font-bold ${s.c}`}>{s.v}</p><p className="text-xs text-slate-500">{s.l}</p><p className="text-xs text-slate-400">{s.m}</p></div>
                ))}
              </div>
            </div>
          </div>

          {/* Metrics vs Benchmarks */}
          <div className="rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Metrics vs Series A Benchmarks</h2>
            <div className="space-y-3">
              {metricsReadiness.map((m, i) => (
                <div key={m.metric} className="flex items-center gap-4">
                  <div className="w-44 flex-shrink-0">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{m.metric}</p>
                    <p className="text-xs text-slate-400">Benchmark: {m.benchmark}</p>
                  </div>
                  <div className="flex-1 h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${m.score}%` }} transition={{ delay: i * 0.07 + 0.2, duration: 0.5 }}
                      className={`h-full rounded-full ${m.status === "strong" ? "bg-emerald-500" : m.status === "at-risk" ? "bg-red-500" : "bg-amber-500"}`} />
                  </div>
                  <div className="flex items-center gap-2 w-24 justify-end">
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{m.actual}</span>
                    <span className={`text-xs font-medium ${statusColor[m.status]}`}>{m.score}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "pipeline" && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Investor Pipeline</h2>
          {investorPipeline.map((inv, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
              className="rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-fuchsia-500/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-fuchsia-600">{inv.name[0]}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{inv.name}</p>
                      <span className="text-xs text-slate-400">Tier {inv.tier}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${stageColor[inv.stage]}`}>{inv.stage}</span>
                      {inv.lastContact !== "—" && <span className="text-xs text-slate-400">Last: {inv.lastContact}</span>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <p className="text-lg font-bold text-fuchsia-600">{inv.fit}%</p>
                    <p className="text-xs text-slate-400">Fit Score</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => toast.success(`Email drafted for ${inv.name}`)} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"><Mail className="w-4 h-4 text-slate-500" /></button>
                    <button onClick={() => toast.success(`${inv.name} meeting scheduled`)} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"><Phone className="w-4 h-4 text-slate-500" /></button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === "timeline" && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Fundraising Roadmap — Q3/Q4 2026</h2>
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-fuchsia-500 to-purple-500 opacity-30" />
            {timelineData.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                className="relative flex items-start gap-4 pb-6 pl-12">
                <div className="absolute left-3 w-5 h-5 rounded-full border-2 border-fuchsia-500 bg-white dark:bg-slate-950 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-fuchsia-500" />
                </div>
                <div className="flex-1 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-fuchsia-600 dark:text-fuchsia-400">{item.month} 2026</span>
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mt-0.5">{item.task}</p>
                    </div>
                    <button onClick={() => toast.success(`${item.task} marked complete`)} className="text-xs font-medium text-violet-600 dark:text-violet-400 hover:underline">Mark Done</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "recommendations" && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-fuchsia-500 to-purple-500 flex items-center justify-center"><Layers className="w-4 h-4 text-white" /></div>
            <div><h2 className="text-lg font-semibold text-slate-900 dark:text-white">Fundraising Recommendations</h2><p className="text-sm text-slate-500">AI-ranked by raise impact</p></div>
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
                  <div className="flex items-center gap-1 text-fuchsia-600 dark:text-fuchsia-400 text-sm font-semibold"><Zap className="w-4 h-4" />{rec.impact}</div>
                  <div className="flex items-center gap-1 text-slate-500 text-xs"><Calendar className="w-3.5 h-3.5" />{rec.deadline}</div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100/60 dark:border-slate-800/60 flex justify-end">
                <button onClick={() => toast.success(`"${rec.title}" added to fundraising plan`)} className="flex items-center gap-1.5 text-sm font-medium text-violet-600 dark:text-violet-400">
                  Add to Plan<ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
