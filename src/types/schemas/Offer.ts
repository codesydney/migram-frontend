import z from "zod";

export const offerSchema = z.object({
  serviceProviderId: z.string().nonempty(),
  taskId: z.string().nonempty(),
  amount: z.number().positive(),
  status: z.enum(["Pending", "Accepted", "Rejected"]).default("Pending"),
  message: z.string().nonempty(),
});

export type Offer = z.infer<typeof offerSchema>;
