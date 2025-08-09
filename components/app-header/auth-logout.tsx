"use client";

import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { useTransition } from "react";
import { useRouter } from "@/i18n/navigation";

export const AuthLogout = () => {
  const t = useTranslations("common");
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleLogout = async () => {
    startTransition(async () => {
      await signOut({
        redirect: false,
      });
      router.push("/login");
    });
  };

  return (
    <Button variant="outline" disabled={isPending} onClick={handleLogout}>
      {t("logout")}
    </Button>
  );
};
