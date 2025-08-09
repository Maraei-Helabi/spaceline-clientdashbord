import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";

export default async function ProfilePage() {
  const t = await getTranslations("common");
  const user = {
    userName: "saeed_beraia",
    firstName: "Saeed",
    lastName: "Beraia",
    email: "saeed@example.com",
    phone: "+966 555 123 456",
    avatar: undefined,
  };

  return (
    <div className="flex flex-col items-center gap-6 max-w-md mx-auto mt-8 p-6 rounded-lg border text-card-foreground shadow-sm">
      <Avatar className="h-24 w-24">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div className="flex flex-col items-center gap-1">
        <h3 className="text-sm md:text-2xl font-semibold text-center">
          {user.firstName} {user.lastName} ({user.userName})
        </h3>
        <p className="text-sm md:text-base text-muted-foreground">
          {user.email}
        </p>
        <p className="text-sm md:text-base text-muted-foreground">
          {user.phone}
        </p>
      </div>

      <div className="flex gap-2">
        <Button>{t("edit")}</Button>
        <Button variant="outline">{t("changePassword")}</Button>
      </div>
    </div>
  );
}
