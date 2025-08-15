"use client";
import { useCustomersGet } from "@/orval/customers/customers";
import { Wifi } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

export const WelcomeSection = () => {
  const t = useTranslations("dashboard");
  const session = useSession();

  const { data: customerData } = useCustomersGet(
    Number(session.data?.user.CustomerId),
    {
      query: {
        enabled: !!session.data?.user.CustomerId,
      },
    }
  );

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">
          {t("welcome", { name: customerData?.firstName ?? "" })}
        </h1>
        <p className="text-muted-foreground">
          {t("starlinkSubscriptionCount", {
            count: String(customerData?.totalSubscriptions ?? 0),
          })}
        </p>
      </div>

      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
        <Wifi className="w-6 h-6 text-primary-foreground" />
      </div>
    </div>
  );
};
