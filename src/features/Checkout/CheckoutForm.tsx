"use client";
import { FieldErrorsImpl, FieldValues, UseFormRegister } from "react-hook-form";
import z from "zod";
import ButtonStyles from "../../components/styles/ButtonStyles";
import { TextInput } from "../../components/common/TextInput";
import { addressSchema } from "../../types/schemas";
import { AddressFormSegment } from "../FormSegments/AddressFormSegment";
import { BaseSyntheticEvent } from "react";

export const schema = z
  .object({
    name: z.string().min(1, "Please enter a name"),
  })
  .merge(addressSchema);

export type Schema = z.infer<typeof schema>;

interface FormProps<TFieldValues extends FieldValues> {
  onSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  register: UseFormRegister<TFieldValues>;
  errors: Partial<FieldErrorsImpl<TFieldValues>>;
}

export const CheckoutForm = ({
  onSubmit,
  errors,
  register,
}: FormProps<Schema>) => {
  return (
    <form onSubmit={onSubmit}>
      <TextInput
        id="name"
        label="Name:"
        error={errors.name?.message}
        {...register("name")}
      />
      <AddressFormSegment register={register} errors={errors} />

      <ButtonStyles type="submit" primary>
        Checkout
      </ButtonStyles>
    </form>
  );
};
