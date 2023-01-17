import { useState } from "react";
import { signIn as nextAuthSignIn } from "next-auth/react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Checkbox, Form, FormLayout, Page } from "@shopify/polaris";
import { routerPush } from "@Utils/router";
import { TextField } from "../Login/TextField";

const formSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be 8 or more characters" }),
});
export type LoginFormState = z.infer<typeof formSchema>;

const signIn = async (formValues: LoginFormState) => {
  return nextAuthSignIn("credentials", {
    ...formValues,
    redirect: false,
    callbackUrl: "/",
  });
};

const handleLogin = async (formValues: LoginFormState) => {
  const data = await signIn(formValues);
  if (!data?.error && data?.url) return routerPush(data?.url);

  return data;
};

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { control, handleSubmit } = useForm<LoginFormState>({
    mode: "onBlur",
    resolver: zodResolver(formSchema),
  });

  return (
    <Page title="Login">
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
        </FormLayout>
      </Form>
    </Page>
  );
};
