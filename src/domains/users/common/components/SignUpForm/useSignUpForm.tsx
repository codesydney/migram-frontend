import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  SignUpFormState,
  formSchema,
} from "@Users/common/components/SignUpForm";

export type UseSignUpForm = ReturnType<typeof useSignUpForm>;

export type SubmitHandler = (data: SignUpFormState) => Promise<void>;

export function useSignUpForm(submitHandler: SubmitHandler) {
  const { control, handleSubmit } = useForm<SignUpFormState>({
    mode: "onBlur",
    resolver: zodResolver(formSchema),
  });

  return { control, onSubmit: handleSubmit(submitHandler) };
}
