"use client";
import { useCustomersGet } from "@/orval/customers/customers";
import { CompanyProfile } from "./CompanyProfile";
import { PersonalProfile } from "./PersonalProfile";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function ProfilePage() {
  const session = useSession();
  const tCommon = useTranslations("common");

  const { data: customerData, isFetching } = useCustomersGet(
    Number(session.data?.user.CustomerId),
    {
      query: {
        enabled: !!session.data?.user.CustomerId,
      },
    }
  );

  return (
    <div className="flex flex-col items-center gap-6 mx-auto mt-8 p-6 rounded-lg border text-card-foreground shadow-sm">
      {isFetching ? (
        <p className="text-muted-foreground">{tCommon("loading")}</p>
      ) : (
        <>
          {customerData?.customerTypeId === 1 ? (
            <PersonalProfile customer={customerData} />
          ) : (
            <CompanyProfile customer={customerData ?? {}} />
          )}
        </>
      )}
    </div>
  );
}
