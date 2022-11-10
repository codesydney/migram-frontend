"use client";

import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FeatureFlag } from "../../utils/FeatureFlag";
import styled from "styled-components";
import ButtonStyles from "../../components/styles/ButtonStyles";
import { TextInput } from "../../components/common/TextInput";

import { addressSchema } from "../../types/schemas";
import { AddressFormSegment } from "../../features/FormSegments/AddressFormSegment";
import { useRouter } from "next/router";

const StyledDiv = styled.div`
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

const schema = z
  .object({
    name: z.string().min(1, "Please enter a name"),
  })
  .merge(addressSchema);

type Schema = z.infer<typeof schema>;

const CheckoutPage = () => {
  const router = useRouter();
  const { taskId } = router.query;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: Schema) => {};

  return (
    <StyledDiv>
      <form onSubmit={handleSubmit(onSubmit)}>
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
    </StyledDiv>
  );
};

export default FeatureFlag(CheckoutPage, { isPage: true });
