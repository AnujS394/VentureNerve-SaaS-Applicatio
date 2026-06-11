import { useState } from "react";
import { motion } from "motion/react";
import {
  TrendingUp, Download, RefreshCw, ChevronRight, AlertTriangle,
  CheckCircle, Flame, Layers, Calendar, Users, BarChart2,
  ArrowUpRight, Zap, MousePointer, Star,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell,
} from "recharts";
import { toast } from "sonner";
import { downloadTextFile, formatCsv } from "../../utils/download";

const growthData = [
  { month: "Jan", visitors: 12400, signups: 420, activated: 310, paid: 98 },
  { month: "Feb", visitors: 14800, signups: 510, activated: 390, paid: 124 },
  { month: "Mar", visitors: 17200, signups: 610, activated: 470, paid: 155 },
  { month: "Apr", visitors: 19500, signups: 680, activated: 520, paid: 178 },
  { month: "May", visitors: 23100, signups: 820, activated: 640, paid: 218 },
  { month: "Jun", visitors: 27800, signups: 970, activated: 770, paid: 261 },
];

const channelData = [
  { channel: "Organic SEO", cac: 120, ltv: 4200, conv: 3.8, volume: 380 },
  { channel: "Paid Search", cac: 480, ltv: 4800, conv: 2.1, volume: 210 },
  { channel: "Content Mkt", cac: 95, ltv: 3900, conv: 4.2, volume: 145 },
  { channel: "Referral", cac: 60, ltv: 5100, conv: 8.7, volume: 88 },
  { channel: "Social", cac: 340, ltv: 3200, conv: 1.4, volume: 72 },
];

const retentionCohorts = [
  { cohort: "Jan", m1: 88, m2: 81, m3: 76, m6: 69 },
  { cohort: "Feb", m1: 90, m2: 83, m3: 79, m6: 72 },
  { cohort: "Mar", m1: 89, m2: 84, m3: 80, m6: 73 },
  { cohort: "Apr", m1: 92, m2: 86, m3: 82, m6: null },
  { cohort: "May", m1: 91, m2: 87, m3: null, m6: null },
  { cohort: "Jun", m1: 93, m2: null, m3: null, m6: null },
];

const funnelData = [
  { name: "Visitors", value: 27800, fill: "#8b5cf6" },
  { name: "Signups", value: 970, fill: "#6d28d9" },
  { name: "Activated", value: 770, fill: "#5b21b6" },
  { name: "Paid", value: 261, fill: "#4c1d95" },
];

const recommendations = [
  { priority: "critical", title: "Double down on referral program", impact: "CAC from $340→$60", effort: "Low", deadline: "Jul 15, 2026", description: "Referral channel shows 8.7% conversion and lowest CAC. Structured incentive program could 3x volume." },
  { priority: "high", title: "Fix activation drop-off (D3)", impact: "+25% paid conversion", effort: "Medium", deadline: "Aug 1, 2026", description: "20% of activated users churn on Day 3. Onboarding email sequence + in-app guidance needed." },
  { priority: "high", title: "Scale SEO content engine", impact: "+40% organic traffic", effort: "Medium", deadline: "Sep 1, 2026", description: "Organic SEO is the 2nd best performing channel. 3 new content verticals identified." },
  { priority: "medium", title: "A/B test pricing page", impact: "+12% conversion", effort: "Low", deadline: "Jul 31, 2026", description: "Current pricing page converts at 2.1%. Competitor analysis reveals 3 high-impact layout changes." },
];

const priorityColor: Record<string, string> = {
  critical: "bg-red-500/10 text-red-500 border-red-500/20",
  high: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  medium: "bg-blue-500/10 text-blue-500 border-blue-500/20",
};

