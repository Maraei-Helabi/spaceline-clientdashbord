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
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useTransition } from "react";
import { useTokensRequestOtpForCustomer } from "@/orval/tokens/tokens";

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

    if (ctx.value.step === "otp" && ctx.value.otp.length < 4) {
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
  const queryPhone = searchParams.get("phone") ?? "";

  const { mutateAsync, isPending: mutatePending } =
    useTokensRequestOtpForCustomer({
      mutation: {
        meta: {
          preventAuthorizedRedirect: true,
        },
      },
    });

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
      phone: queryPhone,
      otp: "",
      step: queryPhone
        ? stepSchema.safeParse(queryStep).data ?? "phone"
        : "phone",
    },
  });

  const step = watch("step");
  const phoneNumber = watch("phone");

  const onValidateOtp = (phone: string, otp: string) => {
    startTransition(async () => {
      const result = await signIn("credentials", {
        redirect: false,
        otp,
        phone,
      });

      if (!result?.error && result?.ok) {
        router.push("/");
      }
    });
  };

  const onSubmit = async (data: FormSchema) => {
    const params = new URLSearchParams();
    await mutateAsync({ phoneNumber: data.phone });
    params.set("step", "otp");
    params.set("phone", data.phone);
    setValue("step", "otp");
    router.replace(`/login?${params.toString()}`);
    return;
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
          <div dir="ltr" className="flex flex-col items-center">
            <Label className="mb-2">{t("common.otp_code")}</Label>
            <span className="text-xs mb-4 text-stone-400">
              {t("common.otp_subTitle")}
            </span>
            <Controller
              name="otp"
              render={({ field }) => (
                <InputOTP
                  disabled={isPending}
                  {...field}
                  maxLength={6}
                  onChange={(value) => {
                    field.onChange(value);
                    if (value.length === 4) {
                      onValidateOtp(phoneNumber, value);
                    }
                  }}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                </InputOTP>
              )}
              control={control}
            />
          </div>
        )}

        <div className="flex flex-col gap-2">
          {step === "otp" && (
            <>
              <p className="text-sm text-muted-foreground">
                {t("common.phone_number")}: {phoneNumber}
                <Button
                  variant="link"
                  className="px-1.5 text-blue-500"
                  onClick={() => {
                    setValue("step", "phone");
                    setValue("phone", "");
                    router.replace("/login");
                  }}
                >
                  {t("common.changeNumber")}
                </Button>
              </p>
              <Button
                onClick={() => {
                  mutateAsync({ phoneNumber });
                }}
                variant="outline"
                disabled={isPending || mutatePending}
                loading={isPending || mutatePending}
              >
                {t("common.reSend")}
              </Button>
            </>
          )}

          {step !== "otp" && (
            <Button
              type="submit"
              disabled={!isValid || isPending || mutatePending}
              loading={isPending || mutatePending}
            >
              {step === "phone" ? t("common.login") : t("common.submit")}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
