import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { FeatureFlag } from "../../utils/FeatureFlag";
import { ManageBillingButton } from "src/domains/billing/features/Accounts";

type AccountPageV2Props = {
  user: User | undefined;
};

export const AccountPageV2 = ({ user }: AccountPageV2Props) => {
  const customerId = user?.customerId;

  return (
    <div aria-label="Account Page">
      {customerId ? <ManageBillingButton customerId={customerId} /> : null}
    </div>
  );
};

const AccountRouteV2 = () => {
  const { data: session } = useSession();

  return <AccountPageV2 user={session?.user} />;
};

export default FeatureFlag(AccountRouteV2, { isPage: true });
