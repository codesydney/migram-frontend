import { useRouter } from "next/router";

import { CheckoutPage } from "@Billing/Checkout";
import { FeatureFlag } from "src/components/utils/FeatureFlag";

const CheckoutRoute = () => {
  const router = useRouter();
  const { taskId } = router.query as { taskId: string };

  return <CheckoutPage taskId={taskId} />;
};

export default FeatureFlag(CheckoutRoute, { isPage: true });
