import { useState } from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import {
  Button,
  Checkbox,
  Form,
  FormLayout,
  Layout,
  Text,
} from "@shopify/polaris";
import {
  NotificationsAction,
  PageWithNotifications,
  useNotifications,
} from "src/common/features/notifications";
import { routerPush } from "@Utils/router";

import { TextField } from "src/components/TextField";
import { signIn } from "../common/api";
import { createNotification } from "src/common/features/notifications/utils";
import { FormPaddingDiv } from "src/components/FormPaddingDiv";

const formSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be 8 or more characters" }),
});
export type LoginFormState = z.infer<typeof formSchema>;

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { dispatchNotifications } = useNotifications();
  const { control, handleSubmit } = useForm<LoginFormState>({
    mode: "onBlur",
    resolver: zodResolver(formSchema),
  });

  const handleLogin = async (formValues: LoginFormState) => {
    const data = await signIn(formValues).then((data) => {
      const action: NotificationsAction = {
        type: "set",
        event: createNotification({
          isError: false,
          title: "Successfully logged in.",
          type: "toast",
          status: "success",
          source: "Login Success",
        }),
      };

      dispatchNotifications(action);

      return data;
    });
    if (!data?.error && data?.url) return routerPush(data?.url);

    return data;
  };

  return (
    <PageWithNotifications title="Login">
      <Layout.Section>
        <FormPaddingDiv>
          <Form onSubmit={handleSubmit(handleLogin)}>
            <FormLayout>
              <TextField<LoginFormState>
                name="email"
                label="Email"
                type="email"
                autoComplete="email"
                control={control}
              />
              <TextField<LoginFormState>
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                autoComplete="password"
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
                If you don&apos;t have an account,{" "}
                <Link
                  href="/signup"
                  className="Polaris-Link"
                  data-polaris-unstyled="true"
                >
                  Sign Up here.
                </Link>
              </Text>
            </FormLayout>
          </Form>
        </FormPaddingDiv>
      </Layout.Section>
    </PageWithNotifications>
  );
};
