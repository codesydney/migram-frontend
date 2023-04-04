"use client";

import React, { useState } from "react";
import {
  AddressElement,
  CardElement as CardElementPrimitive,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { v4 as uuid } from "uuid";

import { Button, Card, Form, FormLayout, Layout } from "@shopify/polaris";
import styled from "styled-components";

import { CardElement } from "./CardElement";
import { useNotifications } from "src/common/features/notifications";
import { routerPush } from "@Utils/router";
import { useCreatePaymentIntent } from "../hooks";
import { createNotification } from "src/common/features/notifications/utils";

interface CheckoutFormProps {
  isPageLoading: boolean;
  taskId: string;
}

const StyledStripeForm = styled.div`
  padding: 1rem;

  @media (min-width: 490px) {
    padding: 20px;
  }
`;

export const CheckoutForm = ({ isPageLoading, taskId }: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(true);
  const { clientSecret } = useCreatePaymentIntent(taskId, setIsLoading);
  const { dispatchNotifications } = useNotifications();
  const isStripeLoading = !stripe ? true : false;

  const disabled = isPageLoading || isLoading;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const result = await stripe.confirmCardPayment(clientSecret as string, {
      payment_method: {
        card: elements.getElement(CardElementPrimitive) as StripeCardElement,
      },
    });

    if (result.error) {
      let errorMessage = result.error.message
        ? result.error.message
        : "An unexpected error occurred.";

      dispatchNotifications({
        type: "set",
        event: createNotification({
          isError: true,
          title: "Payment successful",
          type: "notification",
          status: "success",
          source: "Checkout Event",
        }),
      });
    } else if (result.paymentIntent.status === "succeeded") {
      dispatchNotifications({
        type: "set",
        event: createNotification({
          isError: false,
          title: "Payment successful",
          type: "notification",
          status: "success",
          source: "Checkout Event",
        }),
      });

      setTimeout(() => routerPush("/"), 2000);
    }

    setIsLoading(false);
  };

  return (
    <Layout.Section fullWidth>
      <Card title="Payment Details">
        <Form onSubmit={onSubmit}>
          <FormLayout>
            <StyledStripeForm aria-label="Stripe Checkout">
              <AddressElement
                options={{ mode: "billing", allowedCountries: ["AU"] }}
              />
              <CardElement />
              {isStripeLoading ? null : (
                <Button primary submit disabled={disabled}>
                  Submit
                </Button>
              )}
            </StyledStripeForm>
          </FormLayout>
        </Form>
      </Card>
    </Layout.Section>
  );
};
