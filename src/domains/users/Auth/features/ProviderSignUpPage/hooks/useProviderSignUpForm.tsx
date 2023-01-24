import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createUser } from "@Users/Auth/api/AuthService";
import axios from "axios";

export const formSchema = z
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

const fetchProviderOnboardingUrl = async (userId: string) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}api/v1/providers`,
    {
      UserId: userId,
    }
  );

  return response.data.data.accountLink.url;
};

export const submitHandler = async (data: SignUpFormState) => {
  const userId = await createUser(data);
  const providerOnboardingUrl = await fetchProviderOnboardingUrl(userId);
  window.location.assign(providerOnboardingUrl);
};

export const useProviderSignUpForm = () => {
  const { control, handleSubmit } = useForm<SignUpFormState>({
    mode: "onBlur",
    resolver: zodResolver(formSchema),
  });

  return { control, onSubmit: handleSubmit(submitHandler) };
};
