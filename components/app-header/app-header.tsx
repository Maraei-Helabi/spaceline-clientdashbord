import { getTranslations } from "next-intl/server";
import { ModeToggle } from "../ModeToggle";
import { LangToggle } from "../lang-toggle";
import { AuthLogout } from "./auth-logout";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Image from "next/image";

const AppHeader = async () => {
  const t = await getTranslations("common");
  const session = await getServerSession(authOptions);

  return (
    <header className="flex justify-center sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex justify-between items-center p-4">
        {/* <h1 className="text-lg font-semibold">{t("starlink_portal")}</h1> */}
        <Image
          src={ "/app-logo.png"}
          alt="app-logo"
          width={100}
          height={100}
          className="h-10 w-fit dark:brightness-0 dark:invert"
          priority
        />

        <div className="flex items-center gap-2">
          <ModeToggle />
          <LangToggle />
          {!!session?.user && <AuthLogout />}
        </div>
      </div>
    </header>
  );
};

export { AppHeader };
