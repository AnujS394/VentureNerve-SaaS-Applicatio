import { FileText, Download, Calendar, TrendingUp, AlertTriangle, CheckCircle, Target } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

const reports = [
  {
    id: 1,
    type: "Weekly Report",
    date: "Week of June 1-7, 2026",
    status: "published",
    summary: "Strong MRR growth (+12.3%), runway concerns flagged, product adoption excellent.",
  },
  {
    id: 2,
    type: "Monthly Review",
    date: "May 2026",
    status: "published",
    summary: "Exceeded revenue targets, team expansion completed, fundraising prep initiated.",
  },
  {
    id: 3,
    type: "Quarterly Business Review",
    date: "Q1 2026",
    status: "published",
    summary: "Q1 revenue: $287K (+45% YoY). Product-market fit validated. Series A timing recommended.",
  },
];

const kpis = [
  { metric: "MRR", current: "$95,000", target: "$100,000", status: "on-track", trend: "+12.3%" },
  { metric: "Customer Count", current: "1,247", target: "1,300", status: "on-track", trend: "+8.5%" },
  { metric: "Gross Margin", current: "78%", target: "75%", status: "ahead", trend: "+3%" },
  { metric: "Burn Rate", current: "$52,000", target: "$45,000", status: "behind", trend: "+8.3%" },
  { metric: "Runway", current: "13 months", target: "18 months", status: "behind", trend: "-1 month" },
  { metric: "NPS", current: "+67", target: "+60", status: "ahead", trend: "+12" },
];

const strategicPriorities = [
  {
    id: 1,
    priority: "Extend Runway",
    status: "in-progress",
    progress: 45,
    owner: "AI CFO",
    actions: ["Reduce operational costs by 15%", "Accelerate revenue growth initiatives", "Optimize team structure"],
    deadline: "End of Q3 2026",
  },
  {
    id: 2,
    priority: "Prepare Series A Fundraising",
    status: "in-progress",
    progress: 68,
    owner: "AI Fundraising Agent",
    actions: ["Complete due diligence checklist", "Refine pitch deck", "Build VC relationships"],
    deadline: "August 2026",
  },
  {
    id: 3,
    priority: "Reduce Customer Churn",
    status: "in-progress",
    progress: 32,
    owner: "AI Growth Agent",
    actions: ["Improve onboarding (NPS +45 → +65)", "Launch customer success program", "Identify churn triggers"],
    deadline: "July 2026",
  },
  {
    id: 4,
    priority: "Enter European Market",
    status: "planning",
    progress: 15,
    owner: "AI Strategy Agent",
    actions: ["Market research and sizing", "Regulatory compliance review", "Localization requirements"],
    deadline: "Q4 2026",
  },
];

const recommendations = [
  {
    id: 1,
    priority: "critical",
    title: "Initiate fundraising conversations within 30 days",
    rationale: "Current runway (13 months) requires 4-6 month fundraising timeline. Starting conversations now provides comfortable buffer.",
    confidence: 92,
    agent: "AI CFO + AI Fundraising Agent",
  },
  {
    id: 2,
    priority: "high",
    title: "Hire senior sales executive to capture enterprise opportunity",
    rationale: "Product-market fit validated. Enterprise tier could add $40K+ MRR. ROI timeline: 3-4 months.",
    confidence: 85,
    agent: "AI Strategy Agent",
  },
  {
    id: 3,
    priority: "high",
    title: "Launch customer success program to reduce churn",
    rationale: "12% churn increase threatens growth trajectory. Early intervention critical.",
    confidence: 88,
    agent: "AI Growth Agent",
  },
  {
    id: 4,
    priority: "medium",
    title: "Accelerate product development velocity",
    rationale: "Feature releases down 30%. Market moving fast. Product investment needed to maintain competitive position.",
    confidence: 78,
    agent: "AI Product Agent",
  },
];

