"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { useSubscriptionBundlesSearch } from "@/orval/subscription-bundles/subscription-bundles";
import { Search, Filter } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect } from "react";
import { SubscriptionPageFiltersT } from "../page";
import { SearchBar } from "@/components/ui/search-bar";

type SubscriptionsFiltersProps = {
  filters: SubscriptionPageFiltersT;
  handleFilters: (vals: Partial<SubscriptionPageFiltersT>) => void;
};

const SubscriptionsFilters = (props: SubscriptionsFiltersProps) => {
  const { filters } = props;

  const locale = useLocale();
  const tStatus = useTranslations("allStatus");
  const tSubsection = useTranslations("subscriptionPage");

  const subscriptionBundlesSearch = useSubscriptionBundlesSearch();
  const bundlesData = subscriptionBundlesSearch?.data?.data;

  useEffect(() => {
    subscriptionBundlesSearch.mutate({ data: {} });
  }, []);

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
              <SearchBar
                placeholder={tSubsection("searchPlaceholder")}
                className="pl-10 rtl:pl-0 rtl:pr-10"
                value={filters.search}
                onChange={(search) => props.handleFilters({ search })}
              />
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4">
            <Select
              className="col-span-7 sm:col-span-6"
              placeholder={tSubsection("bundleName")}
              options={[
                {
                  id: "all",
                  name: tStatus("all"),
                },
                ...(bundlesData ?? []).map((bundle) => ({
                  id: String(bundle.id),
                  name:
                    locale === "en" ? bundle.bundleName : bundle.bundleNameAr,
                })),
              ]}
              value={filters.subscriptionBundleId}
              onValueChange={(val) =>
                props.handleFilters({
                  subscriptionBundleId: val,
                })
              }
              getOptionValue={(option) => option.id}
              getOptionLabel={(option) => option.name ?? ""}
            />
            <Select
              className="col-span-5 sm:col-span-6"
              placeholder={tSubsection("bundleStatus")}
              options={[
                {
                  name: tStatus("all"),
                  id: "all",
                },
                {
                  name: tStatus("active"),
                  id: "0",
                },
                {
                  name: tStatus("inactive"),
                  id: "1",
                },
                {
                  name: tStatus("suspended"),
                  id: "2",
                },
              ]}
              value={filters.status}
              onValueChange={(val) =>
                props.handleFilters({ status: val })
              }
              getOptionValue={(option) => option.id}
              getOptionLabel={(option) => option.name}
            />
            {/* <Select
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
              value={filters.deviceStatus || ""}
              onValueChange={val => setFilters({ ...filters, deviceStatus: val })}
              getOptionValue={option => option.id}
              getOptionLabel={option => option.name}
            /> */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { SubscriptionsFilters };
