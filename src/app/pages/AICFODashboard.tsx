import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import {
  DollarSign, TrendingUp, TrendingDown, ArrowLeft, AlertTriangle,
  CheckCircle, Clock, Download, RefreshCw, ChevronRight, Zap,
  BarChart2, PieChart as PieIcon, Target, Calendar, FileText,
  ArrowUpRight, ArrowDownRight, Flame, Layers, CreditCard, Wallet,
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine,
} from "recharts";
import { toast } from "sonner";
import { downloadTextFile, formatCsv } from "../utils/download";

const burnData = [
  { month: "Jan", burn: 41000, revenue: 28000, net: -13000 },
  { month: "Feb", burn: 43000, revenue: 31000, net: -12000 },
  { month: "Mar", burn: 45000, revenue: 34000, net: -11000 },
  { month: "Apr", burn: 48000, revenue: 36000, net: -12000 },
  { month: "May", burn: 50000, revenue: 40000, net: -10000 },
  { month: "Jun", burn: 52000, revenue: 44000, net: -8000 },
  { month: "Jul", burn: 51000, revenue: 49000, net: -2000 },
  { month: "Aug", burn: 49000, revenue: 55000, net: 6000 },
  { month: "Sep", burn: 47000, revenue: 62000, net: 15000 },
  { month: "Oct", burn: 45000, revenue: 70000, net: 25000 },
  { month: "Nov", burn: 44000, revenue: 79000, net: 35000 },
  { month: "Dec", burn: 43000, revenue: 90000, net: 47000 },
];

const cashRunwayData = [
  { month: "Jun", cash: 676000 },
  { month: "Jul", cash: 640000 },
  { month: "Aug", cash: 620000 },
  { month: "Sep", cash: 595000 },
  { month: "Oct", cash: 563000 },
  { month: "Nov", cash: 535000 },
  { month: "Dec", cash: 510000 },
  { month: "Jan '27", cash: 488000 },
  { month: "Feb '27", cash: 458000 },
  { month: "Mar '27", cash: 430000 },
  { month: "Apr '27", cash: 405000 },
  { month: "May '27", cash: 385000 },
  { month: "Jun '27", cash: 368000 },
];

const expenseBreakdown = [
  { name: "Payroll", value: 28600, color: "#8b5cf6" },
  { name: "Infrastructure", value: 9100, color: "#06b6d4" },
  { name: "Marketing", value: 7800, color: "#10b981" },
  { name: "Operations", value: 4200, color: "#f59e0b" },
  { name: "Tools & SaaS", value: 2300, color: "#f43f5e" },
];

const revenueStreams = [
  { month: "Jan", mrr: 28000, arr: 336000, newMrr: 4200, churnedMrr: 800 },
  { month: "Feb", mrr: 31000, arr: 372000, newMrr: 5100, churnedMrr: 600 },
  { month: "Mar", mrr: 34000, arr: 408000, newMrr: 5400, churnedMrr: 700 },
  { month: "Apr", mrr: 36000, arr: 432000, newMrr: 4800, churnedMrr: 1100 },
  { month: "May", mrr: 40000, arr: 480000, newMrr: 6200, churnedMrr: 900 },
  { month: "Jun", mrr: 44000, arr: 528000, newMrr: 6800, churnedMrr: 750 },
];

