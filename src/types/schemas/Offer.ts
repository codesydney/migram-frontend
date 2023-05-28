import z from "zod";

export const offerSchema = z.object({
  __v: z.number(),
  _id: z.string().nonempty(),
  userId: z.string().nonempty(),
  serviceProviderId: z.string().nonempty(),
  taskId: z.string().nonempty(),
  amount: z.number().positive(),
  status: z.enum(["Pending", "Accepted", "Rejected"]).default("Pending"),
  message: z.string().nonempty(),
});

export const CreateOfferPayloadSchema = offerSchema.omit({
  __v: true,
  _id: true,
  status: true,
  userId: true,
  serviceProviderId: true,
});

export type Offer = z.infer<typeof offerSchema>;
export type CreateOfferPayload = z.infer<typeof CreateOfferPayloadSchema>;
