"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useSubscriptionBundlesSearch } from "@/orval/subscription-bundles/subscription-bundles";
import { Search, Filter } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

type Filters = {
  search: string;
  subscriptionBundleId: string;
  status: string;
  // deviceStatus?: string;
};

type SubscriptionsFiltersProps = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};

const SubscriptionsFilters = ({ filters, setFilters }: SubscriptionsFiltersProps) => {
  const tStatus = useTranslations("allStatus");
  const tSubsection = useTranslations("subscriptionPage");
  const locale = useLocale();
  
  const SubscriptionBundlesSearch = useSubscriptionBundlesSearch();
  useEffect(() => {
    SubscriptionBundlesSearch.mutate({ data: {} });
  }, []);

  const BundlesData = SubscriptionBundlesSearch?.data?.data;


  // Local state for search input
  const [searchValue, setSearchValue] = useState(filters.search);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      setFilters(prev => ({ ...prev, search: value }));
    }, 1000);
  };

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
                className="pl-10 rtl:pl-0 rtl:pr-10"
                value={searchValue}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4">
            <Select
              className="col-span-7 sm:col-span-6"
              placeholder={tSubsection("bundleName")}
              options={[
                { id: "null", bundleName: tStatus("all"), bundleNameAr: tStatus("all") },
                ...((BundlesData ?? []).map(Bundle => ({
                  id: String(Bundle.id),
                  bundleName: Bundle.bundleName,
                  bundleNameAr: Bundle.bundleNameAr
                })))
              ]}
              value={filters.subscriptionBundleId || "null"}
              onValueChange={val => setFilters({ ...filters, subscriptionBundleId: val === "null" ? "" : val })}
              getOptionValue={option => option.id}
              getOptionLabel={option => (locale === "en" ? option.bundleName : option.bundleNameAr) || ""}
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
              value={filters.status === "" ? "all" : filters.status}
              onValueChange={val => setFilters({ ...filters, status: val === "all" ? "" : val })}
              getOptionValue={option => option.id}
              getOptionLabel={option => option.name}
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
