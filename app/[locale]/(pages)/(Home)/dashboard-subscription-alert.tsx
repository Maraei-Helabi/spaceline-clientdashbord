import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleAlert } from "lucide-react";
import { getTranslations } from "next-intl/server";

export const DashboardSubscriptionAlert = async () => {
  const t = await getTranslations("alerts");
  return (
    <Alert className="mt-4" variant="warning">
      <CircleAlert />
      <AlertTitle>{t("subscriptionAlert")}</AlertTitle>
      <AlertDescription>
        {t("suspendedSubscriptions", { count: 1 })}
      </AlertDescription>
    </Alert>
  );
};
