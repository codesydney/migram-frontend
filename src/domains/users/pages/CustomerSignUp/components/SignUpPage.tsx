import Link from "next/link";
import { Text } from "@shopify/polaris";

import { createCustomerUser } from "@Users/common/api";
import { routerPush } from "@Utils/router";
import {
  useNotifications,
  createNotification,
  PageWithNotifications,
} from "src/common/features/notifications";
import {
  SignUpForm,
  SignUpFormState,
  useSignUpForm,
} from "@Users/common/components/SignUpForm";

function useSignUpHandler() {
  const { dispatchNotifications } = useNotifications();
  const submitHandler = async (data: SignUpFormState) => {
    dispatchNotifications({ type: "clear" });
    await createCustomerUser(data)
      .then((res) => {
        const action = {
          type: "set",
          event: createNotification({
            isError: false,
            title:
              "Thank you for signing up. Please login with your account details.",
            type: "toast",
            status: "success",
            source: "Customer Signup Success",
          }),
        } as const;

        dispatchNotifications(action);

        routerPush("/login");
      })
      .catch((err) => {
        const action = {
          type: "set",
          event: createNotification({
            isError: true,
            title: err.response.data.message,
            type: "notification",
            status: "critical",
            source: "Customer Signup Failure",
          }),
        } as const;

        dispatchNotifications(action);
      });
  };

  return submitHandler;
}

export const SignUpPage = () => {
  const submitHandler = useSignUpHandler();
  const { control, onSubmit } = useSignUpForm(submitHandler);

  return (
    <PageWithNotifications title="Sign Up as Customer">
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
    </PageWithNotifications>
  );
};
