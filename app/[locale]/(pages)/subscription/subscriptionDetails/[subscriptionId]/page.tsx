
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { getTranslations } from "next-intl/server";
import { SubsecriptionCard } from "../../components/SubsecriptionCard"
import { DevicesCard } from "./components/DevicesCard"

const subscriptionDetails = async () => {
    const tStatus = await getTranslations('allStatus');
    const tSubsection = await getTranslations('subscriptionPage');

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
        }
    ];

    const Devices = [
        {
            id: 1,
            starlinkName: "Starlink-Home-001",
            routerName: "Router-XR500",
            idStarlink: "SL-123456789",
            kitNumber: "KIT-987654321",
            serialNumber: "SN-1122334455",
            softwareVersionStarlink: "v2.3.1",
            starLinkStatus: "connected",
            starLinkRunTime: "72h 15m",
            starLinkLastUpdated: "2025-08-08T14:35:00Z",
            idRouter: "RT-55667788",
            softwareVersionRouter: "v1.5.4",
            hardwareVersionRouter: "HW-2024",
            clients: 12,
            routerStatus: "connected",
            rouerRunTime: "48h 22m",
            rouerConectedToStarlink: "connected",
            dataUsed: 120.5,
            dataLimit: 200,
            terminalId: "TERM-99887766",
            deviceStatus: "Active",
            renewalDate: "2025-09-01",
            amount: 99.99,
            location: "Sana'a, Yemen"
        }
    ];
    return (
        <div className="flex w-full items-center flex-col gap-6">
            <Tabs className="w-full items-center" defaultValue="details">
                <TabsList>
                    <TabsTrigger value="details">{tSubsection('details')} </TabsTrigger>
                    <TabsTrigger value="devices">{tSubsection('devices')}</TabsTrigger>
                </TabsList>
                <TabsContent className="w-full" value="details">
                    <SubsecriptionCard subscriptions={subscriptions} />
                </TabsContent>
                <TabsContent className="w-full" value="devices">
                    <DevicesCard Devices={Devices} />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default subscriptionDetails;
