
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { getTranslations } from "next-intl/server";
import BillingTab from "./BillingTab";
import PaymentTab from "./PaymentTab";


const BillingTabs = async () => {

    const tBilling = await getTranslations('billingPage');




    return (
        <div className="flex w-full items-center flex-col gap-6">
            <Tabs className="w-full items-center" defaultValue="billing">
                <TabsList>
                    <TabsTrigger value="billing">{tBilling('billing')} </TabsTrigger>
                    <TabsTrigger value="payments">{tBilling('payments')}</TabsTrigger>
                </TabsList>
                <TabsContent className="w-full" value="billing">
                    <BillingTab />
                </TabsContent>
                <TabsContent className="w-full" value="payments">
                    <PaymentTab/>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default BillingTabs;
