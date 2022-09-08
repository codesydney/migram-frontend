import Link from "next/link";
import { useRouter } from "next/router";
import useForm from "../../lib/useForm";
import { signIn } from "next-auth/client";
import { useState } from "react";
import { validate } from "../../lib/validator";
import ErrorMessage from "../common/ErrorMessage";
import Loading from "../common/Loading";
import ButtonStyles from "../styles/ButtonStyles";
import BodyStyles from "../styles/BodyStyles";
import FormStyles from "../styles/FormStyles";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { inputs, handleChange, errors, updateErrors, resetForm }: any =
    useForm({
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

  function invalidField() {
    if (validate.email(inputs.email)) return true;
    if (validate.password(inputs.password, "requiredOnly")) return true;
    return false;
  }

  function handleErrors(event: any) {
    event.preventDefault();
    updateErrors(["email", "password"]);
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
        <FormStyles onSubmit={invalidField() ? handleErrors : handleLogin}>
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
            <ButtonStyles disabled={loading} primary fullWidth>
              {loading ? <Loading text="Logging in" /> : "Login"}
            </ButtonStyles>
          </fieldset>
          {errorMessage && <ErrorMessage message={errorMessage} />}
        </FormStyles>
      </div>
    </BodyStyles>
  );
}
