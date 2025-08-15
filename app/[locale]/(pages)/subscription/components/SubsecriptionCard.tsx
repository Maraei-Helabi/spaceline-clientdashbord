"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SubscriptionDto } from "@/orval/model";
import { StatusBadge } from "@/components/StatusBadge";
import { NoDataCard } from "@/components/NoDataCard";

const SubsecriptionCard = ({ subscriptions }: { subscriptions: SubscriptionDto[] }) => {
    const locale = useLocale();
    const tSubsection = useTranslations('subscriptionPage');

    return (
        <>
            {subscriptions.length <= 0 ? 
            <NoDataCard/>
            : subscriptions.map((subscription) => (
                <Link href={`/subscription/${subscription.id}`} key={subscription.id}>
                    <Card className="mb-2">
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center justify-between">
                                <div className="flex gap-2 items-center space-x-3 rtl:space-x-reverse">
                                    <span className="text-lg font-bold">{locale === "en" ? subscription.subscriptionBundleBundleName : subscription.subscriptionBundleBundleNameAr}</span>
                                    <StatusBadge text={subscription.status ?? ""} />
                                </div>
                                {/* <Button variant="outline" size="sm">
                                    <Settings className="w-4 h-4" />
                                </Button> */}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                {/* <div>
                                    <p className="text-sm text-muted-foreground">{tSubsection('bundleName')}</p>
                                    <p className="font-medium">{subscription.bundleName}</p>
                                </div> */}
                                <div>
                                    <p className="text-sm text-muted-foreground">{tSubsection('diveceSerialId')}</p>
                                    <p className="font-medium">{subscription.terminalKitSerialNumber}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">{tSubsection('renewalType')}</p>
                                    <p className="font-medium">{subscription.renewalType}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">{tSubsection('startDate')}</p>
                                    <p className="font-medium">{subscription.startDate ? subscription.startDate.split('T')[0] : '-'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">{tSubsection('renewalDate')}</p>
                                    <p className="font-medium">{subscription.renewalDate ? subscription.renewalDate.split('T')[0] : '-'}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm">{subscription.startlinkAddressId}</span>
                            </div>
                        </CardContent>
                    </Card>
                </Link>

            ))}
        </>
    )
}

export { SubsecriptionCard }
