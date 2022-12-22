import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { FeatureFlag } from "../../utils/FeatureFlag";

const AccountRouteV2 = () => {
  const { data: session } = useSession();
  return <AccountPageV2 session={session} />;
};

type AccountPageV2Props = {
  session: Session | null | undefined;
};

export const AccountPageV2 = ({ session }: AccountPageV2Props) => {
  return <div aria-label="Account Page"></div>;
};

export default FeatureFlag(AccountRouteV2, { isPage: true });
