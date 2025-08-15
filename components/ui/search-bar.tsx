import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Input } from "./input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

type SearchBarProps = {
  value?: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
};

const SearchBar = (props: SearchBarProps) => {
  const { value, className, placeholder, disabled } = props;
  const [inputVal, setInputVal] = useState(value ?? "");
  const t = useTranslations("common");

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(event.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (value !== inputVal) props.onChange?.(inputVal);
    }, 1000);

    return () => clearTimeout(timer);
  }, [inputVal]);

  useEffect(() => {
    setInputVal(value || "");
  }, [value]);

  return (
    <div className={cn("relative", className)}>
      <Search className="absolute h-4 w-4 top-[10px] ltr:left-3 rtl:right-3 text-muted-foreground" />

      <Input
        placeholder={placeholder ?? `${t("search")}...`}
        value={inputVal}
        disabled={disabled}
        onChange={onSearchChange}
        inputClassName="px-8"
      />
    </div>
  );
};

export { SearchBar };
