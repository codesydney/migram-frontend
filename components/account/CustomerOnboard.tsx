import { useState } from "react";
import { useSession } from "next-auth/client";
import axios from "axios";
import useForm from "../../lib/useForm";

import BodyStyles from "../styles/BodyStyles";
import FormStyles from "../styles/FormStyles";
import ButtonStyles from "../styles/ButtonStyles";
import { useRouter } from "next/router";

export default function CustomerOnboard() {
  const [session]: any = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
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

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    axios
      .post(
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
      )
      .then((response) => {
        console.log(response);
        setLoading(false);
        router.push("/account");
        axios
          .get("/api/auth/session?update", { withCredentials: true })
          .then(() => {
            window.location.reload();
          });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
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
          </fieldset>
        </FormStyles>
      </div>
    </BodyStyles>
  );
}
