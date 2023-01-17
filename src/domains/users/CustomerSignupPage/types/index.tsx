import { addressSchema } from "@Types/schemas";
import { z } from "zod";

export interface User {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface Customer {
  name: string;
  email: string;
  phone: string;
  description: string;
  shipping: {
    name: string;
    address: {
      line1: string;
      line2?: string;
      city: string;
      state: string;
      postal_code: string;
    };
  };
}

export const formSchema = z
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
  })
  .merge(addressSchema)
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
  });

export type FormValues = z.infer<typeof formSchema>;
