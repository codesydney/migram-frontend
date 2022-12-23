"use client";
import ButtonStyles from "../../components/styles/ButtonStyles";
import {
  AddressElement,
  CardElement as CardElementPrimitive,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useCreatePaymentIntent } from "./hooks";
import { StripeCardElement } from "@stripe/stripe-js";
import { CardElement } from "./CardElement";

interface CheckoutFormProps {
  isPageLoading: boolean;
  taskId: string;
}

export const CheckoutForm = ({ isPageLoading, taskId }: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const { clientSecret } = useCreatePaymentIntent(taskId);

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
      console.log(result.error.message);

      if (
        result.error?.type === "card_error" ||
        result.error?.type === "validation_error"
      ) {
        setMessage(result.error?.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
    } else {
      if (result.paymentIntent.status === "succeeded") {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
        alert("Finalized Payment");
      }
    }

    setIsLoading(false);
  };

  return (
    <form method="post" onSubmit={onSubmit} aria-label="Checkout Form">
      <fieldset disabled={disabled}>
        <h2>Billing Details</h2>
        <AddressElement
          options={{ mode: "billing", allowedCountries: ["AU"] }}
        />
        <CardElement />
        <ButtonStyles type="submit" primary disabled={disabled}>
          Checkout
        </ButtonStyles>
      </fieldset>
    </form>
  );
};
