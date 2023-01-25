import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const formSchema = z.object({
  offerAmt: z.coerce.number({ required_error: "Offer Amount is required" }),
  comments: z
    .string({ required_error: "Description is required" })
    .min(25, "Comments must have 25 or more characters")
    .max(1500, "Comments cannot have more than 1500 characters"),
});

export type MakeAnOfferFormState = z.infer<typeof formSchema>;

export type MakeAnOfferSubmitHandler = (
  data: MakeAnOfferFormState
) => Promise<void>;

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
