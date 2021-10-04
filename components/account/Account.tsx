import { useSession } from "next-auth/client";
import { useState } from "react";
import useForm from "../../lib/useForm";
import axios from "axios";

import ButtonStyles from "../styles/ButtonStyles";
import BodyStyles from "../styles/BodyStyles";
import FormStyles from "../styles/FormStyles";

export default function Account() {
  const [session, loading]: any = useSession();
  const { inputs, handleChange, resetForm, clearForm }: any = useForm({
    photo: "",
    firstName: "",
    lastName: "",
  });

  async function handleUpdate(e: any) {
    e.preventDefault();
    console.log("Sending: ", inputs);
    console.log("Token: ", session.accessToken);
    console.log(
      "URL: ",
      `${process.env.NEXT_PUBLIC_API_URL}api/v1/users/${session.user._id}`
    );
    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}api/v1/users/${session.user._id}`,
        inputs,
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      )
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }

  return (
    <BodyStyles alternate>
      <div className="primary">
        <h2>Update User</h2>
        <p>{session?.user?.email}</p>
      </div>
      <div className="secondary">
        <h3>Personal info</h3>
        <FormStyles onSubmit={handleUpdate}>
          <fieldset>
            <input
              type="file"
              id="photo"
              name="photo"
              onChange={handleChange}
            />
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="first name"
              value={inputs.firstName}
              onChange={handleChange}
            />
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="last name"
              value={inputs.lastName}
              onChange={handleChange}
            />
            <ButtonStyles disabled={loading} primary fullWidth>
              Update user
            </ButtonStyles>
          </fieldset>
        </FormStyles>
      </div>
    </BodyStyles>
  );
}
