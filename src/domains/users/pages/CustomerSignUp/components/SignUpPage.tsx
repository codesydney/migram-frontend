import Link from "next/link";
import { Text } from "@shopify/polaris";

import { SignUpForm } from "@Users/common/components/SignUpForm";

import { useSignUpForm } from "../hooks";

export const SignUpPage = () => {
  const { control, onSubmit } = useSignUpForm();

  return (
    <SignUpForm control={control} onSubmit={onSubmit}>
      <Text as="h2" variant="headingSm">
        Want to earn money on Tasks instead?{" "}
        <Link
          href="/providers/signup"
          className="Polaris-Link"
          data-polaris-unstyled="true"
        >
          Sign Up as Provider.
        </Link>
      </Text>
    </SignUpForm>
  );
};
