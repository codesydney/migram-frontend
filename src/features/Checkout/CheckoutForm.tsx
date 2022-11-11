"use client";
import z from "zod";
import ButtonStyles from "../../components/styles/ButtonStyles";
import { TextInput } from "../../components/common/TextInput";
import { addressSchema } from "../../types/schemas";
import { AddressFormSegment } from "../FormSegments/AddressFormSegment";
import { FormProps } from "../../types";

export const schema = z
  .object({
    name: z.string().min(1, "Please enter a name"),
  })
  .merge(addressSchema);

export type Schema = z.infer<typeof schema>;

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
