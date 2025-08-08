import { cn } from "@/lib/utils";
import { AlertTriangle, Shapes } from "lucide-react";
import { useTranslations } from "next-intl";

const ErrorSection = (props: {
  className?: string;
  isNotFound?: boolean;
  error?: string;
  mainError?: string;
}) => {
  const { className, error, isNotFound = false, mainError } = props;
  const t = useTranslations("common");
  return (
    <div
      className={cn(
        "bg-white w-full rounded-md px-3 py-6 shadow-md",
        className
      )}
    >
      {isNotFound ? (
        <AlertTriangle className="w-14 h-14 mx-auto text-gray-400" />
      ) : (
        <Shapes className="w-14 h-14 mx-auto text-red-600" />
      )}
      <h1 className="text-xl font-semibold text-center my-2">
        {mainError ??
          (isNotFound ? t("error_404_title") : t("error_500_title"))}
      </h1>

      {!error && (
        <p className="text-base font-medium text-slate-600 text-center">
          {isNotFound ? t("error_404_description") : t("error_500_description")}
        </p>
      )}
      {!!error && (
        <code className="text-red-600 bg-red-50 rounded py-1 px-2 block w-fit mt-3 mx-auto">
          {error}
        </code>
      )}
    </div>
  );
};

export { ErrorSection };
