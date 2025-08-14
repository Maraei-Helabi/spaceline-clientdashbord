"use client";
import { useState, useEffect } from "react";
import { SubscriptionsFilters } from "./components/SubscriptionsFilters";
import { useSubscriptionsSearch } from "@/orval/subscriptions/subscriptions";
import { SkeletonSubCard } from "./components/SkeletonSubCard";
import { SubsecriptionCard } from "./components/SubsecriptionCard";

export type SubscriptionPageFiltersT = {
  search: string;
  subscriptionBundleId: string;
  status: string;
};

export default function SubscriptionPage() {
  const [filters, setFilters] = useState<SubscriptionPageFiltersT>({
    search: "",
    subscriptionBundleId: "all",
    status: "all",
    // deviceStatus: "",
  });

  const subscriptionsSearch = useSubscriptionsSearch();

  const subscriptionsData = subscriptionsSearch?.data?.data;

  const getSubscription = (newFilters?: Partial<SubscriptionPageFiltersT>) => {
    const params = {
      ...filters,
      ...newFilters,
    };

    subscriptionsSearch.mutate({
      data: {
        search: params.search || '',
        subscriptionBundleId: params.subscriptionBundleId === 'all' ? Number(params.subscriptionBundleId): null,
        status: params.subscriptionBundleId === 'all' ? Number(params.status): null,
        // deviceStatus: filters.deviceStatus,
      },
    });
  };

  const handleFilters = (newFilters: Partial<SubscriptionPageFiltersT>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    getSubscription(newFilters)
  };

  useEffect(() => {
    getSubscription()
  }, []);

  return (
    <>
      <SubscriptionsFilters filters={filters} handleFilters={handleFilters} />

      {subscriptionsSearch.isPending ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonSubCard key={i} />
          ))}
        </div>
      ) : (
        <SubsecriptionCard subscriptions={subscriptionsData || []} />
      )}
    </>
  );
}
