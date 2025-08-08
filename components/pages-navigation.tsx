"use client";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { CreditCard, LayoutDashboard, Package, User2 } from "lucide-react";
import { useTranslations } from "next-intl";

const PagesNavigation = () => {
  const currentPath = usePathname();
  const t = useTranslations("navigation");

  const pages = [
    { name: t("dashboard"), path: "/", icon: LayoutDashboard },
    { name: t("subscriptions"), path: "/subscription", icon: Package },
    { name: t("billing"), path: "/billing", icon: CreditCard },
    { name: t("profile"), path: "/profile", icon: User2 },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t flex h-16">
      {pages.map(({ icon: Icon, ...page }) => (
        <Link
          key={page.name}
          className={cn(
            "flex-1 cursor-pointer flex flex-col items-center justify-center p-2 text-xs transition-colors text-muted-foreground hover:text-foreground",
            currentPath === page.path &&
              "text-primary bg-primary/10 cursor-default",
          )}
          href={page.path}
        >
          <Icon className="w-5 h-5 mb-1" />
          {page.name}
        </Link>
      ))}
    </nav>
  );
};

export { PagesNavigation };
