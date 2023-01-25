import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MakeAnOfferFormState } from "..";
import { MakeAnOfferSubmitHandler, formSchema } from "../types";

export const useMakeAnOfferForm = (submitHandler: MakeAnOfferSubmitHandler) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<MakeAnOfferFormState>({
    mode: "onBlur",
    resolver: zodResolver(formSchema),
  });

  return { control, onSubmit: handleSubmit(submitHandler), errors };
};
