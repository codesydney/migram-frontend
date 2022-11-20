"use client";
import z from "zod";
import ButtonStyles from "../../components/styles/ButtonStyles";
import { TextInput } from "../../components/common/TextInput";
import { addressSchema } from "../../types/schemas";
import { AddressFormSegment } from "../FormSegments/AddressFormSegment";
import { FormProps } from "../../types";
import { useCheckoutForm } from "./hooks";

export const schema = z
  .object({
    name: z.string().min(1, "Please enter a name"),
  })
  .merge(addressSchema);

export type Schema = z.infer<typeof schema>;

interface CheckoutFormProps {
  disabled: boolean;
}

export const CheckoutForm = ({ disabled }: CheckoutFormProps) => {
  const { onSubmit, errors, register } = useCheckoutForm();

  return (
    <form onSubmit={onSubmit}>
      <fieldset disabled={disabled}>
        <h2>Billing Details</h2>
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
      </fieldset>
    </form>
  );
};
