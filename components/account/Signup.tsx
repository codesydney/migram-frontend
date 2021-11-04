import Link from "next/link";

import ButtonStyles from "../styles/ButtonStyles";
import BodyStyles from "../styles/BodyStyles";
import FormStyles from "../styles/FormStyles";
import useForm from "../../lib/useForm";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { signIn } from "../../node_modules/next-auth/client";

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const { inputs, handleChange, resetForm, clearForm }: any = useForm({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  async function handleSignup(e: any) {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}api/v1/users/signUp`, inputs)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        return;
      });
    const data: any = await signIn("credentials", {
      ...inputs,
      redirect: false,
      callbackUrl: "/",
    });
    setLoading(false);
    console.log(data);
    if (data.url) {
      resetForm();
      router.push(data.url);
    }
    if (data.error) {
      setErrorMessage(data.error);
    }
  }

  return (
    <BodyStyles>
      <div className="primary">
        <h2>Create a new account</h2>
        <p>
          Already have an account?{" "}
          <Link href="/login" passHref>
            <ButtonStyles inLine>Login</ButtonStyles>
          </Link>
        </p>
      </div>
      <div className="secondary">
        <div className="form-header" />
        <FormStyles method="POST" onSubmit={handleSignup}>
          <fieldset disabled={loading}>
            <input
              type="email"
              name="email"
              placeholder="email address"
              value={inputs.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="password"
              value={inputs.password}
              onChange={handleChange}
            />
            <input
              type="password"
              name="passwordConfirm"
              placeholder="confirm password"
              value={inputs.passwordConfirm}
              onChange={handleChange}
            />
            <ButtonStyles primary fullWidth>
              Create account
            </ButtonStyles>
          </fieldset>
        </FormStyles>
      </div>
    </BodyStyles>
  );
}
