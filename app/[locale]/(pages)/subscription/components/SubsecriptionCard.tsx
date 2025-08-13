"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, Calendar, MapPin, Settings, RefreshCw, KeyRound, XCircle, Repeat, Copy } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
                <Link href={`/subscription/subscriptionDetails/${subscription.id}`} key={subscription.id}>
                    <Card className="mb-2">
                        <CardHeader className="pb-2">
                            <div className="flex justify-self-end mb-4">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="sm">
                                            <Settings className="w-4 h-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56" align="start">
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem>
                                                <XCircle className="w-4 h-4 mr-2 text-destructive" />
                                                إلغاء الاشتراك
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Repeat className="w-4 h-4 mr-2 text-primary" />
                                                تغيير الباقة
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <KeyRound className="w-4 h-4 mr-2" />
                                                Public ID
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
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

                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
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
