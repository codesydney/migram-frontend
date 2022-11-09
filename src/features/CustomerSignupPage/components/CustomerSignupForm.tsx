import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput } from "../../../components/common/TextInput";

const StyledForm = styled.form`
  padding-bottom: 2rem;

  input,
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
    font-family: "Poppins", sans-serif;
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

  label {
    display: block;
    width: 100%;
    font-size: 0.875rem;
    line-height: 1;
    height: 0.875rem;
    font-weight: 600;
  }

  .labelled-input {
    margin-top: 0.75rem;
  }

  .hidden {
    visibility: hidden;
  }

  .input-error-label {
    margin-top: 0.5rem;
    font-size: 0.75rem;
    color: red;
    font-weight: 400;
  }

  textarea {
    resize: vertical;
    padding: 0.5rem 1rem;
  }

  button {
    margin-top: 2rem;
    font-size: 1rem;
    line-height: 1.75rem;
    color: white;
    background-color: #3e3e3e;

    padding: 0.5rem 2rem;
    border-radius: 4px;
    border: none;
    box-shadow: 0px 2px #999;

    &:hover {
      background-color: #2b2b2b;
    }

    &:active {
      box-shadow: 0px 2px #999;
      transform: translateY(1px);
      background-color: black;
    }
  }
`;

export const defaultFormValues = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
  phone: "",
  description: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
};

export type FormValues = typeof defaultFormValues;

const validationSchema = z
  .object({
    name: z.string().min(1, "Please enter a name."),
    email: z
      .string()
      .email("Please enter a valid email address.")
      .min(1, "Please enter an email address."),
    password: z.string().min(8, "Password must be 8 or more characters"),
    passwordConfirm: z.string().min(1, "Please enter a password confirmation"),
    phone: z.string().min(1, "Please enter a phone number."),
    description: z.string(),
    line1: z.string().min(1, "Please enter an address line 1."),
    line2: z.string(),
    city: z.string().min(1, "Please enter a City."),
    state: z.string().min(1, "Please enter a state."),
    postal_code: z.string().length(4, "Postcode must be 4 digits"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
  });

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
  } = useForm({
    defaultValues: values ?? defaultFormValues,
    resolver: zodResolver(validationSchema),
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
        type="passwordConfirm"
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
          Description:{" "}
        </label>
        <textarea rows={4} id="description" {...register("description")} />
        <label htmlFor="description" className="error-label">
          {errors.description?.message}
        </label>
      </div>

      <button type="submit">Create Account</button>
    </StyledForm>
  );
};
