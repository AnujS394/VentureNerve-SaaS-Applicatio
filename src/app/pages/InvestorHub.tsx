import { TrendingUp, DollarSign, CheckCircle, AlertCircle, FileText, Users, Calendar, Target } from "lucide-react";
import { motion } from "motion/react";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const readinessScore = 74;

const readinessMetrics = [
  { category: "Growth Metrics", score: 92, status: "excellent" },
  { category: "Unit Economics", score: 88, status: "excellent" },
  { category: "Market Opportunity", score: 78, status: "good" },
  { category: "Team Strength", score: 72, status: "good" },
  { category: "Financial Health", score: 68, status: "needs-work" },
  { category: "Product-Market Fit", score: 85, status: "excellent" },
];

const radarData = [
  { metric: "Growth", value: 92, fullMark: 100 },
  { metric: "Economics", value: 88, fullMark: 100 },
  { metric: "Market", value: 78, fullMark: 100 },
  { metric: "Team", value: 72, fullMark: 100 },
  { metric: "Finance", value: 68, fullMark: 100 },
  { metric: "PMF", value: 85, fullMark: 100 },
];

const benchmarkData = [
  { metric: "MRR Growth", you: 12.3, benchmark: 15, unit: "%" },
  { metric: "CAC Payback", you: 8, benchmark: 12, unit: "months" },
  { metric: "NPS", you: 67, benchmark: 50, unit: "" },
  { metric: "Gross Margin", you: 78, benchmark: 75, unit: "%" },
  { metric: "Burn Multiple", you: 1.8, benchmark: 2.5, unit: "x" },
];

const dueDiligenceChecklist = [
  { category: "Financial", items: [
    { task: "3-year financial projections", status: "complete" },
    { task: "Cap table and ownership structure", status: "complete" },
    { task: "Historical financials (P&L, balance sheet)", status: "complete" },
    { task: "Customer concentration analysis", status: "in-progress" },
  ]},
  { category: "Legal", items: [
    { task: "Incorporation documents", status: "complete" },
    { task: "IP assignments and patents", status: "complete" },
    { task: "Material contracts review", status: "in-progress" },
    { task: "Employment agreements", status: "complete" },
  ]},
  { category: "Product", items: [
    { task: "Product roadmap (12-18 months)", status: "complete" },
    { task: "Technical architecture documentation", status: "in-progress" },
    { task: "Security and compliance certifications", status: "pending" },
    { task: "Customer testimonials and case studies", status: "complete" },
  ]},
];

const targetInvestors = [
  { name: "Sequoia Capital", fit: 82, stage: "Series A", focus: "B2B SaaS", contact: "Warm intro via John Smith" },
  { name: "Andreessen Horowitz", fit: 78, stage: "Series A", focus: "Enterprise Tech", contact: "Cold outreach" },
  { name: "Accel", fit: 85, stage: "Series A", focus: "SaaS", contact: "Warm intro via Sarah Chen" },
  { name: "Bessemer Venture Partners", fit: 80, stage: "Series A", focus: "Cloud Software", contact: "Previous meeting" },
];

