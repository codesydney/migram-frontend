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
export type State = z.infer<typeof StateSchema>;

export const TaskSchema = z.object({
  __v: z.number(),
  _id: z.string(),
  userId: z.string().nonempty(),
  customerId: z.string(),
  category: TaskCategorySchema,
  shortDescription: z
    .string({
      required_error: "Description is required",
    })
    .min(10, {
      message: "Description must be at least 10 characters long",
    }),
  details: z
    .string({ required_error: "Details are required" })
    .min(25, { message: "Details must be at least 25 characters long" }),
  budget: z.coerce
    .number({
      invalid_type_error: "Budget must be a number",
    })
    .gte(20, { message: "Budget must be at least $20" }),
  status: TaskStatusSchema.default("Open"),
  paymentStatus: PaymentStatusSchema.default("N/A"),
  dueDate: z.coerce
    .date({ invalid_type_error: "Due date must be a date" })
    .min(new Date(), { message: "Due date must be in the future" }),
  photos: z.array(z.string()).default([]),
  location: z.object({
    streetAddress: z
      .string()
      .nonempty({ message: "Street address is required" }),
    city: z.string().nonempty({ message: "City is required" }),
    state: StateSchema,
    postal_code: z.string().nonempty({ message: "Postcode is required" }),
  }),
  acceptedOffer: z.optional(z.string()),
});

export const CreateTaskSchema = TaskSchema.omit({
  __v: true,
  _id: true,
  userId: true,
  customerId: true,
  status: true,
  paymentStatus: true,
  acceptedOffer: true,
});

export type Task = z.infer<typeof TaskSchema>;
export type CreateTaskPayload = z.infer<typeof CreateTaskSchema>;

const tasks = {
  location: {
    streetAddress: "123 Fake ST",
    city: "Sydney",
    state: "NSW",
    postal_code: "2000",
  },
  _id: "647137d51c16698dbec51417",
  customerId: "cus_Nxu5BDmkSqQKs8",
  category: "Cleaning",
  shortDescription: "Clean Bathrooms, Gas Hob and Oven",
  details:
    "I need 2 bathrooms cleaned, no bath tub, only standing shower to be cleaned along with all soap scum marks removed from glass and mirror. Walls cleaned including wash basin, and toilet. \n\nI also need the gas hob and oven cleaned, pictures attached. \nType of clean: Regular\nNumber of bedrooms: None\nNumber of bathrooms: 2\nEquipment and supplies: Tasker must provide\n",
  budget: 100,
  status: "Open",
  paymentStatus: "N/A",
  dueDate: "2023-05-29T00:00:00.000Z",
  photos: [],
  __v: 0,
};
