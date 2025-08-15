// يمكنك وضع هذا الكود في ملف جديد مثلاً: PaymentCard.tsx
import { Card } from "@/components/ui/card";
import { Calendar, Package, FileText } from "lucide-react";
import { PaymentTransactionDto } from "@/orval/model";
import { useLocale, useTranslations } from "next-intl";
import { StatusBadge } from "@/components/StatusBadge";

export default function PaymentInfoCard({ payment }: { payment: PaymentTransactionDto }) {
    const locale = useLocale();
    const tBilling = useTranslations('billingPage');

    return (
        <div className="overflow-y-auto px-3">
            {/* بيانات الدفع الأساسية */}
            <span className="font-semibold text-sm text-zinc-400"># {payment.orderCode || payment.subscriptionCode} <StatusBadge text={payment.statusName} /></span>
            <div className="mt-1 mb-4"><span className="font-bold ">{payment.saleType ? tBilling('saleType') : locale === "ar" ? payment.subscriptionSubscriptionBundleNameAr : payment.subscriptionSubscriptionBundleName}</span> </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
                <div><span className="font-semibold">{tBilling('paymentMethod')}:</span> {payment.paymentMethodName} <span className="text-xs text-muted-foreground ms-2">({payment.paymentCode})</span></div>
                <div>
                    <span className="font-semibold">{tBilling('paymentReference')}:</span> {payment.paymentProviderTransactionId}
                </div>
                <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    {payment.paymentDate?.split('T')[0]}
                </div>
                <div className="font-semibold"><span className="font-semibold">{tBilling('amount')}:</span> {payment.amount} {tBilling('currency')}</div>
            </div>

            {/* الملاحظات */}
            {payment.note && (
                <div className="mt-2" >
                    <div className="flex items-center gap-2 mb-2">
                        <FileText className="text-muted-foreground" size={16} />
                        <span className="font-semibold">{tBilling('notes')}</span>
                    </div>
                    <div className="bg-muted/40 p-3 rounded text-sm">{payment.note}</div>
                </div>
            )}

            {/* تفاصيل المنتجات */}
            <div className="mt-4">
                <div className="flex items-center gap-2 mb-3">
                    <Package size={16} />
                    <span className="font-semibold">{tBilling('productsDetails')}</span>
                </div>
                <div className="space-y-2">
                    {payment.orderOrderItems?.map((item) => (
                        <Card key={item.id} className="border rounded-lg p-2 bg-muted/40 gap-0">
                            <div className="flex items-center gap-2 mb-2">
                                <FileText size={18} />
                                <span className="font-bold text-base">{locale === "ar" ? item.productNameAr : item.productName}</span>
                                <span className="text-xs text-muted-foreground ms-2">
                                    ({item.terminalKitSerialNumber})
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div><span className="font-semibold">{tBilling('devicePrice')}:</span> {item.productPrice ?? "-"} {tBilling('currency')}</div>
                                <div><span className="font-semibold">{tBilling('quantity')}:</span> {item.qty ?? "-"}</div>
                                <div><span className="font-semibold">{tBilling('bundle')}:</span> {locale === "ar" ? item.subscriptionBundleBundleNameAr : item.subscriptionBundleBundleName}</div>
                                <div><span className="font-semibold">{tBilling('bundlePrice')}:</span> {item.subscriptionBundlePrice ?? "-"} {tBilling('currency')}</div>
                            </div>
                            <div className="mt-2 font-bold">
                                {tBilling('total')}: {item.totalPrice ?? "-"} {tBilling('currency')}
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}