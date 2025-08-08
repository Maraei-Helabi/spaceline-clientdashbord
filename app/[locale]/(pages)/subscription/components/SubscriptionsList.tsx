import { SubsecriptionCard } from "./SubsecriptionCard";

const SubscriptionsList = async() => {

    const subscriptions = [
        {
            id: 1,
            code: "SLY001",
            bundleName: "الباقة الأساسية",
            status: "Active",
            dataUsed: 75,
            dataLimit: 100,
            terminalId: "TRM001",
            deviceStatus: "connected",
            renewalDate: "2025-01-15",
            amount: 150,
            location: "صنعاء، اليمن"
        },
        {
            id: 2,
            code: "SLY002",
            bundleName: "الباقة المتقدمة",
            status: "Active",
            dataUsed: 45,
            dataLimit: 200,
            terminalId: "TRM002",
            deviceStatus: "connected",
            renewalDate: "2025-01-20",
            amount: 280,
            location: "عدن، اليمن"
        },
        {
            id: 3,
            code: "SLY003",
            bundleName: "الباقة العائلية",
            status: "Suspended",
            dataUsed: 0,
            dataLimit: 500,
            terminalId: "TRM003",
            deviceStatus: "disconnected",
            renewalDate: "2025-01-10",
            amount: 450,
            location: "تعز، اليمن"
        }
    ];

    return (
        <div className="space-y-4">
            <SubsecriptionCard subscriptions={subscriptions} />
        </div>
    );
}

export { SubscriptionsList };
