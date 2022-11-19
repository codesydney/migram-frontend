import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput } from "../../../components/common/TextInput";
import { AddressFormSegment } from "../../FormSegments/AddressFormSegment";
import { FormValues, formSchema } from "../types";
import ButtonStyles from "../../../components/styles/ButtonStyles";

const StyledForm = styled.form`
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  textarea {
    padding: 0.5rem 1rem;
    display: block;
    width: 100%;
    margin-top: 0.5rem;
    font-size: 1rem;
    line-height: 1.75rem;
    color: #434343;
    border: 1px solid rgba(0, 0, 0, 0.4);
    border-radius: 4px;
  }

  h1 {
    margin-top: 42px;
    font-size: 42px;
    line-height: 1;
    font-weight: 400;
  }

  h2 {
    margin-top: 32px;
    font-size: 32px;
    line-height: 1;
    font-weight: 300;
  }

  .hidden {
    visibility: hidden;
  }

  textarea {
    resize: vertical;
    padding: 0.5rem 1rem;
  }
`;

interface CustomerSignupFormProps {
  onSubmit: SubmitHandler<FormValues>;
  values?: FormValues;
}

export const CustomerSignupForm = ({
  onSubmit,
  values,
}: CustomerSignupFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  });

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)} method="POST">
      <h1>Create an Account</h1>
      <TextInput
        id="name"
        label="Name:"
        error={errors.name?.message}
        {...register("name")}
      />
      <TextInput
        id="email"
        label="Email:"
        type="email"
        error={errors.email?.message}
        {...register("email")}
      />
      <TextInput
        id="password"
        label="Password:"
        type="password"
        error={errors.password?.message}
        {...register("password")}
      />
      <TextInput
        id="passwordConfirm"
        label="Confirm Password:"
        type="password"
        error={errors.passwordConfirm?.message}
        {...register("passwordConfirm")}
      />

      <h2>Billing Details</h2>

      <TextInput
        id="phone"
        label="Phone:"
        type="phone"
        error={errors.phone?.message}
        {...register("phone")}
      />

      <AddressFormSegment register={register} errors={errors} />

      <div className="labelled-input">
        <label htmlFor="description" className="primary-label">
          Description:
        </label>
        <textarea rows={4} id="description" {...register("description")} />
        <label htmlFor="description" className="error-label">
          {errors.description?.message}
        </label>
      </div>

      <ButtonStyles type="submit" primary>
        Create Account
      </ButtonStyles>
    </StyledForm>
  );
};
