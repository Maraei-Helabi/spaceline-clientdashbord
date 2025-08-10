import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, Calendar, MapPin, Settings, Router, RefreshCw, KeyRound } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Separator } from "@/components/ui/separator";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Device {
    id: number;
    starlinkName: string;
    routerName: string;
    idStarlink: string;
    kitNumber: string;
    serialNumber: string;
    softwareVersionStarlink: string;
    starLinkStatus: string;
    starLinkRunTime: string;
    starLinkLastUpdated: string;
    idRouter: string;
    softwareVersionRouter: string;
    hardwareVersionRouter: string;
    clients: number;
    routerStatus: string;
    rouerRunTime: string;
    rouerConectedToStarlink: string;

    dataUsed: number;
    dataLimit: number;
    terminalId: string;
    deviceStatus: string;
    renewalDate: string;
    amount: number;
    location: string;
}

interface DevicesCardProps {
    Devices: Device[];
}
const DevicesCard = async ({ Devices }: DevicesCardProps) => {

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
                return <Badge variant="success"><CheckCircle className="w-3 h-3 mr-1" />{tStatus('connected')}</Badge>;
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
            {Devices.map((Device) => (
                <Card key={Device.id}>
                    <CardHeader className="pb-3">
                        <CardTitle className="">
                            <div className="flex justify-self-end mb-4">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="sm">
                                            <Settings className="w-4 h-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56" align="start">
                                        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem>
                                                <KeyRound className="w-4 h-4 mr-2" />
                                                تغيير كلمة مرور المودم
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <RefreshCw className="w-4 h-4 mr-2" />
                                                إعادة تشغيل ستارلينك
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <RefreshCw className="w-4 h-4 mr-2" />
                                                إعادة تشغيل المودم
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <Router className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <div className="font-semibold">{Device.starlinkName}</div>
                                        <div className="text-sm text-muted-foreground">{Device.idStarlink}</div>
                                    </div>
                                </div>
                                <span>{getDeviceStatusBadge(Device.starLinkStatus)}</span>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-muted-foreground">{tSubsection('kitName')}</p>
                                <p className="font-medium">{Device.kitNumber}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">{tSubsection('serialNumber')}</p>
                                <p className="font-medium">{Device.serialNumber}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">{tSubsection('softwareVersion')}</p>
                                <p className="font-medium">{Device.softwareVersionStarlink}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">{tSubsection('starLinkRunTime')}</p>
                                <p className="font-medium">{Device.starLinkRunTime}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">{tSubsection('lastUpdated')}</p>
                                <p className="font-medium">{Device.starLinkLastUpdated}</p>
                            </div>
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                    <Router className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <div className="font-semibold">{Device.routerName}</div>
                                    <div className="text-sm text-muted-foreground">{Device.idRouter}</div>
                                </div>
                            </div>
                            <span>{getDeviceStatusBadge(Device.routerStatus)}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-muted-foreground">{tSubsection('hardwareVersion')}</p>
                                <p className="font-medium">{Device.hardwareVersionRouter}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">{tSubsection('softwareVersion')}</p>
                                <p className="font-medium">{Device.softwareVersionRouter}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">{tSubsection('clients')}</p>
                                <p className="font-medium">{Device.clients}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">{tSubsection('routerRunTime')}</p>
                                <p className="font-medium">{Device.rouerRunTime}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">{tSubsection('rouerConectedToStarlink')}</p>
                                <p className="font-medium">{getDeviceStatusBadge(Device.rouerConectedToStarlink)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">{tSubsection('dataUsed')}</p>
                                <p className="font-medium">{Device.dataUsed}</p>
                            </div>
                        </div>

                    </CardContent>
                </Card>
            ))}
        </>
    )
}

export { DevicesCard }
