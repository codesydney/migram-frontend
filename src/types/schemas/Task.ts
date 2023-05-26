import z from "zod";

export const TaskStatusSchema = z.enum([
  "Open",
  "In Progress",
  "Completed",
] as const);

export type TaskStatus = z.infer<typeof TaskStatusSchema>;

export const PaymentStatusSchema = z.enum([
  "N/A",
  "Payment Due",
  "Pending",
  "Paid",
  "Payment Declined",
] as const);

export type PaymentStatus = z.infer<typeof PaymentStatusSchema>;

export const TaskCategorySchema = z.enum([
  "Cleaning",
  "Gardening",
  "Painting",
  "Other",
] as const);

export const TaskSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  category: TaskCategorySchema.default("Cleaning"),
  shortDescription: z
    .string({
      required_error: "shortDescription is required",
    })
    .min(10, {
      message: "shortDescription must be at least 10 characters long",
    }),
  details: z
    .string({ required_error: "Details are required" })
    .min(25, { message: "Details must be at least 25 characters long" }),
  budget: z.coerce
    .number({
      invalid_type_error: "Budget must be a number",
    })
    .gt(5, { message: "Budget must be at least $5" }),
  status: TaskStatusSchema.default("Open"),
  paymentStatus: PaymentStatusSchema.default("N/A"),
  dueDate: z.coerce
    .date({ invalid_type_error: "Due date must be a date" })
    .min(new Date(), { message: "Due date must be in the future" }),
  photos: z.array(z.string()),
  location: z.object({
    streetAddress: z.string(),
    city: z.string(),
    state: z.enum(["NSW", "ACT", "NT", "QLD", "SA", "TAS", "VIC", "WA"]),
    postal_code: z.string(),
  }),
  acceptedOffer: z.optional(z.string()),
});

export type Task = z.infer<typeof TaskSchema>;
