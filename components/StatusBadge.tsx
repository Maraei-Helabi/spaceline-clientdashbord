import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Calendar } from "lucide-react";
import { useTranslations } from "next-intl";

interface StatusBadgeProps {
    text?: string | number
}

export function StatusBadge({ text }: StatusBadgeProps) {
    const tStatus = useTranslations("allStatus");
    const normalized = String(text ?? "").toLowerCase();

    if (normalized === "نشط" || normalized === "active" || normalized === "0") {
        return (
            <Badge variant="success">
                <CheckCircle className="w-3 h-3 mr-1" />
                {tStatus("active")}
            </Badge>
        );
    }
    if (normalized === "مدفوع" || normalized === "paid" || normalized === "دمفوعه") {
        return (
            <Badge variant="success">
                <CheckCircle className="w-3 h-3 mr-1" />
                {tStatus("paid")}
            </Badge>
        );
    }
    if (normalized === "معلق" || normalized === "suspended" || normalized === "1") {
        return (
            <Badge variant="destructive">
                <AlertCircle className="w-3 h-3 mr-1" />
                {tStatus("suspended")}
            </Badge>
        );
    }
    if (normalized === "منتهي" || normalized === "expired" || normalized === "2") {
        return (
            <Badge variant="secondary">
                <Calendar className="w-3 h-3 mr-1" />
                {tStatus("expired")}
            </Badge>
        );
    }
    return (
        <Badge variant="secondary">غير معروف</Badge>
    );
}
