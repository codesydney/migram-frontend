import { PropsWithChildren } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK as string);

export const ElementsWrapper = ({ children }: PropsWithChildren<{}>) => (
  <Elements stripe={stripePromise}>{children}</Elements>
);
