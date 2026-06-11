import { AlertTriangle, AlertCircle, TrendingDown, Users, Package, DollarSign, Target, Clock } from "lucide-react";
import { motion } from "motion/react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const criticalRisks = [
  {
    id: 1,
    severity: "critical",
    category: "Financial",
    icon: DollarSign,
    title: "Runway Exhaustion Risk",
    description: "Current burn rate will exhaust cash reserves in 13 months",
    impact: "Business closure if fundraising fails",
    timeline: "13 months",
    confidence: 94,
    trend: "worsening",
    metrics: {
      current: "$52K/mo burn",
      projected: "$676K remaining",
      threshold: "18 months minimum",
    },
    recommendations: [
      "Reduce operational costs by 15% ($8K/mo)",
      "Accelerate fundraising timeline by 2-3 months",
      "Focus on revenue acceleration initiatives",
    ],
  },
  {
    id: 2,
    severity: "warning",
    category: "Customer",
    icon: Users,
    title: "Increasing Churn Rate",
    description: "Customer churn increased 12% compared to last month",
    impact: "MRR growth could slow to 6-8%",
    timeline: "2-3 months",
    confidence: 87,
    trend: "worsening",
    metrics: {
      current: "11% monthly churn",
      projected: "14% in 60 days",
      threshold: "8% target",
    },
    recommendations: [
      "Conduct exit interviews with churned customers",
      "Improve onboarding experience (NPS +45 → +65)",
      "Launch customer success program",
    ],
  },
  {
    id: 3,
    severity: "warning",
    category: "Product",
    icon: Package,
    title: "Product Velocity Decline",
    description: "Feature releases down 30% versus previous quarter",
    impact: "Competitive disadvantage and user dissatisfaction",
    timeline: "1-2 months",
    confidence: 78,
    trend: "stable",
    metrics: {
      current: "2.3 features/month",
      projected: "1.8 features/month",
      threshold: "4+ features/month",
    },
    recommendations: [
      "Hire senior product manager",
      "Reduce technical debt by 20%",
      "Implement bi-weekly release cycle",
    ],
  },
  {
    id: 4,
    severity: "moderate",
    category: "Competition",
    icon: Target,
    title: "Competitive Pressure Increasing",
    description: "Market leader reduced pricing by 15%, 2 new entrants in Q1",
    impact: "Customer acquisition costs could increase 20-25%",
    timeline: "3-4 months",
    confidence: 71,
    trend: "stable",
    metrics: {
      current: "$340 CAC",
      projected: "$420 CAC",
      threshold: "$400 maximum",
    },
    recommendations: [
      "Strengthen product differentiation",
      "Launch enterprise tier with premium features",
      "Improve conversion funnel (3.4% → 4.5%)",
    ],
  },
];

const upcomingRisks = [
  { month: "Jul", runway: 13, churn: 11, cac: 340 },
  { month: "Aug", runway: 12, churn: 12, cac: 355 },
  { month: "Sep", runway: 11, churn: 13, cac: 375 },
  { month: "Oct", runway: 10, churn: 14, cac: 395 },
  { month: "Nov", runway: 9, churn: 15, cac: 420 },
  { month: "Dec", runway: 8, churn: 15, cac: 440 },
];

const riskScore = {
  overall: 67,
  financial: 58,
  customer: 72,
  product: 68,
  market: 75,
  team: 82,
};

export function RiskEngine() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Early Warning System</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">AI-powered predictive risk detection</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm text-slate-600 dark:text-slate-400">Overall Risk Level</p>
            <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">MEDIUM</p>
          </div>
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>

      {/* Risk Score Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Object.entries(riskScore).map(([key, value], index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="rounded-xl backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-4 text-center"
          >
            <p className="text-xs text-slate-600 dark:text-slate-400 capitalize mb-2">{key}</p>
            <div className="relative w-16 h-16 mx-auto">
              <svg className="w-16 h-16 transform -rotate-90">
                <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="none" className="text-slate-200 dark:text-slate-800" />
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={`${value * 1.76} 176`}
                  className={value >= 80 ? "text-emerald-500" : value >= 60 ? "text-amber-500" : "text-red-500"}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-slate-900 dark:text-white">{value}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Critical & Warning Risks */}
      <div className="space-y-4">
        {criticalRisks.map((risk, index) => (
          <motion.div
            key={risk.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`rounded-2xl backdrop-blur-xl border shadow-xl p-6 ${
              risk.severity === "critical"
                ? "bg-red-500/10 dark:bg-red-500/20 border-red-500/30"
                : risk.severity === "warning"
                ? "bg-amber-500/10 dark:bg-amber-500/20 border-amber-500/30"
                : "bg-blue-500/10 dark:bg-blue-500/20 border-blue-500/30"
            }`}
          >
            <div className="flex items-start gap-6">
              {/* Icon & Status */}
              <div className="flex-shrink-0">
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                    risk.severity === "critical"
                      ? "bg-gradient-to-br from-red-500 to-rose-500"
                      : risk.severity === "warning"
                      ? "bg-gradient-to-br from-amber-500 to-orange-500"
                      : "bg-gradient-to-br from-blue-500 to-cyan-500"
                  }`}
                >
                  <risk.icon className="w-7 h-7 text-white" />
                </div>
                <div className="mt-2 text-center">
                  <span
                    className={`text-xs font-bold uppercase ${
                      risk.severity === "critical"
                        ? "text-red-700 dark:text-red-300"
                        : risk.severity === "warning"
                        ? "text-amber-700 dark:text-amber-300"
                        : "text-blue-700 dark:text-blue-300"
                    }`}
                  >
                    {risk.severity}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{risk.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{risk.description}</p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white/50 dark:bg-slate-950/50">
                    <Clock className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{risk.timeline}</span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {Object.entries(risk.metrics).map(([key, value]) => (
                    <div key={key} className="bg-white/50 dark:bg-slate-950/50 rounded-lg p-3">
                      <p className="text-xs text-slate-500 dark:text-slate-500 capitalize mb-1">{key}</p>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{value}</p>
                    </div>
                  ))}
                </div>

                {/* Impact */}
                <div className="mb-4 p-3 rounded-lg bg-white/50 dark:bg-slate-950/50">
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Predicted Impact</p>
                  <p className="text-sm text-slate-900 dark:text-white">{risk.impact}</p>
                </div>

                {/* Recommendations */}
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white mb-2">AI Recommendations</p>
                  <div className="space-y-2">
                    {risk.recommendations.map((rec, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-1.5 flex-shrink-0" />
                        <p className="text-sm text-slate-700 dark:text-slate-300">{rec}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Confidence */}
                <div className="mt-4 pt-4 border-t border-slate-200/50 dark:border-slate-800/50">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-600 dark:text-slate-400">Prediction Confidence</span>
                    <div className="flex-1 max-w-xs bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                      <div
                        className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full"
                        style={{ width: `${risk.confidence}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{risk.confidence}%</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Risk Trend Forecast */}
      <div className="rounded-2xl backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-xl">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">6-Month Risk Projection</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={upcomingRisks}>
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
            <Line yAxisId="left" type="monotone" dataKey="runway" stroke="#ef4444" strokeWidth={2} name="Runway (months)" />
            <Line yAxisId="right" type="monotone" dataKey="churn" stroke="#f59e0b" strokeWidth={2} name="Churn %" />
            <Line yAxisId="right" type="monotone" dataKey="cac" stroke="#8b5cf6" strokeWidth={2} name="CAC ($)" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
