import Link from "next/link";
import { Text } from "@shopify/polaris";
import axios from "axios";

import {
  SignUpForm,
  SignUpFormState,
  useSignUpForm,
} from "@Users/common/components/SignUpForm";
import { createUser, signIn } from "@Users/common/api";
import {
  useNotifications,
  createNotification,
  PageWithNotifications,
} from "src/common/features/notifications";

/**
 *
 * @returns The Provider Sign Up Handler that creates a new Migram User, then redirects them to Stripe for Connect Account Onboarding
 */
export const useProviderSignUpHandler = () => {
  const { dispatchNotifications } = useNotifications();

  const fetchProviderOnboardingUrl = async (userId: string) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}api/v1/providers`,
      {
        UserId: userId,
      }
    );

    return response.data.data.accountLink.url;
  };

  const submitHandler = async (data: SignUpFormState) => {
    dispatchNotifications({ type: "clear" });
    const userId = await createUser(data)
      .then((res) => {
        const action = {
          type: "set",
          event: createNotification({
            isError: false,
            title: "Successfully created account. Redirecting you to Stripe",
            type: "toast",
            status: "success",
            source: "Provider Signup Success",
          }),
        } as const;

        dispatchNotifications(action);

        return res;
      })
      .catch((err) => {
        const action = {
          type: "set",
          event: createNotification({
            isError: true,
            title: err.response.data.message,
            type: "notification",
            status: "critical",
            source: "Provider Signup Failure",
          }),
        } as const;

        dispatchNotifications(action);
      });

    await signIn({ email: data.email, password: data.password });

    const providerOnboardingUrl = await fetchProviderOnboardingUrl(userId);
    window.location.assign(providerOnboardingUrl);
  };

  return submitHandler;
};

export const ProviderSignUpPage = () => {
  const submitHandler = useProviderSignUpHandler();
  const { control, onSubmit } = useSignUpForm(submitHandler);

  return (
    <PageWithNotifications title="Sign Up as Provider">
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
    </PageWithNotifications>
  );
};
