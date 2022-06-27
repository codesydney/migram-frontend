import { useState } from "react";
import { useSession } from "next-auth/client";
import axios from "axios";
import styled from "styled-components";
import useForm from "../../lib/useForm";
import wait from "../../lib/wait";
import BodyStyles from "../styles/BodyStyles";
import FormStyles from "../styles/FormStyles";
import ButtonStyles from "../styles/ButtonStyles";
import { useRouter } from "next/router";
import ErrorMessage from "../common/ErrorMessage";
import SuccessMessage from "../common/SuccessMessage";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const MessageContainerStyle = styled.div`
  margin-top: 1rem;
`;

export default function CustomerOnboard() {
  const [session]: any = useSession();
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const { inputs, handleChange, resetForm }: any = useForm({
    name: "",
    email: "",
    phone: "",
    description: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    country: "",
    postcode: "",
  });

  async function handleStripeSubmit(client_secret: string) {
    if (!stripe || !elements) {
      return;
    }

    const cardElement: any = elements.getElement(CardElement);

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
  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}api/v1/customers/`,
        {
          name: inputs.name,
          email: inputs.email,
          phone: inputs.phone,
          description: inputs.description,
          shipping: {
            name: inputs.name,
            address: {
              line1: inputs.address1,
              line2: inputs.address2,
              city: inputs.city,
              state: inputs.state,
              country: inputs.country,
              postal_code: inputs.postcode,
            },
          },
        },
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );
      console.log(response);
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}api/v1/customers/create-setup-intent`,
          {
            cardName: "DUMMY CARD",
            cardNumber: "4242424242424242",
            expData: "04/24",
            cvv: "242",
          },
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
      setLoading(false);
      setShowSuccessMessage(true);
      await wait(3000);
      setShowSuccessMessage(false);
      router.push("/account");
      await axios.get("/api/auth/session?update", { withCredentials: true });
      window.location.reload();
    } catch (error) {
      console.log(error);
      setShowErrorMessage(true);
      setLoading(false);
      await wait(3000);
      setShowErrorMessage(false);
    }
  }

  return (
    <BodyStyles alternate>
      <div className="primary">
        <h2>Become a Customer</h2>
      </div>
      <div className="secondary">
        <h3>Customer Info</h3>
        <FormStyles onSubmit={handleSubmit}>
          <fieldset disabled={loading}>
            <input
              placeholder="name"
              type="text"
              id="name"
              name="name"
              value={inputs.name}
              onChange={handleChange}
            />
            <input
              placeholder="email"
              type="email"
              id="email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
            />
            <input
              placeholder="phone"
              type="tel"
              id="phone"
              name="phone"
              value={inputs.phone}
              onChange={handleChange}
            />
            <input
              placeholder="address line 1"
              type="text"
              id="address1"
              name="address1"
              value={inputs.address1}
              onChange={handleChange}
            />
            <input
              placeholder="address line 2"
              type="text"
              id="address2"
              name="address2"
              value={inputs.address2}
              onChange={handleChange}
            />
            <input
              placeholder="city"
              type="text"
              id="city"
              name="city"
              value={inputs.city}
              onChange={handleChange}
            />
            <input
              placeholder="state"
              type="text"
              id="state"
              name="state"
              value={inputs.state}
              onChange={handleChange}
            />
            <input
              placeholder="postcode"
              type="text"
              id="postcode"
              name="postcode"
              value={inputs.postcode}
              onChange={handleChange}
            />
            <input
              placeholder="country"
              type="text"
              id="country"
              name="country"
              value={inputs.country}
              onChange={handleChange}
            />
            <textarea
              placeholder="description"
              rows={4}
              id="description"
              name="description"
              value={inputs.description}
              onChange={handleChange}
            />
            <ButtonStyles disabled={loading} primary fullWidth>
              Become a Customer
            </ButtonStyles>
            <MessageContainerStyle>
              {showSuccessMessage && (
                <SuccessMessage message="You have successfully become a customer. Redirecting you to your account now." />
              )}
              {showErrorMessage && (
                <ErrorMessage message="Error in becoming a customer." />
              )}
            </MessageContainerStyle>
          </fieldset>
        </FormStyles>
      </div>
    </BodyStyles>
  );
}
