"use client";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { queryClient } from "@/providers/react-query-provider";
import { Button } from "./ui/button";
import {  Languages } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function LangToggle() {
  const router = useRouter();
  const currentPathname = usePathname();

  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  const changeLanguage = (lng: string) => {
    document.cookie = `NEXT_LOCALE=${lng};path=/`;
    startTransition(() => {
      router.replace(currentPathname.replace(`/${locale}`, `/${lng}`));
    });
    queryClient.resetQueries();
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="cursor-pointer" variant="outline" size="icon">
          <Languages />
          <span className="sr-only">Toggle Language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuCheckboxItem
          checked={locale === "ar"}
          disabled={locale === "ar" || isPending}
          onClick={() => changeLanguage("ar")}
        >
          العربية
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={locale === "en"}
          disabled={locale === "en" || isPending}
          onClick={() => changeLanguage("en")}
        >
          English
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
