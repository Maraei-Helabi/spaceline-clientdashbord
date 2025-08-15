import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GoogleMaps } from "@/components/ui/google-maps";
import { Input } from "@/components/ui/input";
import { useStarlinkAddressesUpdate } from "@/orval/starlink-addresses/starlink-addresses";
import { getSubscriptionsGetStarlinkSubscriptionDetailsQueryKey } from "@/orval/subscriptions/subscriptions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod/mini";

type ChangeSubscriptionAddressDialogProps = {
  isOpen: boolean;
  addressReferenceId?: string | null;
  latitude: number | null;
  subscriptionId: number;
  longitude: number | null;
  setIsOpen: (isOpen: boolean) => void;
};

const schema = z.object({
  latitude: z.string("required").check(z.minLength(1, "required")),
  longitude: z.string("required").check(z.minLength(1, "required")),
});

type FormSchema = z.infer<typeof schema>;

export const ChangeSubscriptionAddressDialog = (
  props: ChangeSubscriptionAddressDialogProps
) => {
  const { isOpen, latitude, longitude, subscriptionId, addressReferenceId } =
    props;
  const queryClient = useQueryClient();

  const tSubscription = useTranslations("subscriptionPage");
  const tProfile = useTranslations("profile");
  const tValidation = useTranslations("validation");
  const tCommon = useTranslations("common");

  const { mutate: updateAddress, isPending } = useStarlinkAddressesUpdate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      latitude: (latitude ?? "").toString(),
      longitude: (longitude ?? "").toString(),
    },
  });

  const watchLat = watch("latitude");
  const watchLng = watch("longitude");

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude: lat, longitude: lng } }) => {
          setValue("latitude", String(lat));
          setValue("longitude", String(lng));
        },
        (err) => console.error("Geolocation error:", err)
      );
    } else {
      console.error("Geolocation not supported");
    }
  };

  const onSubmit = (vals: FormSchema) => {
    if (!!addressReferenceId) {
      updateAddress(
        {
          id: addressReferenceId,
          data: {
            latitude: +vals.latitude,
            longitude: +vals.longitude,
            addressReferenceId: addressReferenceId ?? undefined,
          },
        },
        {
          onSuccess() {
            props.setIsOpen(false);
            toast.success(tCommon("updatedSuccessful"));
            queryClient.invalidateQueries({
              queryKey:
                getSubscriptionsGetStarlinkSubscriptionDetailsQueryKey(
                  subscriptionId
                ),
            });
          },
        }
      );
    }
  };

  useEffect(() => {
    if (isOpen) {
      reset({
        latitude: (latitude ?? "").toString(),
      longitude: (longitude ?? "").toString(),
      })
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={props.setIsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{tSubscription("changeDeviceAddress")}</DialogTitle>
        </DialogHeader>
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="flex gap-4">
              <Input
                className="w-full"
                label={tSubscription("latitude")}
                {...register("latitude")}
                onChange={(e) => {
                  const numeric = e.target.value.replace(/[^0-9.]/g, "");
                  setValue("latitude", numeric);
                }}
                error={
                  errors.latitude?.message
                    ? tValidation(errors.latitude?.message)
                    : undefined
                }
              />
              <Input
                className="w-full"
                label={tSubscription("longitude")}
                {...register("longitude")}
                onChange={(e) => {
                  const numeric = e.target.value.replace(/[^0-9.]/g, "");
                  setValue("longitude", numeric);
                }}
                error={
                  errors.longitude?.message
                    ? tValidation(errors.longitude?.message)
                    : undefined
                }
              />
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={getCurrentLocation}
            >
              {tSubscription("currentLocation")}
            </Button>
            <GoogleMaps
              lat={+watchLat}
              lng={+watchLng}
              onChange={(lat, lng) => {
                setValue("latitude", String(lat));
                setValue("longitude", String(lng));
              }}
            />
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">{tProfile("cancel")}</Button>
            </DialogClose>
            <Button type="submit" disabled={isPending} loading={isPending}>{tProfile("saveChanges")}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
