import { Target, TrendingUp, DollarSign, Users, Package, AlertCircle, CheckCircle } from "lucide-react";
import { motion } from "motion/react";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const competitors = [
  {
    id: 1,
    name: "Competitor A",
    threat: "high" as const,
    marketShare: 28,
    funding: "$45M Series B",
    employees: 120,
    recentActivity: "Launched enterprise tier, hired VP Sales",
    strengths: ["Brand recognition", "Large customer base", "Strong sales team"],
    weaknesses: ["Legacy tech stack", "Slow product velocity", "Poor mobile experience"],
  },
  {
    id: 2,
    name: "Competitor B",
    threat: "medium" as const,
    marketShare: 15,
    funding: "$12M Series A",
    employees: 45,
    recentActivity: "Raised Series A, expanding to Europe",
    strengths: ["Modern product", "Fast growth", "European presence"],
    weaknesses: ["Limited features", "Small team", "Unproven at scale"],
  },
  {
    id: 3,
    name: "Competitor C",
    threat: "low" as const,
    marketShare: 8,
    funding: "$3M Seed",
    employees: 18,
    recentActivity: "Pivot to SMB market",
    strengths: ["Agile", "Low pricing", "Good UX"],
    weaknesses: ["Limited resources", "No enterprise features", "Weak positioning"],
  },
];

const comparisonData = [
  { feature: "Product", you: 85, compA: 72, compB: 78, compC: 65 },
  { feature: "Pricing", you: 78, compA: 65, compB: 82, compC: 90 },
  { feature: "Brand", you: 68, compA: 92, compB: 55, compC: 42 },
  { feature: "Support", you: 88, compA: 75, compB: 70, compC: 68 },
  { feature: "Features", you: 82, compA: 88, compB: 65, compC: 58 },
];

const radarData = [
  { category: "Product", you: 85, market: 72 },
  { category: "Pricing", you: 78, market: 79 },
  { category: "Brand", you: 68, market: 71 },
  { category: "Support", you: 88, market: 71 },
  { category: "Features", you: 82, market: 70 },
  { category: "Growth", you: 92, market: 68 },
];

const marketEvents = [
  {
    id: 1,
    date: "2 days ago",
    type: "funding" as const,
    company: "Competitor A",
    title: "Competitor A raises $45M Series B",
    impact: "high" as const,
    description: "Led by Sequoia Capital. Plans to expand sales team and accelerate product development.",
  },
  {
    id: 2,
    date: "1 week ago",
    type: "product" as const,
    company: "Competitor B",
    title: "Competitor B launches European expansion",
    impact: "medium" as const,
    description: "Opening offices in London and Berlin. Targeting DACH market with localized product.",
  },
  {
    id: 3,
    date: "2 weeks ago",
    type: "pricing" as const,
    company: "Competitor A",
    title: "Market leader drops pricing 15%",
    impact: "medium" as const,
    description: "Competitor A reduced enterprise tier pricing. May pressure margins across market.",
  },
];

