import Link from "next/link";
import { Text } from "@shopify/polaris";
import { useProviderSignUpForm } from "../hooks";
import { SignUpForm } from "@Users/common/components/SignUpForm";

export const ProviderSignUpPage = () => {
  const { control, onSubmit } = useProviderSignUpForm();

  return (
    <SignUpForm control={control} onSubmit={onSubmit}>
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
    </SignUpForm>
  );
};