export function AIBoardRoom() {
  const generateReportHTML = (reportType: string, reportData: any) => {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${reportType} - VentureNerve</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; line-height: 1.6; color: #1e293b; }
    .header { border-bottom: 3px solid #8b5cf6; padding-bottom: 20px; margin-bottom: 30px; }
    h1 { color: #8b5cf6; margin: 0; font-size: 28px; }
    .subtitle { color: #64748b; margin-top: 5px; }
    .meta { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; }
    .meta-item { background: #f8fafc; padding: 15px; border-radius: 8px; }
    .meta-label { font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: 600; }
    .meta-value { font-size: 16px; color: #1e293b; font-weight: 600; margin-top: 5px; }
    .section { margin: 30px 0; }
    .section-title { color: #1e293b; font-size: 20px; margin-bottom: 15px; border-left: 4px solid #8b5cf6; padding-left: 15px; }
    .summary { background: #f1f5f9; padding: 20px; border-radius: 8px; border-left: 4px solid #8b5cf6; }
    .footer { margin-top: 50px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center; color: #64748b; font-size: 12px; }
    .badge { display: inline-block; padding: 4px 12px; background: #10b981; color: white; border-radius: 4px; font-size: 12px; font-weight: 600; }
  </style>
</head>
<body>
  <div class="header">
    <h1>VentureNerve AI Board Room</h1>
    <p class="subtitle">Strategic Intelligence Report</p>
  </div>

  <div class="meta">
    <div class="meta-item">
      <div class="meta-label">Report Type</div>
      <div class="meta-value">${reportType}</div>
    </div>
    <div class="meta-item">
      <div class="meta-label">Report Period</div>
      <div class="meta-value">${reportData.date}</div>
    </div>
    <div class="meta-item">
      <div class="meta-label">Status</div>
      <div class="meta-value"><span class="badge">${reportData.status.toUpperCase()}</span></div>
    </div>
    <div class="meta-item">
      <div class="meta-label">Generated</div>
      <div class="meta-value">${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</div>
    </div>
  </div>

  <div class="section">
    <h2 class="section-title">Executive Summary</h2>
    <div class="summary">
      <p>${reportData.summary}</p>
    </div>
  </div>

  <div class="section">
    <h2 class="section-title">Report Details</h2>
    <p>This report provides comprehensive insights into your startup's performance during the specified period. The data has been analyzed by VentureNerve's AI agents to identify key trends, risks, and opportunities.</p>
    <p><strong>Report ID:</strong> VN-${reportData.id}-${Date.now()}</p>
  </div>

  <div class="footer">
    <p>Generated by VentureNerve Strategic AI OS</p>
    <p>This is an automated report. For questions, contact your account manager.</p>
  </div>
</body>
</html>
    `.trim();
  };

  const downloadFile = (filename: string, content: string, type: string = 'text/html') => {
    try {
      const blob = new Blob([content], { type });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();

      // Cleanup
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      console.error('Download failed:', error);
      toast.error('Failed to download file. Please try again.');
    }
  };

  const handleExportAll = () => {
    toast.info("Preparing reports for export...");

    setTimeout(() => {
      let completed = 0;
      reports.forEach((report, index) => {
        setTimeout(() => {
          const content = generateReportHTML(report.type, report);
          const filename = `VentureNerve_${report.type.replace(/\s+/g, '_')}_${Date.now()}_${report.id}.html`;
          downloadFile(filename, content, 'text/html');
          completed++;

          if (completed === reports.length) {
            toast.success(`✓ All ${reports.length} reports exported successfully!`);
          }
        }, index * 600);
      });
    }, 300);
  };

  const handleDownloadReport = (reportType: string, report: any) => {
    toast.info(`Preparing ${reportType}...`);

    setTimeout(() => {
      const content = generateReportHTML(reportType, report);
      const filename = `VentureNerve_${reportType.replace(/\s+/g, '_')}_${Date.now()}.html`;
      downloadFile(filename, content, 'text/html');
      toast.success(`✓ ${reportType} downloaded successfully!`);
    }, 400);
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">AI Board Room</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Strategic reports and board-level insights</p>
      </div>

      {/* Recent Reports */}
      <div className="rounded-2xl backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Recent Reports</h2>
          <button
            onClick={handleExportAll}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-500 hover:bg-violet-600 text-white font-medium transition-colors"
          >
            <Download className="w-4 h-4" />
            Export All
          </button>
        </div>
        <div className="space-y-3">
          {reports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-violet-500/50 transition-colors cursor-pointer group"
              onClick={() => handleDownloadReport(report.type, report)}
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-slate-900 dark:text-white">{report.type}</h3>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs font-medium">
                    Published
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">{report.date}</p>
                <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">{report.summary}</p>
              </div>
              <Download className="w-5 h-5 text-slate-400 group-hover:text-violet-500 transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* KPI Dashboard */}
      <div className="rounded-2xl backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">Key Performance Indicators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {kpis.map((kpi, index) => (
            <motion.div
              key={kpi.metric}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className={`p-5 rounded-xl border ${
                kpi.status === "ahead"
                  ? "bg-emerald-500/10 dark:bg-emerald-500/20 border-emerald-500/30"
                  : kpi.status === "on-track"
                  ? "bg-blue-500/10 dark:bg-blue-500/20 border-blue-500/30"
                  : "bg-red-500/10 dark:bg-red-500/20 border-red-500/30"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{kpi.metric}</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{kpi.current}</p>
                </div>
                {kpi.status === "ahead" ? (
                  <CheckCircle className="w-6 h-6 text-emerald-500" />
                ) : kpi.status === "on-track" ? (
                  <TrendingUp className="w-6 h-6 text-blue-500" />
                ) : (
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                )}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">Target: {kpi.target}</span>
                <span
                  className={`font-medium ${
                    kpi.status === "ahead"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : kpi.status === "on-track"
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {kpi.trend}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Strategic Priorities */}
      <div className="rounded-2xl backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">Strategic Priorities</h2>
        <div className="space-y-4">
          {strategicPriorities.map((priority, index) => (
            <motion.div
              key={priority.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-slate-900 dark:text-white">{priority.priority}</h3>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        priority.status === "in-progress"
                          ? "bg-violet-500/10 text-violet-700 dark:text-violet-300"
                          : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      {priority.status === "in-progress" ? "In Progress" : "Planning"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 mb-3">
                    <span>Owner: {priority.owner}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{priority.deadline}</span>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-slate-600 dark:text-slate-400">Progress</span>
                      <span className="text-xs font-medium text-slate-900 dark:text-white">{priority.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div
                        className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full transition-all duration-500"
                        style={{ width: `${priority.progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    {priority.actions.map((action, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-violet-500 mt-2 flex-shrink-0" />
                        <p className="text-sm text-slate-700 dark:text-slate-300">{action}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Board Recommendations */}
      <div className="rounded-2xl backdrop-blur-xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 dark:from-violet-500/20 dark:to-fuchsia-500/20 border border-violet-500/20 dark:border-violet-500/30 p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">AI Strategic Recommendations</h2>
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-5 rounded-xl border ${
                rec.priority === "critical"
                  ? "bg-red-500/10 dark:bg-red-500/20 border-red-500/20 dark:border-red-500/30"
                  : rec.priority === "high"
                  ? "bg-amber-500/10 dark:bg-amber-500/20 border-amber-500/20 dark:border-amber-500/30"
                  : "bg-blue-500/10 dark:bg-blue-500/20 border-blue-500/20 dark:border-blue-500/30"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Target className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-bold uppercase ${
                        rec.priority === "critical"
                          ? "bg-red-500/20 text-red-700 dark:text-red-300"
                          : rec.priority === "high"
                          ? "bg-amber-500/20 text-amber-700 dark:text-amber-300"
                          : "bg-blue-500/20 text-blue-700 dark:text-blue-300"
                      }`}
                    >
                      {rec.priority}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-500">from {rec.agent}</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{rec.title}</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">{rec.rationale}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-600 dark:text-slate-400">Confidence:</span>
                    <div className="flex-1 max-w-xs bg-slate-200 dark:bg-slate-800 rounded-full h-1.5">
                      <div
                        className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full transition-all duration-500"
                        style={{ width: `${rec.confidence}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-slate-900 dark:text-white">{rec.confidence}%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