export function GrowthDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "channels" | "retention" | "recommendations">("overview");
  const [refreshing, setRefreshing] = useState(false);

  return (
    <div className="p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">AI Growth Agent</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm text-slate-500 dark:text-slate-400">Live · CAC:LTV = 1:12.4</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => { setRefreshing(true); setTimeout(() => { setRefreshing(false); toast.success("Growth data refreshed"); }, 1400); }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100/60 dark:bg-slate-800/60 border border-slate-200/40 dark:border-slate-700/40 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors">
            <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <button onClick={() => {
              const rows = [
                ["Channel", "CAC", "LTV", "Conversion"],
                ...channelData.map((item) => [item.channel, item.cac, item.ltv, item.conv]),
              ];
                const ok = downloadTextFile("growth-agent-report.csv", formatCsv(rows), "text/csv;charset=utf-8");
                if (ok) toast.success("Growth report downloaded");
                else toast.error("Failed to download Growth report. Check console for details.");
            }}
            type="button"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors shadow-lg shadow-blue-500/20">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "CAC", value: "$340", change: "-12% vs last mo", good: true, icon: Users },
          { label: "LTV", value: "$4,200", change: "+8% vs last mo", good: true, icon: Star },
          { label: "Conversion Rate", value: "3.4%", change: "+0.4%", good: true, icon: MousePointer },
          { label: "Retention (30d)", value: "89%", change: "+2%", good: true, icon: BarChart2 },
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
        {(["overview", "channels", "retention", "recommendations"] as const).map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${activeTab === tab ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 dark:text-slate-400"}`}>
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Growth Funnel Trend</h2>
            <p className="text-sm text-slate-500 mb-4">Visitors → Signups → Activated → Paid</p>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={growthData}>
                <defs>
                  {[["v","#8b5cf6"],["s","#06b6d4"],["a","#10b981"],["p","#f59e0b"]].map(([id, color]) => (
                    <linearGradient key={id} id={`g-${id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={color} stopOpacity={0.2} />
                      <stop offset="95%" stopColor={color} stopOpacity={0} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="rgba(148,163,184,0.3)" />
                <YAxis tick={{ fontSize: 11 }} stroke="rgba(148,163,184,0.3)" />
                <Tooltip contentStyle={{ background: "rgba(15,23,42,0.9)", border: "none", borderRadius: 8 }} />
                <Legend />
                <Area type="monotone" dataKey="visitors" name="Visitors" stroke="#8b5cf6" fill="url(#g-v)" strokeWidth={2} dot={false} />
                <Area type="monotone" dataKey="signups" name="Signups" stroke="#06b6d4" fill="url(#g-s)" strokeWidth={2} dot={false} />
                <Area type="monotone" dataKey="activated" name="Activated" stroke="#10b981" fill="url(#g-a)" strokeWidth={2} dot={false} />
                <Area type="monotone" dataKey="paid" name="Paid" stroke="#f59e0b" fill="url(#g-p)" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Conversion Funnel — June 2026</h2>
            <div className="space-y-3">
              {funnelData.map((step, i) => (
                <div key={step.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{step.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-slate-500">{step.value.toLocaleString()}</span>
                      {i > 0 && <span className="text-xs text-amber-500">{((step.value / funnelData[i-1].value) * 100).toFixed(1)}%</span>}
                    </div>
                  </div>
                  <div className="h-8 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${(step.value / funnelData[0].value) * 100}%` }} transition={{ delay: i * 0.1 + 0.2, duration: 0.6 }}
                      className="h-full rounded-lg flex items-center px-3" style={{ background: step.fill }}>
                      <span className="text-xs font-medium text-white">{((step.value / funnelData[0].value) * 100).toFixed(1)}%</span>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "channels" && (
        <div className="space-y-6">
          <div className="rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">CAC by Channel</h2>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={channelData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                <XAxis type="number" tickFormatter={(v) => `$${v}`} tick={{ fontSize: 11 }} stroke="rgba(148,163,184,0.3)" />
                <YAxis dataKey="channel" type="category" width={90} tick={{ fontSize: 11 }} stroke="rgba(148,163,184,0.3)" />
                <Tooltip formatter={(v: number) => [`$${v}`, ""]} contentStyle={{ background: "rgba(15,23,42,0.9)", border: "none", borderRadius: 8 }} />
                <Bar dataKey="cac" name="CAC" radius={[0, 4, 4, 0]}>
                  {channelData.map((e, i) => <Cell key={i} fill={e.cac < 150 ? "#10b981" : e.cac < 350 ? "#f59e0b" : "#f43f5e"} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {channelData.map((c) => (
              <div key={c.channel} className="rounded-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-4 shadow-sm">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3">{c.channel}</p>
                <div className="grid grid-cols-3 gap-2">
                  {[{ label: "CAC", val: `$${c.cac}` }, { label: "LTV", val: `$${c.ltv.toLocaleString()}` }, { label: "Conv%", val: `${c.conv}%` }].map(m => (
                    <div key={m.label}><p className="text-xs text-slate-400">{m.label}</p><p className="text-sm font-bold text-slate-900 dark:text-white">{m.val}</p></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "retention" && (
        <div className="space-y-6">
          <div className="rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Retention Cohort Analysis</h2>
            <p className="text-sm text-slate-500 mb-4">% of users retained at M1, M2, M3, M6</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left py-2 pr-4 text-slate-500 font-medium">Cohort</th>
                    {["M1", "M2", "M3", "M6"].map(h => <th key={h} className="text-center py-2 px-3 text-slate-500 font-medium">{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {retentionCohorts.map((row) => (
                    <tr key={row.cohort} className="border-b border-slate-100 dark:border-slate-800/60">
                      <td className="py-3 pr-4 font-medium text-slate-800 dark:text-slate-200">{row.cohort}</td>
                      {[row.m1, row.m2, row.m3, row.m6].map((val, i) => (
                        <td key={i} className="py-3 px-3 text-center">
                          {val !== null ? (
                            <span className={`px-2 py-1 rounded-md text-xs font-semibold ${val >= 85 ? "bg-emerald-500/15 text-emerald-600" : val >= 75 ? "bg-blue-500/15 text-blue-600" : "bg-amber-500/15 text-amber-600"}`}>{val}%</span>
                          ) : <span className="text-slate-300 dark:text-slate-600">—</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === "recommendations" && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center"><Layers className="w-4 h-4 text-white" /></div>
            <div><h2 className="text-lg font-semibold text-slate-900 dark:text-white">Growth Recommendations</h2><p className="text-sm text-slate-500">AI-ranked by growth impact</p></div>
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
                  <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 text-sm font-semibold"><Zap className="w-4 h-4" />{rec.impact}</div>
                  <div className="flex items-center gap-1 text-slate-500 text-xs"><Calendar className="w-3.5 h-3.5" />{rec.deadline}</div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100/60 dark:border-slate-800/60 flex justify-end">
                <button onClick={() => toast.success(`"${rec.title}" added to growth plan`)} className="flex items-center gap-1.5 text-sm font-medium text-violet-600 dark:text-violet-400">
                  Add to Growth Plan<ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
