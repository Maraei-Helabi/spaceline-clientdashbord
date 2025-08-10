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

export default async function PaymentTab() {
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
            {/* Recent Invoices */}
            <Card className="mt-6">
                <CardHeader className="pb-3">
                    <CardTitle className="flex items-center text-lg">
                        <FileText className="w-5 h-5 mr-2" />
                        {tBilling('recentPayments')}
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
