import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./components/RootLayout";
import { Dashboard } from "./pages/Dashboard";
import { FounderCopilot } from "./pages/FounderCopilot";
import { AIAgents } from "./pages/AIAgents";
import { IntelligenceCenter } from "./pages/IntelligenceCenter";
import { RiskEngine } from "./pages/RiskEngine";
import { ScenarioSimulator } from "./pages/ScenarioSimulator";
import { InvestorHub } from "./pages/InvestorHub";
import { CompetitorIntelligence } from "./pages/CompetitorIntelligence";
import { AIBoardRoom } from "./pages/AIBoardRoom";
import { Settings } from "./pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "copilot", Component: FounderCopilot },
      { path: "agents", Component: AIAgents },
      { path: "intelligence", Component: IntelligenceCenter },
      { path: "risk", Component: RiskEngine },
      { path: "simulator", Component: ScenarioSimulator },
      { path: "investor", Component: InvestorHub },
      { path: "competitor", Component: CompetitorIntelligence },
      { path: "boardroom", Component: AIBoardRoom },
      { path: "settings", Component: Settings },
    ],
  },
]);
