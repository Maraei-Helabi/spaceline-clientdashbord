import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ApiResponseOfCustomerSpecificStatsDto } from "@/orval/model";
import { CircleAlert } from "lucide-react";
import { useTranslations } from "next-intl";

export const DashboardSubscriptionAlert =  ({stats}:{stats: ApiResponseOfCustomerSpecificStatsDto}) => {
  const t = useTranslations("alerts");
  return (
    <>
    {Number(stats?.data?.totalPaymentTransactions) > 0? (
      <Alert className="mt-4" variant="destructive">
          <CircleAlert />
          <AlertTitle>{t("paymentAlert")}</AlertTitle>
          <AlertDescription>
            {t("paymentTransactions", { count: String(stats?.data?.totalPaymentTransactions) })}
          </AlertDescription>
        </Alert>
      ) : null
    }
    {Number(stats?.data?.suspendedSubscriptions) > 0? (
      <Alert className="mt-4" variant="warning">
          <CircleAlert />
          <AlertTitle>{t("subscriptionAlert")}</AlertTitle>
          <AlertDescription>
            {t("suspendedSubscriptions", { count: String(stats?.data?.suspendedSubscriptions) })}
          </AlertDescription>
        </Alert>
      ) : null
    }
    </>
  );
};
