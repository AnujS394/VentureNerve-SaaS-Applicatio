import { useState } from "react";
import { FlaskConical, TrendingUp, Users, DollarSign, Target, Zap, Play } from "lucide-react";
import { motion } from "motion/react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { toast } from "sonner";

const scenarios = [
  {
    id: "hiring",
    title: "Hiring Impact Simulator",
    icon: Users,
    color: "from-blue-500 to-cyan-500",
    description: "Model the impact of hiring decisions on burn rate and runway",
    variables: [
      { name: "New Hires", key: "hires", min: 0, max: 10, default: 2, unit: "people" },
      { name: "Avg Salary", key: "salary", min: 60000, max: 150000, default: 90000, unit: "$" },
      { name: "Ramp Time", key: "ramp", min: 1, max: 6, default: 3, unit: "months" },
    ],
  },
  {
    id: "pricing",
    title: "Pricing Strategy Simulator",
    icon: DollarSign,
    color: "from-emerald-500 to-teal-500",
    description: "Test different pricing models and their revenue impact",
    variables: [
      { name: "Price Change", key: "priceChange", min: -50, max: 50, default: 10, unit: "%" },
      { name: "Expected Churn", key: "churn", min: 0, max: 30, default: 8, unit: "%" },
      { name: "New Customer Impact", key: "acquisition", min: -40, max: 40, default: -15, unit: "%" },
    ],
  },
  {
    id: "market",
    title: "Market Expansion Simulator",
    icon: Target,
    color: "from-violet-500 to-purple-500",
    description: "Project outcomes of entering new markets or segments",
    variables: [
      { name: "Market Size", key: "marketSize", min: 100, max: 5000, default: 1200, unit: "K customers" },
      { name: "Penetration Rate", key: "penetration", min: 1, max: 20, default: 5, unit: "%" },
      { name: "CAC Multiplier", key: "cacMultiplier", min: 1, max: 3, default: 1.5, unit: "x" },
    ],
  },
  {
    id: "fundraising",
    title: "Fundraising Timing Simulator",
    icon: TrendingUp,
    color: "from-fuchsia-500 to-pink-500",
    description: "Optimize fundraising timeline and amount",
    variables: [
      { name: "Raise Amount", key: "raiseAmount", min: 1, max: 10, default: 4, unit: "M" },
      { name: "Months Until Close", key: "timeline", min: 2, max: 9, default: 4, unit: "months" },
      { name: "Dilution", key: "dilution", min: 10, max: 35, default: 22, unit: "%" },
    ],
  },
];

const initialBaselineData = [
  { month: "Jul", baseline: 95, scenario: 95 },
  { month: "Aug", baseline: 105, scenario: 105 },
  { month: "Sep", baseline: 116, scenario: 120 },
  { month: "Oct", baseline: 128, scenario: 138 },
  { month: "Nov", baseline: 141, scenario: 159 },
  { month: "Dec", baseline: 155, scenario: 183 },
  { month: "Jan", baseline: 171, scenario: 211 },
  { month: "Feb", baseline: 188, scenario: 243 },
];

