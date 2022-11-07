import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { signIn } from "next-auth/client";
import useForm from "../lib/useForm";
import ErrorMessage from "../components/common/ErrorMessage";
import Loading from "../components/common/Loading";
import BodyStyles from "../components/styles/BodyStyles";
import ButtonStyles from "../components/styles/ButtonStyles";
import FormStyles from "../components/styles/FormStyles";
import { validate } from "../lib/validator";

export function ProviderSignupPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const {
    inputs,
    handleChange,
    errors,
    updateErrors,
    resetForm,
    clearForm,
  }: any = useForm({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  async function handleSignup(e: any) {
    e.preventDefault();
    console.log("sending data");
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

  function invalidField() {
    const fields = ["email", "password", "passwordConfirm"];
    return fields.some((field) => {
      const value = inputs[field];
      if (field === "passwordConfirm") {
        return validate[field](value, inputs.password);
      } else {
        return validate[field](value);
      }
    });
  }

  function handleErrors(event: any) {
    event.preventDefault();
    updateErrors(["email", "password", "passwordConfirm"]);
  }

  return (
    <BodyStyles>
      <div className="primary">
        <h2>Create a new account</h2>
        <p>
          Already have an account?{" "}
          <Link href="/login" passHref legacyBehavior>
            <ButtonStyles inLine>Login</ButtonStyles>
          </Link>
        </p>
      </div>
      <div className="secondary">
        <div className="form-header" />
        <FormStyles
          method="POST"
          onSubmit={invalidField() ? handleErrors : handleSignup}
        >
          <fieldset disabled={loading}>
            <div className="input-container">
              <input
                type="email"
                name="email"
                className={errors.email && "error"}
                placeholder="email address"
                value={inputs.email}
                onChange={handleChange}
              />
              {errors.email && <ErrorMessage message={errors.email} />}
            </div>
            <div className="input-container">
              <input
                type="password"
                name="password"
                className={errors.password && "error"}
                placeholder="password"
                value={inputs.password}
                onChange={handleChange}
              />
              {errors.password && <ErrorMessage message={errors.password} />}
            </div>
            <div className="input-container">
              <input
                type="password"
                name="passwordConfirm"
                className={errors.passwordConfirm && "error"}
                placeholder="confirm password"
                value={inputs.passwordConfirm}
                onChange={handleChange}
              />
              {errors.passwordConfirm && (
                <ErrorMessage message={errors.passwordConfirm} />
              )}
            </div>
            <ButtonStyles primary fullWidth disabled={loading}>
              {loading ? <Loading text="Creating account" /> : "Create account"}
            </ButtonStyles>
          </fieldset>
        </FormStyles>
      </div>
    </BodyStyles>
  );
}

export default ProviderSignupPage;
