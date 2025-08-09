import { WelcomeSection } from "./welcome-section";
import { DashboardStats } from "./dashboard-stats";
import { DashboardActiveSubscriptions } from "./dashboard-active-subscriptions";
import { DashboardSubscriptionAlert } from "./dashboard-subscription-alert";

export default function HomePage() {
  return (
    <div className="p-4">
      <WelcomeSection />
      <DashboardStats />
      <DashboardActiveSubscriptions />
      <DashboardSubscriptionAlert />
    </div>
  );
}
