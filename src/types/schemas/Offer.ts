import z from "zod";

export const offerSchema = z.object({
  __v: z.number(),
  _id: z.string().nonempty(),
  serviceProviderId: z.string().nonempty(),
  task: z.string().nonempty(),
  userId: z.string().nonempty(),
  amount: z.coerce
    .number({
      invalid_type_error: "Budget must be a number",
    })
    .positive({ message: "Amount must be more than 0" }),
  message: z.string().nonempty(),
  status: z
    .enum(["Pending", "Accepted", "Rejected", "Completed"])
    .default("Pending"),
  contactEmail: z.string().email(),
  contactName: z.string().nonempty(),
  contactPhoto: z.string().url(),
});

export const CreateOfferPayloadSchema = offerSchema.omit({
  __v: true,
  _id: true,
  userId: true,
  serviceProviderId: true,
  task: true,
  status: true,
  contactEmail: true,
  contactName: true,
  contactPhoto: true,
});

export type Offer = z.infer<typeof offerSchema>;
export type CreateOfferPayload = z.infer<typeof CreateOfferPayloadSchema>;

export type TaskOffer = Omit<Offer, "amount" | "contactEmail"> & {
  amount?: number;
  contactEmail?: string;
};

export type GetTaskOffersResponse = {
  data: TaskOffer[];
};
