import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { schema, Schema } from "../CheckoutForm";

export const useCheckoutForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: Schema) => {};

  return { register, errors, onSubmit: handleSubmit(onSubmit) };
};
