import { useState } from "react";
import { motion } from "motion/react";
import {
  Activity, Download, RefreshCw, ChevronRight, AlertTriangle,
  CheckCircle, Flame, Layers, Calendar, Shield, Zap,
  ArrowUpRight, ArrowDownRight, TrendingUp, Globe, Eye,
} from "lucide-react";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, Cell,
} from "recharts";
import { toast } from "sonner";
import { downloadTextFile, formatCsv } from "../../utils/download";

const competitors = [
  { name: "Us", pricing: 89, features: 87, support: 91, brand: 55, speed: 94, color: "#8b5cf6" },
  { name: "Rival A", pricing: 72, features: 82, support: 68, brand: 81, speed: 75, color: "#f43f5e" },
  { name: "Rival B", pricing: 55, features: 91, support: 79, brand: 88, speed: 66, color: "#06b6d4" },
  { name: "Rival C", pricing: 84, features: 63, support: 71, brand: 60, speed: 80, color: "#f59e0b" },
];

const radarData = [
  { subject: "Pricing", us: 89, rivalA: 72, rivalB: 55 },
  { subject: "Features", us: 87, rivalA: 82, rivalB: 91 },
  { subject: "Support", us: 91, rivalA: 68, rivalB: 79 },
  { subject: "Brand", us: 55, rivalA: 81, rivalB: 88 },
  { subject: "Speed", us: 94, rivalA: 75, rivalB: 66 },
  { subject: "Integrations", us: 63, rivalA: 70, rivalB: 85 },
];

const marketShareData = [
  { month: "Jan", us: 9.2, rivalA: 28, rivalB: 19, other: 43.8 },
  { month: "Feb", us: 9.8, rivalA: 27.5, rivalB: 19.5, other: 43.2 },
  { month: "Mar", us: 10.4, rivalA: 27, rivalB: 20, other: 42.6 },
  { month: "Apr", us: 11.0, rivalA: 26.8, rivalB: 20.2, other: 42 },
  { month: "May", us: 11.6, rivalA: 26.5, rivalB: 20.4, other: 41.5 },
  { month: "Jun", us: 12.0, rivalA: 26, rivalB: 21, other: 41 },
];

const events = [
  { date: "Jun 5", competitor: "Rival A", type: "funding", title: "Raised $15M Series A", impact: "high", desc: "Plans to double engineering team and expand into EU market by Q4." },
  { date: "May 28", competitor: "Rival B", type: "pricing", title: "Pricing increase +20%", impact: "high", desc: "Raised prices on Pro tier. Opportunity to capture churned customers in mid-market." },
  { date: "May 20", competitor: "Rival C", type: "product", title: "Launched AI features beta", impact: "medium", desc: "AI-assisted reporting feature — similar to our roadmap item. Need to accelerate." },
  { date: "May 14", competitor: "Rival A", type: "hiring", title: "Hiring Head of Sales EMEA", impact: "medium", desc: "Signal of EU expansion. We need to move faster on European market entry." },
  { date: "May 8", competitor: "Rival B", type: "partnership", title: "Salesforce integration launched", impact: "medium", desc: "Now natively integrated with Salesforce CRM. 34% of our target customers use Salesforce." },
];

const recommendations = [
  { priority: "critical", title: "Exploit Rival B's pricing backlash", impact: "10-15 enterprise accounts", effort: "Low", deadline: "Jul 10, 2026", description: "Run outbound campaign to Rival B customers who voiced frustration. Offer migration discount." },
  { priority: "high", title: "Accelerate EU market before Rival A", impact: "3x TAM expansion", effort: "High", deadline: "Sep 1, 2026", description: "Rival A raised $15M with EU expansion stated. We have a 3-4 month head start window." },
  { priority: "high", title: "Build Salesforce native integration", impact: "Access 34% of TAM", effort: "Medium", deadline: "Aug 30, 2026", description: "Rival B just launched Salesforce integration. This is now a competitive necessity." },
  { priority: "medium", title: "Strengthen brand awareness", impact: "+30% organic demand", effort: "Medium", deadline: "Sep 30, 2026", description: "Our brand score (55) lags competitors. Thought leadership and PR investment needed." },
];

const impactColor: Record<string, string> = {
  high: "bg-red-500/10 text-red-500 border-red-500/20",
  medium: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  low: "bg-blue-500/10 text-blue-500 border-blue-500/20",
};

const priorityColor: Record<string, string> = {
  critical: "bg-red-500/10 text-red-500 border-red-500/20",
  high: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  medium: "bg-blue-500/10 text-blue-500 border-blue-500/20",
};

const eventTypeIcon: Record<string, React.ElementType> = {
  funding: TrendingUp,
  pricing: Zap,
  product: Activity,
  hiring: Globe,
  partnership: Shield,
};

