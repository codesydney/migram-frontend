"use client";

import { Elements } from "@stripe/react-stripe-js";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import { Card, Layout, Text, TextContainer } from "@shopify/polaris";

import { PageWithNotifications } from "src/components";
import { CheckoutForm } from "./CheckoutForm";
import { useTaskFetch } from "../hooks";

let stripePromise: Promise<Stripe | null>;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK!);
  }
  return stripePromise;
};

/**
 * Returns an error message based on the payment status.
 * @param paymentStatus
 * @returns an error message
 * @error Throws error when a payment status is either "payment_pending" or "payment_due"
 */
export function getErrorMessageFromPaymentStatus(paymentStatus?: string) {
  switch (paymentStatus) {
    case "paid":
      return "Checkout Error: The Task has been paid";
    case "pay_in_processing":
      return "Checkout Error: The payment is currently is being processed";
    case undefined:
      return "Checkout Error: The Task has been not completed yet";
    default:
      throw new Error(
        "A valid paymentStatus was passed into getErrorMessageFromPaymentStatus"
      );
  }
}

export function isPaymentDue(paymentStatus?: string) {
  return (
    paymentStatus === "payment_due" || paymentStatus === "payment_declined"
  );
}

export const CheckoutPage = ({ taskId }: { taskId: string }) => {
  const query = useTaskFetch(taskId);
  const isLoading = query.isLoading;

  if (isLoading) return <div>Loading</div>;

  const task = query.data;

  if (!query.error && !isPaymentDue(task.paymentStatus)) {
    return <div>{getErrorMessageFromPaymentStatus(task.paymentStatus)}</div>;
  }

  return (
    <div aria-label="Checkout Page">
      <PageWithNotifications title="Finalize Payment" fullWidth>
        {!query.error ? (
          <>
            <Layout.Section>
              <Card>
                <Card.Section title="Task Details">
                  <TextContainer>
                    <Text as="p" variant="bodyMd">
                      {task.details}
                    </Text>
                  </TextContainer>
                </Card.Section>
                <Card.Section title="Address">
                  <TextContainer>
                    <Text as="p" variant="bodyMd">
                      {task.location.line1} {task.location.line2}
                      <br />
                      {task.location.city} {task.location.state}{" "}
                      {task.location.postal_code}
                    </Text>
                  </TextContainer>
                </Card.Section>
                <Card.Section title="Amount">
                  <TextContainer>
                    <Text as="p" variant="bodyLg">
                      ${task.budget}
                    </Text>
                  </TextContainer>
                </Card.Section>
              </Card>
            </Layout.Section>
            <Elements stripe={getStripe()}>
              <CheckoutForm isPageLoading={isLoading} taskId={taskId} />
            </Elements>
          </>
        ) : null}
      </PageWithNotifications>
    </div>
  );
};