const recommendations = [
  {
    priority: "critical",
    title: "Negotiate vendor contracts Q3",
    impact: "Save $4,200/mo",
    effort: "Medium",
    deadline: "Jul 31, 2026",
    description: "Infrastructure and SaaS costs can be reduced by renegotiating annual contracts with Stripe, AWS, and Intercom.",
  },
  {
    priority: "high",
    title: "Accelerate MRR to $60K by Aug",
    impact: "+$16K revenue",
    effort: "High",
    deadline: "Aug 31, 2026",
    description: "Current growth trajectory needs a boost. Targeting 3 new enterprise accounts to close funding gap.",
  },
  {
    priority: "high",
    title: "Hire Revenue Ops specialist",
    impact: "15% efficiency gain",
    effort: "Medium",
    deadline: "Sep 1, 2026",
    description: "RevOps hire will improve billing automation and reduce revenue leakage estimated at $2,300/mo.",
  },
  {
    priority: "medium",
    title: "Set up credit line ($200K)",
    impact: "Runway buffer",
    effort: "Low",
    deadline: "Jul 15, 2026",
    description: "Establishing a credit facility now while metrics are strong adds a safety net without dilution.",
  },
];

const transactions = [
  { date: "Jun 7", desc: "AWS Infrastructure", category: "Infrastructure", amount: -6200, type: "expense" },
  { date: "Jun 7", desc: "Acme Corp — MRR", category: "Revenue", amount: 8500, type: "income" },
  { date: "Jun 6", desc: "Payroll — Engineering", category: "Payroll", amount: -18400, type: "expense" },
  { date: "Jun 5", desc: "TechStartup Inc — MRR", category: "Revenue", amount: 4200, type: "income" },
  { date: "Jun 5", desc: "Intercom SaaS", category: "Tools", amount: -890, type: "expense" },
  { date: "Jun 4", desc: "Google Ads Campaign", category: "Marketing", amount: -3100, type: "expense" },
  { date: "Jun 3", desc: "DataViz Co — New", category: "Revenue", amount: 6800, type: "income" },
  { date: "Jun 2", desc: "Stripe fees", category: "Operations", amount: -420, type: "expense" },
];

const kpis = [
  { label: "Monthly Burn Rate", value: "$52,000", change: "+8.3%", trend: "up", bad: true, icon: Flame },
  { label: "Cash Runway", value: "13 months", change: "-1 mo", trend: "down", bad: true, icon: Clock },
  { label: "MRR", value: "$44,000", change: "+10%", trend: "up", bad: false, icon: TrendingUp },
  { label: "ARR", value: "$528,000", change: "+10%", trend: "up", bad: false, icon: BarChart2 },
  { label: "Gross Margin", value: "72%", change: "+2%", trend: "up", bad: false, icon: Target },
  { label: "CAC Payback", value: "8.2 mo", change: "-0.8 mo", trend: "down", bad: false, icon: CreditCard },
  { label: "Net Cash Position", value: "$676K", change: "-$52K", trend: "down", bad: true, icon: Wallet },
  { label: "MRR Churn", value: "1.7%", change: "-0.3%", trend: "down", bad: false, icon: TrendingDown },
];

const priorityColor: Record<string, string> = {
  critical: "bg-red-500/10 text-red-500 border-red-500/20",
  high: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  medium: "bg-blue-500/10 text-blue-500 border-blue-500/20",
};

const COLORS = expenseBreakdown.map((e) => e.color);

