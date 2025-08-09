"use client";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod/mini";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useTransition } from "react";

const stepSchema = z.union([z.literal("phone"), z.literal("otp")]);

const schema = z
  .object({
    phone: z.string(),
    step: stepSchema,
    otp: z.string(),
  })
  .check((ctx) => {
    if (ctx.value.step === "phone" && ctx.value.phone.length < 9) {
      ctx.issues.push({
        code: "custom",
        message: "validation.phone_number_at_least",
        input: ctx.value,
        path: ["phone"],
      });
    }

    if (ctx.value.step === "otp" && ctx.value.otp.length < 6) {
      ctx.issues.push({
        code: "custom",
        message: "validation.required",
        input: ctx.value,
        path: ["otp"],
      });
    }
  });

type FormSchema = z.infer<typeof schema>;

const Login = () => {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryStep = searchParams.get("step");

  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors, isValid },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      phone: "",
      otp: "",
      step: stepSchema.safeParse(queryStep).data ?? "phone",
    },
  });

  const step = watch("step");

  const onSubmit = (data: FormSchema) => {
    if (data.step === "phone") {
      const params = new URLSearchParams();
      params.set("step", "otp");
      setValue("step", "otp");
      router.replace(`/login?${params.toString()}`);
      return;
    }

    startTransition(async () => {
      await signIn("credentials", {
        redirect: false,
        otp: data.otp,
      });

      router.push("/");
    });
  };

  return (
    <div className="p-4 rounded-lg border text-card-foreground shadow-sm max-w-[500px] w-full">
      <h2 className="text-lg font-semibold mb-4">{t("common.login")}</h2>

      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        {step === "phone" && (
          <Input
            {...register("phone")}
            label={t("common.phone_number")}
            id="phone"
            name="phone"
            type="string"
            placeholder={t("common.enter_phone_number")}
            error={
              errors.phone?.message
                ? t(errors.phone?.message, { count: 9 })
                : undefined
            }
          />
        )}

        {step === "otp" && (
          <div dir="ltr" className="flex flex-col rtl:items-end">
            <Label className="mb-2">{t("common.otp_code")}</Label>
            <Controller
              name="otp"
              render={({ field }) => (
                <InputOTP {...field} maxLength={6}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              )}
              control={control}
            />
          </div>
        )}

        <Button type="submit" disabled={!isValid || isPending}>
          {step === "phone" ? t("common.login") : t("common.submit")}
        </Button>
      </form>
    </div>
  );
};

export default Login;
