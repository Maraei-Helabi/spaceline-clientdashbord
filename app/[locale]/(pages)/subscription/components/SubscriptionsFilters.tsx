import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { getTranslations } from "next-intl/server";

const SubscriptionsFilters = async () => {

    const tStatus = await getTranslations('allStatus');
    const tSubsection = await getTranslations('subscriptionPage');

    return (
        <div className="my-4">
                    <Card >
            <CardHeader>
                <CardTitle className="flex items-center text-lg">
                    <Filter className="w-5 h-5 me-2" />
                    {tSubsection('filterTitle')}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex space-x-2 rtl:space-x-reverse">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder={tSubsection('searchPlaceholder')}
                            className="pl-10 rtl:pl-3 rtl:pr-10"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="الحالة" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="active">{tStatus('active')}</SelectItem>
                            <SelectItem value="suspended">{tStatus('suspended')}</SelectItem>
                            <SelectItem value="expired">{tStatus('expired')}</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="حالة الجهاز" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="connected">{tStatus('connected')}</SelectItem>
                            <SelectItem value="disconnected">{tStatus('disconnected')}</SelectItem>
                            <SelectItem value="restarting">{tStatus('restarting')}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>
        </div>
    );
}

export { SubscriptionsFilters };
