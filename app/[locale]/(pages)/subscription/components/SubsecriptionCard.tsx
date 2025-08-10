import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, Calendar, MapPin, Settings, RefreshCw, KeyRound, XCircle, Repeat, Copy } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Subscription {
    id: number;
    code: string;
    bundleName: string;
    status: string;
    dataUsed: number;
    dataLimit: number;
    terminalId: string;
    deviceStatus: string;
    renewalDate: string;
    amount: number;
    location: string;
}

interface SubsecriptionCardProps {
    subscriptions: Subscription[];
}
const SubsecriptionCard = async ({ subscriptions }: SubsecriptionCardProps) => {

    const tStatus = await getTranslations('allStatus');
    const tSubsection = await getTranslations('subscriptionPage');


    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Active":
                return <Badge variant="success"><CheckCircle className="w-3 h-3 mr-1" />{tStatus('active')}</Badge>;
            case "Suspended":
                return <Badge variant="destructive"><AlertCircle className="w-3 h-3 mr-1" />{tStatus('suspended')}</Badge>;
            case "Expired":
                return <Badge variant="secondary"><Calendar className="w-3 h-3 mr-1" />{tStatus('expired')}</Badge>;
            default:
                return <Badge variant="secondary">غير معروف</Badge>;
        }
    };

    const getDeviceStatusBadge = (status: string) => {
        switch (status) {
            case "connected":
                return <Badge variant={"success"}><CheckCircle className="w-3 h-3 mr-1" />{tStatus('connected')}</Badge>;
            case "disconnected":
                return <Badge variant="destructive"><AlertCircle className="w-3 h-3 mr-1" />{tStatus('disconnected')}</Badge>;
            case "restarting":
                return <Badge className="bg-warning text-warning-foreground">{tStatus('restarting')}</Badge>;
            default:
                return <Badge variant="secondary">{tStatus('unknown')}</Badge>;
        }
    };

    return (
        <>
            {subscriptions.map((subscription) => (
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
                                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                                    <span className="text-lg font-bold">{subscription.code}</span>
                                    {getStatusBadge(subscription.status)}
                                </div>
                                {/* <Button variant="outline" size="sm">
                                    <Settings className="w-4 h-4" />
                                </Button> */}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">{tSubsection('bundleName')}</p>
                                    <p className="font-medium">{subscription.bundleName}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">{tSubsection('diveceSerialId')}</p>
                                    <p className="font-medium">{subscription.terminalId}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">{tSubsection('dataUsage')}</p>
                                    <p className="font-medium">{subscription.dataUsed}/{subscription.dataLimit} GB</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">{tSubsection('deviceStatus')}</p>
                                    {getDeviceStatusBadge(subscription.deviceStatus)}
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">{tSubsection('renewalDate')}</p>
                                    <p className="font-medium">{subscription.renewalDate}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">{tSubsection('monthlyAmount')}</p>
                                    <p className="font-medium">{subscription.amount} {tSubsection('currency')}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                <MapPin className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm">{subscription.location}</span>
                            </div>
                        </CardContent>
                    </Card>
                </Link>

            ))}
        </>
    )
}

export { SubsecriptionCard }
