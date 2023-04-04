import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { routerPush } from "@Utils/index";
import { createCustomerUser } from "@Users/common/api";
import { useNotifications } from "src/common/features/notifications";
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

export const useSignUpForm = () => {
  const { dispatchNotifications } = useNotifications();
  const { control, handleSubmit } = useForm<SignUpFormState>({
    mode: "onBlur",
    resolver: zodResolver(formSchema),
  });

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

  return { control, onSubmit: handleSubmit(submitHandler) };
};
