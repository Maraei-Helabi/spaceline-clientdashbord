"use client";

import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@radix-ui/react-label";
import { useTranslations } from "next-intl";
import { localizedFormat } from "@/lib/date-fns";

type DatePickerProps = {
  label?: string;
  error?: string;
  className?: string;
  value: Date | undefined;
  valueFormat?: string;
  onChange: (date: Date | undefined) => void;
};

export function DatePicker(props: DatePickerProps) {
  const { label, error, className, value, valueFormat } = props;
  const t = useTranslations("common");
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className={className}>
          {label && <Label className="mb-2">{label}</Label>}

          <Button
            variant="outline"
            className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal gap-2"
          >
            <CalendarIcon className="h-4 w-4" />
            {value ? (
              localizedFormat(value, valueFormat ?? "PPP")
            ) : (
              <span>{t("pick_a_date")}</span>
            )}
          </Button>
          {!!error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={value} onSelect={props.onChange} />
      </PopoverContent>
    </Popover>
  );
}
