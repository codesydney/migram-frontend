import { useRouter } from "next/router";

import { FeatureFlag } from "../../utils/FeatureFlag";
import { CheckoutPage } from "../../features/Checkout";

const CheckoutRoute = () => {
  const router = useRouter();
  const { taskId } = router.query as { taskId: string };

  return <CheckoutPage taskId={taskId} />;
};

export default FeatureFlag(CheckoutRoute, { isPage: true });
