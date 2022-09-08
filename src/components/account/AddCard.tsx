import { useState } from "react";
import { useSession } from "next-auth/client";
import axios from "axios";
import useForm from "../../lib/useForm";
import styled from "styled-components";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import BodyStyles from "../styles/BodyStyles";
import FormStyles from "../styles/FormStyles";
import ButtonStyles from "../styles/ButtonStyles";
import { useRouter } from "next/router";
import ErrorMessage from "../common/ErrorMessage";
import SuccessMessage from "../common/SuccessMessage";
import wait from "../../lib/wait";

const MessageContainerStyle = styled.div`
  margin-top: 1rem;
`;

const CardElementContainerStyle = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

export default function AddCard() {
  const [session]: any = useSession();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { inputs, handleChange, resetForm }: any = useForm({
    cardName: "",
    cardNumber: "",
    expDate: "",
    cvv: "",
  });
  console.log(inputs);
  async function handleSubmit(e: any) {
    e.preventDefault();
    console.log(inputs);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}api/v1/customers/create-setup-intent`,
        inputs,
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );
      console.log(response);
      await handleStripeSubmit(response.data.client_secret);
    } catch (error) {
      console.error(error);
      setShowErrorMessage(true);
      await wait(3000);
      setShowErrorMessage(false);
    }
  }

  async function handleStripeSubmit(client_secret: string) {
    if (!stripe || !elements) {
      return;
    }

    const cardElement: any = elements.getElement(CardElement);
    console.log(CardElement);
    try {
      const result: any = await stripe.confirmCardSetup(client_secret, {
        payment_method: {
          card: cardElement,
        },
      });
      console.log(result);
      if (result.error) throw result.error;
      setShowSuccessMessage(true);
      await wait(3000);
      setShowSuccessMessage(false);
      router.push("/account");
      // handleUpdateCard(inputs.cardNumber);
      // Handle result.error or result.setupIntent
    } catch (error: any) {
      console.error(error);
      setShowErrorMessage(true);
      setErrorMessage(error.message);
      await wait(3000);
      setShowErrorMessage(false);
    }
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
          <CardElementContainerStyle>
            <CardElement options={{}} />
          </CardElementContainerStyle>
          <ButtonStyles disabled={false} primary fullWidth>
            Add a Card
          </ButtonStyles>
          {/* </fieldset> */}
          <MessageContainerStyle>
            {showSuccessMessage && (
              <SuccessMessage message="You have successfully added a card. Redirecting you to the account page." />
            )}
            {showErrorMessage && (
              <ErrorMessage
                message={
                  errorMessage ? errorMessage : "Error in adding a card."
                }
              />
            )}
          </MessageContainerStyle>
        </FormStyles>
      </div>
    </BodyStyles>
  );
}
