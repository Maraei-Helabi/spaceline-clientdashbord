import { getTranslations } from "next-intl/server";
import { ModeToggle } from "../ModeToggle";
import { LangToggle } from "../lang-toggle";

const AppHeader = async () => {
  const t = await getTranslations('common');
  return (
    <header className="flex justify-center sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex justify-between items-center p-4">
        <h1 className="text-lg font-semibold">{t("starlink_portal")}</h1>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <LangToggle />
        </div>
      </div>
    </header>
  );
};

export { AppHeader };
