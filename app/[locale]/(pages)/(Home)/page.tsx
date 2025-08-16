import { WelcomeSection } from "./welcome-section";
import { DashboardActiveSubscriptions } from "./dashboard-active-subscriptions";
import DashboardStatistics from "./DashboardStatistics";

export default function HomePage() {
  return (
    <div className="p-4">
      <WelcomeSection />
      <DashboardStatistics/>
      <DashboardActiveSubscriptions />
    </div>
  );
}
