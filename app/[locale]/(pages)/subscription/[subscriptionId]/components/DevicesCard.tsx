import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Router, RefreshCw, KeyRound } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GetSubscriptoinDetailsResponseContent } from "@/orval/model";
import { useTranslations } from "next-intl";
import { StatusBadge } from "@/components/StatusBadge";

const DevicesCard = ({ Devices }: { Devices?: GetSubscriptoinDetailsResponseContent }) => {

    const tSubsection = useTranslations('subscriptionPage');
    const tCommon = useTranslations('common');

    return (
        <>
            {Devices?.userTerminals?.map((Device) => (
                <Card key={Device?.userTerminalId}>
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
                                        <div className="font-semibold">{Device?.locationNickname}</div>
                                        <div className="text-sm text-muted-foreground">{Device?.userTerminalId}</div>
                                    </div>
                                </div>
                                <span><StatusBadge text={(Device?.active) ? "active" : "inactive"} /></span>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-muted-foreground">{tSubsection('kitName')}</p>
                                <p className="font-medium">{Device?.serialNumber}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">{tSubsection('serialNumber')}</p>
                                <p className="font-medium">{Device?.dishSerialNumber}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">{tSubsection('starLinkRunTime')}</p>
                                <p className="font-medium">{Device?.lastConnected?.split("T")[0]}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">{tSubsection('lastDisconnected')}</p>
                                <p className="font-medium">{Device?.lastDisconnected?.split("T")[0]}</p>
                            </div>
                        </div>

                        <Separator />

                        {Device?.routers?.map((router) => (
                            <div key={router?.routerId}>
                                <div className="flex items-center justify-between mb-[25px]">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                            <Router className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <div className="font-semibold">{router?.nickname}</div>
                                            <div className="text-sm text-muted-foreground">{router?.accountNumber}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground">{tSubsection('hardwareVersion')}</p>
                                        <p className="font-medium">{router?.hardwareVersion}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">{tSubsection('routerRunTime')}</p>
                                        <p className="font-medium">{router?.lastConnected?.split("T")[0]}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">{tSubsection('lastDisconnected')}</p>
                                        <p className="font-medium">{router?.lastDisconnected?.split("T")[0]}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">{tSubsection('isBypassed')}</p>
                                        <p className="font-medium">{(router?.isBypassed)?tCommon("yes"):tCommon("no")}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">{tSubsection('rouerConectedToStarlink')}</p>
                                        <p className="font-medium"><StatusBadge text={(router?.directLinkToDish)?"active":"inactive"} /></p>
                                    </div>
                                </div>
                            </div>
                        ))}


                    </CardContent>
                </Card>
            ))}
        </>
    )
}

export { DevicesCard }
