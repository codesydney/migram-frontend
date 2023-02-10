import { useSession } from "next-auth/react";

import { ViewOffersPage } from "@Tasks/ViewOffers/components/ViewOffersPage";

export default function OffersPage() {
  const { status } = useSession();
  return <ViewOffersPage status={status} />;
}
