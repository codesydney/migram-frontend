import { z } from "zod";

export const addressSchema = z.object({
  line1: z.string().min(1, "Please enter address line 1"),
  line2: z.string().optional(),
  city: z.string().min(1, "Please enter a city"),
  state: z.string().min(1, "Please enter a state"),
  postal_code: z
    .string()
    .min(1, "Please enter a postcode")
    .length(4, "Postcode must be 4 digits"),
});

export type AddressSchema = z.infer<typeof addressSchema>;
