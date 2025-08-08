import { getTranslations } from "next-intl/server";

const DashboardStats = async () => {
  const t = await getTranslations("dashboard");

  const stats = [
    { label: t("connectedDevices"), value: 3 },
    { label: t("activeSubscription"), value: 2 },
  ];

  return (
    <div className="flex gap-4 mt-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="w-full rounded-lg border text-card-foreground shadow-sm p-4 text-center"
        >
          <p className="text-2xl font-bold text-primary">{stat.value}</p>
          <h2 className="text-sm text-muted-foreground">{stat.label}</h2>
        </div>
      ))}
    </div>
  );
};

export { DashboardStats };
