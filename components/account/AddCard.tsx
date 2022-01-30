import { useState } from "react";
import { useSession } from "next-auth/client";
import axios from "axios";
import useForm from "../../lib/useForm";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import BodyStyles from "../styles/BodyStyles";
import FormStyles from "../styles/FormStyles";
import ButtonStyles from "../styles/ButtonStyles";
import { useRouter } from "next/router";

export default function AddCard() {
  const [session]: any = useSession();
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { inputs, handleChange, resetForm }: any = useForm({
    cardName: "",
    cardNumber: "",
    expDate: "",
    cvv: "",
  });

  async function handleSubmit(e: any) {
    e.preventDefault();
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}api/v1/customers/create-setup-intent`,
        inputs,
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        handleStripeSubmit(response.data.client_secret);
        router.push("/account/");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function handleStripeSubmit(client_secret: string) {
    if (!stripe || !elements) {
      return;
    }

    const cardElement: any = elements.getElement(CardElement);

    console.log(client_secret);

    const result: any = await stripe
      .confirmCardSetup(client_secret, {
        payment_method: {
          card: cardElement,
        },
      })
      .then(function (result) {
        // handleUpdateCard(inputs.cardNumber);
        // Handle result.error or result.setupIntent
      });
    console.log(result);
  }

  async function handleUpdateCard(cardNumber: string) {
    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}api/v1/customers/create-setup-intent`,
        {
          customerCreditCard: `....${cardNumber.slice(-5, -1)}`,
        },
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <BodyStyles alternate>
      <div className="primary">
        <h2>Add a Card</h2>
      </div>
      <div className="secondary">
        <h3>Payment Info</h3>
        <FormStyles onSubmit={handleSubmit}>
          {/* <fieldset disabled={false}>
            <input
              placeholder="card name"
              type="text"
              id="cardName"
              name="cardName"
              value={inputs.cardName}
              onChange={handleChange}
            />
            <input
              placeholder="card number"
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={inputs.cardNumber}
              onChange={handleChange}
            />
            <input
              placeholder="expiry date"
              type="text"
              id="name"
              name="expDate"
              value={inputs.expDate}
              onChange={handleChange}
            />
            <input
              placeholder="cvv"
              type="text"
              id="cvv"
              name="cvv"
              value={inputs.cvv}
              onChange={handleChange}
            /> */}
          <CardElement options={{}} />
          <ButtonStyles disabled={false} primary fullWidth>
            Add a Card
          </ButtonStyles>
          {/* </fieldset> */}
        </FormStyles>
      </div>
    </BodyStyles>
  );
}
