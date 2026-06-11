import { useState } from "react";
import { Send, Sparkles, TrendingUp, AlertTriangle, Lightbulb, BarChart3 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  suggestions?: string[];
  confidence?: number;
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hello! I'm your AI strategic advisor. I have complete visibility into your startup's financial, operational, product, and market data. Ask me anything about your business, and I'll provide data-driven insights and recommendations.",
    timestamp: new Date(Date.now() - 60000),
    suggestions: [
      "Should I hire more employees?",
      "When should I raise funding?",
      "Why is growth slowing?",
      "What is my biggest risk?",
    ],
  },
];

const sampleResponses = [
  {
    trigger: "hire",
    content: "Based on your current financial position and growth trajectory, here's my analysis:\n\n**Current Situation:**\n• Burn rate: $52,000/month\n• Runway: 13 months\n• Team: 12 employees\n• MRR: $95,000 (+12.3% MoM)\n\n**Recommendation: Cautious Hiring**\n\nI recommend hiring 2-3 key roles maximum over the next quarter:\n\n1. **Senior Sales Executive** (Priority: HIGH)\n   - Your growth score is 92/100, indicating strong product-market fit\n   - Adding enterprise sales expertise could accelerate revenue 2-3x\n   - ROI timeline: 3-4 months\n\n2. **Product Manager** (Priority: MEDIUM)\n   - Product adoption at 95% for new features\n   - Need dedicated PM to maintain velocity\n   - Would free up founder time for strategic work\n\n**Risk Mitigation:**\nHiring more would reduce runway below 12 months, triggering fundraising urgency. Wait until MRR crosses $120K or runway extends to 18+ months.",
    confidence: 87,
    suggestions: ["What roles should I prioritize?", "How can I extend my runway?", "Show me hiring cost impact"],
  },
  {
    trigger: "funding",
    content: "**Fundraising Timeline Analysis:**\n\n**Current Readiness: 74/100**\n\nYou're in a strong position, but not quite ready yet. Here's my recommended timeline:\n\n**Immediate (Next 30 days):**\n• Improve unit economics documentation\n• Create detailed 18-month forecast\n• Build relationships with 5 target VCs\n\n**Optimal Raise Window: Q3 2026 (3-4 months)**\n\n**Why this timing:**\n1. MRR will likely hit $120-130K (better metrics)\n2. 2 more months of growth data builds conviction\n3. Runway still comfortable at 10-11 months\n4. Market conditions favorable for your sector\n\n**Suggested Raise:**\n• Amount: $3-5M Series A\n• Valuation range: $12-15M pre-money\n• Dilution: 20-25%\n\n**Red Flags to Address:**\n• Customer concentration (top 3 = 42% of revenue)\n• Churn increased 12% last month\n\nConfidence in this recommendation: 89%",
    confidence: 89,
    suggestions: ["How do I improve my metrics?", "Who should I talk to?", "What's my valuation range?"],
  },
  {
    trigger: "growth",
    content: "**Growth Deceleration Analysis:**\n\nI've identified 3 primary factors:\n\n**1. Market Saturation in Core Segment (Impact: HIGH)**\n• Your SMB segment showing signs of saturation\n• TAM penetration: ~18% in primary market\n• Recommendation: Expand to mid-market/enterprise\n\n**2. Increased Competition (Impact: MEDIUM)**\n• 2 new competitors entered market in Q1\n• Market leader dropped prices 15%\n• Your competitive positioning still strong (NPS: +67)\n\n**3. Product Velocity Slowdown (Impact: MEDIUM)**\n• Feature releases down 30% vs last quarter\n• User feedback mentions \"stagnation\"\n• Engineering capacity constrained\n\n**Strategic Recommendations:**\n\n→ **Immediate:** Launch enterprise tier (+$40K potential MRR)\n→ **30 days:** Hire senior product manager\n→ **60 days:** Accelerate product roadmap\n→ **90 days:** Enter European market (3x opportunity)\n\nExpected impact: Return to 15-20% MoM growth within 2 quarters.",
    confidence: 82,
    suggestions: ["Show me the enterprise opportunity", "What's the Europe expansion plan?", "How do I speed up product?"],
  },
  {
    trigger: "risk",
    content: "**Critical Risk Assessment:**\n\n**🔴 CRITICAL: Runway Exhaustion**\n• Current trajectory: 13 months remaining\n• Risk level: HIGH\n• Confidence: 94%\n• Action required: Within 30 days\n\n**Mitigation Options:**\n1. Reduce burn by 15% → extends to 16 months\n2. Accelerate fundraising timeline → start conversations now\n3. Focus on revenue acceleration → grow into profitability\n\n**⚠️ WARNING: Customer Churn**\n• Churn increased 12% last month\n• Risk level: MEDIUM\n• Confidence: 87%\n• Impact: Could slow MRR growth to 6-8%\n\n**Recommended Actions:**\n• Deep-dive into churned customer feedback\n• Implement retention initiatives immediately\n• Improve onboarding (current NPS during first 30 days: +45)\n\n**💡 OPPORTUNITY: Enterprise Expansion**\n• European market showing 3x growth potential\n• Risk level: LOW (opportunity)\n• Confidence: 78%\n• Timeline: Launch within 90 days\n\nYour biggest immediate risk is runway management. I recommend focusing on option 2 (fundraising) given your strong growth metrics.",
    confidence: 94,
    suggestions: ["How do I reduce burn?", "Show me churn analysis", "What's the Europe opportunity worth?"],
  },
];

