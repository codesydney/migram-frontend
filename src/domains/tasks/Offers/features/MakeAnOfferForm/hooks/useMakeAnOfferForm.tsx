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

export const useMakeAnOfferForm = (taskId: string) => {
  const { control, handleSubmit } = useForm<MakeAnOfferFormState>({
    mode: "onBlur",
  });

  const submitHandler = async (data: MakeAnOfferFormState) => {
    console.log(data);
  };

  return { control, onSubmit: handleSubmit(submitHandler) };
};
