import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  getSubscriptionsGetStarlinkSubscriptionDetailsQueryKey,
  useSubscriptionsDeactivate,
} from "@/orval/subscriptions/subscriptions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod/mini";

type CancelSubscriptionDialogProps = {
  isOpen: boolean;
  subscriptionId: number;
  setIsOpen: (isOpen: boolean) => void;
};

const schema = z.object({
  reason: z.string("required").check(z.minLength(1, "required")),
  cancelCycle: z.string("required").check(z.minLength(1, "required")),
  removeDevice: z.boolean(),
});

type FormSchema = z.infer<typeof schema>;

const defaultValues: FormSchema = {
  reason: "",
  cancelCycle: "cancel_immediately",
  removeDevice: false,
};

export const CancelSubscriptionDialog = (
  props: CancelSubscriptionDialogProps
) => {
  const { isOpen, subscriptionId } = props;
  const queryClient = useQueryClient();
  const tSubscription = useTranslations("subscriptionPage");
  const tProfile = useTranslations("profile");
  const tValidation = useTranslations("validation");

  const { mutate: deactivateSubscription, isPending } =
    useSubscriptionsDeactivate();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues,
  });

  const onSubmit = (vals: FormSchema) => {
    deactivateSubscription(
      {
        data: {
          reasonForCancellation: vals.reason,
          endNow: vals.cancelCycle === "cancel_immediately",
          removeUserTerminal: vals.removeDevice,
          subscriptionId,
        },
      },
      {
        onSuccess() {
          props.setIsOpen(false)
          toast.success("Cancellation successful");

          queryClient.invalidateQueries({
            queryKey:
              getSubscriptionsGetStarlinkSubscriptionDetailsQueryKey(
                subscriptionId
              ),
          });
        },
      }
    );
  };

  useEffect(() => {
    if (isOpen) {
      reset(defaultValues);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={props.setIsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>{tSubscription("cancelSubscription")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <Textarea
              label={tSubscription("cancellationReason")}
              {...register("reason")}
              error={
                errors.reason?.message
                  ? tValidation(errors.reason?.message)
                  : undefined
              }
            />
            <Controller
              control={control}
              name="cancelCycle"
              render={({ field }) => (
                <RadioGroup
                  defaultValue={field.value}
                  className="flex flex-col sm:flex-row"
                  onValueChange={field.onChange}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="cancel_immediately"
                      id="cancel_immediately"
                    />
                    <Label htmlFor="cancel_immediately">
                      {tSubscription("cancelImmediately")}
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="end_billing_cycle"
                      id="end_billing_cycle"
                    />
                    <Label htmlFor="end_billing_cycle">
                      {tSubscription("endOfBillingCycle")}
                    </Label>
                  </div>
                </RadioGroup>
              )}
            />
            <Controller
              control={control}
              name="removeDevice"
              render={({ field }) => (
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="remove_user_device"
                    defaultChecked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="remove_user_device">
                    {tSubscription("removeUserDevice")}
                  </Label>
                </div>
              )}
            />
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">{tProfile("cancel")}</Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={!isDirty || isPending}
              loading={isPending}
            >
              {tProfile("saveChanges")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
