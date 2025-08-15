"use client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { GetSubscriptoinDetailsResponseContent } from "@/orval/model";
import { localizedFormat } from "@/lib/date-fns";
import {
  Ban,
  CircleCheck,
  CircleX,
  MapPin,
  Package,
  Power,
  X,
} from "lucide-react";
import {
  getSubscriptionsGetStarlinkSubscriptionDetailsQueryKey,
  useSubscriptionsSetPublicIp,
} from "@/orval/subscriptions/subscriptions";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { ChangeSubscriptionAddressDialog } from "./change-subscription-address-dialog";
import { useMemo, useState } from "react";
import { ChangeSubscriptionBundleDialog } from "./change-subscription-bundle-dialog";
import { ChangeSubscriptionNameDialog } from "./change-subscription-name-dialog";
import { CancelSubscriptionDialog } from "./cancel-subscription-dialog";

const statusVariants = {
  0: { variant: "success", text: "active" },
  1: { variant: "destructive", text: "inactive" },
  2: { variant: "warning", text: "suspended" },
} as const;

export const SubscriptionInformation = ({
  subscription,
  subscriptionId,
}: {
  subscription?: GetSubscriptoinDetailsResponseContent;
  subscriptionId: number;
}) => {
  const tCommon = useTranslations("common");
  const tStatus = useTranslations("allStatus");
  const tProfile = useTranslations("profile");
  const tSubscription = useTranslations("subscriptionPage");
  const queryClient = useQueryClient();
  const { mutate: setPublicIp, isPending: isSetPublicIpPending } =
    useSubscriptionsSetPublicIp();

  const [isDialogOpen, setIsDialogOpen] = useState<
    | "changeAddress"
    | "changeBundle"
    | "changeSubscriptionName"
    | "cancelSubscription"
    | null
  >(null);

  const status =
    typeof subscription?.status === "number"
      ? statusVariants[subscription.status as keyof typeof statusVariants]
      : null;

  // Action handlers
  const handleCancel = () => {
    setIsDialogOpen("cancelSubscription");
  };

  const handleChangeSubscriptionName = () => {
    setIsDialogOpen("changeSubscriptionName");
  };

  const handleChangeAddress = () => {
    setIsDialogOpen("changeAddress");
  };

  const handleChangeBundle = () => {
    setIsDialogOpen("changeBundle");
  };

  const handleTogglePublicId = () => {
    setPublicIp(
      {
        data: {
          enablePublicIp:
            !subscription?.subscription?.productAttributes?.hasPublicIpAccess,
          subscriptionId,
        },
      },
      {
        onSuccess(data) {
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

  const details = useMemo(
    () => [
      { label: tCommon("customer"), value: subscription?.displayName ?? "--" },
      {
        label: tSubscription("bundleName"),
        value: subscription?.subscription?.productDescription ?? "--",
      },
      {
        label: tCommon("terminal"),
        value: subscription?.serviceLineNumber ?? "--",
      },
      {
        label: tProfile("startDate"),
        value: subscription?.subscription?.startDate
          ? localizedFormat(
              new Date(subscription.subscription?.startDate),
              "EEEE MMMM, yyyy"
            )
          : "--",
      },
      {
        label: tProfile("endDate"),
        value: subscription?.subscription?.endDate
          ? localizedFormat(
              new Date(subscription.subscription?.endDate),
              "EEEE MMMM, yyyy"
            )
          : "--",
      },
      {
        label: tSubscription("renewalDate"),
        value: subscription?.subscription?.startDate
          ? localizedFormat(
              new Date(subscription?.subscription.startDate),
              "EEEE MMMM, yyyy"
            )
          : "--",
      },
      {
        label: tSubscription("renewalType"),
        value: "--",
      },
      {
        label: tCommon("status"),
        value: !!status ? (
          <Badge variant={status ? status.variant : undefined}>
            {subscription?.status === 0 && <CircleCheck className="w-3 h-3" />}
            {subscription?.status === 1 && <CircleX className="w-3 h-3" />}
            {subscription?.status === 2 && <Ban className="w-3 h-3" />}
            {status?.text ? tStatus(status?.text) : ""}
          </Badge>
        ) : (
          "--"
        ),
      },
      {
        label: tCommon("subscriptionNumber"),
        value: "--",
      },
    ],
    [subscription]
  );

  if (!subscription) {
    return (
      <div className="flex flex-col items-center gap-6 mx-auto mt-8 p-6 rounded-lg border text-card-foreground shadow-sm">
        <p className="text-muted-foreground">{tCommon("no_data_found")}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4">
      {/* Dialogs */}
      <ChangeSubscriptionAddressDialog
        subscriptionId={subscriptionId}
        addressReferenceId={subscription.serviceAddress?.addressReferenceId}
        latitude={subscription.serviceAddress?.geoLocation?.latitude ?? null}
        longitude={subscription.serviceAddress?.geoLocation?.longitude ?? null}
        isOpen={isDialogOpen === "changeAddress"}
        setIsOpen={(val) => setIsDialogOpen(val ? "changeAddress" : null)}
      />

      <ChangeSubscriptionBundleDialog
        isOpen={isDialogOpen === "changeBundle"}
        setIsOpen={(val) => setIsDialogOpen(val ? "changeBundle" : null)}
      />
      <ChangeSubscriptionNameDialog
        subscriptionId={subscriptionId}
        isOpen={isDialogOpen === "changeSubscriptionName"}
        setIsOpen={(val) =>
          setIsDialogOpen(val ? "changeSubscriptionName" : null)
        }
      />
      <CancelSubscriptionDialog
        subscriptionId={subscriptionId}
        isOpen={isDialogOpen === "cancelSubscription"}
        setIsOpen={(val) => setIsDialogOpen(val ? "cancelSubscription" : null)}
      />

      {/* Subscription Information Card */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{tSubscription("actions")}</h3>
          <div className="grid grid-cols-12 gap-4">
            {/* Change subscription name */}
            <Button
              variant="outline"
              onClick={handleChangeSubscriptionName}
              className="col-span-12 sm:col-span-6 lg:col-span-4"
              disabled
            >
              <MapPin className="w-4 h-4 mr-2" />
              {tSubscription("changeSubscriptionName")}
            </Button>

            {/* Change Address */}
            <Button
              variant="outline"
              onClick={handleChangeAddress}
              className="col-span-12 sm:col-span-6 lg:col-span-4"
            >
              <MapPin className="w-4 h-4 mr-2" />
              {tSubscription("changeDeviceAddress")}
            </Button>

            {/* Change Bundle */}
            <Button
              variant="outline"
              onClick={handleChangeBundle}
              className="col-span-12 sm:col-span-6 lg:col-span-4"
              disabled
            >
              <Package className="w-4 h-4 mr-2" />
              {tSubscription("changeSubscriptionBundle")}
            </Button>

            {/* Toggle Public ID */}
            <Button
              variant="outline"
              onClick={handleTogglePublicId}
              className="col-span-12 sm:col-span-6"
              disabled={isSetPublicIpPending}
              loading={isSetPublicIpPending}
            >
              <Power className="w-4 h-4 mr-2" />
              {tSubscription(
                !subscription.subscription?.productAttributes?.hasPublicIpAccess
                  ? "activePublicId"
                  : "inactivePublicId"
              )}
            </Button>

            {/* Cancel Subscription */}
            <Button
              variant="destructive"
              onClick={handleCancel}
              className="col-span-12 lg:col-span-6"
              disabled
            >
              <X className="w-4 h-4 mr-2" />
              {tSubscription("cancelSubscription")}
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="grid grid-cols-12 gap-4">
          {details.map((item, i) => (
            <div key={i} className="col-span-12 sm:col-span-6 lg:col-span-4">
              <p className="font-medium">{item.label}:</p>
              {typeof item.value === "string" ? (
                <p className="text-muted-foreground">{item.value}</p>
              ) : (
                item.value
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
