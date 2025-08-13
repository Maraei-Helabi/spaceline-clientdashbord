"use client";
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
    Receipt,
    ArrowBigLeft,
    ChevronLeft
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import PaymentInfoCard from "./PaymentInfoCard";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { usePaymentTransactionsSearch } from "@/orval/payment-transactions/payment-transactions";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { StatusBadge } from "@/components/StatusBadge";
import SkeletonLoader from "./SkeletonLoader";
import { useRouter } from "next/navigation";
export default function PaymentTab() {

    const [open, setOpen] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState<any>(null);

    const tBilling = useTranslations('billingPage');

    const session = useSession();

    const PaymentTransactionsSearch = usePaymentTransactionsSearch();
    const paymentsData = PaymentTransactionsSearch?.data?.data;
    useEffect(() => {
        PaymentTransactionsSearch.mutate({
            data: {
                customerId: Number(session.data?.user.CustomerId),
            }
        });
    }, [])

    return (
        <>
            {/* Recent Invoices */}
            <Card className="mt-6">
                <CardHeader className="pb-3">
                    <CardTitle className="flex items-center text-lg">
                        <CreditCard className="text-primary" />
                        {tBilling('recentPayments')}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {PaymentTransactionsSearch.isPending
                        ? Array.from({ length: 3 }).map((_, i) => <SkeletonLoader key={i} />)
                        : paymentsData?.map((payment) => (
                            <div key={payment.id} className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex-1">
                                    <div className="flex flex-col justify-between mb-1">
                                        <div className="text-sm text-muted-foreground">
                                            # {(payment.orderCode || payment.subscriptionCode) + "  "}
                                            <StatusBadge text={payment.statusName} />
                                        </div>
                                        <span className="font-medium">{payment.saleType}</span>
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        {payment.paymentDate?.split('T')[0]} • <span className="font-bold">${payment.amount}</span>
                                    </div>
                                </div>
                                <Button size="sm" variant="ghost" onClick={() => { setSelectedPayment(payment); setOpen(true); }}>
                                    <ChevronLeft className="w-4 h-4" />
                                </Button>
                            </div>
                        ))}
                </CardContent>
            </Card>

            {/* Dialog for Payment Details */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-xl sm:max-w-2xl overflow-hidden h-auto max-h-[90vh] px-2 pb-2 gap-0">
                    <DialogHeader>
                        <div className="border-b px-3 pb-3" style={{ paddingBottom: "calc(var(--spacing) * 2)" }}>
                            <CardTitle className="flex items-center gap-2 text-lg font-bold">
                                <CreditCard className="text-primary" />
                                {tBilling('paymentsDetails')}
                            </CardTitle>
                        </div>
                    </DialogHeader>
                    {selectedPayment && <PaymentInfoCard payment={selectedPayment} />}
                </DialogContent>
            </Dialog>

        </>
    )
}