export function CompetitorIntelligence() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Competitive Intelligence</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Real-time tracking of competitive landscape</p>
      </div>

      {/* Competitive Positioning */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Comparison */}
        <div className="rounded-2xl backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-xl">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Competitive Positioning</h3>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#94a3b8" strokeDasharray="3 3" />
                <PolarAngleAxis
                  dataKey="category"
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  stroke="#94a3b8"
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={{ fill: '#64748b', fontSize: 10 }}
                  stroke="#94a3b8"
                />
                <Radar
                  name="Your Startup"
                  dataKey="you"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  fill="#8b5cf6"
                  fillOpacity={0.6}
                />
                <Radar
                  name="Market Average"
                  dataKey="market"
                  stroke="#94a3b8"
                  strokeWidth={2}
                  fill="#94a3b8"
                  fillOpacity={0.3}
                />
                <Legend
                  wrapperStyle={{
                    paddingTop: '20px',
                    fontSize: '14px',
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    border: '1px solid rgba(148, 163, 184, 0.2)',
                    borderRadius: '8px',
                    padding: '12px',
                  }}
                  labelStyle={{ color: '#f1f5f9', fontWeight: 600 }}
                  itemStyle={{ color: '#cbd5e1' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-violet-500/10 dark:bg-violet-500/20 border border-violet-500/20">
              <p className="text-xs text-slate-600 dark:text-slate-400">Your Average Score</p>
              <p className="text-2xl font-bold text-violet-600 dark:text-violet-400">
                {Math.round(radarData.reduce((acc, item) => acc + item.you, 0) / radarData.length)}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <p className="text-xs text-slate-600 dark:text-slate-400">Market Average</p>
              <p className="text-2xl font-bold text-slate-600 dark:text-slate-400">
                {Math.round(radarData.reduce((acc, item) => acc + item.market, 0) / radarData.length)}
              </p>
            </div>
          </div>
        </div>

        {/* Feature Comparison */}
        <div className="rounded-2xl backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-xl">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Feature Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.2} />
              <XAxis dataKey="feature" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.9)",
                  border: "1px solid rgba(148, 163, 184, 0.2)",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="you" fill="#8b5cf6" name="You" radius={[4, 4, 0, 0]} />
              <Bar dataKey="compA" fill="#94a3b8" name="Comp A" radius={[4, 4, 0, 0]} />
              <Bar dataKey="compB" fill="#64748b" name="Comp B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Competitor Profiles */}
      <div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Tracked Competitors</h2>
        <div className="space-y-4">
          {competitors.map((competitor, index) => (
            <motion.div
              key={competitor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-2xl backdrop-blur-xl border p-6 shadow-xl ${
                competitor.threat === "high"
                  ? "bg-red-500/10 dark:bg-red-500/20 border-red-500/30"
                  : competitor.threat === "medium"
                  ? "bg-amber-500/10 dark:bg-amber-500/20 border-amber-500/30"
                  : "bg-blue-500/10 dark:bg-blue-500/20 border-blue-500/30"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{competitor.name}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{competitor.recentActivity}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    competitor.threat === "high"
                      ? "bg-red-500/20 text-red-700 dark:text-red-300"
                      : competitor.threat === "medium"
                      ? "bg-amber-500/20 text-amber-700 dark:text-amber-300"
                      : "bg-blue-500/20 text-blue-700 dark:text-blue-300"
                  }`}
                >
                  {competitor.threat} Threat
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-white/50 dark:bg-slate-950/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Target className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                    <span className="text-xs text-slate-600 dark:text-slate-400">Market Share</span>
                  </div>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{competitor.marketShare}%</p>
                </div>
                <div className="bg-white/50 dark:bg-slate-950/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                    <span className="text-xs text-slate-600 dark:text-slate-400">Funding</span>
                  </div>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{competitor.funding}</p>
                </div>
                <div className="bg-white/50 dark:bg-slate-950/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                    <span className="text-xs text-slate-600 dark:text-slate-400">Team Size</span>
                  </div>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{competitor.employees}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white mb-2">Strengths</p>
                  <div className="space-y-1">
                    {competitor.strengths.map((strength, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span className="text-sm text-slate-700 dark:text-slate-300">{strength}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white mb-2">Weaknesses</p>
                  <div className="space-y-1">
                    {competitor.weaknesses.map((weakness, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                        <span className="text-sm text-slate-700 dark:text-slate-300">{weakness}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Market Events */}
      <div className="rounded-2xl backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-xl">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Recent Market Events</h3>
        <div className="space-y-4">
          {marketEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700"
            >
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  event.type === "funding"
                    ? "bg-gradient-to-br from-emerald-500 to-teal-500"
                    : event.type === "product"
                    ? "bg-gradient-to-br from-blue-500 to-cyan-500"
                    : "bg-gradient-to-br from-amber-500 to-orange-500"
                }`}
              >
                {event.type === "funding" ? (
                  <DollarSign className="w-6 h-6 text-white" />
                ) : event.type === "product" ? (
                  <Package className="w-6 h-6 text-white" />
                ) : (
                  <TrendingUp className="w-6 h-6 text-white" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-slate-500 dark:text-slate-500">{event.date}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-700 dark:text-violet-300">
                    {event.company}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      event.impact === "high"
                        ? "bg-red-500/10 text-red-700 dark:text-red-300"
                        : "bg-amber-500/10 text-amber-700 dark:text-amber-300"
                    }`}
                  >
                    {event.impact} impact
                  </span>
                </div>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-1">{event.title}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">{event.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Strategic Opportunities */}
      <div className="rounded-2xl backdrop-blur-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/20 dark:to-teal-500/20 border border-emerald-500/20 dark:border-emerald-500/30 p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">AI-Identified Opportunities</h3>
            <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                <p>
                  <strong>Mid-market gap:</strong> Competitors A and C don't serve $1M-5M ARR segment well. Strong differentiation opportunity.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                <p>
                  <strong>Mobile advantage:</strong> Your mobile experience significantly outperforms market leader. Emphasize in positioning.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                <p>
                  <strong>European timing:</strong> Competitor B entering Europe creates awareness. Opportunity to capture market share quickly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
