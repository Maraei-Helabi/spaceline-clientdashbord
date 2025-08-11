"use client";
import { CircleCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLocale, useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { useCustomersGet } from "@/orval/customers/customers";

const statusVariants = {
  0: { variant: "success", text: "active" },
  1: { variant: "destructive", text: "inactive" },
  2: { variant: "warning", text: "suspended" },
} as const;

export const DashboardActiveSubscriptions = () => {
  const t = useTranslations("dashboard");
  const tCommon = useTranslations("common");
  const tStatus = useTranslations("allStatus");
  const locale = useLocale();
  const session = useSession();

  const { data: customerData, isLoading } = useCustomersGet(
    Number(session.data?.user.CustomerId),
    {
      query: {
        enabled: false,
      },
    }
  );

  return (
    <div className="mt-4 p-6 rounded-lg border text-card-foreground shadow-sm">
      <h3 className="font-semibold tracking-tight flex items-center justify-between text-lg">
        {t("activeSubscriptions")}
      </h3>

      {isLoading && (
        <p className="text-muted-foreground">{tCommon("loading")}</p>
      )}

      {!customerData?.subscriptions?.length && !isLoading && (
        <p className="text-muted-foreground">{tCommon("no_data_found")}</p>
      )}

      {!isLoading && !!customerData?.subscriptions?.length && (
        <div className="mt-3 grid grid-cols-12 gap-3">
          {customerData?.subscriptions?.map((subscription, i) => {
            const status =
              typeof subscription.status === "number"
                ? statusVariants[subscription.status]
                : null;

            if (subscription.status !== 0) return null;

            return (
              <div
                key={`${subscription.code}-${i}`}
                className="p-3 border rounded-lg col-span-12 md:col-span-6"
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-sm">
                    {subscription.startlinkServiceLineNumber}
                  </h4>
                  <Badge variant={status ? status.variant : undefined}>
                    {subscription.status === 0 && (
                      <CircleCheck className="w-3 h-3" />
                    )}
                    {/* {subscription.status === 1 && (
                      <CircleX className="w-3 h-3" />
                    )} */}
                    {/* {subscription.status === 2 && <Ban className="w-3 h-3" />} */}
                    {status?.text ? tStatus(status?.text) : ""}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {locale === "en"
                    ? subscription.subscriptionBundleBundleName
                    : subscription.subscriptionBundleBundleNameAr}
                </p>
                <p className="text-xs text-muted-foreground">
                  {subscription.startlinkAddressId}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
