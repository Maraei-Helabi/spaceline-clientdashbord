"use client";
import { forwardRef, InputHTMLAttributes, useState } from "react";

import { cn } from "@/lib/utils";
// import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import { Label } from "./label";
import { Eye, EyeOff } from "lucide-react";

export interface PasswordInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, label, error, ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const Icon = showPassword ? Eye : EyeOff;
    return (
      <div className={className}>
        {!!label && (
          <Label
            htmlFor={rest.id || rest.name}
            className="ms-3 block w-fit text-sm font-medium mb-2 text-[#9796A1]"
            aria-label={`${label} label`}
          >
            {label}
          </Label>
        )}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            aria-label={`${label} input`}
            className={cn(
              "flex h-10 w-full rounded-md border focus-visible:placeholder:text-brand-secondary-200/60 border-brand-secondary-50 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-brand-secondary-200 focus-visible:outline-none focus-visible:border-brand disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300",
              error ? "mb-1 border-red-500" : ""
            )}
            ref={ref}
            {...rest}
            id={rest.id || rest.name}
          />

          <Icon
            onClick={() => setShowPassword((prev) => !prev)}
            className="cursor-pointer w-5 h-5 absolute right-3 left-auto rtl:left-3 rtl:right-auto top-[10px] text-brand-secondary-200"
          />
        </div>
        {!!error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
