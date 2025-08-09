import { Wifi } from "lucide-react";
import { getTranslations } from "next-intl/server";

export const WelcomeSection = async () => {
  const t = await getTranslations("dashboard");

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">
          {t("welcome", { name: "Saeed" })}
        </h1>
        <p className="text-muted-foreground">
          {t("starlinkSubscriptionCount", { count: 3 })}
        </p>
      </div>

      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
        <Wifi className="w-6 h-6 text-primary-foreground" />
      </div>
    </div>
  );
};
