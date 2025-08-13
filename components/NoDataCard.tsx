"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";

export function NoDataCard() {
  const t = useTranslations("common");
  return (
    <Card className="w-full text-center py-10">
      <CardContent>
        <span className="text-muted-foreground text-lg">{t('no_data_found')}</span>
      </CardContent>
    </Card>
  );
}
