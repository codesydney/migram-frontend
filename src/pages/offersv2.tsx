import { useSession } from "next-auth/react";

import { ViewOffersPage } from "@Tasks/ViewOffers/components/ViewOffersPage";
import { FeatureFlag } from "@Components/utils/FeatureFlag";

function OffersPage() {
  const { status } = useSession();
  return <ViewOffersPage status={status} />;
}

export default FeatureFlag(OffersPage, { isPage: true });
