import Link from "next/link";
import { useRouter } from "next/router";
import useForm from "../../lib/useForm";
import { signIn } from "next-auth/client";
import { useState } from "react";

import ButtonStyles from "../styles/ButtonStyles";
import BodyStyles from "../styles/BodyStyles";
import FormStyles from "../styles/FormStyles";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { inputs, handleChange, resetForm, clearForm }: any = useForm({
    email: "",
    password: "",
  });

  async function handleLogin(e: any) {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);
    console.log(loading);
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
        <h2>Welcome back!</h2>
        <p>
          {"Don't have a login? "}
          <Link href="/signup" passHref>
            <ButtonStyles inLine>Create account</ButtonStyles>
          </Link>
        </p>
      </div>
      <div className="secondary">
        <div className="form-header" />
        <FormStyles onSubmit={handleLogin}>
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
            <ButtonStyles disabled={loading} primary fullWidth>
              Login
            </ButtonStyles>
          </fieldset>
          {errorMessage}
        </FormStyles>
      </div>
    </BodyStyles>
  );
}
