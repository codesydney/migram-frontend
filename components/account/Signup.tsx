import Link from "next/link";

import ButtonStyles from "../styles/ButtonStyles";
import BodyStyles from "../styles/BodyStyles";
import FormStyles from "../styles/FormStyles";

export default function Signup() {
  async function handleSubmit() {
    // check password == confirmPassword
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
        <FormStyles method="POST" onSubmit={handleSubmit}>
          <fieldset>
            <input type="email" name="email" placeholder="email address" />
            <input type="password" name="password" placeholder="password" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="confirm password"
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
