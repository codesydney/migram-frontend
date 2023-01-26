import { z } from "zod";

export const offerSchema = z.object({});

export const TaskStatusSchema = z.enum([
  "open",
  "assigned",
  "completed",
  "paid",
  "pay_decline",
  "pay_in_processing",
] as const);

export const TaskCategorySchema = z.enum([
  "Cleaning",
  "Gardening",
  "Lawn Mowing",
  "Painting",
] as const);

export const TaskTimeOfArrivalSchema = z.enum([
  "7am-10am",
  "10am-1pm",
  "1pm-4pm",
  "4pm-7pm",
] as const);

export const TaskTimeEstimateSchema = z.enum([
  "1-3hrs",
  "4-6hrs",
  "6-8hrs",
  "moreThan1Day",
] as const);

export const CreateTaskFormSchema = z.object({
  category: TaskCategorySchema.default("Cleaning"),
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(10, { message: "Title must be at least 10 characters long" }),
  details: z
    .string({ required_error: "Details are required" })
    .min(25, { message: "Details must be at least 25 characters long" }),
  budget: z.coerce
    .number({
      invalid_type_error: "Budget must be a number",
    })
    .gt(5, { message: "Budget must be at least $5" }),
  timeOfArrival: TaskTimeOfArrivalSchema.default("7am-10am"),
  timeEstimate: TaskTimeEstimateSchema.default("1-3hrs"),
  status: TaskStatusSchema.default("open"),
  dueDate: z.coerce
    .date({ invalid_type_error: "Due date must be a date" })
    .min(new Date(), { message: "Due date must be in the future" }),
  photos: z.optional(z.array(z.string())),
  location: z
    .object({
      name: z.string(),
      type: z.string(),
      coordinates: z.tuple([z.number(), z.number()]),
    })
    .optional(),
});

export type CreateTaskFormState = z.infer<typeof CreateTaskFormSchema>;
