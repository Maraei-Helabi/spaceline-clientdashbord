"use client";
import { useState, useEffect } from "react";
import { SubscriptionsFilters } from "./components/SubscriptionsFilters";
import { useSubscriptionsSearch } from "@/orval/subscriptions/subscriptions";
import { SkeletonSubCard } from "./components/SkeletonSubCard";
import { SubsecriptionCard } from "./components/SubsecriptionCard";

export default function SubscriptionPage() {

  const [filters, setFilters] = useState({
    search: "",
    subscriptionBundleId: "",
    status: "",
    // deviceStatus: "",
  });

  const subscriptionsSearch = useSubscriptionsSearch();
  const subscriptionsDate = subscriptionsSearch?.data?.data;
  // تشغيل البحث تلقائيًا عند تغيير الفلاتر
  useEffect(() => {
    subscriptionsSearch.mutate({
      data: {
        search: filters.search !== "" ? filters.search : null,
        subscriptionBundleId: filters.subscriptionBundleId !== "" ? Number(filters.subscriptionBundleId) : null,
        status: filters.status !== "" ? Number(filters.status) : null,
        // deviceStatus: filters.deviceStatus,
      },
    });
  }, [filters]);

  return (
    <>
      <SubscriptionsFilters filters={filters} setFilters={setFilters} />

      {
        subscriptionsSearch.isPending ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonSubCard key={i} />
            ))}
          </div>
        ) : (
          <SubsecriptionCard subscriptions={subscriptionsDate || []} />
        )
      }
    </>
  );
}