export function AICFODashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"overview" | "cashflow" | "revenue" | "recommendations">("overview");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("CFO data refreshed");
    }, 1400);
  };

  const handleExport = () => {
    const rows = [
      ["Metric", "Value", "Change"],
      ...kpis.map((kpi) => [kpi.label, kpi.value, kpi.change]),
    ];
    const ok = downloadTextFile("cfo-agent-report.csv", formatCsv(rows), "text/csv;charset=utf-8");
    if (ok) toast.success("CFO report downloaded");
    else toast.error("Failed to download CFO report. Check console for details.");
  };

  return (
    <div className="p-6 md:p-8 space-y-8 min-h-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/agents")}
            className="p-2 rounded-xl bg-slate-100/60 dark:bg-slate-800/60 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors border border-slate-200/40 dark:border-slate-700/40"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">AI CFO Agent</h1>
              <div className="flex items-center gap-2 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm text-slate-500 dark:text-slate-400">Live · Updated just now</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100/60 dark:bg-slate-800/60 border border-slate-200/40 dark:border-slate-700/40 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors shadow-lg shadow-emerald-500/20"
          >
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </motion.div>

      {/* KPI Row */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05 + i * 0.04 }}
            className="rounded-2xl backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-4 shadow-lg"
          >
            <div className="flex items-start justify-between mb-2">
              <p className="text-xs text-slate-500 dark:text-slate-400">{kpi.label}</p>
              <kpi.icon className="w-4 h-4 text-slate-400 dark:text-slate-500" />
            </div>
            <p className="text-xl font-bold text-slate-900 dark:text-white">{kpi.value}</p>
            <div className={`flex items-center gap-1 mt-1 text-xs font-medium ${
              kpi.bad
                ? kpi.trend === "up" ? "text-red-500" : "text-red-500"
                : kpi.trend === "up" ? "text-emerald-500" : "text-emerald-500"
            }`}>
              {kpi.trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {kpi.change} vs last month
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-slate-100/60 dark:bg-slate-800/60 border border-slate-200/40 dark:border-slate-700/40 w-fit">
        {(["overview", "cashflow", "revenue", "recommendations"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
              activeTab === tab
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Burn vs Revenue chart */}
          <div className="rounded-2xl backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Burn Rate vs Revenue</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Monthly comparison with net cash flow</p>
              </div>
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <Zap className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Cash flow positive Aug '26</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={burnData}>
                <defs>
                  <linearGradient id="burnGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="rgba(148,163,184,0.3)" />
                <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 12 }} stroke="rgba(148,163,184,0.3)" />
                <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, ""]} contentStyle={{ background: "rgba(15,23,42,0.9)", border: "none", borderRadius: 8 }} />
                <Legend />
                <ReferenceLine y={0} stroke="rgba(148,163,184,0.3)" />
                <Area type="monotone" dataKey="burn" name="Burn Rate" stroke="#f43f5e" fill="url(#burnGrad)" strokeWidth={2} dot={false} />
                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#10b981" fill="url(#revGrad)" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Expense breakdown + Recent transactions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Expense Breakdown */}
            <div className="rounded-2xl backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-xl">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Expense Breakdown</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">June 2026 — $52,000 total</p>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={expenseBreakdown} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                    {expenseBreakdown.map((_, i) => (
                      <Cell key={i} fill={COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, ""]} contentStyle={{ background: "rgba(15,23,42,0.9)", border: "none", borderRadius: 8 }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-2">
                {expenseBreakdown.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                      <span className="text-sm text-slate-600 dark:text-slate-400">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-slate-900 dark:text-white">${item.value.toLocaleString()}</span>
                      <span className="text-xs text-slate-400 w-10 text-right">{((item.value / 52000) * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="rounded-2xl backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-xl">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Recent Transactions</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Last 7 days</p>
              <div className="space-y-3">
                {transactions.map((tx, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100/60 dark:border-slate-800/60 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        tx.type === "income" ? "bg-emerald-500/10" : "bg-red-500/10"
                      }`}>
                        {tx.type === "income"
                          ? <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                          : <ArrowDownRight className="w-4 h-4 text-red-400" />
                        }
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-none">{tx.desc}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{tx.date} · {tx.category}</p>
                      </div>
                    </div>
                    <span className={`text-sm font-semibold ${tx.type === "income" ? "text-emerald-500" : "text-slate-700 dark:text-slate-300"}`}>
                      {tx.type === "income" ? "+" : ""}${Math.abs(tx.amount).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === "cashflow" && (
        <motion.div key="cashflow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Cash Runway Projection */}
          <div className="rounded-2xl backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Cash Runway Projection</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Based on current burn rate — no new funding</p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-xs font-medium text-amber-600 dark:text-amber-400">13 months remaining</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={cashRunwayData}>
                <defs>
                  <linearGradient id="cashGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="rgba(148,163,184,0.3)" />
                <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 12 }} stroke="rgba(148,163,184,0.3)" />
                <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, "Cash"]} contentStyle={{ background: "rgba(15,23,42,0.9)", border: "none", borderRadius: 8 }} />
                <Area type="monotone" dataKey="cash" name="Cash Position" stroke="#8b5cf6" fill="url(#cashGrad)" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Monthly Net Cash Flow bars */}
          <div className="rounded-2xl backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Monthly Net Cash Flow</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Forecast through Dec 2026</p>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={burnData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="rgba(148,163,184,0.3)" />
                <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 12 }} stroke="rgba(148,163,184,0.3)" />
                <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, "Net Cash"]} contentStyle={{ background: "rgba(15,23,42,0.9)", border: "none", borderRadius: 8 }} />
                <ReferenceLine y={0} stroke="rgba(148,163,184,0.4)" />
                <Bar dataKey="net" name="Net Cash Flow" radius={[4, 4, 0, 0]}>
                  {burnData.map((entry, i) => (
                    <Cell key={i} fill={entry.net >= 0 ? "#10b981" : "#f43f5e"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      )}

      {activeTab === "revenue" && (
        <motion.div key="revenue" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* MRR Growth */}
          <div className="rounded-2xl backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">MRR Growth</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Monthly recurring revenue trend</p>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={revenueStreams}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="rgba(148,163,184,0.3)" />
                <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 12 }} stroke="rgba(148,163,184,0.3)" />
                <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, ""]} contentStyle={{ background: "rgba(15,23,42,0.9)", border: "none", borderRadius: 8 }} />
                <Legend />
                <Line type="monotone" dataKey="mrr" name="MRR" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4, fill: "#10b981" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* New MRR vs Churned */}
          <div className="rounded-2xl backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">New MRR vs Churned MRR</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Expansion vs contraction signals</p>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={revenueStreams}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="rgba(148,163,184,0.3)" />
                <YAxis tickFormatter={(v) => `$${v.toLocaleString()}`} tick={{ fontSize: 12 }} stroke="rgba(148,163,184,0.3)" />
                <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, ""]} contentStyle={{ background: "rgba(15,23,42,0.9)", border: "none", borderRadius: 8 }} />
                <Legend />
                <Bar dataKey="newMrr" name="New MRR" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="churnedMrr" name="Churned MRR" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      )}

      {activeTab === "recommendations" && (
        <motion.div key="recommendations" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
              <Layers className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">CFO Strategic Recommendations</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">AI-generated action items ranked by financial impact</p>
            </div>
          </div>

          {recommendations.map((rec, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-5 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-0.5">
                    {rec.priority === "critical"
                      ? <AlertTriangle className="w-5 h-5 text-red-500" />
                      : rec.priority === "high"
                      ? <Flame className="w-5 h-5 text-amber-500" />
                      : <CheckCircle className="w-5 h-5 text-blue-500" />
                    }
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-semibold text-slate-900 dark:text-white">{rec.title}</h3>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full border capitalize ${priorityColor[rec.priority]}`}>{rec.priority}</span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{rec.description}</p>
                  </div>
                </div>
                <div className="flex flex-row md:flex-col items-center md:items-end gap-3 md:gap-1 flex-shrink-0">
                  <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-sm font-semibold">
                    <TrendingUp className="w-4 h-4" />
                    {rec.impact}
                  </div>
                  <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-xs">
                    <Calendar className="w-3.5 h-3.5" />
                    {rec.deadline}
                  </div>
                  <div className="flex items-center gap-1 text-slate-400 text-xs">
                    <FileText className="w-3.5 h-3.5" />
                    Effort: {rec.effort}
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100/60 dark:border-slate-800/60 flex items-center justify-end">
                <button
                  onClick={() => toast.success(`"${rec.title}" added to action plan`)}
                  className="flex items-center gap-1.5 text-sm font-medium text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors"
                >
                  Add to Action Plan
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