export function InvestorHub() {
  const completionRate = Math.round(
    (dueDiligenceChecklist.flatMap(c => c.items).filter(i => i.status === "complete").length /
    dueDiligenceChecklist.flatMap(c => c.items).length) * 100
  );

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Investor Intelligence Hub</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Fundraising readiness and investor intelligence</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-600 dark:text-slate-400">Suggested Raise</p>
          <p className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
            $3-5M
          </p>
        </div>
      </div>

      {/* Investor Readiness Score */}
      <div className="rounded-2xl backdrop-blur-xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 dark:from-violet-500/20 dark:to-fuchsia-500/20 border border-violet-500/20 dark:border-violet-500/30 p-8 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Investor Readiness Score</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">Based on Series A benchmarks and market conditions</p>

            <div className="flex items-center gap-6 mb-6">
              <div className="relative w-32 h-32">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="none" className="text-slate-200 dark:text-slate-800" />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${readinessScore * 3.52} 352`}
                    className="text-violet-500"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-slate-900 dark:text-white">{readinessScore}</span>
                  <span className="text-xs text-slate-600 dark:text-slate-400">/ 100</span>
                </div>
              </div>

              <div>
                <p className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Good Progress</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  You're on track for Series A fundraising. Address financial health concerns to reach 85+ readiness.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {readinessMetrics.map((metric, index) => (
                <motion.div
                  key={metric.category}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{metric.category}</span>
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{metric.score}</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                      <div
                        className={`h-full rounded-full ${
                          metric.status === "excellent"
                            ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                            : metric.status === "good"
                            ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                            : "bg-gradient-to-r from-amber-500 to-orange-500"
                        }`}
                        style={{ width: `${metric.score}%` }}
                      />
                    </div>
                  </div>
                  {metric.status === "excellent" ? (
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  ) : metric.status === "good" ? (
                    <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Investor Readiness Radar</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#94a3b8" />
                <PolarAngleAxis dataKey="metric" stroke="#94a3b8" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#94a3b8" />
                <Radar name="Your Startup" dataKey="value" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Benchmark Comparison */}
      <div className="rounded-2xl backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-xl">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Series A Benchmark Comparison</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={benchmarkData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.2} />
            <XAxis dataKey="metric" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(15, 23, 42, 0.9)",
                border: "1px solid rgba(148, 163, 184, 0.2)",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="you" fill="#8b5cf6" name="Your Metrics" radius={[8, 8, 0, 0]} />
            <Bar dataKey="benchmark" fill="#94a3b8" name="Series A Benchmark" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Target Investors */}
      <div className="rounded-2xl backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Target Investors (AI Matched)</h3>
          <span className="text-sm text-slate-600 dark:text-slate-400">{targetInvestors.length} high-fit matches</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {targetInvestors.map((investor, index) => (
            <motion.div
              key={investor.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">{investor.name}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{investor.focus}</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-violet-600 dark:text-violet-400">{investor.fit}%</span>
                  <p className="text-xs text-slate-500 dark:text-slate-500">Match</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-2">
                <Target className="w-4 h-4" />
                <span>{investor.stage}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <Users className="w-4 h-4" />
                <span>{investor.contact}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Due Diligence Readiness */}
      <div className="rounded-2xl backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Due Diligence Readiness</h3>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{completionRate}%</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">Complete</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {dueDiligenceChecklist.map((category) => (
            <div key={category.category}>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-3">{category.category}</h4>
              <div className="space-y-2">
                {category.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50"
                  >
                    {item.status === "complete" ? (
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    ) : item.status === "in-progress" ? (
                      <div className="w-5 h-5 rounded-full border-2 border-violet-500 border-t-transparent animate-spin flex-shrink-0" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-700 flex-shrink-0" />
                    )}
                    <span className={`text-sm flex-1 ${item.status === "complete" ? "text-slate-700 dark:text-slate-300" : "text-slate-600 dark:text-slate-400"}`}>
                      {item.task}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        item.status === "complete"
                          ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                          : item.status === "in-progress"
                          ? "bg-violet-500/10 text-violet-700 dark:text-violet-300"
                          : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      {item.status === "complete" ? "Done" : item.status === "in-progress" ? "In Progress" : "Pending"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fundraising Timeline */}
      <div className="rounded-2xl backdrop-blur-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/20 dark:to-teal-500/20 border border-emerald-500/20 dark:border-emerald-500/30 p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Recommended Fundraising Timeline</h3>
            <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                <p><strong>Next 30 days:</strong> Complete remaining due diligence items, refine pitch deck, build VC relationships</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                <p><strong>Month 2-3:</strong> Begin outreach to target investors, schedule initial meetings, gather feedback</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                <p><strong>Month 4-5:</strong> Partner meetings, term sheet negotiations, due diligence process</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                <p><strong>Month 6:</strong> Close round, announce funding, begin execution on growth plan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