export function ScenarioSimulator() {
  const [activeScenario, setActiveScenario] = useState(scenarios[0]);
  const [variables, setVariables] = useState(
    Object.fromEntries(activeScenario.variables.map((v) => [v.key, v.default]))
  );
  const [isSimulating, setIsSimulating] = useState(false);
  const [chartData, setChartData] = useState(initialBaselineData);
  const [results, setResults] = useState({
    revenueImpact: "+$88K",
    revenuePercent: "+57%",
    runwayImpact: "+3.2 mo",
    runwayTotal: "16.2 months",
    successProbability: 82,
    riskLevel: "Low",
  });

  const handleVariableChange = (key: string, value: number) => {
    setVariables((prev) => ({ ...prev, [key]: value }));
  };

  const runSimulation = () => {
    if (isSimulating) return;

    setIsSimulating(true);
    toast.info("Running simulation with current variables...");

    // Simulate calculation based on variables
    setTimeout(() => {
      try {
        // Calculate growth multiplier based on scenario and variables
        let growthMultiplier = 1.0;

        if (activeScenario.id === "hiring") {
          const hires = variables.hires || 2;
          growthMultiplier = 1 + (hires * 0.15);
        } else if (activeScenario.id === "pricing") {
          const priceChange = variables.priceChange || 10;
          growthMultiplier = 1 + (priceChange / 100 * 1.2);
        } else if (activeScenario.id === "market") {
          const penetration = variables.penetration || 5;
          growthMultiplier = 1 + (penetration / 10);
        } else if (activeScenario.id === "fundraising") {
          const raiseAmount = variables.raiseAmount || 4;
          growthMultiplier = 1 + (raiseAmount / 20);
        }

        // Generate new data with calculated multiplier
        const newData = initialBaselineData.map((item, index) => ({
          ...item,
          scenario: Math.round(item.baseline * (1 + (growthMultiplier - 1) * (index / 7))),
        }));

        setChartData(newData);

        // Calculate results
        const finalScenario = newData[newData.length - 1].scenario;
        const finalBaseline = newData[newData.length - 1].baseline;
        const diff = finalScenario - finalBaseline;
        const percentDiff = Math.round((diff / finalBaseline) * 100);

        const runwayIncrease = (growthMultiplier - 1) * 5;
        const probability = Math.min(95, Math.max(60, Math.round(75 + (growthMultiplier - 1) * 30)));

        setResults({
          revenueImpact: `${diff >= 0 ? '+' : ''}$${diff}K`,
          revenuePercent: `${percentDiff >= 0 ? '+' : ''}${percentDiff}%`,
          runwayImpact: `${runwayIncrease >= 0 ? '+' : ''}${runwayIncrease.toFixed(1)} mo`,
          runwayTotal: `${(13 + runwayIncrease).toFixed(1)} months`,
          successProbability: probability,
          riskLevel: probability >= 80 ? "Low" : probability >= 65 ? "Medium" : "High",
        });

        setIsSimulating(false);
        toast.success("✓ Simulation completed! Results updated below.");
      } catch (error) {
        setIsSimulating(false);
        toast.error("Simulation failed. Please try again.");
        console.error("Simulation error:", error);
      }
    }, 1500);
  };

  const switchScenario = (scenario: typeof scenarios[0]) => {
    setActiveScenario(scenario);
    setVariables(Object.fromEntries(scenario.variables.map((v) => [v.key, v.default])));
    setChartData(initialBaselineData);
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Scenario Simulation Engine</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Model strategic decisions with AI-powered forecasting</p>
      </div>

      {/* Scenario Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {scenarios.map((scenario) => (
          <motion.button
            key={scenario.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => switchScenario(scenario)}
            className={`text-left rounded-2xl backdrop-blur-xl border p-6 transition-all ${
              activeScenario.id === scenario.id
                ? "bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border-violet-500/50 dark:border-violet-500/50 shadow-xl"
                : "bg-white/60 dark:bg-slate-900/60 border-slate-200/50 dark:border-slate-800/50 hover:border-violet-500/30"
            }`}
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${scenario.color} flex items-center justify-center mb-4`}>
              <scenario.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{scenario.title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">{scenario.description}</p>
          </motion.button>
        ))}
      </div>

      {/* Active Simulation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-4">
          <div className="rounded-2xl backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Simulation Variables</h3>
            <div className="space-y-6">
              {activeScenario.variables.map((variable) => (
                <div key={variable.key}>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{variable.name}</label>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {variable.unit === "$" && "$"}
                      {variables[variable.key]?.toLocaleString()}
                      {variable.unit !== "$" && ` ${variable.unit}`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={variable.min}
                    max={variable.max}
                    value={variables[variable.key] || variable.default}
                    onChange={(e) => handleVariableChange(variable.key, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-500"
                  />
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-slate-500 dark:text-slate-500">
                      {variable.unit === "$" && "$"}
                      {variable.min.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-500">
                      {variable.unit === "$" && "$"}
                      {variable.max.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={runSimulation}
              disabled={isSimulating}
              className="w-full mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              {isSimulating ? (
                <>
                  <Zap className="w-5 h-5 animate-pulse" />
                  Simulating...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  Run Simulation
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-6">
          {/* Forecast Chart */}
          <div className="rounded-2xl backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">MRR Forecast Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <defs>
                  <linearGradient id="baselineGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="scenarioGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.2} />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(15, 23, 42, 0.9)",
                    border: "1px solid rgba(148, 163, 184, 0.2)",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="baseline"
                  stroke="#94a3b8"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Current Trajectory"
                />
                <Line
                  type="monotone"
                  dataKey="scenario"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  name="Scenario Outcome"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-slate-600 dark:text-slate-400">Revenue Impact</p>
                <TrendingUp className="w-5 h-5 text-emerald-500" />
              </div>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">{results.revenueImpact}</p>
              <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">{results.revenuePercent} vs baseline</p>
            </div>

            <div className="rounded-xl backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-slate-600 dark:text-slate-400">Runway Impact</p>
                <DollarSign className="w-5 h-5 text-violet-500" />
              </div>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">{results.runwayImpact}</p>
              <p className="text-sm text-violet-600 dark:text-violet-400 mt-1">{results.runwayTotal} total</p>
            </div>

            <div className="rounded-xl backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-slate-600 dark:text-slate-400">Success Probability</p>
                <Zap className="w-5 h-5 text-amber-500" />
              </div>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">{results.successProbability}%</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">High confidence</p>
            </div>

            <div className="rounded-xl backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-slate-600 dark:text-slate-400">Risk Level</p>
                <Target className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">{results.riskLevel}</p>
              <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">Recommended action</p>
            </div>
          </div>

          {/* AI Insights */}
          <div className="rounded-2xl backdrop-blur-xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 dark:from-violet-500/20 dark:to-fuchsia-500/20 border border-violet-500/20 dark:border-violet-500/30 p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">AI Analysis & Recommendations</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-2 flex-shrink-0" />
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  This scenario projects significant revenue impact driven by your variable adjustments and market conditions.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-2 flex-shrink-0" />
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Based on historical data and current metrics, the predicted outcomes fall within realistic bounds with {results.successProbability}% confidence.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-2 flex-shrink-0" />
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  <strong>Recommendation:</strong> {results.riskLevel === "Low" ? "Proceed with this strategy" : "Consider adjusting variables to reduce risk"} based on the current simulation results and your strategic objectives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
