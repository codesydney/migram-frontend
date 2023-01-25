import { useState } from "react";
import Link from "next/link";

import {
  Button,
  Checkbox,
  Form,
  FormLayout,
  Page,
  Text,
} from "@shopify/polaris";
import { TextField } from "@ComponentsV2/components/TextField";
import { useProviderSignUpForm, SignUpFormState } from "../hooks";

export const ProviderSignUpPage = () => {
  const { control, onSubmit } = useProviderSignUpForm();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Page title="Provider Sign Up">
      <Form onSubmit={onSubmit}>
        <FormLayout>
          <TextField<SignUpFormState>
            name="name"
            label="Name"
            autoComplete="name"
            control={control}
          />
          <TextField<SignUpFormState>
            name="email"
            label="Email"
            type="email"
            autoComplete="email"
            control={control}
          />
          <TextField<SignUpFormState>
            id="password"
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            control={control}
          />
          <TextField<SignUpFormState>
            id="passwordConfirm"
            name="passwordConfirm"
            label="Confirm Password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            control={control}
          />
          <Checkbox
            label="Show Password"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <Button primary submit size="large">
            Submit
          </Button>

          <Text as="h2" variant="headingSm">
            Need help with a Task Instead?{" "}
            <Link
              href="/signup"
              className="Polaris-Link"
              data-polaris-unstyled="true"
            >
              Sign Up as Customer.
            </Link>
          </Text>
        </FormLayout>
      </Form>
    </Page>
  );
};
