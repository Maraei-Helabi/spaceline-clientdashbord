import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  getSubscriptionsGetStarlinkSubscriptionDetailsQueryKey,
  useSubscriptionsUpdateNickname,
} from "@/orval/subscriptions/subscriptions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod/mini";

type ChangeSubscriptionNameDialogProps = {
  isOpen: boolean;
  subscriptionId: number;
  setIsOpen: (isOpen: boolean) => void;
};

const schema = z.object({
  nickName: z.string("required").check(z.minLength(1, "required")),
});

type FormSchema = z.infer<typeof schema>;

export const ChangeSubscriptionNameDialog = (
  props: ChangeSubscriptionNameDialogProps
) => {
  const { isOpen, subscriptionId } = props;

  const queryClient = useQueryClient();
  const tSubscription = useTranslations("subscriptionPage");
  const tProfile = useTranslations("profile");
  const tValidation = useTranslations("validation");

  const { mutate: updateNickname, isPending } =
    useSubscriptionsUpdateNickname();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      nickName: "",
    },
  });

  const onSubmit = (vals: FormSchema) => {
    updateNickname(
      {
        data: {
          newNickname: vals.nickName,
          subscriptionId,
        },
      },
      {
        onSuccess(data) {
          props.setIsOpen(false);
          if (data.message) {
            toast.success(data.message);
          }

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
      reset({
        nickName: "",
      });
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={props.setIsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>{tSubscription("changeSubscriptionName")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <Input
              className="w-full"
              label={tSubscription("subscriptionName")}
              {...register("nickName")}
              error={
                errors.nickName?.message
                  ? tValidation(errors.nickName.message)
                  : undefined
              }
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
