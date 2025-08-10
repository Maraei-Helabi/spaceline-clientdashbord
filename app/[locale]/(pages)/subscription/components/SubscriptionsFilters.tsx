"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { useTranslations } from "next-intl";

const SubscriptionsFilters = () => {
  const tStatus = useTranslations("allStatus");
  const tSubsection = useTranslations("subscriptionPage");

  return (
    <div className="my-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Filter className="w-5 h-5 me-2" />
            {tSubsection("filterTitle")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2 rtl:space-x-reverse">
            <div className="relative flex-1">
              <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={tSubsection("searchPlaceholder")}
                className="pl-10 rtl:pl-3 rtl:pr-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4">
            <Select
              className="col-span-12 sm:col-span-6"
              placeholder="الحالة"
              options={[
                {
                  name: tStatus("active"),
                  id: "active",
                },
                {
                  name: tStatus("suspended"),
                  id: "suspended",
                },
                {
                  name: tStatus("expired"),
                  id: "expired",
                },
              ]}
              value=""
              onValueChange={() => {}}
              getOptionValue={(option) => option.id}
              getOptionLabel={(option) => option.name}
            />
            <Select
              className="col-span-12 sm:col-span-6"
              placeholder="حالة الجهاز"
              options={[
                {
                  name: tStatus("connected"),
                  id: "connected",
                },
                {
                  name: tStatus("disconnected"),
                  id: "disconnected",
                },
                {
                  name: tStatus("restarting"),
                  id: "restarting",
                },
              ]}
              value=""
              onValueChange={() => {}}
              getOptionValue={(option) => option.id}
              getOptionLabel={(option) => option.name}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { SubscriptionsFilters };
