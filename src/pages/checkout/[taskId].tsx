"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FeatureFlag } from "../../utils/FeatureFlag";
import styled from "styled-components";

import { useRouter } from "next/router";
import {
  Schema,
  schema,
  CheckoutForm,
} from "../../features/Checkout/CheckoutForm";

const StyledDiv = styled.div`
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

const CheckoutPage = () => {
  const router = useRouter();
  const { taskId } = router.query as { taskId: string };

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
      <CheckoutForm
        onSubmit={handleSubmit(onSubmit)}
        errors={errors}
        register={register}
      />
    </StyledDiv>
  );
};

export default FeatureFlag(CheckoutPage, { isPage: true });
