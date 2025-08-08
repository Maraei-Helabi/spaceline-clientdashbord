import { getTranslations } from "next-intl/server";
import { CircleCheck, CircleX } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const DashboardActiveSubscriptions = async () => {
  const t = await getTranslations("dashboard");

  const activeSubscriptions = [
    {
      name: "SLY001",
      packageName: "Starlink Basic",
      address: "123 Main St",
      status: "Active",
    },
    {
      name: "SLY002",
      packageName: "Starlink Premium",
      address: "456 Elm St",
      status: "Inactive",
    },
    {
      name: "SLY003",
      packageName: "Starlink Pro",
      address: "789 Oak St",
      status: "Active",
    },
  ];

  return (
    <div className="mt-4 p-6 rounded-lg border text-card-foreground shadow-sm">
      <h3 className="font-semibold tracking-tight flex items-center justify-between text-lg">
        {t("activeSubscriptions")}
      </h3>

      <div className="mt-3 grid grid-cols-12 gap-3">
        {activeSubscriptions.map((subscription, i) => (
          <div
            key={`${subscription.name}-${i}`}
            className="p-3 border rounded-lg col-span-12 md:col-span-6"
          >
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-sm">{subscription.name}</h4>
              <Badge
                variant={
                  subscription.status === "Active" ? "success" : "destructive"
                }
              >
                {subscription.status === "Active" ? (
                  <CircleCheck className="w-3 h-3" />
                ) : (
                  <CircleX className="w-3 h-3" />
                )}
                {subscription.status}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              {subscription.packageName}
            </p>
            <p className="text-xs text-muted-foreground">
              {subscription.address}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
