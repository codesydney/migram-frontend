"use client";

import { useForm } from "react-hook-form";
import z, { string } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FeatureFlag } from "../utils/FeatureFlag";

const schema = z.object({
  name: z.string().min(1, "Please enter a name"),
  line1: z.string().min(1, "Please enter address line 1"),
  line2: z.string().optional(),
  city: z.string().min(1, "Please enter a city"),
  state: z.string().min(1, "Please enter a state"),
  postalCode: z
    .string()
    .min(1, "Please enter a postcode")
    .length(4, "Postcode must be 4 digits"),
});

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
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name</label>
        <input id="name" {...register("name")} />
        <label htmlFor="name">{errors.name?.message}</label>

        <label htmlFor="lin1">Address Line 1</label>
        <input id="line1" {...register("line1")} />
        <label htmlFor="line1">{errors.line1?.message}</label>

        <label htmlFor="line2">Address Line 2</label>
        <input id="line2" {...register("line2")} />
        <label htmlFor="line2">{errors.line2?.message}</label>

        <label htmlFor="city">City</label>
        <input id="city" {...register("city")} />
        <label htmlFor="city">{errors.city?.message}</label>

        <label htmlFor="state">State</label>
        <input id="state" {...register("state")} />
        <label htmlFor="state">{errors.state?.message}</label>

        <label htmlFor="postcode">Postcode</label>
        <input id="postcode" {...register("postalCode")} />
        <label htmlFor="postcode">{errors.postalCode?.message}</label>

        <button type="submit">Checkout</button>
      </form>
    </>
  );
};

export default FeatureFlag(CheckoutPage, { isPage: true });
