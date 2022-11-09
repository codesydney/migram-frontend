"use client";

import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FeatureFlag } from "../utils/FeatureFlag";
import styled from "styled-components";
import ButtonStyles from "../components/styles/ButtonStyles";

import { addressSchema } from "../types/schemas";
import { AddressFormSegment } from "../features/FormSegments/AddressFormSegment";

const StyledDiv = styled.div`
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .text-input {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .text-input > * {
    display: block;
    width: 100%;
  }

  .text-input > label {
    font-size: 1rem;
  }

  .text-input > label.error {
    color: red;
  }
`;

const schema = z
  .object({
    name: z.string().min(1, "Please enter a name"),
  })
  .merge(addressSchema);

type Schema = z.infer<typeof schema>;

const CheckoutPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: Schema) => {};

  return (
    <StyledDiv>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-input">
          <label htmlFor="name">Name</label>
          <input id="name" {...register("name")} />
          <label htmlFor="name" className="error">
            {errors.name?.message}
          </label>
        </div>

        <AddressFormSegment register={register} errors={errors} />
        <ButtonStyles type="submit" primary>
          Checkout
        </ButtonStyles>
      </form>
    </StyledDiv>
  );
};

export default FeatureFlag(CheckoutPage, { isPage: true });
