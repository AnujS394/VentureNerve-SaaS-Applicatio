import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { DollarSign, TrendingUp, Package, Users, Target, Briefcase, Activity, ArrowRight } from "lucide-react";
import { AgentDashboardModal } from "../components/AgentDashboardModal";
import { CFODashboard } from "./dashboards/CFODashboard";
import { StrategyDashboard } from "./dashboards/StrategyDashboard";
import { GrowthDashboard } from "./dashboards/GrowthDashboard";
import { ProductDashboard } from "./dashboards/ProductDashboard";
import { CompetitiveDashboard } from "./dashboards/CompetitiveDashboard";
import { FundraisingDashboard } from "./dashboards/FundraisingDashboard";

const agents = [
  {
    id: "cfo",
    name: "AI CFO Agent",
    icon: DollarSign,
    color: "from-emerald-500 to-teal-500",
    status: "active",
    metrics: { burnRate: "$52,000/mo", runway: "13 months", cashFlow: "+$43,000", forecast: "Strong" },
    insights: [
      "Burn rate increased 8.3% this month",
      "Recommend reducing operational costs by 15%",
      "Cash reserves sufficient for 13 months at current rate",
    ],
  },
  {
    id: "strategy",
    name: "AI Strategy Agent",
    icon: Target,
    color: "from-violet-500 to-purple-500",
    status: "active",
    metrics: { priorities: "5 Active", opportunities: "12 Identified", alignment: "87%", execution: "Good" },
    insights: [
      "European market expansion showing high potential",
      "Product-market fit improving in enterprise segment",
      "Recommend accelerating B2B sales motion",
    ],
  },
  {
    id: "growth",
    name: "AI Growth Agent",
    icon: TrendingUp,
    color: "from-blue-500 to-cyan-500",
    status: "active",
    metrics: { cac: "$340", ltv: "$4,200", conversion: "3.4%", retention: "89%" },
    insights: [
      "CAC decreased 12% month-over-month",
      "Organic growth channel performing exceptionally well",
      "Recommend investing more in content marketing",
    ],
  },
  {
    id: "product",
    name: "AI Product Agent",
    icon: Package,
    color: "from-pink-500 to-rose-500",
    status: "active",
    metrics: { activeUsers: "12,450", engagement: "82%", nps: "+67", adoption: "High" },
    insights: [
      "New analytics feature showing 95% adoption rate",
      "User engagement up 23% since last release",
      "Feature request: Advanced filtering (mentioned 45 times)",
    ],
  },
  {
    id: "competitive",
    name: "AI Competitive Intel Agent",
    icon: Activity,
    color: "from-amber-500 to-orange-500",
    status: "active",
    metrics: { competitors: "8 Tracked", threats: "2 Active", positioning: "Strong", marketShare: "12%" },
    insights: [
      "Competitor A raised $15M Series A",
      "Market leader announced pricing increase",
      "Opportunity to capture mid-market segment",
    ],
  },
  {
    id: "fundraising",
    name: "AI Fundraising Agent",
    icon: Briefcase,
    color: "from-fuchsia-500 to-purple-500",
    status: "active",
    metrics: { readiness: "74%", investors: "23 Mapped", timeline: "3-4 months", valuation: "$12-15M" },
    insights: [
      "Metrics align well with Series A benchmarks",
      "Recommend building relationships with 5 target VCs",
      "Optimal fundraising window: Q3 2026",
    ],
  },
];

const collaborationData = [
  { timestamp: "9:00 AM", agent: "CFO → Strategy", message: "Burn rate analysis complete. Recommend strategic cost optimization." },
  { timestamp: "9:15 AM", agent: "Strategy → Growth", message: "Prioritizing growth efficiency. What's current CAC:LTV ratio?" },
  { timestamp: "9:20 AM", agent: "Growth → Strategy", message: "CAC:LTV is 1:12.4. Strong unit economics. Can scale aggressively." },
  { timestamp: "9:35 AM", agent: "Product → Growth", message: "New feature adoption at 95%. Expect 15% boost in retention." },
  { timestamp: "9:45 AM", agent: "Fundraising → CFO", message: "Need updated financials for investor deck. Ready in 24h?" },
];

