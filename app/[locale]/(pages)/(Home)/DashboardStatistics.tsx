"use client";
import { useDashboardGetCustomerStatistics } from "@/orval/dashboard/dashboard";
import { DashboardStats } from "./dashboard-stats";
import { DashboardSubscriptionAlert } from "./dashboard-subscription-alert";
import { useSession } from "next-auth/react";

export default function DashboardStatistics() {
    const session = useSession();
    const {data , isLoading } = useDashboardGetCustomerStatistics(
        Number(session.data?.user.CustomerId)
    )
    return (
        <>
            <DashboardStats stats={data || {}} isLoading={isLoading} />
            <DashboardSubscriptionAlert stats={data || {}} />
        </>
    )
}
