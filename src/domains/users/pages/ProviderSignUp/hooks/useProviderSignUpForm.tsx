import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import axios from "axios";
import { createUser, signIn } from "@Users/common/api";
import { useNotifications } from "src/common/features/notifications";
import { routerPush } from "@Utils/router";
import { createNotification } from "src/common/features/notifications/utils";

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

export const useProviderSignUpForm = () => {
  const { dispatchNotifications } = useNotifications();
  const { control, handleSubmit } = useForm<SignUpFormState>({
    mode: "onBlur",
    resolver: zodResolver(formSchema),
  });

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

  return { control, onSubmit: handleSubmit(submitHandler) };
};
