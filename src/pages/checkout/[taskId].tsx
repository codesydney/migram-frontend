"use client";

import { useRouter } from "next/router";

import { FeatureFlag } from "../../utils/FeatureFlag";
import { CheckoutPage } from "../../features/Checkout/CheckoutPage";

export const fetchURL = `${process.env.NEXT_PUBLIC_API_URL}api/v1/tasks/`;

const CheckoutRoute = () => {
  const router = useRouter();
  const { taskId } = router.query as { taskId: string };

  return <CheckoutPage taskId={taskId} />;
};

export default FeatureFlag(CheckoutRoute, { isPage: true });
