import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    DollarSign,
    Download,
    Calendar,
    CreditCard,
    FileText,
    CheckCircle,
    AlertCircle,
    Clock,
    Receipt
} from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function BillingTab() {
    const tStatus = await getTranslations('allStatus');
    const tBilling = await getTranslations('billingPage');

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "paid":
                return (
                    <Badge variant="success">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        مدفوعة
                    </Badge>
                );
            case "pending":
                return (
                    <Badge variant="warning">
                        <Clock className="w-3 h-3 mr-1" />
                        معلقة
                    </Badge>
                );
            case "overdue":
                return (
                    <Badge variant="destructive">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        متأخرة
                    </Badge>
                );
            default:
                return <Badge variant="secondary">غير معروف</Badge>;
        }
    };

    const currentBalance = 85; // USD
    const nextPaymentDate = "15 يناير 2025";
    const monthlyPlan = 99; // USD
    const invoices = [
        {
            id: "INV-001",
            date: "ديسمبر 2024",
            amount: 99,
            status: "paid",
            downloadUrl: "#"
        },
        {
            id: "INV-002",
            date: "نوفمبر 2024",
            amount: 99,
            status: "paid",
            downloadUrl: "#"
        },
        {
            id: "INV-003",
            date: "أكتوبر 2024",
            amount: 99,
            status: "pending",
            downloadUrl: "#"
        },
        {
            id: "INV-004",
            date: "سبتمبر 2024",
            amount: 99,
            status: "overdue",
            downloadUrl: "#"
        }
    ];

    return (
        <>
            {/* Account Balance */}
            <Card className="mt-4">
                <CardHeader className="pb-3">
                    <CardTitle className="flex items-center text-lg">
                        <DollarSign className="w-5 h-5 mr-2" />
                        {tBilling('accountBalance')}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="text-center">
                        <div className="text-4xl font-bold text-primary">${currentBalance}</div>
                        <div className="text-sm text-muted-foreground">{tBilling('currentBalance')}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="text-center">
                            <div className="text-sm text-muted-foreground">{tBilling('monthlyPlan')}</div>
                            <div className="font-semibold">${monthlyPlan}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-sm text-muted-foreground">{tBilling('nextPaymentDate')}</div>
                            <div className="font-semibold">{nextPaymentDate}</div>
                        </div>
                    </div>

                    <Button className="w-full">
                        <CreditCard className="w-4 h-4 mr-2" />
                        {tBilling('addFunds')}
                    </Button>
                </CardContent>
            </Card>

            {/* Recent Invoices */}
            <Card className="mt-6">
                <CardHeader className="pb-3">
                    <CardTitle className="flex items-center text-lg">
                        <FileText className="w-5 h-5 mr-2" />
                        {tBilling('recentInvoices')}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {invoices.map((invoice) => (
                        <div key={invoice.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-medium">{invoice.date}</span>
                                    {getStatusBadge(invoice.status)}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    {invoice.id} • ${invoice.amount}
                                </div>
                            </div>
                            <Button size="sm" variant="ghost">
                                <Download className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                </CardContent>
            </Card>

        </>
    )
}
