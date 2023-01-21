import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createUser, loginAndRedirect } from "@Users/Auth/api/AuthService";
import { createCustomer } from "@Billing/Customers/api";

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

export const submitHandler = async (data: SignUpFormState) => {
  await createUser(data);

  const { email, name, password } = data;
  await createCustomer({ email, name });

  await signInAndRedirectHome({ email, password });
};

export const useSignUpForm = () => {
  const { control, handleSubmit } = useForm<SignUpFormState>({
    mode: "onBlur",
    resolver: zodResolver(formSchema),
  });

  return { control, onSubmit: handleSubmit(submitHandler) };
};