export function FounderCopilot() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (messageText?: string) => {
    const text = messageText || input;
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const matchedResponse = sampleResponses.find((r) => text.toLowerCase().includes(r.trigger));

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: matchedResponse?.content || "I understand your question. Let me analyze your data and provide insights based on your current metrics, growth trajectory, and market conditions. This is a simulated response - in production, I would provide real-time analysis of your startup's data.",
        timestamp: new Date(),
        confidence: matchedResponse?.confidence || 85,
        suggestions: matchedResponse?.suggestions,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="h-screen flex flex-col bg-transparent">
      {/* Header */}
      <div className="p-8 border-b border-slate-200/50 dark:border-slate-800/50 backdrop-blur-xl bg-white/40 dark:bg-slate-950/40">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Founder Copilot</h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">Your AI strategic advisor</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-8 space-y-6">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-3xl ${message.role === "user" ? "ml-12" : "mr-12"}`}>
                {message.role === "assistant" && (
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">VentureNerve AI</span>
                    {message.confidence && (
                      <span className="text-xs text-slate-500 dark:text-slate-500">
                        • {message.confidence}% confidence
                      </span>
                    )}
                  </div>
                )}

                <div
                  className={`rounded-2xl p-6 ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white"
                      : "backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 shadow-xl"
                  }`}
                >
                  <p className={`text-sm leading-relaxed whitespace-pre-line ${message.role === "assistant" ? "text-slate-700 dark:text-slate-300" : ""}`}>
                    {message.content}
                  </p>
                </div>

                {message.suggestions && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {message.suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSend(suggestion)}
                        className="px-4 py-2 rounded-lg text-xs font-medium bg-violet-500/10 dark:bg-violet-500/20 text-violet-700 dark:text-violet-300 hover:bg-violet-500/20 dark:hover:bg-violet-500/30 transition-colors border border-violet-500/20"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl px-6 py-4">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-violet-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 rounded-full bg-violet-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 rounded-full bg-violet-500 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="p-8 border-t border-slate-200/50 dark:border-slate-800/50 backdrop-blur-xl bg-white/40 dark:bg-slate-950/40">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask me anything about your startup..."
              className="flex-1 px-6 py-4 rounded-xl backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="px-6 py-4 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
