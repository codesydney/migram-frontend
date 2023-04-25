import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { routerPush } from "@Utils/index";
import { createCustomerUser } from "@Users/common/api";
import { useNotifications } from "src/common/features/notifications";
import { createNotification } from "src/common/features/notifications/utils";
import {
  SignUpFormState,
  formSchema,
} from "@Users/common/components/SignUpForm";

export type UseSignUpForm = ReturnType<typeof useSignUpForm>;

export function useSignUpForm() {
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
}
