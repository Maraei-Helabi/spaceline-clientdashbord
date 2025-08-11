import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Calendar, XCircle, Info } from "lucide-react";

type CustomBadgeProps = {
  text: string;
  variant: "success" | "destructive" | "warning" | "info";
};

const iconMap = {
  success: CheckCircle,
  destructive: XCircle,
  warning: Calendar,
  info: Info,
};


export function CustomBadge({ text, variant }: CustomBadgeProps) {
  const Icon = iconMap[variant] ?? Info;
  return (
    <Badge variant={variant}>
      <Icon className="w-3 h-3 mr-1" />
      {text}
    </Badge>
  );
}