import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { SubscriptionBundleDto } from "@/orval/model";
import { useSubscriptionBundlesSearch } from "@/orval/subscription-bundles/subscription-bundles";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";

type ChangeSubscriptionBundleDialogProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const ChangeSubscriptionBundleDialog = (
  props: ChangeSubscriptionBundleDialogProps
) => {
  const { isOpen } = props;
  const locale = useLocale();
  const tSubscription = useTranslations("subscriptionPage");
  const tProfile = useTranslations("profile");
  const tCommon = useTranslations("common");

  const { mutate, data, isPending } = useSubscriptionBundlesSearch();

  const [selectedBundle, setSelectedBundle] = useState<number | null>(null);

  const { currentPlan, bundles } = useMemo(
    () =>
      (data?.data ?? []).reduce<{
        currentPlan: SubscriptionBundleDto | null;
        bundles: SubscriptionBundleDto[];
      }>(
        (result, current, i) => {
          if (i === 0) result.currentPlan = current;
          result.bundles.push(current);
          return result;
        },
        { currentPlan: null, bundles: [] }
      ),
    [data?.data]
  );

  const onSubmit = () => {
    //
  };

  useEffect(() => {
    if (isOpen) {
      mutate({ data: {} });
      setSelectedBundle(null)
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={props.setIsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{tSubscription("changeSubscriptionBundle")}</DialogTitle>
        </DialogHeader>
        {isPending && (
          <div className="flex justify-center">
            <p className="text-muted-foreground">{tCommon("loading")}</p>
          </div>
        )}

        {!isPending && (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold tracking-tight flex items-center justify-between text-lg">
                {tSubscription("yourServicePlan")}
              </h3>
              <div className="mt-2 p-4 border rounded-lg flex items-center justify-between">
                <p className="font-light text-sm">
                  {locale === "en"
                    ? currentPlan?.bundleName
                    : currentPlan?.bundleNameAr}
                </p>

                <p className="font-light text-sm">
                  <span className="font-bold">${currentPlan?.price}</span>/
                  {tCommon("mo")}
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold tracking-tight flex items-center justify-between text-lg">
                {tSubscription("availableServicePlan")}
              </h3>
              <div className="mt-2 space-y-2 overflow-scroll max-h-[200px]">
                {bundles.map((bundle) => (
                  <div
                    key={bundle.id}
                    className={cn(
                      "mt-2 p-4 border rounded-lg flex items-center justify-between hover:bg-accent cursor-pointer transition-colors",
                      selectedBundle === bundle.id && "bg-accent"
                    )}
                    onClick={() => setSelectedBundle(bundle.id ?? null)}
                  >
                    <p className="font-light text-sm">
                      {locale === "en"
                        ? bundle.bundleName
                        : bundle.bundleNameAr}
                    </p>

                    <p className="font-light text-sm">
                      <span className="font-bold">${bundle.price}</span>/
                      {tCommon("mo")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">{tProfile("cancel")}</Button>
          </DialogClose>
          <Button onClick={onSubmit}>{tProfile("saveChanges")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
