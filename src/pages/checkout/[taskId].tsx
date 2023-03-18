"use client";

import { useRouter } from "next/router";

import { CheckoutPage } from "@Billing/Checkout";

const CheckoutRoute = () => {
  const router = useRouter();
  const { taskId } = router.query as { taskId: string | undefined };

  if (taskId === undefined) {
    return <></>;
  }

  return <CheckoutPage taskId={taskId} />;
};

export default CheckoutRoute;
