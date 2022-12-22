"use client";
import ButtonStyles from "../../components/styles/ButtonStyles";
import { AddressElement, CardElement } from "@stripe/react-stripe-js";
import styled from "styled-components";
import React from "react";
import { useCreatePaymentIntent } from "./hooks";

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
  const { clientSecret } = useCreatePaymentIntent(taskId);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
