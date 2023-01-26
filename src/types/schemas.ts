import { z } from "zod";

export const StateSchema = z.enum([
  "NSW",
  "ACT",
  "NT",
  "QLD",
  "SA",
  "TAS",
  "VIC",
  "WA",
]);

export const AddressSchema = z.object({
  line1: z.string().min(1, "Please enter address line 1"),
  line2: z.string().optional(),
  city: z.string().min(1, "Please enter a city"),
  state: StateSchema,
  postal_code: z
    .string()
    .min(1, "Please enter a postcode")
    .length(4, "Postcode must be 4 digits"),
});

export type Address = z.infer<typeof AddressSchema>;