export function CompetitiveDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "comparison" | "events" | "recommendations">("overview");
  const [refreshing, setRefreshing] = useState(false);

  return (
    <div className="p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">AI Competitive Intel Agent</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm text-slate-500 dark:text-slate-400">Live · 8 competitors tracked</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => { setRefreshing(true); setTimeout(() => { setRefreshing(false); toast.success("Competitive data refreshed"); }, 1400); }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100/60 dark:bg-slate-800/60 border border-slate-200/40 dark:border-slate-700/40 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors">
            <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <button onClick={() => {
              const rows = [
                ["Company", "Pricing", "Features", "Support", "Brand", "Speed"],
                ...competitors.map((comp) => [comp.name, comp.pricing, comp.features, comp.support, comp.brand, comp.speed]),
              ];
                const ok = downloadTextFile("competitive-report.csv", formatCsv(rows), "text/csv;charset=utf-8");
                if (ok) toast.success("Competitive report downloaded");
                else toast.error("Failed to download Competitive report. Check console for details.");
            }}
            type="button"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium transition-colors shadow-lg shadow-amber-500/20">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Competitors Tracked", value: "8 Active", change: "+1 new", good: true, icon: Eye, up: true },
          { label: "Active Threats", value: "2 Critical", change: "Rival A funding", good: false, icon: AlertTriangle, up: true },
          { label: "Market Position", value: "Strong", change: "+0.4% share", good: true, icon: Shield, up: true },
          { label: "Market Share", value: "12%", change: "+2.8% YTD", good: true, icon: Globe, up: true },
        ].map((kpi, i) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.04 }}
            className="rounded-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-4 shadow-sm">
            <div className="flex items-start justify-between mb-2">
              <p className="text-xs text-slate-500 dark:text-slate-400">{kpi.label}</p>
              <kpi.icon className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-xl font-bold text-slate-900 dark:text-white">{kpi.value}</p>
            <div className={`flex items-center gap-1 mt-1 text-xs font-medium ${kpi.good ? "text-emerald-500" : "text-red-500"}`}>
              {kpi.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {kpi.change}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-slate-100/60 dark:bg-slate-800/60 border border-slate-200/40 dark:border-slate-700/40 w-fit">
        {(["overview", "comparison", "events", "recommendations"] as const).map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${activeTab === tab ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 dark:text-slate-400"}`}>
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Competitive Positioning Radar</h2>
            <p className="text-sm text-slate-500 mb-4">Us vs Top 2 Rivals</p>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(148,163,184,0.2)" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "#94a3b8" }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Us" dataKey="us" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} strokeWidth={2} />
                <Radar name="Rival A" dataKey="rivalA" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.1} strokeWidth={1.5} strokeDasharray="4 2" />
                <Radar name="Rival B" dataKey="rivalB" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.1} strokeWidth={1.5} strokeDasharray="4 2" />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Market Share Trend</h2>
            <p className="text-sm text-slate-500 mb-4">% share by player</p>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={marketShareData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="rgba(148,163,184,0.3)" />
                <YAxis tickFormatter={(v) => `${v}%`} tick={{ fontSize: 11 }} stroke="rgba(148,163,184,0.3)" />
                <Tooltip formatter={(v: number) => [`${v}%`, ""]} contentStyle={{ background: "rgba(15,23,42,0.9)", border: "none", borderRadius: 8 }} />
                <Legend />
                <Line type="monotone" dataKey="us" name="Us" stroke="#8b5cf6" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="rivalA" name="Rival A" stroke="#f43f5e" strokeWidth={1.5} strokeDasharray="4 2" dot={false} />
                <Line type="monotone" dataKey="rivalB" name="Rival B" stroke="#06b6d4" strokeWidth={1.5} strokeDasharray="4 2" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === "comparison" && (
        <div className="space-y-4">
          <div className="rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 overflow-hidden shadow-xl">
            <table className="w-full text-sm">
              <thead className="border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
                <tr>
                  <th className="text-left py-3 px-5 text-slate-500 font-medium">Dimension</th>
                  {competitors.map(c => <th key={c.name} className="text-center py-3 px-4 text-slate-700 dark:text-slate-300 font-semibold">{c.name}</th>)}
                </tr>
              </thead>
              <tbody>
                {(["pricing","features","support","brand","speed"] as const).map((dim, di) => (
                  <tr key={dim} className="border-b border-slate-100 dark:border-slate-800/60 last:border-0">
                    <td className="py-3 px-5 text-slate-600 dark:text-slate-400 capitalize font-medium">{dim}</td>
                    {competitors.map(c => (
                      <td key={c.name} className="py-3 px-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-sm font-bold" style={{ color: c.color }}>{c[dim]}</span>
                          <div className="w-16 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${c[dim]}%`, background: c.color }} />
                          </div>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "events" && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Competitor Intelligence Feed</h2>
          {events.map((ev, i) => {
            const Icon = eventTypeIcon[ev.type] || Activity;
            return (
              <motion.div key={i} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                className="rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-5 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-amber-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{ev.competitor}</span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full border capitalize ${impactColor[ev.impact]}`}>{ev.impact} impact</span>
                      <span className="text-xs text-slate-400 ml-auto">{ev.date}</span>
                    </div>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{ev.title}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{ev.desc}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {activeTab === "recommendations" && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center"><Layers className="w-4 h-4 text-white" /></div>
            <div><h2 className="text-lg font-semibold text-slate-900 dark:text-white">Competitive Strategy Actions</h2><p className="text-sm text-slate-500">AI-ranked by competitive impact</p></div>
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
                  <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400 text-sm font-semibold"><TrendingUp className="w-4 h-4" />{rec.impact}</div>
                  <div className="flex items-center gap-1 text-slate-500 text-xs"><Calendar className="w-3.5 h-3.5" />{rec.deadline}</div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100/60 dark:border-slate-800/60 flex justify-end">
                <button onClick={() => toast.success(`"${rec.title}" added to strategy`)} className="flex items-center gap-1.5 text-sm font-medium text-violet-600 dark:text-violet-400">
                  Add to Strategy<ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
