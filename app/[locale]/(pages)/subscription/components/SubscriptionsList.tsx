import { SubsecriptionCard } from "./SubsecriptionCard";
import { SubscriptionDto } from "@/orval/model";

const SubscriptionsList = ({subscriptions}:{subscriptions: SubscriptionDto[]}) => {


    return (
        <div className="space-y-4">
            <SubsecriptionCard subscriptions={subscriptions} />
        </div>
    );
}

export { SubscriptionsList };
