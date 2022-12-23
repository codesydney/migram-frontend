"use client";
import ButtonStyles from "../../components/styles/ButtonStyles";
import {
  AddressElement,
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import styled from "styled-components";
import React, { useState } from "react";
import { useCreatePaymentIntent } from "./hooks";
import { StripeCardElement } from "@stripe/stripe-js";

interface CheckoutFormProps {
  disabled: boolean;
  taskId: string;
}

const CardElementContainer = styled.div`
  margin-top: 12px;

  .cardInput__container {
    margin-bottom: 12px;
    padding: 12px;
    border: 1px solid #e6e6e6;
    border-radius: 5px;
  }

  label {
    margin-bottom: 0.25rem;
    font-size: 0.93rem;
    font-weight: 400;
    font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu,
      Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    color: rgb(48, 49, 61);
  }
`;

export const CheckoutForm = ({ disabled, taskId }: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const { clientSecret } = useCreatePaymentIntent(taskId);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const result = await stripe.confirmCardPayment(clientSecret as string, {
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement,
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

        <CardElementContainer>
          <label>Card details</label>
          <div className="cardInput__container">
            <CardElement id="card-element" options={{ hidePostalCode: true }} />
          </div>
        </CardElementContainer>
        <ButtonStyles type="submit" primary>
          Checkout
        </ButtonStyles>
      </fieldset>
    </form>
  );
};
