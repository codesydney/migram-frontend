import { PropsWithChildren, useState } from "react";
import { Layout, Form, FormLayout, Checkbox, Button } from "@shopify/polaris";
import { z } from "zod";

import { FormPaddingDiv } from "@Components/FormPaddingDiv";
import { UseSignUpForm } from "@Users/pages/CustomerSignUp";

import { PageWithNotifications } from "src/common/features/notifications";
import { TextField } from "@Components/TextField";

export const formSchema = z
  .object({
    firstName: z.string({ required_error: "First Name is required" }),
    lastName: z.string({ required_error: "Last Name is required" }),
    phone: z.string({ required_error: "Phone Number is required" }).max(15),
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
export type SignUpFormProps = PropsWithChildren<UseSignUpForm>;

export function SignUpForm({ control, onSubmit, children }: SignUpFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <PageWithNotifications title="Sign Up">
      <Layout.Section>
        <FormPaddingDiv>
          <Form onSubmit={onSubmit}>
            <FormLayout>
              <TextField<SignUpFormState>
                name="firstName"
                label="First Name"
                autoComplete="First Name"
                control={control}
              />
              <TextField<SignUpFormState>
                name="lastName"
                label="Last Name"
                autoComplete="Last Name"
                control={control}
              />
              <TextField<SignUpFormState>
                name="phone"
                label="Phone"
                autoComplete="phone"
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

              {children}
            </FormLayout>
          </Form>
        </FormPaddingDiv>
      </Layout.Section>
    </PageWithNotifications>
  );
}
