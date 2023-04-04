"use client";

import { PropsWithChildren } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

async function setupStripe() {
  return await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK as string);
}

const stripePromise = setupStripe();

export const ElementsWrapper = ({ children }: PropsWithChildren<{}>) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};