const dashboardMap: Record<string, React.ReactNode> = {
  cfo: <CFODashboard />,
  strategy: <StrategyDashboard />,
  growth: <GrowthDashboard />,
  product: <ProductDashboard />,
  competitive: <CompetitiveDashboard />,
  fundraising: <FundraisingDashboard />,
};

export function AIAgents() {
  const [openAgent, setOpenAgent] = useState<string | null>(null);
  const [activeIds, setActiveIds] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem('venturenerve_active_agents');
      if (raw) return new Set(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
    // default from agents list
    return new Set(agents.filter((a) => a.status === 'active').map((a) => a.id));
  });

  // persist active ids
  useEffect(() => {
    try {
      localStorage.setItem('venturenerve_active_agents', JSON.stringify(Array.from(activeIds)));
    } catch (e) {
      // ignore
    }
  }, [activeIds]);

  function toggleAgent(id: string) {
    setActiveIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Agentic AI Executive Team</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Your autonomous strategic advisors working 24/7</p>
      </motion.div>

      {/* Agent Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent, index) => {
          const isActive = activeIds.has(agent.id);
          return (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className={`rounded-2xl backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5 group`}
            >
              {/* Agent Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${agent.color} flex items-center justify-center`}>
                  <agent.icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                  <span className={`${isActive ? 'text-xs font-medium text-emerald-600 dark:text-emerald-400' : 'text-xs text-slate-500 dark:text-slate-400'}`}>{isActive ? 'Active' : 'Inactive'}</span>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">{agent.name}</h3>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {Object.entries(agent.metrics).map(([key, value]) => (
                  <div key={key} className="bg-slate-100/50 dark:bg-slate-800/50 rounded-lg p-3">
                    <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{key}</p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white mt-0.5">{value}</p>
                  </div>
                ))}
              </div>

              {/* Key Insights */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-slate-600 dark:text-slate-400">Recent Insights</p>
                {agent.insights.slice(0, 2).map((insight, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-violet-500 mt-1.5 flex-shrink-0" />
                    <p className="text-xs text-slate-600 dark:text-slate-400">{insight}</p>
                  </div>
                ))}
              </div>

              {/* View Details */}
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => isActive && setOpenAgent(agent.id)}
                  className={`flex items-center gap-2 text-sm font-medium ${isActive ? 'text-violet-600 dark:text-violet-400' : 'text-slate-400 cursor-not-allowed'}`}
                  disabled={!isActive}
                >
                  View Full Dashboard
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => toggleAgent(agent.id)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium ${isActive ? 'bg-slate-100/60 dark:bg-slate-800/60 text-slate-800 dark:text-white' : 'bg-violet-600 text-white'}`}
                >
                  {isActive ? 'Deactivate' : 'Activate'}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Multi-Agent Collaboration Center */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-2xl backdrop-blur-xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 dark:from-violet-500/20 dark:to-fuchsia-500/20 border border-violet-500/20 dark:border-violet-500/30 p-6 shadow-xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Multi-Agent Collaboration Center</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Real-time agent discussions and strategic alignment</p>
          </div>
        </div>

        <div className="space-y-4">
          {collaborationData.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.08 }}
              className="flex items-start gap-4 p-4 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/50"
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-violet-600 dark:text-violet-400">{event.agent}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-500">{event.timestamp}</span>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300">{event.message}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-violet-500/20">
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-900 dark:text-white">47</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Agent Discussions Today</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-900 dark:text-white">12</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Strategic Recommendations</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-900 dark:text-white">94%</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Decision Confidence</p>
          </div>
        </div>
      </motion.div>

      {/* Agent Dashboard Modals */}
      {agents.map((agent) => (
        <AgentDashboardModal key={agent.id} open={openAgent === agent.id} onClose={() => setOpenAgent(null)}>
          {dashboardMap[agent.id]}
        </AgentDashboardModal>
      ))}
    </div>
  );
}
