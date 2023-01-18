import { useState } from "react";
import { signIn as nextAuthSignIn } from "next-auth/react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Checkbox, Form, FormLayout, Page } from "@shopify/polaris";
import { routerPush } from "@Utils/router";
import { TextField } from "@ComponentsV2/components/TextField";
import { createUser } from "@Users/Auth/api/AuthService";

const formSchema = z
  .object({
    name: z.string({ required_error: "Name is required" }),
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Invalid email address" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(8, "Password must be 8 or more characters"),
    passwordConfirm: z.string().min(1, "Please enter a password confirmation"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
  });

export type SignUpFormState = z.infer<typeof formSchema>;

export const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { control, handleSubmit } = useForm<SignUpFormState>({
    mode: "onBlur",
    resolver: zodResolver(formSchema),
  });

  return (
    <Page title="Sign Up">
      <Form onSubmit={handleSubmit(createUser)}>
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
        </FormLayout>
      </Form>
    </Page>
  );
};
