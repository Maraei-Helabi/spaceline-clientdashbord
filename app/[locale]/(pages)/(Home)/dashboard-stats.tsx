import { ApiResponseOfCustomerSpecificStatsDto } from "@/orval/model";
import { useTranslations } from "next-intl";

const DashboardStats = ({ stats, isLoading }: { stats: ApiResponseOfCustomerSpecificStatsDto , isLoading: boolean }) => {
  const t = useTranslations("dashboard");

  return (
    <>
    {!isLoading ? (
      <div className="flex gap-4 mt-4">
        <div className="w-full rounded-lg border text-card-foreground shadow-sm p-4 text-center">
          <p className="text-2xl font-bold text-primary">{stats?.data?.activeSubscriptions}</p>
          <h2 className="text-sm text-muted-foreground">{t("activeSubscription")}</h2>
        </div>
        <div className="w-full rounded-lg border text-card-foreground shadow-sm p-4 text-center">
          <p className="text-2xl font-bold text-primary">{stats?.data?.activeTerminals}</p>
          <h2 className="text-sm text-muted-foreground">{t("connectedDevices")}</h2>
        </div>
        <div className="w-full rounded-lg border text-card-foreground shadow-sm p-4 text-center">
          <p className="text-2xl font-bold text-primary">{stats?.data?.inactiveTerminals}</p>
          <h2 className="text-sm text-muted-foreground">{t("disconnectedDevices")}</h2>
        </div>
      </div>
    ) : (
      <div className="flex gap-4 mt-4">
        <div className="w-full rounded-lg border text-card-foreground shadow-sm p-4 text-center animate-pulse">
          <div className="h-8 w-16 bg-muted mx-auto mb-2 rounded" />
          <div className="h-4 w-24 bg-muted mx-auto rounded" />
        </div>
        <div className="w-full rounded-lg border text-card-foreground shadow-sm p-4 text-center animate-pulse">
          <div className="h-8 w-16 bg-muted mx-auto mb-2 rounded" />
          <div className="h-4 w-24 bg-muted mx-auto rounded" />
        </div>
        <div className="w-full rounded-lg border text-card-foreground shadow-sm p-4 text-center animate-pulse">
          <div className="h-8 w-16 bg-muted mx-auto mb-2 rounded" />
          <div className="h-4 w-24 bg-muted mx-auto rounded" />
        </div>
      </div>
    )}
    </>
  );
};

export { DashboardStats };
